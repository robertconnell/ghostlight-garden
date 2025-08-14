import { NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify";

const CART_LINES_ADD = /* GraphQL */ `
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { id checkoutUrl }
      userErrors { field message }
    }
  }
`;

export async function POST(req: Request) {
  try {
    const { cartId, merchandiseId, quantity = 1 } = await req.json();

    if (!cartId || !merchandiseId) {
      return NextResponse.json({ error: "cartId and merchandiseId required" }, { status: 400 });
    }

    const data = await shopifyFetch<{
      cartLinesAdd: {
        cart: { id: string; checkoutUrl: string } | null;
        userErrors: { field: string[]; message: string }[];
      };
    }>(CART_LINES_ADD, {
      cartId,
      lines: [{ merchandiseId, quantity }],
    });

    const { cart, userErrors } = data.cartLinesAdd;

    if (userErrors?.length) {
      // Surface the exact Shopify error to the client
      return NextResponse.json({ error: userErrors }, { status: 400 });
    }

    return NextResponse.json(cart);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Unknown error" }, { status: 500 });
  }
}
