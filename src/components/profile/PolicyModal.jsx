import React from 'react'

const PolicyModal = ({ title, children, onBack }) => (
  <div>
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    <div className="text-sm text-gray-700 max-h-72 overflow-y-auto mb-4">
      {children}
    </div>
    <div className='flex items-center justify-end'>
      <button onClick={onBack} className='bg-[#F0F2F5] px-4 py-2 rounded text-sm cursor-pointer'>Back</button>
    </div>
  </div>
)

export default PolicyModal
