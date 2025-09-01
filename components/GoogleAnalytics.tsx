'use client';

import { GoogleAnalytics } from '@next/third-parties/google';

export default function Analytics() {
  // Get GA4 Measurement ID from environment variable
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    console.warn('Google Analytics: Please set your GA4 Measurement ID in .env.local as NEXT_PUBLIC_GA_MEASUREMENT_ID');
    return null;
  }

  return <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />;
}
