'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface ConditionalInspiredSectionProps {
  collectionHandle: string;
  productHandle: string;
}

export default function ConditionalInspiredSection({ 
  collectionHandle, 
  productHandle 
}: ConditionalInspiredSectionProps) {
  const [showSection, setShowSection] = useState(false);

  useEffect(() => {
    // Check session storage flags (most reliable method)
    const fromLoreCollection = sessionStorage.getItem('fromLoreCollection') === 'true';
    const fromLoreAll = sessionStorage.getItem('fromLoreAll') === 'true';
    
    // Show section if coming from any lore page (collection or all)
    setShowSection(fromLoreCollection || fromLoreAll);
  }, [collectionHandle, productHandle]);

  if (!showSection) {
    return null;
  }

  return (
    <div className="relative z-10 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Inspired by this story?</h3>
          <p className="text-gray-600 mb-6">
            This piece is available for purchase. Bring the magic home with you.
          </p>
          <Link 
            href={`/collections/${collectionHandle}/${productHandle}`}
            className="inline-flex items-center justify-center px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            View Product →
          </Link>
        </div>
      </div>
    </div>
  );
}
