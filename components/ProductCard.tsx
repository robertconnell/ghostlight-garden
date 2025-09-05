"use client";

import Image from "next/image";
import Link from "next/link";
import { IMAGE_PROTECTION_ENABLED } from '@/lib/config';

export default function ProductCard({
  product,
  collectionHandle,
  isLimitedCollection = false,
}: { 
  product: {
    title: string; 
    handle: string;
    featuredImage?: { url: string; altText?: string; width: number; height: number } | null;
    priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
    availableForSale?: boolean;
    isFromLimitedCollection?: boolean;
  };
  collectionHandle?: string;
  isLimitedCollection?: boolean;
}) {
  const img = product.featuredImage;
  const isAvailable = product.availableForSale !== false;

  // Prevent right-click context menu
  const handleContextMenu = (e: React.MouseEvent) => {
    if (IMAGE_PROTECTION_ENABLED) {
      e.preventDefault();
      return false;
    }
  };

  // Prevent drag and drop
  const handleDragStart = (e: React.DragEvent) => {
    if (IMAGE_PROTECTION_ENABLED) {
      e.preventDefault();
      return false;
    }
  };

  return (
    <Link href={`/collections/${collectionHandle || 'all'}/${product.handle}`} className="group block">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        {/* Product Image */}
        <div 
          className="aspect-square overflow-hidden relative"
          {...(IMAGE_PROTECTION_ENABLED ? {
            onContextMenu: handleContextMenu,
            onDragStart: handleDragStart
          } : {})}
        >
          {img ? (
            <>
              <Image
                src={img.url}
                alt={img.altText || product.title}
                width={img.width || 400}
                height={img.height || 400}
                className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${IMAGE_PROTECTION_ENABLED ? 'select-none pointer-events-none' : ''}`}
                draggable={!IMAGE_PROTECTION_ENABLED}
                {...(IMAGE_PROTECTION_ENABLED ? {
                  onContextMenu: handleContextMenu,
                  onDragStart: handleDragStart
                } : {})}
              />
              {/* Brand Logo Overlay */}
              <div className="absolute bottom-2 left-2 pointer-events-none">
                <Image
                  src="/img/brand_logo.png"
                  alt="Ghostlight Garden"
                  width={200}
                  height={200}
                  className="opacity-50 w-1/3 h-1/3"
                />
              </div>
              
              {/* Limited Collection Gold Star - only show if NOT in a limited collection */}
              {!isLimitedCollection && product.isFromLimitedCollection && (
                <div className="absolute top-3 right-3 z-10">
                  <svg className="w-8 h-8 text-pink-200 drop-shadow-md" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
              <span className="text-gray-400 text-lg">{product.title}</span>
            </div>
          )}
          
          {/* Availability Badge */}
          {!isAvailable && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              Sold Out
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-700 drop-shadow-md group-hover:text-purple-900 transition-colors flex-1">
              {product.title}
            </h3>
            {/* Limited badge - only show if NOT in a limited collection */}
            {!isLimitedCollection && product.isFromLimitedCollection && (
              <span className="text-lg text-purple-300 font-bold ml-2 drop-shadow-md">
                Limited
              </span>
            )}
          </div>
          {!isAvailable && (
            <p className="text-xs text-red-500 mb-3">Out of Stock</p>
          )}
          <div className="flex items-center justify-end">
            <span className="text-gray-500 font-medium group-hover:text-purple-900 drop-shadow-md transition-colors">
              View Details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
