'use client'

import {
  createContext,
  useReducer,
  useEffect
} from "react";

import wishlistReducer from "@/Reducers/Wishlist";

const WishlistContext = createContext();

function WishlistProvider({ children }) {

  const initialWishlist =
    typeof window !== "undefined"
      ? JSON.parse(
          localStorage.getItem("wishlist")
        ) || []
      : [];

  const [wishlist, dispatchWishlist] =
    useReducer(
      wishlistReducer,
      initialWishlist
    );

  useEffect(() => {

    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );

  }, [wishlist]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        dispatchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export {
  WishlistContext,
  WishlistProvider
};