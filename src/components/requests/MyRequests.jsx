'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getRequests } from '@/api/requests/users/requests';
import { ToggleButtons } from './ToggleButtons';
import { RequestSection } from './RequestSection';
import { CvsList } from './CvsList';

export default function ServiceRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('completed');

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

  const liveRequests = requests.filter(
    (request) => request.transaction_status === 'completed'
  );
  const awaitingRequests = requests.filter(
    (request) => request.transaction_status === 'pending'
  );

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
          tabs={['completed', 'pending', 'cvs']}
        />

        <div className="relative w-full max-w-[100vw] box-border">
          {activeTab === 'completed' && (
            <RequestSection loading={loading} requests={liveRequests} />
          )}
          {activeTab === 'pending' && (
            <RequestSection loading={loading} requests={awaitingRequests} />
          )}
          {activeTab === 'cvs' && <CvsList />}
        </div>
      </div>
    </div>
  );
}