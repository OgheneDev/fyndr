'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getRequests } from '@/api/requests/users/requests';
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
      const sortedData = (data || []).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setRequests(sortedData);
      setLoading(false);
    }
    fetchRequests();
  }, []);

  const liveRequests = requests.filter(
    (request) => request.transaction_status === 'completed'
  );
  const awaitingRequests = requests.filter(
    (request) => request.transaction_status === 'pending'
  );

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
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-full overflow-x-hidden">
        <div className="mb-8">
          <h1 className="text-2xl text-center sm:text-3xl font-bold text-[#121417]">
            My requests
          </h1>
        </div>

        <Link href="/dashboard">
          <button className="text-white w-full md:w-full px-10 mb-5 text-sm cursor-pointer bg-[#57132A] text-center py-3 rounded-lg">
            Create New Request
          </button>
        </Link>

        <ToggleButtons activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Sliding content container - Fixed overflow handling */}
        <div
          className="relative overflow-hidden touch-pan-x"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{ width: '100%', maxWidth: '100%' }}
        >
          {/* Completed Requests - main container */}
          <div
            className={`w-full transition-transform duration-300 ease-in-out ${
              activeTab === 'completed' ? 'translate-x-0' : '-translate-x-full'
            }`}
            style={{ width: '100%', maxWidth: '100%' }}
          >
            <div className="space-y-6">
              <RequestSection loading={loading} requests={liveRequests} />
            </div>
          </div>

          {/* Pending Requests - absolutely positioned */}
          <div
            className={`absolute top-0 left-0 w-full transition-transform duration-300 ease-in-out ${
              activeTab === 'pending' ? 'translate-x-0' : 'translate-x-full'
            }`}
            style={{ width: '100%', maxWidth: '100%' }}
          >
            <div className="space-y-6">
              <RequestSection loading={loading} requests={awaitingRequests} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}