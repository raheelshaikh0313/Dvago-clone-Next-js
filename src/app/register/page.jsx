"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/Config/Supabase";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPass, setShowPass] =
    useState(false);

  const [showConfirmPass, setShowConfirmPass] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

const registerUser = async () => {
  if (
    !fullName ||
    !email ||
    !password ||
    !confirmPassword
  ) {
    toast.error("Please fill all fields");
    return;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }

  if (password.length < 6) {
    toast.error(
      "Password must be at least 6 characters"
    );
    return;
  }

  setLoading(true);

  const { data, error } =
    await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

  setLoading(false);

  if (error) {
    toast.error(error.message);
    return;
  }

  // User Save
  localStorage.setItem(
    "user",
    JSON.stringify(data.user)
  );

  toast.success(
    "Account Created Successfully"
  );

  // Direct Profile Page
  router.push("/profile");
};


  return (
    <div className="min-h-screen bg-[#f6fff0] flex items-center justify-center px-5">

      <div className="grid lg:grid-cols-2 w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center bg-[#8DC63F] p-12 text-white">

          <h1 className="text-5xl font-bold">
            Join DVAGO
          </h1>

          <p className="mt-5 text-lg">
            Create your account and enjoy
            shopping with ease.
          </p>

          <img
            src="/dvago-logo-(white).svg"
            alt="DVAGO"
            className="mt-10 w-40"
          />
        </div>

        {/* Right Side */}
        <div className="p-10 lg:p-14">

          <h2 className="text-4xl font-bold text-[#8DC63F]">
            Register
          </h2>

          <p className="mt-2 text-gray-500">
            Create your account
          </p>

          <div className="mt-8">

            {/* Full Name */}
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) =>
                setFullName(e.target.value)
              }
              className="w-full h-14 border rounded-xl px-4 outline-none focus:border-[#8DC63F]"
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full h-14 border rounded-xl px-4 mt-4 outline-none focus:border-[#8DC63F]"
            />

            {/* Password */}
            <div className="relative mt-4">

              <input
                type={
                  showPass
                    ? "text"
                    : "password"
                }
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full h-14 border rounded-xl px-4 outline-none focus:border-[#8DC63F]"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPass(!showPass)
                }
                className="absolute right-4 top-5"
              >
                {showPass
                  ? <FaEyeSlash />
                  : <FaEye />}
              </button>

            </div>

            {/* Confirm Password */}
            <div className="relative mt-4">

              <input
                type={
                  showConfirmPass
                    ? "text"
                    : "password"
                }
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                className="w-full h-14 border rounded-xl px-4 outline-none focus:border-[#8DC63F]"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPass(
                    !showConfirmPass
                  )
                }
                className="absolute right-4 top-5"
              >
                {showConfirmPass
                  ? <FaEyeSlash />
                  : <FaEye />}
              </button>

            </div>

            {/* Register Button */}
            <button
              onClick={registerUser}
  disabled={loading}
              className="w-full mt-6 h-14 rounded-xl bg-[#8DC63F] text-white font-semibold hover:bg-[#79b52f] transition"
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

            {/* Login Link */}
            <p className="text-center text-gray-500 mt-6">

              Already have an account?

              <Link
                href="/login"
                className="ml-2 text-[#8DC63F] font-semibold"
              >
                Login
              </Link>

            </p>
            <p className="text-center mt-6">
  <Link
    href="/"
    className="text-[#8DC63F] font-semibold hover:underline"
  >
    Continue as Guest
  </Link>
</p>

          </div>

        </div>

      </div>

    </div>
  );
}