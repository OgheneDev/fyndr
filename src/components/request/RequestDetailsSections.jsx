import React from "react";
import Image from "next/image";
import { CATEGORY_LABELS } from "@/data/data";

const formatBudget = (lower, upper) => {
  if (lower && upper) {
    const formattedLower = Number(lower).toLocaleString('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    const formattedUpper = Number(upper).toLocaleString('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return `${formattedLower} - ${formattedUpper}`;
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
    <div className="space-y-1 text-sm mb-15">
      <div>
        <p>Title: {data.title}</p>
      </div>
      <div>
        <p>Category: {CATEGORY_LABELS[data.category] || data.category || "Unknown"}</p>
      </div>
      <div>
        <p>State: {data.targetState}</p>
      </div>
      <div>
        <p>Additional description: {data.additionalDetails || "No additional details."}</p>
      </div>
    </div>
    {data.carHire && (
      <div className="text-sm">
        <div className="space-y-1">
          <p><span className="">Car Type:</span> {data.carHire.carType}</p>
          <p><span className="">Duration:</span> {data.carHire.hireDuration}</p>
          <p><span className="">Pickup Location:</span> {data.carHire.pickupLocation}</p>
          <p><span className="">Airport:</span> {data.carHire.airport}</p>
          <p><span className="">Travel:</span> {data.carHire.travel ? "Yes" : "No"}</p>
        </div>
      </div>
    )}
    {data.cleaning && (
      <div className="text-sm">
        <div className="space-y-1">
          <p><span className="">Property Type:</span> {data.cleaning.propertyType}</p>
          <p><span className="">Property Location:</span> {data.cleaning.propertyLocation}</p>
          <p><span className="">Rooms:</span> {data.cleaning.roomNumber}</p>
          <p><span className="">Cleaning Type:</span> {data.cleaning.cleaningType}</p>
        </div>
      </div>
    )}
    {data.realEstate && (
      <div className="text-sm">
        <div className="space-y-1">
          <p><span className="">Rent or Purchase:</span> {data.realEstate.rentType}</p>
          <p><span className="">Property Type:</span> {data.realEstate.propertyType}</p>
          <p><span className="">Room Number:</span> {data.realEstate.roomNumber}</p>
          <p><span className="">Condition:</span> {data.realEstate.propertyCondition}</p>
          <p><span className="">Price Range:</span> {getBudgetText(data)}</p>
        </div>
      </div>
    )}
    {data.carPart && (
      <div className="text-sm">
        <div className="space-y-1">
          <p><span className="">Current Location:</span> {data.carPart.currentLocation}</p>
          <p><span className="">Sourcing Location:</span> {data.carPart.sourcingLocation}</p>
          <p><span className="">Car Make:</span> {data.carPart.carMake}</p>
          <p><span className="">Car Model:</span> {data.carPart.carModel}</p>
          <p><span className="">Car Year:</span> {data.carPart.carYear}</p>
          {data.carPart.image && (
            <div>
              <span className="">Image:</span>
              <Image src={data.carPart.image} alt="Car Part" width={50} height={50} className="mt-2 max-w-xs rounded" />
            </div>
          )}
        </div>
      </div>
    )}
    {data.automobile && (
      <div className="text-sm">
        <div className="space-y-1">
          <p><span className="">Location:</span> {data.automobile.location}</p>
          <p><span className="">Car Make:</span> {data.automobile.carMake}</p>
          <p><span className="">Car Model:</span> {data.automobile.carModel}</p>
          <p><span className="">Car Year From:</span> {data.automobile.carYearFrom}</p>
          <p><span className="">Car Year To:</span> {data.automobile.carYearTo}</p>
          <p><span className="">Transmission:</span> {data.automobile.transmission}</p>
          <p><span className="">Price Range:</span> {getBudgetText(data)}</p>
        </div>
      </div>
    )}
  </>
);

export default RequestDetailsSections;