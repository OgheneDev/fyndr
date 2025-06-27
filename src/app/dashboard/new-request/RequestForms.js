import React from 'react'

// Properties Form
export function PropertiesForm({ formData, onChange, nigerianStates }) {
  const priceRanges = [
    "Below ₦500k",
    "₦500k - ₦1m",
    "₦1m - ₦5m",
    "Above ₦5m"
  ]

  // Helper for multi-select axis
  const handleAxisChange = (e) => {
    const options = Array.from(e.target.options)
      .filter(opt => opt.selected)
      .map(opt => opt.value)
      .slice(0, 3)
    onChange('targetAxis', options)
  }

  // fallback to empty object if nigerianStates is not provided
  const safeStates = nigerianStates || {};
  const selectedState = formData.targetState
  const axisOptions = selectedState && safeStates[selectedState] ? safeStates[selectedState] : []

  return (
    <div className="space-y-6">
      {/* Rent or Buy */}
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Rent or Buy</label>
        <select
          value={formData.rentOrBuy || ''}
          onChange={e => onChange('rentOrBuy', e.target.value)}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
        >
          <option value="">Select</option>
          <option value="Rent">Rent</option>
          <option value="Buy">Buy</option>
        </select>
      </div>
      {/* Target State */}
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Target State</label>
        <select
          value={formData.targetState || ''}
          onChange={e => onChange('targetState', e.target.value)}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
        >
          <option value="">Select State</option>
          {Object.keys(safeStates).map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>
      {/* Target Axis (multi-select, up to 3) */}
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Target Axis (up to 3)</label>
        <select
          multiple
          value={formData.targetAxis || []}
          onChange={handleAxisChange}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
          size={Math.min(4, axisOptions.length)}
        >
          {axisOptions.map(axis => (
            <option key={axis} value={axis}>{axis}</option>
          ))}
        </select>
        <div className="text-xs text-gray-500 mt-1">Hold Ctrl (Windows) or Cmd (Mac) to select multiple</div>
      </div>
      {/* Price Range */}
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Price Range</label>
        <select
          value={formData.priceRange || ''}
          onChange={e => onChange('priceRange', e.target.value)}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
        >
          <option value="">Select Price Range</option>
          {priceRanges.map(range => (
            <option key={range} value={range}>{range}</option>
          ))}
        </select>
      </div>
      {/* Additional Details */}
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Additional Details</label>
        <textarea
          value={formData.additionalDetails || ''}
          onChange={e => onChange('additionalDetails', e.target.value)}
          placeholder="Enter any additional details"
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
        />
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
        <label className="block text-[#171214] mb-3 text-sm">State</label>
        <select
          value={carHireData.state}
          onChange={e => onChange('state', e.target.value)}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm "
        >
          <option value="">Select State</option>
          {Object.keys(nigerianStates).map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>
      {/* Type of Car */}
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Type of Car</label>
        <select
          value={carHireData.typeOfCar}
          onChange={e => onChange('typeOfCar', e.target.value)}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm "
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
        <label className="block text-[#171214] mb-3 text-sm">Pickup Location</label>
        <input
          type="text"
          value={carHireData.pickupLocation}
          onChange={e => onChange('pickupLocation', e.target.value)}
          placeholder="Pickup location"
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm "
        />
      </div>
      {/* Duration */}
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Duration</label>
        <input
          type="text"
          value={carHireData.duration}
          onChange={e => onChange('duration', e.target.value)}
          placeholder="e.g. 3 days"
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm "
        />
      </div>
      </div>
      <div className='flex gap-3'>
        {/* Airport */}
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Airport</label>
        <select
          value={carHireData.airport}
          onChange={e => onChange('airport', e.target.value)}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm "
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      {/* Travel */}
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Travel</label>
        <select
          value={carHireData.travel}
          onChange={e => onChange('travel', e.target.value)}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm "
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      </div>
      {/* Additional Details */}
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Additional Details</label>
        <textarea
          value={carHireData.additionalDetails}
          onChange={e => onChange('additionalDetails', e.target.value)}
          placeholder="Enter any additional details"
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm "
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
        <label className="block text-[#171214] mb-3 text-sm">State</label>
        <select
          value={cleaningData.state}
          onChange={e => onChange('state', e.target.value)}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm "
        >
          <option value="">Select State</option>
          {Object.keys(nigerianStates).map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>
      {/* Property Location */}
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Property Location</label>
        <input
          type="text"
          value={cleaningData.propertyLocation}
          onChange={e => onChange('propertyLocation', e.target.value)}
          placeholder="Enter property location"
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm "
        />
      </div>
      {/* Property Type */}
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Property Type</label>
        <select
          value={cleaningData.propertyType}
          onChange={e => onChange('propertyType', e.target.value)}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm "
        >
          <option value="">Select Type</option>
          {propertyTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      {/* Number of Rooms */}
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Number of Rooms</label>
        <input
          type="number"
          value={cleaningData.numberOfRooms}
          onChange={e => onChange('numberOfRooms', e.target.value)}
          min={1}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm "
        />
      </div>
      {/* Regular or Post Construction Cleaning */}
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Cleaning Type</label>
        <select
          value={cleaningData.regularOrPostConstructionCleaning}
          onChange={e => onChange('regularOrPostConstructionCleaning', e.target.value)}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm "
        >
          <option value="">Select</option>
          {cleaningTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      {/* Additional Details */}
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Additional Details</label>
        <textarea
          value={cleaningData.additionalDetails}
          onChange={e => onChange('additionalDetails', e.target.value)}
          placeholder="Enter any additional details"
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm "
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
        <label className="block text-[#171214] mb-3 text-sm">Current State</label>
        <select
          value={carPartsData.currentState}
          onChange={e => onChange('currentState', e.target.value)}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm "
        >
          <option value="">Select State</option>
          {Object.keys(nigerianStates).map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>
      {/* Current Location */}
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Current Location</label>
        <input
          type="text"
          value={carPartsData.currentLocation}
          onChange={e => onChange('currentLocation', e.target.value)}
          placeholder="Enter current location"
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm "
        />
      </div>
      {/* Desired Sourcing Location */}
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Desired Sourcing Location</label>
        <select
          value={carPartsData.desiredSourcingLocation}
          onChange={e => onChange('desiredSourcingLocation', e.target.value)}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm "
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
        <label className="block text-[#171214] mb-3 text-sm">Make</label>
        <select
          value={carPartsData.make}
          onChange={e => onChange('make', e.target.value)}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm "
        >
          <option value="">Select Make</option>
          {carMakes.map(make => (
            <option key={make} value={make}>{make}</option>
          ))}
        </select>
      </div>
      {/* Model */}
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Model</label>
        <select
          value={carPartsData.model}
          onChange={e => onChange('model', e.target.value)}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm "
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
        <label className="block text-[#171214] mb-3 text-sm">Year</label>
        <select
          value={carPartsData.year}
          onChange={e => onChange('year', e.target.value)}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm "
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
        <label className="block text-[#171214] mb-3 text-sm">Description</label>
        <textarea
          value={carPartsData.description}
          onChange={e => onChange('description', e.target.value)}
          placeholder="Describe the car part"
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm "
        />
      </div>
      {/* Attachment */}
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Attachment (Image/Video)</label>
        <input
          type="file"
          accept="image/*,video/*"
          onChange={e => onChange('attachment', e.target.files[0])}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm "
        />
      </div>
    </div>
  )
}
