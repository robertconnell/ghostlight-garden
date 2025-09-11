'use client';

import { useEffect, useState } from 'react';
import BackToCollectionsButton from './BackToCollectionsButton';

interface DynamicBackButtonProps {
  primaryCollection: {
    handle: string;
    title: string;
  };
}

export default function DynamicBackButton({ primaryCollection }: DynamicBackButtonProps) {
  const [backButtonProps, setBackButtonProps] = useState({
    href: `/collections/${primaryCollection.handle}`,
    text: `Back to ${primaryCollection.title}`
  });

  useEffect(() => {
    // Check multiple sources for referrer information
    const referrer = document.referrer;
    const currentUrl = window.location.href;
    
    // Check URL parameters first
    const urlParams = new URLSearchParams(window.location.search);
    const fromAll = urlParams.get('from') === 'all';
    
    // Check session storage - this is the most reliable method
    const fromAllStorage = sessionStorage.getItem('fromAll') === 'true';
    
    // Only check referrer if it's a direct navigation (not client-side routing)
    const referrerFromAll = referrer && referrer.includes('/collections/all') && !referrer.includes(window.location.origin);
    
    
    // Only use session storage method for reliability
    if (fromAllStorage) {
      setBackButtonProps({
        href: '/collections/all',
        text: 'Back to All'
      });
      // Clear the session storage flag after a short delay to ensure it's detected
      setTimeout(() => {
        sessionStorage.removeItem('fromAll');
      }, 100);
    } else {
      setBackButtonProps({
        href: `/collections/${primaryCollection.handle}`,
        text: `Back to ${primaryCollection.title}`
      });
    }
  }, [primaryCollection]);

  // Note: Session storage cleanup is handled in the main useEffect with setTimeout

  return (
    <BackToCollectionsButton 
      href={backButtonProps.href}
      text={backButtonProps.text}
    />
  );
}
