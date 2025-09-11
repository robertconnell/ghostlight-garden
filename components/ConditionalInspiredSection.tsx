'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
          <motion.div
            className="inline-block rounded-full"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(255, 255, 255, 0.6)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{
              boxShadow: { duration: 0.4, ease: "easeInOut" }
            }}
          >
            <Link 
              href={`/collections/${collectionHandle}/${productHandle}`}
              className="inline-flex items-center gap-3 px-8 py-4 text-lg font-bold text-white bg-[#8A6D9B] hover:bg-[#8A6D9B]/90 rounded-full border-2 border-white shadow-lg button-font"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              View Product
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
