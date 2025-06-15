"use client"

import { useState } from "react";
import { RegistrationForm } from "@/components/register page/RegistrationForm";
import { Store, User } from "lucide-react";

const RegistrationPage = () => {
  const [selectedType, setSelectedType] = useState('user');
  const [showForm, setShowForm] = useState(false);

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setShowForm(true);
  };

  const handleBack = () => {
    setShowForm(false);
  };

  if (showForm) {
    return (
      <div className="min-h-screen py-8 px-4 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Join Fyndr</h1>
          </div>

          {/* Type Switcher for Desktop */}
          <div className="hidden lg:flex justify-center mb-12 ">
            <div className="flex bg-[#F5F2F2] rounded-full p-1 shadow-sm w-full">
              <button
                onClick={() => setSelectedType('user')}
                className={`flex items-center justify-center cursor-pointer text-sm w-1/2 px-6 py-2 rounded-full transition-colors ${
                  selectedType === 'user' 
                    ? 'bg-white text-[#171214]' 
                    : 'text-[#856670]'
                }`}
              >
                User
              </button>
              <button
                onClick={() => setSelectedType('merchant')}
                className={`flex items-center w-1/2 px-6 py-2 text-sm cursor-pointer justify-center rounded-full transition-colors ${
                  selectedType === 'merchant' 
                    ? 'bg-white text-[#171214]' 
                    : 'text-[#856670]'
                }`}
              >
                Merchant
              </button>
            </div>
          </div>
          
          {/* Desktop: Side by side layout */}
          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12">
            <div className={`${selectedType === 'user' ? 'opacity-100' : 'opacity-30'} transition-opacity`}>
              {selectedType === 'user' ? (
                <RegistrationForm userType="user" onBack={handleBack} />
              ) : (
                <div className="bg-white rounded-xl p-8 shadow-sm border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-500">User Registration</h3>
                    <p className="text-sm text-gray-400 mt-2">Switch to user to register as a customer</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className={`${selectedType === 'merchant' ? 'opacity-100' : 'opacity-30'} transition-opacity`}>
              {selectedType === 'merchant' ? (
                <RegistrationForm userType="merchant" onBack={handleBack} />
              ) : (
                <div className="bg-white rounded-xl p-8 shadow-sm border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <Store className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-500">Merchant Registration</h3>
                    <p className="text-sm text-gray-400 mt-2">Switch to merchant to register your business</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile: Single column */}
          <div className="lg:hidden">
            <RegistrationForm userType={selectedType} onBack={handleBack} />
          </div>

          

          {/* Type Switcher for Mobile */}
          <div className="lg:hidden fixed bottom-4 left-4 right-4">
            <div className="flex bg-[#F5F2F2] rounded-full p-1 shadow-lg">
              <button
                onClick={() => setSelectedType('user')}
                className={`flex-1 flex items-center justify-center py-3 rounded-full transition-colors ${
                  selectedType === 'user' 
                    ? 'bg-white text-[#171214]' 
                    : 'text-[#856670]'
                }`}
              >
                <User className="w-4 h-4 mr-2" />
                User
              </button>
              <button
                onClick={() => setSelectedType('merchant')}
                className={`flex-1 flex items-center justify-center py-3 rounded-full transition-colors ${
                  selectedType === 'merchant' 
                    ? 'bg-white text-[#171214]' 
                    : 'text-[#856670]'
                }`}
              >
                <Store className="w-4 h-4 mr-2" />
                Merchant
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Initial Selection Screen
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Join Fyndr</h1>
          <p className="text-sm text-[gray-600]">Choose how you'd like to get started</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <button
            onClick={() => handleTypeSelect('user')}
            className="bg-white p-8 rounded-xl shadow-sm border-2 cursor-pointer border-transparent hover:border-purple-200 hover:shadow-md transition-all group"
          >
            <User className="w-16 h-16 text-[#541229] mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold mb-2">Join as User</h3>
            <p className="text-[gray-600] text-sm">Compare prices and find the best deals</p>
          </button>

          <button
            onClick={() => handleTypeSelect('merchant')}
            className="bg-white p-8 rounded-xl shadow-sm border-2 border-transparent cursor-pointer hover:border-purple-200 hover:shadow-md transition-all group"
          >
            <Store className="w-16 h-16 text-[#541229] mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold mb-2">Join as Merchant</h3>
            <p className="text-[gray-600] text-sm">List your services and reach more customers</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;