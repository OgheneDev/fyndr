
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { Loader2 } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import SearchParamsTab from './SearchParamsTab';
import FormRenderer from './FormRenderer';
import DisclaimerModal from './DisclaimerModal';
import {
  realEstateRequest,
  carHireRequest,
  cleaningRequest,
  carPartsRequest,
  automobileRequest,
  beautyRequest,
  cateringRequest,
  carpenterRequest,
  electricianRequest,
  itRequest,
  mechanicRequest,
  mediaRequest,
  plumberRequest,
  hospitalityRequest,
  eventManagementRequest,
} from '@/api/requests/users/requests';
import { createJob } from '@/api/jobs/requests';
import { createCV } from '@/api/cvs/requests';
import { tabs, initialTab } from '@/constants/requestConstants';
import useRequestStates from '@/hooks/useRequestStates';

const NewRequestPageContent = () => {
  const router = useRouter();
  const { token } = useAuthStore();
  const [activeTab, setActiveTab] = useState(initialTab);
  const {
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
  } = useRequestStates();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const getCategory = () => {
    const tab = tabs.find((t) => t.label === activeTab);
    return tab ? tab.category : '';
  };

  const isFormValid = () => {
    const category = getCategory();
    if (category === 'real-estate') {
      return (
        formData.state &&
        formData.axis.length > 0 &&
        formData.rentType &&
        formData.propertyType &&
        formData.roomNumber &&
        formData.propertyCondition &&
        formData.lowerPriceLimit &&
        formData.upperPriceLimit
      );
    } else if (category === 'car-hire') {
      return (
        carHireData.state &&
        carHireData.carType &&
        carHireData.hireDuration &&
        carHireData.pickupLocation &&
        carHireData.airport &&
        carHireData.travel
      );
    } else if (category === 'cleaning') {
      return (
        cleaningData.state &&
        cleaningData.lga &&
        cleaningData.propertyType &&
        cleaningData.cleaningType &&
        cleaningData.propertyLocation &&
        cleaningData.roomNumber
      );
    } else if (category === 'car-parts') {
      return (
        carPartsData.state &&
        carPartsData.currentLocation &&
        carPartsData.sourcingLocation &&
        carPartsData.carMake &&
        carPartsData.carModel &&
        carPartsData.carYear
      );
    } else if (category === 'automobile') {
      return (
        automobileData.state &&
        automobileData.location &&
        automobileData.carMake &&
        automobileData.carModel &&
        automobileData.carYearFrom &&
        automobileData.carYearTo &&
        automobileData.transmission &&
        automobileData.lowerPriceLimit &&
        automobileData.upperPriceLimit
      );
    } else if (category === 'beauty') {
      return (
        beautyData.state &&
        beautyData.targetLocation &&
        beautyData.service &&
        beautyData.date &&
        beautyData.time
      );
    } else if (category === 'catering') {
      return (
        cateringData.state &&
        cateringData.location &&
        cateringData.eventLocation &&
        cateringData.eventDate
      );
    } else if (category === 'carpenter') {
      return (
        carpentryData.state &&
        carpentryData.location &&
        carpentryData.dateNeeded
      );
    } else if (category === 'electrician') {
      return (
        electricianData.state &&
        electricianData.location &&
        electricianData.dateNeeded
      );
    } else if (category === 'it') {
      return (
        itData.state &&
        itData.targetLocation &&
        itData.service
      );
    } else if (category === 'mechanic') {
      return (
        mechanicData.state &&
        mechanicData.currentLocation &&
        mechanicData.carMake &&
        mechanicData.carModel &&
        mechanicData.year &&
        mechanicData.transmission
      );
    } else if (category === 'media') {
      return (
        mediaData.state &&
        mediaData.targetLocation &&
        mediaData.service
      );
    } else if (category === 'plumbing') {
      return (
        plumberData.state &&
        plumberData.location &&
        plumberData.dateNeeded
      );
    } else if (category === 'hospitality') {
      return (
        hospitalityData.state &&
        hospitalityData.location &&
        hospitalityData.service &&
        hospitalityData.dateNeeded &&
        hospitalityData.timeNeeded
      );
    } else if (category === 'event-management') {
      return (
        eventManagementData.state &&
        eventManagementData.location &&
        eventManagementData.service &&
        eventManagementData.eventLocation &&
        eventManagementData.dateNeeded
      );
    } else if (category === 'employment') {
      if (employmentData.role === 'employer') {
        return (
          employmentData.company &&
          employmentData.firstName &&
          employmentData.lastName &&
          employmentData.number &&
          employmentData.email &&
          employmentData.jobTitle &&
          employmentData.jobLocation &&
          employmentData.type &&
          employmentData.startDate &&
          employmentData.salary &&
          employmentData.salaryCurrency &&
          employmentData.benefits &&
          employmentData.availableVacancy &&
          employmentData.description
        );
      } else if (employmentData.role === 'jobSeeker') {
        return (
          employmentData.firstName &&
          employmentData.lastName &&
          employmentData.number &&
          employmentData.email &&
          employmentData.state &&
          employmentData.lga &&
          employmentData.area &&
          employmentData.graduate &&
          employmentData.levelOfEducation
        );
      }
      return false;
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowDisclaimer(true);
  };

  const handleDisclaimerAgree = async () => {
  setShowDisclaimer(false);
  setError('');
  setSuccess('');
  setLoading(true);
  try {
    const category = getCategory();
    if (!category) {
      throw new Error('Invalid request category');
    }
    let label = tabs.find((t) => t.category === category)?.label || 'Request';
    let requestId;

    if (category === 'real-estate') {
      const response = await realEstateRequest({
        title: 'Real Estate Request',
        state: formData.state,
        axis: formData.axis,
        details: formData.details,
        rentType: formData.rentType,
        propertyType: formData.propertyType,
        roomNumber: formData.roomNumber,
        propertyCondition: formData.propertyCondition,
        upperPriceLimit: Number(formData.upperPriceLimit) || 0,
        lowerPriceLimit: Number(formData.lowerPriceLimit) || 0,
      });
      requestId = response.data._id;
      setFormData({
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
    } else if (category === 'car-hire') {
      const response = await carHireRequest({
        title: 'Car Hire Request',
        state: carHireData.state,
        details: carHireData.details,
        carType: carHireData.carType,
        hireDuration: Number(carHireData.hireDuration) || 0,
        pickupLocation: carHireData.pickupLocation,
        airport: carHireData.airport,
        travel: carHireData.travel === 'Yes',
      });
      requestId = response.data._id;
      setCarHireData({
        state: '',
        details: '',
        carType: '',
        hireDuration: '',
        pickupLocation: '',
        airport: '',
        travel: '',
      });
    } else if (category === 'cleaning') {
      const response = await cleaningRequest({
        title: 'Cleaning Request',
        state: cleaningData.state,
        lga: cleaningData.lga,
        details: cleaningData.details,
        propertyType: cleaningData.propertyType,
        cleaningType: cleaningData.cleaningType,
        propertyLocation: cleaningData.propertyLocation,
        roomNumber: cleaningData.roomNumber,
      });
      requestId = response.data._id;
      setCleaningData({
        state: '',
        lga: '',
        details: '',
        propertyType: '',
        cleaningType: '',
        propertyLocation: '',
        roomNumber: '',
      });
    } else if (category === 'car-parts') {
      const fd = new FormData();
      fd.append('title', 'Car Parts Request');
      fd.append('state', carPartsData.state);
      fd.append('details', carPartsData.details);
      fd.append('currentLocation', carPartsData.currentLocation);
      fd.append('sourcingLocation', carPartsData.sourcingLocation);
      fd.append('carMake', carPartsData.carMake);
      fd.append('carModel', carPartsData.carModel);
      fd.append('carYear', Number(carPartsData.carYear) || 0);
      if (carPartsData.attachment) {
        fd.append('car_part_image', carPartsData.attachment);
      }
      const response = await carPartsRequest(fd);
      requestId = response.data._id;
      setCarPartsData({
        state: '',
        details: '',
        currentLocation: '',
        sourcingLocation: '',
        carMake: '',
        carModel: '',
        carYear: '',
        attachment: null,
      });
    } else if (category === 'automobile') {
      const response = await automobileRequest({
        title: 'Automobile Request',
        state: automobileData.state,
        details: automobileData.details,
        location: automobileData.location,
        carMake: automobileData.carMake,
        carModel: automobileData.carModel,
        carYearFrom: Number(automobileData.carYearFrom) || 0,
        carYearTo: Number(automobileData.carYearTo) || 0,
        transmission: automobileData.transmission,
        upperPriceLimit: Number(automobileData.upperPriceLimit) || 0,
        lowerPriceLimit: Number(automobileData.lowerPriceLimit) || 0,
      });
      requestId = response.data._id;
      setAutomobileData({
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
    } else if (category === 'beauty') {
      const response = await beautyRequest({
        title: 'Beauty Request',
        state: beautyData.state,
        targetLocation: beautyData.targetLocation,
        service: beautyData.service,
        date: beautyData.date,
        time: beautyData.time,
        details: beautyData.details,
      });
      requestId = response.data._id;
      setBeautyData({
        state: '',
        targetLocation: '',
        service: '',
        date: '',
        time: '',
        details: '',
      });
    } else if (category === 'catering') {
      const response = await cateringRequest({
        title: 'Catering Request',
        state: cateringData.state,
        location: cateringData.location,
        eventLocation: cateringData.eventLocation,
        eventDate: cateringData.eventDate,
        details: cateringData.details,
      });
      requestId = response.data._id;
      setCateringData({
        state: '',
        location: '',
        eventLocation: '',
        eventDate: '',
        details: '',
      });
    } else if (category === 'carpenter') {
      const response = await carpenterRequest({
        title: 'Carpenter Request',
        state: carpentryData.state,
        location: carpentryData.location,
        dateNeeded: carpentryData.dateNeeded,
        details: carpentryData.details,
      });
      requestId = response.data._id;
      setcarpentryData({
        state: '',
        location: '',
        dateNeeded: '',
        details: '',
      });
    } else if (category === 'electrician') {
      const response = await electricianRequest({
        title: 'Electrician Request',
        state: electricianData.state,
        location: electricianData.location,
        dateNeeded: electricianData.dateNeeded,
        details: electricianData.details,
      });
      requestId = response.data._id;
      setElectricianData({
        state: '',
        location: '',
        dateNeeded: '',
        details: '',
      });
    } else if (category === 'it') {
      const response = await itRequest({
        title: 'IT Request',
        state: itData.state,
        targetLocation: itData.targetLocation,
        service: itData.service,
        details: itData.details,
      });
      requestId = response.data._id;
      setITData({
        state: '',
        targetLocation: '',
        service: '',
        details: '',
      });
    } else if (category === 'mechanic') {
      const response = await mechanicRequest({
        title: 'Mechanic Request',
        state: mechanicData.state,
        currentLocation: mechanicData.currentLocation,
        carMake: mechanicData.carMake,
        carModel: mechanicData.carModel,
        year: Number(mechanicData.year) || 0,
        transmission: mechanicData.transmission,
        details: mechanicData.details,
      });
      requestId = response.data._id;
      setMechanicData({
        state: '',
        currentLocation: '',
        carMake: '',
        carModel: '',
        year: '',
        transmission: '',
        details: '',
      });
    } else if (category === 'media') {
      const response = await mediaRequest({
        title: 'Media Request',
        state: mediaData.state,
        targetLocation: mediaData.targetLocation,
        service: mediaData.service,
        details: mediaData.details,
      });
      requestId = response.data._id;
      setMediaData({
        state: '',
        targetLocation: '',
        service: '',
        details: '',
      });
    } else if (category === 'plumbing') {
      const response = await plumberRequest({
        title: 'Plumber Request',
        state: plumberData.state,
        location: plumberData.location,
        dateNeeded: plumberData.dateNeeded,
        details: plumberData.details,
      });
      requestId = response.data._id;
      setPlumberData({
        state: '',
        location: '',
        dateNeeded: '',
        details: '',
      });
    } else if (category === 'hospitality') {
      const response = await hospitalityRequest({
        title: 'Hospitality Request',
        state: hospitalityData.state,
        location: hospitalityData.location,
        service: hospitalityData.service,
        dateNeeded: hospitalityData.dateNeeded,
        timeNeeded: hospitalityData.timeNeeded,
        details: hospitalityData.details,
      });
      requestId = response.data._id;
      setHospitalityData({
        state: '',
        location: '',
        service: '',
        dateNeeded: '',
        timeNeeded: '',
        details: '',
      });
    } else if (category === 'event-management') {
      const response = await eventManagementRequest({
        title: 'Event Management Request',
        state: eventManagementData.state,
        location: eventManagementData.location,
        service: eventManagementData.service,
        eventLocation: eventManagementData.eventLocation,
        dateNeeded: eventManagementData.dateNeeded,
        details: eventManagementData.details,
      });
      requestId = response.data._id;
      setEventManagementData({
        state: '',
        location: '',
        service: '',
        eventLocation: '',
        dateNeeded: '',
        details: '',
      });
    } else if (category === 'employment') {
      if (employmentData.role === 'employer') {
        const formData = {
          company: employmentData.company,
          firstName: employmentData.firstName,
          lastName: employmentData.lastName,
          number: employmentData.number,
          email: employmentData.email,
          jobTitle: employmentData.jobTitle,
          jobLocation: employmentData.jobLocation,
          type: employmentData.type,
          startDate: employmentData.startDate,
          salary: employmentData.salary,
          salaryCurrency: employmentData.salaryCurrency,
          benefits: employmentData.benefits,
          availableVacancy: employmentData.availableVacancy,
          description: employmentData.description,
        };
        console.log(formData)
        const response = await createJob(formData);
        console.log('createJob response:', response); // Log the response
        requestId = response.data._id; // Adjust based on actual response structure
        setEmploymentData({ ...employmentData, role: '' });
      } else if (employmentData.role === 'jobSeeker') {
        const formData = {
          firstName: employmentData.firstName,
          lastName: employmentData.lastName,
          number: employmentData.number,
          email: employmentData.email,
          state: employmentData.state,
          lga: employmentData.lga,
          area: employmentData.area,
          isGraduate: employmentData.graduate,
          educationLevel: employmentData.levelOfEducation,
          educationMajor: employmentData.whatDidYouStudy,
          schoolName: employmentData.schoolName,
          startYear: employmentData.startYear,
          endYear: employmentData.endYear,
          hasWorkExperience: employmentData.workExperience,
          workExperienceYears: Number(employmentData.yearsOfExperience) || 0,
          workExperienceCompany: employmentData.company,
          workExperienceTitle: employmentData.jobTitle,
          workExperienceDuration: employmentData.duration,
          skills: employmentData.additionalSkills,
          additionalCertificate: employmentData.additionalCertificate,
          languages: employmentData.languages,
        };
        console.log(formData)
        const response = await createCV(formData);
        console.log('createCV response:', response);
        requestId = response.data._id; // Adjust based on actual response structure
        setEmploymentData({ ...employmentData, role: '' });
      } else {
        throw new Error('No role selected for employment request');
      }
    } else {
      throw new Error(`Unknown request category: ${category}`);
    }

    if (!requestId) {
      throw new Error('Request ID not found in API response');
    }

    setSuccess('Request submitted successfully!');
    // Skip payment page for employment requests
if (category === 'employment') {
  Swal.fire({
    icon: 'success',
    title: `${label} submitted successfully`,
    text: 'Thank you for your submission!',
    confirmButtonColor: '#541229',
    timer: 2000,
  });
  setIsChecked(false);
} else {
  // For all other request types, continue to payment
  Swal.fire({
    icon: 'success',
    title: `${label} request posted successfully`,
    text: `Please make Payment.`,
    confirmButtonColor: '#541229',
    timer: 2000,
  });
  setIsChecked(false);
  router.push(`/payment?id=${requestId}&token=${encodeURIComponent(token || '')}`);
}
  } catch (err) {
    console.error('Error in handleDisclaimerAgree:', err);
    setError('Failed to submit request: ' + (err.message || 'Unknown error'));
  } finally {
    setLoading(false);
  }
};

  const handleDisclaimerCancel = () => {
    setShowDisclaimer(false);
  };

  useEffect(() => {
    // Only reset role when switching AWAY from Employment tab
    if (activeTab !== 'Employment' && employmentData.role) {
      setEmploymentData((prev) => ({ ...prev, role: '' }));
    }
  }, [activeTab, employmentData.role, setEmploymentData]);

  return (
    <div className="min-h-screen bg-white">
      <SearchParamsTab setActiveTab={setActiveTab} initialTab={initialTab} />
      <div className="bg-white py-8 lg:px-8">
        <div className="md:max-w-3xl md:mx-auto">
          <div className="px-5">
            <form className="bg-white" onSubmit={handleSubmit}>
              <FormRenderer
                activeTab={activeTab}
                formData={formData}
                carHireData={carHireData}
                cleaningData={cleaningData}
                carPartsData={carPartsData}
                automobileData={automobileData}
                beautyData={beautyData}
                cateringData={cateringData}
                carpentryData={carpentryData}
                electricianData={electricianData}
                itData={itData}
                mechanicData={mechanicData}
                mediaData={mediaData}
                plumberData={plumberData}
                hospitalityData={hospitalityData}
                eventManagementData={eventManagementData}
                employmentData={employmentData}
                onInputChange={handleInputChange}
                onCarHireChange={handleCarHireChange}
                onCleaningChange={handleCleaningChange}
                onCarPartsChange={handleCarPartsChange}
                onAutomobileChange={handleAutomobileChange}
                onBeautyChange={handleBeautyChange}
                onCateringChange={handleCateringChange}
                onCarpenterChange={handleCarpenterChange}
                onElectricianChange={handleElectricianChange}
                onITChange={handleITChange}
                onMechanicChange={handleMechanicChange}
                onMediaChange={handleMediaChange}
                onPlumberChange={handlePlumberChange}
                onHospitalityChange={handleHospitalityChange}
                onEventManagementChange={handleEventManagementChange}
                onEmploymentChange={handleEmploymentChange}
                isChecked={isChecked}
                setIsChecked={setIsChecked}
              />
              {!(activeTab === 'Employment' && !employmentData.role) && (
                <div className="mt-8 flex flex-col items-end">
                  {error && <div className="text-red-500 mb-2">{error}</div>}
                  <button
                    type="submit"
                    className={`w-full sm:w-auto px-8 py-3 bg-[#541229] text-sm cursor-pointer text-white rounded-lg flex items-center justify-center gap-2 ${
                      !isFormValid() || !isChecked || loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={!isFormValid() || !isChecked || loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin w-4 h-4" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Request'
                    )}
                  </button>
                </div>
              )}
            </form>
            <DisclaimerModal
              show={showDisclaimer}
              onAgree={handleDisclaimerAgree}
              onCancel={handleDisclaimerCancel}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRequestPageContent;