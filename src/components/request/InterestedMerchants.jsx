import React from "react";
import Image from "next/image";

const InterestedMerchants = ({ merchants, onAccept, actionLoading }) => (
  <div>
    <div className="">
      {merchants.map((merchant) => (
        <div key={merchant._id} className="bg-gray-100 shadow-md p-4 rounded-xl">
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
          <div>
            <article>
              <h4 className="text-md text-gray-900 uppercase font-medium">{merchant.merchant?.businessName}</h4>
              <p className="text-sm text-gray-500">{merchant.merchant?.state}, {merchant.merchant?.lga}</p>
            </article>
            <p className="text-sm text-gray-500">{merchant.message?.content}</p>
            {!merchant.isAccepted && (
             <div className="flex justify-end"> 
              <button
              className="bg-gray-500 text-sm text-white px-4 py-2 rounded-md mt-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
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
      ))}
    </div>
  </div>
);

export default InterestedMerchants;