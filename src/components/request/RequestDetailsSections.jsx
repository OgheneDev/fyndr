"use client";

import React from "react";
import Image from "next/image";
import { CATEGORY_LABELS } from "@/data/data";

const formatDate = (dateString) => {
  if (!dateString) return "Not specified";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch (error) {
    return "Invalid date";
  }
};

const formatBudget = (lower, upper) => {
  if (lower && upper) {
    const formattedLower = Number(lower).toLocaleString("en-NG", { 
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    const formattedUpper = Number(upper).toLocaleString("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return `${formattedLower} - ${formattedUpper}`;
  }
  return "Not specified";
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
          <p><span className="">Target Axis:</span> {data.realEstate.axis?.join(", ") || "Not specified"}</p>
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
    {data.beauty && (
      <div className="text-sm">
        <div className="space-y-1">
          <p><span className="">Target Location:</span> {data.beauty.targetLocation}</p>
          <p><span className="">Service:</span> {data.beauty.service}</p>
          <p><span className="">Date:</span> {formatDate(data.beauty.date)}</p>
          <p><span className="">Time:</span> {data.beauty.time}</p>
        </div>
      </div>
    )}
    {data.catering && (
      <div className="text-sm">
        <div className="space-y-1">
          <p><span className="">Location:</span> {data.catering.location}</p>
          <p><span className="">Event Location:</span> {data.catering.eventLocation}</p>
          <p><span className="">Event Date:</span> {formatDate(data.catering.eventDate)}</p>
        </div>
      </div>
    )}
    {data.carpentry && (
      <div className="text-sm">
        <div className="space-y-1">
          <p><span className="">Location:</span> {data.carpentry.location}</p>
          <p><span className="">Date Needed:</span> {formatDate(data.carpentry.dateNeeded)}</p>
        </div>
      </div>
    )}
    {data.electrician && (
      <div className="text-sm">
        <div className="space-y-1">
          <p><span className="">Location:</span> {data.electrician.location}</p>
          <p><span className="">Date Needed:</span> {formatDate(data.electrician.dateNeeded)}</p>
        </div>
      </div>
    )}
    {data.it && (
      <div className="text-sm">
        <div className="space-y-1">
          <p><span className="">Target Location:</span> {data.it.targetLocation}</p>
          <p><span className="">Service:</span> {data.it.service}</p>
        </div>
      </div>
    )}
    {data.mechanic && (
      <div className="text-sm">
        <div className="space-y-1">
          <p><span className="">Current Location:</span> {data.mechanic.currentLocation}</p>
          <p><span className="">Car Make:</span> {data.mechanic.carMake}</p>
          <p><span className="">Car Model:</span> {data.mechanic.carModel}</p>
          <p><span className="">Year:</span> {data.mechanic.year}</p>
          <p><span className="">Transmission:</span> {data.mechanic.transmission}</p>
        </div>
      </div>
    )}
    {data.media && (
      <div className="text-sm">
        <div className="space-y-1">
          <p><span className="">Target Location:</span> {data.media.targetLocation}</p>
          <p><span className="">Service:</span> {data.media.service}</p>
        </div>
      </div>
    )}
    {data.plumber && (
      <div className="text-sm">
        <div className="space-y-1">
          <p><span className="">Location:</span> {data.plumber.location}</p>
          <p><span className="">Date Needed:</span> {formatDate(data.plumber.dateNeeded)}</p>
        </div>
      </div>
    )}
    {data.hospitality && (
      <div className="text-sm">
        <div className="space-y-1">
          <p><span className="">Location:</span> {data.hospitality.location}</p>
          <p><span className="">Service:</span> {data.hospitality.service}</p>
          <p><span className="">Date Needed:</span> {formatDate(data.hospitality.dateNeeded)}</p>
          <p><span className="">Time Needed:</span> {data.hospitality.timeNeeded}</p>
        </div>
      </div>
    )}
    {data.eventManagement && (
      <div className="text-sm">
        <div className="space-y-1">
          <p><span className="">Location:</span> {data.eventManagement.location}</p>
          <p><span className="">Service:</span> {data.eventManagement.service}</p>
          <p><span className="">Event Location:</span> {data.eventManagement.eventLocation}</p>
          <p><span className="">Date Needed:</span> {formatDate(data.eventManagement.dateNeeded)}</p>
        </div>
      </div>
    )}
  </>
);

export default RequestDetailsSections;