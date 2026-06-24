"use client";

import { useState } from "react";
import AddReviewModal from "./AddReview";
import { useAuth } from "@/context/AuthContext";
import { useError } from "@/context/ErrorAndSuccessMsgContext";
import RequiredLoginModal from "../RequiredLoginModal";
import Link from "next/link";

export default function AddReview({ collegeId }: { collegeId: string }) {
  const { user } = useAuth();
  const { addMessage } = useError();
  const [open, setOpen] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleClick = () => {
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }
    setOpen(true);
  };

  const handleLoginPromptClose = () => {
    setShowLoginPrompt(false);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
      >
        + Add Review
      </button>

      {/* Login Prompt Modal */}

        {showLoginPrompt && (
          <RequiredLoginModal
            open={showLoginPrompt}
            onClose={handleLoginPromptClose}
            message="Please log in to your account to add a review for this college."
          />
        )}

      {/* Add Review Modal */}
      {open && (
        <AddReviewModal
          collegeId={collegeId}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}