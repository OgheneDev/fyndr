import React from "react";
import { ArrowLeft } from "lucide-react";

const RequestDetailsHeader = ({ onBack }) => (
  <div className="bg-white px-4 py-4">
    <div className="flex items-center">
      <button
        onClick={onBack}
        className="mr-4 p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-6 h-6 text-gray-700" />
      </button>
      <h1 className="text-xl font-semibold text-gray-900">Request Details</h1>
    </div>
  </div>
);

export default RequestDetailsHeader;
