'use client'

import React, { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { getAllJobs } from '@/api/jobs/requests'

const JobSeekerScreen = ({onShowApplicationClick}) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);
        setError(null);
        const response = await getAllJobs();
        // Ensure we're getting the array of jobs from the response
        const jobsData = response?.data || [];
        setJobs(jobsData);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to load jobs');
        setJobs([]);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading jobs...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
   <div>
      <h2 className="mb-10 font-bold text-center text-xl">Job Seekers Screen</h2>
      <button
        className="text-center py-3 text-white bg-[#541229] cursor-pointer w-full rounded-md text-sm mb-5"
        onClick={onShowApplicationClick}
      >
        Create CV
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
      <div>
        {Array.isArray(jobs) && jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job._id} className="border p-4 my-2 rounded-lg">
              <p>{job.title}</p>
              <p className="text-sm text-gray-600">{job.company}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">No jobs found</div>
        )}
      </div>
    </div>
  )
}

export default JobSeekerScreen