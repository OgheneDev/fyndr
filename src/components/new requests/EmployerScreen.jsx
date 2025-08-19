// EmployerScreen.jsx
"use client";

import React, {useEffect, useState} from 'react';
import { Search, X } from 'lucide-react';
import { getAppliedJobsByUser } from '@/api/jobs/requests';
 
const EmployerScreen = ({ employmentData, onChange, nigerianStates, isChecked, setIsChecked, onPostJobClick }) => {
  return (
    <div>
      <h2 className="mb-10 font-bold text-center text-xl">Employers Screen</h2>
      <button
        className="text-center py-3 text-white bg-[#541229] cursor-pointer w-full rounded-md text-sm mb-5"
        onClick={onPostJobClick} // Call the callback to show EmployerForm
      >
        Post a Job
      </button>
      <div className="relative">
        <Search className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          placeholder="Search by Job Title"
          className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 text-gray-900 placeholder-gray-500 outline-0"
        />
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 cursor-pointer hover:bg-gray-200 rounded-full transition-colors"
          aria-label="Clear search"
        >
          <X className="h-4 w-4 text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default EmployerScreen;