"use client";

import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

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
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
}

interface AnimatedProductGridProps {
  products: Product[];
  collectionHandle: string;
  isLimitedCollection?: boolean;
}

export default function AnimatedProductGrid({ products, collectionHandle, isLimitedCollection = false }: AnimatedProductGridProps) {
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
          <ProductCard 
            product={product} 
            collectionHandle={collectionHandle} 
            isLimitedCollection={isLimitedCollection}
          />
        </motion.div>
      ))}
    </div>
  );
}
