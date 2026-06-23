"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  MapPin,
  Star,
  IndianRupee,
  TrendingUp,
} from "lucide-react";
import CompareButton from "../compare/CompareButton";
import SaveButton from "../SaveCollege/SaveButton";

type Props = {
  college: {
    id: string;
    name: string;
    location: string;
    fees: number;
    rating: number;
    placements: string;
    imageUrl: string | null;
    overview: string;
  };
  user?: {
    id: string;
    name: string;
    email: string;
  } | null;
};

export default function CollegeCard({
  college,
  user: passedUser,
}: Props) {
  const { user: ctxUser } = useAuth();
  const currentUser = passedUser ?? ctxUser;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="relative w-full lg:w-64 h-44 rounded-xl overflow-hidden flex-shrink-0">
          <img
            src={college.imageUrl || "/images/college-placeholder.jpg"}
            alt={college.name}
            className="object-cover h-full w-full"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{college.name}</h2>
            <div className="flex items-center gap-1 text-gray-500 mt-1">
              <MapPin size={18} />
              <span>{college.location}</span>
            </div>
            <p className="text-gray-600 mt-3 line-clamp-3">{college.overview}</p>
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            <div className="bg-indigo-50 px-4 py-2 rounded-xl">
              <div className="flex items-center gap-1 text-indigo-600 font-semibold">
                <Star size={16} fill="currentColor" />
                {college.rating}
              </div>
              <p className="text-xs text-gray-500">Rating</p>
            </div>

            <div className="bg-green-50 px-4 py-2 rounded-xl">
              <div className="flex items-center text-green-600 font-semibold">
                <IndianRupee size={15} />
                {college.fees.toLocaleString("en-IN")}
              </div>
              <p className="text-xs text-gray-500">Annual Fees</p>
            </div>

            <div className="bg-orange-50 px-4 py-2 rounded-xl">
              <div className="flex items-center gap-1 text-orange-600 font-semibold">
                <TrendingUp size={16} />
                {college.placements}
              </div>
              <p className="text-xs text-gray-500">Highest Package</p>
            </div>
          </div>
        </div>

        <div className="flex lg:flex-col gap-3 justify-center">
          <Link
            href={`/colleges/${college.id}`}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-center cursor-pointer"
          >
            View Details
          </Link>

          <CompareButton id={college.id} />

          {currentUser && <SaveButton collegeId={college.id} />}
        </div>
      </div>
    </div>
  );
}