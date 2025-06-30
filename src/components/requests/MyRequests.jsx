'use client'

import { ChevronRight, Wrench } from 'lucide-react';
import Link from 'next/link';
import { getRequests } from '@/api/requests/users/requests';
import { useEffect, useState } from 'react';

export default function ServiceRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRequests() {
      setLoading(true);
      const data = await getRequests();
      setRequests(data || []);
      setLoading(false);
    }
    fetchRequests();
  }, []);

  // Categorize requests
  const newRequests = requests.filter(request => request.requestStatus === "pending");
  const oldRequests = requests.filter(request => request.requestStatus !== "pending");

  const RequestItem = ({ request }) => (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-gray-100 rounded-sm flex items-center justify-center">
            <Wrench className="w-5 h-5 text-[#121417]" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-medium text-[#121417] truncate">
            {request.title}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {/* Show relative time or fallback to createdAt */}
            {request.createdAt ? `Posted ${new Date(request.createdAt).toLocaleDateString()}` : ""}
          </p>
        </div>
      </div>
      <div className="flex-shrink-0 ml-4">
        <ChevronRight className="w-5 h-5 text-[#121417]" />
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

  const RequestSection = ({ title, requests }) => (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-[#121417] mb-4 px-4 sm:px-0">
        {title}
      </h2>
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#121417]">
            My requests
          </h1>
        </div>

        {/* Create Request Button */}
        <Link href={'/dashboard/new-request'}>
          <button className='text-white w-full md:w-fit px-7 mb-10 md:text-sm cursor-pointer bg-[#57132A] text-center py-5 rounded-md'>
            Create New Request
          </button>
        </Link>

        {/* New Requests Section */}
        <RequestSection title="New" requests={newRequests} />

        {/* Old Requests Section */}
        <RequestSection title="Old" requests={oldRequests} />
      </div>
    </div>
  );
}