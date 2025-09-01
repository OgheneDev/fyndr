'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { User, EllipsisVertical, Eye, Edit, Trash2 } from 'lucide-react';
import { deleteCv, updateCv, getPersonalCvs } from '@/api/cvs/requests';
import { ModalContent } from './EditModalContent';
import { Skeleton } from './Skeleton';
import Swal from 'sweetalert2'; 

export const CvsList = ({ onCvUpdate }) => {
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCv, setEditingCv] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null);
  const [error, setError] = useState(null);
  const [modalRoot, setModalRoot] = useState(null);

  // Define fetchCvs outside useEffect
  const fetchCvs = async () => {
    try {
      setLoading(true);
      const response = await getPersonalCvs();
      const cvsData = response?.data || [];
      cvsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setCvs(cvsData);
    } catch (error) {
      console.error('Error fetching CVs:', error);
      setError('Failed to load CVs');
      setCvs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCvs();
  }, []);

  // Form state for editing
  const [formData, setFormData] = useState({
    workExperienceDetails: [{ company: '', jobTitle: '', startYear: '', endYear: '', description: '' }],
    skills: [''],
    additionalCertificate: '',
    languages: [''],
  });

  // Set up modal root for portal
  useEffect(() => {
    const root = document.getElementById('modal-root') || document.body;
    setModalRoot(root);

    // Prevent background scrolling when modal is open
    if (showEditModal) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => document.body.classList.remove('no-scroll');
  }, [showEditModal]);

  const handleDropdownToggle = (cvId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDropdown(activeDropdown === cvId ? null : cvId);
  };

  const handleViewCv = (cvId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDropdown(null);
    router.push(
      `/dashboard/new-request?category=employment&role=employer&cvId=${encodeURIComponent(cvId)}`
    );
  };

  const handleEditCv = (cv, e) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDropdown(null);
    setEditingCv(cv);
    setFormData({
      workExperienceDetails: cv.workExperienceDetails?.length ? cv.workExperienceDetails : [{ company: '', jobTitle: '', startYear: '', endYear: '', description: '' }],
      skills: cv.skills?.length ? cv.skills : [''],
      additionalCertificate: cv.additionalCertificate || '',
      languages: cv.languages?.length ? cv.languages : [''],
    });
    setShowEditModal(true);
  };

  const handleDeleteCv = async (cvId, e) => {
  e.preventDefault();
  e.stopPropagation();
  setActiveDropdown(null);

  // Use window.confirm for deletion confirmation
  if (window.confirm('Are you sure you want to delete this CV? This action cannot be undone.')) {
    setIsDeleting(cvId);
    try {
      await deleteCv({ cvId });
      await fetchCvs(); // Refresh CVs list after deletion
      if (onCvUpdate) onCvUpdate();
      // Show success alert using Swal
      Swal.fire({
        icon: 'success',
        title: 'CV Deleted',
        text: 'The CV has been successfully deleted!',
        confirmButtonColor: '#85CE5C',
        timer: 2000,
      });
    } catch (error) {
      console.error('Error deleting CV:', error);
      // Show error alert using Swal
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete CV. Please try again.',
        confirmButtonColor: '#85CE5C',
        timer: 2000,
      });
    } finally {
      setIsDeleting(null);
    }
  }
};

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const cleanedData = {
        ...formData,
        workExperienceDetails: formData.workExperienceDetails.filter(exp => 
          exp.company.trim() || exp.jobTitle.trim() || exp.duration.trim()
        ),
        skills: formData.skills.filter(skill => skill.trim()),
        languages: formData.languages.filter(lang => lang.trim()),
      };
      await updateCv(cleanedData, { cvId: editingCv._id });
      setShowEditModal(false);
      setEditingCv(null);
      await fetchCvs(); // Refresh CVs list after update
      if (onCvUpdate) onCvUpdate();
      Swal.fire({
        icon: 'success',
        title: `CV updated successfully`,
        text: 'Thank you for your submission!',
        confirmButtonColor: '#85CE5C',
        timer: 2000,
      });
    } catch (error) {
      console.error('Error updating CV:', error);
      Swal.fire({
        icon: 'erro',
        title: `Error updating CV`,
        text: 'Please try again!',
        confirmButtonColor: '#85CE5C',
        timer: 2000,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const addWorkExperience = () => {
    setFormData(prev => ({
      ...prev,
      workExperienceDetails: [...prev.workExperienceDetails, { company: '', jobTitle: '', startYear: '', endYear: '', description: '' }],
    }));
  };

  const removeWorkExperience = (index) => {
    setFormData(prev => ({
      ...prev,
      workExperienceDetails: prev.workExperienceDetails.filter((_, i) => i !== index),
    }));
  };

  const updateWorkExperience = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      workExperienceDetails: prev.workExperienceDetails.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const addLanguage = () => {
    setFormData(prev => ({ ...prev, languages: [...prev.languages, ''] }));
  };

  const removeLanguage = (index) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index),
    }));
  };

  const updateLanguage = (index, value) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.map((lang, i) => i === index ? value : lang),
    }));
  };

  const handleClickOutside = () => {
    setActiveDropdown(null);
  };

  return (
    <>
      <div className="flex max-w-3xl mx-auto flex-col gap-4 mt-6" onClick={handleClickOutside}>
        {loading ? (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        ) : Array.isArray(cvs) && cvs.length > 0 ? (
          cvs.map((cv) => (
            <div
              key={cv._id}
              className="group bg-white border border-[#85CE5C] pr-6 rounded-4xl flex gap-5 md:gap-0 flex-row items-center justify-between transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-center space-x-4">
                {cv.profileImage ? (
                  <Image
                    src={cv.profileImage}
                    alt={`${cv.firstName} ${cv.lastName} avatar`}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover shadow-md"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                    <User size={30} className="text-gray-500" />
                  </div>
                )}
                <div>
                  <div className="flex gap-1 text-[12px] md:text-sm text-gray-900">
                    <p>{cv.firstName}</p>
                    <p>{cv.lastName}</p>
                  </div>
                  {cv.workExperienceDetails && cv.workExperienceDetails.length > 0 ? (
                    <div className="text-[10px] md:text-[12px] text-gray-900">
                      <div className="truncate max-w-[180px] md:max-w-[300px]">
                        {cv.workExperienceDetails[0]?.jobTitle || "Professional"}
                      </div>
                    </div>
                  ) : (
                    <div className="text-[10px] md:text-[12px] text-gray-900">
                      No work experience.
                    </div>
                  )}
                  <div>
                    <p className="text-[10px] md:text-[12px]">{cv.state}, Nigeria</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <button
                  type="button"
                  onClick={(e) => handleDropdownToggle(cv._id, e)}
                  className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors duration-200"
                  disabled={isDeleting === cv._id}
                >
                  {isDeleting === cv._id ? (
                    <div className="animate-spin h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full"></div>
                  ) : (
                    <EllipsisVertical size={18} className="text-gray-600" />
                  )}
                </button>
                {activeDropdown === cv._id && (
                  <div className="absolute right-0 top-full mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-500">
                    <button
                      onClick={(e) => handleViewCv(cv._id, e)}
                      className="w-full px-4 py-2 text-left text-sm cursor-pointer text-gray-700 hover:bg-gray-50 flex items-center gap-2 rounded-t-lg"
                    >
                      <Eye size={14} />
                      View CV
                    </button>
                    <button
                      onClick={(e) => handleEditCv(cv, e)}
                      className="w-full px-4 py-2 text-left text-sm cursor-pointer text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <Edit size={14} />
                      Edit CV
                    </button>
                    <button
                      onClick={(e) => handleDeleteCv(cv._id, e)}
                      className="w-full px-4 py-2 text-left text-sm cursor-pointer text-red-600 hover:bg-red-50 flex items-center gap-2 rounded-b-lg"
                    >
                      <Trash2 size={14} />
                      Delete CV
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <User className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg font-medium mb-2">No CVs found</p>
            <p className="text-gray-400 text-sm">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
      {showEditModal && modalRoot && createPortal(
        <ModalContent
          addWorkExperience={addWorkExperience}
          removeWorkExperience={removeWorkExperience}
          updateWorkExperience={updateWorkExperience}
          addLanguage={addLanguage}
          removeLanguage={removeLanguage}
          updateLanguage={updateLanguage}
          handleFormSubmit={handleFormSubmit}
          isUpdating={isUpdating}
          formData={formData}
          setShowEditModal={setShowEditModal}
          setFormData={setFormData}
        />,
        modalRoot
      )}
    </>
  );
};