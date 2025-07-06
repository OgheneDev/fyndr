'use client'

import { useEffect, useState, Suspense } from "react";
import { Loader2 } from "lucide-react";
import { getUserRequestById } from "@/api/requests/users/requests";
import { getMerchantRequestById } from "@/api/requests/merchants/requests";
import { initiatePayment, verifyPayment } from "@/api/payments/requests";
import { rateMerchant } from "@/api/ratings/requests";
import { startNewChat } from "@/api/messages/requests";
import { useUserStore } from "@/store/userStore";
import {
    acceptMerchantInterest,
    cancelUserRequest,
    closeUserRequest,
    chooseMerchantForRequest
} from "@/api/requests/users/requests";
import { useRouter, useSearchParams } from "next/navigation";


// Modularized components
import RequestDetailsHeader from "@/components/request/RequestDetailsHeader";
import RequestDetailsSections from "@/components/request/RequestDetailsSections";
import InterestedMerchants from "@/components/request/InterestedMerchants";
import ChooseMerchant from "@/components/request/ChooseMerchant";
import RequestActions from "@/components/request/RequestActions";
import PaymentChatSection from "@/components/request/PaymentChatSection";
import RatingModal from "@/components/request/RatingModal";

// Add this mapping before the component
const CATEGORY_LABELS = {
    "real-estate": "Real Estate",
    "car-hire": "Car Hire",
    "car-parts": "Car Parts",
    "cleaning": "Cleaning",
    "automobile": "Automobile"
};

