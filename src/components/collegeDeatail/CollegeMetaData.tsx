import { LucideBookOpen, Building2, IndianRupeeIcon, SchoolIcon, CheckIcon, Star } from "lucide-react";

type Props = {
  courses: {
    id: string;
    name: string;
    collegeId: string;
    duration: string | null;
  }[];
  fees: number | null;
  instituteType: string | null;
  naacGrade: string | null;
  rating: number;
  isLoading?: boolean;
};

export default function CollegeMetaData({
  courses,
  instituteType,
  naacGrade,
  rating,
  fees,
  isLoading = false,
}: Props) {
  const facilities = [
    "Modern Classrooms",
    "Wi-Fi Campus",
    "Library",
    "Sports Complex",
    "Cafeteria",
    "Hostel Accommodation",
  ];

  const getNaacColor = (grade: string | null) => {
    if (!grade) return "text-gray-600 bg-gray-50";
    if (grade === "A++" || grade === "A+") return "text-emerald-600 bg-emerald-50";
    if (grade === "A") return "text-blue-600 bg-blue-50";
    if (grade === "B++" || grade === "B+") return "text-amber-600 bg-amber-50";
    return "text-gray-600 bg-gray-50";
  };

  // Loading skeleton
  const Skeleton = () => (
    <div className="space-y-3 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
    </div>
  );

  const SkeletonCard = () => (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-5 h-5 bg-gray-200 rounded"></div>
        <div className="h-5 bg-gray-200 rounded w-32"></div>
      </div>
      <Skeleton />
    </div>
  );

  if (isLoading) {
    return (
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-4">
            <LucideBookOpen className="w-5 h-5 text-indigo-600" />
            Popular Courses
          </h2>
          
          <div className="space-y-3">
            {courses.length > 0 ? (
              courses.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                >
                  <span className="text-sm font-medium text-gray-800">
                    {course.name}
                  </span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    {course.duration || "N/A"}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No courses available</p>
            )}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-4">
            <Building2 className="w-5 h-5 text-indigo-600" />
            College Details
          </h2>
          
          <div className="grid grid-cols-2 gap-3">
            <div className={`rounded-lg p-3 text-center ${getNaacColor(naacGrade)}`}>
              <p className="text-lg font-bold">{naacGrade || "-"}</p>
              <p className="text-xs font-medium uppercase tracking-wider opacity-75">
                NAAC Grade
              </p>
            </div>

            <div className="bg-amber-50 rounded-lg p-3 text-center text-amber-600">
              <p className="text-lg font-bold flex items-center justify-center gap-1">
                <Star className="w-4 h-4 fill-current" />
                {rating.toFixed(1)}
              </p>
              <p className="text-xs font-medium uppercase tracking-wider opacity-75">
                Rating
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-3 text-center text-purple-600">
              <p className="text-lg font-bold truncate">{instituteType || "-"}</p>
              <p className="text-xs font-medium uppercase tracking-wider opacity-75">
                Institute Type
              </p>
            </div>

            <div className="bg-emerald-50 rounded-lg p-3 text-center text-emerald-600">
              <p className="text-lg font-bold flex items-center justify-center gap-0.5">
                <IndianRupeeIcon className="w-4 h-4" />
                {fees ? fees.toLocaleString() : "-"}
              </p>
              <p className="text-xs font-medium uppercase tracking-wider opacity-75">
                Fees (per year)
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-4">
            <SchoolIcon className="w-5 h-5 text-indigo-600" />
            Campus Facilities
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {facilities.map((facility, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm text-gray-700"
              >
                <CheckIcon className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>{facility}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}