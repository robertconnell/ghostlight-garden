"use client";

const CART_KEY = "cartId";

async function createCart(): Promise<{ id: string; checkoutUrl: string }> {
  const res = await fetch("/api/cart/create", { method: "POST" });
  if (!res.ok) throw new Error("Failed to create cart");
  const cart = await res.json();
  localStorage.setItem(CART_KEY, cart.id);
  return cart;
}

export async function ensureCart(): Promise<string> {
  if (typeof window === "undefined") throw new Error("client only");
  let id = localStorage.getItem(CART_KEY);
  if (id) return id;
  const cart = await createCart();
  return cart.id;
}

export async function addToCart(merchandiseId: string, quantity = 1): Promise<string> {
  if (!merchandiseId) throw new Error("Missing merchandiseId");

  // 1) try with existing/ensured cart
  let cartId = await ensureCart();
  let res = await fetch("/api/cart/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cartId, merchandiseId, quantity }),
  });

  if (res.ok) {
    const cart = await res.json();
    localStorage.setItem(CART_KEY, cart.id);
    return cart.checkoutUrl as string;
  }

  // 2) if cart doesn't exist, recreate and retry once
  try {
    const err = await res.json();
    const msg = JSON.stringify(err?.error || err);
    if (msg.includes("cart does not exist") || msg.includes("specified cart does not exist")) {
      localStorage.removeItem(CART_KEY);
      const fresh = await createCart();
      const res2 = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartId: fresh.id, merchandiseId, quantity }),
      });
      if (!res2.ok) {
        const err2 = await res2.json().catch(() => ({}));
        throw new Error(
          err2?.error ? JSON.stringify(err2.error) : "Add to cart failed after retry"
        );
      }
      const cart2 = await res2.json();
      localStorage.setItem(CART_KEY, cart2.id);
      return cart2.checkoutUrl as string;
    }
    // some other error
    throw new Error(msg || "Add to cart failed");
  } catch {
    // if parsing error response fails, throw a generic one
    throw new Error("Add to cart failed");
  }
}
