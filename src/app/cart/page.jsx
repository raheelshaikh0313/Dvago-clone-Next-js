"use client";

import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { useState } from "react";
import { useContext } from "react";
import { CartContext } from "@/Context/cart";
import { useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { FiMinus } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";

export default function CartPage() {

 const { state, dispatch } =
 useContext(CartContext);
//  const [cartItems,setCartItems] =useState([]);






   const router = useRouter();
 
const removeItem = (id) => {

 dispatch({
  type: "removeProduct",
  id
 });

};

 const increaseQty = (id) => {

  dispatch({
   type:"increaseQty",
   id
  });
 };

 const decreaseQty = (id) => {

  dispatch({
   type:"decreaseQty",
   id
  });
 };

const total = (state || []).reduce(
  (acc, item) =>
    acc + (item.price * item.quantity),
  0
);

 return (
 <>
  <Header />

  <div className="container mx-auto gap-4 lg:px-30 px-5 py-3 my-8 rounded">

   <div className="mx-auto max-w-7xl px-6 py-10">

    <h1 className="mb-10 text-4xl font-bold text-[#8DC63F]">
     Shopping Cart
    </h1>

    {
    !state || state.length === 0 ?

     <div className="text-center py-20">

   <h2 className="text-3xl font-bold">
    Cart is Empty
   </h2>

   <button
    onClick={() => router.push("/")}
    className="mt-5 bg-[#8DC63F] text-white px-6 py-3 rounded-xl"
   >
    Continue Shopping
   </button>

  </div>

     :

     <div className="grid gap-8 lg:grid-cols-3">


      <div className="lg:col-span-2">

       <div className="rounded-3xl border border border-gray-300  p-6">

        <ul className="divide-y ">

         { state.map((v,i)=>{

          return(

           <li
            key={v.id || i}
            className="flex py-6"
           >

            <div className="h-24 w-24 overflow-hidden rounded-xl border border-gray-300 ">

             <img
              src={v.imgUrl}
              alt={v.name}
              className="h-full w-full object-contain"
             />

            </div>

            <div className="ml-5 flex flex-1 flex-col">

             <div className="flex justify-between">

              <div>

               <h3 className="font-semibold">
                {v.name}
               </h3>

               <p className="mt-1 text-sm text-gray-500">
                Stock : {v.stock}
               </p>

              </div>

              <p className="font-bold text-[#8DC63F]">
               Rs. {v.price}
              </p>

             </div>

             <div className="mt-auto flex items-center justify-between">

              {/* Quantity */}

              <div className="flex items-center gap-3">

               <button
                  onClick={() =>
    dispatch({
      type: "decreaseQty",
      id: v.id,
    })
  }
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300  "
               >
                <FiMinus />
               </button>

              <span>{v.quantity}</span>

               <button
                onClick={() =>
    dispatch({
      type: "increaseQty",
      id: v.id,
    })
  }
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 "
               >
                <FiPlus />
               </button>

              </div>

              {/* Remove */}

              <button
               onClick={() =>
                removeItem(v.id)
               }
               className="text-red-500"
              >
               <FaTrash />
              </button>

             </div>

            </div>

           </li>

          )
         })}

        </ul>

       </div>

      </div>

      {/* Summary */}

      <div>

       <div className="rounded-3xl border border-gray-300 p-6">

        <h2 className="mb-6 text-2xl font-bold">
         Order Summary
        </h2>

        <div className="mb-4 flex justify-between">

         <span>Items</span>

         <span>
          {state.length}
         </span>

        </div>

        <div className="mb-6 flex justify-between text-xl font-bold">

         <span>Total</span>

         <span className="text-[#8DC63F]">
          Rs. {total}
         </span>

        </div>

        <button
         className="w-full rounded-xl bg-[#8DC63F] py-3 text-white"
        >
         Checkout
        </button>

        <Link
         href="/"
         className="mt-4 block text-center text-[#8DC63F]"
        >
         Continue Shopping
        </Link>

       </div>

      </div>

     </div>
    }

   </div>

  </div>

  <Footer />
 </>
 );
}