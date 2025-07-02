import React from 'react'
import Link from 'next/link'
import CategoryIcons from './CategoryIcons'

const RequestsList = ({ loading, filteredRequests, getServiceLabel }) => (
  <div className="space-y-6">
    {loading ? (
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
        {filteredRequests.map((request) => {
          const Icon = CategoryIcons[request.category] || CategoryIcons['default']
          return (
            <div key={request._id} className="bg-white rounded-lg md:p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className='bg-[#F0F2F5] p-4 rounded-md'>
                    <Icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{getServiceLabel(request.category)}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{request.targetState}</p>
                    <p className="text-sm text-gray-600">{request.additionalDetails || request.title}</p>
                  </div>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <Link href={`/dashboard/request?id=${request._id}`}>
                    <button className="text-sm font-medium cursor-pointer bg-[#F0F2F5] px-5 py-2 rounded-full">
                      More Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
        {filteredRequests.length === 0 && (
          <div className="text-center text-gray-500 py-10">No requests available.</div>
        )}
      </>
    )}
  </div>
)

export default RequestsList
