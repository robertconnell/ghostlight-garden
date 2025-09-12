'use client';

import { motion } from "framer-motion";
import LoreProductLink from "./LoreProductLink";

interface Product {
  id: string;
  title: string;
  handle: string;
  featuredImage?: {
    url: string;
    altText?: string;
    width: number;
    height: number;
  };
  isFromLimitedCollection?: boolean;
}

interface AnimatedLoreProductGridProps {
  products: Product[];
  collectionHandle: string;
}

export default function AnimatedLoreProductGrid({ products, collectionHandle }: AnimatedLoreProductGridProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product: Product, index: number) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.3 + index * 0.1,
            ease: "easeOut"
          }}
          whileHover={{
            boxShadow: "0 0 20px rgba(138, 109, 155, 0.4), 0 0 40px rgba(138, 109, 155, 0.2)"
          }}
        >
          <LoreProductLink
            href={`/lore/${collectionHandle}/${product.handle}`}
            className="group block"
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Product Image */}
              <div className="aspect-square overflow-hidden relative">
                {product.featuredImage ? (
                  <>
                    <img
                      src={product.featuredImage.url}
                      alt={product.featuredImage.altText || product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Brand Logo Overlay */}
                    <div className="absolute bottom-2 left-2 pointer-events-none">
                      <img
                        src="/img/brand_logo.png"
                        alt="Ghostlight Garden"
                        className="opacity-50 w-1/3 h-1/3"
                      />
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                    <span className="text-gray-400 text-lg">{product.title}</span>
                  </div>
                )}
                
                {/* Limited Collection Gold Star */}
                {product.isFromLimitedCollection && (
                  <div className="absolute top-3 right-3 z-10">
                    <svg className="w-8 h-8 text-pink-200 drop-shadow-md" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                )}
              </div>
              
              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-700 drop-shadow-md group-hover:text-purple-900 transition-colors flex-1">
                    {product.title}
                  </h3>
                  {/* Limited badge */}
                  {product.isFromLimitedCollection && (
                    <span className="text-lg text-purple-300 font-bold ml-2 drop-shadow-md">
                      Limited
                    </span>
                  )}
                </div>
                
                {/* Read Lore Link */}
                <div className="flex items-center justify-end">
                  <span className="text-purple-900 group-hover:text-purple-300 font-medium transition-colors">
                    Read Full Lore →
                  </span>
                </div>
              </div>
            </div>
          </LoreProductLink>
        </motion.div>
      ))}
    </div>
  );
}
