import { useState } from "react";
import Image from "next/image";

export const ApplicationCard = ({ application, index, router }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="group relative bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-200">
      {/* Applicant Info */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {application.cv?.profileImage ? (
            <Image
              src={application.cv.profileImage}
              width={45}
              height={45}
              alt="Applicant Image"
              className="rounded-full w-12 h-12 object-cover"
            />
          ) : (
            <div className="w-12 h-12 bg-gradient-to-br from-[#85CE5C] to-black rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-lg">
            {`${application.cv?.firstName?.[0] || 'U'}${application.cv?.lastName?.[0] || 'A'}`}
          </div>
          )}

          <div>
            <h3 className="font-semibold text-gray-900 text-lg">
              {application.cv?.firstName} {application.cv?.lastName}
            </h3>
            <p className="text-sm text-gray-600 font-medium">
              {application.cv?.workExperienceDetails?.[0]?.jobTitle || 'Position not specified'}
            </p>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      {application.cv?.email && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-sm text-gray-700">{application.cv.email}</span>
          </div>
        </div>
      )}

      {/* Proposal Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-gray-700 flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Cover Letter</span>
          </h4>
          {application.proposal && application.proposal.length > 150 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              {isExpanded ? 'Show Less' : 'Read More'}
            </button>
          )}
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-[#85CE5C]">
          <p className="text-sm text-gray-700 leading-relaxed">
            {application.proposal || "No cover letter provided"}
          </p>
          {!isExpanded && application.proposal && application.proposal.length > 150 && (
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none" />
          )}
        </div>
      </div>

      {/* Application Date */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Applied on {new Date(application.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </span>
          <span className="text-gray-400">
            {new Date(application.createdAt).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4">
        <button
        onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            router.push(
              `/dashboard/new-request?category=employment&role=employer&cvId=${encodeURIComponent(
                application.cv._id
              )}`
            );
        }}
        className="bg-[#85CE5C] w-full cursor-pointer text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200">
          View CV
        </button>
      </div>
    </div>
  );
};