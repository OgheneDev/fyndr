'use client'

import React, { useState } from 'react'
import { nigerianStates } from '@/data/nigerianStates'
import {
  PropertiesForm,
  CarHireForm,
  CleaningForm,
  CarPartsForm
} from './RequestForms'

const carTypes = ['Sedan', 'SUV', 'Hatchback', 'Convertible', 'Van', 'Truck']
const propertyTypes = ['Apartment', 'Detached', 'Semi-Detached', 'Terrace', 'Bungalow', 'Duplex', 'Mansion']
const cleaningTypes = ['Regular', 'Post Construction']
const carMakes = ['Toyota', 'Honda', 'Ford', 'Nissan', 'Hyundai', 'Kia', 'Mercedes', 'BMW', 'Lexus']
const carModels = {
  Toyota: ['Corolla', 'Camry', 'RAV4', 'Highlander'],
  Honda: ['Civic', 'Accord', 'CR-V'],
  Ford: ['Focus', 'Fusion', 'Escape'],
  Nissan: ['Altima', 'Sentra', 'Rogue'],
  Hyundai: ['Elantra', 'Sonata', 'Tucson'],
  Kia: ['Rio', 'Sportage', 'Sorento'],
  Mercedes: ['C-Class', 'E-Class', 'GLA'],
  BMW: ['3 Series', '5 Series', 'X3'],
  Lexus: ['RX', 'ES', 'GX']
}
const carYears = Array.from({ length: 25 }, (_, i) => `${2000 + i}`)

const NewRequestPage = () => {
  const [activeTab, setActiveTab] = useState('Properties')
  const [formData, setFormData] = useState({
    leaseOrBuy: 'Lease',
    currentLocation: '',
    targetLocation: '',
    role: 'Landlord or Agent'
  })
  const [carHireData, setCarHireData] = useState({
    state: '',
    typeOfCar: '',
    pickupLocation: '',
    duration: '',
    airport: '',
    travel: '',
    additionalDetails: ''
  })
  const [cleaningData, setCleaningData] = useState({
    state: '',
    propertyLocation: '',
    propertyType: '',
    numberOfRooms: '',
    regularOrPostConstructionCleaning: '',
    additionalDetails: '',
  })
  const [carPartsData, setCarPartsData] = useState({
    currentState: '',
    currentLocation: '',
    desiredSourcingLocation: '',
    make: '',
    model: '',
    year: '',
    description: '',
    attachment: ''
  })

  const tabs = ['Properties', 'Car Hire', 'Cleaning', 'Car Parts']

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }
  const handleCarHireChange = (field, value) => {
    setCarHireData(prev => ({
      ...prev,
      [field]: value
    }))
  }
  const handleCleaningChange = (field, value) => {
    setCleaningData(prev => ({
      ...prev,
      [field]: value
    }))
  }
  const handleCarPartsChange = (field, value) => {
    setCarPartsData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white py-8 lg:px-8">
        <div className="md:max-w-4xl md:mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-2 md:mb-5">
            Post a Request
          </h1>

          {/* Tabs */}
          <div className="flex flex-wrap gap-1 md:gap-5 px-1 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={` px-2 md:px-0 py-2 text-[12px] cursor-pointer border-b-2 transition-all duration-200 ${
                  activeTab === tab
                    ? ' text-gray-900'
                    : 'border-[#E5E8EB] text-[#637587]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className='px-5'>
            {/* Form Content */}
            <div className="bg-white">
              {activeTab === 'Properties' && (
                <PropertiesForm
                  formData={formData}
                  onChange={handleInputChange}
                  nigerianStates={nigerianStates}
                />
              )}
              {activeTab === 'Car Hire' && (
                <CarHireForm
                  carHireData={carHireData}
                  onChange={handleCarHireChange}
                  nigerianStates={nigerianStates}
                  carTypes={carTypes}
                />
              )}
              {activeTab === 'Cleaning' && (
                <CleaningForm
                  cleaningData={cleaningData}
                  onChange={handleCleaningChange}
                  nigerianStates={nigerianStates}
                  propertyTypes={propertyTypes}
                  cleaningTypes={cleaningTypes}
                />
              )}
              {activeTab === 'Car Parts' && (
                <CarPartsForm
                  carPartsData={carPartsData}
                  onChange={handleCarPartsChange}
                  nigerianStates={nigerianStates}
                  carMakes={carMakes}
                  carModels={carModels}
                  carYears={carYears}
                />
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-end">
              <button className="w-full sm:w-auto px-8 py-3 bg-[#541229] text-sm cursor-pointer text-white rounded-lg ">
                Create New Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewRequestPage