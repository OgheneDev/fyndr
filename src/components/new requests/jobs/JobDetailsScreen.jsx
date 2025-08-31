"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, User, X, CheckCircle, FileText, Briefcase } from "lucide-react";
import { getJobById, submitJobApplication } from "@/api/jobs/requests";
import { getPersonalCvs } from "@/api/cvs/requests";
import { Loader } from "@/components/ui/Loader";
import { BENEFITS } from "@/data/data";
import Swal from "sweetalert2";
import Image from "next/image";

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
  const [hasApplied, setHasApplied] = useState(false);
  const [cvs, setCvs] = useState([]);
  const [selectedCvId, setSelectedCvId] = useState(null);
  const [cvLoading, setCvLoading] = useState(false);

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
          // Fetch CVs to check applied status
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
  }, [showApplyForm, hasApplied]);

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
    try {
      setSubmitting(true);
      const idToUse = job?._id || jobId;
      await submitJobApplication({ jobId: idToUse, cvId: selectedCvId, proposal: proposal || "" });
      Swal.fire({
        icon: "success",
        title: "Application sent",
        text: "Your application was submitted successfully.",
        confirmButtonColor: "#85CE5C",
        timer: 2000
      });
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
          {ed?.companyImage ? (
            <Image
              src={ed.companyImage}
              alt={`${ed.company} logo`}
              width={64}
              height={64}
              className="w-16 h-16 rounded-full object-cover shadow-md"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
              <User size={30} className="text-gray-500" />
            </div>
          )}
          <div>
            <div className="font-semibold text-gray-900">{ed.company}</div>
            <div className="text-sm text-gray-500">{ed.firstName} {ed.lastName}</div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-[#85CE5C] mb-2">{jd.title}</h3>
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
            className="flex-1 cursor-pointer text-sm bg-[#85CE5C] disabled:opacity-50 text-white py-2 rounded-md"
            disabled={submitting || hasApplied}
          >
            {hasApplied ? "Already Applied" : (showApplyForm ? "Close" : "Apply")}
          </button>
          <button
            className="flex-1 border text-sm cursor-pointer border-gray-200 text-gray-700 py-2 rounded-md"
            onClick={() => router.push(`/dashboard/new-request?category=employment&role=jobSeeker`)}
          >
            Back to Jobs
          </button>
        </div>

        {showApplyForm && (
          <>
            {/* Enhanced Modal Overlay */}
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-0 sm:p-4">
              {/* Enhanced Modal Container - Fullscreen on mobile, centered on desktop */}
              <div className="bg-white w-full h-full sm:w-full sm:max-w-2xl sm:h-auto sm:max-h-[90vh] sm:rounded-2xl flex flex-col shadow-2xl">
                
                {/* Enhanced Header */}
                <div className="flex-shrink-0 bg-gradient-to-r from-[#85CE5C] to-[#7BC04E] text-white p-4 sm:p-6 sm:rounded-t-2xl">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Briefcase className="w-5 h-5" />
                        <h3 className="text-lg sm:text-xl font-bold">Apply for Position</h3>
                      </div>
                      <p className="text-white/90 text-sm font-medium truncate">{jd.title}</p>
                      <p className="text-white/80 text-xs">{ed.company}</p>
                    </div>
                    <button 
                      onClick={() => setShowApplyForm(false)} 
                      className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Enhanced Content Area */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                  {hasApplied ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Application Submitted</h4>
                      <p className="text-sm text-gray-600">You have already applied to this job position.</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      
                      {/* CV Selection Section */}
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <FileText className="w-5 h-5 text-[#85CE5C]" />
                          <h4 className="text-base font-semibold text-gray-900">Select Your CV</h4>
                        </div>
                        
                        {cvLoading ? (
                          <div className="flex items-center justify-center py-8">
                            <Loader2 className="w-6 h-6 animate-spin text-[#85CE5C]" />
                            <span className="ml-2 text-sm text-gray-600">Loading your CVs...</span>
                          </div>
                        ) : cvs.length === 0 ? (
                          <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                            <h5 className="font-medium text-gray-700 mb-1">No CVs Found</h5>
                            <p className="text-sm text-gray-500 mb-4">You need to upload a CV before applying</p>
                            <button
                              onClick={() => router.push('/dashboard/cv')}
                              className="text-sm font-medium text-[#85CE5C] hover:text-[#7BC04E] transition-colors"
                            >
                              Upload CV →
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {cvs.map((cv) => (
                              <div
                                key={cv._id}
                                onClick={() => setSelectedCvId(cv._id)}
                                className={`group relative bg-white border-2 rounded-xl p-4 transition-all duration-300 hover:shadow-md cursor-pointer ${
                                  selectedCvId === cv._id 
                                    ? "border-[#85CE5C] bg-green-50 shadow-sm" 
                                    : "border-gray-200 hover:border-gray-300"
                                }`}
                              >
                                {/* Selection Indicator */}
                                {selectedCvId === cv._id && (
                                  <div className="absolute top-3 right-3">
                                    <div className="w-5 h-5 bg-[#85CE5C] rounded-full flex items-center justify-center">
                                      <CheckCircle className="w-3 h-3 text-white" />
                                    </div>
                                  </div>
                                )}
                                
                                <div className="flex items-center gap-4">
                                  {cv.profileImage ? (
                                    <Image
                                      src={cv.profileImage}
                                      alt={`${cv.firstName} ${cv.lastName} avatar`}
                                      width={56}
                                      height={56}
                                      className="w-14 h-14 rounded-full object-cover shadow-sm"
                                    />
                                  ) : (
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                      <User size={24} className="text-gray-500" />
                                    </div>
                                  )}
                                  
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h5 className="font-semibold text-gray-900 truncate">
                                        {cv.firstName} {cv.lastName}
                                      </h5>
                                      {selectedCvId === cv._id && (
                                        <span className="text-xs bg-[#85CE5C] text-white px-2 py-0.5 rounded-full font-medium">
                                          Selected
                                        </span>
                                      )}
                                    </div>
                                    
                                    {cv.workExperienceDetails && cv.workExperienceDetails.length > 0 ? (
                                      <p className="text-sm text-gray-600 truncate">
                                        {cv.workExperienceDetails[0]?.jobTitle || "Professional"}
                                      </p>
                                    ) : (
                                      <p className="text-sm text-gray-500">Entry Level</p>
                                    )}
                                    
                                    <p className="text-xs text-gray-500 mt-1">{cv.state}, Nigeria</p>
                                  </div>
                                  
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      router.push(
                                        `/dashboard/new-request?category=employment&role=employer&cvId=${encodeURIComponent(
                                          cv._id
                                        )}`
                                      );
                                    }}
                                    className="text-xs font-semibold text-[#85CE5C] cursor-pointer hover:text-[#7BC04E] hover:underline transition-colors px-3 py-1.5 rounded-md hover:bg-green-50"
                                  >
                                    View CV
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Application Message Section */}
                      {cvs.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <Briefcase className="w-5 h-5 text-[#85CE5C]" />
                            <h4 className="text-base font-semibold text-gray-900">Cover Letter</h4>
                          </div>
                          
                          {/* Error/Success Messages */}
                          {applicationError && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                              <p className="text-red-600 text-sm font-medium">{applicationError}</p>
                            </div>
                          )}
                          
                          {applicationSuccess && (
                            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                              <p className="text-green-600 text-sm font-medium">{applicationSuccess}</p>
                            </div>
                          )}
                          
                          <div className="relative">
                            <textarea
                              value={proposal}
                              onChange={(e) => setProposal(e.target.value)}
                              placeholder="Tell the employer why you're the perfect fit for this role. Highlight your relevant skills, experience, and what makes you stand out..."
                              className="w-full border-2 border-gray-200 focus:border-[#85CE5C] focus:ring-0 outline-0 rounded-xl p-4 text-sm leading-relaxed transition-all duration-200 resize-none min-h-[120px] sm:min-h-[150px]"
                              maxLength={1000}
                            />
                            <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                              {proposal.length}/1000
                            </div>
                          </div>
                          
                          <div className="mt-2 text-xs text-gray-500">
                            💡 Tip: Mention specific skills from the job description and explain how your experience aligns with their needs.
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Enhanced Footer */}
                {!hasApplied && cvs.length > 0 && (
                  <div className="flex-shrink-0 bg-gray-50 border-t border-gray-200 p-4 sm:p-6 sm:rounded-b-2xl">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        type="button"
                        onClick={() => setShowApplyForm(false)}
                        className="sm:flex-1 px-6 py-3 cursor-pointer border-2 text-sm border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-100 hover:border-gray-400 transition-all duration-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleSendProposal}
                        disabled={submitting || !selectedCvId}
                        className="sm:flex-1 px-6 py-3 text-sm cursor-pointer bg-gradient-to-r from-[#85CE5C] to-[#7BC04E] text-white rounded-xl font-semibold hover:from-[#7BC04E] hover:to-[#6FB03D] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        {submitting ? (
                          <div className="flex items-center justify-center gap-2">
                            <Loader2 className="animate-spin w-4 h-4" />
                            <span>Submitting Application...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <span>Submit Application</span>
                            <ArrowLeft className="w-4 h-4 rotate-180" />
                          </div>
                        )}
                      </button>
                    </div>
                    
                    {/* Application Summary */}
                    {selectedCvId && (
                      <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200">
                        <p className="text-xs text-gray-600 mb-1">Applying with:</p>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#85CE5C]" />
                          <span className="text-sm font-medium text-gray-900">
                            {cvs.find(cv => cv._id === selectedCvId)?.firstName} {cvs.find(cv => cv._id === selectedCvId)?.lastName}'s CV
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}