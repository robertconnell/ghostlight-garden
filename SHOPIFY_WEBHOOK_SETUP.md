# Shopify Webhook Setup for Cart Clearing

This guide explains how to set up Shopify webhooks to automatically clear user carts after successful payment.

## 🚀 Features Implemented

### 1. **Cart Expiration (7 days)**
- Cart items automatically expire after 1 week
- Expired items are filtered out on page load
- Background cleanup runs every hour

### 2. **Shopify Webhook Integration**
- Webhook endpoint: `/api/shopify/webhook`
- Handles `orders/paid` events
- Automatically clears cart after payment confirmation

## 🔧 Setup Instructions

### Step 1: Environment Variables
Add these to your `.env.local`:

```bash
SHOPIFY_WEBHOOK_SECRET=your_webhook_secret_here
```

### Step 2: Shopify Admin Setup
1. Go to your Shopify Admin → Settings → Notifications
2. Scroll down to "Webhooks"
3. Click "Create webhook"
4. Configure as follows:

**Webhook Details:**
- **Event**: `Order payment`
- **Format**: `JSON`
- **URL**: `https://yourdomain.com/api/shopify/webhook`
- **Version**: `2025-07` (latest stable version)

### Step 3: Webhook Secret
1. After creating the webhook, Shopify will show a webhook secret
2. Copy this secret to your `.env.local` as `SHOPIFY_WEBHOOK_SECRET`

## 🔄 How It Works

### Cart Flow:
1. **User adds items** → Cart stored with timestamp
2. **User clicks checkout** → Cart marked as "ordered" with Shopify cart ID
3. **User completes payment** → Shopify sends `orders/paid` webhook
4. **Webhook processes** → Cart cleared automatically
5. **User returns** → Clean, empty cart

### Expiration Flow:
1. **Items added** → Timestamp recorded
2. **7 days pass** → Items marked as expired
3. **Page loads** → Expired items filtered out
4. **Background cleanup** → Runs every hour

## 🛡️ Security Features

- **HMAC verification** of webhook signatures
- **Webhook secret** validation
- **Error handling** for invalid requests
- **Logging** for debugging and monitoring

## 📝 API Endpoints

### Webhook Endpoint
- **URL**: `/api/shopify/webhook`
- **Method**: `POST`
- **Purpose**: Receives Shopify order events

### Cart Clear Endpoint
- **URL**: `/api/cart/clear`
- **Method**: `POST`
- **Purpose**: Clears cart by order ID

## 🐛 Troubleshooting

### Webhook Not Working?
1. Check `SHOPIFY_WEBHOOK_SECRET` in `.env.local`
2. Verify webhook URL is accessible
3. Check browser console for errors
4. Verify Shopify webhook is active

### Cart Not Clearing?
1. Check webhook logs in browser console
2. Verify order completion in Shopify
3. Check localStorage for cart state
4. Ensure webhook endpoint is reachable

## 🔮 Future Enhancements

- **Database storage** for cart persistence
- **User authentication** for cart ownership
- **Email notifications** for cart expiration
- **Analytics tracking** for cart behavior
- **A/B testing** for cart expiration times

## 📚 Additional Resources

- [Shopify Webhooks Documentation](https://shopify.dev/docs/apps/webhooks)
- [Webhook Security Best Practices](https://shopify.dev/docs/apps/auth/oauth/webhooks)
- [Order Events Reference](https://shopify.dev/docs/api/reference/orders)
