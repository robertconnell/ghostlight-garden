import { NextResponse } from 'next/server';
import { shopifyFetch } from '@/lib/shopify';
import { GET_COLLECTION_BY_HANDLE } from '@/lib/queries';

export async function GET() {
  try {
    // Fetch only products from the "Featured Artwork" collection
    const data = await shopifyFetch<{ collection: any }>(GET_COLLECTION_BY_HANDLE, { 
      handle: 'featured-artwork' 
    });
    
    if (!data.collection?.products?.edges) {
      return NextResponse.json({ products: [] });
    }

    // Transform the data to match the carousel interface
    const products = data.collection.products.edges.map(({ node }: { node: any }) => ({
      id: node.id,
      title: node.title,
      handle: node.handle,
      featuredImage: node.featuredImage,
      priceRange: node.priceRange,
    }));

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return NextResponse.json({ products: [] }, { status: 500 });
  }
}
