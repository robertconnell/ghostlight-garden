"use client";

import React from "react";
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
  collections: {
    id: string;
    title: string;
    handle: string;
  }[];
}

interface ProductCarouselProps {
  products: Product[];
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
  // Helper function to get the primary collection (excluding featured-artwork)
  const getPrimaryCollection = (product: Product) => {
    const primaryCollection = product.collections.find(
      collection => collection.handle !== 'featured-artwork'
    );
    return primaryCollection || product.collections[0] || { handle: 'featured-artwork' };
  };

  // Splide carousel configuration options
  const splideOptions = {
    type: "loop", // Loop back to the beginning when reaching the end
    perPage: 3, // Number of items visible per page
    perMove: 1, // Move one item at a time
    rewind: true, // Rewind to start when the end is reached
    pagination: false, // Disable pagination dots
    autoplay: true, // Enable autoplay
    interval: 4000, // 4 seconds between slides
    pauseOnHover: true, // Pause on hover
    arrows: true, // Show navigation arrows
    gap: "1.5rem", // Gap between slides
    padding: "0", // No padding
    start: 0, // Start from the first slide
    focus: "center", // Use center focus for better initial positioning
    height: "auto", // Let height adjust to content
    fixedHeight: false, // Don't force a fixed height
    breakpoints: {
      1024: {
        perPage: 2,
        gap: "1.5rem",
        padding: "0",
        focus: "center", // Use center focus for 2 slides on iPad Pro
      },
      768: {
        perPage: 2,
        gap: "1rem",
        padding: "0",
        focus: "center", // Use center focus for 2 slides on iPad Air
      },
      640: {
        perPage: 1,
        gap: "0.75rem",
        padding: "0",
        focus: "center", // Use center focus for 1 slide
      },
    },
  };

  if (!products || products.length === 0) {
    return (
      <div className="w-full h-64 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No products available</p>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 min-h-[400px]">
        {/* Splide component with configuration options */}
        <Splide options={splideOptions}>
          {products.map((product, index) => {
            const primaryCollection = getPrimaryCollection(product);
            return (
            <SplideSlide key={product.id}>
              <Link
                href={`/collections/${primaryCollection.handle}/${product.handle}`}
                className="group block"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 w-72 md:w-90 mx-auto">
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
                          className={`object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-300 ${IMAGE_PROTECTION_ENABLED ? 'select-none' : ''}`}
                          draggable={!IMAGE_PROTECTION_ENABLED}
                          priority={index === 0}
                          {...(IMAGE_PROTECTION_ENABLED ? {
                            onContextMenu: (e) => e.preventDefault(),
                            onDragStart: (e) => e.preventDefault()
                          } : {})}
                        />
                        {/* Brand Logo Overlay */}
                        <div className="absolute bottom-0 left-11 md:bottom-0 md:left-14 pointer-events-none">
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
                    <h3 className="text-xl font-semibold text-purple-300 mb-2 group-hover:text-purple-700 transition-colors drop-shadow-md">
                      {product.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </SplideSlide>
            );
          })}
        </Splide>
      </div>

    </div>
  );
}
