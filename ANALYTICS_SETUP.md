# 🚀 Analytics Setup Guide for Ghostlight Garden Launch

## 📊 Google Analytics 4 (GA4) Setup

### Step 1: Create Google Analytics Account
1. Go to [analytics.google.com](https://analytics.google.com)
2. Click "Start measuring"
3. Follow the setup wizard:
   - Account name: `Ghostlight Garden`
   - Property name: `Ghostlight Garden Website`
   - Reporting time zone: `Eastern Time (US & Canada)`
   - Currency: `USD`

### Step 2: Get Your Measurement ID
1. In your GA4 property, go to **Admin** → **Data Streams**
2. Click **Web** → **Add stream**
3. Enter your website URL: `https://ghostlightgarden.com`
4. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

### Step 3: Update Your Code
1. Open `components/GoogleAnalytics.tsx`
2. Replace `G-XXXXXXXXXX` with your actual Measurement ID
3. Save the file

### Step 4: Verify Installation
1. Visit your website
2. Open browser DevTools → Console
3. You should see Google Analytics loading (no errors)
4. Check GA4 Real-time reports to confirm data is flowing

## 🔍 Google Search Console Setup

### Step 1: Add Your Property
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Click "Add property"
3. Enter your domain: `ghostlightgarden.com`
4. Choose **Domain** property type (recommended)

### Step 2: Verify Ownership
1. Download the HTML verification file
2. Upload it to your website's root directory
3. Click "Verify" in Search Console

### Step 3: Submit Your Sitemap
1. In Search Console, go to **Sitemaps**
2. Add your sitemap URL: `https://ghostlightgarden.com/sitemap.xml`
3. Submit for indexing

## 📈 What We're Tracking

### Page Views
- ✅ All page visits automatically tracked
- ✅ Navigation between pages
- ✅ Time on page

### User Engagement
- ✅ Button clicks (Add to Cart, Buy Now, etc.)
- ✅ Form submissions (Contact form)
- ✅ Product interactions
- ✅ Navigation patterns

### E-commerce (Future)
- ✅ Product views
- ✅ Add to cart actions
- ✅ Purchase completions
- ✅ Cart abandonment

### Performance Metrics
- ✅ Page load times
- ✅ User experience metrics
- ✅ Mobile vs desktop usage
- ✅ Geographic data

## 🎯 Key Metrics to Monitor

### Launch Phase (First 30 Days)
1. **Traffic Sources**: Where are visitors coming from?
2. **Page Performance**: Which pages are most popular?
3. **User Behavior**: How are people navigating your site?
4. **Mobile Usage**: What devices are people using?

### Growth Phase (30-90 Days)
1. **Conversion Rates**: How many visitors take action?
2. **Content Performance**: Which products/content perform best?
3. **User Journey**: What paths lead to conversions?
4. **Bounce Rate**: Are people finding what they need?

### Optimization Phase (90+ Days)
1. **A/B Testing**: Test different layouts/content
2. **Performance Optimization**: Improve load times
3. **SEO Improvements**: Based on search console data
4. **User Experience**: Refine based on behavior data

## 🛠️ Advanced Tracking (Future Versions)

### Custom Events
- Newsletter signups
- Social media clicks
- Video views
- File downloads

### Enhanced E-commerce
- Product category performance
- Shopping cart analysis
- Checkout funnel optimization
- Customer lifetime value

### User Segmentation
- New vs returning visitors
- Geographic targeting
- Device preferences
- Behavior-based segments

## 📱 Mobile App Analytics (Future)

When you expand to mobile apps:
- Firebase Analytics integration
- Cross-platform user tracking
- App-specific metrics
- Push notification performance

## 🔒 Privacy & Compliance

### GDPR Compliance
- ✅ User consent management (future implementation)
- ✅ Data anonymization options
- ✅ Cookie consent banner (future implementation)

### CCPA Compliance
- ✅ California privacy rights
- ✅ Data deletion requests
- ✅ Opt-out mechanisms

## 🚀 Launch Checklist

- [ ] Google Analytics 4 account created
- [ ] Measurement ID updated in code
- [ ] Google Search Console property added
- [ ] Sitemap submitted
- [ ] Analytics data flowing
- [ ] Search Console indexing started
- [ ] Privacy policy updated (if needed)

## 📞 Support & Resources

- **Google Analytics Help**: [support.google.com/analytics](https://support.google.com/analytics)
- **Google Search Console Help**: [support.google.com/webmasters](https://support.google.com/webmasters)
- **Next.js Analytics**: [nextjs.org/docs/app/building-your-application/optimizing/analytics](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)

---

**Your analytics foundation is now ready for launch! 🎉**

This setup will give you comprehensive insights into your website's performance and user behavior, helping you make data-driven decisions for future improvements.
