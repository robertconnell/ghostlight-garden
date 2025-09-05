'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import ProductCarousel from "@/components/ProductCarousel";

interface Product {
  id: string;
  title: string;
  handle: string;
  featuredImage?: {
    url: string;
    altText?: string;
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  collections: {
    id: string;
    title: string;
    handle: string;
  }[];
}

export default function HomePageContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollPrompt, setShowScrollPrompt] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch products for the carousel
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data.products || []);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Scroll detection for scroll prompt
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Clear any existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      // If user is at the top, start 2-second timer
      if (scrollY === 0) {
        timeoutId = setTimeout(() => {
          setShowScrollPrompt(true);
        }, 2500);
      } else {
        // If user scrolls away from top, hide prompt immediately
        setShowScrollPrompt(false);
      }
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Check initial scroll position
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full relative">
      {/* Hero Section */}
      <div 
        className="relative w-full flex flex-col justify-center items-center text-center px-6 py-20"
        style={{ minHeight: 'calc(100svh - 4rem)' }}
      >
        {/* PC Background */}
        <div
            className="hidden md:block fixed inset-0 z-0 bg-gray-50 bg-cover bg-center bg-no-repeat pointer-events-none h-[100svh]"
            style={{
            backgroundImage: 'url(/img/pc_home_background.png)',
            willChange: 'transform',
            transform: 'translateZ(0)',
            paddingBottom: 'env(safe-area-inset-bottom)',
            }}
            role="img"
            aria-label="PC background: Artistic home scene with soft shadows"
        />

        {/* Mobile Background */}
        <div
            className="md:hidden fixed inset-0 z-0 bg-gray-50 bg-cover bg-center bg-no-repeat pointer-events-none h-[100svh]"
            style={{
            backgroundImage: 'url(/img/mobile_home_background.png)',
            willChange: 'transform',
            transform: 'translateZ(0)',
            paddingBottom: 'env(safe-area-inset-bottom)',
            }}
            role="img"
            aria-label="Mobile background: Artistic home scene with soft shadows"
        />

        {/* Hero Content */}
        <div className="absolute top-1/4 left-1/10 lg:left-1/10 z-10 max-w-6xl mx-auto">
          <motion.h1 
            className="text-4xl lg:text-8xl text-white drop-shadow-lg embossed-text font-alex-brush"
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 1.2, ease: "easeOut" }}
          >
            where soft shadows bloom
          </motion.h1>
        </div>

        {/* Scroll Prompt */}
        <motion.div 
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 cursor-pointer z-10"
          initial={{ opacity: 0, y: 15 }}
          animate={{ 
            opacity: showScrollPrompt ? 1 : 0, 
            y: showScrollPrompt ? 0 : 20 
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex flex-col items-center text-white drop-shadow-lg">
            <span className="text-lg mb-2">scroll to see more</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m0 0l-7-7m7 7l7-7" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* White Content Section - starts immediately after fog */}
      <div className="relative bg-white flex-1 flex flex-col">
        {/* Content */}
        <div className="relative pt-6 w-full flex-1">
          {/* Featured Products Section */}
          <div className="w-full pt-8 mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 drop-shadow-md ghostlight-font">
                Featured Artwork
              </h2>
              <p className="text-md text-gray-600 max-w-2xl mx-auto drop-shadow-sm">
                Explore our curated selection of unique, hand-painted pieces that bring spooky-cute charm to any space.
              </p>
            </motion.div>

            {/* Product Carousel */}
            <div className="w-full">
              <div className="w-full bg-gray-300/10 border-t border-gray-400/20 py-8 relative">
                {/* Fade effect at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 1.2,
                    delay: 1.4,
                    ease: "easeOut"
                  }}
                >
                  {isLoading ? (
                    <div className="w-full h-64 rounded-lg flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                    </div>
                  ) : (
                    <ProductCarousel products={products} />
                  )}
                </motion.div>
              </div>
            </div>

            {/* Adopt a Gloomie Button */}
            <motion.div 
              className="text-center lg:mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.6, ease: "easeOut" }}
            >
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
                  href="/collections"
                  className="inline-flex items-center gap-3 px-8 py-4 text-lg font-bold text-white bg-[#8A6D9B] hover:bg-[#8A6D9B]/90 rounded-full border-2 border-white shadow-lg button-font"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Adopt a Gloomie
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Brand Logo Section */}
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.8, ease: "easeOut" }}
          >
              <img 
                src="/img/brand_logo.png" 
                alt="Ghostlight Garden" 
                className="mx-auto w-[16rem] h-[16rem] lg:w-[24rem] lg:h-[24rem] drop-shadow-lg"
              />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
