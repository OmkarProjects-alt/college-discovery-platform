import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  MapPin, 
  IndianRupee, 
  Star, 
  GraduationCap, 
  Award, 
  Calendar,
  Building2,
  ArrowLeft,
  Briefcase,
  CheckCircle2
} from "lucide-react";

interface ComparePageProps {
  searchParams: Promise<{
    ids?: string;
  }>;
}

interface College {
  id: string;
  name: string;
  imageUrl: string | null;
  location: string;
  fees: number;
  rating: number;
  instituteType: string;
  naacGrade: string;
  established: number;
  placements: string | null;
}

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const params = await searchParams;
  const ids = params.ids?.split(",").filter(Boolean) || [];

  // Validation
  if (ids.length < 2 || ids.length > 5) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="text-center">
            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-amber-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Invalid Selection
            </h2>
            <p className="text-gray-600 mb-6">
              Please select between 2 and 5 colleges to compare
            </p>
            <Link
              href="/colleges"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Return
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const colleges = await prisma.college.findMany({
    where: { id: { in: ids } },
    select: {
      id: true,
      name: true,
      imageUrl: true,
      location: true,
      fees: true,
      rating: true,
      instituteType: true,
      naacGrade: true,
      established: true,
      placements: true,
    },
  });

  if (colleges.length !== ids.length) {
    notFound();
  }

  const bestFees = Math.min(...colleges.map(c => c.fees));
  const bestRating = Math.max(...colleges.map(c => c.rating));

  const fields = [
    { key: 'location' as const, label: 'Location', icon: MapPin },
    { key: 'fees' as const, label: 'Fees', icon: IndianRupee, format: (v: number) => `₹${v.toLocaleString()}` },
    { key: 'rating' as const, label: 'Rating', icon: Star, format: (v: number) => v.toFixed(1) },
    { key: 'instituteType' as const, label: 'Type', icon: GraduationCap },
    { key: 'naacGrade' as const, label: 'NAAC Grade', icon: Award },
    { key: 'established' as const, label: 'Established', icon: Calendar, format: (v: number) => v.toString() },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Compare Colleges
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {colleges.length} institutions · Side-by-side comparison
            </p>
          </div>
          <Link
            href="/colleges"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/50">
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                    Feature
                  </th>
                  {colleges.map((college, index) => (
                    <th key={college.id} className="px-6 py-4 text-center min-w-[200px]">
                      <div className="flex flex-col items-center">
                        <div className="relative w-24 h-16 rounded-lg overflow-hidden bg-gray-100 mb-2">
                          {college.imageUrl ? (
                            <img
                              src={college.imageUrl}
                              alt={college.name}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <Building2 className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="font-medium text-gray-900 text-xs leading-tight line-clamp-2">
                          {college.name}
                        </div>
                        <span className="text-[10px] text-gray-400 mt-0.5">
                          #{index + 1}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {fields.map((field, rowIndex) => {
                  const Icon = field.icon;
                  return (
                    <tr 
                      key={field.key}
                      className={`border-b border-gray-100 ${
                        rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                      }`}
                    >
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4 text-gray-400" />
                          <span className="text-xs font-medium text-gray-600">
                            {field.label}
                          </span>
                        </div>
                      </td>
                      {colleges.map((college) => {
                        const value = college[field.key];
                        const isBest = 
                          (field.key === 'fees' && value === bestFees) ||
                          (field.key === 'rating' && value === bestRating);
                        
                        let display = value?.toString() || '—';
                        if (field.format && value !== undefined && value !== null) {
                          display = field.format(value as any);
                        }

                        const isRating = field.key === 'rating';
                        const isNAAC = field.key === 'naacGrade';

                        return (
                          <td key={college.id} className="px-6 py-3.5 text-center">
                            <div className={`inline-flex items-center gap-1.5 ${
                              isBest ? 'font-semibold text-gray-900' : 'text-gray-700'
                            }`}>
                              {isRating &&  (
                                <div className="flex items-center gap-0.5 mr-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-3 h-3 ${
                                        i < Math.floor(value as number)
                                          ? 'fill-amber-400 text-amber-400'
                                          : 'fill-gray-200 text-gray-200'
                                      }`}
                                    />
                                  ))}
                                </div>
                              )}
                              <span className="text-sm">
                                {display}
                              </span>
                              {isBest && (
                                <span className="ml-1 text-[10px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                                  Best
                                </span>
                              )}
                              {isNAAC && value && (
                                <span className={`ml-1 text-[10px] font-medium px-1.5 py-0.5 rounded ${
                                  value === 'A++' || value === 'A+' 
                                    ? 'bg-emerald-50 text-emerald-700'
                                    : value === 'A'
                                    ? 'bg-blue-50 text-blue-700'
                                    : 'bg-gray-100 text-gray-600'
                                }`}>
                                  {value}
                                </span>
                              )}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}

                {/* Placements */}
                <tr className="border-t border-gray-200 bg-gray-50/30">
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <Briefcase className="w-4 h-4 text-gray-400" />
                      <span className="text-xs font-medium text-gray-600">
                        Placements
                      </span>
                    </div>
                  </td>
                  {colleges.map((college) => (
                    <td key={college.id} className="px-6 py-3.5 text-center">
                      {college.placements ? (
                        <span className="text-sm text-gray-700">
                          {college.placements}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-white px-5 py-4 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
              Average Rating
            </p>
            <p className="text-xl font-semibold text-gray-900 mt-1">
              {(colleges.reduce((acc, c) => acc + c.rating, 0) / colleges.length).toFixed(1)}
              <span className="text-sm font-normal text-gray-400 ml-1">/ 5.0</span>
            </p>
          </div>
          <div className="bg-white px-5 py-4 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
              Fee Range
            </p>
            <p className="text-xl font-semibold text-gray-900 mt-1">
              ₹{Math.min(...colleges.map(c => c.fees)).toLocaleString()}
              <span className="text-sm font-normal text-gray-400 mx-1">–</span>
              ₹{Math.max(...colleges.map(c => c.fees)).toLocaleString()}
            </p>
          </div>
          <div className="bg-white px-5 py-4 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
              Colleges Compared
            </p>
            <p className="text-xl font-semibold text-gray-900 mt-1">
              {colleges.length}
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-400 text-center mt-6">
          Data for comparison purposes only. Verify with official sources.
        </p>
      </div>
    </div>
  );
}