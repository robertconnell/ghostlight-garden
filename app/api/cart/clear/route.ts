import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { orderId } = await req.json();
    
    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    // This endpoint would typically clear the cart from a database
    // For now, we'll just return success since the client-side cart
    // will be cleared when the user returns to the site
    
    console.log('Cart clear requested for order:', orderId);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Cart clear request processed',
      orderId 
    });

  } catch (error) {
    console.error('Cart clear error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
