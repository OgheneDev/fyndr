"use client";

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { nigerianStates } from '@/data/nigerianStates';
import { 
  PropertiesForm, 
  CarHireForm, 
  CarPartsForm, 
  CleaningForm, 
  AutomobileForm, 
  BeautyForm, 
  CateringForm, 
  CarpenterForm, 
  ElectricianForm, 
  ITForm, 
  MechanicForm, 
  MediaForm, 
  PlumberForm,
  HospitalityForm,
  EventManagementForm,
  EmploymentSelectionForm,
  EmployerForm,
  JobSeekerForm
} from './RequestForms';
import EmployerScreen from './EmployerScreen';
import JobSeekerScreen from './JobSeekerScreen';
import { carTypes, propertyTypes, cleaningTypes, carMakes, carModels, carYears } from '@/constants/requestConstants';

const FormRenderer = ({
  activeTab,
  formData,
  carHireData,
  cleaningData,
  carPartsData,
  automobileData,
  beautyData,
  cateringData,
  carpentryData,
  electricianData,
  itData,
  mechanicData,
  mediaData,
  plumberData,
  hospitalityData,
  eventManagementData,
  employmentData,
  onInputChange,
  onCarHireChange,
  onCleaningChange,
  onCarPartsChange,
  onAutomobileChange,
  onBeautyChange,
  onCateringChange,
  onCarpenterChange, 
  onElectricianChange,
  onITChange,
  onMechanicChange,
  onMediaChange,
  onPlumberChange,
  onHospitalityChange,
  onEventManagementChange,
  onEmploymentChange,
  isChecked,
  setIsChecked,
  showEmployerForm,
  setShowEmployerForm,
  showJobSeekerForm,
  setShowJobSeekerForm
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Callback to handle role selection and update URL
  const handleSelectRole = (role) => {
    onEmploymentChange('role', role);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('category', 'employment');
    newParams.set('role', role);
    newParams.delete('form');
    router.push(`/dashboard/new-request?${newParams.toString()}`);
  };

  // Callback to handle "Post a Job" button click
  const handlePostJobClick = () => {
    setShowEmployerForm(true);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('category', 'employment');
    newParams.set('role', 'employer');
    newParams.set('form', 'employer-form');
    router.push(`/dashboard/new-request?${newParams.toString()}`);
  };

  // Callback to handle "Apply for Jobs" button click
  const handleApplyJobClick = () => {
    setShowJobSeekerForm(true);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('category', 'employment');
    newParams.set('role', 'jobSeeker');
    newParams.set('form', 'jobSeeker-form');
    router.push(`/dashboard/new-request?${newParams.toString()}`);
  };

  // Callback to go back to EmployerScreen
  const handleBackToEmployerScreen = () => {
    setShowEmployerForm(false);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('category', 'employment');
    newParams.set('role', 'employer');
    newParams.delete('form');
    router.push(`/dashboard/new-request?${newParams.toString()}`);
  };

  // Callback to go back to JobSeekerScreen
  const handleBackToJobSeekerScreen = () => {
    setShowJobSeekerForm(false);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('category', 'employment');
    newParams.set('role', 'jobSeeker');
    newParams.delete('form');
    router.push(`/dashboard/new-request?${newParams.toString()}`);
  };

  if (activeTab === 'Properties') {
    return (
      <PropertiesForm
        formData={formData}
        onChange={onInputChange}
        nigerianStates={nigerianStates}
        propertyTypes={propertyTypes}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
      />
    );
  } else if (activeTab === 'Car Hire') {
    return (
      <CarHireForm
        carHireData={carHireData}
        onChange={onCarHireChange}
        nigerianStates={nigerianStates}
        carTypes={carTypes}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
      />
    );
  } else if (activeTab === 'Cleaning') {
    return (
      <CleaningForm
        cleaningData={cleaningData}
        onChange={onCleaningChange}
        nigerianStates={nigerianStates}
        propertyTypes={propertyTypes}
        cleaningTypes={cleaningTypes}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
      />
    );
  } else if (activeTab === 'Car Parts') {
    return (
      <CarPartsForm
        carPartsData={carPartsData}
        onChange={onCarPartsChange}
        nigerianStates={nigerianStates}
        carMakes={carMakes}
        carModels={carModels}
        carYears={carYears}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
      />
    );
  } else if (activeTab === 'Automobiles') {
    return (
      <AutomobileForm
        automobileData={automobileData}
        onChange={onAutomobileChange}
        nigerianStates={nigerianStates}
        carMakes={carMakes}
        carModels={carModels}
        carYears={carYears}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
      />
    );
  } else if (activeTab === 'Beauty') {
    return (
      <BeautyForm
        beautyData={beautyData}
        onChange={onBeautyChange}
        nigerianStates={nigerianStates}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
      />
    );
  } else if (activeTab === 'Catering') {
    return (
      <CateringForm
        cateringData={cateringData}
        onChange={onCateringChange}
        nigerianStates={nigerianStates}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
      />
    );
  } else if (activeTab === 'Carpentry') {
    return (
      <CarpenterForm
        carpentryData={carpentryData}
        onChange={onCarpenterChange}
        nigerianStates={nigerianStates}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
      />
    );
  } else if (activeTab === 'Electrician') {
    return (
      <ElectricianForm
        electricianData={electricianData}
        onChange={onElectricianChange}
        nigerianStates={nigerianStates}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
      />
    );
  } else if (activeTab === 'IT') {
    return (
      <ITForm
        itData={itData}
        onChange={onITChange}
        nigerianStates={nigerianStates}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
      />
    );
  } else if (activeTab === 'Mechanic') {
    return (
      <MechanicForm
        mechanicData={mechanicData}
        onChange={onMechanicChange}
        nigerianStates={nigerianStates}
        carMakes={carMakes}
        carModels={carModels}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
      />
    );
  } else if (activeTab === 'Media') {
    return (
      <MediaForm
        mediaData={mediaData}
        onChange={onMediaChange}
        nigerianStates={nigerianStates}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
      />
    );
  } else if (activeTab === 'Plumbing') {
    return (
      <PlumberForm
        plumberData={plumberData}
        onChange={onPlumberChange}
        nigerianStates={nigerianStates}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
      />
    );
  } else if (activeTab === 'Hospitality') {
    return (
      <HospitalityForm
        hospitalityData={hospitalityData}
        onChange={onHospitalityChange}
        nigerianStates={nigerianStates}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
      />
    );
  } else if (activeTab === 'Event Management') {
    return (
      <EventManagementForm
        eventManagementData={eventManagementData}
        onChange={onEventManagementChange}
        nigerianStates={nigerianStates}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
      />
    );
  } else if (activeTab === 'Employment' && !employmentData.role) {
    return (
      <EmploymentSelectionForm
        onSelectRole={handleSelectRole}
      />
    );
  } else if (activeTab === 'Employment' && employmentData.role === 'employer') {
    if (showEmployerForm) {
      return (
        <EmployerForm
          employmentData={employmentData}
          onChange={onEmploymentChange}
          nigerianStates={nigerianStates}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
          onBack={handleBackToEmployerScreen}
        />
      );
    }
    return (
      <EmployerScreen
        employmentData={employmentData}
        onChange={onEmploymentChange}
        nigerianStates={nigerianStates}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
        onPostJobClick={handlePostJobClick}
      />
    );
  } else if (activeTab === 'Employment' && employmentData.role === 'jobSeeker') {
    if (showJobSeekerForm) {
      return (
        <JobSeekerForm
          employmentData={employmentData}
          onChange={onEmploymentChange}
          nigerianStates={nigerianStates}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
          onBack={handleBackToJobSeekerScreen}
        />
      );
    }
    return (
      <JobSeekerScreen
        onShowApplicationClick={handleApplyJobClick}
      />
    );
  }
  return null;
};

export default FormRenderer;
