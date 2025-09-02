"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import { getJobById, submitJobApplication, getJobListingsByUser, getJobApplications } from "@/api/jobs/requests";
import { getPersonalCvs } from "@/api/cvs/requests";
import { Loader } from "@/components/ui/Loader";
import JobHeader from "./JobHeader";
import JobInfo from "./JobInfo";
import ApplyForm from "./ApplyForm";
import { Toast } from "@/components/ui/Toast";
import { ApplicationCard } from "./ApplicationCard";
import { Modal } from "./Modal";
import { formatNumberWithCommas } from "@/utils/formatNumber";
import { Loader2 } from "lucide-react";

export default function JobDetailsScreen({ jobId }) {
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(Boolean(jobId));
  const [error, setError] = useState("");
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [proposal, setProposal] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [applicationError, setApplicationError] = useState("");
  const [applicationSuccess, setApplicationSuccess] = useState("");
  const [hasApplied, setHasApplied] = useState(false);
  const [cvs, setCvs] = useState([]);
  const [selectedCvId, setSelectedCvId] = useState(null);
  const [cvLoading, setCvLoading] = useState(false);
  const [isOwnJob, setIsOwnJob] = useState(false);
  const [showApplicationsModal, setShowApplicationsModal] = useState(false);
  const [jobApplications, setJobApplications] = useState([]);
  const [applicationsLoading, setApplicationsLoading] = useState(false);
  const { showToast, toastMessage, triggerToast } = useToast();

  useEffect(() => {
    if (!jobId) {
      setError("No job specified");
      setLoading(false);
      return;
    }
    let mounted = true;
    async function fetchJobAndUserListings() {
      setLoading(true);
      setError("");
      try {
        // Fetch job details
        const res = await getJobById({ jobId });
        const jobObj = res?.data || res;
        if (mounted) {
          setJob(jobObj);

          // Fetch user's posted jobs to check if this job is theirs
          try {
            const userJobsRes = await getJobListingsByUser();
            const userJobs = userJobsRes?.data || userJobsRes || [];
            const isOwnJob = Array.isArray(userJobs) && userJobs.some((j) => j._id === jobId || String(j._id) === String(jobId));
            setIsOwnJob(isOwnJob);

            // Fetch CVs and check if user has applied
            const cvRes = await getPersonalCvs();
            const cvList = cvRes?.data || cvRes || [];
            setCvs(Array.isArray(cvList) ? cvList : []);
            if (cvList.length > 0) {
              setSelectedCvId(cvList[0]._id);
            }
            let alreadyApplied = false;
            if (Array.isArray(cvList) && Array.isArray(jobObj?.applicants)) {
              alreadyApplied = jobObj.applicants.some((a) => {
                const cv = a?.cv;
                return !!cv && cvList.some((userCv) =>
                  userCv._id === cv._id || userCv._id === cv || String(userCv._id) === String(cv)
                );
              });
            }
            setHasApplied(alreadyApplied);
          } catch (e) {
            console.warn("Failed to determine applied status or user jobs", e);
          }
        }
      } catch (err) {
        console.error("Error fetching job:", err);
        if (mounted) setError("Failed to load job");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchJobAndUserListings();
    return () => {
      mounted = false;
    };
  }, [jobId]);

  useEffect(() => {
    async function fetchCvs() {
      setCvLoading(true);
      try {
        const res = await getPersonalCvs();
        const cvList = res?.data || res || [];
        setCvs(Array.isArray(cvList) ? cvList : []);
        if (cvList.length > 0 && !selectedCvId) {
          setSelectedCvId(cvList[0]._id);
        }
      } catch (err) {
        console.error("Error fetching CVs:", err);
        setApplicationError("Failed to load CVs");
      } finally {
        setCvLoading(false);
      }
    }
    if (showApplyForm && !hasApplied && !isOwnJob) {
      fetchCvs();
    }
  }, [showApplyForm, hasApplied, isOwnJob, selectedCvId]);

  const handleApplyClick = () => {
    setApplicationError("");
    setApplicationSuccess("");
    setShowApplyForm((prev) => !prev);
  };

  const handleViewApplications = async () => {
    setApplicationsLoading(true);
    setShowApplicationsModal(true);
    try {
      const applicationsRes = await getJobApplications({ jobId });
      const applications = applicationsRes?.data || applicationsRes || [];
      setJobApplications(Array.isArray(applications) ? applications : []);
    } catch (err) {
      console.error("Error fetching applications:", err);
      triggerToast("Failed to load job applications.");
    } finally {
      setApplicationsLoading(false);
    }
  };

  const handleSendProposal = async () => {
    setApplicationError("");
    setApplicationSuccess("");
    if (!selectedCvId) {
      setApplicationError("Please select a CV to apply with.");
      return;
    }
    if (!proposal.trim()) {
      setApplicationError("Please provide a cover letter.");
      return;
    }
    try {
      setSubmitting(true);
      const idToUse = job?._id || jobId;
      await submitJobApplication({ jobId: idToUse, cvId: selectedCvId, proposal: proposal || "" });
      console.log(selectedCvId);
      triggerToast("Your application was submitted successfully.");
      setProposal("");
      setShowApplyForm(false);
      try {
        const res = await getJobById({ jobId: idToUse });
        const updatedJob = res?.data || res;
        setJob(updatedJob);
        let alreadyApplied = false;
        if (Array.isArray(cvs) && Array.isArray(updatedJob?.applicants)) {
          alreadyApplied = updatedJob.applicants.some((a) => {
            const cv = a?.cv;
            return !!cv && cvs.some((userCv) =>
              userCv._id === cv._id || userCv._id === cv || String(userCv._id) === String(cv)
            );
          });
        }
        setHasApplied(alreadyApplied);
      } catch (e) {
        console.warn("Failed to reload job after applying", e);
        setHasApplied(true);
      }
    } catch (err) {
      console.error("Sending proposal failed:", err);
      setApplicationError("Failed to send application.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        <JobHeader router={router} />
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Job</h3>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        <JobHeader router={router} />
        <div className="text-center">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Job Not Found</h3>
            <p className="text-gray-500">The job you're looking for doesn't exist or has been removed.</p>
          </div>
        </div>
      </div>
    );
  }

  const formatSalary = (salary, currency) => {
      if (!salary) return null;
      return `${currency || "$"} ${formatNumberWithCommas(salary)}`;
  };

  return (
<div className="w-full max-w-2xl mx-auto py-6 px-4 sm:px-6">
  <JobHeader router={router} />
  <JobInfo
    job={job}
    handleApplyClick={handleApplyClick}
    submitting={submitting}
    hasApplied={hasApplied}
    isOwnJob={isOwnJob}
    handleViewApplications={handleViewApplications}
    router={router}
  />
  {showApplyForm && !isOwnJob && (
    <ApplyForm
      job={job}
      hasApplied={hasApplied}
      cvs={cvs}
      cvLoading={cvLoading}
      selectedCvId={selectedCvId}
      setSelectedCvId={setSelectedCvId}
      proposal={proposal}
      setProposal={setProposal}
      applicationError={applicationError}
      applicationSuccess={applicationSuccess}
      submitting={submitting}
      handleSendProposal={handleSendProposal}
      setShowApplyForm={setShowApplyForm}
      router={router}
    />
  )}

  {/* Enhanced Applications Modal */}
  <Modal
    isOpen={showApplicationsModal}
    onClose={() => setShowApplicationsModal(false)}
    title={`Applications for ${job.jobDetails?.title || "Job"}`}
    className="w-full sm:max-w-4xl"
  >
    <div className="p-4 sm:p-6">
      {/* Modal Header Info */}
      <div className="mb-6 p-4 bg-green-50 rounded-xl border border-blue-100">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-gray-900 text-base sm:text-lg">{job.jobDetails?.title}</h3>
            <p className="text-sm text-gray-600 mt-1">
              {jobApplications.length} {jobApplications.length === 1 ? 'application' : 'applications'} received
            </p>
          </div>
          <div className="text-left sm:text-right">
            <div className="text-sm font-medium text-green-900">
              {job.jobDetails?.salary ? `Salary: ${formatSalary(job.jobDetails.salary, job.jobDetails.salaryCurrency)}` : 'Salary not specified'}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Posted {new Date (job.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      {/* Applications Content */}
      {applicationsLoading ? (
        <div className="flex items-center gap-2 justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-[#85CE5C]" />
          <p className="text-gray-500">Loading applications...</p>
        </div>
      ) : jobApplications.length === 0 ? (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">No Applications Yet</h3>
          <p className="text-gray-500 text-sm">
            Your job posting hasn't received any applications yet.
            <br />
            Consider sharing it to reach more candidates.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Applications List */}
          <div className="grid gap-6">
            {jobApplications.map((app, index) => (
              <ApplicationCard key={index} application={app} index={index} router={router} />
            ))}
          </div>
        </div>
      )}

      {/* Modal Footer */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <div className="flex justify-end md:justify-start">
          <button
            onClick={() => setShowApplicationsModal(false)}
            className="px-6 py-3 text-gray-700 w-full md:w-fit bg-gray-100 hover:bg-gray-200 cursor-pointer text-sm rounded-lg font-medium transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </Modal>

  <Toast show={showToast} message={toastMessage} />
</div>
  );
}