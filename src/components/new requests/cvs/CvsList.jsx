import { Eye, User, Building, ChevronRight } from 'lucide-react';

export const CvsList = ({filteredCvs}) => (
  <div className='flex flex-col gap-4 mt-4'>
    {Array.isArray(filteredCvs) && filteredCvs.length > 0 ? (
      filteredCvs.map((cv) => (
        <div 
          key={cv._id} 
          className="group bg-white border border-gray-200  px-6 py-4 rounded-2xl flex gap-5 md:gap-0 flex-col md:flex-row md:items-center justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
        >
          <div className='flex md:items-center space-x-4'>
            {/* Avatar */}
            <div className="w-12 h-12 bg-gradient-to-br from-[#541229] to-[#7a1b3d] rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md">
              {cv.firstName[0]}{cv.lastName[0]}
            </div>
            
            {/* Content */}
            <div className='space-y-1'>
              <div className=''>
                <div className='flex gap-1 font-semibold text-gray-900'>
                  <p>{cv.firstName}</p>
                  <p>{cv.lastName}</p>
                </div>
              </div>
              
              {/*
                Conditionally render work experience: if workExperienceDetails exists and
                has jobTitle or company show them, otherwise show a fallback message.
              */}
              {cv.workExperienceDetails && (cv.workExperienceDetails.jobTitle || cv.workExperienceDetails.company) ? (
                <>
                  <div className=' text-sm text-gray-600'>
                    {cv.workExperienceDetails.jobTitle && (
                      <p className="font-medium text-[#541229]">{cv.workExperienceDetails.jobTitle}</p>
                    )}
                  </div>
                  <div className='flex items-center gap-2 text-sm text-gray-500'>
                    {cv.workExperienceDetails.company && <p>at {cv.workExperienceDetails.company}</p>}
                  </div>
                </>
              ) : (
                <div className='text-sm text-gray-500 italic'>No work experience listed</div>
              )}
            </div>
          </div>
          
          {/* Action Button */}
          <button className="flex items-center justify-center md:justify-start cursor-pointer gap-2 px-4 md:py-2 py-3 text-sm font-medium text-[#541229] bg-[#54122915] hover:bg-[#54122925] rounded-lg transition-colors duration-200 group-hover:shadow-sm">
            <Eye className="w-4 h-4" />
            View CV
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
          </button>
        </div>
      ))
    ) : (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <User className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-500 text-lg font-medium mb-2">No CVs found</p>
        <p className="text-gray-400 text-sm">Try adjusting your search criteria</p>
      </div>
    )}
  </div>
);