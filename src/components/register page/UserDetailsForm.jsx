import { nigerianStates } from '@/data/nigerianStates'

export const UserDetailsForm = ({ formData, onChange }) => {
  // Get array of state names
  const states = Object.keys(nigerianStates).sort()
  
  // Get LGAs for selected state
  const lgas = formData.state ? nigerianStates[formData.state].sort() : []

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
        <input
          type="text"
          value={formData.name || ''}
          onChange={(e) => onChange({ ...formData, name: e.target.value })}
          placeholder="Enter your name"
          className="w-full px-4 py-3 bg-[#F5F2F2] rounded-lg focus:ring-2 focus:ring-[#541229] focus:border-transparent outline-none transition-all"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <input
          type="email"
          value={formData.email || ''}
          onChange={(e) => onChange({ ...formData, email: e.target.value })}
          placeholder="Enter your email"
          className="w-full px-4 py-3 bg-[#F5F2F2] rounded-lg focus:ring-2 focus:ring-[#541229] focus:border-transparent outline-none transition-all"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
        <select
          value={formData.state || ''}
          onChange={(e) => {
            // Reset LGA when state changes
            onChange({ ...formData, state: e.target.value, lga: '' })
          }}
          className="w-full px-4 py-3 bg-[#F5F2F2] rounded-lg focus:ring-2 focus:ring-[#541229] focus:border-transparent outline-none transition-all"
        >
          <option value="">Select your state</option>
          {states.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Local Government Area</label>
        <select
          value={formData.lga || ''}
          onChange={(e) => onChange({ ...formData, lga: e.target.value })}
          className="w-full px-4 py-3 bg-[#F5F2F2] rounded-lg focus:ring-2 focus:ring-[#541229] focus:border-transparent outline-none transition-all"
          disabled={!formData.state}
        >
          <option value="">Select your LGA</option>
          {lgas.map(lga => (
            <option key={lga} value={lga}>{lga}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
        <input
         type="text"
         value={formData.location || ''}
         onChange={(e) => onchange({ ...formData, location: e.target.value })}
         placeholder="Input your location e.g Ikeja" 
         className="w-full px-4 py-3 bg-[#F5F2F2] rounded-lg focus:ring-2 focus:ring-[#541229] focus:border-transparent outline-none transition-all" />
      </div>
    </div>
  )
}