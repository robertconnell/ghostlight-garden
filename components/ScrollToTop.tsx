"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top when pathname changes
    // Use multiple methods and add a small delay to ensure it works reliably
    const scrollToTop = () => {
      // Method 1: Modern scrollTo API
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      
      // Method 2: Direct property assignment
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // Method 3: For older browsers
      if (document.documentElement.scrollTop > 0) {
        document.documentElement.scrollTop = 0;
      }
      if (document.body.scrollTop > 0) {
        document.body.scrollTop = 0;
      }
    };

    // Immediate scroll
    scrollToTop();
    
    // Also scroll after a small delay to handle any timing issues
    const timeoutId = setTimeout(scrollToTop, 100);
    
    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
}