// Move the main logic to an inner component
function RequestDetailPageInner() {
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
    const userType = useUserStore((state) => state.userType);
    const userData = useUserStore((state) => state.userData);
    const [reloadFlag, setReloadFlag] = useState(0);
    const [actionLoading, setActionLoading] = useState(false);
    const [actionError, setActionError] = useState(null);
    const [chooseMerchantId, setChooseMerchantId] = useState("");

    // Loading states for separate actions
    const [chooseMerchantLoading, setChooseMerchantLoading] = useState(false);
    const [cancelLoading, setCancelLoading] = useState(false);
    const [closeLoading, setCloseLoading] = useState(false);

    // Rating state
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [review, setReview] = useState("");
    const [ratingLoading, setRatingLoading] = useState(false);
    const [ratingError, setRatingError] = useState(null);
    const [ratingSuccess, setRatingSuccess] = useState(false);

    // Determine user type from store or fallback to request path
    const [resolvedUserType, setResolvedUserType] = useState(userType);

    useEffect(() => {
        // If userType is not set, try to infer from userData or fallback logic
        if (!userType && userData) {
            if (userData.role === "merchant" || userData.type === "merchant") {
                setResolvedUserType("merchant");
            } else {
                setResolvedUserType("user");
            }
        } else if (userType) {
            setResolvedUserType(userType);
        }
    }, [userType, userData]);

    useEffect(() => {
        if (!id || !resolvedUserType) return;
        setLoading(true);
        const fetchRequest =
            resolvedUserType === "merchant"
                ? getMerchantRequestById
                : getUserRequestById;
        fetchRequest(id)
            .then(data => {
                setRequest(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, [id, resolvedUserType, reloadFlag]);

    // On mount, if request has transaction_reference, set it
    useEffect(() => {
        if (request && request.transaction_reference) {
            setPaymentReference(request.transaction_reference);
        }
    }, [request]);

    const handleBack = () => {
        router.back();
    };

    const handleContactUser = async () => {
        if (userType !== "merchant") return;
        try {
            const res = await startNewChat({ requestId: id });
            if (res && res.data) {
                // Store chat data in localStorage for the messages page to pick up
                localStorage.setItem('fynder_selected_chat', JSON.stringify(res.data));
                router.push('/dashboard/messages');
            }
        } catch (err) {
            // Optionally show error to user
            alert(
                (err && err.message) ||
                (typeof err === "string" ? err : "Failed to start chat.")
            );
        }
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
  setPaymentLoading(true);
  setPaymentError(null);
  try {
    await verifyPayment({ requestId: id, reference: paymentReference });
    // Option 1: Force reload
    window.location.reload();
    // Option 2: Or, update state to set isPaid = true (if you want to avoid reload)
  } catch (error) {
    setPaymentError(error?.message || "Payment verification failed");
  } finally {
    setPaymentLoading(false);
  }
};

    // Accept merchant interest handler
    const handleAcceptMerchant = async (interestId) => {
        setActionLoading(true);
        setActionError(null);
        try {
            await acceptMerchantInterest(id, interestId);
            setReloadFlag(f => f + 1);
        } catch (err) {
            setActionError(
                (err && err.message) || (typeof err === "string" ? err : "Failed to accept merchant.")
            );
        } finally {
            setActionLoading(false);
        }
    };

    // Cancel request handler
    const handleCancelRequest = async () => {
        setCancelLoading(true);
        setActionError(null);
        try {
            await cancelUserRequest(id);
            setReloadFlag(f => f + 1);
        } catch (err) {
            setActionError(
                (err && err.message) || (typeof err === "string" ? err : "Failed to cancel request.")
            );
        } finally {
            setCancelLoading(false);
        }
    };

   const handleCloseRequest = async () => {
    setCloseLoading(true);
    setActionError(null);
    try {
        await closeUserRequest(id);
        setShowRatingModal(true);
        setRating(0);
        setHoverRating(0);
        setReview("");
        setRatingError(null);
        setRatingSuccess(false);
    } catch (err) {
        setActionError(err?.message || "Failed to close request.");
        console.error("Error in handleCloseRequest:", err);
    } finally {
        setCloseLoading(false);
    }
};

    // Choose merchant handler
    const handleChooseMerchant = async () => {
        if (!chooseMerchantId) return;
        setChooseMerchantLoading(true);
        setActionError(null);
        try {
            await chooseMerchantForRequest(id, chooseMerchantId);
            setReloadFlag(f => f + 1);
        } catch (err) {
            setActionError(
                (err && err.message) || (typeof err === "string" ? err : "Failed to choose merchant.")
            );
        } finally {
            setChooseMerchantLoading(false);
        }
    };
    

    // Find accepted merchant (if any)
    const acceptedMerchant = request?.interestedMerchants?.find(m => m.isAccepted);


    const handleSubmitRating = async () => {
    console.log("Request:", request); // Debug log
    console.log("Accepted Merchant:", acceptedMerchant); // Debug log
    const payload = {
        merchantId: acceptedMerchant?.merchant?._id,
        rating,
        review
    };
    console.log("Payload to rateMerchant:", payload); // Log payload
    if (!acceptedMerchant?.merchant?._id) {
        setRatingError("No accepted merchant found to rate.");
        console.error("Interested Merchants:", request?.interestedMerchants);
        return;
    }
    if (rating < 1 || rating > 5) {
        setRatingError("Please select a rating between 1 and 5.");
        return;
    }
    setRatingLoading(true);
    setRatingError(null);
    try {
        const response = await rateMerchant(payload);
        console.log("rateMerchant Response:", response); // Log successful response
        setRatingSuccess(true);
        setShowRatingModal(false);
        setReloadFlag(f => f + 1); // Reload after rating
    } catch (err) {
        console.error("rateMerchant Error:", err.response?.data || err.message); // Log error details
        setRatingError(err.response?.data?.message || err.message || "Failed to submit rating.");
    } finally {
        setRatingLoading(false);
    }
};

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader2 className="animate-spin w-10 h-10 text-gray-500" />
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

    const data = request?.data || request;

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

    // Determine if paid (robust for your API structure)
    const isPaid =
        data?.transaction_status === "completed" ||
        data?.requestStatus === "paid" ||
        data?.requestStatus === "completed" ||
        paymentSuccess;

    // Only show merchant management features if paid
    const showMerchantActions = isPaid;

    return (
        <div className="min-h-screen pb-[60px]">
            {/* Header */}
            <RequestDetailsHeader onBack={handleBack} />

            {/* Content */}
            <div className="px-6 py-6 space-y-8">
                <RequestDetailsSections data={data} />

                {/* Interested Merchants */}
                {showMerchantActions && data.interestedMerchants && data.interestedMerchants.length > 0 && (
                    <InterestedMerchants
                        merchants={data.interestedMerchants}
                        onAccept={handleAcceptMerchant}
                        actionLoading={actionLoading}
                    />
                )}

                {/* Choose Merchant */}
                {showMerchantActions && data.interestedMerchants && data.interestedMerchants.length > 0 && (
                    <ChooseMerchant
                        merchants={data.interestedMerchants}
                        chooseMerchantId={chooseMerchantId}
                        setChooseMerchantId={setChooseMerchantId}
                        onChoose={handleChooseMerchant}
                        loading={chooseMerchantLoading}
                    />
                )}

                {/* Cancel and Close Request Buttons */}
                {showMerchantActions && (
                    <RequestActions
                        onCancel={handleCancelRequest}
                        onClose={handleCloseRequest}
                        cancelLoading={cancelLoading}
                        closeLoading={closeLoading}
                        actionError={actionError}
                    />
                )}

                {/* Payment/Chat Button and Status */}
                <PaymentChatSection 
                    userType={userType}
                    isPaid={isPaid}
                    paymentReference={paymentReference}
                    paymentLoading={paymentLoading}
                    paymentError={paymentError}
                    paymentSuccess={paymentSuccess}
                    handleMakePayment={handleMakePayment}
                    handleVerifyPayment={handleVerifyPayment}
                    handleContactUser={handleContactUser}
                />
            </div>

            {/* Rating Modal */}
            <RatingModal
                show={showRatingModal}
                onClose={() => setShowRatingModal(false)}
                rating={rating}
                setRating={setRating}
                hoverRating={hoverRating}
                setHoverRating={setHoverRating}
                review={review}
                setReview={setReview}
                loading={ratingLoading}
                error={ratingError}
                success={ratingSuccess}
                onSubmit={handleSubmitRating}
            />
        </div>
    );
}

export default function RequestDetailPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <RequestDetailPageInner />
        </Suspense>
    );
}