import React from 'react'

const EditServicesLocationForm = ({
  servicesOffered,
  setServicesOffered,
  businessAddress,
  setBusinessAddress,
  businessLocation,
  setBusinessLocation,
  servicesLoading,
  onServiceChange,
  onSubmit,
  onCancel,
  SERVICE_OPTIONS
}) => (
  <form onSubmit={onSubmit}>
    <h3 className="text-lg font-semibold mb-4">Services Offered</h3>
    <div className='space-y-2 mb-6'>
      {SERVICE_OPTIONS.map(({ label, value }) => (
        <div key={value} className="flex items-center">
          <input
            type='checkbox'
            checked={servicesOffered.includes(value)}
            onChange={() => onServiceChange(value)}
            className="w-4 h-4 text-[#541229] border-gray-300 rounded focus:ring-[#541229]"
          />
          <span className="ml-2 text-sm text-gray-700">{label}</span>
        </div>
      ))}
    </div>
    <div className='flex flex-col gap-7'>
      <div className='space-y-2 flex flex-col'>
        <label className='text-sm'>Business Address</label>
        <input
          type="text"
          value={businessAddress}
          onChange={e => setBusinessAddress(e.target.value)}
          placeholder="Enter your business address"
          className="bg-[#DBD0C833] px-2 py-4 rounded-md outline-0 placeholder:text-sm"
        />
      </div>
      <div className='space-y-2 flex flex-col'>
        <label className='text-sm'>Business Location (e.g., Ikeja Axis)</label>
        <input
          type="text"
          value={businessLocation}
          onChange={e => setBusinessLocation(e.target.value)}
          placeholder="Specify your business location"
          className=" bg-[#DBD0C833] px-2 py-4 rounded-md outline-0 placeholder:text-sm"
        />
      </div>
    </div>
    <div className='flex items-center mt-4 justify-between'>
      <button type="button" onClick={onCancel} className='bg-[#F0F2F5] px-4 py-2 rounded text-sm cursor-pointer'>Cancel</button>
      <button
        type='submit'
        className="bg-blue-600 text-white px-4 py-2 rounded text-sm cursor-pointer"
        disabled={servicesLoading}
      >
        {servicesLoading ? 'Saving...' : 'Save'}
      </button>
    </div>
  </form>
)

export default EditServicesLocationForm
