import { Filter, Search } from "lucide-react";

export default function CollegesLoading() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        
        {/* Header Section Skeleton */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="animate-pulse">
            <div className="h-8 sm:h-9 bg-gray-200 rounded-lg w-64 sm:w-80"></div>
            <div className="h-4 sm:h-5 bg-gray-200 rounded-lg w-48 sm:w-64 mt-2"></div>
          </div>

          <div className="w-full lg:w-auto animate-pulse">
            <div className="md:w-lg">
              <div className="relative">
                <div className="w-full h-12 bg-gray-200 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="mt-6 sm:mt-8">
          
          {/* Mobile Filter Toggle Skeleton */}
          <div className="lg:hidden flex items-center justify-between mb-4 animate-pulse">
            <div className="h-10 w-24 bg-gray-200 rounded-lg"></div>
            <div className="h-5 w-20 bg-gray-200 rounded"></div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
            
            {/* Desktop Sidebar Skeleton */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 animate-pulse">
                <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 h-fit shadow-sm">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-gray-300" />
                      <div className="h-6 w-16 bg-gray-200 rounded"></div>
                    </div>
                    <div className="h-5 w-16 bg-gray-200 rounded"></div>
                  </div>

                  {/* Filter Fields */}
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="mb-5">
                      <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
                      <div className="w-full h-11 bg-gray-200 rounded-xl"></div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            {/* College List Skeleton */}
            <div className="space-y-4">
              {/* Results Header Skeleton */}
              <div className="flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-gray-200 shadow-sm animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 bg-gray-200 rounded"></div>
                  <div className="h-5 w-24 bg-gray-200 rounded"></div>
                </div>
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
              </div>

              {/* College Cards Skeleton */}
              {[1, 2, 3, 4, 5, 6].map((index) => (
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

                    {/* Content Skeleton */}
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

                    {/* Actions Skeleton */}
                    <div className="flex lg:flex-col gap-3 justify-center">
                      <div className="h-10 w-28 bg-gray-200 rounded-lg"></div>
                      <div className="h-10 w-28 bg-gray-200 rounded-lg"></div>
                      <div className="h-10 w-28 bg-gray-200 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Load More Skeleton */}
              <div className="flex items-center justify-center py-6 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
                  <div className="h-4 w-36 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}