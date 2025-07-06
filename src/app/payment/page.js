'use client';

import { useEffect, useState, Suspense } from "react";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

const BASE_URL = "https://rheel-compare.onrender.com/api";

// Payment Section Component
const PaymentSection = ({
  isPaid,
  paymentReference,
  paymentLoading,
  paymentError,
  paymentSuccess,
  handleMakePayment,
  handleVerifyPayment
}) => (
  <div className="mt-6">
    {!isPaid && !paymentReference && (
      <button
        className='bg-[#57132A] py-3 px-5 rounded-md flex items-center justify-center gap-3 w-full cursor-pointer text-white disabled:opacity-60'
        onClick={handleMakePayment}
        disabled={paymentLoading}
      >
        {paymentLoading ? (
          <>
            <Loader2 className="animate-spin w-4 h-4" />
            Processing...
          </>
        ) : (
          'Make Payment'
        )}
      </button>
    )}
    {!isPaid && paymentReference && (
      <button
        className='bg-[#57132A] py-3 px-5 rounded-md flex items-center justify-center gap-3 w-full cursor-pointer text-white disabled:opacity-60'
        onClick={handleVerifyPayment}
        disabled={paymentLoading}
      >
        {paymentLoading ? (
          <>
            <Loader2 className="animate-spin w-4 h-4" />
            Verifying...
          </>
        ) : (
          'I have made the Payment'
        )}
      </button>
    )}
    {isPaid && (
      <div className="flex items-center justify-center gap-2 mt-2">
        <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
          Payment Completed
        </span>
      </div>
    )}
    {paymentError && (
      <div className="text-red-600 mt-2 text-sm">{paymentError}</div>
    )}
    {paymentSuccess && !isPaid && (
      <div className="text-green-600 mt-2 text-sm">Payment successful!</div>
    )}
  </div>
);

const CATEGORY_LABELS = {
  "real-estate": "Real Estate",
  "car-hire": "Car Hire",
  "car-parts": "Car Parts",
  "cleaning": "Cleaning",
  "automobile": "Automobile"
};

function PaymentDetailPageInner() {
  const searchParams = useSearchParams();
  const requestId = searchParams.get("id");
  const token = searchParams.get("token");
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentReference, setPaymentReference] = useState(null);
  const [authorizationUrl, setAuthorizationUrl] = useState(null);

  useEffect(() => {
    if (!requestId) {
      setError(new Error("Missing request ID"));
      setLoading(false);
      return;
    }
    if (!token) {
      setError(new Error("No authorization token provided"));
      setLoading(false);
      return;
    }

    setLoading(true);
    axios.get(`${BASE_URL}/v1/requests/${requestId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setRequest(response.data);
        setLoading(false);
        if (response.data.transaction_reference) {
          setPaymentReference(response.data.transaction_reference);
        }
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [requestId, token]);

  const handleMakePayment = async () => {
    setPaymentLoading(true);
    setPaymentError(null);
    setPaymentSuccess(false);
    try {
      const response = await axios.post(
        `${BASE_URL}/v1/payment/initiate`,
        { requestId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const reference = response.data.reference || response.data.data?.reference;
      const authUrl = response.data.authorization_url || response.data.data?.authorization_url;
      if (!reference || !authUrl) {
        throw new Error("No payment reference or authorization URL returned from server.");
      }
      setPaymentReference(reference);
      setAuthorizationUrl(authUrl);
      window.location.href = authUrl;
    } catch (err) {
      setPaymentError(err.message || "Payment initiation failed.");
    } finally {
      setPaymentLoading(false);
    }
  };

  const handleVerifyPayment = async () => {
    setPaymentLoading(true);
    setPaymentError(null);
    try {
      await axios.post(
        `${BASE_URL}/v1/payment/verify`,
        { requestId, reference: paymentReference },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPaymentSuccess(true);
      setLoading(true);
      axios.get(`${BASE_URL}/v1/requests/${requestId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          setRequest(response.data);
          setLoading(false);
        })
        .catch(err => {
          setError(err);
          setLoading(false);
        });
    } catch (err) {
      setPaymentError(err.message || "Payment verification failed.");
    } finally {
      setPaymentLoading(false);
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
          <div className="text-red-600 text-lg mb-4">Error loading payment details</div>
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
  const isPaid =
    data?.transaction_status === "completed" ||
    data?.requestStatus === "paid" ||
    data?.requestStatus === "completed" ||
    paymentSuccess;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Payment Details</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900">Request Information</h2>
          <div className="mt-4 space-y-4">
            <div>
              <span className="text-sm font-medium text-gray-500">Request ID:</span>
              <span className="ml-2 text-gray-900">{requestId}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Category:</span>
              <span className="ml-2 text-gray-900">
                {data.category ? (CATEGORY_LABELS[data.category] || data.category) : "N/A"}
              </span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Amount:</span>
              <span className="ml-2 text-gray-900">
                {data.amount ? `₦${data.amount}` : "Not specified"}
              </span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Status:</span>
              <span className="ml-2 text-gray-900">
                {isPaid ? "Paid" : "Pending"}
              </span>
            </div>
          </div>

DESCENDANTS:
  <PaymentSection
    isPaid={isPaid}
    paymentReference={paymentReference}
    paymentLoading={paymentLoading}
    paymentError={paymentError}
    paymentSuccess={paymentSuccess}
    handleMakePayment={handleMakePayment}
    handleVerifyPayment={handleVerifyPayment}
  />
        </div>
      </div>
    </div>
  );
}

export default function PaymentDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <PaymentDetailPageInner />
    </Suspense>
  );
}