import { Eye, Building, ChevronRight } from 'lucide-react';

export const JobsList = ({ filteredJobs }) => (
  <div className='flex flex-col gap-4 mt-4'>
    {Array.isArray(filteredJobs) && filteredJobs.length > 0 ? (
      filteredJobs.map((job) => (
        <div
          key={job._id}
          className="group bg-white border border-gray-200 px-6 py-4 rounded-2xl flex flex-col gap-5 md:gap-0 md:flex-row md:items-center justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
        >
          <div className='flex md:items-center space-x-4'>
            {/* Avatar */}
            <div className="w-12 h-12 bg-gradient-to-br from-[#541229] to-[#7a1b3d] rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md">
              {job.employerDetails.firstName[0]}{job.employerDetails.lastName[0]}
            </div>

            {/* Content */}
            <div className='space-y-1'>
              <div className=''>
                <div className='flex gap-1 font-semibold text-gray-900'>
                  <p>{job.employerDetails.firstName}</p>
                  <p>{job.employerDetails.lastName}</p>
                </div>
              </div>

              <div className='text-sm text-gray-600'>
                <p className="font-medium text-[#541229]">{job.jobDetails.title}</p>
              </div>

              <div className='flex items-center gap-2 text-sm text-gray-500'>
                <p>{job.jobDetails.location}</p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button className="flex items-center cursor-pointer gap-2 justify-center md:justify-start px-4 py-3 md:py-2 text-sm font-medium text-[#541229] bg-[#54122915] hover:bg-[#54122925] rounded-lg transition-colors duration-200 group-hover:shadow-sm">
            <Eye className="w-4 h-4" />
            View Job
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
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
)