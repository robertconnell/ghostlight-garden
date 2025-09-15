"use client";

import { motion } from "framer-motion";

interface AnimatedAllProductsHeaderProps {
  title: string;
  description: string;
}

export default function AnimatedAllProductsHeader({ title, description }: AnimatedAllProductsHeaderProps) {
  return (
    <motion.div 
      className="relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="text-center">
          <h1 className="text-4xl tablet:text-5xl font-bold text-white drop-shadow-lg embossed-text ghostlight-font mb-4">{title}</h1>
          <p className="text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed drop-shadow-md mb-6">
            {description}
          </p>
          <div className="w-48 h-1 bg-gradient-to-r from-[#FFF9F566] to-[#9A77CC] mx-auto rounded-full"></div>
        </div>
      </div>
    </motion.div>
  );
}
