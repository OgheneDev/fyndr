'use client'
import React, { useEffect, useState } from 'react'
import { getRequests } from '@/api/requests/merchants/requests'
import ServiceOptions, { SERVICE_OPTIONS } from '@/components/open-requests/ServiceOptions'
import StatusOptions, { STATUS_OPTIONS } from '@/components/open-requests/StatusOptions'
import RequestsList from '@/components/open-requests/RequestsList'

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
    <div className="min-h-screen pb-7 pt-[72px] md:pb-0">
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
        <div className="flex flex-wrap gap-2 mb-8">
          <ServiceOptions value={service} onChange={setService} />
          <div className="relative">
            <select
              value={targetState}
              onChange={e => setTargetState(e.target.value)}
              className="inline-flex cursor-pointer items-center px-2 py-2 border border-gray-300 rounded-full bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <option value="">States</option>
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
          <StatusOptions value={status} onChange={setStatus} />
        </div>

        {/* Request Cards */}
        <RequestsList
          loading={loading}
          filteredRequests={filteredRequests}
          getServiceLabel={getServiceLabel}
        />
      </div>
    </div>
  )
}

export default OpenRequestsPage