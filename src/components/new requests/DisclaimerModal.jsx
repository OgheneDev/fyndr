"use client";

import React from 'react';

const DisclaimerModal = ({ show, onAgree, onCancel }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[90%] mx-auto md:mx-0 md:max-w-md md:w-full">
        <h2 className="text-lg font-bold mb-4">Disclaimer</h2>
        <p className="text-sm mb-6">
          Fyndr acts solely as a platform to ensure your request is delivered to your selected service providers. We are not affiliated with, nor do we endorse or partner with, any of the service providers listed on the platform. Our involvement ends once communication begins between you and the service provider. The fee paid is strictly for facilitating the delivery of your request and does not guarantee the outcome or success of any transaction.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-sm cursor-pointer text-gray-800 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onAgree}
            className="px-4 py-2 bg-[#541229] text-sm cursor-pointer text-white rounded-lg"
          >
            I Agree
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerModal;