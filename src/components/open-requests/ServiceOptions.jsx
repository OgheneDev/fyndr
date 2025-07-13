import React from 'react'

export const SERVICE_OPTIONS = [
  { value: '', label: 'Services' },
  { value: 'car-hire', label: 'Car Hire' },
  { value: 'cleaning', label: 'Cleaning' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'car-parts', label: 'Car Parts' },
  { value: 'automobile', label: 'Automobile' }
]

const ServiceOptions = ({ value, onChange }) => (
  <div className="relative">
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="inline-flex cursor-pointer items-center px-2 py-2 border border-gray-300 rounded-full bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
    >
      {SERVICE_OPTIONS.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
)

export default ServiceOptions
