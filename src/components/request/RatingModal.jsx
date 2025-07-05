import React from "react";
import { Star } from "lucide-react";

const RatingModal = ({
  show,
  onClose,
  rating,
  setRating,
  hoverRating,
  setHoverRating,
  review,
  setReview,
  loading,
  error,
  success,
  onSubmit
}) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/40 bg-opacity-70"></div>
      <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-4 p-8 z-10">
        <h2 className="text-xl font-bold mb-4">Rate Merchant</h2>
        <p className="mb-2 text-gray-700">How would you rate your experience?</p>
        <div className="flex items-center mb-4">
          {[1,2,3,4,5].map(star => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="focus:outline-none"
            >
              <Star
                size={32}
                className={
                  (hoverRating || rating) >= star
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }
                fill={(hoverRating || rating) >= star ? "#facc15" : "none"}
              />
            </button>
          ))}
        </div>
        <textarea
          className="border border-gray-300 rounded outline-0 px-3 py-2 w-full mb-4"
          placeholder="Write a review"
          value={review}
          onChange={e => setReview(e.target.value)}
          rows={3}
          disabled={loading}
        />
        <div className="flex gap-3 mt-2">
          <button
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded text-sm cursor-pointer"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="bg-[#57132A] text-white cursor-pointer text-sm px-4 py-2 rounded disabled:opacity-60"
            onClick={onSubmit}
            disabled={loading || rating === 0}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
        {error && (
          <div className="text-red-600 mt-2 text-sm">{error}</div>
        )}
        {success && (
          <div className="text-green-600 mt-2 text-sm">Thank you for your feedback!</div>
        )}
      </div>
    </div>
  );
};

export default RatingModal;
