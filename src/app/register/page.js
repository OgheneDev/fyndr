"use client"

import { useState } from "react";
import { RegistrationForm } from "@/components/register page/RegistrationForm";
import { Store, User } from "lucide-react";

const RegistrationPage = () => {
  const [selectedType, setSelectedType] = useState(null);

  const handleTypeSelect = (type) => {
    setSelectedType(type);
  };

  if (selectedType) {
    return (
      <div className="min-h-screen py-8 px-4 lg:px-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Join Fyndr</h1>
          </div>
          <RegistrationForm userType={selectedType} />
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
          <p className="text-sm text-[gray-600]">Choose how you&apos;d like to get started</p>
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