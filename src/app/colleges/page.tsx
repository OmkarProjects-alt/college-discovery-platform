import FiltersSidebar from "@/components/colleges/FiltersSidebar";
import CollegeSearch from "@/components/colleges/CollegeSearch";
import CollegeList from "@/components/colleges/CollegeList";
import MobileFilterToggle from "@/components/colleges/MobileFilterToggle";
import { getColleges } from "@/services/college.service";

export default async function CollegesPage({
  searchParams,
}: {
  searchParams: Promise<{
    location?: string;
    search?: string;
    rating?: string;
    fees?: string;
  }>;
}) {
  const params = await searchParams;

  const colleges = await getColleges(
    {
      location: params?.location,
      search: params?.search,
      rating: params?.rating,
      fees: params?.fees,
    },
    1,
    6
  );

  // Count active filters
  const activeFilterCount = [
    params?.location,
    params?.search,
    params?.rating,
    params?.fees,
  ].filter(Boolean).length;

  return (
    <main className="min-h-screen bg-gray-50">
      <section className=" mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Find Your Perfect College
            </h1>
            <p className="text-sm sm:text-base text-gray-500 mt-1 sm:mt-2">
              Explore top colleges and make the best decision for your future
            </p>
          </div>

          <div className="w-full lg:w-auto">
            <CollegeSearch />
          </div>
        </div>

        {/* Content Section */}
        <div className="mt-6 sm:mt-8">
          
          {/* Mobile Filter Toggle - Client Component */}
          <MobileFilterToggle 
            activeFilterCount={activeFilterCount}
            totalColleges={colleges.length}
          />

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
            
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <FiltersSidebar />
              </div>
            </aside>

            {/* College List */}
            <div>
              <CollegeList
                initialColleges={colleges}
                filters={{
                  location: params?.location,
                  search: params?.search,
                  rating: params?.rating,
                  fees: params?.fees,
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}