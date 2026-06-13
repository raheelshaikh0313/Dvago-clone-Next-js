"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/Config/Supabase";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);

    const loginUser = async () => {
        if (!email || !password) {
            toast.error("Please fill all fields");
            return;
        }

        setLoading(true);

        const { data, error } =
            await supabase.auth.signInWithPassword({
                email,
                password,
            });

        setLoading(false);

        if (error) {
            toast.error(error.message);
            return;
        }

        localStorage.setItem(
            "user",
            JSON.stringify(data.user)
        );

        toast.success("Login Successful");

        router.push("/profile");
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const { data, error } =
            await supabase.auth.signInWithPassword({
                email,
                password,
            });

        if (error) {
            toast.error(error.message);
            return;
        }

      localStorage.setItem(
  "user",
  JSON.stringify(data.user)
);

        toast.success("Login Successful");

        router.push("/");
    };

    return (
        <div className="min-h-screen bg-[#f6fff0] flex items-center justify-center px-5">

            <div className="grid lg:grid-cols-2 w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl">

                {/* Left Side */}
                <div className="hidden lg:flex flex-col justify-center bg-[#8DC63F] p-12 text-white">


     <img
                      src="/dvago-white-logo.svg"
                        alt=""
                        className="mt-10 w-40"
                    />
                    <h1 className="text-5xl font-bold">
                        Welcome Back
                    </h1>

                    <p className="mt-5 text-lg">
                        Login to access your cart,
                        wishlist and orders.
                    </p>

               
                </div>

                {/* Right Side */}
                <div className="p-10 lg:p-14">

                    <h2 className="text-4xl font-bold text-[#8DC63F]">
                        Login
                    </h2>

                    <p className="mt-2 text-gray-500">
                        Sign in to your account
                    </p>

                    <div className="mt-8">

                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            className="w-full h-14 border rounded-xl px-4 outline-none focus:border-[#8DC63F]"
                        />

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

                        <button
                            onClick={loginUser}
                            disabled={loading}
                            className="w-full mt-6 h-14 rounded-xl bg-[#8DC63F] text-white font-semibold hover:bg-[#79b52f] transition"
                        >
                            {
                                loading
                                    ? "Logging In..."
                                    : "Login"
                            }
                        </button>

                        <p className="text-center text-gray-500 mt-6">

                            Don't have an account?

                            <Link
                                href="/register"
                                className="ml-2 text-[#8DC63F] font-semibold"
                            >
                                Register
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