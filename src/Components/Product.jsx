"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CartContext } from "@/Context/cart";
import { supabase } from "@/Config/Supabase";
import { WishlistContext } from "@/Context/wishlist";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BsCart2 } from "react-icons/bs";
import toast from "react-hot-toast";

function Products() {
  const router = useRouter();

  const [imageLoaded, setImageLoaded] = useState(false);

  const [product, setproduct] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);


const getProducts = async () => {
  const { data, error } = await supabase
    .from("Products")
    .select("*")
    .range(0, 4);

  if (!error) {
    setproduct(data);
  }
};

  const { dispatch } = useContext(CartContext);

   const addToCart = async (product) => {
         const user = JSON.parse(
    localStorage.getItem("user")
  );
  
          if (!user) {
              toast.error(
                  "Please login first"
              );
  
              router.push("/login");
  
              return;
          }
  
          const { data: exist } =
    await supabase
      .from("cart")
      .select("*")
      .eq("user_id", user.id)
      .eq("product_id", product.id)
      .single();
  
      if (exist) {
  
    await supabase
      .from("cart")
      .update({
        quantity:
          exist.quantity + 1
      })
      .eq("id", exist.id);
  
  } else {
  
    await supabase
      .from("cart")
      .insert([
        {
          user_id: user.id,
          product_id: product.id,
          quantity: 1
        }
      ]);
  }
          dispatch({
              type: "addProduct",
              data: product,
          });
  
          toast.success(
              `${product.name} added to cart`
          );
      };

  const { wishlist, dispatchWishlist } = useContext(WishlistContext);

 const toggleWishlist = (product) => {

const user =
JSON.parse(
localStorage.getItem("user")
);

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
  // setOpenCanvas(true)
  return (
    <>

  <div className="container mx-auto  lg:px-30 px-5 py-3   ">
        <div className=" grid grid-cols-2 gap-5">
          <img className="w-[500px] h-[200-px] rounded-[10px]" src="./productbanner4.png" alt="" />
          <img className="w-[500px] h-[200-px] rounded-[10px]" src="./productbanner5.png" alt="" />
        </div>
      </div>

      <div className="container mx-auto gap-4 lg:px-30 px-5 py-3 my-8 rounded">
        <img className="rounded-[10px]" src="./categorybanner.png" alt="" />
      </div>
      <div className="container mx-auto my-[10px] gap-4 lg:px-30 px-5 py-3">
        {/* Heading */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-[#8DC63F]">
            Top Selling Items
          </h2>

          <button
            onClick={() => router.push("/products")}
            className="bg-[#8DC63F] hover:bg-[#79ad32] text-white px-5 py-2 rounded-xl"
          >
            VIEW ALL
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">          {product.map((v, i) => {
          return (
            <div
              key={v.id}
              onClick={() => router.push(`/products/${v.id}`)}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 transition-all duration-500 hover:shadow-xl cursor-pointer"
            >
              {/* Wishlist */}
              <button
                onClick={(e) => {

                  e.stopPropagation();

                  toggleWishlist(v);

                }}
              
 className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border bg-white text-[#8DC63F] shadow-md"

              >
                {
                  wishlist.find(
                    item => item.id === v.id
                  )

                    ?

                    <FaHeart
                      className="text-[#8DC63F]"
                      size={18}
                    />

                    :

                    <FaRegHeart
                      className="text-[#8DC63F]"
                      size={18}
                    />
                }
              </button>

              {/* Product Image */}
              <div className="relative h-[180px] w-full overflow-hidden rounded-xl bg-gray-50 z-0">

                {!imageLoaded && (
                  <div className="absolute inset-0 animate-pulse bg-gray-200" />
                )}

                <Image
                  src={v.imgUrl}
                  alt={v.name}
                  fill
                  onLoad={() => setImageLoaded(true)}
                  className="object-contain"
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
          );
        })}
        </div>
      </div>

      <div className="container mx-auto  lg:px-30 px-5 py-3   ">
        <div className=" grid grid-cols-2 gap-5">
          <img className="w-[500px] h-[200-px] rounded-[10px]" src="./productbanner1.png" alt="" />
          <img className="w-[500px] h-[200-px] rounded-[10px]" src="./productbanner2.png" alt="" />
        </div>
      </div>

      <div className="container mx-auto my-10 lg:px-30 px-5 py-3   ">

        <img className="rounded-[10px]" src="./productbanner3.png" alt="" />
      </div>
    </>
  );
}

export default Products;