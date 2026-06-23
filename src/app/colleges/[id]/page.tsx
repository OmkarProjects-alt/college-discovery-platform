import { getCollege } from "@/services/college.service";
import CollegeHeader from "@/components/collegeDeatail/collegeDetailHeader";
import CollegeMetaDeta from "@/components/collegeDeatail/CollegeMetaData";
import CollegeReview from "@/components/collegeDeatail/CollegeReview";
import RelatedCollege from "@/components/collegeDeatail/RelatedCollege";
import { Building2, Loader2 } from "lucide-react";
import { Suspense } from "react";

// Loading component
function DetailPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className=" mx-auto py-6 sm:py-8 lg:py-10">
        {/* Header Skeleton */}
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 animate-pulse">
          <div className="flex flex-col xl:flex-row gap-4 sm:gap-6">
            <div className="flex-1 bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
              <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
                <div className="w-full md:w-64 lg:w-72 xl:w-80 h-48 sm:h-56 md:h-48 lg:h-56 bg-gray-200 rounded-xl"></div>
                <div className="flex-1 space-y-4">
                  <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="bg-gray-200 rounded-lg h-16"></div>
                    ))}
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="flex gap-2">
                    <div className="h-10 bg-gray-200 rounded-lg w-24"></div>
                    <div className="h-10 bg-gray-200 rounded-lg w-24"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="xl:w-80 flex-shrink-0">
              <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-28 mb-4"></div>
                <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="contents">
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Meta Data Skeleton */}
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6 animate-pulse">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-5 h-5 bg-gray-200 rounded"></div>
                  <div className="h-5 bg-gray-200 rounded w-32"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews & Related Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8 mt-6">
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6 animate-pulse">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 bg-gray-200 rounded"></div>
                <div className="h-5 bg-gray-200 rounded w-32"></div>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6 animate-pulse">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 bg-gray-200 rounded"></div>
                <div className="h-5 bg-gray-200 rounded w-32"></div>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function CollegeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const college = await getCollege({ id });

  if (!college) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            College Not Found
          </h2>
          <p className="text-gray-500">
            The college you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<DetailPageSkeleton />}>
      <div className="min-h-screen bg-gray-50/50">
        <div className=" mx-auto py-6 sm:py-8 lg:py-10">
          <CollegeHeader
            id={college.id}
            name={college.name}
            location={college.location}
            established={college.established}
            naacGrade={college.naacGrade}
            instituteType={college.instituteType}
            imageUrl={college.imageUrl}
            rating={college.rating}
            overview={college.overview}
            link={college.link}
          />

          {/* College Metadata */}
          <CollegeMetaDeta
            courses={college.courses}
            instituteType={college.instituteType}
            naacGrade={college.naacGrade}
            rating={college.rating}
            fees={college.fees}
          />

          {/* Reviews & Related Colleges */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8 mt-6">
            <div className="lg:col-span-2">
              <CollegeReview reviews={college.reviews} />
            </div>
            <div>
              <RelatedCollege
                id={college.id}
                fees={college.fees}
                instituteType={college.instituteType}
              />
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}