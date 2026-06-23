"use client";

import { useState, useEffect } from "react";
import CollegeCard from "./CollegeCard";
import { College } from "@/types/college";
import { useInView } from "react-intersection-observer";
import { 
  Building2, 
  Search, 
  Filter, 
  Loader2, 
  AlertCircle,
  School,
  MapPin,
  Star,
  IndianRupee
} from "lucide-react";

interface CollegeListProps {
  initialColleges: College[];
  filters: {
    location?: string;
    search?: string;
    rating?: string;
    fees?: string;
  };
  totalCount?: number;
}

export default function CollegeList({ 
  initialColleges, 
  filters,
  totalCount = 0 
}: CollegeListProps) {
  const [colleges, setColleges] = useState(initialColleges);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { ref, inView } = useInView();

  // Count active filters
  const activeFilters = Object.values(filters).filter(Boolean).length;

  async function loadMore() {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: String(page),
        ...filters,
      });

      const res = await fetch(`/api/colleges?${params.toString()}`);

      if (!res.ok) {
        throw new Error("Failed to load more colleges");
      }

      const newColleges = await res.json();

      if (!newColleges.length) {
        setHasMore(false);
        return;
      }

      setColleges((prev) => [...prev, ...newColleges]);
      setPage((prev) => prev + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setColleges(initialColleges);
    setPage(2);
    setHasMore(true);
    setError(null);
  }, [initialColleges, filters]);

  useEffect(() => {
    if (inView && !loading && hasMore && !error) {
      loadMore();
    }
  }, [inView, loading, hasMore, error]);

  // No colleges found state
  if (!colleges.length && !loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="relative">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
              <School className="w-10 h-10 text-gray-400" />
            </div>
            <div className="absolute -top-1 -right-1 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
              <Search className="w-4 h-4 text-amber-600" />
            </div>
          </div>
          
          <h3 className="mt-6 text-lg font-semibold text-gray-900">
            No Colleges Found
          </h3>
          
          <p className="mt-2 text-sm text-gray-500 text-center max-w-md">
            We couldn&apos;t find any colleges matching your current filters. 
            Try adjusting your search criteria or clear some filters.
          </p>

          {activeFilters > 0 && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-lg text-xs text-gray-600">
                <Filter className="w-3.5 h-3.5" />
                <span>{activeFilters} active filter{activeFilters > 1 ? 's' : ''}</span>
              </div>
              {filters.search && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs">
                  <Search className="w-3 h-3" />
                  {filters.search}
                </span>
              )}
              {filters.location && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-xs">
                  <MapPin className="w-3 h-3" />
                  {filters.location}
                </span>
              )}
              {filters.rating && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-xs">
                  <Star className="w-3 h-3" />
                  {filters.rating}+
                </span>
              )}
              {filters.fees && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-xs">
                  <IndianRupee className="w-3 h-3" />
                  {filters.fees}
                </span>
              )}
            </div>
          )}

        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header with results count */}
      <div className="flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">
              {colleges.length} {colleges.length === 1 ? 'college' : 'colleges'}
            </span>
          </div>
          {totalCount > 0 && totalCount !== colleges.length && (
            <span className="text-xs text-gray-400">
              of {totalCount} total
            </span>
          )}
          {activeFilters > 0 && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-600">
              <Filter className="w-3 h-3" />
              {activeFilters} filter{activeFilters > 1 ? 's' : ''}
            </span>
          )}
        </div>
        {loading && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            Loading...
          </div>
        )}
      </div>

      {/* College Cards */}
      <div className="grid gap-4">
        {colleges.map((college) => (
          <CollegeCard
            key={college.id}
            college={college}
          />
        ))}
      </div>

      {/* Load More / Error States */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
          <button
            onClick={() => {
              setError(null);
              loadMore();
            }}
            className="px-4 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
          >
            Retry
          </button>
        </div>
      )}

      {hasMore && !error && (
        <div
          ref={ref}
          className="flex items-center justify-center py-6"
        >
          {loading ? (
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
              <span>Loading more colleges...</span>
            </div>
          ) : (
            <div className="text-xs text-gray-400">
              Scroll for more
            </div>
          )}
        </div>
      )}

      {!hasMore && colleges.length > 0 && (
        <div className="flex items-center justify-center py-6">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <div className="w-8 h-px bg-gray-200" />
            <span>You&apos;ve seen all {colleges.length} colleges</span>
            <div className="w-8 h-px bg-gray-200" />
          </div>
        </div>
      )}
    </div>
  );
}