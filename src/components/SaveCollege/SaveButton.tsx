"use client";

import { useAuth } from "@/context/AuthContext";
import { useSavedColleges } from "@/hooks/useSavedColleges";
import { useState } from "react";
import { saveCollege, removedSavedCollege } from "@/services/college.service";
import { useError } from "@/context/ErrorAndSuccessMsgContext";
import { Bookmark, BookmarkCheck, Loader2, AlertCircle, LogIn } from "lucide-react";
import RequiredLoginModal from "../RequiredLoginModal";
import { useRouter } from "next/navigation";

interface SaveButtonProps {
  collegeId: string;
  variant?: "default" | "compact" | "icon";
  className?: string;
}

export default function SaveButton({ 
  collegeId, 
  variant = "default",
  className = ""
}: SaveButtonProps) {
  const { user } = useAuth();
  const router = useRouter();
  const { addMessage } = useError();
  const { savedIds, setSavedIds } = useSavedColleges();
  const [loading, setLoading] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  

  const isSaved = savedIds.includes(collegeId);

  const handleClick = async () => {

    if (!user) {
      setShowLoginPrompt(true);
      return;
    }

    setLoading(true);

    try {
      if (isSaved) {
        const res = await removedSavedCollege(collegeId);
        if (res.success) {
          setSavedIds((prev) => prev.filter((id) => id !== collegeId));
          addMessage("College removed from your saved list", true);
        }
      } else {
        const res = await saveCollege(collegeId);
        if (res.success) {
          setSavedIds((prev) => [...prev, collegeId]);
          addMessage("College saved successfully", true);
        }
      }
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message || error.message || "Something went wrong";
      addMessage(errorMsg, false);
    } finally {
      setLoading(false);
    }
  };

  // Variant styles
  const variants = {
    default: {
      base: "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
      saved: "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 focus:ring-emerald-500",
      unsaved: "inline-flex items-center gap-1.5 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors text-sm font-medium",
      loading: "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed",
    },
    compact: {
      base: "inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
      saved: "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 focus:ring-emerald-500",
      unsaved: "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200 focus:ring-gray-500",
      loading: "bg-gray-50 text-gray-400 border border-gray-200 cursor-not-allowed",
    },
    icon: {
      base: "inline-flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
      saved: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 focus:ring-emerald-500",
      unsaved: "bg-gray-100 text-gray-500 hover:bg-gray-200 focus:ring-gray-500",
      loading: "bg-gray-50 text-gray-300 cursor-not-allowed",
    },
  };

  const currentVariant = variants[variant];

  const getContent = () => {
    if (loading) {
      return (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Saving...</span>
        </>
      );
    }

    if (isSaved) {
      return (
        <>
          <BookmarkCheck className="w-4 h-4" />
          <span className={variant === "icon" ? "sr-only" : ""}>Saved</span>
        </>
      );
    }

    return (
      <>
        <Bookmark className="w-4 h-4" />
        <span className={variant === "icon" ? "sr-only" : ""}>Save</span>
      </>
    );
  };

  const getButtonStyles = () => {
    if (loading) {
      return currentVariant.loading;
    }

    if (isSaved) {
      return currentVariant.saved;
    }

    return currentVariant.unsaved;
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={handleClick}
          disabled={loading}
          className={`w-full cursor-pointer ${currentVariant.base} ${getButtonStyles()} ${className}`}
          aria-label={isSaved ? "Remove from saved" : "Save college"}
          title={isSaved ? "Remove from saved" : "Save college"}
        >
          {getContent()}
        </button>

      </div>

      {showLoginPrompt && (
        <RequiredLoginModal
          open={showLoginPrompt}
          onClose={() => setShowLoginPrompt(false)}
          message="Please log in to your account to save this college."
        />
      )}

    </>
  );
}