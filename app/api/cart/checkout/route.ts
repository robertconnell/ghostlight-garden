import { NextRequest, NextResponse } from 'next/server';
import { shopifyFetch } from '@/lib/shopify';

const GET_CART = /* GraphQL */ `
  query GetCart($id: ID!) {
    cart(id: $id) {
      checkoutUrl
    }
  }
`;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cartId = searchParams.get('cartId');

    if (!cartId) {
      return NextResponse.json({ error: 'Cart ID is required' }, { status: 400 });
    }

    // Get the checkout URL from Shopify for this cart
    const data = await shopifyFetch<{ cart: { checkoutUrl: string } }>(
      GET_CART,
      { id: cartId }
    );

    const checkoutUrl = data.cart?.checkoutUrl;
    
    if (!checkoutUrl) {
      throw new Error('No checkout URL returned from Shopify');
    }

    return NextResponse.json({ checkoutUrl });

  } catch (error) {
    console.error('Checkout API error:', error);
    return NextResponse.json(
      { error: 'Failed to get checkout URL' }, 
      { status: 500 }
    );
  }
}
