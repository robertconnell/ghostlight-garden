"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductImage {
  url: string;
  altText?: string;
  width: number;
  height: number;
}

interface ProductImageSliderProps {
  images: ProductImage[];
  productTitle: string;
}

export default function ProductImageSlider({ images, productTitle }: ProductImageSliderProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-transparent rounded-lg flex items-center justify-center">
        <div className="text-gray-400 text-center">
          <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p>No image available</p>
        </div>
      </div>
    );
  }

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-transparent rounded-lg overflow-hidden group">
        <Image
          src={images[currentImageIndex].url}
          alt={images[currentImageIndex].altText || productTitle}
          width={images[currentImageIndex].width || 800}
          height={images[currentImageIndex].height || 800}
          className="w-full h-full object-contain"
          priority={currentImageIndex === 0}
        />
        {/* Brand Logo Overlay */}
        <div className="absolute bottom-0 left-12 pointer-events-none">
          <Image
            src="/img/brand_logo.png"
            alt="Ghostlight Garden"
            width={200}
            height={200}
            className="opacity-45 w-1/2 h-1/2"
          />
        </div>
        
        {/* Navigation Arrows - Only show if more than 1 image */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Navigation - Only show if more than 1 image */}
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 relative ${
                index === currentImageIndex
                  ? "border-purple-900 scale-100"
                  : "border-gray-200 hover:border-purple-900 scale-95"
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={image.url}
                alt={image.altText || `${productTitle} - Image ${index + 1}`}
                width={64}
                height={64}
                className="w-full h-full object-contain"
              />
            </button>
          ))}
        </div>
      )}

      {/* Dot Indicators - Only show if more than 1 image */}
      {images.length > 1 && (
        <div className="flex justify-center space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentImageIndex
                  ? "bg-purple-300 scale-125"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
