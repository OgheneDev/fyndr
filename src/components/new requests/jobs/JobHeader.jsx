import React from "react";
import { ArrowLeft } from "lucide-react";

export default function JobHeader({ router }) {
  return (
    <button onClick={() => router.back()} className="flex items-center gap-2 text-sm cursor-pointer text-gray-600 mb-4">
      <ArrowLeft className="w-4 h-4" /> Back
    </button>
  );
}