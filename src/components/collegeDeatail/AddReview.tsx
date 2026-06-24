"use client";

import { useState } from "react";
import { createReview } from "@/services/review.service";
import { useRouter } from "next/navigation";
import { useError } from "@/context/ErrorAndSuccessMsgContext";
import { X, Star, Loader2, AlertCircle } from "lucide-react";

type Props = {
  collegeId: string;
  onClose: () => void;
};

export default function AddReviewModal({
  collegeId,
  onClose,
}: Props) {
  const router = useRouter();
  const { addMessage } = useError();

  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validate
    if (!comment.trim()) {
      addMessage("Please share your experience");
      return;
    }

    if (rating < 1 || rating > 5) {
      addMessage("Please select a valid rating");
      return;
    }

    try {
      setLoading(true);

      await createReview({
        collegeId,
        comment: comment.trim(),
        rating,
      });

      addMessage("Review submitted successfully!", true);
      setComment("");
      setRating(5);
      onClose();
      router.refresh();
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to submit review";
      addMessage(errorMsg, false);
    } finally {
      setLoading(false);
    }
  }

  // Handle escape key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  // Handle click outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
    >
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl relative animate-in slide-in-from-bottom-4 duration-300">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Write a Review
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Share your experience with this college
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating
            </label>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = (hoveredRating || rating) >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(null)}
                    className="p-1 transition-transform hover:scale-110 focus:outline-none"
                    aria-label={`Rate ${star} stars`}
                  >
                    <Star
                      className={`w-8 h-8 ${
                        isFilled
                          ? "fill-amber-400 text-amber-400"
                          : "fill-gray-200 text-gray-200"
                      } transition-colors duration-150`}
                    />
                  </button>
                );
              })}
              <span className="ml-2 text-sm font-medium text-gray-600">
                {rating}/5
              </span>
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Review
            </label>
            <textarea
              rows={4}
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Share your experience with this college..."
              className={`w-full border rounded-xl p-3 resize-none outline-none transition-colors focus:ring-2 ${
                error
                  ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-100"
              }`}
            />
            {error && (
              <div className="flex items-center gap-1.5 mt-1.5 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-medium transition-all duration-200 ${
              loading
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Submitting...</span>
              </div>
            ) : (
              <span>Submit Review</span>
            )}
          </button>
        </form>

        {/* Footer note */}
        <p className="text-xs text-gray-400 text-center mt-4">
          Your review will be visible to other users
        </p>
      </div>
    </div>
  );
}