"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";

import { WishlistContext } from "@/Context/wishlist";
import { CartContext } from "@/Context/cart";

import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { BsCart2 } from "react-icons/bs";

import toast from "react-hot-toast";

export default function WishlistPage() {
    const router = useRouter();

    const { wishlist, dispatchWishlist} = useContext(WishlistContext);
  const { dispatch } =useContext(CartContext);

const toggleWishlist = (product) => {

  const user = localStorage.getItem("user");

  if (!user) {

    toast.error(
      "Please login first"
    );

    router.push("/login");

    return;
  }

  const exist = wishlist.find(
    item => item.id === product.id
  );

  dispatchWishlist({
    type: "toggleWishlist",
    data: product
  });

  if (exist) {

    toast.success(
      "Removed from Wishlist"
    );

  } else {

    toast.success(
      "Added to Wishlist"
    );

  }
};

 const addToCart = (product) => {

 const user =
 localStorage.getItem("user");

 if (!user) {

  toast.error(
   "Please login first"
  );

  router.push("/login");
  return;
 }

 dispatch({
  type:"addProduct",
  data:product
 });

 toast.success(
  `${product.name} added to cart`
 );
};

    return (
        <>
            <Header />

            <div className="container mx-auto lg:px-30 px-5 py-8">

                <div className="mb-8 flex items-center justify-between">

                    <h1 className="text-4xl font-bold text-[#8DC63F]">
                        My Wishlist
                    </h1>

                    <div className="rounded-xl bg-[#8DC63F]/10 px-4 py-2 text-[#8DC63F] font-medium">
                        Total Products : {wishlist.length}
                    </div>

                </div>

                {wishlist.length === 0 ? (

                    <div className="flex min-h-[400px] items-center justify-center">

                        <div className="text-center">

                            <h2 className="mb-4 text-3xl font-bold text-gray-700">
                                Wishlist Empty
                            </h2>

                            <button
                                onClick={() => router.push("/products")}
                                className="mt-5 bg-[#8DC63F] text-white px-6 py-3 rounded-xl"
                            >
                                Add products to your wishlist
                            </button>

                        </div>

                    </div>

                ) : (

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">

                        {wishlist.map((v) => (

                            <div
                                key={v.id}
                                onClick={() =>
                                    router.push(
                                        `/products/${v.id}`
                                    )
                                }
                                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 transition-all duration-500 hover:shadow-xl cursor-pointer"
                            >

                                {/* Wishlist Button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();

                                        toggleWishlist(v);
                                    }}
                                    className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border bg-white text-[#8DC63F] shadow-md"
                                >
                                    <FaHeart
                                        size={18}
                                        className="text-[#8DC63F]"
                                    />
                                </button>

                                {/* Product Image */}
                                <div className="relative h-[180px] w-full overflow-hidden rounded-xl bg-gray-50">

                                    <Image
                                        src={v.imgUrl}
                                        alt={v.name}
                                        fill
                                        className="object-contain transition-transform duration-500 group-hover:scale-105"
                                    />

                                </div>

                                {/* Content */}
                                <div className="mt-4">

                                    <span className="inline-flex items-center rounded-md bg-[#8DC63F]/10 px-2 py-1 text-xs font-medium text-[#8DC63F]">
                                        In Stock : {v.stock}
                                    </span>

                                    <h3 className="mt-3 line-clamp-2 min-h-[48px] text-[15px] font-medium text-gray-700">
                                        {v.name}
                                    </h3>

                                    <p className="mt-3 text-2xl font-bold text-[#8DC63F]">
                                        Rs. {v.price}
                                    </p>

                                </div>

                                {/* Add To Cart */}
                                <div className="absolute bottom-[-80px] right-[5px] z-10 -translate-x-1/2 transition-all duration-500 group-hover:bottom-4">

                                    <button
                                         onClick={(e) => {
                    e.stopPropagation();

                    addToCart(v);
                  }}
                  
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8DC63F] text-white shadow-2xl"
                                    >
                                        <BsCart2 size={20} />
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

            <Footer />
        </>
    );
}