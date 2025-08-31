import React from "react";
import Image from "next/image";
import { 
  User, 
  MapPin, 
  Clock, 
  Calendar, 
  Building2,
  ArrowLeft,
  CheckCircle2,
  Loader2
} from "lucide-react";
import { formatNumberWithCommas } from "@/utils/formatNumber";
import { BENEFITS_MAP } from "@/data/benefits";

export default function JobInfo({ job, handleApplyClick, submitting, hasApplied, router }) {
  const jd = job.jobDetails || {};
  const ed = job.employerDetails || {};

  const formatSalary = (salary, currency) => {
    if (!salary) return null;
    return `${currency || '$'} ${formatNumberWithCommas(salary)}`;
  };

  const formatJobType = (type) => {
    if (!type) return null;
    return type.replace(/-/g, ' ').replace(/\b\w/g, ch => ch.toUpperCase());
  };

  return (
    <div className="bg-white border border-gray-200 rounded-3xl shadow-lg overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-gray-50 to-white p-6 border-b border-gray-100">
        <div className="flex flex-col md:flex-row items-start gap-4">
          {ed?.companyImage ? (
            <div className="relative">
              <Image
                src={ed.companyImage}
                alt={`${ed.company} logo`}
                width={72}
                height={72}
                className="w-20 h-20 rounded-2xl object-cover shadow-md border-2 border-white"
              />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-md border-2 border-white">
              <Building2 size={32} className="text-gray-500" />
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg font-bold text-gray-900 truncate">{ed.company}</h2>
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
              <span className="text-sm text-gray-600">Hiring Manager</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <User size={14} />
              <span>{ed.firstName} {ed.lastName}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Job Title and Quick Info */}
      <div className="p-6 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">{jd.title}</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {jd.location && (
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
              <MapPin size={16} className="text-gray-400 flex-shrink-0" />
              <span className="truncate">{jd.location}</span>
            </div>
          )}
          
          {jd.type && (
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
              <Clock size={16} className="text-gray-400 flex-shrink-0" />
              <span className="truncate">{formatJobType(jd.type)}</span>
            </div>
          )}
          
          {jd.startDate && (
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
              <Calendar size={16} className="text-gray-400 flex-shrink-0" />
              <span className="truncate">{new Date(jd.startDate).toLocaleDateString()}</span>
            </div>
          )}
        </div>

        {/* Salary */}
        {jd.salary !== undefined && (
          <div className="mb-6">
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
              <div>
                <div className="text-sm font-medium text-green-800">Salary</div>
                <div className="text-lg font-bold text-green-900">
                  {formatSalary(jd.salary, jd.salaryCurrency)}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Benefits */}
        {Array.isArray(jd.benefits) && jd.benefits.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle2 size={16} className="text-green-500" />
              Benefits & Perks
            </h4>
            <div className="flex flex-wrap gap-2">
              {jd.benefits.map((b, i) => {
                const label = BENEFITS_MAP[b] || String(b).replace(/-/g, " ").replace(/\b\w/g, ch => ch.toUpperCase());
                return (
                  <span 
                    key={i} 
                    className="inline-flex items-center text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-full"
                  >
                    {label}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Job Description */}
        {jd.description && (
          <div className="mb-8">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Job Description</h4>
            <div className="prose prose-sm max-w-none">
              <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap bg-gray-50 rounded-xl p-4 border border-gray-100">
                {jd.description}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="px-6 pb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handleApplyClick}
            className={`
              flex-1 flex items-center justify-center cursor-pointer gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200
              ${hasApplied 
                ? 'bg-green-100 text-green-800 border-2 border-green-200 cursor-default' 
                : submitting
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-[#85CE5C] hover:bg-[#75BE4C] text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
              }
            `}
            disabled={submitting || hasApplied}
          >
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Applying...
              </>
            ) : hasApplied ? (
              <>
                <CheckCircle2 size={16} />
                Application Submitted
              </>
            ) : (
              'Apply for this Position'
            )}
          </button>
          
          <button
            className="flex items-center justify-center cursor-pointer gap-2 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
            onClick={() => router.push(`/dashboard/new-request?category=employment&role=jobSeeker`)}
          >
            <ArrowLeft size={16} />
            Back to Jobs
          </button>
        </div>
        
        {hasApplied && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Your application has been submitted successfully. The employer will review it shortly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}