import Link from "next/link";
import { 
  Search, 
  TrendingUp, 
  Star, 
  ArrowRight,
  Building2,
  Users,
  Award
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full text-sm text-indigo-700 font-medium mb-6">
            <Award className="w-4 h-4" />
            Discover Your Future
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="text-gray-900">Find Your</span>
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Perfect College
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto">
            Discover, compare, and review thousands of colleges to make the 
            best decision for your future career.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/colleges"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 hover:shadow-lg transition-all duration-200 font-medium text-sm group"
            >
              <Search className="w-4 h-4" />
              Explore Colleges
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-gray-100 p-6 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Search className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Discover</h3>
            <p className="text-sm text-gray-500 mt-1">Find colleges that match your preferences</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Compare</h3>
            <p className="text-sm text-gray-500 mt-1">Side-by-side comparison of top colleges</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Review</h3>
            <p className="text-sm text-gray-500 mt-1">Read and share experiences with others</p>
          </div>
        </div>
      </div>
    </main>
  );
}