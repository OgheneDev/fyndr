"use client";

import { useState, useCallback } from 'react';

const useRequestStates = () => {
  const [formData, setFormData] = useState({
    state: '',
    axis: [],
    details: '',
    rentType: '',
    propertyType: '',
    roomNumber: '',
    propertyCondition: '',
    upperPriceLimit: '',
    lowerPriceLimit: '',
  });
  const [carHireData, setCarHireData] = useState({
    state: '',
    details: '',
    carType: '',
    hireDuration: '',
    pickupLocation: '',
    airport: '',
    travel: '',
  });
  const [cleaningData, setCleaningData] = useState({
    state: '',
    lga: '',
    details: '',
    propertyType: '',
    cleaningType: '',
    propertyLocation: '',
    roomNumber: '',
  });
  const [carPartsData, setCarPartsData] = useState({
    car_part_image: '',
    state: '',
    details: '',
    currentLocation: '',
    sourcingLocation: '',
    carMake: '',
    carModel: '',
    carYear: '',
    attachment: null,
  });
  const [automobileData, setAutomobileData] = useState({
    state: '',
    details: '',
    location: '',
    carMake: '',
    carModel: '',
    carYearFrom: '',
    carYearTo: '',
    transmission: '',
    upperPriceLimit: '',
    lowerPriceLimit: '',
  });
  const [beautyData, setBeautyData] = useState({
    state: '',
    targetLocation: '',
    service: '',
    date: '',
    time: '',
    details: '',
  });
  const [cateringData, setCateringData] = useState({
    state: '',
    location: '',
    eventLocation: '',
    eventDate: '',
    details: '',
  });
  const [carpentryData, setcarpentryData] = useState({
    state: '',
    location: '',
    dateNeeded: '',
    details: '',
  });
  const [electricianData, setElectricianData] = useState({
    state: '',
    location: '',
    dateNeeded: '',
    details: '',
  });
  const [itData, setITData] = useState({
    state: '',
    targetLocation: '',
    service: '',
    details: '',
  });
  const [mechanicData, setMechanicData] = useState({
    state: '',
    currentLocation: '',
    carMake: '',
    carModel: '',
    year: '',
    transmission: '',
    details: '',
  });
  const [mediaData, setMediaData] = useState({
    state: '',
    targetLocation: '',
    service: '',
    details: '',
  });
  const [plumberData, setPlumberData] = useState({
    state: '',
    location: '',
    dateNeeded: '',
    details: '',
  });
  const [hospitalityData, setHospitalityData] = useState({
    state: '',
    location: '',
    service: '',
    dateNeeded: '',
    timeNeeded: '',
    details: '',
  });
  const [eventManagementData, setEventManagementData] = useState({
    state: '',
    location: '',
    service: '',
    eventLocation: '',
    dateNeeded: '',
    details: '',
  });
  const [employmentData, setEmploymentData] = useState({
    company: '',
    firstName: '',
    lastName: '',
    number: '',
    email: '',
    howYouHeardAboutUs: '',
    jobTitle: '',
    jobLocation: '',
    state: '',
    lga: '',
    area: '',
    graduate: '',
    type: '',
    startDate: '',
    salary: '',
    salaryCurrency: '',
    benefits: [],
    availableVacancy: '',
    additionalCertificate: '',
    description: '',
    levelOfEducation: '',
    whatDidYouStudy: '',
    schoolName: '',
    startYear: '',
    endYear: '',
    workExperience: '',
    yearsOfExperience: '',
    duration: '',
    additionalSkills: [],
    languages: [],
    preferredJobTitle: '',
  });

  const handleInputChange = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, [setFormData]);

  const handleCarHireChange = useCallback((field, value) => {
    setCarHireData((prev) => ({ ...prev, [field]: value }));
  }, [setCarHireData]);

  const handleCleaningChange = useCallback((field, value) => {
    setCleaningData((prev) => ({ ...prev, [field]: value }));
  }, [setCleaningData]);

  const handleCarPartsChange = useCallback((field, value) => {
    setCarPartsData((prev) => ({ ...prev, [field]: value }));
  }, [setCarPartsData]);

  const handleAutomobileChange = useCallback((field, value) => {
    setAutomobileData((prev) => ({ ...prev, [field]: value }));
  }, [setAutomobileData]);

  const handleBeautyChange = useCallback((field, value) => {
    setBeautyData((prev) => ({ ...prev, [field]: value }));
  }, [setBeautyData]);

  const handleCateringChange = useCallback((field, value) => {
    setCateringData((prev) => ({ ...prev, [field]: value }));
  }, [setCateringData]);

  const handleCarpenterChange = useCallback((field, value) => {
    setcarpentryData((prev) => ({ ...prev, [field]: value }));
  }, [setcarpentryData]);

  const handleElectricianChange = useCallback((field, value) => {
    setElectricianData((prev) => ({ ...prev, [field]: value }));
  }, [setElectricianData]);

  const handleITChange = useCallback((field, value) => {
    setITData((prev) => ({ ...prev, [field]: value }));
  }, [setITData]);

  const handleMechanicChange = useCallback((field, value) => {
    setMechanicData((prev) => ({ ...prev, [field]: value }));
  }, [setMechanicData]);

  const handleMediaChange = useCallback((field, value) => {
    setMediaData((prev) => ({ ...prev, [field]: value }));
  }, [setMediaData]);

  const handlePlumberChange = useCallback((field, value) => {
    setPlumberData((prev) => ({ ...prev, [field]: value }));
  }, [setPlumberData]);

  const handleHospitalityChange = useCallback((field, value) => {
    setHospitalityData((prev) => ({ ...prev, [field]: value }));
  }, [setHospitalityData]);

  const handleEventManagementChange = useCallback((field, value) => {
    setEventManagementData((prev) => ({ ...prev, [field]: value }));
  }, [setEventManagementData]);

  const handleEmploymentChange = useCallback((field, value) => {
    setEmploymentData((prev) => ({ ...prev, [field]: value }));
  }, [setEmploymentData]);

  return {
    formData, setFormData,
    carHireData, setCarHireData,
    cleaningData, setCleaningData,
    carPartsData, setCarPartsData,
    automobileData, setAutomobileData,
    beautyData, setBeautyData,
    cateringData, setCateringData,
    carpentryData, setcarpentryData,
    electricianData, setElectricianData,
    itData, setITData,
    mechanicData, setMechanicData,
    mediaData, setMediaData,
    plumberData, setPlumberData,
    hospitalityData, setHospitalityData,
    eventManagementData, setEventManagementData,
    employmentData, setEmploymentData,
    handleInputChange,
    handleCarHireChange,
    handleCleaningChange,
    handleCarPartsChange,
    handleAutomobileChange,
    handleBeautyChange,
    handleCateringChange,
    handleCarpenterChange,
    handleElectricianChange,
    handleITChange,
    handleMechanicChange,
    handleMediaChange,
    handlePlumberChange,
    handleHospitalityChange,
    handleEventManagementChange,
    handleEmploymentChange
  };
};

export default useRequestStates;
