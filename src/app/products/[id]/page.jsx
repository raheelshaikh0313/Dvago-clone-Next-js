"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import { supabase } from "@/Config/Supabase";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import Image from "next/image";
import toast from "react-hot-toast";
import { CartContext } from "@/Context/cart";

export default function ProductDetail() {

    const { id } = useParams();

    const [product, setProduct] = useState(null);

    const { dispatch } =
        useContext(CartContext);

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async () => {

        const { data } = await supabase
            .from("Products")
            .select("*")
            .eq("id", id)
            .single();

        setProduct(data);
    };

    const addToCart = () => {

        const user =
            localStorage.getItem("user");

        if (!user) {

            toast.error(
                "Please login first"
            );

            return;
        }

        dispatch({
            type: "addProduct",
            data: product,
        });

        toast.success(
            "Added To Cart"
        );
    };

    if (!product) {
        return (
            <div className="p-20 text-center">
                Loading...
            </div>
        );
    }

    const buyNow = (product) => {

        const user =
            localStorage.getItem("user");

        if (!user) {

            toast.error(
                "Please Login First"
            );

            router.push("/login");

            return;
        }

        dispatch({
            type: "addProduct",
            data: product,
        });

        toast.success(
            "Redirecting to Checkout"
        );

        router.push("/checkout");
    };

    return (
        <>
            <Header />

            <div className="container mx-auto lg:px-30 px-5 py-10">
                <div className="gap-10 bg-white rounded-3xl shadow-lg p-10">

                <div className="grid md:grid-cols-2 gap-10 ">

                    <div>

                        <div className="bg-gray-50 rounded-3xl p-10">

                            <Image
                                src={product.imgUrl}
                                alt={product.name}
                                width={500}
                                height={500}
                                className="mx-auto object-contain"
                            />

                        </div>

                    </div>

                    <div>

                        <h1 className=" text-[19.2px] text-[#303733]">
                            {product.name}
                        </h1>

                        <p className="mt-5 text-4xl font-bold text-[#8DC63F]">
                            Rs. {product.price}
                        </p>

                        <div className="mt-4">
                            <span className="bg-[#8DC63F]/10 text-[#8DC63F] px-4 py-2 rounded-xl">
                                Stock :
                                {product.stock}
                            </span>
                        </div>

                      

                        <div className="flex gap-4 mt-6">

  <button
    onClick={() => addToCart(product)}
    className="flex-1 border-2 border-[#8DC63F] text-[#8DC63F] py-3 rounded-xl font-semibold"
  >
    Add To Cart
  </button>

  <button
    onClick={() => buyNow(product)}
    className="flex-1 bg-[#8DC63F] text-white py-3 rounded-xl font-semibold"
  >
    Buy Now
  </button>

</div>



                    </div>
                      

                </div>
                <h2 className="text-[20.8px] font-semibold text-[#303733] my-[20px]">
                            {product.name}
                        </h2>
                <p className=" text-[#000000] text-[14px] mt-5 ">
                            {product.description}
                        </p>
                        </div>

            </div>

            <Footer />
        </>
    );
}