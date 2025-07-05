import React from "react";
import Image from "next/image";

const CATEGORY_LABELS = {
  "real-estate": "Real Estate",
  "car-hire": "Car Hire",
  "car-parts": "Car Parts",
  "cleaning": "Cleaning",
  "automobile": "Automobile"
};

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
      <h2 className="text-lg font-semibold text-gray-900 mb-3">Service Category</h2>
      <p className="text-gray-700 text-base">
        {CATEGORY_LABELS[data.category] || data.category || "Unknown"}
      </p>
    </div>
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-3">Additional details</h2>
      <p className="text-gray-700 text-base leading-relaxed">
        {data.additionalDetails || "No additional details."}
      </p>
    </div>
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-3">Location</h2>
      <p className="text-gray-700 text-base">{getLocationText(data)}</p>
    </div>
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-3">Budget</h2>
      <p className="text-gray-700 text-base">{getBudgetText(data)}</p>
    </div>
    {data.carHire && (
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Car Hire Details</h2>
        <div className="space-y-2">
          <p className="text-gray-700"><span className="font-medium">Car Type:</span> {data.carHire.carType}</p>
          <p className="text-gray-700"><span className="font-medium">Duration:</span> {data.carHire.hireDuration}</p>
          <p className="text-gray-700"><span className="font-medium">Pickup Location:</span> {data.carHire.pickupLocation}</p>
          <p className="text-gray-700"><span className="font-medium">Airport:</span> {data.carHire.airport}</p>
          <p className="text-gray-700"><span className="font-medium">Travel:</span> {data.carHire.travel ? "Yes" : "No"}</p>
        </div>
      </div>
    )}
    {data.cleaning && (
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Cleaning Details</h2>
        <div className="space-y-2">
          <p className="text-gray-700"><span className="font-medium">Property Type:</span> {data.cleaning.propertyType}</p>
          <p className="text-gray-700"><span className="font-medium">Property Location:</span> {data.cleaning.propertyLocation}</p>
          <p className="text-gray-700"><span className="font-medium">Rooms:</span> {data.cleaning.roomNumber}</p>
          <p className="text-gray-700"><span className="font-medium">Cleaning Type:</span> {data.cleaning.cleaningType}</p>
        </div>
      </div>
    )}
    {data.realEstate && (
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Real Estate Details</h2>
        <div className="space-y-2">
          <p className="text-gray-700"><span className="font-medium">Rent Type:</span> {data.realEstate.rentType}</p>
          <p className="text-gray-700"><span className="font-medium">Property Type:</span> {data.realEstate.propertyType}</p>
          <p className="text-gray-700"><span className="font-medium">Rooms:</span> {data.realEstate.roomNumber}</p>
          <p className="text-gray-700"><span className="font-medium">Condition:</span> {data.realEstate.propertyCondition}</p>
        </div>
      </div>
    )}
    {data.carPart && (
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Car Part Details</h2>
        <div className="space-y-2">
          <p className="text-gray-700"><span className="font-medium">Current Location:</span> {data.carPart.currentLocation}</p>
          <p className="text-gray-700"><span className="font-medium">Sourcing Location:</span> {data.carPart.sourcingLocation}</p>
          <p className="text-gray-700"><span className="font-medium">Car Make:</span> {data.carPart.carMake}</p>
          <p className="text-gray-700"><span className="font-medium">Car Model:</span> {data.carPart.carModel}</p>
          <p className="text-gray-700"><span className="font-medium">Car Year:</span> {data.carPart.carYear}</p>
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
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Automobile Details</h2>
        <div className="space-y-2">
          <p className="text-gray-700"><span className="font-medium">Location:</span> {data.automobile.location}</p>
          <p className="text-gray-700"><span className="font-medium">Car Make:</span> {data.automobile.carMake}</p>
          <p className="text-gray-700"><span className="font-medium">Car Model:</span> {data.automobile.carModel}</p>
          <p className="text-gray-700"><span className="font-medium">Car Year From:</span> {data.automobile.carYearFrom}</p>
          <p className="text-gray-700"><span className="font-medium">Car Year To:</span> {data.automobile.carYearTo}</p>
          <p className="text-gray-700"><span className="font-medium">Transmission:</span> {data.automobile.transmission}</p>
          <p className="text-gray-700"><span className="font-medium">Lower Price Limit:</span> {data.automobile.lowerPriceLimit}</p>
          <p className="text-gray-700"><span className="font-medium">Upper Price Limit:</span> {data.automobile.upperPriceLimit}</p>
        </div>
      </div>
    )}
  </>
);

export default RequestDetailsSections;
