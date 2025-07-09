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
    <div>
      <p>Price Range: {getBudgetText(data)}</p>
    </div>
    </div>
    {data.carHire && (
      <div className="text-sm">
        <div className="space-y-1">
          <p><span className="font-medium">Car Type:</span> {data.carHire.carType}</p>
          <p><span className="font-medium">Duration:</span> {data.carHire.hireDuration}</p>
          <p><span className="font-medium">Pickup Location:</span> {data.carHire.pickupLocation}</p>
          <p><span className="font-medium">Airport:</span> {data.carHire.airport}</p>
          <p><span className="font-medium">Travel:</span> {data.carHire.travel ? "Yes" : "No"}</p>
        </div>
      </div>
    )}
    {data.cleaning && (
      <div className="text-sm">
        <div className="space-y-1">
          <p><span className="font-medium">Property Type:</span> {data.cleaning.propertyType}</p>
          <p><span className="font-medium">Property Location:</span> {data.cleaning.propertyLocation}</p>
          <p><span className="font-medium">Rooms:</span> {data.cleaning.roomNumber}</p>
          <p><span className="font-medium">Cleaning Type:</span> {data.cleaning.cleaningType}</p>
        </div>
      </div>
    )}
    {data.realEstate && (
      <div className="text-sm">
        <div className="space-y-1">
          <p><span className="font-medium">Rent Type:</span> {data.realEstate.rentType}</p>
          <p><span className="font-medium">Property Type:</span> {data.realEstate.propertyType}</p>
          <p><span className="font-medium">Rooms:</span> {data.realEstate.roomNumber}</p>
          <p><span className="font-medium">Condition:</span> {data.realEstate.propertyCondition}</p>
        </div>
      </div>
    )}
    {data.carPart && (
      <div className="text-sm">
        <div className="space-y-1">
          <p><span className="font-medium">Current Location:</span> {data.carPart.currentLocation}</p>
          <p><span className="font-medium">Sourcing Location:</span> {data.carPart.sourcingLocation}</p>
          <p><span className="font-medium">Car Make:</span> {data.carPart.carMake}</p>
          <p><span className="font-medium">Car Model:</span> {data.carPart.carModel}</p>
          <p><span className="font-medium">Car Year:</span> {data.carPart.carYear}</p>
          {data.carPart.image && (
            <div>
              <span className="font-medium">Image:</span>
              <Image src={data.carPart.image} alt="Car Part" width={50} height={50} className="mt-2 max-w-xs rounded" />
            </div>
          )}
        </div>
      </div>
    )}
    {data.automobile && (
      <div className="text-sm">
        <div className="space-y-1">
          <p><span className="font-medium">Location:</span> {data.automobile.location}</p>
          <p><span className="font-medium">Car Make:</span> {data.automobile.carMake}</p>
          <p><span className="font-medium">Car Model:</span> {data.automobile.carModel}</p>
          <p><span className="font-medium">Car Year From:</span> {data.automobile.carYearFrom}</p>
          <p><span className="font-medium">Car Year To:</span> {data.automobile.carYearTo}</p>
          <p><span className="font-medium">Transmission:</span> {data.automobile.transmission}</p>
          <p><span className="font-medium">Lower Price Limit:</span> {data.automobile.lowerPriceLimit}</p>
          <p><span className="font-medium">Upper Price Limit:</span> {data.automobile.upperPriceLimit}</p>
        </div>
      </div>
    )}
  </>
);

export default RequestDetailsSections;
