"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import { getJobById, submitJobApplication } from "@/api/jobs/requests";
import { getPersonalCvs } from "@/api/cvs/requests";
import { Loader } from "@/components/ui/Loader";
import Swal from "sweetalert2";
import JobHeader from "./JobHeader";
import JobInfo from "./JobInfo";
import ApplyForm from "./ApplyForm";
import { Toast } from "@/components/ui/Toast";

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
  const { showToast, toastMessage, triggerToast } = useToast();

  useEffect(() => {
    if (!jobId) {
      setError("No job specified");
      setLoading(false);
      return;
    }
    let mounted = true;
    async function fetchJob() {
      setLoading(true);
      setError("");
      try {
        const res = await getJobById({ jobId });
        const jobObj = res?.data || res;
        if (mounted) {
          setJob(jobObj);
          try {
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
                return !!cv && cvList.some(userCv => 
                  userCv._id === cv._id || userCv._id === cv || String(userCv._id) === String(cv)
                );
              });
            }
            setHasApplied(alreadyApplied);
          } catch (e) {
            console.warn("Failed to determine applied status", e);
          }
        }
      } catch (err) {
        console.error("Error fetching job:", err);
        if (mounted) setError("Failed to load job");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchJob();
    return () => { mounted = false; };
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
    if (showApplyForm && !hasApplied) {
      fetchCvs();
    }
  }, [showApplyForm, hasApplied, selectedCvId]);

  const handleApplyClick = () => {
    setApplicationError("");
    setApplicationSuccess("");
    setShowApplyForm(prev => !prev);
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
      triggerToast('Your application was submitted successfully.')
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
            return !!cv && cvs.some(userCv => 
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
        router={router} 
      />
      {showApplyForm && (
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
      <Toast show={showToast} message={toastMessage} />
    </div>
  );
}