export default function LoginLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border border-neutral-300 animate-pulse">
        
        {/* Title Skeleton */}
        <div className="h-9 bg-gray-200 rounded-lg w-48 mx-auto"></div>
        
        {/* Subtitle Skeleton */}
        <div className="h-4 bg-gray-200 rounded-lg w-32 mx-auto mt-2"></div>

        {/* Form Skeleton */}
        <div className="mt-8 space-y-4">
          {/* Email Field */}
          <div>
            <div className="h-4 bg-gray-200 rounded w-12 mb-1"></div>
            <div className="w-full h-12 bg-gray-200 rounded-lg"></div>
          </div>

          {/* Password Field */}
          <div>
            <div className="h-4 bg-gray-200 rounded w-16 mb-1"></div>
            <div className="w-full h-12 bg-gray-200 rounded-lg"></div>
          </div>

          {/* Submit Button Skeleton */}
          <div className="w-full h-12 bg-gray-200 rounded-lg"></div>
        </div>

        {/* Register Link Skeleton */}
        <div className="flex justify-center mt-6">
          <div className="h-4 bg-gray-200 rounded w-48"></div>
        </div>
      </div>
    </div>
  );
}