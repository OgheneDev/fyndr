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
    <div className="min-h-screen w-full max-w-[100vw] md:max-w-4xl mx-auto box-border">
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl text-center font-bold text-[#121417]">
            My Requests
          </h1>
        </div>

        <Link href="/dashboard">
          <button className="text-white w-full max-w-md mx-auto block px-6 mb-4 text-sm cursor-pointer bg-[#57132A] text-center py-2 rounded-lg">
            Create New Request
          </button>
        </Link>

        <ToggleButtons activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Sliding content container */}
        <div
          className="relative w-full max-w-[100vw] overflow-x-hidden box-border"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Completed Requests */}
          <div
            className={`w-full max-w-[100vw] transition-transform duration-300 ease-in-out ${
              activeTab === 'completed' ? 'translate-x-0' : '-translate-x-[100vw]'
            }`}
          >
            <RequestSection loading={loading} requests={liveRequests} />
          </div>

          {/* Pending Requests */}
          <div
            className={`absolute top-0 left-0 w-full max-w-[100vw] transition-transform duration-300 ease-in-out ${
              activeTab === 'pending' ? 'translate-x-0' : 'translate-x-[100vw]'
            }`}
          >
            <RequestSection loading={loading} requests={awaitingRequests} />
          </div>
        </div>
      </div>
    </div>
  );
}