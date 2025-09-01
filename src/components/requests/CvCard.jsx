'use client';
import Image from 'next/image';
import { User, EllipsisVertical, Eye, Edit, Trash2 } from 'lucide-react';

export const CvCard = ({
  cv,
  isDeleting,
  activeDropdown,
  handleDropdownToggle,
  handleViewCv,
  handleEditCv,
  handleDeleteCv,
}) => {
  return (
    <div
      className="group bg-white border border-[#85CE5C] pr-6 rounded-4xl flex gap-5 md:gap-0 flex-row items-center justify-between transition-all duration-300 hover:shadow-lg"
    >
      <div className="flex items-center space-x-4">
        {cv.profileImage ? (
          <Image
            src={cv.profileImage}
            alt={`${cv.firstName} ${cv.lastName} avatar`}
            width={64}
            height={64}
            className="w-16 h-16 rounded-full object-cover shadow-md"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
            <User size={30} className="text-gray-500" />
          </div>
        )}
        <div>
          <div className="flex gap-1 text-[12px] md:text-sm text-gray-900">
            <p>{cv.firstName}</p>
            <p>{cv.lastName}</p>
          </div>
          {cv.workExperienceDetails && cv.workExperienceDetails.length > 0 ? (
            <div className="text-[10px] md:text-[12px] text-gray-900">
              <div className="truncate max-w-[180px] md:max-w-[300px]">
                {cv.workExperienceDetails[0]?.jobTitle || "Professional"}
              </div>
            </div>
          ) : (
            <div className="text-[10px] md:text-[12px] text-gray-900">
              No work experience.
            </div>
          )}
          <div>
            <p className="text-[10px] md:text-[12px]">{cv.state}, Nigeria</p>
          </div>
        </div>
      </div>
      <div className="relative">
        <button
          type="button"
          onClick={(e) => handleDropdownToggle(cv._id, e)}
          className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors duration-200"
          disabled={isDeleting === cv._id}
        >
          {isDeleting === cv._id ? (
            <div className="animate-spin h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full"></div>
          ) : (
            <EllipsisVertical size={18} className="text-gray-600" />
          )}
        </button>
        {activeDropdown === cv._id && (
          <div className="absolute right-0 top-full mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-500">
            <button
              onClick={(e) => handleViewCv(cv._id, e)}
              className="w-full px-4 py-2 text-left text-sm cursor-pointer text-gray-700 hover:bg-gray-50 flex items-center gap-2 rounded-t-lg"
            >
              <Eye size={14} />
              View CV
            </button>
            <button
              onClick={(e) => handleEditCv(cv, e)}
              className="w-full px-4 py-2 text-left text-sm cursor-pointer text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              <Edit size={14} />
              Edit CV
            </button>
            <button
              onClick={(e) => handleDeleteCv(cv._id, e)}
              className="w-full px-4 py-2 text-left text-sm cursor-pointer text-red-600 hover:bg-red-50 flex items-center gap-2 rounded-b-lg"
            >
              <Trash2 size={14} />
              Delete CV
            </button>
          </div>
        )}
      </div>
    </div>
  );
};