"use client";

import Image from "next/image";
import Link from "next/link";
import { IMAGE_PROTECTION_ENABLED } from '@/lib/config';

export default function ProductCard({
  product,
  collectionHandle,
}: { 
  product: {
    title: string; 
    handle: string;
    featuredImage?: { url: string; altText?: string; width: number; height: number } | null;
    priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
    availableForSale?: boolean;
  };
  collectionHandle?: string;
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
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
            {product.title}
          </h3>
          {!isAvailable && (
            <p className="text-xs text-red-500 mb-3">Out of Stock</p>
          )}
          <div className="flex items-center justify-end">
            <span className="text-purple-600 font-medium group-hover:text-purple-700 transition-colors">
              View Details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
