'use client'

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getRequestById } from "@/api/requests/users/requests";
import { initiatePayment, verifyPayment } from "@/api/payments/requests";

const RequestDetailPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id")
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [paymentError, setPaymentError] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [paymentReference, setPaymentReference] = useState(null);
    const [authorizationUrl, setAuthorizationUrl] = useState(null);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        getRequestById(id)
            .then(data => {
                setRequest(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, [id]);

    // On mount, if request has transaction_reference, set it
    useEffect(() => {
        if (request && request.transaction_reference) {
            setPaymentReference(request.transaction_reference);
        }
    }, [request]);

    const handleBack = () => {
        router.back();
    };

    const handleContactUser = () => {
        // Add your contact logic here
        console.log("Contact user clicked");
    };

    const handleMakePayment = async () => {
        setPaymentLoading(true);
        setPaymentError(null);
        setPaymentSuccess(false);
        try {
            const initRes = await initiatePayment({ requestId: id });
            // Get reference and authorization_url from response
            const reference = initRes.reference || initRes.data?.reference;
            const authUrl = initRes.authorization_url || initRes.data?.authorization_url;
            if (!reference || !authUrl) {
                setPaymentError("No payment reference or authorization URL returned from server.");
                setPaymentLoading(false);
                return;
            }
            setPaymentReference(reference);
            setAuthorizationUrl(authUrl);
            // Redirect to Paystack
            window.location.href = authUrl;
        } catch (err) {
            setPaymentError(
                (err && err.message) || (typeof err === "string" ? err : "Payment failed.")
            );
        } finally {
            setPaymentLoading(false);
        }
    };

    const handleVerifyPayment = async () => {
        if (!paymentReference) {
            setPaymentError("No payment reference found.");
            return;
        }
        setPaymentLoading(true);
        setPaymentError(null);
        setPaymentSuccess(false);
        try {
            const verifyRes = await verifyPayment({ requestId: id, reference: paymentReference });
            if (verifyRes.status === "success" || verifyRes.verified) {
                setPaymentSuccess(true);
            } else {
                setPaymentError("Payment verification failed.");
            }
        } catch (err) {
            setPaymentError(
                (err && err.message) || (typeof err === "string" ? err : "Payment verification failed.")
            );
        } finally {
            setPaymentLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-lg text-gray-600">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="text-red-600 text-lg mb-4">Error loading request</div>
                    <div className="text-gray-600">{error.message || error.toString()}</div>
                </div>
            </div>
        );
    }

    
if (!request) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-lg text-gray-600">No request found.</div>
        </div>
    );
}

// Use request directly instead of request.data
const data = request;


    const formatBudget = (lower, upper) => {
        if (lower && upper) {
            return `₦${lower} - ₦${upper}`;
        }
        return "Not specified";
    };
    

    const getLocationText = () => {
        if (data.carHire?.pickupLocation) return data.carHire.pickupLocation;
        if (data.cleaning?.propertyLocation) return data.cleaning.propertyLocation;
        if (data.targetState) return data.targetState;
        if (data.carPart?.currentLocation) return data.carPart.currentLocation;
        if (data.automobile?.location) return data.automobile.location;
        return "Location not specified";
    };

    const getBudgetText = () => {
        if (data.realEstate?.lowerPriceLimit && data.realEstate?.upperPriceLimit) {
            return formatBudget(data.realEstate.lowerPriceLimit, data.realEstate.upperPriceLimit);
        }
        if (data.automobile?.lowerPriceLimit && data.automobile?.upperPriceLimit) {
            return formatBudget(data.automobile.lowerPriceLimit, data.automobile.upperPriceLimit);
        }
        return "Not specified";
    };

    const getDeadlineText = () => {
        if (data.deadline) {
            return new Date(data.deadline).toLocaleDateString();
        }
        return "ASAP";
    };

    return (
        <div className="min-h-screen">
            {/* Header */}
            <div className="bg-white px-4 py-4">
                <div className="flex items-center">
                    <button 
                        onClick={handleBack}
                        className="mr-4 p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6 text-gray-700" />
                    </button>
                    <h1 className="text-xl font-semibold text-gray-900">Request Details</h1>
                </div>
            </div>

            {/* Content */}
            <div className="px-6 py-6 space-y-8">
                {/* Service Category */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Service Category</h2>
                    <p className="text-gray-700 text-base">{data.category || "Plumbing"}</p>
                </div>

                {/* Specific Requirements */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Specific Requirements</h2>
                    <p className="text-gray-700 text-base leading-relaxed">
                        {data.additionalDetails || "No additional details."}
                    </p>
                </div>

                {/* Location */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Location</h2>
                    <p className="text-gray-700 text-base">{getLocationText()}</p>
                </div>

                {/* Budget */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Budget</h2>
                    <p className="text-gray-700 text-base">{getBudgetText()}</p>
                </div>

                {/* Deadline */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Deadline</h2>
                    <p className="text-gray-700 text-base">{getDeadlineText()}</p>
                </div>

                {/* Service-specific details sections */}
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
                            <p className="text-gray-700"><span className="font-medium">Lower Price Limit:</span> {data.realEstate.lowerPriceLimit}</p>
                            <p className="text-gray-700"><span className="font-medium">Upper Price Limit:</span> {data.realEstate.upperPriceLimit}</p>
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
                                    <img src={data.carPart.image} alt="Car Part" className="mt-2 max-w-xs rounded" />
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

                {/* Interested Merchants */}
                {data.interestedMerchants && data.interestedMerchants.length > 0 && (
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">Interested Merchants</h2>
                        <div className="space-y-4">
                            {data.interestedMerchants.map((merchant) => (
                                <div key={merchant._id} className="bg-white p-4 rounded-lg border border-gray-200">
                                    <p className="text-gray-700 mb-2"><span className="font-medium">Merchant:</span> {merchant.merchant}</p>
                                    <p className="text-gray-700 mb-2"><span className="font-medium">Message:</span> {merchant.message}</p>
                                    <p className="text-gray-700"><span className="font-medium">Status:</span> {merchant.isAccepted ? "Accepted" : "Pending"}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {/* Payment Button and Status */}
                <div className="mt-6">
                    {!paymentReference && (
                        <button
                            className='bg-[#57132A] py-2 px-5 rounded-full text-sm cursor-pointer text-white disabled:opacity-60'
                            onClick={handleMakePayment}
                            disabled={paymentLoading}
                        >
                            {paymentLoading ? "Processing..." : "Make Payment"}
                        </button>
                    )}
                    {paymentReference && (
                        <button
                            className='bg-blue-700 py-2 px-5 rounded-full text-sm cursor-pointer text-white disabled:opacity-60'
                            onClick={handleVerifyPayment}
                            disabled={paymentLoading}
                        >
                            {paymentLoading ? "Verifying..." : "I've made the payment"}
                        </button>
                    )}
                    {paymentError && (
                        <div className="text-red-600 mt-2 text-sm">{paymentError}</div>
                    )}
                    {paymentSuccess && (
                        <div className="text-green-600 mt-2 text-sm">Payment successful!</div>
                    )}
                </div>
            </div>

            
        </div>
    );
};

export default RequestDetailPage;