import Image from 'next/image';
import React, {useState} from 'react';
import { nigerianStates } from '@/data/nigerianStates';
import { PhoneInput } from '../general/PhoneInput';
export const MerchantDetailsForm = ({ formData, onChange, verificationMethod }) => {
  // Add preview URL state
  const [imagePreview, setImagePreview] = React.useState(null);

  // Get list of states and LGAs for the selected state
  const stateOptions = Object.keys(nigerianStates);
  const lgaOptions = formData.state ? nigerianStates[formData.state] : [];

  const SERVICE_OPTIONS = [
  { label: 'Car Hire', value: 'car-hire' },
  { label: 'Cleaning', value: 'cleaning' },
  { label: 'Real Estate', value: 'real-estate' },
  { label: 'Car Parts', value: 'car-parts' },
  { label: 'Automobile', value: 'automobile' },
];

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
        <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp Phone Number</label>
        <PhoneInput
          value={formData.whatsappNumber || ''}
          onChange={(value) => onChange({ ...formData, whatsappNumber: value })}
          placeholder="Enter your WhatsApp number"
        />
      </div>
      
      {verificationMethod === 'email' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <PhoneInput
            value={formData.number || ''}
            onChange={(value) => onChange({ ...formData, number: value })}
            placeholder="Enter your phone number"
          />
        </div>
      )}

      {verificationMethod === 'phone' && (
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
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
        <input
          type="text"
          value={formData.businessName || ''}
          onChange={(e) => onChange({ ...formData, businessName: e.target.value })}
          placeholder="Enter your business name"
          className="w-full px-4 py-3 bg-[#F5F2F2] rounded-lg focus:ring-2 focus:ring-[#541229] focus:border-transparent outline-none transition-all"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Business Address</label>
        <input
          type="text"
          value={formData.businessAddress || ''}
          onChange={(e) => onChange({ ...formData, businessAddress: e.target.value })}
          placeholder="Enter your business address"
          className="w-full px-4 py-3 bg-[#F5F2F2] rounded-lg focus:ring-2 focus:ring-[#541229] focus:border-transparent outline-none transition-all"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Business Location (e.g., Ikeja Axis)</label>
        <input
          type="text"
          value={formData.businessLocation || ''}
          onChange={(e) => onChange({ ...formData, businessLocation: e.target.value })}
          placeholder="Specify your business location"
          className="w-full px-4 py-3 bg-[#F5F2F2] rounded-lg focus:ring-2 focus:ring-[#541229] focus:border-transparent outline-none transition-all"
        />
      </div>
      
      {/* ID Verification Section */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Face Verification Image</h3>
        <p className="text-sm text-gray-600 mb-4">This helps us verify your identity.</p>
        
        {imagePreview ? (
          <div className="mb-4 relative w-32 h-32 mx-auto">
            <Image
              src={imagePreview}
              alt="Face verification preview"
              fill
              className="rounded-lg object-cover"
            />
            <button
              type="button"
              onClick={() => {
                setImagePreview(null);
                onChange({ ...formData, avatar: null });
              }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs"
            >
              ✕
            </button>
          </div>
        ) : (
          <div className="w-32 h-32 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-4">
            <span className="text-gray-400">No image</span>
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (e) => {
              const file = e.target.files[0];
              if (file) {
                const url = URL.createObjectURL(file);
                setImagePreview(url);
                onChange({ ...formData, avatar: file });
              }
            };
            input.click();
          }}
          className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          {imagePreview ? 'Change Image' : 'Upload Image'}
        </button>
      </div>
      
      {/* NIN Verification */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">NIN Verification</label>
        <p className="text-sm text-gray-600 mb-2">Input Validation number</p>
        <input
          type="text"
          value={formData.nin || ''}
          onChange={(e) => onChange({ ...formData, nin: e.target.value })}
          placeholder="Nin number"
          className="w-full px-4 py-3 bg-[#F5F2F2] rounded-lg focus:ring-2 focus:ring-[#541229] focus:border-transparent outline-none transition-all"
        />
      </div>
      
      {/* Services Offered */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Services Offered</label>
        <div className="space-y-2">
    {SERVICE_OPTIONS.map(({ label, value }) => (
      <label key={value} className="flex items-center">
        <input
          type="checkbox"
          checked={formData.servicesOffered?.includes(value) || false}
          onChange={(e) => {
            const currentServices = formData.servicesOffered || [];
            const updatedServices = e.target.checked
              ? [...currentServices, value]
              : currentServices.filter(s => s !== value);
            onChange({ ...formData, servicesOffered: updatedServices });
          }}
          className="w-4 h-4 text-[#541229] border-gray-300 rounded focus:ring-[#541229]"
        />
        <span className="ml-2 text-sm text-gray-700">{label}</span>
      </label>
    ))}
  </div>
        
        {/*<button
          type="button"
          onClick={() => {
            // Handle suggesting more services
            console.log('Suggest more services clicked');
          }}
          className="mt-2 text-sm text-[#541229] hover:text-[#541229] underline"
        >
          Suggest More Services
        </button>*/}
      </div>

      {/* State Select */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
        <select
          value={formData.state || ''}
          onChange={e => {
            const selectedState = e.target.value;
            onChange({
              ...formData,
              state: selectedState,
              lga: '' // Reset LGA when state changes
            });
          }}
          className="w-full px-4 py-3 bg-[#F5F2F2] rounded-lg focus:ring-2 focus:ring-[#541229] focus:border-transparent outline-none transition-all"
        >
          <option value="">Select a state</option>
          {stateOptions.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>

      {/* LGA Select */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">LGA</label>
        <select
          value={formData.lga || ''}
          onChange={e => onChange({ ...formData, lga: e.target.value })}
          className="w-full px-4 py-3 bg-[#F5F2F2] rounded-lg focus:ring-2 focus:ring-[#541229] focus:border-transparent outline-none transition-all"
          disabled={!formData.state}
        >
          <option value="">Select an LGA</option>
          {lgaOptions.map(lga => (
            <option key={lga} value={lga}>{lga}</option>
          ))}
        </select>
      </div>
    </div>
  );
};