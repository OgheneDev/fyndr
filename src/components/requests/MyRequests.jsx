'use client'

import { ChevronRight, Wrench } from 'lucide-react';
import Link from 'next/link';
import { getRequests } from '@/api/requests/users/requests';
import { useEffect, useState } from 'react';
import { ToggleButtons } from './ToggleButtons';
import { formatRelativeTime } from '@/utils/dateUtils';

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

  const RequestItem = ({ request }) => (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="w-13 h-13 bg-gray-100 rounded-md flex items-center justify-center">
            <Wrench className="w-5 h-5 text-[#121417]" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-medium text-[#121417] truncate">
            {request.title}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {request.category}  {formatRelativeTime(request.createdAt)}
          </p>
        </div>
      </div>
      <div className="flex-shrink-0 ml-4">
        <ChevronRight className="w-7 h-7 text-[#121417]" />
      </div>
    </div>
  );

  const SkeletonItem = () => (
    <div className="flex items-center justify-between p-4 animate-pulse">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-gray-200 rounded-sm" />
        <div>
          <div className="h-4 bg-gray-200 rounded w-32 mb-2" />
          <div className="h-3 bg-gray-100 rounded w-20" />
        </div>
      </div>
      <div className="w-5 h-5 bg-gray-200 rounded" />
    </div>
  );

  const RequestSection = ({ requests }) => (
    <div className="mb-8">
      <div className="overflow-hidden">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <SkeletonItem key={i} />)
          : requests.length > 0
            ? requests.map((request) => (
                <Link
                  key={request._id}
                  href={`/dashboard/request?id=${request._id}`}
                  className="block"
                  passHref
                >
                  <RequestItem request={request} />
                </Link>
              ))
            : <div className="text-gray-400 px-4 py-6">No requests found.</div>
        }
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-8">
          <h1 className="text-2xl text-center sm:text-3xl font-bold text-[#121417]">
            My requests
          </h1>
        </div>

        <Link href={'/dashboard/new-request'}>
          <button className='text-white w-full md:w-fit px-10 mb-5 md:text-sm cursor-pointer bg-[#57132A] text-center py-4 rounded-md'>
            Create New Request
          </button>
        </Link>

        <ToggleButtons activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 'completed' && (
          <RequestSection title="Live Requests" requests={liveRequests} />
        )}
        {activeTab === 'pending' && (
          <RequestSection title="Awaiting Payment" requests={awaitingRequests} />
        )}
      </div>
    </div>
  );
}