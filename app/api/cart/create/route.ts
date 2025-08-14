import { NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify";

const CART_CREATE = /* GraphQL */ `
  mutation CartCreate($input: CartInput) {
    cartCreate(input: $input) {
      cart { id checkoutUrl }
      userErrors { field message }
    }
  }
`;

export async function POST() {
  const data = await shopifyFetch<{ cartCreate: { cart: { id: string; checkoutUrl: string } } }>(
    CART_CREATE,
    { input: {} }
  );
  return NextResponse.json(data.cartCreate.cart);
}
