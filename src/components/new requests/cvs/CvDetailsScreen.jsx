"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getCvById } from "@/api/cvs/requests";
import { Loader } from "../../ui/Loader";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import { exportPDF } from "./exportPDF";

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
      <div className="max-w-4xl mx-auto py-8 px-4">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  if (!cv) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="text-center text-gray-500">No CV found</div>
      </div>
    );
  }

  return (
    <div className="max-w-[210mm] mx-auto pt-[20px] px-4 md:max-w-4xl md:py-8">
      <div className="flex justify-between items-center mb-[16px] md:mb-6">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-[11px] md:text-sm cursor-pointer text-gray-600">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button 
          onClick={() => exportPDF(cv)}
          className="bg-teal-700 cursor-pointer text-white px-4 py-2 rounded hover:bg-teal-800 transition text-[11px] md:text-base"
        >
          Export CV
        </button>
      </div>
 
      <div className="bg-white overflow-hidden">
        <div className="flex flex-row min-h-[290mm] md:min-h-screen md:gap-12">
          <Sidebar cv={cv} imgError={imgError} setImgError={setImgError} />
          <MainContent cv={cv} />
        </div>
      </div>
    </div>
  );
}