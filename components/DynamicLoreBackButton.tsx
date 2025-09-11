'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface DynamicLoreBackButtonProps {
  collectionHandle: string;
  collectionTitle: string;
  productHandle: string;
}

export default function DynamicLoreBackButton({ 
  collectionHandle, 
  collectionTitle, 
  productHandle 
}: DynamicLoreBackButtonProps) {
  const [backButtonProps, setBackButtonProps] = useState({
    href: `/collections/${collectionHandle}/${productHandle}`,
    text: 'Back to Product'
  });

  useEffect(() => {
    // Check session storage flags (most reliable method)
    const fromLoreCollection = sessionStorage.getItem('fromLoreCollection') === 'true';
    const fromLoreAll = sessionStorage.getItem('fromLoreAll') === 'true';
    
    if (fromLoreCollection) {
      setBackButtonProps({
        href: `/lore/${collectionHandle}`,
        text: `Back to ${collectionTitle} Lore`
      });
      // Clear the flag after a short delay to ensure it's detected
      setTimeout(() => {
        sessionStorage.removeItem('fromLoreCollection');
      }, 100);
    } else if (fromLoreAll) {
      setBackButtonProps({
        href: '/lore/all',
        text: 'Back to All Lore'
      });
      // Clear the flag after a short delay to ensure it's detected
      setTimeout(() => {
        sessionStorage.removeItem('fromLoreAll');
      }, 100);
    } else {
      // Default to product page
      setBackButtonProps({
        href: `/collections/${collectionHandle}/${productHandle}`,
        text: 'Back to Product'
      });
    }
  }, [collectionHandle, collectionTitle, productHandle]);

  return (
    <div className="text-center mb-8 px-6">
      <Link 
        href={backButtonProps.href}
        className="inline-flex items-center gap-3 px-8 py-4 text-lg font-bold text-white bg-[#8A6D9B] hover:bg-[#8A6D9B]/90 rounded-full border-2 border-white shadow-lg button-font"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        {backButtonProps.text}
      </Link>
    </div>
  );
}
