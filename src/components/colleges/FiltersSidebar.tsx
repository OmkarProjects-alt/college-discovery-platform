"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { X, Filter, RotateCcw } from "lucide-react";

export default function FiltersSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    const queryString = params.toString();
    router.push(`/colleges${queryString ? `?${queryString}` : ""}`);
  };

  const handleClearAll = () => {
    router.push("/colleges");
  };

  const getActiveFilterCount = () => {
    const filters = ["location", "course", "fees", "rating"];
    return filters.filter((key) => searchParams.get(key)).length;
  };

  const activeFilterCount = getActiveFilterCount();

  const currentLocation = searchParams.get("location") || "";
  const currentCourse = searchParams.get("course") || "";
  const currentFees = searchParams.get("fees") || "";
  const currentRating = searchParams.get("rating") || "";

  return (
    <aside className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 h-fit shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          {activeFilterCount > 0 && (
            <span className="ml-1 px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>

        <button
          onClick={handleClearAll}
          className={`
            inline-flex items-center gap-1.5 text-sm font-medium transition-colors
            ${activeFilterCount > 0 
              ? "text-indigo-600 hover:text-indigo-800" 
              : "text-gray-400 cursor-not-allowed"
            }
          `}
          disabled={activeFilterCount === 0}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Clear All
        </button>
      </div>

      <div className="mb-5">
        <label
          htmlFor="location"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Location
        </label>

        <select
          value={currentLocation}
          onChange={(e) => handleChange("location", e.target.value)}
          id="location"
          className="w-full rounded-xl border border-gray-300 px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all text-sm bg-white"
        >
          <option value="">All Locations</option>
          <option value="Pune">Pune</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="Delhi">Delhi</option>
          <option value="Chennai">Chennai</option>
          <option value="Rajasthan">Rajasthan</option>
          <option value="Karnataka">Karnataka</option>
          <option value="Odisha">Odisha</option>
        </select>
      </div>

      <div className="mb-5">
        <label
          htmlFor="course"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Course Type
        </label>

        <select
          value={currentCourse}
          onChange={(e) => handleChange("course", e.target.value)}
          id="course"
          className="w-full rounded-xl border border-gray-300 px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all text-sm bg-white"
        >
          <option value="">All Courses</option>
          <option value="B.Tech">B.Tech</option>
          <option value="B.E">B.E</option>
          <option value="BCA">BCA</option>
          <option value="MCA">MCA</option>
          <option value="M.Sc">M.Sc</option>
          <option value="B.Sc">B.Sc</option>
        </select>
      </div>

      <div className="mb-5">
        <label
          htmlFor="fees"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Max Fees
        </label>

        <select
          value={currentFees}
          onChange={(e) => handleChange("fees", e.target.value)}
          id="fees"
          className="w-full rounded-xl border border-gray-300 px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all text-sm bg-white"
        >
          <option value="">Any Fees</option>
          <option value="50000">₹50,000</option>
          <option value="100000">₹1,00,000</option>
          <option value="200000">₹2,00,000</option>
          <option value="300000">₹3,00,000</option>
          <option value="500000">₹5,00,000</option>
        </select>
      </div>

      <div className="mb-6">
        <label
          htmlFor="rating"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Min Rating
        </label>

        <select
          value={currentRating}
          onChange={(e) => handleChange("rating", e.target.value)}
          id="rating"
          className="w-full rounded-xl border border-gray-300 px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all text-sm bg-white"
        >
          <option value="">Any Rating</option>
          <option value="3">3.0+</option>
          <option value="3.5">3.5+</option>
          <option value="4">4.0+</option>
          <option value="4.5">4.5+</option>
        </select>
      </div>

      {activeFilterCount > 0 && (
        <div className="pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-2">Active Filters:</p>
          <div className="flex flex-wrap gap-1.5">
            {currentLocation && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-lg">
                {currentLocation}
                <button
                  onClick={() => handleChange("location", "")}
                  className="hover:bg-blue-100 rounded p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {currentCourse && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-lg">
                {currentCourse}
                <button
                  onClick={() => handleChange("course", "")}
                  className="hover:bg-purple-100 rounded p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {currentFees && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-lg">
                ₹{parseInt(currentFees).toLocaleString()}+
                <button
                  onClick={() => handleChange("fees", "")}
                  className="hover:bg-emerald-100 rounded p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {currentRating && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-700 text-xs rounded-lg">
                {currentRating}+ ⭐
                <button
                  onClick={() => handleChange("rating", "")}
                  className="hover:bg-amber-100 rounded p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}