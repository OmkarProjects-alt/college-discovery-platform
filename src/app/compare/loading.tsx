// app/compare/loading.tsx

import { ArrowLeft } from "lucide-react";

export default function CompareLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        
        <div className="flex items-center justify-between mb-8">
          <div className="animate-pulse">
            <div className="h-8 sm:h-9 bg-gray-200 rounded-lg w-48 sm:w-64"></div>
            <div className="h-4 bg-gray-200 rounded-lg w-32 sm:w-48 mt-2"></div>
          </div>
          <div className="animate-pulse">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg h-10 w-24"></div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm animate-pulse">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/50">
                  <th className="px-6 py-4 text-left w-40">
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </th>

                  {[1, 2, 3].map((index) => (
                    <th key={index} className="px-6 py-4 text-center min-w-[200px]">
                      <div className="flex flex-col items-center">
                        <div className="w-24 h-16 bg-gray-200 rounded-lg mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-20"></div>
                        <div className="h-2 bg-gray-200 rounded w-8 mt-1"></div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                
                {[1, 2, 3, 4, 5, 6, 7].map((rowIndex) => (
                  <tr 
                    key={rowIndex}
                    className={`border-b border-gray-100 ${
                      rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                    }`}
                  >
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-4 h-4 bg-gray-200 rounded"></div>
                        <div className="h-3 bg-gray-200 rounded w-16"></div>
                      </div>
                    </td>
                    {[1, 2, 3].map((colIndex) => (
                      <td key={colIndex} className="px-6 py-3.5 text-center">
                        <div className="inline-flex items-center gap-1.5">
                          {rowIndex === 3 && (
                            <div className="flex items-center gap-0.5 mr-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <div key={star} className="w-3 h-3 bg-gray-200 rounded"></div>
                              ))}
                            </div>
                          )}
                          <div className={`h-4 bg-gray-200 rounded ${
                            rowIndex === 2 ? 'w-12' : 
                            rowIndex === 1 ? 'w-16' : 
                            rowIndex === 4 ? 'w-10' : 
                            rowIndex === 5 ? 'w-14' : 
                            rowIndex === 6 ? 'w-20' : 'w-24'
                          }`}></div>
                          {rowIndex === 1 && (
                            <div className="ml-1 w-8 h-4 bg-emerald-50 rounded"></div>
                          )}
                          {rowIndex === 4 && (
                            <div className="ml-1 w-8 h-4 bg-gray-200 rounded"></div>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          {[1, 2, 3].map((index) => (
            <div key={index} className="bg-white px-5 py-4 rounded-lg border border-gray-200 animate-pulse">
              <div className="h-3 bg-gray-200 rounded w-24"></div>
              <div className="h-6 bg-gray-200 rounded w-20 mt-2"></div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6 animate-pulse">
          <div className="h-3 bg-gray-200 rounded w-64"></div>
        </div>
      </div>
    </div>
  );
}