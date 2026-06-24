"use client";

import { MessageSquare, LogIn, Lock } from "lucide-react";
import Link from "next/dist/client/link";

export default function RequiredLoginModal({
    open,
    onClose,
    message
}: {
    open: boolean;
    onClose: () => void;
    message?: string;
}) {

    return (
        <div>
            {open && (
                <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                onClick={(e) => {
                    if (e.target === e.currentTarget) onClose();
                }}
                >
                <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative animate-in slide-in-from-bottom-4 duration-300">
                    {/* Close button */}
                    <button
                    onClick={onClose}
                    className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Close"
                    >
                    <span className="text-2xl">&times;</span>
                    </button>

                    <div className="text-center">
                    {/* Icon */}
                    <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="w-10 h-10 text-indigo-600" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Login Required
                    </h3>
                    
                    <p className="text-gray-500 mb-6 leading-relaxed">
                        {message || "You need to be logged in to perform this action. Please log in to your account or register if you don't have one."}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                        href="/login"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-medium"
                        >
                        <LogIn className="w-4 h-4" />
                        Login Now
                        </Link>
                        <button
                        onClick={onClose}
                        className="flex-1 px-6 py-3 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                        >
                        Cancel
                        </button>
                    </div>

                    <p className="text-xs text-gray-400 mt-4">
                        Don't have an account?{" "}
                        <Link href="/register" className="text-indigo-600 hover:underline font-medium">
                        Register here
                        </Link>
                    </p>
                    </div>
                </div>
                </div>
            )}
        </div>
    )
}