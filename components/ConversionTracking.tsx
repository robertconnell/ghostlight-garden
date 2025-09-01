'use client';

import { useEffect } from 'react';

interface ConversionTrackingProps {
  eventName: string;
  eventData?: Record<string, any>;
}

export default function ConversionTracking({ eventName, eventData = {} }: ConversionTrackingProps) {
  useEffect(() => {
    // Track custom events for analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, {
        ...eventData,
        event_category: 'engagement',
        event_label: 'ghostlight_garden'
      });
    }

    // Track with Facebook Pixel if available
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', eventName, eventData);
    }
  }, [eventName, eventData]);

  return null;
}

// Global type declarations
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
  }
}
