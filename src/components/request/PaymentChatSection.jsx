import React from "react";
import { Loader2, MessagesSquare } from "lucide-react";

const PaymentChatSection = ({
  userType,
  isPaid,
  paymentReference,
  paymentLoading,
  paymentError,
  paymentSuccess,
  handleMakePayment,
  handleVerifyPayment,
  handleContactUser
}) => ( 
  <div className="mt-6">
    {userType === "user" && (
      <>
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
      </>
    )}
    {userType === "merchant" && (
      <button
        className='bg-[#57132A] py-3 px-5 rounded-md flex items-center justify-center gap-3 w-full cursor-pointer text-white'
        onClick={handleContactUser}
      >
        <MessagesSquare size={18} />
        Chat with user
      </button>
    )}
  </div>
);

export default PaymentChatSection;
