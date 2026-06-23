"use client"

import { MapPin, Star, Bookmark, GitCompare, Calendar, Building2, Award, ExternalLink, ArrowLeft } from "lucide-react";
import QuickFact from "./QuickFact";
import { useRouter } from "next/navigation";
import SaveButton from "../SaveCollege/SaveButton";
import CompareButton from "../compare/CompareButton";

type Props = {
  id: string;
  name: string;
  location: string;
  rating: number;
  imageUrl: string | null;
  overview: string;
  established: number | null;
  naacGrade: string | null;
  instituteType: string | null;
  link: string | null;
};

export default function CollegeHeader({
  id,
  name,
  location,
  rating,
  imageUrl,
  overview,
  established,
  naacGrade,
  instituteType,
  link,
}: Props) {
  // Get NAAC grade color
  const getNaacColor = (grade: string | null) => {
    if (!grade) return "text-gray-600";
    if (grade === "A++" || grade === "A+") return "text-emerald-600";
    if (grade === "A") return "text-blue-600";
    if (grade === "B++" || grade === "B+") return "text-amber-600";
    return "text-gray-600";
  };

  const router = useRouter();
  const naacColor = getNaacColor(naacGrade);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-4 ">
      <div className="flex justify-end">
         <button
          onClick={() => router.back()}
          className="flex items-center mb-3 px-3 gap-2 p-1 bg-white shadow-lg cursor-pointer rounded-md"
        >
          <ArrowLeft size={20} />
          Back
        </button>
      </div>
      <div className="flex flex-col xl:flex-row gap-4 sm:gap-6">
        <div className="flex-1 bg-white shadow-sm border border-gray-200 rounded-xl p-4 sm:p-6">
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
            
            <div className="relative w-full md:w-64 lg:w-72 xl:w-80 h-48 sm:h-56 md:h-48 lg:h-56 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={name}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 320px"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Building2 className="w-12 h-12 text-gray-400" />
                </div>
              )}
            </div>

            <div className="flex-1 flex flex-col gap-3 min-w-0">
              
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                  {name}
                </h1>
                <div className="flex items-center gap-1 text-gray-600 text-sm mt-1">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{location}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                <div className="bg-gray-50 rounded-lg px-3 py-2 text-center border border-gray-100">
                  <div className="flex items-center justify-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-base font-semibold text-gray-900">
                      {rating.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wider">
                    Rating
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg px-3 py-2 text-center border border-gray-100">
                  <p className={`text-base font-semibold ${naacColor}`}>
                    {naacGrade || "-"}
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wider">
                    NAAC Grade
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg px-3 py-2 text-center border border-gray-100">
                  <p className="text-base font-semibold text-gray-900 truncate">
                    {instituteType || "-"}
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wider">
                    Type
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg px-3 py-2 text-center border border-gray-100">
                  <p className="text-base font-semibold text-gray-900">
                    {established || "-"}
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wider">
                    Est. Year
                  </p>
                </div>
              </div>

              {overview && (
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 sm:line-clamp-3">
                  {overview}
                </p>
              )}

              <div className="flex flex-wrap gap-2 sm:gap-3 mt-auto pt-2">
                <CompareButton id={id} />

                <SaveButton collegeId={id} />

                {link && (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium ml-auto"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="xl:w-80 flex-shrink-0">
          <QuickFact
            location={location}
            established={established}
            instituteType={instituteType}
            link={link}
          />
        </div>
      </div>
    </div>
  );
}