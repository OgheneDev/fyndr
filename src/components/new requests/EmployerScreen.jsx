"use client";

import React, {useEffect, useState} from 'react';
import { Search, X } from 'lucide-react';
import { getAllCvs } from '@/api/cvs/requests'; 
import { Loader } from '../ui/Loader';
import { CvsList } from './cvs/CvsList';
 
const EmployerScreen = ({ onPostJobClick }) => {
  const [cvs, setCvs] = useState([]);
  const [filteredCvs, setFilteredCvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
 
  useEffect(() => { 
    async function fetchCvs() {
      try {
        setLoading(true);
        setError(null);
        const response = await getAllCvs();
        const cvsData = response?.data || [];
        // sort by createdAt: newest first
        cvsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setCvs(cvsData);
        setFilteredCvs(cvsData);
      } catch (error) {
        console.error('Error fetching CVs:', error);
        setError('Failed to load CVs');
        setCvs([]);
        setFilteredCvs([]);
      } finally {
        setLoading(false);
      }
    }
    fetchCvs();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === '') {
      setFilteredCvs(cvs)
    } else {
      const filtered = cvs.filter(cv =>
        (cv.workExperienceDetails?.jobTitle || '').toLowerCase().includes(term.toLowerCase())
      );
      setFilteredCvs(filtered);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFilteredCvs(cvs);
  };

  if (loading) {
    return <Loader />;
  }
  
  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div>
      <h2 className="mb-5 text-center text-lg">Employer Portal</h2>
      <div className="flex justify-center">
        <button
        className="text-center py-3 px-5 text-white bg-[#2E8B57] cursor-pointer w-fit md:w-full rounded-lg text-sm mb-5"
        onClick={onPostJobClick} // Call the callback to show EmployerForm
      >
        Post a Job
      </button>
      </div>
      <div className="relative">
        <Search className="h-5 w-5 text-green-900 absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          placeholder="Filter by Job Title"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full pl-12 pr-4 py-4  border border-[#2E8B57] text-gray-900 placeholder-gray-500 outline-0"
        />
        {searchTerm && (
        <button 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 cursor-pointer hover:bg-gray-200 rounded-full transition-colors"
          onClick={clearSearch}
          aria-label="Clear search"  
        >
          <X className="h-4 w-4 text-gray-400" />
        </button>
        )}
      </div>
      <div>
        <CvsList filteredCvs={filteredCvs} />
      </div>
    </div>
  );
};

export default EmployerScreen;