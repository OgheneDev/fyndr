export const JobsList = ({filteredJobs}) => (
    <div className='flex flex-col gap-5'>
        {Array.isArray(filteredJobs) && filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div key={job._id} className="border px-4 py-3 my-4 rounded-4xl flex items-center justify-between">
              <div className='text-sm'>
                <div className='flex gap-1'>
                  <p>{job.employerDetails.firstName}</p>
                  <p>{job.employerDetails.lastName}</p>
                </div>
                <p>{job.jobDetails.title}</p>
                <p>{job.jobDetails.location}</p>
              </div>
              <button>
                View Job
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">No jobs found</div>
        )}
      </div>
)