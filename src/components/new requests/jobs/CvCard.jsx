import React from "react";
import Image from "next/image";
import { User, CheckCircle, FileText } from "lucide-react";

export default function CvCard({ cv, selectedCvId, setSelectedCvId, router }) {
  return (
    <div
      onClick={() => setSelectedCvId(cv._id)}
      className={`group relative bg-white border-2 rounded-xl p-4 transition-all duration-300 hover:shadow-md cursor-pointer ${
        selectedCvId === cv._id 
          ? "border-[#85CE5C] bg-green-50 shadow-sm" 
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      {selectedCvId === cv._id && (
        <div className="absolute top-3 right-3">
          <div className="w-5 h-5 bg-[#85CE5C] rounded-full flex items-center justify-center">
            <CheckCircle className="w-3 h-3 text-white" />
          </div>
        </div>
      )}
      
      <div className="flex items-center gap-4">
        {cv.profileImage ? (
          <Image
            src={cv.profileImage}
            alt={`${cv.firstName} ${cv.lastName} avatar`}
            width={56}
            height={56}
            className="w-14 h-14 rounded-full object-cover shadow-sm"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <User size={24} className="text-gray-500" />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h5 className="font-semibold text-gray-900 truncate">
              {cv.firstName} {cv.lastName}
            </h5>
            {selectedCvId === cv._id && (
              <span className="text-xs bg-[#85CE5C] text-white px-2 py-0.5 rounded-full font-medium">
                Selected
              </span>
            )}
          </div>
          
          {cv.workExperienceDetails && cv.workExperienceDetails.length > 0 ? (
            <p className="text-sm text-gray-600 truncate">
              {cv.workExperienceDetails[0]?.jobTitle || "Professional"}
            </p>
          ) : (
            <p className="text-sm text-gray-500">Entry Level</p>
          )}
          
          <p className="text-xs text-gray-500 mt-1">{cv.state}, Nigeria</p>
        </div>
        
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            router.push(
              `/dashboard/new-request?category=employment&role=employer&cvId=${encodeURIComponent(
                cv._id
              )}`
            );
          }}
          className="text-xs font-semibold text-[#85CE5C] cursor-pointer hover:text-[#7BC04E] hover:underline transition-colors px-3 py-1.5 rounded-md hover:bg-green-50"
        >
          View CV
        </button>
      </div>
    </div>
  );
}