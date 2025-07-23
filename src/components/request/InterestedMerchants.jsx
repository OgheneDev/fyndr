import React from "react";
import Image from "next/image";

const InterestedMerchants = ({ merchants, onAccept, actionLoading, chooseMerchantId, setChooseMerchantId, onChoose, chooseMerchantLoading }) => (
  <div>
    <div className="">
      {merchants.map((merchant) => (
       <div key={merchant._id}>
          <div className="bg-gray-100 md:w-[400px] md:mx-auto shadow-md p-4 rounded-xl">
          <div className="flex items-start gap-5">
            <div>
              <Image
                src={merchant.merchant?.avatar}
                alt="Merchant avatar"
                height={70}
                width={70}
                className="rounded-full w-13 h-13"
              />
            </div>
            <div className="flex-1">
              <article>
                <h4 className="text-md text-gray-900 uppercase font-medium">{merchant.merchant?.businessName}</h4>
                <p className="text-sm text-gray-500">{merchant.merchant?.state}, {merchant.merchant?.lga}</p>
              </article>
              <p className="text-sm text-gray-500">{merchant.message?.content}</p>
              {!merchant.isAccepted && (
                <div className="flex justify-end mt-2">
                  <button
                    className="bg-gray-500 text-sm text-white px-4 py-2 rounded-md disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
                    onClick={() => onAccept(merchant._id)}
                    disabled={actionLoading}
                  >
                    {actionLoading ? "Interviewing..." : "Interview"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
    <div className="mt-8 bg-gray-100 p-6 rounded-xl md:w-[400px] md:mx-auto shadow-md">
      <h4 className="text-md text-gray-900 uppercase font-medium mb-4">Choose a Merchant</h4>
      <select 
        id="merchantSelect"
        value={chooseMerchantId} 
        onChange={(e) => {
          console.log('Selected merchant ID:', e.target.value);
          setChooseMerchantId(e.target.value);
        }}
        className="w-full p-3 mb-4 border-gray-800 rounded-md bg-white outline-none text-sm"
      >
        <option value="">Select a merchant</option>
        {merchants.map((merchant) => {
          return (
            <option key={merchant._id} value={merchant.merchant?._id}>
              {merchant.merchant?.businessName}
            </option>
          );
        })}
      </select>
      <button
        onClick={() => {
          onChoose();
        }}
        disabled={!chooseMerchantId || chooseMerchantLoading}
        className="w-full bg-gray-500 text-sm text-white px-4 cursor-pointer py-3 rounded-md disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 hover:bg-gray-600"
      >
        {chooseMerchantLoading ? "Choosing..." : "Choose Merchant"}
      </button>
    </div>
       </div>
      ))}
    </div>
  </div>
);

export default InterestedMerchants;