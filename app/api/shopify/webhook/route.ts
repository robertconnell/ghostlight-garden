import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Shopify webhook verification
function verifyWebhook(req: NextRequest, body: string): boolean {
  const hmacHeader = req.headers.get('x-shopify-hmac-sha256');
  if (!hmacHeader) return false;

  const secret = process.env.SHOPIFY_WEBHOOK_SECRET;
  if (!secret) {
    console.error('SHOPIFY_WEBHOOK_SECRET not configured');
    return false;
  }

  const hash = crypto
    .createHmac('sha256', secret)
    .update(body, 'utf8')
    .digest('base64');

  return crypto.timingSafeEqual(
    Buffer.from(hash, 'base64'),
    Buffer.from(hmacHeader, 'base64')
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    
    // Verify webhook authenticity
    if (!verifyWebhook(req, body)) {
      console.error('Invalid webhook signature');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = JSON.parse(body);
    const topic = req.headers.get('x-shopify-topic');
    
    console.log('Shopify webhook received:', { topic, orderId: data.id });

    // Handle different webhook topics
    switch (topic) {
      case 'orders/paid':
        // Order was successfully paid - clear the user's cart
        await handleOrderPaid(data);
        break;
        
      case 'orders/fulfilled':
        // Order was fulfilled - could also clear cart here
        console.log('Order fulfilled:', data.id);
        break;
        
      case 'orders/cancelled':
        // Order was cancelled - don't clear cart, let user keep items
        console.log('Order cancelled:', data.id);
        break;
        
      default:
        console.log('Unhandled webhook topic:', topic);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function handleOrderPaid(orderData: any) {
  try {
    console.log('Order paid, processing cart clearance for order:', orderData.id);
    
    // Extract customer information if available
    const customerEmail = orderData.customer?.email;
    const orderId = orderData.id;
    
    // For now, we'll clear all carts since we can't easily match them
    // In a production app, you might want to:
    // 1. Store cart IDs with user sessions
    // 2. Use customer email to find and clear specific carts
    // 3. Implement a more sophisticated cart-user mapping
    
    console.log('Order completed successfully. Cart should be cleared.');
    
    // You could implement cart clearing logic here:
    // - Clear from database if using server-side carts
    // - Send a message to client to clear localStorage
    // - Set a flag to clear cart on next page load
    
  } catch (error) {
    console.error('Error handling order paid:', error);
  }
}
