'use client';
import { useEffect, useState, Suspense } from "react";
import { Bell } from "lucide-react";
import { getUserRequestById } from "@/api/requests/users/requests";
import {
    acceptMerchantInterest,
    cancelUserRequest,
    closeUserRequest,
    chooseMerchantForRequest
} from "@/api/requests/users/requests";
import { rateMerchant } from "@/api/ratings/requests";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

// Modularized components
import RequestDetailsHeader from "@/components/request/RequestDetailsHeader";
import RequestDetailsSections from "@/components/request/RequestDetailsSections";
import InterestedMerchants from "@/components/request/InterestedMerchants";
import RequestActions from "@/components/request/RequestActions";
import RatingModal from "@/components/request/RatingModal";
import { PaymentDetails } from "@/components/request/PaymentDetails";
import { ToggleButtons } from "@/components/request/ToggleButtons";

function UserRequestDetailPageInner() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('details');
    const [reloadFlag, setReloadFlag] = useState(0);
    const [actionLoading, setActionLoading] = useState(false);
    const [actionError, setActionError] = useState(null);
    const [chooseMerchantId, setChooseMerchantId] = useState("");
    const [chooseMerchantLoading, setChooseMerchantLoading] = useState(false);
    const [cancelLoading, setCancelLoading] = useState(false);
    const [closeLoading, setCloseLoading] = useState(false);
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [review, setReview] = useState("");
    const [ratingLoading, setRatingLoading] = useState(false);
    const [ratingError, setRatingError] = useState(null);
    const [ratingSuccess, setRatingSuccess] = useState(false);

    // Touch/swipe state
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            if (activeTab === 'details') setActiveTab('merchants');
            else if (activeTab === 'merchants') setActiveTab('payment');
        }
        if (isRightSwipe) {
            if (activeTab === 'payment') setActiveTab('merchants');
            else if (activeTab === 'merchants') setActiveTab('details');
        }
    };

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        getUserRequestById(id)
            .then(data => {
                setRequest(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, [id, reloadFlag]);

    const handleBack = () => {
        router.back();
    };

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
        } finally {
            setCloseLoading(false);
        }
    };

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

    const handleSubmitRating = async () => {
        const acceptedMerchant = request?.interestedMerchants?.find(m => m.isAccepted);
        const payload = {
            merchantId: acceptedMerchant?.merchant?._id,
            rating,
            review
        };
        if (!acceptedMerchant?.merchant?._id) {
            setRatingError("No accepted merchant found to rate.");
            return;
        }
        if (rating < 1 || rating > 5) {
            setRatingError("Please select a rating between 1 and 5.");
            return;
        }
        setRatingLoading(true);
        setRatingError(null);
        try {
            await rateMerchant(payload);
            setRatingSuccess(true);
            setShowRatingModal(false);
            setReloadFlag(f => f + 1);
        } catch (err) {
            setRatingError(err.response?.data?.message || err.message || "Failed to submit rating.");
        } finally {
            setRatingLoading(false);
        }
    };

    if (loading) {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="animate-pulse">
                <Image
                    src="/images/logo.png"
                    alt="Company Logo"
                    width={100}
                    height={100}
                    className="transition-all duration-1000 hover:scale-110"
                />
            </div>
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
            <div className="text-center py-10">
          <div className="mb-5">
            <Bell className="w-12 h-12 mx-auto text-gray-500" />
          </div>
          <span>No request found.</span>
        </div>
        );
    }

    const data = request?.data || request;

    return (
        <div className="min-h-screen pb-[60px] md:max-w-4xl  md:mx-auto md:pt-[80px] pt-[72px]">
            <RequestDetailsHeader onBack={handleBack} />
            <div className="px-4 sm:px-6 lg:px-8">
                <ToggleButtons activeTab={activeTab} setActiveTab={setActiveTab} merchants={data.interestedMerchants} />
                <div 
                    className="relative overflow-hidden"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
                    <div 
    className={`w-full transition-transform duration-300 ease-in-out ${
        activeTab === 'details' ? 'translate-x-0' : activeTab === 'merchants' ? '-translate-x-full' : '-translate-x-[200%]'
    }`}
>
    <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
        <RequestDetailsSections data={data} />
        <RequestActions
            onCancel={handleCancelRequest}
            onClose={handleCloseRequest}
            cancelLoading={cancelLoading}
            closeLoading={closeLoading}
            actionError={actionError}
        />
    </div>
</div>
                    <div 
                        className={`absolute top-0 left-0 w-full transition-transform duration-300 ease-in-out ${
                            activeTab === 'details' ? 'translate-x-full' : activeTab === 'merchants' ? 'translate-x-0' : '-translate-x-full'
                        }`}
                    >
                        {data.interestedMerchants && data.interestedMerchants.length > 0 ? (
                            <>
                                <InterestedMerchants
                                    merchants={data.interestedMerchants}
                                    onAccept={handleAcceptMerchant}
                                    actionLoading={actionLoading}
                                />
                                {/*<ChooseMerchant
                                    merchants={data.interestedMerchants}
                                    chooseMerchantId={chooseMerchantId}
                                    setChooseMerchantId={setChooseMerchantId}
                                    onChoose={handleChooseMerchant}
                                    loading={chooseMerchantLoading}
                                />*/}
                            </>
                        ) : (
                            <div className="text-center py-10">
          <div className="mb-5">
            <Bell className="w-12 h-12 mx-auto text-gray-500" />
          </div>
          <span>No merchants available.</span>
        </div>
                        )}
                    </div>
                    <div 
                        className={`absolute top-0 left-0 w-full transition-transform duration-300 ease-in-out ${
                            activeTab === 'payment' ? 'translate-x-0' : 'translate-x-full'
                        }`}
                    >
                        <PaymentDetails data={data} />
                    </div>
                </div>
            </div>
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

export default function UserRequestDetailPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">
            <div className="animate-pulse">
                <Image
                    src="/images/logo.png"
                    alt="Company Logo"
                    width={100}
                    height={100}
                    className="transition-all duration-1000 hover:scale-110"
                />
            </div>
        </div>}>
            <UserRequestDetailPageInner />
        </Suspense>
    );
}