'use client'

import React, { useState } from 'react'
import { ChevronRight, ArrowLeft } from 'lucide-react'
import Image from 'next/image'

const ProfilePage = () => {
  const [activeSetting, setActiveSetting] = useState(null);

  const handleBack = () => setActiveSetting(null);

  const SERVICE_OPTIONS = [
    { label: 'Car Hire', value: 'car-hire' },
    { label: 'Cleaning', value: 'cleaning' },
    { label: 'Real Estate', value: 'real-estate' },
    { label: 'Car Parts', value: 'car-parts' },
    { label: 'Automobile', value: 'automobile' },
  ];

  return (
    <div className="min-h-screen p-6 md:max-w-4xl md:mx-auto">
      <div className="">
        {/* Header */}
        <div className="px-8 py-6  ">
          <h1 className="text-2xl font-bold text-center text-gray-900">Profile</h1>
        </div>

        {/* Profile Section */}
        <div className="px-8 py-8 text-center ">
          <div className=" flex items-center justify-center overflow-hidden">
              <Image
                src={'/images/sofia.png'}
                alt='profile picture'
                width={100}
                height={100}
                className='rounded-full mb-3'
              />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-1">Sophia Clark</h2>
          <p className="text-gray-500 text-sm">Member since 2021</p>
        </div>

        {/* Account Settings */}
        <div className="px-0 md:px-8 py-6">
          {!activeSetting && (
          <>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Settings</h3>
            <div className="space-y-4">
              {/* Change Password */}
              <button
                className="w-full flex items-center cursor-pointer justify-between py-4 px-0 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                onClick={() => setActiveSetting('password')}
              >
                <span className="text-gray-700 font-medium">Change Password</span>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
              </button>

              {/* Edit Services & Location */}
              <button
                className="w-full flex items-center cursor-pointer justify-between py-4 px-0 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                onClick={() => setActiveSetting('services')}
              >
                <span className="text-gray-700 font-medium">Edit Services & Location</span>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
              </button>

              {/* Privacy Policy */}
              <button
                className="w-full flex items-center cursor-pointer justify-between py-4 px-0 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                onClick={() => setActiveSetting('privacy')}
              >
                <span className="text-gray-700 font-medium">Privacy Policy</span>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
              </button>

              {/* Terms and conditions */}
              <button
                className="w-full flex items-center cursor-pointer justify-between py-4 px-0 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                onClick={() => setActiveSetting('terms')}
              >
                <span className="text-gray-700 font-medium">Terms and conditions</span>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
              </button>
            </div>
          </>
        )}

        {/* Change Password UI */}
        {activeSetting === 'password' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Change Password</h3>
            {/* Replace with your password change form */}
            <div className='flex flex-col gap-3'>
            <input type="password" placeholder="New Password" className="bg-[#DBD0C833] px-2 py-4 rounded-md outline-0 placeholder:text-sm" />
            <input type="password" placeholder="Confirm Password" className=" bg-[#DBD0C833] px-2 py-4 rounded-md outline-0 placeholder:text-sm" />
            </div>
            <div className='flex items-center mt-4 justify-between'>
              <button onClick={handleBack} className='bg-[#F0F2F5] px-4 py-2 rounded text-sm cursor-pointer'>Cancel</button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm cursor-pointer">Save</button>
            </div>
          </div>
        )}

        {/* Edit Services & Location UI */}
        {activeSetting === 'services' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Services Offered</h3>
            <div className='space-y-2 mb-6'>
              {SERVICE_OPTIONS.map(({ label, value }) => (
                <div key={value} className="flex items-center">
                  <input
                   type='checkbox'
                   className="w-4 h-4 text-[#541229] border-gray-300 rounded focus:ring-[#541229]"
                />
                <span className="ml-2 text-sm text-gray-700">{label}</span>
                </div>
              ))}
            </div>
            <div className='flex flex-col gap-7'>
            <div className='space-y-2 flex flex-col'>
              <label className='text-sm'>Business Address</label>
              <input type="text" placeholder="Enter your business address" className="bg-[#DBD0C833] px-2 py-4 rounded-md outline-0 placeholder:text-sm" />
            </div>
            <div className='space-y-2 flex flex-col'>
              <label className='text-sm'>Business Location (e.g., Ikeja Axis)</label>
              <input type="text" placeholder="Specify your business location" className=" bg-[#DBD0C833] px-2 py-4 rounded-md outline-0 placeholder:text-sm" />
            </div>
            </div>
            <div className='flex items-center mt-4 justify-between'>
              <button onClick={handleBack} className='bg-[#F0F2F5] px-4 py-2 rounded text-sm cursor-pointer'>Cancel</button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm cursor-pointer">Save</button>
            </div>
          </div>
        )}

        {/* Privacy Policy UI */}
        {activeSetting === 'privacy' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Privacy Policy</h3>
            <div className="text-sm text-gray-700 max-h-72 overflow-y-auto mb-4">
              {/* Replace with your actual privacy policy content */}
              <p>
                Your privacy is important to us. We do not share your personal information with third parties except as necessary to provide our services or as required by law.
              </p>
              <p className="mt-2">
                Please review our full privacy policy for more details about how your data is collected, used, and protected.
              </p>
            </div>
            <div className='flex items-center justify-end'>
              <button onClick={handleBack} className='bg-[#F0F2F5] px-4 py-2 rounded text-sm cursor-pointer'>Back</button>
            </div>
          </div>
        )}

        {/* Terms and Conditions UI */}
        {activeSetting === 'terms' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Terms and Conditions</h3>
            <div className=" text-sm text-gray-700 max-h-72 overflow-y-auto mb-4">
              {/* Replace with your actual terms and conditions content */}
              <p>
                By using our platform, you agree to abide by all applicable rules and regulations.
              </p>
              <p className="mt-2">
                Please review our full terms and conditions for more information about your rights and responsibilities.
              </p>
            </div>
            <div className='flex items-center justify-end'>
              <button onClick={handleBack} className='bg-[#F0F2F5] px-4 py-2 rounded text-sm cursor-pointer'>Back</button>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage