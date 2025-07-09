import React from "react";

const InterestedMerchants = ({ merchants, onAccept, actionLoading }) => (
  <div>
    <div className="space-y-4">
      {merchants.map((merchant) => (
        <div key={merchant._id} className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-gray-700 mb-2">
            <span className="font-medium">Merchant:</span>{" "}
            {merchant.merchant?.businessName ||
              merchant.merchant?.name ||
              merchant.merchant?.email ||
              "Unknown"}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-medium">Message:</span>{" "}
            {merchant.message?.content || merchant.message || ""}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-medium">Status:</span>{" "}
            {merchant.isAccepted ? (
              <span className="text-green-700 font-semibold">Accepted</span>
            ) : (
              <span className="text-yellow-700 font-semibold">Pending</span>
            )}
          </p>
          {!merchant.isAccepted && (
            <button
              className="bg-green-700 text-white px-4 py-2 rounded mt-2 disabled:opacity-60"
              onClick={() => onAccept(merchant._id)}
              disabled={actionLoading}
            >
              {actionLoading ? "Accepting..." : "Accept"}
            </button>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default InterestedMerchants;
