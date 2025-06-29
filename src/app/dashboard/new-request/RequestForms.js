import React from 'react'

// Properties Form
export function PropertiesForm({ formData, onChange, nigerianStates, propertyTypes }) {
  const priceRanges = [
    { label: "Below ₦500k", lower: 0, upper: 500000 },
    { label: "₦500k - ₦1m", lower: 500000, upper: 1000000 },
    { label: "₦1m - ₦5m", lower: 1000000, upper: 5000000 },
    { label: "Above ₦5m", lower: 5000000, upper: 1000000000 }
  ]

  // Helper for multi-select axis
  const handleAxisChange = (e) => {
    const options = Array.from(e.target.options)
      .filter(opt => opt.selected)
      .map(opt => opt.value)
      .slice(0, 3)
    onChange('axis', options)
  }

  // Handle price range selection
  const handlePriceRangeChange = (e) => {
    const selected = priceRanges.find(r => r.label === e.target.value)
    if (selected) {
      onChange('lowerPriceLimit', selected.lower)
      onChange('upperPriceLimit', selected.upper)
    } else {
      onChange('lowerPriceLimit', '')
      onChange('upperPriceLimit', '')
    }
  }

  // fallback to empty object if nigerianStates is not provided
  const safeStates = nigerianStates || {};
  const selectedState = formData.state
  const axisOptions = selectedState && safeStates[selectedState] ? safeStates[selectedState] : []

  // Find which price range is currently selected
  const selectedPriceRange = priceRanges.find(
    r => Number(formData.lowerPriceLimit) === r.lower && Number(formData.upperPriceLimit) === r.upper
  )?.label || ''

  // Default propertyTypes to empty array if not provided
  const safePropertyTypes = propertyTypes || [];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Title</label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={e => onChange('title', e.target.value)}
          min={1}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
          placeholder="Enter Title"
        />
      </div>
      {/* Rent or Buy */}
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Rent or Buy</label>
        <select
          value={formData.rentType || ''}
          onChange={e => onChange('rentType', e.target.value)}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
        >
          <option value="">Select</option>
          <option value="rent">Rent</option>
          <option value="buy">Buy</option>
        </select>
      </div>
      {/* Property Type */}
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Property Type</label>
        <select
          value={formData.propertyType}
          onChange={e => onChange('propertyType', e.target.value)}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm "
        >
          <option value="">Select Type</option>
          {safePropertyTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      {/* Target State */}
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Target State</label>
        <select
          value={formData.state || ''}
          onChange={e => onChange('state', e.target.value)}
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
          value={formData.axis || []}
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
      {/* Property Condition */}
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Property Condition</label>
        <select
          value={formData.propertyCondition || ''}
          onChange={e => onChange('propertyCondition', e.target.value)}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
        >
          <option value="">Select Condition</option>
          <option value="new">New</option>
          <option value="old">Old</option>
          <option value="any">Any</option>
        </select>
      </div>
      {/* Room Number */}
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Room Number</label>
        <input
          type="number"
          value={formData.roomNumber || ''}
          onChange={e => onChange('roomNumber', e.target.value)}
          min={1}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
          placeholder="Enter number of rooms"
        />
      </div>
      {/* Price Range */}
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Price Range</label>
        <select
          value={selectedPriceRange}
          onChange={handlePriceRangeChange}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
        >
          <option value="">Select Price Range</option>
          {priceRanges.map(range => (
            <option key={range.label} value={range.label}>{range.label}</option>
          ))}
        </select>
      </div>
      {/* Additional Details */}
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Additional Details</label>
        <textarea
          value={formData.details || ''}
          onChange={e => onChange('details', e.target.value)}
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
      <div className='flex-1'>
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
      <div className='flex-1'>
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
      <div className='flex-1'>
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
      <div className='flex-1'>
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
      <div className='flex-1'>
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
      <div className='flex-1'>
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
      <div className='flex-1'>
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

// Automobile Form
export function AutomobileForm({ automobileData, onChange, nigerianStates, carMakes, carModels, carYears }) {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Title</label>
        <input
          type="text"
          value={automobileData.title}
          onChange={e => onChange('title', e.target.value)}
          placeholder="Request title"
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
        />
      </div>
      {/* State */}
      <div>
        <label className="block text-[#171214] mb-3 text-sm">State</label>
        <select
          value={automobileData.state}
          onChange={e => onChange('state', e.target.value)}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
        >
          <option value="">Select State</option>
          {Object.keys(nigerianStates).map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>
      {/* Details */}
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Details</label>
        <textarea
          value={automobileData.details}
          onChange={e => onChange('details', e.target.value)}
          placeholder="Enter details"
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
        />
      </div>
      {/* Location */}
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Location</label>
        <input
          type="text"
          value={automobileData.location}
          onChange={e => onChange('location', e.target.value)}
          placeholder="Location"
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
        />
      </div>
      {/* Car Make */}
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Car Make</label>
        <select
          value={automobileData.carMake}
          onChange={e => onChange('carMake', e.target.value)}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
        >
          <option value="">Select Make</option>
          {carMakes.map(make => (
            <option key={make} value={make}>{make}</option>
          ))}
        </select>
      </div>
      {/* Car Model */}
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Car Model</label>
        <select
          value={automobileData.carModel}
          onChange={e => onChange('carModel', e.target.value)}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
          disabled={!automobileData.carMake}
        >
          <option value="">Select Model</option>
          {(carModels[automobileData.carMake] || []).map(model => (
            <option key={model} value={model}>{model}</option>
          ))}
        </select>
      </div>
      {/* Car Year From */}
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Car Year From</label>
        <select
          value={automobileData.carYearFrom}
          onChange={e => onChange('carYearFrom', e.target.value)}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
        >
          <option value="">Select Year</option>
          {carYears.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      {/* Car Year To */}
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Car Year To</label>
        <select
          value={automobileData.carYearTo}
          onChange={e => onChange('carYearTo', e.target.value)}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
        >
          <option value="">Select Year</option>
          {carYears.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      {/* Transmission */}
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Transmission</label>
        <select
          value={automobileData.transmission}
          onChange={e => onChange('transmission', e.target.value)}
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
        >
          <option value="">Select</option>
          <option value="manual">Manual</option>
          <option value="automatic">Automatic</option>
        </select>
      </div>
      {/* Upper Price Limit */}
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Upper Price Limit</label>
        <input
          type="number"
          value={automobileData.upperPriceLimit}
          onChange={e => onChange('upperPriceLimit', e.target.value)}
          placeholder="Upper price limit"
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
        />
      </div>
      {/* Lower Price Limit */}
      <div>
        <label className="block text-[#171214] mb-3 text-sm">Lower Price Limit</label>
        <input
          type="number"
          value={automobileData.lowerPriceLimit}
          onChange={e => onChange('lowerPriceLimit', e.target.value)}
          placeholder="Lower price limit"
          className="w-full px-4 py-3 bg-[#F5F2F2] border-none rounded-lg text-sm"
        />
      </div>
    </div>
  )
}
