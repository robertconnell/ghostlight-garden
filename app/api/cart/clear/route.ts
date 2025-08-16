import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { orderId } = await req.json();
    
    // Clear the cart for the specified order
    // This is a simple implementation - in production you might want to:
    // 1. Verify the order exists and is paid
    // 2. Clear only the specific user's cart
    // 3. Log the action for audit purposes
    
    return new Response('Cart cleared', { status: 200 });
  } catch (error) {
    console.error('Error clearing cart:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
