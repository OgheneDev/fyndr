import React from "react";
import Image from "next/image";
import { CATEGORY_LABELS } from "@/data/data";
import { formatDate } from "@/utils/dateUtils";
import { humanize } from "@/utils/humanize";

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

const getBudgetText = (data) => {
  if (data.realEstate?.lowerPriceLimit && data.realEstate?.upperPriceLimit) {
    return formatBudget(data.realEstate.lowerPriceLimit, data.realEstate.upperPriceLimit);
  }
  if (data.carHire?.lowerPriceLimit && data.carHire?.upperPriceLimit) {
    return formatBudget(data.carHire.lowerPriceLimit, data.carHire.upperPriceLimit);
  }
  if (data.cleaning?.lowerPriceLimit && data.cleaning?.upperPriceLimit) {
    return formatBudget(data.cleaning.lowerPriceLimit, data.cleaning.upperPriceLimit);
  }
  if (data.carPart?.lowerPriceLimit && data.carPart?.upperPriceLimit) {
    return formatBudget(data.carPart.lowerPriceLimit, data.carPart.upperPriceLimit);
  }
  if (data.automobile?.lowerPriceLimit && data.automobile?.upperPriceLimit) {
    return formatBudget(data.automobile.lowerPriceLimit, data.automobile.upperPriceLimit);
  }
  if (data.beauty?.lowerPriceLimit && data.beauty?.upperPriceLimit) {
    return formatBudget(data.beauty.lowerPriceLimit, data.beauty.upperPriceLimit);
  }
  if (data.catering?.lowerPriceLimit && data.catering?.upperPriceLimit) {
    return formatBudget(data.catering.lowerPriceLimit, data.catering.upperPriceLimit);
  }
  if (data.carpentry?.lowerPriceLimit && data.carpentry?.upperPriceLimit) {
    return formatBudget(data.carpentry.lowerPriceLimit, data.carpentry.upperPriceLimit);
  }
  if (data.electrician?.lowerPriceLimit && data.electrician?.upperPriceLimit) {
    return formatBudget(data.electrician.lowerPriceLimit, data.electrician.upperPriceLimit);
  }
  if (data.it?.lowerPriceLimit && data.it?.upperPriceLimit) {
    return formatBudget(data.it.lowerPriceLimit, data.it.upperPriceLimit);
  }
  if (data.mechanic?.lowerPriceLimit && data.mechanic?.upperPriceLimit) {
    return formatBudget(data.mechanic.lowerPriceLimit, data.mechanic.upperPriceLimit);
  }
  if (data.media?.lowerPriceLimit && data.media?.upperPriceLimit) {
    return formatBudget(data.media.lowerPriceLimit, data.media.upperPriceLimit);
  }
  if (data.plumber?.lowerPriceLimit && data.plumber?.upperPriceLimit) {
    return formatBudget(data.plumber.lowerPriceLimit, data.plumber.upperPriceLimit);
  }
  if (data.hospitality?.lowerPriceLimit && data.hospitality?.upperPriceLimit) {
    return formatBudget(data.hospitality.lowerPriceLimit, data.hospitality.upperPriceLimit);
  }
  if (data.eventManagement?.lowerPriceLimit && data.eventManagement?.upperPriceLimit) {
    return formatBudget(data.eventManagement.lowerPriceLimit, data.eventManagement.upperPriceLimit);
  }
  return "Not specified";
};

