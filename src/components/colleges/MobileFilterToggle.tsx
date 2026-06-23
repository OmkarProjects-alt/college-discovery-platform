"use client";

import { useState } from "react";
import { Filter, X } from "lucide-react";
import FiltersSidebar from "./FiltersSidebar";

interface MobileFilterToggleProps {
  activeFilterCount: number;
  totalColleges: number;
}

export default function MobileFilterToggle({ 
  activeFilterCount, 
  totalColleges 
}: MobileFilterToggleProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden flex items-center justify-between mb-4">
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors"
        >
          <Filter className="w-4 h-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-1 px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
              {activeFilterCount}
            </span>
          )}
        </button>
        
        <span className="text-sm text-gray-500">
          {totalColleges} colleges
        </span>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Filters</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close filters"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="p-4">
              <FiltersSidebar />
            </div>
          </div>
        </div>
      )}
    </>
  );
}