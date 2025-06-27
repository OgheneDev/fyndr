import React from 'react'

// Properties Form
export function PropertiesForm({ formData, onChange }) {
  return (
    <div className="space-y-6">
      {/* Lease or Buy */}
      <div>
        <label className="block text-[#171214] mb-3">Lease or Buy</label>
        <div className="relative">
          <select
            value={formData.leaseOrBuy}
            onChange={e => onChange('leaseOrBuy', e.target.value)}
            className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg appearance-none   text-[#171214]"
          >
            <option value="Lease">Lease</option>
            <option value="Buy">Buy</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
      {/* Current Location */}
      <div>
        <label className="block text-[#171214] mb-3">Current Location</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={formData.currentLocation}
          onChange={e => onChange('currentLocation', e.target.value)}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg   placeholder-gray-500"
        />
      </div>
      {/* Target Location */}
      <div>
        <label className="block text-[#171214] mb-3">Target State</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={formData.targetLocation}
          onChange={e => onChange('targetLocation', e.target.value)}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg   placeholder-gray-500"
        />
      </div>
      {/* Role */}
      <div>
        <label className="block text-[#171214] mb-3">Role</label>
        <div className="relative">
          <select
            value={formData.role}
            onChange={e => onChange('role', e.target.value)}
            className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg appearance-none   text-[#171214]"
          >
            <option value="Landlord or Agent">Landlord or Agent</option>
            <option value="Tenant">Tenant</option>
            <option value="Buyer">Buyer</option>
            <option value="Seller">Seller</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

// Car Hire Form
export function CarHireForm({ carHireData, onChange, nigerianStates, carTypes }) {
  return (
    <div className="space-y-6">
      {/* State */}
      <div>
        <label className="block text-[#171214] mb-3">State</label>
        <select
          value={carHireData.state}
          onChange={e => onChange('state', e.target.value)}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg  "
        >
          <option value="">Select State</option>
          {Object.keys(nigerianStates).map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>
      {/* Type of Car */}
      <div>
        <label className="block text-[#171214] mb-3">Type of Car</label>
        <select
          value={carHireData.typeOfCar}
          onChange={e => onChange('typeOfCar', e.target.value)}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg  "
        >
          <option value="">Select Type</option>
          {carTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      <div className='flex gap-3'>
        {/* Pickup Location */}
      <div>
        <label className="block text-[#171214] mb-3">Pickup Location</label>
        <input
          type="text"
          value={carHireData.pickupLocation}
          onChange={e => onChange('pickupLocation', e.target.value)}
          placeholder="Pickup location"
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg  "
        />
      </div>
      {/* Duration */}
      <div>
        <label className="block text-[#171214] mb-3">Duration</label>
        <input
          type="text"
          value={carHireData.duration}
          onChange={e => onChange('duration', e.target.value)}
          placeholder="e.g. 3 days"
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg  "
        />
      </div>
      </div>
      <div className='flex gap-3'>
        {/* Airport */}
      <div>
        <label className="block text-[#171214] mb-3">Airport</label>
        <select
          value={carHireData.airport}
          onChange={e => onChange('airport', e.target.value)}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg  "
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      {/* Travel */}
      <div>
        <label className="block text-[#171214] mb-3">Travel</label>
        <select
          value={carHireData.travel}
          onChange={e => onChange('travel', e.target.value)}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg  "
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      </div>
      {/* Additional Details */}
      <div>
        <label className="block text-[#171214] mb-3">Additional Details</label>
        <textarea
          value={carHireData.additionalDetails}
          onChange={e => onChange('additionalDetails', e.target.value)}
          placeholder="Enter any additional details"
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg  "
        />
      </div>
    </div>
  )
}

// Cleaning Form
export function CleaningForm({ cleaningData, onChange, nigerianStates, propertyTypes, cleaningTypes }) {
  return (
    <div className="space-y-6">
      {/* State */}
      <div>
        <label className="block text-[#171214] mb-3">State</label>
        <select
          value={cleaningData.state}
          onChange={e => onChange('state', e.target.value)}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg  "
        >
          <option value="">Select State</option>
          {Object.keys(nigerianStates).map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>
      {/* Property Location */}
      <div>
        <label className="block text-[#171214] mb-3">Property Location</label>
        <input
          type="text"
          value={cleaningData.propertyLocation}
          onChange={e => onChange('propertyLocation', e.target.value)}
          placeholder="Enter property location"
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg  "
        />
      </div>
      {/* Property Type */}
      <div>
        <label className="block text-[#171214] mb-3">Property Type</label>
        <select
          value={cleaningData.propertyType}
          onChange={e => onChange('propertyType', e.target.value)}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg  "
        >
          <option value="">Select Type</option>
          {propertyTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      {/* Number of Rooms */}
      <div>
        <label className="block text-[#171214] mb-3">Number of Rooms</label>
        <input
          type="number"
          value={cleaningData.numberOfRooms}
          onChange={e => onChange('numberOfRooms', e.target.value)}
          min={1}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg  "
        />
      </div>
      {/* Regular or Post Construction Cleaning */}
      <div>
        <label className="block text-[#171214] mb-3">Cleaning Type</label>
        <select
          value={cleaningData.regularOrPostConstructionCleaning}
          onChange={e => onChange('regularOrPostConstructionCleaning', e.target.value)}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg  "
        >
          <option value="">Select</option>
          {cleaningTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      {/* Additional Details */}
      <div>
        <label className="block text-[#171214] mb-3">Additional Details</label>
        <textarea
          value={cleaningData.additionalDetails}
          onChange={e => onChange('additionalDetails', e.target.value)}
          placeholder="Enter any additional details"
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg  "
        />
      </div>
    </div>
  )
}

// Car Parts Form
export function CarPartsForm({ carPartsData, onChange, nigerianStates, carMakes, carModels, carYears }) {
  return (
    <div className="space-y-6">
      {/* Current State */}
      <div>
        <label className="block text-[#171214] mb-3">Current State</label>
        <select
          value={carPartsData.currentState}
          onChange={e => onChange('currentState', e.target.value)}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg  "
        >
          <option value="">Select State</option>
          {Object.keys(nigerianStates).map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>
      {/* Current Location */}
      <div>
        <label className="block text-[#171214] mb-3">Current Location</label>
        <input
          type="text"
          value={carPartsData.currentLocation}
          onChange={e => onChange('currentLocation', e.target.value)}
          placeholder="Enter current location"
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg  "
        />
      </div>
      {/* Desired Sourcing Location */}
      <div>
        <label className="block text-[#171214] mb-3">Desired Sourcing Location</label>
        <select
          value={carPartsData.desiredSourcingLocation}
          onChange={e => onChange('desiredSourcingLocation', e.target.value)}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg  "
        >
          <option value="">Select State</option>
          {Object.keys(nigerianStates).map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>
      <div className='flex gap-3'>
        {/* Make */}
      <div>
        <label className="block text-[#171214] mb-3">Make</label>
        <select
          value={carPartsData.make}
          onChange={e => onChange('make', e.target.value)}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg  "
        >
          <option value="">Select Make</option>
          {carMakes.map(make => (
            <option key={make} value={make}>{make}</option>
          ))}
        </select>
      </div>
      {/* Model */}
      <div>
        <label className="block text-[#171214] mb-3">Model</label>
        <select
          value={carPartsData.model}
          onChange={e => onChange('model', e.target.value)}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg  "
          disabled={!carPartsData.make}
        >
          <option value="">Select Model</option>
          {(carModels[carPartsData.make] || []).map(model => (
            <option key={model} value={model}>{model}</option>
          ))}
        </select>
      </div>
      {/* Year */}
      <div>
        <label className="block text-[#171214] mb-3">Year</label>
        <select
          value={carPartsData.year}
          onChange={e => onChange('year', e.target.value)}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg  "
        >
          <option value="">Select Year</option>
          {carYears.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      </div>
      {/* Description */}
      <div>
        <label className="block text-[#171214] mb-3">Description</label>
        <textarea
          value={carPartsData.description}
          onChange={e => onChange('description', e.target.value)}
          placeholder="Describe the car part"
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg  "
        />
      </div>
      {/* Attachment */}
      <div>
        <label className="block text-[#171214] mb-3">Attachment (Image/Video)</label>
        <input
          type="file"
          accept="image/*,video/*"
          onChange={e => onChange('attachment', e.target.files[0])}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg  "
        />
      </div>
    </div>
  )
}