const RequestDetailsSections = ({ data }) => (
  <>
    <div>
      <article className="mb-3">
        <h4 className="font-semibold text-md mb-1">{data.title}</h4>
        <span className="uppercase font-semibold text-sm text-[#57132A]">
          {CATEGORY_LABELS[data.category] || data.category || "Unknown"}
        </span>
      </article>
      <div className="space-y-4 mb-4">
        <article>
          <span className="font-semibold mb-1 text-sm">Request ID</span>
          <p className="text-gray-700 text-[12px]">{data._id}</p>
        </article>
        <article>
          <span className="font-semibold mb-1 text-sm">Request Status</span>
          <p className="text-gray-700 text-[12px]">{data.requestStatus}</p>
        </article>
        <article>
          <span className="font-semibold mb-1 text-sm">Created At</span>
          <p className="text-gray-700 text-[12px]">{formatDate(data.createdAt)}</p>
        </article>
        <article>
          <span className="font-semibold mb-1 text-sm">Target State</span>
          <p className="text-gray-700 text-[12px]">{data.targetState}</p>
        </article>
        <article>
          <span className="font-semibold mb-1 text-sm">Target Axis</span>
          <p className="text-gray-700 text-[12px]">{data.targetAxis}</p>
        </article>
        <article>
          <span className="font-semibold mb-1 text-sm">Details</span>
          <p
            className="text-gray-700 text-[12px]"
            style={{ wordBreak: 'break-word' }}
          >
            {data.additionalDetails}
          </p>
        </article>
      </div>
      <div className="mb-5">
        <h4 className="text-sm font-semibold mb-2">Payment Info</h4>
        <div className="space-y-4 mb-4">
          <article>
            <span className="font-semibold mb-1 text-sm">Transaction Status</span>
            <p className="text-gray-700 text-[12px]">{humanize(data.transaction_status)}</p>
          </article>
          <article>
            <span className="font-semibold mb-1 text-sm">Transaction Reference</span>
            <p className="text-gray-700 text-[12px]">{data.transaction_reference}</p>
          </article>
          <article>
            <span className="font-semibold mb-1 text-sm">Payment Method</span>
            <p className="text-gray-700 text-[12px]">{humanize(data.payment_method)}</p>
          </article>
        </div>
      </div>
      <div className="border-t border-gray-300 pt-7">
        {data.carHire && (
          <div>
            <h4 className="text-sm font-semibold mb-2">Car Hire Details</h4>
            <div className="space-y-4">
              <article>
                <span className="font-semibold mb-1 text-sm">Car Type</span>
                <p className="text-gray-700 text-[12px]">{data.carHire.carType}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Hire Duration</span>
                <p className="text-gray-700 text-[12px]">{data.carHire.hireDuration}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Pickup Location</span>
                <p className="text-gray-700 text-[12px]">{data.carHire.pickupLocation}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Airport</span>
                <p className="text-gray-700 text-[12px]">{data.carHire.airport}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Travel</span>
                <p className="text-gray-700 text-[12px]">{data.carHire.travel ? "Yes" : "No"}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Price Range</span>
                <p className="text-gray-700 text-[12px]">{getBudgetText(data)}</p>
              </article>
            </div>
          </div>
        )}
        {data.cleaning && (
          <div>
            <h4 className="text-sm font-semibold mb-2">Cleaning Details</h4>
            <div className="space-y-4">
              <article>
                <span className="font-semibold mb-1 text-sm">Property Type</span>
                <p className="text-gray-700 text-[12px]">{data.cleaning.propertyType}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Property Location</span>
                <p className="text-gray-700 text-[12px]">{data.cleaning.propertyLocation}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Room Count</span>
                <p className="text-gray-700 text-[12px]">{data.cleaning.roomNumber}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Cleaning Type</span>
                <p className="text-gray-700 text-[12px]">{humanize(data.cleaning.cleaningType)}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Price Range</span>
                <p className="text-gray-700 text-[12px]">{getBudgetText(data)}</p>
              </article>
            </div>
          </div>
        )}
        {data.realEstate && (
          <div>
            <h4 className="text-sm font-semibold mb-2">Real Estate Details</h4>
            <div className="space-y-4">
              <article>
                <span className="font-semibold mb-1 text-sm">Rent Type</span>
                <p className="text-gray-700 text-[12px]">{humanize(data.realEstate.rentType)}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Property Type</span>
                <p className="text-gray-700 text-[12px]">{data.realEstate.propertyType}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Room Count</span>
                <p className="text-gray-700 text-[12px]">{data.realEstate.roomNumber}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Condition</span>
                <p className="text-gray-700 text-[12px]">{humanize(data.realEstate.condition)}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Price Range</span>
                <p className="text-gray-700 text-[12px]">{getBudgetText(data)}</p>
              </article>
            </div>
          </div>
        )}
        {data.carPart && (
          <div>
            <h4 className="text-sm font-semibold mb-2">Car Part Details</h4>
            <div className="space-y-4">
              <article>
                <span className="font-semibold mb-1 text-sm">Current Location</span>
                <p className="text-gray-700 text-[12px]">{data.carPart.currentLocation}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Sourcing Location</span>
                <p className="text-gray-700 text-[12px]">{data.carPart.sourcingLocation}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Car Make</span>
                <p className="text-gray-700 text-[12px]">{data.carPart.carMake}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Car Model</span>
                <p className="text-gray-700 text-[12px]">{data.carPart.carModel}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Car Year</span>
                <p className="text-gray-700 text-[12px]">{data.carPart.carYear}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Price Range</span>
                <p className="text-gray-700 text-[12px]">{getBudgetText(data)}</p>
              </article>
              {data.carPart.image && (
                <article>
                  <span className="font-semibold mb-1 text-sm">Image</span>
                  <Image src={data.carPart.image} alt="Car Part" width={50} height={50} className="mt-2 max-w-xs rounded" />
                </article>
              )}
            </div>
          </div>
        )}
        {data.automobile && (
          <div>
            <h4 className="text-sm font-semibold mb-2">Automobile Details</h4>
            <div className="space-y-4">
              <article>
                <span className="font-semibold mb-1 text-sm">Location</span>
                <p className="text-gray-700 text-[12px]">{data.automobile.location}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Car Make</span>
                <p className="text-gray-700 text-[12px]">{data.automobile.carMake}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Car Model</span>
                <p className="text-gray-700 text-[12px]">{data.automobile.carModel}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Car Year From</span>
                <p className="text-gray-700 text-[12px]">{data.automobile.carYearFrom}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Car Year To</span>
                <p className="text-gray-700 text-[12px]">{data.automobile.carYearTo}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Transmission</span>
                <p className="text-gray-700 text-[12px]">{humanize(data.automobile.transmission)}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Price Range</span>
                <p className="text-gray-700 text-[12px]">{getBudgetText(data)}</p>
              </article>
            </div>
          </div>
        )}
        {data.beauty && (
          <div>
            <h4 className="text-sm font-semibold mb-2">Beauty Details</h4>
            <div className="space-y-4">
              <article>
                <span className="font-semibold mb-1 text-sm">Target Location</span>
                <p className="text-gray-700 text-[12px]">{data.beauty.targetLocation}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Service</span>
                <p className="text-gray-700 text-[12px]">{data.beauty.service}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Date</span>
                <p className="text-gray-700 text-[12px]">{formatDate(data.beauty.date)}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Time</span>
                <p className="text-gray-700 text-[12px]">{data.beauty.time}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Price Range</span>
                <p className="text-gray-700 text-[12px]">{getBudgetText(data)}</p>
              </article>
            </div>
          </div>
        )}
        {data.catering && (
          <div>
            <h4 className="text-sm font-semibold mb-2">Catering Details</h4>
            <div className="space-y-4">
              <article>
                <span className="font-semibold mb-1 text-sm">Location</span>
                <p className="text-gray-700 text-[12px]">{data.catering.location}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Event Location</span>
                <p className="text-gray-700 text-[12px]">{data.catering.eventLocation}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Event Date</span>
                <p className="text-gray-700 text-[12px]">{formatDate(data.catering.eventDate)}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Price Range</span>
                <p className="text-gray-700 text-[12px]">{getBudgetText(data)}</p>
              </article>
            </div>
          </div>
        )}
        {data.carpentry && (
          <div>
            <h4 className="text-sm font-semibold mb-2">Carpentry Details</h4>
            <div className="space-y-4">
              <article>
                <span className="font-semibold mb-1 text-sm">Location</span>
                <p className="text-gray-700 text-[12px]">{data.carpentry.location}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Date Needed</span>
                <p className="text-gray-700 text-[12px]">{formatDate(data.carpentry.dateNeeded)}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Price Range</span>
                <p className="text-gray-700 text-[12px]">{getBudgetText(data)}</p>
              </article>
            </div>
          </div>
        )}
        {data.electrician && (
          <div>
            <h4 className="text-sm font-semibold mb-2">Electrician Details</h4>
            <div className="space-y-4">
              <article>
                <span className="font-semibold mb-1 text-sm">Location</span>
                <p className="text-gray-700 text-[12px]">{data.electrician.location}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Date Needed</span>
                <p className="text-gray-700 text-[12px]">{formatDate(data.electrician.dateNeeded)}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Price Range</span>
                <p className="text-gray-700 text-[12px]">{getBudgetText(data)}</p>
              </article>
            </div>
          </div>
        )}
        {data.it && (
          <div>
            <h4 className="text-sm font-semibold mb-2">IT Details</h4>
            <div className="space-y-4">
              <article>
                <span className="font-semibold mb-1 text-sm">Target Location</span>
                <p className="text-gray-700 text-[12px]">{data.it.targetLocation}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Service</span>
                <p className="text-gray-700 text-[12px]">{data.it.service}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Price Range</span>
                <p className="text-gray-700 text-[12px]">{getBudgetText(data)}</p>
              </article>
            </div>
          </div>
        )}
        {data.mechanic && (
          <div>
            <h4 className="text-sm font-semibold mb-2">Mechanic Details</h4>
            <div className="space-y-4">
              <article>
                <span className="font-semibold mb-1 text-sm">Current Location</span>
                <p className="text-gray-700 text-[12px]">{data.mechanic.currentLocation}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Car Make</span>
                <p className="text-gray-700 text-[12px]">{data.mechanic.carMake}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Car Model</span>
                <p className="text-gray-700 text-[12px]">{data.mechanic.carModel}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Year</span>
                <p className="text-gray-700 text-[12px]">{data.mechanic.year}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Transmission</span>
                <p className="text-gray-700 text-[12px]">{data.mechanic.transmission}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Price Range</span>
                <p className="text-gray-700 text-[12px]">{getBudgetText(data)}</p>
              </article>
            </div>
          </div>
        )}
        {data.media && (
          <div>
            <h4 className="text-sm font-semibold mb-2">Media Details</h4>
            <div className="space-y-4">
              <article>
                <span className="font-semibold mb-1 text-sm">Target Location</span>
                <p className="text-gray-700 text-[12px]">{data.media.targetLocation}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Service</span>
                <p className="text-gray-700 text-[12px]">{data.media.service}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Price Range</span>
                <p className="text-gray-700 text-[12px]">{getBudgetText(data)}</p>
              </article>
            </div>
          </div>
        )}
        {data.plumber && (
          <div>
            <h4 className="text-sm font-semibold mb-2">Plumber Details</h4>
            <div className="space-y-4">
              <article>
                <span className="font-semibold mb-1 text-sm">Location</span>
                <p className="text-gray-700 text-[12px]">{data.plumber.location}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Date Needed</span>
                <p className="text-gray-700 text-[12px]">{formatDate(data.plumber.dateNeeded)}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Price Range</span>
                <p className="text-gray-700 text-[12px]">{getBudgetText(data)}</p>
              </article>
            </div>
          </div>
        )}
        {data.hospitality && (
          <div>
            <h4 className="text-sm font-semibold mb-2">Hospitality Details</h4>
            <div className="space-y-4">
              <article>
                <span className="font-semibold mb-1 text-sm">Location</span>
                <p className="text-gray-700 text-[12px]">{data.hospitality.location}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Service</span>
                <p className="text-gray-700 text-[12px]">{data.hospitality.service}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Date Needed</span>
                <p className="text-gray-700 text-[12px]">{formatDate(data.hospitality.dateNeeded)}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Time Needed</span>
                <p className="text-gray-700 text-[12px]">{data.hospitality.timeNeeded}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Price Range</span>
                <p className="text-gray-700 text-[12px]">{getBudgetText(data)}</p>
              </article>
            </div>
          </div>
        )}
        {data.eventManagement && (
          <div>
            <h4 className="text-sm font-semibold mb-2">Event Management Details</h4>
            <div className="space-y-4">
              <article>
                <span className="font-semibold mb-1 text-sm">Location</span>
                <p className="text-gray-700 text-[12px]">{data.eventManagement.location}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Service</span>
                <p className="text-gray-700 text-[12px]">{data.eventManagement.service}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Event Location</span>
                <p className="text-gray-700 text-[12px]">{data.eventManagement.eventLocation}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Date Needed</span>
                <p className="text-gray-700 text-[12px]">{formatDate(data.eventManagement.dateNeeded)}</p>
              </article>
              <article>
                <span className="font-semibold mb-1 text-sm">Price Range</span>
                <p className="text-gray-700 text-[12px]">{getBudgetText(data)}</p>
              </article>
            </div>
          </div>
        )}
      </div>
    </div>
  </>
);

export default RequestDetailsSections;