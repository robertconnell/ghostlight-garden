"use client";

import { motion } from "framer-motion";

interface AnimatedCollectionHeaderProps {
  title: string;
  description?: string;
}

export default function AnimatedCollectionHeader({ title, description }: AnimatedCollectionHeaderProps) {
  return (
    <motion.div 
      className="relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg embossed-text ghostlight-font mb-4">{title}</h1>
          {description && (
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
              {description}
            </p>
          )}
          <div className="w-72 h-1 bg-gradient-to-r from-[#FFF9F566] to-[#9A77CC] mx-auto rounded-full"></div>
        </div>
      </div>
    </motion.div>
  );
}
