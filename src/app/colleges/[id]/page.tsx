import { getCollege } from "@/services/college.service";
import CollegeHeader from "@/components/collegeDeatail/collegeDetailHeader";
import CollegeMetaDeta from "@/components/collegeDeatail/CollegeMetaData";
import CollegeReview from "@/components/collegeDeatail/CollegeReview";
import RelatedCollege from "@/components/collegeDeatail/RelatedCollege";
import { Building2, Loader2 } from "lucide-react";


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
  );
}