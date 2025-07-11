import React from "react";

const InterestedMerchants = ({ merchants, onAccept, actionLoading }) => (
  <div>
    <div className="space-y-4">
      {merchants.map((merchant) => (
        <div key={merchant._id} className="bg-gray-100 shadow-md p-4 rounded-xl">
          <p className="mb-2">
            <span className="">Name:</span>{" "}
            {merchant.merchant?.name ||
              merchant.merchant?.businessName ||
              merchant.merchant?.email ||
              "Unknown"}
          </p>
          <p className="mb-2 text-gray-500">
            <span className="">Message:</span>{" "}
            {merchant.message?.content || merchant.message || ""}
          </p>
          <p className="mb-2">
            <span className="">Status:</span>{" "}
            {merchant.isAccepted ? (
              <span className="text-green-700 font-semibold">Accepted</span>
            ) : (
              <span className="text-yellow-700 font-semibold">Pending</span>
            )}
          </p>
          {!merchant.isAccepted && (
            <button
              className="border border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md mt-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
              onClick={() => onAccept(merchant._id)}
              disabled={actionLoading}
            >
              {actionLoading ? "Processing..." : "Interview"}
            </button>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default InterestedMerchants;