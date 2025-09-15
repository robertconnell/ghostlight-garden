"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";

interface Product {
  id: string;
  title: string;
  handle: string;
  featuredImage?: { 
    url: string; 
    altText?: string; 
    width: number; 
    height: number 
  } | null;
  priceRange: { 
    minVariantPrice: { 
      amount: string; 
      currencyCode: string 
    } 
  };
  availableForSale?: boolean;
  createdAt?: string;
}

interface ShopContentProps {
  products: Product[];
  searchTerm?: string;
}

export default function ShopContent({ products, searchTerm = "" }: ShopContentProps) {
  // Filter products based on search term
  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    
    return products.filter(product => 
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // 0.1s delay between each child
        delayChildren: 0.2,   // 0.2s delay before starting
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  };

  if (searchTerm && filteredProducts.length === 0) {
    return (
      <motion.div 
        className="text-center py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-lg text-gray-600 mb-2">No products found for "{searchTerm}"</p>
        <p className="text-sm text-gray-500 mb-4">Try a different search term</p>
        <button
          onClick={() => window.location.href = '/collections'}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          title="Clear search and show all products"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Clear Search & Show All
        </button>
      </motion.div>
    );
  }

  return (
    <>
      {/* Search Results Header */}
      {searchTerm && (
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold text-gray-900">
              Search Results for "{searchTerm}"
            </h2>
            <button
              onClick={() => window.location.href = '/collections'}
              className="flex items-center gap-2 px-3 py-1.5 text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              title="Clear search and show all products"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear Search
            </button>
          </div>
          <p className="text-sm text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </motion.div>
      )}

      {/* Products Grid with Staggered Animation */}
      <motion.div 
        className="grid gap-6 grid-cols-2 tablet:grid-cols-3 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            variants={itemVariants}
            whileHover={{ 
              y: -5, 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <ProductCard product={product} collectionHandle="all" />
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}
