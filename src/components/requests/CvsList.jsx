import { User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export const CvsList = ({ cvs, loading }) => {
  const router = useRouter();

  // Skeleton component
  const Skeleton = () => (
    <div className="animate-pulse bg-white border border-[#85CE5C] pr-6 rounded-4xl flex flex-row items-center justify-between mb-4">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-gray-200"></div>
        <div>
          <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-24 mb-1"></div>
          <div className="h-3 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
      <div className="h-4 bg-gray-200 rounded w-16"></div>
    </div>
  );

  return (
    <div className="flex max-w-3xl mx-auto flex-col gap-4 mt-6">
      {loading ? (
        // Render 3 skeleton placeholders during loading
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      ) : Array.isArray(cvs) && cvs.length > 0 ? (
        cvs.map((cv) => (
          <div
            key={cv._id}
            className="group bg-white border border-[#85CE5C] pr-6 rounded-4xl flex gap-5 md:gap-0 flex-row items-center justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              {/* Avatar */}
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

              {/* Content */}
              <div>
                <div className="flex gap-1 text-[12px] md:text-sm text-gray-900">
                  <p>{cv.firstName}</p>
                  <p>{cv.lastName}</p>
                </div>

                {/* Work Experience */}
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

                {/* Location */}
                <div>
                  <p className="text-[10px] md:text-[12px]">{cv.state}, Nigeria</p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                router.push(
                  `/dashboard/new-request?category=employment&role=employer&cvId=${encodeURIComponent(cv._id)}`
                );
              }}
              className="cursor-pointer text-[10px] md:text-[12px] font-semibold text-[#85CE5C]"
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
};