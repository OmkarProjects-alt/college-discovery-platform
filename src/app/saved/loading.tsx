import { Bookmark } from "lucide-react";

export default function SavedCollegesLoading() {
  return (
    <div className="min-h-screen bg-gray-50/50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-8">
          <div className="animate-pulse">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-11 h-11 bg-gray-200 rounded-xl"></div>
              <div className="h-7 bg-gray-200 rounded w-48"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-32 ml-12"></div>
          </div>
          
          <div className="animate-pulse">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-xl h-10 w-28"></div>
          </div>
        </div>

        {/* Results Count Bar Skeleton */}
        <div className="bg-white px-4 py-3 rounded-xl border border-gray-200 shadow-sm animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-40"></div>
            </div>
            <div className="h-3 bg-gray-200 rounded w-24"></div>
          </div>
        </div>

        {/* College Cards Skeleton */}
        <div className="space-y-4 mt-4">
          {[1, 2, 3, 4, 5].map((index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm animate-pulse"
            >
              <div className="flex flex-col lg:flex-row gap-5">
                {/* Image Skeleton */}
                <div className="relative w-full lg:w-64 h-44 rounded-xl overflow-hidden flex-shrink-0 bg-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="h-7 bg-gray-200 rounded w-3/4"></div>
                    <div className="flex items-center gap-1 mt-2">
                      <div className="w-4 h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </div>
                    <div className="mt-3 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-4">
                    <div className="h-16 w-24 bg-gray-200 rounded-xl"></div>
                    <div className="h-16 w-24 bg-gray-200 rounded-xl"></div>
                    <div className="h-16 w-24 bg-gray-200 rounded-xl"></div>
                  </div>
                </div>

                <div className="flex lg:flex-col gap-3 justify-center">
                  <div className="h-10 w-28 bg-gray-200 rounded-lg"></div>
                  <div className="h-10 w-28 bg-gray-200 rounded-lg"></div>
                  <div className="h-10 w-28 bg-gray-200 rounded-lg"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Skeleton */}
        <div className="text-center pt-4 animate-pulse">
          <div className="h-3 bg-gray-200 rounded w-64 mx-auto"></div>
        </div>
      </div>
    </div>
  );
}