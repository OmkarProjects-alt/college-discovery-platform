"use client";

import { useState } from "react";
import AddReviewModal from "./AddReview";
import { useAuth } from "@/context/AuthContext";

export default function AddReview({ collegeId }: { collegeId: string }) {

  const { user } = useAuth();

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (!user) {
      alert("Please login first to write a review");
      return;
    }

    setOpen(true);
  }

  return (
    <div>
      <button
        onClick={handleClick}
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
      >
        + Add Review
      </button>

      {open && (
        <AddReviewModal
          collegeId={collegeId}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}