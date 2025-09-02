import { NextRequest, NextResponse } from 'next/server';
import { shopifyFetch } from '@/lib/shopify';
import { GET_COLLECTIONS } from '@/lib/queries';

export async function GET(request: NextRequest) {
  try {
    const data = await shopifyFetch<{ collections: { edges: { node: any }[] } }>(
      GET_COLLECTIONS, 
      { first: 50 }
    );
    
    if (data && data.collections && data.collections.edges) {
      const collections = data.collections.edges.map(e => e.node);
      
      return NextResponse.json({ 
        success: true, 
        collections 
      });
    } else {
      console.error('❌ API: Invalid data structure:', data);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid data structure received from Shopify' 
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('💥 API: Error fetching collections:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to fetch collections' 
      },
      { status: 500 }
    );
  }
}
