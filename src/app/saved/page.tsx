import CollegeCard from "@/components/colleges/CollegeCard";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Bookmark, LogIn, ArrowRight, BookOpen } from "lucide-react";

export default async function SavedCollegesPage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <LogIn className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Login Required
          </h2>
          <p className="text-gray-500 mb-6">
            Please login to view and manage your saved colleges
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-medium"
          >
            <LogIn className="w-4 h-4" />
            Login Now
          </Link>
        </div>
      </div>
    );
  }

  const savedColleges = await prisma.savedCollege.findMany({
    where: {
      userId: user.id,
    },
    include: {
      college: true,
    },
  });

  return (
    <div className="min-h-screen bg-gray-50/50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 bg-rose-50 rounded-xl">
                <Bookmark className="w-5 h-5 text-rose-500" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                Saved Colleges
              </h1>
            </div>
            <p className="text-sm text-gray-500 ml-12">
              {savedColleges.length} {savedColleges.length === 1 ? 'college' : 'colleges'} saved
            </p>
          </div>
          
          <Link
            href="/colleges"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-colors"
          >
            Browse All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Content */}
        {savedColleges.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <div className="relative">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                  <Bookmark className="w-12 h-12 text-gray-300" />
                </div>
                <div className="absolute -top-1 -right-1 w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center">
                  <Bookmark className="w-4 h-4 text-rose-400" />
                </div>
              </div>
              
              <h3 className="mt-6 text-lg font-semibold text-gray-900">
                No Saved Colleges
              </h3>
              
              <p className="mt-2 text-sm text-gray-500 text-center max-w-sm">
                Start exploring colleges and save your favorites by clicking the 
                bookmark icon on any college card.
              </p>

              <Link
                href="/colleges"
                className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
              >
                <BookOpen className="w-4 h-4" />
                Explore Colleges
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Results count bar */}
            <div className="bg-white px-4 py-3 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-rose-500" />
                  <span className="text-sm text-gray-600">
                    Showing {savedColleges.length} saved {savedColleges.length === 1 ? 'college' : 'colleges'}
                  </span>
                </div>
                <span className="text-xs text-gray-400">
                  Saved {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* College Cards */}
            <div className="grid gap-4">
              {savedColleges.map((item) => {
                const college = {
                  id: item.college.id,
                  name: item.college.name,
                  location: item.college.location,
                  fees: item.college.fees,
                  rating: item.college.rating,
                  placements: item.college.placements,
                  imageUrl: item.college.imageUrl,
                  overview: item.college.overview,
                };

                return (
                  <CollegeCard
                    key={item.id}
                    college={college}
                    user={user}
                  />
                );
              })}
            </div>

            {/* Footer */}
            <div className="text-center pt-4">
              <p className="text-xs text-gray-400">
                Showing all saved colleges · {savedColleges.length} total
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}