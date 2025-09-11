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
    
    
    if (fromAllStorage) {
      setBreadcrumbItems([
        { label: "Home", href: "/home" },
        { label: "Collections", href: "/collections" },
        { label: "All Artwork", href: "/collections/all" },
        { label: productTitle, href: "" }
      ]);
      // Clear the session storage flag after using it (same timing as back button)
      setTimeout(() => {
        sessionStorage.removeItem('fromAll');
      }, 100);
    } else {
      setBreadcrumbItems([
        { label: "Home", href: "/home" },
        { label: "Collections", href: "/collections" },
        { label: primaryCollection.title, href: `/collections/${primaryCollection.handle}` },
        { label: productTitle, href: "" }
      ]);
    }
  }, [primaryCollection, productTitle]);

  return <Breadcrumb items={breadcrumbItems} />;
}
