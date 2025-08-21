# Environment Configuration Guide

## 🎛️ **All Configuration Flags in One Place**

This guide shows you how to control all aspects of your Ghostlight Garden site using environment variables in your `.env.local` file.

## 📁 **File Location**
Create or update: `.env.local` (in your project root)

## 🔧 **Complete Configuration Template**

```bash
# ========================================
# GHOSTLIGHT GARDEN - ENVIRONMENT CONFIG
# ========================================

# ========================================
# SHOPIFY CONFIGURATION
# ========================================
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_TOKEN=your_token_here
SHOPIFY_STOREFRONT_API_VERSION=2025-07
SHOPIFY_WEBHOOK_SECRET=your_webhook_secret

# ========================================
# EMAIL SERVICE (RESEND)
# ========================================
RESEND_API_KEY=your_resend_key_here

# ========================================
# SITE BEHAVIOR FLAGS
# ========================================
# Show maintenance page (true) or full site (false)
NEXT_PUBLIC_MAINTENANCE_MODE=true

# Protect images from right-click save (true = protected, false = unprotected)
IMAGE_PROTECTION_ENABLED=false

# ========================================
# FUTURE CONFIGURATION OPTIONS
# ========================================
# ENABLE_ANALYTICS=false
# MAINTENANCE_MODE=false
# ENABLE_BLOG=false
# ENABLE_REVIEWS=false

# ========================================
# NOTES & INSTRUCTIONS
# ========================================
# - Restart dev server after changing any values
# - Keep API keys secure and never commit to git
# - All boolean flags use 'true' or 'false' (strings)
# - NEXT_PUBLIC_* variables are visible in browser
# ========================================
```

## 🚀 **How to Use Each Flag**

### **1. Maintenance Mode**
```bash
# Show maintenance page (for domain verification, hosting setup, updates)
NEXT_PUBLIC_MAINTENANCE_MODE=true

# Show full site (for normal operation)
NEXT_PUBLIC_MAINTENANCE_MODE=false
```

### **2. Image Protection**
```bash
# Protect images from right-click save (recommended for live site)
IMAGE_PROTECTION_ENABLED=true

# Allow normal image interaction (good for development)
IMAGE_PROTECTION_ENABLED=false
```

### **3. Shopify Configuration**
```bash
# Your Shopify store domain
SHOPIFY_STORE_DOMAIN=mystore.myshopify.com

# Your Storefront API access token
SHOPIFY_STOREFRONT_TOKEN=your_token_here

# API version (keep current unless you need specific features)
SHOPIFY_STOREFRONT_API_VERSION=2025-07

# Secret for webhook verification
SHOPIFY_WEBHOOK_SECRET=your_webhook_secret
```

### **4. Email Service**
```bash
# Your Resend API key for contact form emails
RESEND_API_KEY=your_resend_key_here
```

## 🔄 **Quick Toggle Commands**

### **Enable Development Mode (Coming Soon Page):**
```bash
echo "NEXT_PUBLIC_DEVELOPMENT_MODE=true" >> .env.local
```

### **Disable Development Mode (Full Site):**
```bash
echo "NEXT_PUBLIC_DEVELOPMENT_MODE=false" >> .env.local
```

### **Enable Image Protection:**
```bash
echo "IMAGE_PROTECTION_ENABLED=true" >> .env.local
```

### **Disable Image Protection:**
```bash
echo "IMAGE_PROTECTION_ENABLED=false" >> .env.local
```

## 📱 **What Each Flag Controls**

### **NEXT_PUBLIC_MAINTENANCE_MODE**
- ✅ **true**: Shows maintenance page, redirects all traffic
- ✅ **false**: Shows full site with all functionality
- 🌐 **Use case**: Domain verification, hosting setup, updates, maintenance

### **IMAGE_PROTECTION_ENABLED**
- ✅ **true**: Prevents right-click save, drag & drop, context menu
- ✅ **false**: Normal image interaction allowed
- 🌐 **Use case**: Protect artwork from easy downloading

### **SHOPIFY_* Variables**
- ✅ **Store connection**: Products, cart, checkout
- ✅ **API access**: Product data, inventory
- ✅ **Webhooks**: Order notifications, cart clearing

### **RESEND_API_KEY**
- ✅ **Contact form**: Sends emails to info@ghostlightgarden.com
- ✅ **Email delivery**: Reliable email service

## 🎯 **Recommended Settings by Scenario**

### **Development & Testing:**
```bash
NEXT_PUBLIC_DEVELOPMENT_MODE=false
IMAGE_PROTECTION_ENABLED=false
```

### **Domain Verification & Hosting Setup:**
```bash
NEXT_PUBLIC_MAINTENANCE_MODE=true
IMAGE_PROTECTION_ENABLED=false
```

### **Site Maintenance & Updates:**
```bash
NEXT_PUBLIC_MAINTENANCE_MODE=true
IMAGE_PROTECTION_ENABLED=true
```

### **Live Site (September 1st):**
```bash
NEXT_PUBLIC_MAINTENANCE_MODE=false
IMAGE_PROTECTION_ENABLED=true
```

## ⚠️ **Important Notes**

1. **Restart Required**: Always restart your dev server after changing `.env.local`
2. **Security**: Never commit API keys or secrets to git
3. **Boolean Values**: Use `'true'` or `'false'` (strings), not `true` or `false`
4. **NEXT_PUBLIC**: Variables starting with `NEXT_PUBLIC_` are visible in browser
5. **File Location**: `.env.local` should be in your project root directory

## 🔍 **Troubleshooting**

### **Flag Not Working?**
- ✅ Check `.env.local` file location (project root)
- ✅ Restart your development server
- ✅ Verify spelling and case sensitivity
- ✅ Check for extra spaces around `=`

### **Need to Reset?**
- ✅ Delete `.env.local` and restart server
- ✅ All flags will use their default values

---

**🎉 All your configuration is now centralized in one place!**
