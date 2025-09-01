"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Trash2, Plus } from 'lucide-react'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Select from 'react-select'
import ProvidersSlider from '@/components/general/ProvidersSlider'


// Properties Form
export function PropertiesForm({ formData, onChange, nigerianStates, propertyTypes, isChecked, setIsChecked }) {
  // Transform LGA array into options format for react-select
  const getAxisOptions = () => {
    if (!formData.state || !nigerianStates[formData.state]) return [];
    return nigerianStates[formData.state].map(lga => ({
      value: lga,
      label: lga
    }));
  };

  const handleAxisChange = (selectedOptions) => {
    // Limit to 3 selections and extract just the values
    const values = (selectedOptions || [])
      .slice(0, 3)
      .map(option => option.value);
    onChange('axis', values);
  };

  const handleSliderChange = (value) => {
    onChange('lowerPriceLimit', value[0]);
    onChange('upperPriceLimit', value[1]);
  };

  const handleInputChange = (field, value) => {
    const numValue = value === '' ? '' : Number(value);
    if (field === 'lowerPriceLimit' && numValue >= Number(formData.upperPriceLimit) && formData.upperPriceLimit !== '') {
      return;
    }
    if (field === 'upperPriceLimit' && numValue <= Number(formData.lowerPriceLimit) && formData.lowerPriceLimit !== '') {
      return;
    }
    onChange(field, numValue);
  };

  const safeStates = nigerianStates || {};
  const axisOptions = formData.state && safeStates[formData.state] ? safeStates[formData.state] : [];
  const safePropertyTypes = propertyTypes || [];

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-5 md:gap-[200px] py-3 md:py-5 fixed top-0 bg-white z-50 w-full">
        <Link href={'/dashboard'}>
          <button className="p-1 hover:bg-gray-100 rounded-full cursor-pointer transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
        </Link>
        <article className="text-center">
          <h2 className="text-lg font-bold mb-1">Post a Properties Request</h2>
          <p className="text-[12px]">Find lands, homes or rentals</p>
        </article>
      </div>
      <div className='md:hidden mt-12'>
        <ProvidersSlider />
      </div>
      <div className="mt-5 md:mt-16">
        <label className="block text-[#171214] mb-3 text-sm">Rent or Buy</label>
        <select
          value={formData.rentType || ''}
          onChange={(e) => onChange('rentType', e.target.value)}
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        >
          <option value="">Select</option>
          <option value="rent">Rent</option>
          <option value="buy">Buy</option>
        </select>
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Property Type</label>
        <select
          value={formData.propertyType}
          onChange={(e) => onChange('propertyType', e.target.value)}
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        >
          <option value="">Select Type</option>
          {safePropertyTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Target State</label>
        <select
          value={formData.state || ''}
          onChange={(e) => onChange('state', e.target.value)}
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        >
          <option value="">Select State</option>
          {Object.keys(safeStates).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Target Axis (up to 3)</label>
        <Select
          isMulti
          value={getAxisOptions().filter(option => 
            formData.axis?.includes(option.value)
          )}
          onChange={handleAxisChange}
          options={getAxisOptions()}
          isDisabled={!formData.state}
          placeholder="Select up to 3 areas"
          noOptionsMessage={() => "Select a state first"}
          className="text-sm"
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: '#f3f4f6',
              border: 'none',
              boxShadow: 'none',
              '&:hover': {
                border: 'none'
              }
            }),
            placeholder: (base) => ({
              ...base,
              color: '#6B7280'
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isSelected ? '#85CE5C' : base.backgroundColor,
              '&:hover': {
                backgroundColor: state.isSelected ? '#85CE5C' : '#f3f4f6'
              }
            })
          }}
        />
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Property Condition</label>
        <select
          value={formData.propertyCondition || ''}
          onChange={(e) => onChange('propertyCondition', e.target.value)}
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        >
          <option value="">Select Condition</option>
          <option value="new">New</option>
          <option value="old">Old</option>
          <option value="any">Any</option>
        </select>
      </div>
      <div>
  <label className="block text-[#171214] mb-3 text-sm">Room Number</label>
  <select
    value={formData.roomNumber || ''}
    onChange={(e) => onChange('roomNumber', e.target.value)}
    className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
  >
    <option value="" disabled>Select number of rooms</option>
    {[...Array(9)].map((_, i) => (
      <option key={i + 1} value={i + 1}>{i + 1}</option>
    ))}
    <option value="10+">10+</option>
  </select>
</div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Price Range</label>
        <div className="space-y-4">
          <Slider
            range
            min={0}
            max={1000000000}
            step={10000}
            value={[Number(formData.lowerPriceLimit) || 0, Number(formData.upperPriceLimit) || 1000000000]}
            onChange={handleSliderChange}
            trackStyle={{ backgroundColor: '#85CE5C' }}
            handleStyle={{ borderColor: '#85CE5C', backgroundColor: '#fff' }}
            railStyle={{ backgroundColor: '#E5E8EB' }}
          />
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-[#171214] mb-2 text-sm">Min Price (₦)</label>
              <input
                type="number"
                value={formData.lowerPriceLimit || ''}
                onChange={(e) => handleInputChange('lowerPriceLimit', e.target.value)}
                min={0}
                className="w-full px-4 py-3 border  rounded-lg text-sm"
                placeholder="Enter min price"
              />
            </div>
            <div>
              <label className="block text-[#171214] mb-2 text-sm">Max Price (₦)</label>
              <input
                type="number"
                value={formData.upperPriceLimit || ''}
                onChange={(e) => handleInputChange('upperPriceLimit', e.target.value)}
                min={0}
                className="w-full px-4 py-3  border  rounded-lg text-sm"
                placeholder="Enter max price"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Additional Details</label>
        <textarea
          value={formData.details || ''}
          onChange={(e) => onChange('details', e.target.value)}
          placeholder="Additional Description (Let the agent know preferred location and other information to help streamline)"
          className="w-full px-4 py-5 min-h-[150px]  border  rounded-lg text-sm"
        />
      </div>
      <div className="mt-4">
        <label className="flex items-start md:items-center text-sm text-[#171214]">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="mr-2"
          />
          As per our policy a payment of ₦250 is required to post a request on Fyndr, accept to proceed
        </label>
      </div>
    </div>
  );
};

