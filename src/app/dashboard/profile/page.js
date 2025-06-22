'use client'

import React, { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    city: '',
    state: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSaveChanges = () => {
    // Handle save logic here
    console.log('Saving changes:', formData)
  }

  return (
    <div className="min-h-screen p-6">
      <div className="">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        </div>

        {/* Profile Section */}
        <div className="px-8 py-8 text-center border-b border-gray-100">
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

        {/* Personal Information */}
        <div className="px-0 md:px-8 py-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h3>
          
          <div className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg  outline-none transition-all"
                placeholder="Enter your name"
              />
            </div>

            {/* Phone Number Field */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg  outline-none transition-all"
                placeholder="Enter your phone number"
              />
            </div>

            {/* City and State Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg  outline-none transition-all"
                  placeholder="Enter your city"
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg  outline-none transition-all"
                  placeholder="Enter your state"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="px-0 md:px-8 py-6 border-t border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Settings</h3>
          
          <div className="space-y-4">
            {/* Change Password */}
            <button className="w-full flex items-center cursor-pointer justify-between py-4 px-0 text-left hover:bg-gray-50 rounded-lg transition-colors group">
              <span className="text-gray-700 font-medium">Change Password</span>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
            </button>

            {/* Manage Account */}
            <button className="w-full flex items-center cursor-pointer justify-between py-4 px-0 text-left hover:bg-gray-50 rounded-lg transition-colors group">
              <span className="text-gray-700 font-medium">Manage Account</span>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="md:px-8 px-0 py-6 ">
          <div className="flex md:justify-end">
            <button
              onClick={handleSaveChanges}
              className="px-6 py-3 bg-purple-200 hover:bg-purple-300 cursor-pointer w-full md:w-fit text-purple-800 text-sm font-medium rounded-lg transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage