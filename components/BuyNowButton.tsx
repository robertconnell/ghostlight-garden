"use client";

import { useState } from "react";
import { addToCart } from "./cartClient";

export default function BuyNowButton({
  merchandiseId,
  quantity = 1,
  className = "",
  disabled = false,
  isPreorder = false,
}: { 
  merchandiseId: string; 
  quantity?: number; 
  className?: string;
  disabled?: boolean;
  isPreorder?: boolean;
}) {
  const [loading, setLoading] = useState(false);

  const handleBuyNow = async () => {
    try {
      setLoading(true);
      const checkoutUrl = await addToCart(merchandiseId, quantity);
      // Go directly to Shopify checkout
      window.location.href = checkoutUrl;
    } catch (e) {
      console.error(e);
      alert("Could not proceed to checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={className || `w-full rounded-lg px-4 py-3 ${isPreorder ? 'bg-[#8A6D9B] hover:bg-[#8A6D9B]/90 border-1 border-white' : 'bg-[#8A6D9B] hover:bg-[#8A6D9B]/90 border-1 border-white'} text-white font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed button-font`}
      disabled={loading || !merchandiseId || disabled}
      onClick={handleBuyNow}
    >
      {loading ? "Redirecting..." : "Buy Now"}
    </button>
  );
}
