'use client'

import Link from 'next/link';
import { getRequests } from '@/api/requests/users/requests';
import { useEffect, useState } from 'react';
import { ToggleButtons } from './ToggleButtons';
import { RequestSection } from './RequestSection';

export default function ServiceRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('completed'); // Default to Live Requests

  useEffect(() => {
    async function fetchRequests() {
      setLoading(true);
      const data = await getRequests();
      // Sort requests by createdAt in descending order (newest first)
      const sortedData = (data || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setRequests(sortedData);
      setLoading(false);
    }
    fetchRequests();
  }, []);

  // Categorize requests based on transaction_status
  const liveRequests = requests.filter(request => request.transaction_status === "completed");
  const awaitingRequests = requests.filter(request => request.transaction_status === "pending");

  return (
    <div className="min-h-screen">
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-8">
          <h1 className="text-2xl text-center sm:text-3xl font-bold text-[#121417]">
            My requests
          </h1>
        </div>

        <Link href={'/dashboard/new-request'}>
          <button className='text-white w-full md:w-fit px-10 mb-5 text-sm cursor-pointer bg-[#57132A] text-center py-3 rounded-lg'>
            Create New Request
          </button>
        </Link>

        <ToggleButtons activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 'completed' && (
          <RequestSection loading={loading}  requests={liveRequests} />
        )}
        {activeTab === 'pending' && (
          <RequestSection  requests={awaitingRequests} />
        )}
      </div>
    </div>
  );
}