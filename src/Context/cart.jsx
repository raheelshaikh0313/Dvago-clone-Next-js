'use client'

import { createContext, useReducer, useEffect } from "react";
import cartReducer from "@/Reducers/Cart";

const CartContext = createContext();

function CartProvider({ children }) {

  const initialCart =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cart")) || []
      : [];

  const [state, dispatch] = useReducer(
    cartReducer,
    initialCart
  );

  
  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(state)
    );
  }, [state]);

  useEffect(() => {
  loadCart();
}, []);

const loadCart = () => {
  const cart = JSON.parse(
    localStorage.getItem("cart")
  ) || [];

  dispatch({
    type: "loadCart",
    data: cart,
  });
};
  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };