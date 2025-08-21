"use client"
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getJobById } from "@/api/jobs/requests";
import { Loader } from "@/components/ui/Loader";
import { ArrowLeft } from "lucide-react";

export default function JobDetailsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const jobId = searchParams?.get("jobId");

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(Boolean(jobId));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!jobId) {
      setError("No job specified");
      setLoading(false);
      return;
    }

    let mounted = true;
    async function fetchJob() {
      setLoading(true);
      setError(null);
      try {
        const res = await getJobById({ jobId });
        // API helper returns response.data — example shape: { code, message, data }
        const jobObj = res?.data || res; // try both
        if (mounted) {
          setJob(jobObj);
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

  if (loading) return <Loader />;

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
      <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-gray-600 mb-4">
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
            <span>{jd.salaryCurrency || ""} {jd.salary}</span>
          </div>
        )}

        {Array.isArray(jd.benefits) && jd.benefits.length > 0 && (
          <div className="mb-4">
            <div className="text-sm font-medium text-gray-700 mb-1">Benefits</div>
            <div className="flex flex-wrap gap-2">
              {jd.benefits.map((b, i) => (
                <div key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">{b}</div>
              ))}
            </div>
          </div>
        )}

        <div className="text-sm text-gray-700 mb-6">
          <div className="font-medium mb-1">Description</div>
          <div className="whitespace-pre-wrap">{jd.description}</div>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 bg-[#541229] text-white py-2 rounded-md">Apply</button>
          <button className="flex-1 border border-gray-200 text-gray-700 py-2 rounded-md" onClick={() => router.push('/dashboard')}>
            Back to Jobs
          </button>
        </div>
      </div>
    </div>
  );
}
