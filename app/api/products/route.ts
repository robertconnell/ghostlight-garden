import { NextResponse } from 'next/server';
import { shopifyFetch } from '@/lib/shopify';
import { GET_PRODUCTS } from '@/lib/queries';

export async function GET() {
  try {
    const data = await shopifyFetch<{ products: any }>(GET_PRODUCTS, { first: 10 });
    
    if (!data.products?.edges) {
      return NextResponse.json({ products: [] });
    }

    // Transform the data to match the carousel interface
    const products = data.products.edges.map(({ node }: { node: any }) => ({
      id: node.id,
      title: node.title,
      handle: node.handle,
      featuredImage: node.featuredImage,
      priceRange: node.priceRange,
    }));

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ products: [] }, { status: 500 });
  }
}
