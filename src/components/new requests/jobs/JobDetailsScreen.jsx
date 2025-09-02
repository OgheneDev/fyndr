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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/Dialog";

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
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        <JobHeader router={router} />
        <div className="text-center text-gray-500">No job found</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
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
      <Dialog open={showApplicationsModal} onOpenChange={setShowApplicationsModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Job Applications</DialogTitle>
            <DialogDescription>
              View applications submitted for {job.jobDetails?.title || "this job"}.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            {applicationsLoading ? (
              <div className="text-center">
                <Loader />
              </div>
            ) : jobApplications.length === 0 ? (
              <p className="text-gray-500 text-center">No applications yet.</p>
            ) : (
              <ul className="space-y-4">
                {jobApplications.map((app, index) => (
                  <li key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="font-medium">
                      Applicant: {app.applicant?.firstName} {app.applicant?.lastName}
                    </p>
                    <p className="text-sm text-gray-600">CV: {app.cv?.title || "N/A"}</p>
                    <p className="text-sm text-gray-600">Proposal: {app.proposal || "No proposal provided"}</p>
                    <p className="text-sm text-gray-500">
                      Applied on: {new Date(app.createdAt).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </DialogContent>
      </Dialog>
      <Toast show={showToast} message={toastMessage} />
    </div>
  );
}