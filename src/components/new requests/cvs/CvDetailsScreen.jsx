"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, User } from "lucide-react";
import Image from "next/image";
import { getCvById } from "@/api/cvs/requests";
import { Loader } from "../../ui/Loader";

// Simple humanize helper
const humanize = (s) => (s ? String(s).replace(/-/g, " ").replace(/\b\w/g, ch => ch.toUpperCase()) : "");

export default function CvDetailsScreen({ cvId }) {
  const router = useRouter();
  const [cv, setCv] = useState(null);
  const [loading, setLoading] = useState(Boolean(cvId));
  const [error, setError] = useState("");
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (!cvId) {
      setError("No CV specified");
      setLoading(false);
      return;
    }
    let mounted = true;
    async function fetchCv() {
      setLoading(true);
      setError("");
      try {
        const res = await getCvById({ cvId });
        const cvObj = res?.data || res;
        if (mounted) setCv(cvObj);
      } catch (err) {
        console.error("Error fetching CV:", err);
        if (mounted) setError("Failed to load CV");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchCv();
    return () => { mounted = false; };
  }, [cvId]);

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

  if (!cv) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="text-center text-gray-500">No CV found</div>
      </div>
    );
  }

  const ed = cv.educationDetails || {};
  const we = cv.workExperienceDetails || {};

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-sm cursor-pointer text-gray-600 mb-4">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <div className="flex items-center gap-4 mb-4">
          {/* Avatar: Image from cv.user.avatar with icon fallback */}
          <div className="w-18 h-18 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
            {cv.user?.avatar && !imgError ? (
              <Image
                src={cv.user.avatar}
                alt={`${cv.firstName} ${cv.lastName} avatar`}
                width={48}
                height={48}
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <User className="w-6 h-6 text-gray-400" />
              </div>
            )}
          </div>
          <div>
            <div className="font-semibold text-gray-900">
              {cv.firstName} {cv.lastName}
            </div>
            <div className="text-sm text-gray-500">{cv.email} · {cv.number}</div>
          </div>
        </div>

        <div className="mb-3 text-sm text-gray-700">
          <div className="font-medium mb-1">Location</div>
          <div>{cv.state} {cv.lga ? `· ${cv.lga}` : ""} {cv.area ? `· ${cv.area}` : ""}</div>
        </div>

        <div className="mb-3 text-sm text-gray-700">
          <div className="font-medium mb-1">Education</div>
          <div>
            <div className="font-medium">{humanize(ed.educationLevel)} {ed.educationMajor ? `— ${ed.educationMajor}` : ""}</div>
            <div className="text-sm text-gray-500">{ed.schoolName} {ed.startYear || ed.endYear ? `· ${ed.startYear || ""} - ${ed.endYear || ""}` : ""}</div>
          </div>
        </div>

        <div className="mb-3 text-sm text-gray-700">
          <div className="font-medium mb-1">Work Experience</div>
          {cv.hasWorkExperience ? (
            <div>
              <div className="font-medium">{we.jobTitle || "—"}</div>
              <div className="text-sm text-gray-500">{we.company ? `at ${we.company}` : ""} {we.duration ? `· ${we.duration}` : ""}</div>
              <div className="text-sm text-gray-500">Years: {we.years || "N/A"}</div>
            </div>
          ) : (
            <div className="text-sm text-gray-500 italic">No work experience listed</div>
          )}
        </div>

        <div className="mb-3 text-sm text-gray-700">
          <div className="font-medium mb-1">Skills</div>
          <div className="flex flex-wrap gap-2">
            {Array.isArray(cv.skills) && cv.skills.length > 0 ? cv.skills.map((s, i) => (
              <div key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                {humanize(s)} 
              </div>
            )) : <div className="text-sm text-gray-500 italic">No skills listed</div>}
          </div>
        </div>

        {cv.additionalCertificate && (
          <div className="mb-3 text-sm text-gray-700">
            <div className="font-medium mb-1">Additional Certificate</div>
            <div>{cv.additionalCertificate}</div>
          </div>
        )}

        {Array.isArray(cv.languages) && cv.languages.length > 0 && (
          <div className="mb-3 text-sm text-gray-700">
            <div className="font-medium mb-1">Languages</div>
            <div className="flex gap-2">{cv.languages.map((l, i) => <span key={i} className="text-sm text-gray-600">{l}</span>)}</div>
          </div>
        )}

        <div className="text-sm text-gray-500 mt-4">Profile created: {cv.createdAt ? new Date(cv.createdAt).toLocaleString() : "N/A"}</div>
      </div>
    </div>
  );
}
