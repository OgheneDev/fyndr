import { Eye, Building, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const JobsList = ({ filteredJobs }) => {
  const router = useRouter(); // added
  return (
    <div className='flex flex-col gap-4 mt-4'>
      {Array.isArray(filteredJobs) && filteredJobs.length > 0 ? (
        filteredJobs.map((job) => ( 
          <div 
            key={job._id}
            className="group bg-white border border-[#85CE5C] pr-6 rounded-4xl flex gap-5 md:gap-0 flex-row items-center justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
          >
            <div className='flex items-center space-x-4'>
              {/* Avatar */}
              <div className="w-16 h-16 bg-gradient-to-br from-[#541229] to-[#7a1b3d] rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md">
                {job.employerDetails.firstName[0]}{job.employerDetails.lastName[0]}
              </div>

              {/* Content */}
              <div className=''>
                <div className=''>
                  <div className='flex gap-1 text-[12px] md:text-sm text-gray-900'>
                    <p>{job.employerDetails.firstName}</p>
                    <p>{job.employerDetails.lastName}</p>
                  </div>
                </div>

                <div className='text-[10px] md:text-[12px] text-gray-900'>
                  <p className="font-medium">{job.jobDetails.title}</p>
                </div>

                <div className='flex items-center gap-2 text-[10px] md:text-[12px] text-gray-900'>
                  <p>{job.jobDetails.location}</p>
                </div>
              </div>
            </div>

            {/* Action Button: programmatic navigation to avoid form submit */}
           <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Navigating to job', job._id);
                // Navigate into the new-request flow with employment role and jobId param
                router.push(`/dashboard/new-request?category=employment&role=jobSeeker&jobId=${encodeURIComponent(job._id)}`);
              }}
              className="cursor-pointer text-[12px] font-medium text-[#85CE5C]"
            >
              <span>View Job</span>
            </button>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Building className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg font-medium mb-2">No jobs found</p>
          <p className="text-gray-400 text-sm">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
}