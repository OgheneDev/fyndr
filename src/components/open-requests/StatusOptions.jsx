import React from 'react'

export const STATUS_OPTIONS = [
  { value: '', label: 'Statuses' },
  { value: 'submitted', label: 'Submitted' },
  { value: 'closed', label: 'Closed' },
  { value: 'cancelled', label: 'Cancelled' }
]

const StatusOptions = ({ value, onChange }) => (
  <div className="relative">
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="inline-flex items-center cursor-pointer w-[100px] px-2 py-2 border border-gray-300 rounded-full bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
    >
      {STATUS_OPTIONS.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
)

export default StatusOptions
