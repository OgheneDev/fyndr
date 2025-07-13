import React from "react";
import Image from "next/image";
import { CATEGORY_LABELS } from "@/data/data";

const formatBudget = (lower, upper) => {
  if (lower && upper) {
    return `₦${lower} - ₦${upper}`;
  }
  return "Not specified";
};

const getLocationText = (data) => {
  if (data.carHire?.pickupLocation) return data.carHire.pickupLocation;
  if (data.cleaning?.propertyLocation) return data.cleaning.propertyLocation;
  if (data.targetState) return data.targetState;
  if (data.carPart?.currentLocation) return data.carPart.currentLocation;
  if (data.automobile?.location) return data.automobile.location;
  return "Location not specified";
};

const getBudgetText = (data) => {
  if (data.realEstate?.lowerPriceLimit && data.realEstate?.upperPriceLimit) {
    return formatBudget(data.realEstate.lowerPriceLimit, data.realEstate.upperPriceLimit);
  }
  if (data.automobile?.lowerPriceLimit && data.automobile?.upperPriceLimit) {
    return formatBudget(data.automobile.lowerPriceLimit, data.automobile.upperPriceLimit);
  }
  return "Not specified";
};

const RequestDetailsSections = ({ data }) => (
  <>
    <div>
        <article className="mb-3">
            <h4 className="font-semibold text-md mb-1">{data.title}</h4>
            <span className="uppercase font-semibold text-sm text-[#57132A]">{CATEGORY_LABELS[data.category] || data.category || "Unknown"}</span>
        </article>
        <div className="space-y-4 mb-4">
            <article>
                <span className="font-semibold mb-1">Request ID</span>
                <p className="text-gray-700 text-sm">{data._id}</p>
            </article>
            <article>
                <span className="font-semibold mb-1">Request Status</span>
                <p className="text-gray-700 text-sm">{data.requestStatus}</p>
            </article>
            <article>
                <span className="font-semibold mb-1">Created At</span>
                <p className="text-gray-700 text-sm">{data.createdAt}</p>
            </article>
            <article>
                <span className="font-semibold mb-1">Target State</span>
                <p className="text-gray-700 text-sm">{data.targetState}</p>
            </article>
            <article>
                <span className="font-semibold mb-1">Target Axis</span>
                <p className="text-gray-700 text-sm">{data.targetAxis}</p>
            </article>
            <article>
                <span className="font-semibold mb-1">Details</span>
                <p className="text-gray-700 text-sm">{data.additionalDetails}</p>
            </article>
        </div>
        <div className="mb-5">
            <h4 className="font-semibold mb-2">Payment Info</h4>
            <div className="space-y-4 mb-4">
                <article>
                    <span className="font-semibold mb-1">Transaction Status</span>
                    <p className="text-gray-700 text-sm">{data.transaction_status}</p>
                </article>
                <article>
                    <span className="font-semibold mb-1">Transaction Reference</span>
                    <p className="text-gray-700 text-sm">{data.transaction_reference}</p>
                </article>
                <article>
                    <span className="font-semibold mb-1">Payment Method</span>
                    <p className="text-gray-700 text-sm">{data.payment_method}</p>
                </article>
            </div>
        </div>
    </div>
  </>
);

export default RequestDetailsSections;