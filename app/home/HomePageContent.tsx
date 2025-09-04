'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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
}

export default function HomePageContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div>
      {/* PC Background */}
      <div className="hidden md:block fixed inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(/img/pc_home_background.png)',
            willChange: 'transform',
            transform: 'translateZ(0)'
          }}
          role="img"
          aria-label="PC background: Artistic garden scene with soft shadows and blooming flowers"
        />
      </div>

      {/* Mobile Background */}
      <div className="md:hidden fixed inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(/img/mobile_home_background.png)',
            willChange: 'transform',
            transform: 'translateZ(0)'
          }}
          role="img"
          aria-label="Mobile background: Artistic garden scene with soft shadows and blooming flowers"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section - account for navigation bar height */}
        <div className="flex flex-col text-white px-4 relative" style={{ height: 'calc(100vh - 4rem)' }}>
          {/* Container with maxWidth constraint */}
          <div style={{
            maxWidth: 'clamp(60%, 70vw, 80%)',
            overflow: 'visible'
          }}>
            <motion.h1 
              className="font-alex-brush
                text-4xl
                md:text-6xl
                lg:text-7xl
                xl:text-8xl
                text-left
                absolute
                top-1/4
                md:top-1/5
                lg:top-1/5
                xl:top-1/5
                left-4
                md:left-8
                lg:left-12
                xl:left-16"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0}}
              transition={{ 
                duration: 1.2, 
                delay: 0.4,
                ease: "easeOut"
              }}
            >
              where soft shadows bloom
            </motion.h1>
          </div>

          {/* Animated Misty Fog Transition - at bottom of adjusted viewport */}
          {/* Temporarily hidden until custom media is ready
          <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none overflow-hidden z-20">
            <div className="absolute inset-0">
              <div 
                className="absolute top-0 left-0 w-full h-full opacity-60"
                style={{
                  background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1200 200\'%3E%3Cdefs%3E%3Cfilter id=\'fog\' x=\'-50%25\' y=\'-50%25\' width=\'200%25\' height=\'200%25\'%3E%3CfeGaussianBlur stdDeviation=\'15\'/%3E%3C/filter%3E%3C/defs%3E%3Cpath d=\'M0,50 Q200,20 400,50 T800,50 T1200,50 L1200,200 L0,200 Z\' fill=\'%23f0f0f0\' filter=\'url(%23fog)\'/%3E%3C/svg%3E")',
                  backgroundSize: '1200px 200px',
                  backgroundRepeat: 'repeat-x',
                  animation: 'fog-drift-left 20s linear infinite'
                }}
              />
              
              <div 
                className="absolute top-0 left-0 w-full h-full opacity-40"
                style={{
                  background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1200 200\'%3E%3Cdefs%3E%3Cfilter id=\'fog2\' x=\'-50%25\' y=\'-50%25\' width=\'200%25\' height=\'200%25\'%3E%3CfeGaussianBlur stdDeviation=\'20\'/%3E%3C/filter%3E%3C/defs%3E%3Cpath d=\'M0,80 Q300,40 600,80 T900,80 T1200,80 L1200,200 L0,200 Z\' fill=\'%23e8e8e8\' filter=\'url(%23fog2)\'/%3E%3C/svg%3E")',
                  backgroundSize: '1200px 200px',
                  backgroundRepeat: 'repeat-x',
                  animation: 'fog-drift-right 15s linear infinite'
                }}
              />
              
              <div 
                className="absolute top-0 left-0 w-full h-full opacity-50"
                style={{
                  background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1200 200\'%3E%3Cdefs%3E%3Cfilter id=\'fog3\' x=\'-50%25\' y=\'-50%25\' width=\'200%25\' height=\'200%25\'%3E%3CfeGaussianBlur stdDeviation=\'25\'/%3E%3C/filter%3E%3C/defs%3E%3Cpath d=\'M0,30 Q250,10 500,30 T1000,30 T1200,30 L1200,200 L0,200 Z\' fill=\'%23f8f8f8\' filter=\'url(%23fog3)\'/%3E%3C/svg%3E")',
                  backgroundSize: '1200px 200px',
                  backgroundRepeat: 'repeat-x',
                  animation: 'fog-drift-left 12s linear infinite'
                }}
              />
              
              <div className="absolute inset-0">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 bg-gray-200/60 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animation: `fog-float ${8 + Math.random() * 8}s ease-in-out infinite`,
                      animationDelay: `${Math.random() * 5}s`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          */}
        </div>

        {/* White Content Section - starts immediately after fog */}
        <div className="relative bg-white flex-1 flex flex-col">
          {/* Content */}
          <div className="relative pt-6 w-full flex-1">
            {/* Featured Products Section */}
            <div className="w-full pt-8">
              <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 1.2,
                  ease: "easeOut"
                }}
              >
                <motion.h2 
                  className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 ghostlight-font"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 1.0, 
                    delay: 1.0,
                    ease: "easeOut"
                  }}
                >
                  Featured Artwork
                </motion.h2>
                <motion.p 
                  className="text-lg text-gray-600 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 1.0, 
                    delay: 1.2,
                    ease: "easeOut"
                  }}
                >
                  Discover our favorite gloomies, each with their own unique personality.
                </motion.p>
              </motion.div>

              {/* Product Carousel */}
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
                  <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                  </div>
                ) : (
                  <ProductCarousel products={products} />
                )}
              </motion.div>
            </div>

            {/* Brand Logo Section */}
            <motion.div 
              className="max-w-4xl mx-auto pt-8 pb-8 text-center"
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 1.2, 
                delay: 1.6,
                ease: "easeOut"
              }}
            >
                <img 
                  src="/img/brand_logo.png" 
                  alt="Ghostlight Garden - Where Soft Shadows Bloom" 
                  className="mx-auto max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg"
                />
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
