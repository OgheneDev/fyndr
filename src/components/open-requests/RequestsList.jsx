import React from 'react';
import Link from 'next/link';
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

const RequestsList = ({ loading, filteredRequests, getServiceLabel }) => {
  // Sort requests by createdAt in descending order (newest first)
  const sortedRequests = [...filteredRequests].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="space-y-5">
      {loading ? (
        Array.from({ length: 20 }).map((_, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-4 animate-pulse border border-gray-100"
          >
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 sm:w-13 sm:h-13 bg-gray-100 rounded-md flex items-center justify-center">
                  <div className="h-6 w-6 bg-gray-200 rounded" />
                </div>
              </div>
              <div className="flex-1 min-w-0 space-y-2">
                <div className="h-5 w-3/4 sm:w-48 bg-gray-200 rounded" />
                <div className="h-4 w-1/2 sm:w-32 bg-gray-200 rounded" />
                <div className="h-4 w-5/6 sm:w-64 bg-gray-200 rounded" />
                <div className="flex justify-between items-center mt-4">
                  <div className="h-4 w-1/3 sm:w-24 bg-gray-200 rounded" />
                  <div className="h-8 w-24 sm:w-32 bg-gray-200 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <>
          {sortedRequests.map((request) => {
            // Truncate additionalDetails to 50 characters, handle undefined case
            const truncatedDetails = request.additionalDetails && typeof request.additionalDetails === 'string'
              ? request.additionalDetails.length > 20
                ? request.additionalDetails.slice(0, 20) + '...'
                : request.additionalDetails
              : '';

            return (
              <div
                key={request._id}
                className="bg-white rounded-2xl p-4 border border-gray-100"
              >
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 sm:w-13 sm:h-13 bg-gray-100 rounded-md flex items-center justify-center">
                      <Image
                        src={CATEGORY_IMAGES[request.category] || '/images/default.png'}
                        alt={`${CATEGORY_LABELS[request.category]} icon`}
                        width={30}
                        height={30}
                        className="object-contain filter invert"
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <article className="mb-1">
                      <h4 className="font-semibold mb-1 text-sm">{request.title}</h4>
                      <p className="text-[12px] text-gray-500">{request.targetState} {request.targetAxis}</p>
                    </article>
                    <p className="text-[12px] text-gray-500 mb-4 sm:mb-6 break-words">{truncatedDetails}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-[12px] text-gray-500">{formatRelativeTime(request.createdAt)}</span>
                      <Link href={`/dashboard/request?id=${request._id}`}>
                        <button className="bg-[#85CE5C] cursor-pointer text-white px-4 sm:px-5 py-2 rounded-full text-sm">
                          More Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {sortedRequests.length === 0 && (
            <div className="text-center text-gray-500 py-10">No requests available.</div>
          )}
        </>
      )}
    </div>
  );
};

export default RequestsList;