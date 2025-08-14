"use client";

import { useState } from "react";
import { addToCart } from "./cartClient";

export default function BuyNowButton({
  merchandiseId,
  quantity = 1,
  className = "",
  disabled = false,
}: { 
  merchandiseId: string; 
  quantity?: number; 
  className?: string;
  disabled?: boolean;
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
      className={className || "w-full rounded-lg px-4 py-3 bg-green-600 hover:bg-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"}
      disabled={loading || !merchandiseId || disabled}
      onClick={handleBuyNow}
    >
      {loading ? "Redirecting..." : "Buy Now"}
    </button>
  );
}
