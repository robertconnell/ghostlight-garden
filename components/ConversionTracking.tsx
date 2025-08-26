'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

interface ConversionTrackingProps {
  eventName: string;
  eventCategory?: string;
  eventLabel?: string;
  eventValue?: number;
}

export function trackEvent(
  eventName: string,
  eventCategory: string = 'engagement',
  eventLabel?: string,
  eventValue?: number
) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: eventCategory,
      event_label: eventLabel,
      value: eventValue,
    });
  }
}

// Track page views
export function trackPageView(url: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-XXXXXXXXXX', {
      page_path: url,
    });
  }
}

// Track form submissions
export function trackFormSubmission(formName: string) {
  trackEvent('form_submit', 'form', formName);
}

// Track button clicks
export function trackButtonClick(buttonName: string, buttonLocation: string) {
  trackEvent('button_click', 'ui', `${buttonName}_${buttonLocation}`);
}

// Track product interactions
export function trackProductView(productName: string, productId: string) {
  trackEvent('view_item', 'ecommerce', productName, 1);
}

// Track add to cart
export function trackAddToCart(productName: string, productId: string, price: number) {
  trackEvent('add_to_cart', 'ecommerce', productName, price);
}

// Track purchase
export function trackPurchase(orderId: string, value: number, currency: string = 'USD') {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: orderId,
      value: value,
      currency: currency,
    });
  }
}

export default function ConversionTracking() {
  useEffect(() => {
    // Track initial page view
    trackPageView(window.location.pathname);
    
    // Track navigation changes
    const handleRouteChange = (url: string) => {
      trackPageView(url);
    };

    // Listen for Next.js route changes
    if (typeof window !== 'undefined') {
      window.addEventListener('popstate', () => {
        handleRouteChange(window.location.pathname);
      });
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('popstate', () => {
          handleRouteChange(window.location.pathname);
        });
      }
    };
  }, []);

  return null; // This component doesn't render anything
}
