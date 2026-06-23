"use client"


import { useState } from "react";
import { register } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useError } from "@/context/ErrorAndSuccessMsgContext";
import { Loader } from "lucide-react";

export default function RegisterPage() {
    
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({
        name: "",
        email:"",
        password: "",
    })

    const { addMessage } = useError();


    const  handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        setUserData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        setLoading(true);
        try {
            const res = await register(userData);

            if(!res.success) {
                addMessage(res.message);
                return;
            }

            router.push("/login");

            router.refresh();

        } catch (error: any) {
            const message = 
                error?.response?.data?.message ??
                "Registration failed. Please try again.";

            addMessage(message);
        } finally {
            setLoading(false);
        }
    }


  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border border-neutral-300">

        <h1 className="text-3xl font-bold text-center text-indigo-600">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Join College Discovery
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">

          <div>
            <label className="block text-sm font-medium mb-1">
              Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={(e)=> handleChange(e)}
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>

            <input
              type="email"
              name="email"
              onChange={(e)=> handleChange(e)}
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
              name="password"
              onChange={(e)=> handleChange(e)}
              placeholder="Create password"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            {loading ? (
                <div className="flex items-center justify-center gap-2">
                    <Loader className="animate animate-spin" />
                    Loading...
                </div>
            ) : "Create account"}
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-indigo-600 font-medium"
          >
            Login
          </a>
        </p>

      </div>
    </div>
  );
}