"use client";

import React, { useState, Suspense, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
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
  EventManagementForm 
} from './RequestForms';
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
import Swal from 'sweetalert2';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useAuthStore } from '@/store/authStore';

const carTypes = ['Sedan', 'SUV', 'Hatchback', 'Convertible', 'Van', 'Truck'];
const propertyTypes = ['Apartment', 'Detached', 'Semi-Detached', 'Terrace', 'Bungalow', 'Duplex', 'Mansion'];
const cleaningTypes = ['regular', 'post-construction'];
const carMakes = ['Toyota', 'Honda', 'Ford', 'Nissan', 'Hyundai', 'Kia', 'Mercedes', 'BMW', 'Lexus'];
const carModels = {
  Toyota: ['Corolla', 'Camry', 'RAV4', 'Highlander'],
  Honda: ['Civic', 'Accord', 'CR-V'],
  Ford: ['Focus', 'Fusion', 'Escape'],
  Nissan: ['Altima', 'Sentra', 'Rogue'],
  Hyundai: ['Elantra', 'Sonata', 'Tucson'],
  Kia: ['Rio', 'Sportage', 'Sorento'],
  Mercedes: ['C-Class', 'E-Class', 'GLA'],
  BMW: ['3 Series', '5 Series', 'X3'],
  Lexus: ['RX', 'ES', 'GX'],
};
const carYears = Array.from({ length: 56 }, (_, i) => `${1970 + i}`);

const tabs = [
  { label: 'Properties', category: 'real-estate' },
  { label: 'Car Hire', category: 'car-hire' },
  { label: 'Cleaning', category: 'cleaning' },
  { label: 'Car Parts', category: 'car-parts' },
  { label: 'Automobiles', category: 'automobile' },
  { label: 'Beauty', category: 'beauty' },
  { label: 'Catering', category: 'catering' },
  { label: 'Carpentry', category: 'carpenter' },
  { label: 'Electrician', category: 'electrician' },
  { label: 'IT', category: 'it' },
  { label: 'Mechanic', category: 'mechanic' },
  { label: 'Media', category: 'media' },
  { label: 'Plumbing', category: 'plumbing' },
  { label: 'Hospitality', category: 'hospitality' },
  { label: 'Event Management', category: 'event-management' },
];

const SearchParamsTab = ({ setActiveTab, initialTab }) => {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const tab = tabs.find((tab) => tab.category === categoryParam)?.label || 'Properties';

  React.useEffect(() => {
    if (categoryParam && tab !== initialTab) {
      setActiveTab(tab);
    }
  }, [categoryParam, setActiveTab, initialTab, tab]);

  return null;
};

