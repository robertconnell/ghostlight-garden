'use client';

import Link from "next/link";
import { motion } from 'framer-motion';

interface BackToCollectionsButtonProps {
  href?: string;
  text?: string;
}

export default function BackToCollectionsButton({ 
  href = "/collections", 
  text = "Back to Collections" 
}: BackToCollectionsButtonProps) {
  return (
    <div className="text-center mb-8 px-6">
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {text}
        </Link>
      </motion.div>
    </div>
  );
}
