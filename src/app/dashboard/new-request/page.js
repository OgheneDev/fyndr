"use client"

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { nigerianStates } from '@/data/nigerianStates';
import { PropertiesForm, CarHireForm, CarPartsForm, CleaningForm, AutomobileForm } from './RequestForms';
import {
  realEstateRequest,
  carHireRequest,
  cleaningRequest,
  carPartsRequest,
  automobileRequest,
} from '@/api/requests/users/requests';
import Swal from 'sweetalert2';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';


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
  const initialTab = 'Properties';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [formData, setFormData] = useState({
    title: '',
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
    title: '',
    state: '',
    details: '',
    carType: '',
    hireDuration: '',
    pickupLocation: '',
    airport: '',
    travel: '',
  });
  const [cleaningData, setCleaningData] = useState({
    title: '',
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
    title: '',
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
    title: '',
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

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

  const getCategory = () => {
    const tab = tabs.find((t) => t.label === activeTab);
    return tab ? tab.category : '';
  };

  const isFormValid = () => {
    const category = getCategory();
    if (category === 'real-estate') {
      return (
        formData.title &&
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
        carHireData.title &&
        carHireData.state &&
        carHireData.carType &&
        carHireData.hireDuration &&
        carHireData.pickupLocation &&
        carHireData.airport &&
        carHireData.travel
      );
    } else if (category === 'cleaning') {
      return (
        cleaningData.title &&
        cleaningData.state &&
        cleaningData.lga &&
        cleaningData.propertyType &&
        cleaningData.cleaningType &&
        cleaningData.propertyLocation &&
        cleaningData.roomNumber
      );
    } else if (category === 'car-parts') {
      return (
        carPartsData.title &&
        carPartsData.state &&
        carPartsData.currentLocation &&
        carPartsData.sourcingLocation &&
        carPartsData.carMake &&
        carPartsData.carModel &&
        carPartsData.carYear
      );
    } else if (category === 'automobile') {
      return (
        automobileData.title &&
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
      let label = tabs.find((t) => t.category === category)?.label || 'Request';
      if (category === 'real-estate') {
        await realEstateRequest({
          title: formData.title,
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
        setFormData({
          title: '',
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
        await carHireRequest({
          title: carHireData.title,
          state: carHireData.state,
          details: carHireData.details,
          carType: carHireData.carType,
          hireDuration: Number(carHireData.hireDuration) || 0,
          pickupLocation: carHireData.pickupLocation,
          airport: carHireData.airport,
          travel: carHireData.travel === 'Yes',
        });
        setCarHireData({
          title: '',
          state: '',
          details: '',
          carType: '',
          hireDuration: '',
          pickupLocation: '',
          airport: '',
          travel: '',
        });
      } else if (category === 'cleaning') {
        await cleaningRequest({
          title: cleaningData.title,
          state: cleaningData.state,
          lga: cleaningData.lga,
          details: cleaningData.details,
          propertyType: cleaningData.propertyType,
          cleaningType: cleaningData.cleaningType,
          propertyLocation: cleaningData.propertyLocation,
          roomNumber: cleaningData.roomNumber,
        });
        setCleaningData({
          title: '',
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
        fd.append('title', carPartsData.title);
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
        await carPartsRequest(fd);
        setCarPartsData({
          title: '',
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
        await automobileRequest({
          title: automobileData.title,
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
        setAutomobileData({
          title: '',
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
      }
      setSuccess('Request submitted successfully!');
      Swal.fire({
        icon: 'success',
        title: `${label} request posted successfully`,
        showConfirmButton: false,
        timer: 2000,
      });
      setIsChecked(false);
    } catch (err) {
      setError('Failed to submit request.');
    }
    setLoading(false);
  };

  const handleDisclaimerCancel = () => {
    setShowDisclaimer(false);
  };

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white  flex items-center justify-center">
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
      <div className="min-h-screen  bg-white">
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
                  <div className="bg-white p-6 rounded-lg max-w-md w-full">
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