"use client";

import { useState } from "react";
import { useCart } from "./CartContext";

export default function CartCheckoutButton({
  className = "",
}: { 
  className?: string;
}) {
  const [loading, setLoading] = useState(false);
  const { items, clearCart, totalItems, markCartAsOrdered } = useCart();

  const handleCheckout = async () => {
    if (items.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      setLoading(true);
      
      // Create a cart with all items
      let cartId: string;
      try {
        const res = await fetch("/api/cart/create", { method: "POST" });
        if (!res.ok) throw new Error("Failed to create cart");
        const cart = await res.json();
        cartId = cart.id;
      } catch (error) {
        console.error("Failed to create cart:", error);
        alert("Failed to create checkout cart. Please try again.");
        return;
      }

      // Add all items to the cart
      for (const item of items) {
        try {
          const res = await fetch("/api/cart/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              cartId, 
              merchandiseId: item.merchandiseId, 
              quantity: item.quantity 
            }),
          });
          
          if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(`Failed to add ${item.title || 'item'} to cart: ${JSON.stringify(errorData.error || 'Unknown error')}`);
          }
        } catch (error) {
          console.error(`Failed to add item ${item.id}:`, error);
          alert(`Failed to add ${item.title || 'item'} to checkout. Please try again.`);
          return;
        }
      }

      // Get the checkout URL and redirect
      try {
        const res = await fetch(`/api/cart/checkout?cartId=${encodeURIComponent(cartId)}`);
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(`Failed to get checkout URL: ${JSON.stringify(errorData.error || 'Unknown error')}`);
        }
        
        const { checkoutUrl } = await res.json();
        
        if (!checkoutUrl) {
          throw new Error('No checkout URL returned');
        }
        
        // Mark this cart as ordered so we can clear it after payment
        markCartAsOrdered(cartId);
        
        // Don't clear the cart yet - let Shopify handle the payment first
        // The cart will be cleared when they return from successful payment
        // or we can implement a webhook to clear it after payment confirmation
        console.log('Redirecting to Shopify checkout...');
        window.location.href = checkoutUrl;
      } catch (error) {
        console.error("Failed to get checkout URL:", error);
        alert("Failed to proceed to checkout. Please try again.");
      }
      
    } catch (e) {
      console.error(e);
      alert("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={className || "w-full rounded-lg px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold"}
      disabled={loading || items.length === 0}
      onClick={handleCheckout}
    >
      {loading ? "Preparing Checkout..." : `Checkout (${totalItems} ${totalItems === 1 ? 'item' : 'items'})`}
    </button>
  );
}