// Car Hire Form
export function CarHireForm({ carHireData, onChange, nigerianStates, carTypes, isChecked, setIsChecked }) {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-5 md:gap-[200px] py-3 md:py-5 fixed top-0 bg-white z-50 w-full">
        <Link href={'/dashboard'}>
          <button className="p-1 hover:bg-gray-100 rounded-full cursor-pointer transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
        </Link>
        <article className="text-center">
          <h2 className="text-lg font-bold mb-1">Post a Car Hire Request</h2>
          <p className="text-[12px]">Hire vehicles for in-town or out-of-town use.</p>
        </article>
      </div>
      <div className='md:hidden mt-12'>
        <ProvidersSlider />
      </div>
      <div>
        <label className="block text-[#171214] mt-5 md:mt-16 text-sm">State</label>
        <select
          value={carHireData.state || ''}
          onChange={(e) => onChange('state', e.target.value)}
          className="w-full px-4 py-3 bg-gray-100 border-none rounded LG text-sm"
        >
          <option value="">Select State</option>
          {Object.keys(nigerianStates).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Type of Car</label>
        <select
          value={carHireData.carType || ''}
          onChange={(e) => onChange('carType', e.target.value)}
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        >
          <option value="">Select Type</option>
          {carTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-[#171214] mb-3 text-sm">Pickup Location</label>
          <input
            type="text"
            value={carHireData.pickupLocation || ''}
            onChange={(e) => onChange('pickupLocation', e.target.value)}
            placeholder="Pickup location"
            className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
          />
        </div>
        <div className="flex-1">
          <label className="block text-[#171214] mb-3 text-sm">Duration</label>
          <input
            type="number"
            value={carHireData.hireDuration || ''}
            onChange={(e) => onChange('hireDuration', e.target.value)}
            placeholder="Duration (in hrs)"
            className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
          />
        </div>
      </div>
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-[#171214] mb-3 text-sm">Airport</label>
          <select
            value={carHireData.airport || ''}
            onChange={(e) => onChange('airport', e.target.value)}
            className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-[#171214] mb-3 text-sm">Travel</label>
          <select
            value={carHireData.travel || ''}
            onChange={(e) => onChange('travel', e.target.value)}
            className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Additional Details</label>
        <textarea
          value={carHireData.details || ''}
          onChange={(e) => onChange('details', e.target.value)}
          placeholder="Enter any additional details"
          className="w-full px-4 py-3 bg-gray-100 min-h-[150px] border-none rounded-lg text-sm"
        />
      </div>
      <div className="mt-4">
        <label className="flex items-start md:items-center text-sm text-[#171214]">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="mr-2"
          />
          As per our policy a payment of ₦250 is required to post a request on Fyndr, accept to proceed
        </label>
      </div>
    </div>
  );
};

// Cleaning Form
export function CleaningForm({ cleaningData, onChange, nigerianStates, propertyTypes, cleaningTypes, isChecked, setIsChecked }) {
  const lgaOptions = cleaningData.state && nigerianStates && nigerianStates[cleaningData.state]
    ? nigerianStates[cleaningData.state]
    : [];

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-5 md:gap-[200px] py-3 md:py-5 fixed top-0 bg-white z-50 w-full">
        <Link href={'/dashboard'}>
          <button className="p-1 hover:bg-gray-100 rounded-full cursor-pointer transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
        </Link>
        <article className="text-center">
          <h2 className="text-lg font-bold mb-1">Post a Cleaning Request</h2>
          <p className="text-[12px]">Get professional cleaning in your area.</p>
        </article>
      </div>
      <div className='md:hidden mt-12'>
        <ProvidersSlider />
      </div>
      <div>
        <label className="block text-[#171214] mb-3 mt-5 md:mt-16 text-sm">State</label>
        <select
          value={cleaningData.state || ''}
          onChange={(e) => onChange('state', e.target.value)}
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        >
          <option value="">Select State</option>
          {Object.keys(nigerianStates).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">LGA</label>
        <select
          value={cleaningData.lga || ''}
          onChange={(e) => onChange('lga', e.target.value)}
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
          disabled={!cleaningData.state}
        >
          <option value="">Select LGA</option>
          {lgaOptions.map((lga) => (
            <option key={lga} value={lga}>
              {lga}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Property Address</label>
        <input
          type="text"
          value={cleaningData.propertyLocation}
          onChange={(e) => onChange('propertyLocation', e.target.value)}
          placeholder="Enter property address"
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        />
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Property Type</label>
        <select
          value={cleaningData.propertyType}
          onChange={(e) => onChange('propertyType', e.target.value)}
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        >
          <option value="">Select Type</option>
          {propertyTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
<div>
  <label className="block text-[#171214] mb-3 text-sm">Room Number</label>
  <select
    value={cleaningData.roomNumber || ''}
    onChange={(e) => onChange('roomNumber', e.target.value)}
    className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
  >
    <option value="" disabled>Select number of rooms</option>
    {[...Array(5)].map((_, i) => (
      <option key={i + 1} value={i + 1}>{i + 1}</option>
    ))}
    <option value="6+">6+</option>
  </select>
</div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Cleaning Type</label>
        <select
          value={cleaningData.cleaningType}
          onChange={(e) => onChange('cleaningType', e.target.value)}
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        >
          <option value="">Select</option>
          {cleaningTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Additional Details</label>
        <textarea
          value={cleaningData.details}
          onChange={(e) => onChange('details', e.target.value)}
          placeholder="Enter any additional details"
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm min-h-[150px]"
        />
      </div>
      <div className="mt-4">
        <label className="flex items-start md:items-center text-sm text-[#171214]">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="mr-2"
          />
          As per our policy a payment of ₦250 is required to post a request on Fyndr, accept to proceed
        </label>
      </div>
    </div>
  );
};

// Car Parts Form
export function CarPartsForm({ carPartsData, onChange, nigerianStates, carMakes, carModels, carYears, isChecked, setIsChecked }) {
  const imagePreview = carPartsData.attachment ? URL.createObjectURL(carPartsData.attachment) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-5 md:gap-[200px] py-3 md:py-5 fixed top-0 bg-white z-50 w-full">
        <Link href={'/dashboard'}>
          <button className="p-1 hover:bg-gray-100 rounded-full cursor-pointer transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
        </Link>
        <article className="text-center">
          <h2 className="text-lg font-bold mb-1">Post a Car Parts Request</h2>
          <p className="text-[12px]">Find quality parts from verified sellers.</p>
        </article>
      </div>
      <div className='md:hidden mt-12'>
        <ProvidersSlider />
      </div>
      <div>
        <label className="block text-[#171214] mb-3 mt-5 md:mt-16 text-sm">Current State</label>
        <select
          value={carPartsData.state}
          onChange={(e) => onChange('state', e.target.value)}
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        >
          <option value="">Select State</option>
          {Object.keys(nigerianStates).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Current Location</label>
        <input
          type="text"
          value={carPartsData.currentLocation}
          onChange={(e) => onChange('currentLocation', e.target.value)}
          placeholder="E.g Ikorodu Lagos"
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        />
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Sourcing Location</label>
        <input
          type="text"
          value={carPartsData.sourcingLocation}
          onChange={(e) => onChange('sourcingLocation', e.target.value)}
          placeholder="E.g Ladipo Market"
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        />
      </div>
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-[#171214] mb-3 text-sm">Make</label>
          <select
            value={carPartsData.carMake}
            onChange={(e) => onChange('carMake', e.target.value)}
            className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
          >
            <option value="">Select Make</option>
            {carMakes.map((make) => (
              <option key={make} value={make}>
                {make}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-[#171214] mb-3 text-sm">Model</label>
          <select
            value={carPartsData.carModel}
            onChange={(e) => onChange('carModel', e.target.value)}
            className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
            disabled={!carPartsData.carMake}
          >
            <option value="">Select Model</option>
            {(carModels[carPartsData.carMake] || []).map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-[#171214] mb-3 text-sm">Year</label>
          <select
            value={carPartsData.carYear}
            onChange={(e) => onChange('carYear', e.target.value)}
            className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
          >
            <option value="">Select Year</option>
            {carYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Description</label>
        <textarea
          value={carPartsData.details}
          onChange={(e) => onChange('details', e.target.value)}
          placeholder="Describe part needed (e.g ABS sensor, front left)"
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm min-h-[150px]"
        />
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Attachment (Image/Video)</label>
        <input
          type="file"
          accept="image/*,video/*"
          onChange={(e) => onChange('attachment', e.target.files[0])}
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        />
        {imagePreview && (
          <div className="mt-2"> 
            <Image
              src={imagePreview}
              height={50}
              width={50}
              alt="Preview"
              className="w-32 h-32 object-cover rounded border"
            />
          </div>
        )}
      </div>
      <div className="mt-4">
        <label className="flex items-start md:items-center text-sm text-[#171214]">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="mr-2"
          />
          As per our policy a payment of ₦250 is required to post a request on Fyndr, accept to proceed
        </label>
      </div>
    </div>
  );
};

// Automobile Form
export function AutomobileForm({ automobileData, onChange, nigerianStates, carMakes, carModels, carYears, isChecked, setIsChecked }) {
  const handleSliderChange = (value) => {
    onChange('lowerPriceLimit', value[0]);
    onChange('upperPriceLimit', value[1]);
  };

  const handleInputChange = (field, value) => {
    const numValue = value === '' ? '' : Number(value);
    if (field === 'lowerPriceLimit' && numValue >= Number(automobileData.upperPriceLimit) && automobileData.upperPriceLimit !== '') {
      return;
    }
    if (field === 'upperPriceLimit' && numValue <= Number(automobileData.lowerPriceLimit) && automobileData.lowerPriceLimit !== '') {
      return;
    }
    onChange(field, numValue);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-5 md:gap-[200px] py-3 md:py-5 fixed top-0 bg-white z-50 w-full">
        <Link href={'/dashboard'}>
          <button className="p-1 hover:bg-gray-100 rounded-full cursor-pointer transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
        </Link>
        <article className="text-center">
          <h2 className="text-lg font-bold mb-1">Post an Automobile Request</h2>
          <p className="text-[12px]">Get vehicles for sale around you.</p>
        </article>
      </div>
      <div className='md:hidden mt-12'>
        <ProvidersSlider />
      </div>
      <div>
        <label className="block text-[#171214] mb-3 mt-5 md:mt-16 text-sm">State</label>
        <select
          value={automobileData.state}
          onChange={(e) => onChange('state', e.target.value)}
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        >
          <option value="">Select State</option>
          {Object.keys(nigerianStates).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Location</label>
        <input
          type="text"
          value={automobileData.location}
          onChange={(e) => onChange('location', e.target.value)}
          placeholder="Input Search Location"
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        />
      </div>
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-[#171214] mb-3 text-sm">Car Make</label>
          <select
            value={automobileData.carMake}
            onChange={(e) => onChange('carMake', e.target.value)}
            className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
          >
            <option value="">Select Make</option>
            {carMakes.map((make) => (
              <option key={make} value={make}>
                {make}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-[#171214] mb-3 text-sm">Car Model</label>
          <select
            value={automobileData.carModel}
            onChange={(e) => onChange('carModel', e.target.value)}
            className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
            disabled={!automobileData.carMake}
          >
            <option value="">Select Model</option>
            {(carModels[automobileData.carMake] || []).map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-[#171214] mb-3 text-sm">Car Year From</label>
          <select
            value={automobileData.carYearFrom}
            onChange={(e) => onChange('carYearFrom', e.target.value)}
            className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
          >
            <option value="">Select Year</option>
            {carYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-[#171214] mb-3 text-sm">Car Year To</label>
          <select
            value={automobileData.carYearTo}
            onChange={(e) => onChange('carYearTo', e.target.value)}
            className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
          >
            <option value="">Select Year</option>
            {carYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Transmission</label>
        <select
          value={automobileData.transmission}
          onChange={(e) => onChange('transmission', e.target.value)}
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        >
          <option value="">Select</option>
          <option value="manual">Manual</option>
          <option value="automatic">Automatic</option>
        </select>
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Price Range</label>
        <div className="space-y-4">
          <Slider
            range
            min={0}
            max={1000000000}
            step={10000}
            value={[Number(automobileData.lowerPriceLimit) || 0, Number(automobileData.upperPriceLimit) || 1000000000]}
            onChange={handleSliderChange}
            trackStyle={{ backgroundColor: '#85CE5C' }}
            handleStyle={{ borderColor: '#85CE5C', backgroundColor: '#fff' }}
            railStyle={{ backgroundColor: '#E5E8EB' }}
          />
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-[#171214] mb-2 text-sm">Min Price (₦)</label>
              <input
                type="number"
                value={automobileData.lowerPriceLimit || ''}
                onChange={(e) => handleInputChange('lowerPriceLimit', e.target.value)}
                min={0}
                className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
                placeholder="Enter min price"
              />
            </div>
            <div>
              <label className="block text-[#171214] mb-2 text-sm">Max Price (₦)</label>
              <input
                type="number"
                value={automobileData.upperPriceLimit || ''}
                onChange={(e) => handleInputChange('upperPriceLimit', e.target.value)}
                min={0}
                className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
                placeholder="Enter max price"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Details</label>
        <textarea
          value={automobileData.details}
          onChange={(e) => onChange('details', e.target.value)}
          placeholder="Enter details"
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        />
      </div>
      <div className="mt-4">
        <label className="flex items-start md:items-center text-sm text-[#171214]">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="mr-2"
          />
          As per our policy a payment of ₦250 is required to post a request on Fyndr, accept to proceed
        </label>
      </div>
    </div>
  );
};

export function BeautyForm({ beautyData, onChange, nigerianStates, isChecked, setIsChecked }) {
  const beautyServices = [
    { display: 'Make up artist', value: 'make-up-artist' },
    { display: 'Lash tech', value: 'lash-tech' },
    { display: 'Nail tech', value: 'nail-tech' },
    { display: 'Hair stylist', value: 'hair-stylist' },
    { display: 'Spa', value: 'spa' },
    { display: 'Massage', value: 'massage' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-5 md:gap-[200px] py-3 md:py-5 fixed top-0 bg-white z-50 w-full">
        <Link href={'/dashboard'}>
          <button className="p-1 hover:bg-gray-100 rounded-full cursor-pointer transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
        </Link>
        <article className="text-center">
          <h2 className="text-lg font-bold mb-1">Post a Beauty Service Request</h2>
          <p className="text-[12px]">Find professional beauty services in your area</p>
        </article>
      </div>
      <div className='md:hidden mt-12'>
        <ProvidersSlider />
      </div>
      <div className="mt-5 md:mt-15">
        <label className="block text-[#171214] mb-3 text-sm">State</label>
        <select
          value={beautyData.state || ''}
          onChange={(e) => onChange('state', e.target.value)}
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        >
          <option value="">Select State</option>
          {Object.keys(nigerianStates).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Target Location</label>
        <input
          type="text"
          value={beautyData.targetLocation || ''}
          onChange={(e) => onChange('targetLocation', e.target.value)}
          placeholder="Enter target location"
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        />
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Service</label>
        <select
          value={beautyData.service || ''}
          onChange={(e) => onChange('service', e.target.value)}
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        >
          <option value="">Select Service</option>
          {beautyServices.map((service) => (
            <option key={service.value} value={service.value}>
              {service.display}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Date</label>
        <input
          type="date"
          value={beautyData.date || ''}
          onChange={(e) => onChange('date', e.target.value)}
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        />
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Time</label>
        <input
          type="time"
          value={beautyData.time || ''}
          onChange={(e) => onChange('time', e.target.value)}
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        />
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Additional Comment</label>
        <textarea
          value={beautyData.details || ''}
          onChange={(e) => onChange('details', e.target.value)}
          placeholder="Enter any additional comments"
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm min-h-[150px]"
        />
      </div>
      <div className="mt-4">
        <label className="flex items-start md:items-center text-sm text-[#171214]">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="mr-2"
          />
          As per our policy a payment of ₦250 is required to post a request on Fyndr, accept to proceed
        </label>
      </div>
    </div>
  );
}

export function CateringForm({ cateringData, onChange, nigerianStates, isChecked, setIsChecked }) {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-5 md:gap-[200px] py-3 md:py-5 fixed top-0 bg-white z-50 w-full">
        <Link href={'/dashboard'}>
          <button className="p-1 hover:bg-gray-100 rounded-full cursor-pointer transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
        </Link>
        <article className="text-center">
          <h2 className="text-lg font-bold mb-1">Post a Catering Service Request</h2>
          <p className="text-[12px]">Find professional catering services for your event</p>
        </article>
      </div>
      <div className='md:hidden mt-12'>
        <ProvidersSlider />
      </div>
      <div className="mt-5 md:mt-10">
        <label className="block text-[#171214] mb-3 text-sm">State</label>
        <select
          value={cateringData.state || ''}
          onChange={(e) => onChange('state', e.target.value)}
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        >
          <option value="">Select State</option>
          {Object.keys(nigerianStates).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Location</label>
        <input
          type="text"
          value={cateringData.location || ''}
          onChange={(e) => onChange('location', e.target.value)}
          placeholder="Enter your location"
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        />
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Event Location</label>
        <input
          type="text"
          value={cateringData.eventLocation || ''}
          onChange={(e) => onChange('eventLocation', e.target.value)}
          placeholder="Enter event location"
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        />
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Event Date</label>
        <input
          type="date"
          value={cateringData.eventDate || ''}
          onChange={(e) => onChange('eventDate', e.target.value)}
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        />
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Additional Comment</label>
        <textarea
          value={cateringData.details || ''}
          onChange={(e) => onChange('details', e.target.value)}
          placeholder="Enter any additional comments"
          className="w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        />
      </div>
      <div className="mt-4">
        <label className="flex items-start md:items-center text-sm text-[#171214]">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="mr-2"
          />
          As per our policy a payment of ₦250 is required to post a request on Fyndr, accept to proceed
        </label>
      </div>
    </div>
  );
}

export function CarpenterForm({ carpentryData, onChange, nigerianStates, isChecked, setIsChecked }) {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-5 md:gap-[200px] py-3 md:py-5 fixed top-0 bg-white z-50 w-full">
        <Link href={'/dashboard'}>
          <button className="p-1 hover:bg-gray-100 rounded-full cursor-pointer transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
        </Link>
        <article className="text-center">
          <h2 className="text-lg font-bold mb-1">Post a Carpentry Request</h2>
          <p className="text-[12px]">Find skilled carpenters in your area</p>
        </article>
      </div>
      <div className='md:hidden mt-12'>
        <ProvidersSlider />
      </div>
      <div className="mt-5 md:mt-16">
        <label className="block text-[#171214] mb-3 text-sm">State</label>
        <select
          value={carpentryData.state || ''}
          onChange={(e) => onChange('state', e.target.value)}
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        >
          <option value="">Select State</option>
          {Object.keys(nigerianStates).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Location</label>
        <input
          type="text"
          value={carpentryData.location || ''}
          onChange={(e) => onChange('location', e.target.value)}
          placeholder="Enter your location"
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        />
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Date Needed</label>
        <input
          type="date"
          value={carpentryData.dateNeeded || ''}
          onChange={(e) => onChange('dateNeeded', e.target.value)}
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        />
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Additional Comment</label>
        <textarea
          value={carpentryData.details || ''}
          onChange={(e) => onChange('details', e.target.value)}
          placeholder="Enter any additional comments"
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none min-h-[150px] rounded-lg text-sm"
        />
      </div>
      <div className="mt-4">
        <label className="flex items-start md:items-center text-sm text-[#171214]">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="mr-2"
          />
          As per our policy a payment of ₦250 is required to post a request on Fyndr, accept to proceed
        </label>
      </div>
    </div>
  );
}

export function ElectricianForm({ electricianData, onChange, nigerianStates, isChecked, setIsChecked }) {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-5 md:gap-[200px] py-3 md:py-5 fixed top-0 bg-white z-50 w-full">
        <Link href={'/dashboard'}>
          <button className="p-1 hover:bg-gray-100 rounded-full cursor-pointer transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
        </Link>
        <article className="text-center">
          <h2 className="text-lg font-bold mb-1">Post an Electrician Request</h2>
          <p className="text-[12px]">Find skilled electricians in your area</p>
        </article>
      </div>
      <div className='md:hidden mt-12'>
        <ProvidersSlider />
      </div>
      <div className="mt-5 md:mt-16">
        <label className="block text-[#171214] mb-3 text-sm">State</label>
        <select
          value={electricianData.state || ''}
          onChange={(e) => onChange('state', e.target.value)}
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        >
          <option value="">Select State</option>
          {Object.keys(nigerianStates).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Location</label>
        <input
          type="text"
          value={electricianData.location || ''}
          onChange={(e) => onChange('location', e.target.value)}
          placeholder="Enter your location"
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        />
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Date Needed</label>
        <input
          type="date"
          value={electricianData.dateNeeded || ''}
          onChange={(e) => onChange('dateNeeded', e.target.value)}
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        />
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Additional Comment</label>
        <textarea
          value={electricianData.details || ''}
          onChange={(e) => onChange('details', e.target.value)}
          placeholder="Enter any additional comments"
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none min-h-[150px] rounded-lg text-sm"
        />
      </div>
      <div className="mt-4">
        <label className="flex items-start md:items-center text-sm text-[#171214]">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="mr-2"
          />
          As per our policy a payment of ₦250 is required to post a request on Fyndr, accept to proceed
        </label>
      </div>
    </div>
  );
}

export function ITForm({ itData, onChange, nigerianStates, isChecked, setIsChecked }) {
  const itServices = [
    { display: 'UI/UX Designer', value: 'ui/ux-designer' },
    { display: 'Mobile app developer', value: 'mobile-app-developer' },
    { display: 'Web developer', value: 'web-developer' },
    { display: 'Database developer', value: 'database-developer' },
    { display: 'Product design', value: 'product-design' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-5 md:gap-[200px] py-3 md:py-5 fixed top-0 bg-white z-50 w-full">
        <Link href={'/dashboard'}>
          <button className="p-1 hover:bg-gray-100 rounded-full cursor-pointer transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
        </Link>
        <article className="text-center">
          <h2 className="text-lg font-bold mb-1">Post an IT Service Request</h2>
          <p className="text-[12px]">Find professional IT services in your area</p>
        </article>
      </div>
      <div className='md:hidden mt-12'>
        <ProvidersSlider />
      </div>
      <div className="mt-5 md:mt-16">
        <label className="block text-[#171214] mb-3 text-sm">State</label>
        <select
          value={itData.state || ''}
          onChange={(e) => onChange('state', e.target.value)}
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        >
          <option value="">Select State</option>
          {Object.keys(nigerianStates).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Target Location</label>
        <input
          type="text"
          value={itData.targetLocation || ''}
          onChange={(e) => onChange('targetLocation', e.target.value)}
          placeholder="Enter target location"
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        />
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Service</label>
        <select
          value={itData.service || ''}
          onChange={(e) => onChange('service', e.target.value)}
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        >
          <option value="">Select Service</option>
          {itServices.map((service) => (
            <option key={service.value} value={service.value}>
              {service.display}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Additional Comment</label>
        <textarea
          value={itData.details || ''}
          onChange={(e) => onChange('details', e.target.value)}
          placeholder="Enter any additional comments"
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm min-h-[150px]"
        />
      </div>
      <div className="mt-4">
        <label className="flex items-start md:items-center text-sm text-[#171214]">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="mr-2"
          />
          As per our policy a payment of ₦250 is required to post a request on Fyndr, accept to proceed
        </label>
      </div>
    </div>
  );
}

export function MechanicForm({ mechanicData, onChange, nigerianStates, carMakes, carModels, isChecked, setIsChecked }) {
  const years = Array.from({length: new Date().getFullYear() - 1990 + 1}, (_, i) => 1990 + i);
  const transmissions = ['Manual', 'Automatic'];

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-5 md:gap-[200px] py-3 md:py-5 fixed top-0 bg-white z-50 w-full">
        <Link href={'/dashboard'}>
          <button className="p-1 hover:bg-gray-100 rounded-full cursor-pointer transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
        </Link>
        <article className="text-center">
          <h2 className="text-lg font-bold mb-1">Post a Mechanic Request</h2>
          <p className="text-[12px]">Find skilled mechanics in your area</p>
        </article>
      </div>
      <div className='md:hidden mt-12'>
        <ProvidersSlider />
      </div>
      <div className="mt-5 md:mt-16">
        <label className="block text-[#171214] mb-3 text-sm">State</label>
        <select
          value={mechanicData.state || ''}
          onChange={(e) => onChange('state', e.target.value)}
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        >
          <option value="">Select State</option>
          {Object.keys(nigerianStates).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Current Location</label>
        <input
          type="text"
          value={mechanicData.currentLocation || ''}
          onChange={(e) => onChange('currentLocation', e.target.value)}
          placeholder="Enter your current location"
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        />
      </div>
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-[#171214] mb-3 text-sm">Car Make</label>
          <select
            value={mechanicData.carMake || ''}
            onChange={(e) => onChange('carMake', e.target.value)}
            className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
          >
            <option value="">Select Make</option>
            {carMakes.map((make) => (
              <option key={make} value={make}>
                {make}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-[#171214] mb-3 text-sm">Model</label>
          <select
            value={mechanicData.carModel || ''}
            onChange={(e) => onChange('carModel', e.target.value)}
            className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
            disabled={!mechanicData.carMake}
          >
            <option value="">Select Model</option>
            {(carModels[mechanicData.carMake] || []).map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-[#171214] mb-3 text-sm">Year</label>
          <select
            value={mechanicData.year || ''}
            onChange={(e) => onChange('year', e.target.value)}
            className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-[#171214] mb-3 text-sm">Transmission</label>
          <select
            value={mechanicData.transmission || ''}
            onChange={(e) => onChange('transmission', e.target.value)}
            className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
          >
            <option value="">Select Transmission</option>
            {transmissions.map((transmission) => (
              <option key={transmission} value={transmission.toLowerCase()}>
                {transmission}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Additional Comment</label>
        <textarea
          value={mechanicData.details || ''}
          onChange={(e) => onChange('details', e.target.value)}
          placeholder="Enter any additional comments"
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm min-h-[150px]"
        />
      </div>
      <div className="mt-4">
        <label className="flex items-start md:items-center text-sm text-[#171214]">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="mr-2"
          />
          As per our policy a payment of ₦250 is required to post a request on Fyndr, accept to proceed
        </label>
      </div>
    </div>
  );
}

export function MediaForm({ mediaData, onChange, nigerianStates, isChecked, setIsChecked }) {
  const mediaServices = [
    {display: 'Photographer', value: 'photographer'},
    {display: 'Videographer', value: 'videographer'},
    {display: 'Drone pilot', value: 'drone-pilot'},
    {display: 'Graphics artist', value: 'graphics-artist'},
    {display: 'Social media manager', value: 'social-media-manager'}
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-5 md:gap-[200px] py-3 md:py-5 fixed top-0 bg-white z-50 w-full">
        <Link href={'/dashboard'}>
          <button className="p-1 hover:bg-gray-100 rounded-full cursor-pointer transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
        </Link>
        <article className="text-center">
          <h2 className="text-lg font-bold mb-1">Post a Media Service Request</h2>
          <p className="text-[12px]">Find professional media services in your area</p>
        </article>
      </div>
      <div className='md:hidden mt-12'>
        <ProvidersSlider />
      </div>
      <div className="mt-5 md:mt-16">
        <label className="block text-[#171214] mb-3 text-sm">State</label>
        <select
          value={mediaData.state || ''}
          onChange={(e) => onChange('state', e.target.value)}
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        >
          <option value="">Select State</option>
          {Object.keys(nigerianStates).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Target Location</label>
        <input
          type="text"
          value={mediaData.targetLocation || ''}
          onChange={(e) => onChange('targetLocation', e.target.value)}
          placeholder="Enter target location"
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        />
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Service</label>
        <select
          value={mediaData.service || ''}
          onChange={(e) => onChange('service', e.target.value)}
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        >
          <option value="">Select Service</option>
          {mediaServices.map((service) => (
            <option key={service.value} value={service.value}>
              {service.display}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Additional Comment</label>
        <textarea
          value={mediaData.details || ''}
          onChange={(e) => onChange('details', e.target.value)}
          placeholder="Enter any additional comments"
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm min-h-[150px]"
        />
      </div>
      <div className="mt-4">
        <label className="flex items-start md:items-center text-sm text-[#171214]">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="mr-2"
          />
          As per our policy a payment of ₦250 is required to post a request on Fyndr, accept to proceed
        </label>
      </div>
    </div>
  );
}

export function PlumberForm({ plumberData, onChange, nigerianStates, isChecked, setIsChecked }) {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-5 md:gap-[200px] py-3 md:py-5 fixed top-0 bg-white z-50 w-full">
        <Link href={'/dashboard'}>
          <button className="p-1 hover:bg-gray-100 rounded-full cursor-pointer transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
        </Link>
        <article className="text-center">
          <h2 className="text-lg font-bold mb-1">Post a Plumber Request</h2>
          <p className="text-[12px]">Find skilled plumbers in your area</p>
        </article>
      </div>
      <div className='md:hidden mt-12'>
        <ProvidersSlider />
      </div>
      <div className="mt-5 md:mt-16">
        <label className="block text-[#171214] mb-3 text-sm">State</label>
        <select
          value={plumberData.state || ''}
          onChange={(e) => onChange('state', e.target.value)}
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        >
          <option value="">Select State</option>
          {Object.keys(nigerianStates).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Location</label>
        <input
          type="text"
          value={plumberData.location || ''}
          onChange={(e) => onChange('location', e.target.value)}
          placeholder="Enter your location"
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        />
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Date Needed</label>
        <input
          type="date"
          value={plumberData.dateNeeded || ''}
          onChange={(e) => onChange('dateNeeded', e.target.value)}
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        />
      </div>
      <div> 
        <label className="block text-[#171214] mb-3 text-sm">Additional Comment</label>
        <textarea
          value={plumberData.details || ''}
          onChange={(e) => onChange('details', e.target.value)}
          placeholder="Enter any additional comments"
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm min-h-[150px]"
        />
      </div>
      <div className="mt-4">
        <label className="flex items-start md:items-center text-sm text-[#171214]">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="mr-2"
          />
          As per our policy a payment of ₦250 is required to post a request on Fyndr, accept to proceed
        </label>
      </div>
    </div>
  );
}

export function HospitalityForm({ hospitalityData, onChange, nigerianStates, isChecked, setIsChecked }) {
  const hospitalityServices = [
    {display: 'Hotel', value: 'hotel'},
    {display: 'Shortlet Apartment', value: 'shortlet-apartment'},
    {display: 'Travel Agency', value: 'travel-agency'},
    {display: 'Fitness Center', value: 'fitness-center'},
    {display: 'Spa', value: 'spa'}
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-5 md:gap-[200px] py-3 md:py-5 fixed top-0 bg-white z-50 w-full">
        <Link href={'/dashboard'}>
          <button className="p-1 hover:bg-gray-100 rounded-full cursor-pointer transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
        </Link>
        <article className="text-center">
          <h2 className="text-lg font-bold mb-1">Post a Hospitality Request</h2>
          <p className="text-[12px]">Hospitality Services</p>
        </article>
      </div>
      <div className='md:hidden mt-12'>
        <ProvidersSlider />
      </div>
      <div className="mt-5 md:mt-16">
        <label className="block text-[#171214] mb-3 text-sm">Your State</label>
        <select
          value={hospitalityData.state || ''}
          onChange={(e) => onChange('state', e.target.value)}
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        >
          <option value="">Select State</option>
          {Object.keys(nigerianStates).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Location</label>
        <input
          type="text"
          value={hospitalityData.location || ''}
          onChange={(e) => onChange('location', e.target.value)}
          placeholder="Enter your location"
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        />
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Service Required</label>
        <select
          value={hospitalityData.service || ''}
          onChange={(e) => onChange('service', e.target.value)}
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        >
          <option value="">Select Service</option>
          {hospitalityServices.map((service) => (
            <option key={service.value} value={service.value}>
              {service.display}
            </option>
          ))}
        </select>
      </div>
      <div className='flex gap-3'>
        <div className='flex-1'>
        <label className="block text-[#171214] mb-3 text-sm">Date Needed</label>
        <input
          type="date"
          value={hospitalityData.dateNeeded || ''}
          onChange={(e) => onChange('dateNeeded', e.target.value)}
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        />
        </div>
              <div className='flex-1'>
        <label className="block text-[#171214] mb-3 text-sm">Time Needed</label>
        <input
          type="time"
          value={hospitalityData.timeNeeded || ''}
          onChange={(e) => onChange('timeNeeded', e.target.value)}
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        />
      </div>
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Additional Details</label>
        <textarea
          value={hospitalityData.details || ''}
          onChange={(e) => onChange('details', e.target.value)}
          placeholder="Enter any additional details"
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm min-h-[150px]"
        />
      </div>
      <div className="mt-4">
        <label className="flex items-start md:items-center text-sm text-[#171214]">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="mr-2"
          />
          As per our policy a payment of ₦250 is required to post a request on Fyndr, accept to proceed
        </label>
      </div>
    </div>
  );
}

export function EventManagementForm({ eventManagementData, onChange, nigerianStates, isChecked, setIsChecked }) {
  const eventServices = [
    {display: 'Catering Service', value: 'catering-service'},
    {display: 'Event planner', value: 'event-planner'},
    {display: 'Bakers', value: 'bakers'},
    {display: 'Hiring Service', value: 'hiring-service'}
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-2 md:gap-[200px] py-3 md:py-5 fixed top-0 bg-white z-50 w-full">
        <Link href={'/dashboard'}>
          <button className="p-1 hover:bg-gray-100 rounded-full cursor-pointer transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
        </Link>
        <article className="text-center">
          <h2 className="text-lg font-bold mb-1 truncate">Post an Event Service Request</h2>
          <p className="text-[12px] truncate">Event Management Services</p>
        </article>
      </div>
      <div className='md:hidden mt-12'>
        <ProvidersSlider />
      </div>
      <div className="mt-5 md:mt-16">
        <label className="block text-[#171214] mb-3 text-sm">Your State</label>
        <select
          value={eventManagementData.state || ''}
          onChange={(e) => onChange('state', e.target.value)}
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        >
          <option value="">Select State</option>
          {Object.keys(nigerianStates).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Location</label>
        <input
          type="text"
          value={eventManagementData.location || ''}
          onChange={(e) => onChange('location', e.target.value)}
          placeholder="Enter your location"
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        />
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Service Required</label>
        <select
          value={eventManagementData.service || ''}
          onChange={(e) => onChange('service', e.target.value)}
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        >
          <option value="">Select Service</option>
          {eventServices.map((service) => (
            <option key={service.value} value={service.value}>
              {service.display}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Event Location</label>
        <input
          type="text"
          value={eventManagementData.eventLocation || ''}
          onChange={(e) => onChange('eventLocation', e.target.value)}
          placeholder="Enter event location"
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        />
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Date Needed</label>
        <input
          type="date"
          value={eventManagementData.dateNeeded || ''}
          onChange={(e) => onChange('dateNeeded', e.target.value)}
          className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
        />
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Additional Details</label>
        <textarea
          value={eventManagementData.details || ''}
          onChange={(e) => onChange('details', e.target.value)} 
          placeholder="Enter any additional details"
          className="outline-0 w-full px-4 py-3 bg-gray-100 min-h-[150px] border-none rounded-lg text-sm"
        />
      </div>
      <div className="mt-4">
        <label className="flex items-start md:items-center text-sm text-[#171214]">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="mr-2"
          />
          As per our policy a payment of ₦250 is required to post a request on Fyndr, accept to proceed
        </label>
      </div>
    </div>
  );
}

export function EmploymentSelectionForm({ onSelectRole }) {
  return (
    <div className="space-y-6">
      <div className="mt-5 md:mt-16 text-center">
        <p className='text-sm mb-20'>Post or view Job vacancies or register as a job seeker</p>
        <h3 className="text-[#171214] mb-4 text-sm">Are you an</h3>
        <div className="flex flex-col gap-4 justify-center">
          <button
            onClick={() => onSelectRole('employer')}
            className="px-6 py-3 w-full bg-[#85CE5C] cursor-pointer text-white rounded-lg text-sm"
          >
            Employer
          </button>
          <span className='text-sm uppercase'>Or</span>
          <button
            onClick={() => onSelectRole('jobSeeker')}
            className="px-6 py-3 w-full bg-[#85CE5C] cursor-pointer text-white rounded-lg text-sm"
          >
            Job Seeker
          </button>
        </div>
      </div>
    </div>
  );
};

export function EmployerForm({ employmentData, onChange, nigerianStates, isChecked, setIsChecked, onBack }) {
  const jobTypes = [
  { display: 'Full time', value: 'full-time' }, 
  { display: 'Part time', value: 'part-time' },
  { display: 'Remote', value: 'remote' },
  { display: 'Hybrid', value: 'hybrid' },
  { display: 'Temporary', value: 'temporary' },
  { display: 'Permanent', value: 'permanent' },
  { display: 'Fixed term contract', value: 'fixed-term-contract' },
  { display: 'Freelance', value: 'freelance' },
  { display: 'Volunteer', value: 'volunteer' },
  { display: 'Internship', value: 'internship' }
];
  const benefitOptions = [
  { display: 'Work from home', value: 'work-from-home' },
  { display: 'Flexitime', value: 'flexitime' },
  { display: 'Company pension', value: 'company-pension' },
  { display: 'Referral programme', value: 'referral-programme' },
  { display: 'Employee discount', value: 'employee-discount' },
  { display: 'Store discount', value: 'store-discount' },
  { display: 'On-site parking', value: 'on-site-parking' },
  { display: 'Free parking', value: 'free-parking' },
  { display: 'Life insurance', value: 'life-insurance' },
  { display: 'Private medical insurance', value: 'private-medical-insurance' },
  { display: 'Private dental insurance', value: 'private-dental-insurance' },
  { display: 'Health & well-being programme', value: 'health-well-being-programme' },
  { display: 'Sick pay', value: 'sick-pay' },
  { display: 'Paid holidays', value: 'paid-holidays' },
  { display: 'Sabbatical', value: 'sabbatical' },
  { display: 'Bereavement leave', value: 'bereavement-leave' },
  { display: 'Paternity leave', value: 'paternity-leave' },
  { display: 'Maternity leave', value: 'maternity-leave' },
  { display: 'Childcare', value: 'childcare' },
  { display: 'Gym membership', value: 'gym-membership' },
  { display: 'On-site gym', value: 'on-site-gym' },
  { display: 'Free fitness classes', value: 'free-fitness-classes' },
  { display: 'Canteen', value: 'canteen' },
  { display: 'Company events', value: 'company-events' },
  { display: 'Company car', value: 'company-car' },
  { display: 'Shuttle service provided', value: 'shuttle-service-provided' },
  { display: 'Relocation assistance', value: 'relocation-assistance' },
  { display: 'Housing allowance', value: 'housing-allowance' },
  { display: 'Profit sharing', value: 'profit-sharing' },
  { display: 'Employee stock purchase plan', value: 'employee-stock-purchase-plan' },
  { display: 'Employee stock ownership plan', value: 'employee-stock-ownership-plan' },
  { display: 'Visa sponsorship', value: 'visa-sponsorship' },
  { display: 'Language training provided', value: 'language-training-provided' },
  { display: 'Employee mentoring programme', value: 'employee-mentoring-programme' },
  { display: 'Financial planning services', value: 'financial-planning-services' }
];

  const currencyOptions = [
    { display: 'NGN', value: 'NGN' },
    { display: 'USD', value: 'USD' }
  ];
  const vacancyOptions = Array.from({ length: 10 }, (_, i) => (i + 1).toString()).concat('10+');

  const handleMultiSelectChange = (field, selectedOptions) => {
    onChange(field, selectedOptions ? selectedOptions.map(option => option.value) : []);
  };

  const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    onChange('company_image', file); // Store the file object directly
  }
};

  const removeImage = () => {
  onChange('company_image', null); // Reset to null
  const fileInput = document.getElementById('company-image-input');
  if (fileInput) fileInput.value = '';
};

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-5 md:gap-[200px] py-3 md:py-5 fixed top-0 bg-white z-50 w-full">
          <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full cursor-pointer transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
        <article className="text-center">
          <h2 className="text-lg font-bold mb-1">Post an Employer Job Request</h2>
          <p className="text-[12px]">Create a job posting for your company</p>
        </article>
      </div>
      <div className="md:hidden mt-12">
        <ProvidersSlider />
      </div>
      <div className="mt-5 md:mt-16">
        <h3 className="text-[#171214] mb-3 text-sm font-bold">Create Profile</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-[#171214] mb-2 text-sm">Company Logo</label>
            <div className="relative">
              {employmentData.company_image ? (
  <div className="relative w-full h-40 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden">
    <Image
      width={45}
      height={45}
      src={URL.createObjectURL(employmentData.company_image)}
      alt="Company logo preview"
      className="w-full h-full object-contain bg-white"
    />
    <button
      onClick={removeImage}
      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
    >
      ×
    </button>
  </div>
) : (
  <label
    htmlFor="company-image-input"
    className="cursor-pointer w-full h-40 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-100 transition-all duration-200 flex flex-col items-center justify-center text-gray-500"
  >
    <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
    </svg>
    <span className="text-sm font-medium">Upload Company Logo</span>
    <span className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</span>
  </label>
)}
              <input
                id="company-image-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>
          <div>
            <label className="block text-[#171214] mb-2 text-sm">Company Name</label>
            <input
              type="text"
              value={employmentData.company || ''}
              onChange={(e) => onChange('company', e.target.value)}
              placeholder="Enter company name"
              className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
            />
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-[#171214] mb-2 text-sm">First Name</label>
              <input
                type="text"
                value={employmentData.firstName || ''}
                onChange={(e) => onChange('firstName', e.target.value)}
                placeholder="First name"
                className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
              />
            </div>
            <div className="flex-1">
              <label className="block text-[#171214] mb-2 text-sm">Last Name</label>
              <input
                type="text"
                value={employmentData.lastName || ''}
                onChange={(e) => onChange('lastName', e.target.value)}
                placeholder="Last name"
                className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-[#171214] mb-2 text-sm">Phone Number</label>
              <input
                type="tel"
                value={employmentData.number || ''}
                onChange={(e) => onChange('number', e.target.value)}
                placeholder="Phone number"
                className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
              />
            </div>
            <div className="flex-1">
              <label className="block text-[#171214] mb-2 text-sm">Email Address</label>
              <input
                type="email"
                value={employmentData.email || ''}
                onChange={(e) => onChange('email', e.target.value)}
                placeholder="Email address"
                className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-[#171214] mb-2 text-sm">How did you hear about us?</label>
            <input
              type="text"
              value={employmentData.howYouHeardAboutUs || ''}
              onChange={(e) => onChange('howYouHeardAboutUs', e.target.value)}
              placeholder="E.g., Social media, friend, etc."
              className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
            />
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-[#171214] mb-3 text-sm font-bold">Job Post Form</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-[#171214] mb-2 text-sm">Job Title</label>
            <input
              type="text"
              value={employmentData.jobTitle || ''}
              onChange={(e) => onChange('jobTitle', e.target.value)}
              placeholder="Enter job title"
              className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-[#171214] mb-2 text-sm">Job Location</label>
            <input
              type="text"
              value={employmentData.jobLocation || ''}
              onChange={(e) => onChange('jobLocation', e.target.value)}
              placeholder="Enter job location"
              className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-[#171214] mb-2 text-sm">Job Type</label>
            <select
              value={employmentData.type || ''}
              onChange={(e) => onChange('type', e.target.value)}
              className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
            >
              <option value="">Select Job Type</option>
              {jobTypes.map((type) => (
                <option key={type.value} value={type.value}>{type.display}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[#171214] mb-2 text-sm">Start Date</label>
            <input
              type="date"
              value={employmentData.startDate || ''}
              onChange={(e) => onChange('startDate', e.target.value)}
              className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-[#171214] mb-2 text-sm">Salary</label>
            <input
              type="number"
              value={employmentData.salary || ''}
              onChange={(e) => onChange('salary', e.target.value)}
              placeholder="Enter salary (e.g., ₦100,000/month)"
              className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
            />
          </div>
           <div>
  <label className="block text-[#171214] mb-2 text-sm">Salary Currency</label>
  <select
    value={employmentData.salaryCurrency || ''} // Changed from value to employmentData.salaryCurrency
    onChange={(e) => onChange('salaryCurrency', e.target.value)}
    className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
  >
    <option value="" disabled>Select currency</option>
    {currencyOptions.map((option) => (
      <option key={option.value} value={option.value}>
        {option.display}
      </option>
    ))}
  </select>
</div>
          <div>
            <label className="block text-[#171214] mb-2 text-sm">Benefits</label>
            <Select
  isMulti
  value={employmentData.benefits?.map(selectedValue => 
    benefitOptions.find(b => b.value === selectedValue)
  )?.filter(b => b).map(b => ({ value: b.value, label: b.display })) || []}
  onChange={(selected) => handleMultiSelectChange('benefits', selected)}
  options={benefitOptions.map(b => ({ value: b.value, label: b.display }))}
  placeholder="Select benefits"
  className="text-sm"
  styles={{
    control: (base) => ({
      ...base,
      backgroundColor: '#f3f4f6',
      border: 'none',
      boxShadow: 'none',
      '&:hover': { border: 'none' }
    }),
    placeholder: (base) => ({ ...base, color: '#6B7280' }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? '#85CE5C' : base.backgroundColor,
      '&:hover': { backgroundColor: state.isSelected ? '#85CE5C' : '#f3f4f6' }
    })
  }}
/>
          </div>
          <div>
            <label className="block text-[#171214] mb-2 text-sm">Available Vacancies</label>
            <select
              value={employmentData.availableVacancy || ''}
              onChange={(e) => onChange('availableVacancy', e.target.value)}
              className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
            >
              <option value="">Select Number</option>
              {vacancyOptions.map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[#171214] mb-2 text-sm">Job Description</label>
            <textarea
              value={employmentData.description || ''}
              onChange={(e) => onChange('description', e.target.value)}
              placeholder="Enter job description"
              className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm min-h-[150px]"
            />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <label className="flex items-start md:items-center text-sm text-[#171214]">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="mr-2"
          />
          As per our policy a payment of ₦0 is required to post this request on Fyndr, accept to proceed
        </label>
      </div>
    </div>
  );
};

export function JobSeekerForm({ employmentData, onChange, nigerianStates, isChecked, setIsChecked, onBack }) {
  const educationLevels = [
    { display: 'None', value: 'none' },
    { display: 'Primary', value: 'primary' },
    { display: 'Secondary', value: 'secondary' },
    { display: 'University', value: 'university' },
  ];
  const skills = [
    { display: 'Customer service', value: 'customer-service' },
    { display: 'Organizational skills', value: 'organizational-skills' },
    { display: 'Microsoft office', value: 'microsoft-office' },
    { display: 'Maintenance', value: 'maintenance' },
    { display: 'Communication', value: 'communication' },
    { display: 'Leadership', value: 'leadership' },
    { display: 'Accounting', value: 'accounting' },
    { display: 'Cash handling', value: 'cash-handling' },
  ];

  const lgaOptions = employmentData.state && nigerianStates[employmentData.state]
    ? nigerianStates[employmentData.state].map(lga => ({ value: lga, label: lga }))
    : [];

  const handleMultiSelectChange = (field, selectedOptions) => {
    onChange(field, selectedOptions ? selectedOptions.map(option => option.value) : []);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange('cv_image', file);
    }
  };

  const removeImage = () => {
    onChange('cv_image', null);
    const fileInput = document.getElementById('cv-image-input');
    if (fileInput) fileInput.value = '';
  };

  const workExperienceDetails = employmentData.workExperienceDetails?.length > 0
    ? employmentData.workExperienceDetails
    : [{ company: '', jobTitle: '', startYear: '', endYear: '', description: '' }];

  const handleWorkExperienceDetailChange = (index, field, value) => {
    const updatedDetails = [...workExperienceDetails];
    updatedDetails[index] = { ...updatedDetails[index], [field]: value };
    onChange('workExperienceDetails', updatedDetails);
  };

  const addWorkExperience = () => {
    onChange('workExperienceDetails', [...workExperienceDetails, { company: '', jobTitle: '', startYear: '', endYear: '', description: '' }]);
  };

  const removeWorkExperience = (index) => {
    if (workExperienceDetails.length > 1) {
      const updatedDetails = workExperienceDetails.filter((_, i) => i !== index);
      onChange('workExperienceDetails', updatedDetails);
    }
  };

  // Language handling functions
  const addLanguage = () => {
    onChange('languages', [...(employmentData.languages || []), '']);
  };

  const removeLanguage = (index) => {
    if ((employmentData.languages || []).length > 1) {
      const updatedLanguages = (employmentData.languages || []).filter((_, i) => i !== index);
      onChange('languages', updatedLanguages);
    }
  };

  const updateLanguage = (index, value) => {
    const updatedLanguages = [...(employmentData.languages || [])];
    updatedLanguages[index] = value;
    onChange('languages', updatedLanguages);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-5 md:gap-[200px] py-3 md:py-5 fixed top-0 bg-white z-50 w-full">
        <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full cursor-pointer transition-colors">
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <article className="text-center">
          <h2 className="text-lg font-bold mb-1">Post a Job Seeker Request</h2>
          <p className="text-[12px]">Find job opportunities that match your skills</p>
        </article>
      </div>
      <div className="md:hidden mt-12">
        <ProvidersSlider />
      </div>
      <div className="mt-5 md:mt-16">
        <h3 className="text-[#171214] mb-3 text-sm font-bold">Create Profile</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-[#171214] mb-2 text-sm">Profile Image</label>
            <div className="relative">
              {employmentData.cv_image ? (
                <div className="relative w-full h-40 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden">
                  <Image
                    width={50}
                    height={50}
                    src={URL.createObjectURL(employmentData.cv_image)}
                    alt="Profile image preview"
                    className="w-full h-full object-contain bg-white"
                  />
                  <button
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="cv-image-input"
                  className="cursor-pointer w-full h-40 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-100 transition-all duration-200 flex flex-col items-center justify-center text-gray-500"
                >
                  <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="text-sm font-medium">Upload Profile Image</span>
                  <span className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</span>
                </label>
              )}
              <input
                id="cv-image-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-[#171214] mb-2 text-sm">First Name</label>
              <input
                type="text"
                value={employmentData.firstName || ''}
                onChange={(e) => onChange('firstName', e.target.value)}
                placeholder="First name"
                className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
              />
            </div>
            <div className="flex-1">
              <label className="block text-[#171214] mb-2 text-sm">Last Name</label>
              <input
                type="text"
                value={employmentData.lastName || ''}
                onChange={(e) => onChange('lastName', e.target.value)}
                placeholder="Last name"
                className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-[#171214] mb-2 text-sm">Phone Number</label>
              <input
                type="tel"
                value={employmentData.number || ''}
                onChange={(e) => onChange('number', e.target.value)}
                placeholder="Phone number"
                className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
              />
            </div>
            <div className="flex-1">
              <label className="block text-[#171214] mb-2 text-sm">Email Address</label>
              <input
                type="email"
                value={employmentData.email || ''}
                onChange={(e) => onChange('email', e.target.value)}
                placeholder="Email address"
                className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-[#171214] mb-2 text-sm">Bio</label>
            <textarea
              value={employmentData.bio || ''}
              onChange={(e) => onChange('bio', e.target.value)}
              placeholder="About yourself"
              className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm min-h-[150px]"
            />
          </div>
          <div>
            <label className="block text-[#171214] mb-2 text-sm">State</label>
            <select
              value={employmentData.state || ''}
              onChange={(e) => onChange('state', e.target.value)}
              className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
            >
              <option value="">Select State</option>
              {Object.keys(nigerianStates).map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[#171214] mb-2 text-sm">LGA</label>
            <Select
              value={lgaOptions.find(option => option.value === employmentData.lga) || null}
              onChange={(selected) => onChange('lga', selected ? selected.value : '')}
              options={lgaOptions}
              isDisabled={!employmentData.state}
              placeholder="Select LGA"
              className="text-sm"
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: '#f3f4f6',
                  border: 'none',
                  boxShadow: 'none',
                  '&:hover': { border: 'none' },
                }),
                placeholder: (base) => ({ ...base, color: '#6B7280' }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected ? '#85CE5C' : base.backgroundColor,
                  '&:hover': { backgroundColor: state.isSelected ? '#85CE5C' : '#f3f4f6' },
                }),
              }}
            />
          </div>
          <div>
            <label className="block text-[#171214] mb-2 text-sm">Area</label>
            <input
              type="text"
              value={employmentData.area || ''}
              onChange={(e) => onChange('area', e.target.value)}
              placeholder="Enter area"
              className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-[#171214] mb-2 text-sm">Graduate</label>
            <select
              value={employmentData.graduate === true ? 'true' : employmentData.graduate === false ? 'false' : ''}
              onChange={(e) => {
                const value = e.target.value === 'true' ? true : e.target.value === 'false' ? false : null;
                onChange('graduate', value);
              }}
              className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
            >
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div>
            <label className="block text-[#171214] mb-2 text-sm">Level of Education</label>
            <select
              value={employmentData.levelOfEducation || ''}
              onChange={(e) => onChange('levelOfEducation', e.target.value)}
              className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
            >
              <option value="">Select Level</option>
              {educationLevels.map((level) => (
                <option key={level.value} value={level.value}>{level.display}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[#171214] mb-2 text-sm">What did you study?</label>
            <input
              type="text"
              value={employmentData.whatDidYouStudy || ''}
              onChange={(e) => onChange('whatDidYouStudy', e.target.value)}
              placeholder="Enter field of study"
              className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-[#171214] mb-2 text-sm">School Name</label>
            <input
              type="text"
              value={employmentData.schoolName || ''}
              onChange={(e) => onChange('schoolName', e.target.value)}
              placeholder="Enter school name"
              className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
            />
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-[#171214] mb-2 text-sm">Start Year</label>
              <input
                type="text"
                value={employmentData.startYear || ''}
                onChange={(e) => onChange('startYear', e.target.value)}
                placeholder="E.g., 2015"
                className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
              />
            </div>
            <div className="flex-1">
              <label className="block text-[#171214] mb-2 text-sm">End Year</label>
              <input
                type="text"
                value={employmentData.endYear || ''}
                onChange={(e) => onChange('endYear', e.target.value)}
                placeholder="E.g., 2019"
                className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-[#171214] mb-2 text-sm">Do you have work experience?</label>
            <select
              value={employmentData.hasWorkExperience === true ? 'true' : employmentData.hasWorkExperience === false ? 'false' : ''}
              onChange={(e) => {
                const value = e.target.value === 'true' ? true : e.target.value === 'false' ? false : null;
                onChange('hasWorkExperience', value);
                if (value === false) {
                  onChange('workExperienceDetails', []);
                  onChange('yearsOfExperience', '');
                } else if (value === true && workExperienceDetails.length === 0) {
                  onChange('workExperienceDetails', [{ company: '', jobTitle: '', duration: '' }]);
                }
              }}
              className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
            >
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          {employmentData.hasWorkExperience === true && (
            <>
              {workExperienceDetails.map((exp, index) => (
                <div key={index} className="space-y-4 border-t pt-4 mt-4">
                  <h4 className="text-sm font-semibold">Work Experience {index + 1}</h4>
                  <div>
                    <label className="block text-[#171214] mb-2 text-sm">Company</label>
                    <input
                      type="text"
                      value={exp.company || ''}
                      onChange={(e) => handleWorkExperienceDetailChange(index, 'company', e.target.value)}
                      placeholder="Enter company name"
                      className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[#171214] mb-2 text-sm">Job Title</label>
                    <input
                      type="text"
                      value={exp.jobTitle || ''}
                      onChange={(e) => handleWorkExperienceDetailChange(index, 'jobTitle', e.target.value)}
                      placeholder="Enter job title"
                      className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
                    />
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1">
                    <label className="block text-[#171214] mb-2 text-sm">Start Year</label>
                    <input
                      type="text"
                      value={exp.startYear || ''}
                      onChange={(e) => handleWorkExperienceDetailChange(index, 'startYear', e.target.value)}
                      placeholder="E.g., 2018"
                      className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-[#171214] mb-2 text-sm">End Year</label>
                    <input
                      type="text"
                      value={exp.endYear || ''}
                      onChange={(e) => handleWorkExperienceDetailChange(index, 'endYear', e.target.value)}
                      placeholder="E.g., 2020"
                      className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
                    />
                  </div>
                  </div>
                  <div>
            <label className="block text-[#171214] mb-2 text-sm">Job Description</label>
            <textarea
              value={exp.description || ''}
              onChange={(e) => handleWorkExperienceDetailChange(index, 'description', e.target.value)}
              placeholder="Enter job description"
              className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm min-h-[150px]"
            />
          </div>
                  {workExperienceDetails.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeWorkExperience(index)}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Remove Experience
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addWorkExperience}
                className="text-[#85CE5C] text-sm hover:underline mt-2"
              >
                Add Another Experience
              </button>
            </>
          )}
          <div>
            <label className="block text-[#171214] mb-2 text-sm">Additional Skills</label>
            <Select
              isMulti
              value={(employmentData.additionalSkills || [])
                .map(val => {
                  const s = skills.find(item => item.value === val);
                  return { value: val, label: s ? s.display : val };
                })}
              onChange={(selected) => handleMultiSelectChange('additionalSkills', selected)}
              options={skills.map(s => ({ value: s.value, label: s.display }))}
              placeholder="Select skills"
              className="text-sm"
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: '#f3f4f6',
                  border: 'none',
                  boxShadow: 'none',
                  '&:hover': { border: 'none' },
                }),
                placeholder: (base) => ({ ...base, color: '#6B7280' }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected ? '#85CE5C' : base.backgroundColor,
                  '&:hover': { backgroundColor: state.isSelected ? '#85CE5C' : '#f3f4f6' },
                }),
              }}
            />
          </div>
          <div>
            <label className="block text-[#171214] mb-2 text-sm">Additional Certificate or License</label>
            <input
              type="text"
              value={employmentData.additionalCertificate || ''}
              onChange={(e) => onChange('additionalCertificate', e.target.value)}
              placeholder="Enter any certificates or licenses"
              className="outline-0 w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-sm"
            />
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-sm font-semibold text-[#171214]">Languages</h3>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {(employmentData.languages || ['']).map((language, index) => (
                <div key={index} className="flex gap-2 group">
                  <input
                    type="text"
                    value={language}
                    onChange={(e) => updateLanguage(index, e.target.value)}
                    placeholder="e.g. English (Native), Spanish (Fluent)"
                    className="flex-1 px-4 py-3 bg-gray-100 border-none rounded-lg text-sm focus:outline-none focus:border-transparent transition-all duration-200"
                  />
                  {(employmentData.languages || []).length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLanguage(index)}
                      className="px-3 py-3 text-red-600 cursor-pointer hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addLanguage}
              className="flex items-center gap-2 text-[#85CE5C] cursor-pointer hover:text-[#6FB848] hover:bg-[#85CE5C]/5 px-4 py-3 rounded-lg transition-all duration-200 font-medium text-sm"
            >
              <Plus size={16} />
              Add Language
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <label className="flex items-start md:items-center text-sm text-[#171214]">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="mr-2"
          />
          As per our policy a payment of ₦0 is required to post this request on Fyndr, accept to proceed
        </label>
      </div>
    </div>
  );
}

