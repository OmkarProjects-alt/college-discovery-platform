import { getRelatedCollege } from "@/services/college.service";
import { Building2, Star, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type Props = {
  id: string;
  fees: number;
  instituteType: string | null;
  isLoading?: boolean;
};

export default async function RelatedCollege({ id, fees, instituteType, isLoading = false }: Props) {
  const relatedCollege = await getRelatedCollege({ id, fees, instituteType });

  // Loading skeleton
  const SkeletonItem = () => (
    <div className="flex gap-3 p-2 animate-pulse">
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-lg flex-shrink-0"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="flex gap-3">
          <div className="h-3 bg-gray-200 rounded w-12"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-5 h-5 bg-gray-200 rounded"></div>
          <div className="h-5 bg-gray-200 rounded w-32"></div>
        </div>
        <div className="space-y-4">
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6">
      <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-4">
        <Building2 className="w-5 h-5 text-indigo-600" />
        Related Colleges
      </h3>
      
      <div className="space-y-4">
        {relatedCollege.length > 0 ? (
          relatedCollege.map((college) => (
            <Link
              href={`/colleges/${college.id}`}
              key={college.id}
              className="flex gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="relative w-25 h-16 sm:w-25 sm:h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                {college.imageUrl ? (
                  <img
                    src={college.imageUrl}
                    alt={college.name}
                    className="object-cover group-hover:scale-105 transition-transform duration-300 h-full w-full"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Building2 className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 text-sm truncate group-hover:text-indigo-600 transition-colors">
                  {college.name}
                </h4>
                
                <div className="flex flex-wrap items-center gap-3 mt-1">
                  <div className="flex items-center gap-0.5 text-sm text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-medium text-gray-700">
                      {college.rating.toFixed(1)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-0.5 text-sm text-gray-500">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="truncate">{college.location}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">
            No related colleges found
          </p>
        )}
      </div>
    </div>
  );
}