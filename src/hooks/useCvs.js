'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/useToast';
import { deleteCv, updateCv, getPersonalCvs } from '@/api/cvs/requests';

export const useCvs = () => {
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCv, setEditingCv] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null);
  const [modalRoot, setModalRoot] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [cvToDelete, setCvToDelete] = useState(null);
  const { showToast, toastMessage, triggerToast } = useToast();

  const fetchCvs = async () => {
    try {
      setLoading(true);
      const response = await getPersonalCvs();
      const cvsData = response?.data || [];
      cvsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setCvs(cvsData);
    } catch (error) {
      console.error('Error fetching CVs:', error);
      triggerToast('Failed to load CVs', 'error');
      setCvs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCvs();
  }, []);

  useEffect(() => {
    const root = document.getElementById('modal-root') || document.body;
    setModalRoot(root);

    if (showEditModal || showDeleteModal) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => document.body.classList.remove('no-scroll');
  }, [showEditModal, showDeleteModal]);

  const [formData, setFormData] = useState({
    workExperienceDetails: [{ company: '', jobTitle: '', startYear: '', endYear: '', description: '' }],
    skills: [''],
    additionalCertificate: '',
    languages: [''],
  });

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

  const handleDeleteCv = (cvId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDropdown(null);
    setCvToDelete(cvId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!cvToDelete) return;

    setIsDeleting(cvToDelete);
    try {
      await deleteCv({ cvId: cvToDelete });
      await fetchCvs();
      triggerToast('The CV has been successfully deleted!');
    } catch (error) {
      console.error('Error deleting CV:', error);
      triggerToast('Failed to delete CV. Please try again.', 'error');
    } finally {
      setIsDeleting(null);
      setShowDeleteModal(false);
      setCvToDelete(null);
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
      await fetchCvs();
      triggerToast('Your CV has been updated successfully.');
    } catch (error) {
      console.error('Error updating CV:', error);
      triggerToast('Error updating CV. Please try again!', 'error');
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

  return {
    cvs,
    loading,
    activeDropdown,
    showEditModal,
    editingCv,
    isUpdating,
    isDeleting,
    showDeleteModal,
    cvToDelete,
    showToast,
    toastMessage,
    modalRoot,
    formData,
    setActiveDropdown,
    setShowEditModal,
    setEditingCv,
    setFormData,
    setShowDeleteModal,
    setCvToDelete,
    handleDropdownToggle,
    handleViewCv,
    handleEditCv,
    handleDeleteCv,
    confirmDelete,
    handleFormSubmit,
    addWorkExperience,
    removeWorkExperience,
    updateWorkExperience,
    addLanguage,
    removeLanguage,
    updateLanguage,
    triggerToast,
  };
};