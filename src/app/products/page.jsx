"use client";

import { useEffect, useState, useContext } from "react";
import { supabase } from "@/Config/Supabase";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BsCart2 } from "react-icons/bs";
import toast from "react-hot-toast";
import { CartContext } from "@/Context/cart";
import { WishlistContext } from "@/Context/wishlist";
import { FaHeart, FaRegHeart } from "react-icons/fa";
export default function ProductsPage() {
    const router = useRouter();
    const [products, setProducts] = useState([]);

    const { dispatch } = useContext(CartContext);
    // setOpenCanvas(true)

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const { data, error } = await supabase
            .from("Products")
            .select("*");

        if (!error) {
            setProducts(data);
        }
    };

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

    return (
        <>
            <Header />

            <div className="container mx-auto gap-4 lg:px-30 px-5 py-3 my-8 rounded">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-4xl font-bold text-[#8DC63F]">
                        All Products
                    </h1>

                    <div className="rounded-xl bg-[#8DC63F]/10 px-4 py-2 text-[#8DC63F] font-medium">
                        Total Products : {products.length}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">                    {products.map((v, i) => (
                    <div
                        key={v.id}
                        onClick={() =>
                            router.push(`/products/${v.id}`)
                        }

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

                        {/* Image */}
                        <div

                            className="relative h-[180px] w-full overflow-hidden rounded-xl bg-gray-50 z-0">
                            <Image
                                src={v.imgUrl}
                                alt={v.name}
                                fill
                                className="object-contain transition-transform duration-500 group-hover:scale-105"
                            />


                        </div>

                        {/* Content */}
                        <div className="mt-4">
                            <h3 className="line-clamp-2 min-h-[48px] text-[15px] font-medium text-gray-700">
                                {v.name}
                            </h3>

                            <p className="mt-3 text-2xl font-bold text-[#8DC63F]">
                                Rs. {v.price}
                            </p>

                            <p className="mt-2 text-sm text-gray-500">
                                Stock: {v.stock}
                            </p>
                        </div>
                        {/* Hover Cart Button */}
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
            </div>

            <Footer />
        </>
    );
}