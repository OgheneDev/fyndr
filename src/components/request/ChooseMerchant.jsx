import React from "react";

const ChooseMerchant = ({
  merchants,
  chooseMerchantId,
  setChooseMerchantId,
  onChoose,
  loading
}) => (
  <div className="mt-6">
    <h2 className="text-lg font-semibold text-gray-900 mb-3">Choose Merchant</h2>
    <div className="flex gap-2 items-center">
      <select
        className="border rounded px-3 py-2"
        value={chooseMerchantId}
        onChange={e => setChooseMerchantId(e.target.value)}
        disabled={loading}
      >
        <option value="">Select Merchant</option>
        {merchants.map((merchant) => (
          <option key={merchant._id} value={merchant.merchant?._id || merchant.merchant}>
            {merchant.merchant?.businessName ||
              merchant.merchant?.name ||
              merchant.merchant?.email ||
              "Unknown"}
          </option>
        ))}
      </select>
      <button
        className="bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-60"
        onClick={onChoose}
        disabled={loading || !chooseMerchantId}
      >
        {loading ? "Choosing..." : "Choose"}
      </button>
    </div>
  </div>
);

export default ChooseMerchant;
