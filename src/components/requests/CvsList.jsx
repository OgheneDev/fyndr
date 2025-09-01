'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { User } from 'lucide-react';
import { Skeleton } from './Skeleton';
import { Toast } from '../ui/Toast';
import { DeleteModal } from './DeleteModal';
import { ModalContent } from './EditModalContent';
import { CvCard } from './CvCard';
import { useCvs } from '@/hooks/useCvs';

export const CvsList = ({ onCvUpdate }) => {
  const {
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
  } = useCvs();

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
            <CvCard
              key={cv._id}
              cv={cv}
              isDeleting={isDeleting}
              activeDropdown={activeDropdown}
              handleDropdownToggle={handleDropdownToggle}
              handleViewCv={handleViewCv}
              handleEditCv={handleEditCv}
              handleDeleteCv={handleDeleteCv}
            />
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
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setCvToDelete(null);
        }}
        onConfirm={confirmDelete}
        isDeleting={isDeleting !== null}
      />
      <Toast show={showToast} message={toastMessage} />
    </>
  );
};