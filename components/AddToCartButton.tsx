"use client";

import { useState } from "react";
import { useCart } from "./CartContext";

export default function AddToCartButton({
  merchandiseId,
  quantity = 1,
  className = "",
  title = "",
  price = "",
  image = "",
  variantOptions,
  variantTitle,
  disabled = false,
}: { 
  merchandiseId: string; 
  quantity?: number; 
  className?: string;
  title?: string;
  price?: string;
  image?: string;
  variantOptions?: Record<string, string>;
  variantTitle?: string;
  disabled?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      
      // Add to client-side cart
      addItem({
        merchandiseId,
        quantity,
        title,
        price,
        image,
        variantOptions,
        variantTitle
      });
      
      // Optional: Show success message or animation
      console.log('Added to cart!');
      
    } catch (e) {
      console.error(e);
      alert("Could not add to cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={className || "w-full rounded-lg px-4 py-3 bg-black text-white disabled:opacity-50 disabled:cursor-not-allowed"}
      disabled={loading || !merchandiseId || disabled}
      onClick={handleAddToCart}
    >
      {loading ? "Adding..." : "Add to Cart"}
    </button>
  );
}
