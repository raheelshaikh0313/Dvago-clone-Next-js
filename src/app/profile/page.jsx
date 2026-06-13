"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/Config/Supabase";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import Link from "next/link";
import toast from "react-hot-toast";

import {
    FaUser,
    FaHeart,
    FaShoppingCart,
    FaSignOutAlt,
    FaEnvelope,
} from "react-icons/fa";

export default function ProfilePage() {
    const router = useRouter();

    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser =
            localStorage.getItem("user");

        if (!storedUser) {
            router.push("/login");
            return;
        }

        setUser(JSON.parse(storedUser));
    }, []);

    useEffect(() => {
        const getUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            setUser(user);
        };

        getUser();
    }, []);

    const logout = async () => {
        await supabase.auth.signOut();

        localStorage.removeItem("user");

        toast.success("Logged Out");

        router.push("/login");
    };

    if (!user) return null;

    const fullName =
        user?.user_metadata?.full_name ||
        "DVAGO User";

    return (
        <>
            <Header />

            <div className="min-h-screen bg-[#f6fff0] py-12 px-5">

                <div className="max-w-6xl mx-auto">

                    {/* Profile Hero */}

                    <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

                        {/* Top Banner */}

                        <div className="h-40 bg-[#8DC63F]" />

                        {/* Profile Content */}

                        <div className="px-8 pb-10">

                            {/* Avatar */}

                            <div className="-mt-16">

                                <div className="h-32 w-32 rounded-full bg-white p-2 shadow-lg">

                                    <div className="h-full w-full rounded-full bg-[#8DC63F] flex items-center justify-center text-white text-5xl font-bold">

                                        {fullName.charAt(0).toUpperCase()}

                                    </div>

                                </div>

                            </div>

                            {/* Name */}

                            <div className="mt-5">

                                <h1 className="text-3xl font-bold text-gray-800">
                                    {fullName}
                                </h1>

                                <div className="flex items-center gap-2 mt-2 text-gray-500">

                                    <FaEnvelope />

                                    <span>
                                        {user.email}
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Quick Actions */}

                    <div className="grid md:grid-cols-3 gap-6 mt-8">

                        {/* Wishlist */}

                        <Link
                            href="/wishlist"
                            className="bg-white rounded-3xl shadow-md p-8 hover:shadow-xl transition"
                        >
                            <div className="flex flex-col items-center">

                                <div className="h-16 w-16 rounded-full bg-pink-100 flex items-center justify-center">

                                    <FaHeart
                                        className="text-pink-500"
                                        size={26}
                                    />

                                </div>

                                <h3 className="mt-4 text-xl font-semibold">
                                    Wishlist
                                </h3>

                                <p className="text-gray-500 mt-2 text-center">
                                    View all saved products
                                </p>

                            </div>
                        </Link>

                        {/* Cart */}

                        <Link
                            href="/cart"
                            className="bg-white rounded-3xl shadow-md p-8 hover:shadow-xl transition"
                        >
                            <div className="flex flex-col items-center">

                                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">

                                    <FaShoppingCart
                                        className="text-[#8DC63F]"
                                        size={26}
                                    />

                                </div>

                                <h3 className="mt-4 text-xl font-semibold">
                                    My Cart
                                </h3>

                                <p className="text-gray-500 mt-2 text-center">
                                    View cart products
                                </p>

                            </div>
                        </Link>

                        {/* Account */}

                        <div className="bg-white rounded-3xl shadow-md p-8">

                            <div className="flex flex-col items-center">

                                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">

                                    <FaUser
                                        className="text-blue-500"
                                        size={26}
                                    />

                                </div>

                                <h3 className="mt-4 text-xl font-semibold">
                                    Account
                                </h3>

                                <p className="text-gray-500 mt-2 text-center">
                                    Manage your profile
                                </p>

                            </div>
                        </div>

                    </div>

                    {/* Account Details */}

                    <div className="bg-white rounded-3xl shadow-md mt-8 p-8">

                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            Account Information
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">

                            <div>

                                <label className="text-gray-500 text-sm">
                                    Full Name
                                </label>

                                <div className="mt-2 border rounded-xl p-4 bg-gray-50">
                                    {fullName}
                                </div>

                            </div>

                            <div>

                                <label className="text-gray-500 text-sm">
                                    Email Address
                                </label>

                                <div className="mt-2 border rounded-xl p-4 bg-gray-50">
                                    {user.email}
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Logout */}

                    <div className="mt-8 flex justify-center">

                        <button
                            onClick={logout}
                            className="flex items-center gap-3 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-2xl font-semibold transition"
                        >
                            <FaSignOutAlt />

                            Logout

                        </button>

                    </div>

                </div>

            </div>

            <Footer />
        </>
    );
}