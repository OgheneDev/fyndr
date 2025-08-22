import { User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export const CvsList = ({filteredCvs}) => {
  const router = useRouter();
  return (
    <div className='flex flex-col gap-4 mt-6'>
      {Array.isArray(filteredCvs) && filteredCvs.length > 0 ? (
        filteredCvs.map((cv) => (
          <div 
            key={cv._id} 
            className="group bg-white border border-[#2E8B57] pr-6 rounded-4xl flex gap-5 md:gap-0 flex-row items-center justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
          >
            <div className='flex items-center space-x-4'>
              {/* Avatar */}
              {cv.user?.avatar ? (
                <Image
                  src={cv.user.avatar}
                  alt={`${cv.firstName} ${cv.lastName} avatar`}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover shadow-md"
                />
              ) : (
                <div className="w-16 h-16 bg-gradient-to-br from-[#541229] to-[#7a1b3d] rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md">
                  {cv.firstName[0]}{cv.lastName[0]}
                </div>
              )}
              
              {/* Content */}
              <div className=''>
                <div className=''>
                  <div className='flex gap-1 text-sm text-gray-900'>
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
                    <div className=' text-[12px] text-gray-900'>
                      {cv.workExperienceDetails.jobTitle && (
                        <p className=" text-gray-900">{cv.workExperienceDetails.jobTitle}</p>
                      )}
                    </div> 
                  </>
                ) : (
                  <div className='text-[12px] text-gray-900'>No work experience.</div>
                )}

                <div>
                  <p className='text-[12px]'>{cv.state}, Nigeria</p>
                </div>
              </div>

            </div>
            
            {/* Action Button */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                router.push(`/dashboard/new-request?category=employment&role=employer&cvId=${encodeURIComponent(cv._id)}`);
              }}
              className="cursor-pointer text-[12px] font-semibold text-[#2E8B57]"
            >
              View CV
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
}