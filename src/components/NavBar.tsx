"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCapIcon } from 'lucide-react'
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/services/auth.service";

export default function Navbar() {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();

  const menuItems = [
    {
      path: "/colleges",
      label: "Colleges",
    },
    {
      path: "/compare",
      label: "Compare",
    },
    {
      path: "/saved",
      label: "Bookmark"
    }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-full mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-gray-900"
        >
          <span className=" text-indigo-500">
            <GraduationCapIcon  size={30} />
          </span>
          <span>College Discovery</span>
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`relative font-medium transition-colors duration-200 ${
                pathname === item.path
                  ? "text-indigo-600"
                  : "text-gray-600 hover:text-indigo-600"
              }`}
            >
              {item.label}

              {pathname === item.path && (
                <span className="absolute left-0 -bottom-5 h-0.5 w-full bg-indigo-600 rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">

            {loading ? (
              <p>Loading...</p>
            ) : user ? (
              <>
                <div className="flex items-center gap-2">

                  <div className="h-10 w-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>

                  <div className="hidden md:block">
                    <p className="font-medium">
                      {user.name}
                    </p>

                    <p className="text-xs text-gray-500">
                      {user.email}
                    </p>
                  </div>

                </div>

                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
                >
                  Sign Up
                </Link>
              </>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
}