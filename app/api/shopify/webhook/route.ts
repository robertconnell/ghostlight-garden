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
    
    // Handle different webhook topics
    switch (topic) {
      case 'orders/paid':
        // Order was successfully paid - clear the user's cart
        await handleOrderPaid(data);
        break;
        
      case 'orders/fulfilled':
        // Order was fulfilled - could also clear cart here
        break;
        
      case 'orders/cancelled':
        // Order was cancelled - don't clear cart, let user keep items
        break;
        
      default:
        // Unhandled webhook topic
        break;
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function handleOrderPaid(orderData: any) {
  try {
    // Process the order data
    if (orderData && orderData.financial_status === 'paid') {
      // Order was paid - clear the cart for this order
      try {
        // Clear cart by order ID
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cart/clear`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ orderId: orderData.id }),
        });
      } catch (error) {
        console.error('Failed to clear cart:', error);
      }
    }

    return new Response('OK', { status: 200 });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
