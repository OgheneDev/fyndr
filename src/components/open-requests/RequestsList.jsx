import React from 'react'
import Link from 'next/link'
import { CATEGORY_LABELS } from '@/data/data';
import Image from 'next/image';
import { formatRelativeTime } from '@/utils/dateUtils';

const CATEGORY_IMAGES = {
  "real-estate": "/images/real-estate.png",
  "car-hire": "/images/carHire.png",
  "car-parts": "/images/car-parts.png",
  "cleaning": "/images/cleaning.png",
  "automobile": "/images/automobile.png",
};

const RequestsList = ({ loading, filteredRequests, getServiceLabel }) => (
  <div className="space-y-4">
    {loading ? (
      Array.from({ length: 4 }).map((_, idx) => (
        <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className='bg-[#E5E7EB] p-3 rounded-2xl'>
                <div className="h-6 w-6 bg-gray-300 rounded" />
              </div>
              <div className="flex-1 min-w-0 space-y-2">
                <div className="h-5 w-48 bg-gray-200 rounded" />
                <div className="h-4 w-32 bg-gray-100 rounded" />
                <div className="h-4 w-40 bg-gray-100 rounded" />
                <div className="h-3 w-16 bg-gray-100 rounded" />
              </div>
            </div>
            <div className="flex-shrink-0 ml-4">
              <div className="h-12 w-32 bg-gray-200 rounded-full" />
            </div>
          </div>
        </div>
      ))
    ) : (
      <>
        {filteredRequests.map((request) => {
          // Truncate additionalDetails to 100 characters, handle undefined case
          const truncatedDetails = request.additionalDetails && typeof request.additionalDetails === 'string' 
            ? request.additionalDetails.length > 50 
              ? request.additionalDetails.slice(0, 50) + '...' 
              : request.additionalDetails
            : '';

          return (
            <div key={request._id} className="p-2 w-full">
              <div className='flex items-start gap-5'>
                <div className="flex-shrink-0">
                  <div className="w-13 h-13 bg-gray-100 rounded-md flex items-center justify-center">
                    <Image
                      src={CATEGORY_IMAGES[request.category] || '/images/default.png'}
                      alt={`${CATEGORY_LABELS[request.category]} icon`}
                      width={30}
                      height={30}
                      className="object-contain filter invert opacity-70"
                    />
                  </div>
                </div>
                <div className='flex-1'>
                  <article className='mb-1'>
                    <h4 className='font-semibold mb-1'>{request.title}</h4>
                    <p className='text-sm text-gray-500'>{request.targetState}</p>
                  </article>
                  <p className='text-sm text-gray-500 mb-8'>{truncatedDetails}</p>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm text-gray-500'>{formatRelativeTime(request.createdAt)}</span>
                    <Link href={`/dashboard/request?id=${request._id}`}>
                      <button className='bg-[#7C2D3E] cursor-pointer text-white px-5 py-2 rounded-full text-sm'>
                      More Details
                    </button>
                    </Link>
                  </div>
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