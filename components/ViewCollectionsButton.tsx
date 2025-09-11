'use client';

import Link from "next/link";
import { motion } from 'framer-motion';

interface ViewCollectionsButtonProps {
  href?: string;
  text?: string;
}

export default function ViewCollectionsButton({ 
  href = "/collections", 
  text = "View Collections" 
}: ViewCollectionsButtonProps) {
  return (
    <div className="text-center mb-12 px-6">
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
          href={href}
          className="inline-flex items-center gap-3 px-8 py-4 text-lg font-bold text-white bg-[#8A6D9B] hover:bg-[#8A6D9B]/90 rounded-full border-2 border-white shadow-lg button-font"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          {text}
        </Link>
      </motion.div>
    </div>
  );
}
