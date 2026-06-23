"use client";

import { useCompare } from "@/context/CompareContext";
import { useRouter, usePathname } from "next/navigation";
import { X } from "lucide-react";

export default function CompareBar() {
  const { compareIds, clearCompare } = useCompare();
  const router = useRouter();
  const pathname = usePathname();

  if(pathname === '/compare') return null;
  if (compareIds.length < 2) return null;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2  z-50">
      <div className="relative bg-indigo-600 text-white px-6 py-4 rounded-xl shadow-lg flex gap-4 items-center">
        <p>
        {compareIds.length} colleges selected
      </p>

      <button
        onClick={() =>
          router.push(
            `/compare?ids=${compareIds.join(",")}`
          )
        }
        className="bg-white text-indigo-600 px-4 py-2 rounded-md"
      >
        Compare Now
      </button>

      <button 
        className="absolute top-1 right-2 bg-rose-500 rounded-full p-1 flex items-center justify-center cursor-pointer "
        onClick={clearCompare}
      >
        <X size={15}/>
      </button>
      </div>
    </div>
  );
}