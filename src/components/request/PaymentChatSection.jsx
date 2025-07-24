import React, { useState } from "react";
import { Loader2 } from "lucide-react";

const PaymentChatSection = ({
  userType,
  isPaid,
  paymentReference,
  paymentLoading,
  paymentError,
  paymentSuccess,
  handleMakePayment,
  handleVerifyPayment,
  handleContactUser,
}) => {
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [proposal, setProposal] = useState("");
  const [proposalLoading, setProposalLoading] = useState(false);
  const [proposalError, setProposalError] = useState(null);
  const [proposalSuccess, setProposalSuccess] = useState(false);

  const handleProposalSubmit = async () => {
    if (!proposal.trim()) {
      setProposalError("Proposal cannot be empty.");
      return;
    }
    setProposalLoading(true);
    setProposalError(null);
    setProposalSuccess(false);
    try {
      await handleContactUser(proposal);
      setProposalSuccess(true);
      setProposal("");
      setShowProposalModal(false);
    } catch (err) {
      setProposalError(err?.message || "Failed to send proposal.");
    } finally {
      setProposalLoading(false);
    }
  };

  return (
    <div className="mt-6">
      {userType === "user" && (
        <>
          {!isPaid && !paymentReference && (
            <button
              className="bg-[#57132A] py-3 px-5 rounded-md flex items-center justify-center gap-3 w-full cursor-pointer text-white disabled:opacity-60"
              onClick={handleMakePayment}
              disabled={paymentLoading}
            >
              {paymentLoading ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4" />
                  Processing...
                </>
              ) : (
                "Make Payment"
              )}
            </button>
          )}
          {!isPaid && paymentReference && (
            <button
              className="bg-[#57132A] py-3 px-5 rounded-md flex items-center justify-center gap-3 w-full cursor-pointer text-white disabled:opacity-60"
              onClick={handleVerifyPayment}
              disabled={paymentLoading}
            >
              {paymentLoading ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4" />
                  Verifying...
                </>
              ) : (
                "I have made the Payment"
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
        <>
          <button
            className="bg-[#57132A] py-3 px-5 rounded-md text-sm text-center gap-3 w-full cursor-pointer text-white"
            onClick={() => setShowProposalModal(true)}
          >
            Send a Proposal
          </button>
          {/* Proposal Modal */}
          <div
            className={`fixed inset-x-0 bottom-0 bg-white shadow-lg rounded-t-lg p-6 transition-transform duration-300 ease-in-out transform z-150 md:max-w-lg md:mx-auto md:rounded-b-lg ${
              showProposalModal ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <div className="mb-4">
              <h3 className="text-lg text-center font-semibold">Send Proposal</h3>
            </div>
            <textarea
              className="w-full p-3 border rounded-md outline-none border-gray-300 resize-none"
              rows="4"
              placeholder="Your Message"
              value={proposal}
              onChange={(e) => setProposal(e.target.value)}
            />
            {proposalError && (
              <div className="text-red-600 mt-2 text-sm">{proposalError}</div>
            )}
            {proposalSuccess && (
              <div className="text-green-600 mt-2 text-sm">
                Proposal sent successfully!
              </div>
            )}
            <div className="mt-4">
              <button
                className="bg-[#57132A] py-2 px-4 rounded-md text-white w-full text-sm flex items-center justify-center gap-2 disabled:opacity-60"
                onClick={handleProposalSubmit}
                disabled={proposalLoading}
              >
                {proposalLoading && <Loader2 className="animate-spin w-4 h-4" />}
                Send Proposal
              </button>
            </div>
          </div>
          {/* Overlay for modal */}
          {showProposalModal && (
            <div
              className="fixed inset-0 bg-black/40 bg-opacity-50 z-40"
              onClick={() => setShowProposalModal(false)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default PaymentChatSection;