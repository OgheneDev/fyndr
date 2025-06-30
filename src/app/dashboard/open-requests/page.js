'use client'
import React, { useEffect, useState } from 'react'
import { Home } from 'lucide-react'
import { getRequests } from '@/api/requests/merchants/requests'

// Service and status mappings
const SERVICE_OPTIONS = [
  { value: '', label: 'All Services' },
  { value: 'car-hire', label: 'Car Hire' },
  { value: 'cleaning', label: 'Cleaning' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'car-parts', label: 'Car Parts' },
  { value: 'automobile', label: 'Automobile' }
]
const STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'submitted', label: 'Submitted' },
  { value: 'closed', label: 'Closed' },
  { value: 'cancelled', label: 'Cancelled' }
]

const OpenRequestsPage = () => {
  const [requests, setRequests] = useState([])
  const [filteredRequests, setFilteredRequests] = useState([])
  const [service, setService] = useState('')
  const [status, setStatus] = useState('')
  const [targetState, setTargetState] = useState('')
  const [search, setSearch] = useState('')
  const [states, setStates] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch requests on mount
  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true)
      const data = await getRequests()
      setRequests(data || [])
      // Extract unique states for filter dropdown
      const uniqueStates = Array.from(new Set((data || []).map(r => r.targetState).filter(Boolean)))
      setStates(uniqueStates)
      setLoading(false)
    }
    fetchRequests()
  }, [])

  // Filter logic
  useEffect(() => {
    let filtered = [...requests]
    if (service) filtered = filtered.filter(r => r.category === service)
    if (status) filtered = filtered.filter(r => r.requestStatus === status)
    if (targetState) filtered = filtered.filter(r => r.targetState === targetState)
    if (search)
      filtered = filtered.filter(
        r =>
          (r.title && r.title.toLowerCase().includes(search.toLowerCase())) ||
          (r.additionalDetails && r.additionalDetails.toLowerCase().includes(search.toLowerCase()))
      )
    setFilteredRequests(filtered)
  }, [requests, service, status, targetState, search])

  // Helper to get service label
  const getServiceLabel = val => {
    const found = SERVICE_OPTIONS.find(opt => opt.value === val)
    return found ? found.label : val
  }

  return (
    <div className="min-h-screen pb-7 md:pb-0">
      {/* Header */}
      <div className="bg-white ">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-6">
            <h1 className="text-2xl font-semibold text-center md:text-start text-gray-900">Open Requests</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border outline-0 border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap gap-3 mb-8">
          {/* Service Filter */}
          <div className="relative">
            <select
              value={service}
              onChange={e => setService(e.target.value)}
              className="inline-flex cursor-pointer items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {SERVICE_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div className="relative">
            <select
              value={targetState}
              onChange={e => setTargetState(e.target.value)}
              className="inline-flex cursor-pointer items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <option value="">All States</option>
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="inline-flex items-center cursor-pointer px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {STATUS_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Request Cards */}
        <div className="space-y-6">
          {loading ? (
            // Skeleton Loader
            Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="bg-white rounded-lg md:p-6 animate-pulse">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className='bg-[#F0F2F5] p-4 rounded-md'>
                      <div className="h-5 w-5 bg-gray-300 rounded" />
                    </div>
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="h-5 w-32 bg-gray-200 rounded" />
                      <div className="h-4 w-24 bg-gray-100 rounded" />
                      <div className="h-4 w-40 bg-gray-100 rounded" />
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <div className="h-8 w-24 bg-gray-200 rounded-full" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <>
              {filteredRequests.map((request) => (
                <div key={request._id} className="bg-white rounded-lg md:p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      {/* House Icon */}
                      <div className='bg-[#F0F2F5] p-4 rounded-md'>
                        <Home size={20} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{getServiceLabel(request.category)}</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{request.targetState}</p>
                        <p className="text-sm text-gray-600">{request.additionalDetails || request.title}</p>
                      </div>
                    </div>

                    {/* More Details Button */}
                    <div className="flex-shrink-0 ml-4">
                      <button className="text-sm font-medium bg-[#F0F2F5] px-5 py-2 rounded-full">
                        More Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {filteredRequests.length === 0 && (
                <div className="text-center text-gray-500 py-10">No requests available.</div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default OpenRequestsPage