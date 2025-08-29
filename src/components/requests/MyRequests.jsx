'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getRequests } from '@/api/requests/users/requests';
import { ToggleButtons } from './ToggleButtons';
import { RequestSection } from './RequestSection';
import { getPersonalCvs } from '@/api/cvs/requests';
import { CvsList } from './CvsList';

export default function ServiceRequests() {
  const [requests, setRequests] = useState([]);
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('completed');

  // Touch/swipe state
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  useEffect(() => {
    async function fetchRequests() {
      setLoading(true);
      try {
        const data = await getRequests();
        const sortedData = (data || []).sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setRequests(sortedData);
      } catch (err) {
        setError('Failed to load requests');
      } finally {
        setLoading(false);
      }
    }
    fetchRequests();
  }, []);

  useEffect(() => {
    async function fetchCvs() {
      try {
        setLoading(true);
        const response = await getPersonalCvs();
        const cvsData = response?.data || [];
        cvsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setCvs(cvsData);
      } catch (error) {
        console.error('Error fetching CVs:', error);
        setError('Failed to load CVs');
        setCvs([]);
      } finally {
        setLoading(false);
      }
    }
    fetchCvs();
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

    if (isLeftSwipe) {
      if (activeTab === 'completed') setActiveTab('pending');
      else if (activeTab === 'pending') setActiveTab('cvs');
    }
    if (isRightSwipe) {
      if (activeTab === 'cvs') setActiveTab('pending');
      else if (activeTab === 'pending') setActiveTab('completed');
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
          <button className="text-white w-full max-w-md mx-auto block px-6 mb-4 text-sm cursor-pointer bg-[#85CE5C] text-center py-3 rounded-lg">
            Create New Request
          </button>
        </Link>

        <ToggleButtons
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={['completed', 'pending', 'cvs']} // Updated to include 'cvs' tab
        />

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
              activeTab === 'pending' ? 'translate-x-0' : activeTab === 'completed' ? 'translate-x-[100vw]' : 'translate-x-[100vw]'
            }`}
          >
            <RequestSection loading={loading} requests={awaitingRequests} />
          </div>

          {/* CVs */}
          <div
            className={`absolute top-0 left-0 w-full max-w-[100vw] transition-transform duration-300 ease-in-out ${
              activeTab === 'cvs' ? 'translate-x-0' : 'translate-x-[100vw]'
            }`}
          >
            <CvsList loading={loading} cvs={cvs} />
          </div>
        </div>
      </div>
    </div>
  );
}