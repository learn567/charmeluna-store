// src/app/cart/page.js mein ye logic use karein
"use client";
import { useState, useEffect } from "react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(data);
  }, []);

  return (
    <div>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map(item => (
          <div key={item.id}>{item.name} - Rs. {item.price}</div>
        ))
      )}
    </div>
  );
}