import React from "react";
import { X, CheckCircle, Loader2, Briefcase, FileText } from "lucide-react";
import CvCard from "./CvCard";

export default function ApplyForm({
  job,
  hasApplied,
  cvs,
  cvLoading,
  selectedCvId,
  setSelectedCvId,
  proposal,
  setProposal,
  applicationError,
  applicationSuccess,
  submitting,
  handleSendProposal,
  setShowApplyForm,
  router
}) {
  const jd = job.jobDetails || {};
  const ed = job.employerDetails || {};

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full h-full sm:w-full sm:max-w-2xl sm:h-auto sm:max-h-[90vh] sm:rounded-2xl flex flex-col shadow-2xl">
        <div className="flex-shrink-0 bg-gradient-to-r from-[#85CE5C] to-[#7BC04E] text-white p-4 sm:p-6 sm:rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div className="flex-1 pr-4">
              <div className="mb-2">
                <h3 className="text-lg sm:text-xl font-bold">Apply for Position</h3>
              </div>
              <p className="text-white/90 text-sm font-medium truncate">{jd.title}</p>
              <p className="text-white/80 text-xs">{ed.company}</p>
            </div>
            <button 
              onClick={() => setShowApplyForm(false)} 
              className="text-white/80 hover:text-white cursor-pointer hover:bg-white/20 rounded-full p-2 transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

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
                      onClick={() => router.push('/dashboard/new-request?category=employment&role=jobSeeker&form=jobSeeker-form')}
                      className="text-sm font-medium text-[#85CE5C] cursor-pointer hover:text-[#7BC04E] transition-colors"
                    >
                      Upload CV →
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cvs.map((cv) => (
                      <CvCard
                        key={cv._id}
                        cv={cv}
                        selectedCvId={selectedCvId}
                        setSelectedCvId={setSelectedCvId}
                        router={router}
                      />
                    ))}
                  </div>
                )}
              </div>

              {cvs.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Briefcase className="w-5 h-5 text-[#85CE5C]" />
                    <h4 className="text-base font-semibold text-gray-900">Cover Letter</h4>
                  </div>
                  
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
                disabled={submitting || !selectedCvId || !proposal.trim()}
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
  );
}