'use client';

import { useEffect, useState, Suspense } from "react";
import { Loader2, CheckCircle, Clock, CreditCard, Hash, Tag, AlertCircle } from "lucide-react";
import axios from "axios"
import { useSearchParams } from "next/navigation";
import { CATEGORY_LABELS } from "@/data/data";
import { Loader } from "@/components/ui/Loader";

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
  <div className="mt-8 space-y-4">
    {!isPaid && !paymentReference && (
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Complete Payment</h3>
        <button
          className='bg-[#57132A] hover:bg-[#4a1022] py-4 px-6 rounded-lg flex items-center justify-center gap-3 w-full cursor-pointer text-white disabled:opacity-60 transition-colors font-medium'
          onClick={handleMakePayment}
          disabled={paymentLoading}
        >
          {paymentLoading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
              Processing Payment...
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5" />
              Make Payment
            </>
          )}
        </button>
      </div>
    )}
    
    {!isPaid && paymentReference && (
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Verify Payment</h3>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-blue-600" />
            <p className="text-sm text-blue-800">
              Please confirm that you have completed the payment process.
            </p>
          </div>
        </div>
        <button
          className='bg-[#57132A] hover:bg-[#4a1022] py-4 px-6 rounded-lg flex items-center justify-center gap-3 w-full cursor-pointer text-white disabled:opacity-60 transition-colors font-medium'
          onClick={handleVerifyPayment}
          disabled={paymentLoading}
        >
          {paymentLoading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
              Verifying Payment...
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5" />
              I have made the Payment
            </>
          )}
        </button>
      </div>
    )}
    
    {isPaid && (
      <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <div>
            <h3 className="text-lg font-semibold text-green-900">Payment Completed</h3>
            <p className="text-sm text-green-700 mt-1">Your payment has been successfully processed</p>
          </div>
        </div>
      </div>
    )}
    
    {paymentError && (
      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <p className="text-sm text-red-700">{paymentError}</p>
        </div>
      </div>
    )}
    
    {paymentSuccess && !isPaid && (
      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <p className="text-sm text-green-700">Payment successful!</p>
        </div>
      </div>
    )}
  </div>
);


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
    axios.get(`${BASE_URL}/v1/request/user/${requestId}`, {
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
    } catch (error) {
      if (error.response) {
            console.error("Error response:", error.response.data);
            throw error.response.data;
        } else if (error.request) {
            console.error("No response received:", error.request);
            throw error.request;
        } else {
            console.error("Error:", error.message);
            throw error.message;
        }
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
        <Loader />
      );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-lg shadow p-8 max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-red-600 mb-4">Error Loading Payment Details</h2>
          <p className="text-gray-600">{error.message || error.toString()}</p>
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-lg shadow p-8 max-w-md">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Request Found</h2>
          <p className="text-gray-600">The payment request could not be found.</p>
        </div>
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
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <CreditCard className="w-8 h-8 text-[#57132A]" />
            <h1 className="text-xl font-bold text-gray-900">Payment Details</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Status Banner */}
          <div className={`px-6 py-4 ${isPaid ? 'bg-green-50 border-b border-green-200' : 'bg-amber-50 border-b border-amber-200'}`}>
            <div className="flex items-center gap-3">
              {isPaid ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : (
                <Clock className="w-6 h-6 text-amber-600" />
              )}
              <div>
                <h3 className={`font-semibold ${isPaid ? 'text-green-900' : 'text-amber-900'}`}>
                  {isPaid ? 'Payment Completed' : 'Payment Pending'}
                </h3>
                <p className={`text-sm ${isPaid ? 'text-green-700' : 'text-amber-700'}`}>
                  {isPaid ? 'This payment has been successfully processed' : 'This payment is awaiting completion'}
                </p>
              </div>
            </div>
          </div>

          {/* Request Information */}
          <div className="px-6 py-8">
            <div className="flex items-center gap-3 mb-6">
              <Hash className="w-5 h-5 text-gray-500" />
              <h2 className="text-xl font-semibold text-gray-900">Request Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 bg-[#57132A] rounded-full"></div>
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Request ID</label>
                  </div>
                  <div className="pl-5">
                    <p className="text-md font-mono text-gray-900 bg-gray-50 px-3 py-2 rounded-lg border">{requestId}</p>
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-center gap-3 mb-2">
                    <Tag className="w-4 h-4 text-gray-500" />
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Category</label>
                  </div>
                  <div className="pl-7">
                    <p className="text-md text-gray-900">
                      {data.category ? (CATEGORY_LABELS[data.category] || data.category) : "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="group">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-gray-500">₦</span>
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Amount</label>
                  </div>
                  <div className="pl-7">
                    <p className="text-xl font-bold text-gray-900">
                      {data.amount ? `₦${Number(data.amount).toLocaleString()}` : "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-4 h-4 rounded-full ${isPaid ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Status</label>
                  </div>
                  <div className="pl-7">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      isPaid 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {isPaid ? "Paid" : "Pending"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

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
    </div>
  );
}

export default function PaymentDetailPage() {
  return (
    <Suspense fallback={
     <Loader />
    }>
      <PaymentDetailPageInner />
    </Suspense>
  );
}