const NewRequestPage = () => {
  const router = useRouter();
  const { token } = useAuthStore();
  const initialTab = 'Properties';
  const [activeTab, setActiveTab] = useState(initialTab);
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [authToken, setAuthToken] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleCarHireChange = (field, value) => {
    setCarHireData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleCleaningChange = (field, value) => {
    setCleaningData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleCarPartsChange = (field, value) => {
    setCarPartsData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleAutomobileChange = (field, value) => {
    setAutomobileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleBeautyChange = (field, value) => {
    setBeautyData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleCateringChange = (field, value) => {
    setCateringData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleCarpenterChange = (field, value) => {
    setcarpentryData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleElectricianChange = (field, value) => {
    setElectricianData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleITChange = (field, value) => {
    setITData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleMechanicChange = (field, value) => {
    setMechanicData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleMediaChange = (field, value) => {
    setMediaData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handlePlumberChange = (field, value) => {
    setPlumberData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleHospitalityChange = (field, value) => {
    setHospitalityData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleEventManagementChange = (field, value) => {
    setEventManagementData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

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
        if (!requestId) {
          throw new Error('Request ID not found in API response');
        }
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
        if (!requestId) {
          throw new Error('Request ID not found in API response');
        }
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
        if (!requestId) {
          throw new Error('Request ID not found in API response');
        }
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
        if (!requestId) {
          throw new Error('Request ID not found in API response');
        }
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
        if (!requestId) {
          throw new Error('Request ID not found in API response');
        }
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
        if (!requestId) {
          throw new Error('Request ID not found in API response');
        }
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
        if (!requestId) {
          throw new Error('Request ID not found in API response');
        }
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
        if (!requestId) {
          throw new Error('Request ID not found in API response');
        }
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
        if (!requestId) {
          throw new Error('Request ID not found in API response');
        }
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
        if (!requestId) {
          throw new Error('Request ID not found in API response');
        }
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
        if (!requestId) {
          throw new Error('Request ID not found in API response');
        }
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
        if (!requestId) {
          throw new Error('Request ID not found in API response');
        }
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
        if (!requestId) {
          throw new Error('Request ID not found in API response');
        }
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
        if (!requestId) {
          throw new Error('Request ID not found in API response');
        }
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
        if (!requestId) {
          throw new Error('Request ID not found in API response');
        }
        setEventManagementData({
          state: '',
          location: '',
          service: '',
          eventLocation: '',
          dateNeeded: '',
          details: '',
        });
      } else {
        throw new Error(`Unknown request category: ${category}`);
      }

      setSuccess('Request submitted successfully!');
      Swal.fire({
        icon: 'success',
        title: `${label} request posted successfully`,
        text: `Please make Payment.`,
        confirmButtonColor: '#541229',
        timer: 2000,
      });
      setIsChecked(false);

      router.push(`/payment?id=${requestId}&token=${encodeURIComponent(token || '')}`);
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

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="animate-pulse">
            <Image
              src="/images/logo.png"
              alt="Company Logo"
              width={100}
              height={100}
              className="transition-all duration-1000 hover:scale-110"
            />
          </div>
        </div>
      }
    >
      <div className="min-h-screen bg-white">
        <Suspense
          fallback={
            <div className="min-h-screen bg-white flex items-center justify-center">
              <div className="animate-pulse">
                <Image
                  src="/images/logo.png"
                  alt="Company Logo"
                  width={100}
                  height={100}
                  className="transition-all duration-1000 hover:scale-110"
                />
              </div>
            </div>
          }
        >
          <SearchParamsTab setActiveTab={setActiveTab} initialTab={initialTab} />
        </Suspense>
        <div className="bg-white py-8 lg:px-8">
          <div className="md:max-w-3xl md:mx-auto">
            <div className="hidden gap-1 md:gap-5 px-1 mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(tab.label)}
                  className={`px-2 md:px-0 py-2 text-[12px] cursor-pointer border-b-2 transition-all duration-200 ${
                    activeTab === tab.label ? 'text-gray-900' : 'border-[#E5E8EB] text-[#637587]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="px-5">
              <form className="bg-white" onSubmit={handleSubmit}>
                {activeTab === 'Properties' && (
                  <PropertiesForm
                    formData={formData}
                    onChange={handleInputChange}
                    nigerianStates={nigerianStates}
                    propertyTypes={propertyTypes}
                    isChecked={isChecked}
                    setIsChecked={setIsChecked}
                  />
                )}
                {activeTab === 'Car Hire' && (
                  <CarHireForm
                    carHireData={carHireData}
                    onChange={handleCarHireChange}
                    nigerianStates={nigerianStates}
                    carTypes={carTypes}
                    isChecked={isChecked}
                    setIsChecked={setIsChecked}
                  />
                )}
                {activeTab === 'Cleaning' && (
                  <CleaningForm
                    cleaningData={cleaningData}
                    onChange={handleCleaningChange}
                    nigerianStates={nigerianStates}
                    propertyTypes={propertyTypes}
                    cleaningTypes={cleaningTypes}
                    isChecked={isChecked}
                    setIsChecked={setIsChecked}
                  />
                )}
                {activeTab === 'Car Parts' && (
                  <CarPartsForm
                    carPartsData={carPartsData}
                    onChange={handleCarPartsChange}
                    nigerianStates={nigerianStates}
                    carMakes={carMakes}
                    carModels={carModels}
                    carYears={carYears}
                    isChecked={isChecked}
                    setIsChecked={setIsChecked}
                  />
                )}
                {activeTab === 'Automobiles' && (
                  <AutomobileForm
                    automobileData={automobileData}
                    onChange={handleAutomobileChange}
                    nigerianStates={nigerianStates}
                    carMakes={carMakes}
                    carModels={carModels}
                    carYears={carYears}
                    isChecked={isChecked}
                    setIsChecked={setIsChecked}
                  />
                )}
                {activeTab === 'Beauty' && (
                  <BeautyForm
                    beautyData={beautyData}
                    onChange={handleBeautyChange}
                    nigerianStates={nigerianStates}
                    isChecked={isChecked}
                    setIsChecked={setIsChecked}
                  />
                )}
                {activeTab === 'Catering' && (
                  <CateringForm
                    cateringData={cateringData}
                    onChange={handleCateringChange}
                    nigerianStates={nigerianStates}
                    isChecked={isChecked}
                    setIsChecked={setIsChecked}
                  />
                )}
                {activeTab === 'Carpentry' && (
                  <CarpenterForm
                    carpentryData={carpentryData}
                    onChange={handleCarpenterChange}
                    nigerianStates={nigerianStates}
                    isChecked={isChecked}
                    setIsChecked={setIsChecked}
                  />
                )}
                {activeTab === 'Electrician' && (
                  <ElectricianForm
                    electricianData={electricianData}
                    onChange={handleElectricianChange}
                    nigerianStates={nigerianStates}
                    isChecked={isChecked}
                    setIsChecked={setIsChecked}
                  />
                )}
                {activeTab === 'IT' && (
                  <ITForm
                    itData={itData}
                    onChange={handleITChange}
                    nigerianStates={nigerianStates}
                    isChecked={isChecked}
                    setIsChecked={setIsChecked}
                  />
                )}
                {activeTab === 'Mechanic' && (
                  <MechanicForm
                    mechanicData={mechanicData}
                    onChange={handleMechanicChange}
                    nigerianStates={nigerianStates}
                    carMakes={carMakes}
                    carModels={carModels}
                    isChecked={isChecked}
                    setIsChecked={setIsChecked}
                  />
                )}
                {activeTab === 'Media' && (
                  <MediaForm
                    mediaData={mediaData}
                    onChange={handleMediaChange}
                    nigerianStates={nigerianStates}
                    isChecked={isChecked}
                    setIsChecked={setIsChecked}
                  />
                )}
                {activeTab === 'Plumbing' && (
                  <PlumberForm
                    plumberData={plumberData}
                    onChange={handlePlumberChange}
                    nigerianStates={nigerianStates}
                    isChecked={isChecked}
                    setIsChecked={setIsChecked}
                  />
                )}
                {activeTab === 'Hospitality' && (
                  <HospitalityForm
                    hospitalityData={hospitalityData}
                    onChange={handleHospitalityChange}
                    nigerianStates={nigerianStates}
                    isChecked={isChecked}
                    setIsChecked={setIsChecked}
                  />
                )}
                {activeTab === 'Event Management' && (
                  <EventManagementForm
                    eventManagementData={eventManagementData}
                    onChange={handleEventManagementChange}
                    nigerianStates={nigerianStates}
                    isChecked={isChecked}
                    setIsChecked={setIsChecked}
                  />
                )}
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
              </form>
              {showDisclaimer && (
                <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-lg w-[90%] mx-auto md:mx-0 md:max-w-md md:w-full">
                    <h2 className="text-lg font-bold mb-4">Disclaimer</h2>
                    <p className="text-sm mb-6">
                      Fyndr acts solely as a platform to ensure your request is delivered to your selected service providers. We are not affiliated with, nor do we endorse or partner with, any of the service providers listed on the platform. Our involvement ends once communication begins between you and the service provider. The fee paid is strictly for facilitating the delivery of your request and does not guarantee the outcome or success of any transaction.
                    </p>
                    <div className="flex justify-end gap-4">
                      <button
                        onClick={handleDisclaimerCancel}
                        className="px-4 py-2 bg-gray-200 text-sm cursor-pointer text-gray-800 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleDisclaimerAgree}
                        className="px-4 py-2 bg-[#541229] text-sm cursor-pointer text-white rounded-lg"
                      >
                        I Agree
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default NewRequestPage;