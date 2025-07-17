"use client"

import React, {useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';


// Properties Form
export function PropertiesForm({ formData, onChange, nigerianStates, propertyTypes, isChecked, setIsChecked }) {
  const handleAxisChange = (e) => {
    const options = Array.from(e.target.options)
      .filter((opt) => opt.selected)
      .map((opt) => opt.value)
      .slice(0, 3);
    onChange('axis', options);
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
      <div className="mt-10 md:mt-20">
        <label className="block text-[#171214] mb-3 text-sm">Title</label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => onChange('title', e.target.value)}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
          placeholder="Enter Title"
        />
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Rent or Buy</label>
        <select
          value={formData.rentType || ''}
          onChange={(e) => onChange('rentType', e.target.value)}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
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
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
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
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
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
        <select
          multiple
          value={formData.axis || []}
          onChange={handleAxisChange}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
          size={Math.min(4, axisOptions.length)}
        >
          {axisOptions.map((axis) => (
            <option key={axis} value={axis}>
              {axis}
            </option>
          ))}
        </select>
        <div className="text-xs text-gray-500 mt-1">Hold Ctrl (Windows) or Cmd (Mac) to select multiple</div>
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Property Condition</label>
        <select
          value={formData.propertyCondition || ''}
          onChange={(e) => onChange('propertyCondition', e.target.value)}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
        >
          <option value="">Select Condition</option>
          <option value="new">New</option>
          <option value="old">Old</option>
          <option value="any">Any</option>
        </select>
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Room Number</label>
        <input
          type="number"
          value={formData.roomNumber || ''}
          onChange={(e) => onChange('roomNumber', e.target.value)}
          min={1}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
          placeholder="Enter number of rooms"
        />
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
            trackStyle={{ backgroundColor: '#541229' }}
            handleStyle={{ borderColor: '#541229', backgroundColor: '#fff' }}
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
                className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
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
                className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
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
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
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
          As per our policy a payment of ₦499 is required to post a request on Fyndr, accept to proceed
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
      <div className="mt-10 md:mt-20">
        <label className="block text-[#171214] mb-3 text-sm">Title</label>
        <input
          type="text"
          value={carHireData.title || ''}
          onChange={(e) => onChange('title', e.target.value)}
          min={1}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
          placeholder="Enter Title"
        />
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">State</label>
        <select
          value={carHireData.state || ''}
          onChange={(e) => onChange('state', e.target.value)}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded LG text-sm"
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
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
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
            className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
          />
        </div>
        <div className="flex-1">
          <label className="block text-[#171214] mb-3 text-sm">Duration</label>
          <input
            type="number"
            value={carHireData.hireDuration || ''}
            onChange={(e) => onChange('hireDuration', e.target.value)}
            placeholder="Duration (in hrs)"
            className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
          />
        </div>
      </div>
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-[#171214] mb-3 text-sm">Airport</label>
          <select
            value={carHireData.airport || ''}
            onChange={(e) => onChange('airport', e.target.value)}
            className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
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
            className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
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
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
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
          As per our policy a payment of ₦499 is required to post a request on Fyndr, accept to proceed
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
      <div className="mt-10 md:mt-20">
        <label className="block text-[#171214] mb-3 text-sm">Title</label>
        <input
          type="text"
          value={cleaningData.title || ''}
          onChange={(e) => onChange('title', e.target.value)}
          min={1}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
          placeholder="Enter Title"
        />
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">State</label>
        <select
          value={cleaningData.state || ''}
          onChange={(e) => onChange('state', e.target.value)}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
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
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
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
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
        />
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Property Type</label>
        <select
          value={cleaningData.propertyType}
          onChange={(e) => onChange('propertyType', e.target.value)}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
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
        <label className="block text-[#171214] mb-3 text-sm">Number of Rooms</label>
        <input
          type="number"
          value={cleaningData.roomNumber || ''}
          onChange={(e) => onChange('roomNumber', e.target.value)}
          min={1}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
        />
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Cleaning Type</label>
        <select
          value={cleaningData.cleaningType}
          onChange={(e) => onChange('cleaningType', e.target.value)}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
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
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
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
          As per our policy a payment of ₦499 is required to post a request on Fyndr, accept to proceed
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
      <div className="mt-12 md:mt-20">
        <label className="block text-[#171214] mb-3 text-sm">Title</label>
        <input
          type="text"
          value={carPartsData.title || ''}
          onChange={(e) => onChange('title', e.target.value)}
          min={1}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
          placeholder="Common name of part needed"
        />
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Current State</label>
        <select
          value={carPartsData.state}
          onChange={(e) => onChange('state', e.target.value)}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
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
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
        />
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Sourcing Location</label>
        <input
          type="text"
          value={carPartsData.sourcingLocation}
          onChange={(e) => onChange('sourcingLocation', e.target.value)}
          placeholder="E.g Ladipo Market"
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
        />
      </div>
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-[#171214] mb-3 text-sm">Make</label>
          <select
            value={carPartsData.carMake}
            onChange={(e) => onChange('carMake', e.target.value)}
            className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
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
            className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
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
            className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
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
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
        />
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Attachment (Image/Video)</label>
        <input
          type="file"
          accept="image/*,video/*"
          onChange={(e) => onChange('attachment', e.target.files[0])}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
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
          As per our policy a payment of ₦499 is required to post a request on Fyndr, accept to proceed
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
      <div className="mt-10 md:mt-20">
        <label className="block text-[#171214] mb-3 text-sm">Title</label>
        <input
          type="text"
          value={automobileData.title}
          onChange={(e) => onChange('title', e.target.value)}
          placeholder="Request title"
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
        />
      </div>
      <div>
        <label className="block text-[#171214] mb-3 text-sm">State</label>
        <select
          value={automobileData.state}
          onChange={(e) => onChange('state', e.target.value)}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
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
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
        />
      </div>
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-[#171214] mb-3 text-sm">Car Make</label>
          <select
            value={automobileData.carMake}
            onChange={(e) => onChange('carMake', e.target.value)}
            className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
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
            className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
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
            className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
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
            className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
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
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
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
            trackStyle={{ backgroundColor: '#541229' }}
            handleStyle={{ borderColor: '#541229', backgroundColor: '#fff' }}
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
                className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
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
                className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
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
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
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
          As per our policy a payment of ₦499 is required to post a request on Fyndr, accept to proceed
        </label>
      </div>
    </div>
  );
};

