"use client";

import { useState } from "react";
import { addToCart } from "./cartClient";

export default function BuyNowButton({
  merchandiseId,
  quantity = 1,
  className = "",
}: { 
  merchandiseId: string; 
  quantity?: number; 
  className?: string;
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
      className={className || "w-full rounded-lg px-4 py-3 bg-green-600 hover:bg-green-700 text-white"}
      disabled={loading || !merchandiseId}
      onClick={handleBuyNow}
    >
      {loading ? "Redirecting..." : "Buy Now"}
    </button>
  );
}
