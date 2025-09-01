"use client";

import { useState } from "react";
import { useCart } from "./CartContext";
import ConversionTracking from "./ConversionTracking";

export default function AddToCartButton({
  merchandiseId,
  quantity = 1,
  className = "",
  title = "",
  price = "",
  image = "",
  handle = "",
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
  handle?: string;
  variantOptions?: Record<string, string>;
  variantTitle?: string;
  disabled?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      setSuccess(false);
      
      // Add to client-side cart
      addItem({
        merchandiseId,
        quantity,
        title,
        price,
        image,
        handle,
        variantOptions,
        variantTitle
      });
      
      // Track the add to cart event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'add_to_cart', {
          event_category: 'ecommerce',
          event_label: title || 'product',
          value: price ? parseFloat(price) : 0,
          currency: 'USD',
          items: [{
            item_id: merchandiseId,
            item_name: title,
            price: price ? parseFloat(price) : 0,
            quantity: quantity
          }]
        });
      }
      
      // Show success state briefly
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
      
    } catch (e) {
      console.error(e);
      alert("Could not add to cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`${className || "w-full rounded-lg px-4 py-3 text-white font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"} ${
        loading 
          ? "bg-gray-400 cursor-not-allowed shadow-md" 
          : success 
            ? "bg-green-600 cursor-default shadow-lg" 
            : "bg-black hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl"
      }`}
      disabled={loading || !merchandiseId || disabled}
      onClick={handleAddToCart}
    >
      {loading ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Adding...
        </span>
      ) : success ? (
        <span className="flex items-center justify-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Added to Cart!
        </span>
      ) : (
        "Add to Cart"
      )}
    </button>
  );
}
