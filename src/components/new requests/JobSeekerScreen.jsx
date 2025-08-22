'use client'

import React, { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { getAllJobs } from '@/api/jobs/requests'
import { Loader } from '../ui/Loader'
import { JobsList } from './jobs/JobsList'

const JobSeekerScreen = ({onShowApplicationClick}) => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);
        setError(null);
        const response = await getAllJobs(); 
        const jobsData = response?.data || [];
        // sort by createdAt: newest first
        jobsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setJobs(jobsData);
        setFilteredJobs(jobsData);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to load jobs');
        setJobs([]);
        setFilteredJobs([]);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  // Handle search input changes
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setFilteredJobs(jobs);
    } else {
      const filtered = jobs.filter(job =>
        (job.jobDetails?.title || '').toLowerCase().includes(term.toLowerCase())
      );
      setFilteredJobs(filtered);
    }
  };

  // Clear search input
  const clearSearch = () => {
    setSearchTerm('');
    setFilteredJobs(jobs);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div>
      <h2 className="mb-5 text-center text-lg">Job Seeker's Portal</h2>
      <div className='flex justify-center'>
        <button
        className="text-center py-3 px-5 text-white bg-[#2E8B57] cursor-pointer w-fit md:w-full rounded-lg text-sm mb-5"
        onClick={onShowApplicationClick}
      >
        Create CV
      </button>
      </div>
      <div className="relative">
        <Search className="h-5 w-5 text-green-900 absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          placeholder="Filter by Job Title"
          className="w-full pl-12 pr-4 py-4  border border-[#2E8B57] text-gray-900 placeholder-gray-500 outline-0"
          value={searchTerm}
          onChange={handleSearch}
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
        <JobsList filteredJobs={filteredJobs} />
      </div>
    </div>
  )
}

export default JobSeekerScreen