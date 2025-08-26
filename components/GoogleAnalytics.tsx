'use client';

import { GoogleAnalytics } from '@next/third-parties/google';

export default function Analytics() {
  // Replace 'G-XXXXXXXXXX' with your actual Google Analytics 4 Measurement ID
  const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';
  
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    console.warn('Google Analytics: Please set your GA4 Measurement ID in components/GoogleAnalytics.tsx');
    return null;
  }

  return <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />;
}
