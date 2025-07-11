'use client'
import Link from 'next/link';
import { getRequests } from '@/api/requests/users/requests';
import { useEffect, useState } from 'react';
import { ToggleButtons } from './ToggleButtons';
import { RequestSection } from './RequestSection';

export default function ServiceRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('completed');
  
  // Touch/swipe state
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  useEffect(() => {
    async function fetchRequests() {
      setLoading(true);
      const data = await getRequests();
      const sortedData = (data || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setRequests(sortedData);
      setLoading(false);
    }
    fetchRequests();
  }, []);

  const liveRequests = requests.filter(request => request.transaction_status === "completed");
  const awaitingRequests = requests.filter(request => request.transaction_status === "pending");

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && activeTab === 'completed') {
      setActiveTab('pending');
    }
    if (isRightSwipe && activeTab === 'pending') {
      setActiveTab('completed');
    }
  };

  return (
    <div className="min-h-screen md:max-w-4xl md:mx-auto">
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-8">
          <h1 className="text-2xl text-center sm:text-3xl font-bold text-[#121417]">
            My requests
          </h1>
        </div>

        <Link href={'/dashboard'}>
          <button className='text-white w-full md:w-full px-10 mb-5 text-sm cursor-pointer bg-[#57132A] text-center py-3 rounded-lg'>
            Create New Request
          </button>
        </Link>

        <ToggleButtons activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content container with proper height management */}
        <div 
          className="relative"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Live Requests */}
          <div 
            className={`w-full transition-opacity duration-300 ease-in-out ${
              activeTab === 'completed' ? 'opacity-100 block' : 'opacity-0 hidden'
            }`}
          >
            <RequestSection loading={loading} requests={liveRequests} />
          </div>
          
          {/* Awaiting Requests */}
          <div 
            className={`w-full transition-opacity duration-300 ease-in-out ${
              activeTab === 'pending' ? 'opacity-100 block' : 'opacity-0 hidden'
            }`}
          >
            <RequestSection requests={awaitingRequests} />
          </div>
        </div>
      </div>
    </div>
  );
}
