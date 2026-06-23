"use client";

import { useState } from "react";
import { login } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useError } from "@/context/ErrorAndSuccessMsgContext";
import { useAuth } from "@/context/AuthContext";
import { Loader } from "lucide-react";

export default function LoginPage() {

  const router = useRouter();
  const { setUser } = useAuth();

  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { addMessage } = useError();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await login(userData);

      if (!data.success) {
        addMessage(data.message);
        return;
      }

      setUser(data.user);
      addMessage("Login successful", true);
      router.push("/colleges");

      router.refresh();

    } catch (error: any) {
       const message = 
            error?.response?.data?.message ??
            "Registration failed. Please try again.";

        addMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border border-neutral-300">

        <h1 className="text-3xl font-bold text-center text-indigo-600">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Login to your account
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>

            <input
              type="email"
              value={userData.email}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  email: e.target.value,
                })
              }
              placeholder="Enter your email"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>

            <input
              type="password"
              value={userData.password}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  password: e.target.value,
                })
              }
              placeholder="Enter your password"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? (
                <div className="flex items-center justify-center gap-2">
                    <Loader className="animate animate-spin" />
                    Loading...
                </div>
            ) : "Login"}
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-indigo-600 font-medium"
          >
            Register
          </a>
        </p>

      </div>
    </div>
  );
}   