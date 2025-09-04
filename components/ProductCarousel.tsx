"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { IMAGE_PROTECTION_ENABLED } from '@/lib/config';
// Default theme
import '@splidejs/react-splide/css';
import '@splidejs/react-splide/css/core';

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

interface ProductCarouselProps {
  products: Product[];
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Splide carousel configuration options
  const splideOptions = {
    type: "loop", // Loop back to the beginning when reaching the end
    perPage: 3, // Number of items visible per page (back to 3 for desktop)
    perMove: 1, // Move one item at a time
    rewind: true, // Rewind to start when the end is reached
    pagination: false, // Disable pagination dots
    autoplay: true, // Enable autoplay
    interval: 4000, // 4 seconds between slides
    pauseOnHover: true, // Pause on hover
    arrows: true, // Show navigation arrows
    gap: "1.5rem", // Gap between slides
    padding: "1rem", // Reduced padding to bring images closer to edges
    start: 0, // Start from the first slide
    focus: "center", // Focus on center slide
    height: "auto", // Let height adjust to content
    fixedHeight: false, // Don't force a fixed height
    waitForTransition: false, // Don't wait for transitions
    updateOnMove: true, // Update on move
    breakpoints: {
      1024: {
        perPage: 3,
        gap: "1.5rem",
        padding: "1rem",
        focus: "center", // Focus on center slide
      },
      768: {
        perPage: 2,
        gap: "1rem",
        padding: "0.75rem",
        focus: 0, // Focus on first slide for tablet
      },
      640: {
        perPage: 1,
        gap: "0.75rem",
        padding: "0.5rem",
        focus: 0, // Focus on first slide for mobile
      },
    },
  };

  // Handle loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500); // Give images time to load

    return () => clearTimeout(timer);
  }, []);

  if (!products || products.length === 0) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No products available</p>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Loading State */}
      {!isLoaded && (
        <div className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 min-h-[500px] flex items-center justify-center">
          <div className="text-white/70 text-lg">Loading carousel...</div>
        </div>
      )}
      
      {/* Carousel Container */}
      <div className={`relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 min-h-[500px] transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0 absolute'}`}>
        {/* Custom CSS for scaling non-center items */}
        <style jsx>{`
          .splide__slide:not(.is-active) {
            transform: scale(0.95);
            transition: transform 0.3s ease;
          }
          .splide__slide.is-active {
            transform: scale(1);
            transition: transform 0.3s ease;
          }
        `}</style>
        {/* Splide component with configuration options */}
        <Splide options={splideOptions}>
          {products.map((product, index) => (
            <SplideSlide key={product.id}>
              <Link
                href={`/collections/featured-artwork/${product.handle}`}
                className="group block"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 w-80 md:w-96 lg:w-[28rem] mx-auto">
                  {/* Product Image */}
                  <div 
                    className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-transparent"
                    {...(IMAGE_PROTECTION_ENABLED ? {
                      onContextMenu: (e) => e.preventDefault(),
                      onDragStart: (e) => e.preventDefault()
                    } : {})}
                  >
                    {product.featuredImage ? (
                      <>
                        <Image
                          src={product.featuredImage.url}
                          alt={product.featuredImage.altText || product.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className={`object-contain group-hover:scale-105 transition-transform duration-300 ${IMAGE_PROTECTION_ENABLED ? 'select-none' : ''}`}
                          draggable={!IMAGE_PROTECTION_ENABLED}
                          priority={index < 3} // Prioritize first 3 images
                          {...(IMAGE_PROTECTION_ENABLED ? {
                            onContextMenu: (e) => e.preventDefault(),
                            onDragStart: (e) => e.preventDefault()
                          } : {})}
                        />
                        {/* Brand Logo Overlay */}
                        <div className="absolute bottom-0 left-11 md:bottom-0 md:left-16 pointer-events-none">
                          <Image
                            src="/img/brand_logo.png"
                            alt="Ghostlight Garden"
                            width={200}
                            height={200}
                            className="opacity-45 w-1/3 h-1/3 md:w-1/3 md:h-1/3"
                          />
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full bg-transparent flex items-center justify-center">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="text-center">
                    <h3 className="font-semibold text-purple-300 mb-2 group-hover:text-purple-700 transition-colors">
                      {product.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </SplideSlide>
          ))}
        </Splide>
      </div>

      {/* Adopt a Gloomie Button */}
      <div className="text-center mt-4">
        <motion.div
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
            className="inline-flex items-center px-12 py-4 bg-[#8A6D9B] hover:bg-[#8A6D9B]/90 text-white font-bold text-xl rounded-full border-2 border-white shadow-lg cursor-pointer button-font"
          >
            Adopt a Gloomie
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
