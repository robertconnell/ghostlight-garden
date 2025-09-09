'use client';

import { useEffect, useState } from 'react';
import Breadcrumb from './Breadcrumb';

interface DynamicBreadcrumbProps {
  primaryCollection: {
    handle: string;
    title: string;
  };
  productTitle: string;
}

export default function DynamicBreadcrumb({ primaryCollection, productTitle }: DynamicBreadcrumbProps) {
  const [breadcrumbItems, setBreadcrumbItems] = useState([
    { label: "Home", href: "/home" },
    { label: "Collections", href: "/collections" },
    { label: primaryCollection.title, href: `/collections/${primaryCollection.handle}` },
    { label: productTitle, href: "" }
  ]);

  useEffect(() => {
    // Check session storage - same logic as DynamicBackButton
    const fromAllStorage = sessionStorage.getItem('fromAll') === 'true';
    
    console.log('=== DYNAMIC BREADCRUMB DEBUG ===');
    console.log('Debug - Session storage fromAll:', fromAllStorage);
    console.log('Debug - Primary Collection:', primaryCollection);
    
    if (fromAllStorage) {
      console.log('Debug - Setting breadcrumb to show All Artwork');
      setBreadcrumbItems([
        { label: "Home", href: "/home" },
        { label: "Collections", href: "/collections" },
        { label: "All Artwork", href: "/collections/all" },
        { label: productTitle, href: "" }
      ]);
      // Clear the session storage flag after using it (same timing as back button)
      setTimeout(() => {
        sessionStorage.removeItem('fromAll');
        console.log('Debug - Cleared fromAll flag after breadcrumb detection');
      }, 100);
    } else {
      console.log('Debug - Using default collection breadcrumb');
      setBreadcrumbItems([
        { label: "Home", href: "/home" },
        { label: "Collections", href: "/collections" },
        { label: primaryCollection.title, href: `/collections/${primaryCollection.handle}` },
        { label: productTitle, href: "" }
      ]);
    }
    console.log('=== END BREADCRUMB DEBUG ===');
  }, [primaryCollection, productTitle]);

  return <Breadcrumb items={breadcrumbItems} />;
}
