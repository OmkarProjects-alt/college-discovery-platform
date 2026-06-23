import { MapPin, School, Calendar, GraduationCap, Globe } from "lucide-react";

type Props = {
  location: string;
  established: number | null;
  instituteType: string | null;
  link: string | null;
  isLoading?: boolean;
};

export default function QuickFact({
  location,
  established,
  instituteType,
  link,
  isLoading = false,
}: Props) {
  const facts = [
    { icon: MapPin, label: "Location", value: location },
    { icon: School, label: "Type", value: instituteType || "-" },
    { icon: Calendar, label: "Established", value: established || "-" },
    { icon: GraduationCap, label: "Courses", value: "15+ Courses" },
    { 
      icon: Globe, 
      label: "Website", 
      value: link || "-",
      isLink: !!link 
    },
  ];

  if (isLoading) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6 animate-pulse">
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
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Quick Facts
      </h3>
      
      <div className="grid grid-cols-2 gap-y-3 gap-x-2">
        {facts.map((fact, index) => {
          const Icon = fact.icon;
          return (
            <div key={index} className="contents">
              <div className="flex items-center gap-2 text-gray-600">
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm font-medium">{fact.label}</span>
              </div>
              <div className="text-sm text-gray-800 truncate">
                {fact.isLink ? (
                  <a
                    href={fact.value as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 hover:underline truncate block"
                  >
                    {fact.value}
                  </a>
                ) : (
                  fact.value
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}