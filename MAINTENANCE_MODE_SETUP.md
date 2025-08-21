# Maintenance Mode Setup Guide

## 🚀 **How to Enable/Disable Maintenance Mode**

### **To Enable Maintenance Mode (Show Maintenance Page):**
1. **Add this to your `.env.local` file:**
   ```bash
   NEXT_PUBLIC_MAINTENANCE_MODE=true
   ```

2. **Restart your development server**
3. **All traffic will redirect to `/maintenance`**

### **To Disable Maintenance Mode (Show Full Site):**
1. **Remove or set to false in `.env.local`:**
   ```bash
   NEXT_PUBLIC_MAINTENANCE_MODE=false
   # OR just remove the line entirely
   ```

2. **Restart your development server**
3. **Normal site functionality resumes**

## 🔧 **What Happens in Maintenance Mode:**

### **✅ Allowed Access:**
- `/maintenance` - The maintenance page
- `/api/*` - API routes (for testing)
- Static files and images
- Favicon

### **❌ Redirected to Maintenance:**
- `/` (root)
- `/home`
- `/shop`
- `/about`
- `/contact`
- `/products/*`
- All other routes

## 🌐 **Perfect for:**

1. **Setting up Vercel hosting** while keeping site private
2. **Testing DNS and domain verification** without exposing full site
3. **Site maintenance and updates** with professional appearance
4. **Emergency site takedown** for bug fixes or major updates
5. **Easy toggle** when ready to launch or maintenance is complete

## 📱 **The Maintenance Page Includes:**

- ✅ Professional Ghostlight Garden branding
- ✅ Maintenance status and messaging
- ✅ Feature previews
- ✅ Status update signup
- ✅ Contact information
- ✅ Beautiful, responsive design

## 🚀 **Quick Commands:**

```bash
# Enable maintenance mode
echo "NEXT_PUBLIC_MAINTENANCE_MODE=true" >> .env.local

# Disable maintenance mode  
echo "NEXT_PUBLIC_MAINTENANCE_MODE=false" >> .env.local

# Or just remove the line
# Then restart your dev server
```

## 💡 **Pro Tips:**

1. **Use this while setting up Vercel** - perfect for domain verification
2. **Test your domain** with the maintenance page live
3. **Switch back to full site** when ready to launch or maintenance is complete
4. **Keep API routes working** for testing during maintenance
5. **Perfect for emergency situations** - quickly take site down if needed

---

**Ready to use!** Just add the environment variable and restart your server.
