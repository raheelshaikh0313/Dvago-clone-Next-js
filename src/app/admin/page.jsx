"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/Config/Supabase";
import { useRouter } from "next/navigation";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import toast from "react-hot-toast";

export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Already Login
  useEffect(() => {
    const admin = localStorage.getItem("admin");

    if (admin) {
      router.push("/admin/add-product");
    }
  }, []);

  const loginAdmin = async () => {
    if (!email || !password) {
      alert("Fill all fields");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    // Save Login
    localStorage.setItem("admin", JSON.stringify(data.user));
    toast.success("Login successful");
    router.push("/admin/add-product");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5ffe9] px-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl">
        
        {/* Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#8DC63F]/10">
          <IoShieldCheckmarkOutline size={40} className="text-[#8DC63F]" />
        </div>

        {/* Heading */}
        <h1 className="mt-6 text-center text-4xl font-bold text-gray-800">
          Admin Login
        </h1>

        <p className="mt-3 text-center text-gray-500">
          DVAGO Admin Dashboard Access
        </p>

        {/* Inputs */}
        <div className="mt-8 space-y-5">
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-14 w-full rounded-2xl border border-gray-200 px-5 outline-none focus:border-[#8DC63F]"
          />

          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-14 w-full rounded-2xl border border-gray-200 px-5 outline-none focus:border-[#8DC63F]"
          />
        </div>

        {/* Button */}
        <button
          onClick={loginAdmin}
          className="mt-8 h-14 w-full rounded-2xl bg-[#8DC63F] text-lg font-semibold text-white transition-all duration-300 hover:scale-[1.02]"
        >
          Login
        </button>
      </div>
    </div>
  );
}