"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { getJobById, submitJobApplication } from "@/api/jobs/requests";
import { Loader } from "@/components/ui/Loader";
import { BENEFITS } from "@/data/data";
import Swal from "sweetalert2";

// add: number formatter
function formatNumberWithCommas(value) {
  if (value === null || value === undefined || value === "") return "";
  const num = Number(String(value).replace(/,/g, ""));
  if (Number.isNaN(num)) return String(value);
  return num.toLocaleString();
}

const BENEFITS_MAP = Object.fromEntries(BENEFITS.map(b => [b.value, b.display]));

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

  // Track whether the CV in localStorage already applied to this job
  const [hasApplied, setHasApplied] = useState(false);

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
          // determine whether saved cvId is among applicants
          try {
            const savedCvId = typeof window !== "undefined" ? localStorage.getItem("cvId") : null;
            let alreadyApplied = false;
            if (savedCvId && Array.isArray(jobObj?.applicants)) {
              alreadyApplied = jobObj.applicants.some((a) => {
                const cv = a?.cv;
                // support cv object or direct id
                return !!cv && (cv._id === savedCvId || cv === savedCvId || String(cv) === savedCvId);
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

  // Toggle apply form. Do NOT auto-submit CV alone.
  const handleApplyClick = () => {
    setApplicationError("");
    setApplicationSuccess("");
    setShowApplyForm(prev => !prev);
  };

  const handleSendProposal = async () => {
    setApplicationError("");
    setApplicationSuccess("");
    const savedCvId = typeof window !== "undefined" ? localStorage.getItem("cvId") : null;
    if (!savedCvId) {
      setApplicationError("No CV found. Please upload your CV first.");
      return;
    }
    try {
      setSubmitting(true);
      const idToUse = job?._id || jobId;
      await submitJobApplication({ jobId: idToUse, cvId: savedCvId, proposal: proposal || "" });
      // show a sweetalert on success and close the apply form
      Swal.fire({
        icon: "success",
        title: "Application sent",
        text: "Your application was submitted successfully.",
        confirmButtonColor: "#541229",
        timer: 2000
      });
      setProposal("");
      setShowApplyForm(false);

      // Reload job and recompute applied status so user cannot apply again
      try {
        const res = await getJobById({ jobId: idToUse });
        const updatedJob = res?.data || res;
        setJob(updatedJob);
        const savedCvId2 = typeof window !== "undefined" ? localStorage.getItem("cvId") : null;
        let alreadyApplied = false;
        if (savedCvId2 && Array.isArray(updatedJob?.applicants)) {
          alreadyApplied = updatedJob.applicants.some((a) => {
            const cv = a?.cv;
            return !!cv && (cv._id === savedCvId2 || cv === savedCvId2 || String(cv) === savedCvId2);
          });
        }
        setHasApplied(alreadyApplied);
      } catch (e) {
        console.warn("Failed to reload job after applying", e);
        // As a fallback, mark as applied to prevent duplicate attempts
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
    return (
      <Loader />
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="text-center text-gray-500">No job found</div>
      </div>
    );
  }

  const jd = job.jobDetails || {};
  const ed = job.employerDetails || {};

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-sm cursor-pointer text-gray-600 mb-4">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#541229] to-[#7a1b3d] rounded-full flex items-center justify-center text-white font-semibold">
            {ed.firstName?.[0] || "E"}{ed.lastName?.[0] || ""}
          </div>
          <div>
            <div className="font-semibold text-gray-900">
              {ed.firstName} {ed.lastName}
            </div>
            <div className="text-sm text-gray-500">{ed.company}</div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-[#541229] mb-2">{jd.title}</h3>
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div>{jd.location}</div>
          <div className="capitalize">{jd.type}</div>
          <div>{jd.startDate ? new Date(jd.startDate).toLocaleDateString() : null}</div>
        </div>

        {jd.salary !== undefined && (
          <div className="mb-3 text-sm text-gray-700">
            <span className="font-medium">Salary: </span>
            <span>{jd.salaryCurrency || ""} {formatNumberWithCommas(jd.salary)}</span>
          </div>
        )}

        {Array.isArray(jd.benefits) && jd.benefits.length > 0 && (
          <div className="mb-4">
            <div className="text-sm font-medium text-gray-700 mb-1">Benefits</div>
            <div className="flex flex-wrap gap-2">
              {jd.benefits.map((b, i) => {
                // Map stored value to user-friendly display; fallback to humanized value
                const label = BENEFITS_MAP[b] || String(b).replace(/-/g, " ").replace(/\b\w/g, ch => ch.toUpperCase());
                return (
                  <div key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {label}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="text-sm text-gray-700 mb-6">
          <div className="font-medium mb-1">Description</div>
          <div className="whitespace-pre-wrap">{jd.description}</div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleApplyClick}
            className="flex-1 cursor-pointer text-sm bg-[#541229] text-white py-2 rounded-md"
            disabled={submitting || hasApplied}
          >
            {hasApplied ? "Already Applied" : (showApplyForm ? "Close" : "Apply")}
          </button>
          <button className="flex-1 border text-sm cursor-pointer border-gray-200 text-gray-700 py-2 rounded-md" onClick={() => router.push('/dashboard')}>
            Back to Jobs
          </button>
        </div>

        {showApplyForm && (
          <div className="mt-4">
            {hasApplied ? (
              <div className="text-sm text-green-600 mb-2">You have already applied to this job with your saved CV.</div>
            ) : null}
            <div className="text-sm text-gray-700 mb-2">Application</div>
            {applicationError && <div className="text-red-500 text-sm mb-2">{applicationError}</div>}
            {applicationSuccess && <div className="text-green-600 text-sm mb-2">{applicationSuccess}</div>}
            {!hasApplied ? (
              <>
                <textarea
                  value={proposal}
                  onChange={(e) => setProposal(e.target.value)}
                  placeholder="Write a brief proposal or cover letter"
                  className="w-full border border-gray-200 rounded outline-0 min-h-[150px] p-2 mb-2 text-sm"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={handleSendProposal}
                    disabled={submitting}
                    className="px-4 py-2 bg-[#541229] text-sm text-white cursor-pointer rounded"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="animate-spin w-4 h-4 mr-2 inline-block align-middle" />
                        Sending...
                      </>
                    ) : (
                      "Send Application"
                    )}
                  </button>
                </div>
              </>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

