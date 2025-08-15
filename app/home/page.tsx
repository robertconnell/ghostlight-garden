'use client';

import { useEffect, useState } from 'react';
import ProductCarousel from "@/components/ProductCarousel";
import GlobalFooter from "@/components/GlobalFooter";

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

export default function HomePage() {
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
          style={{ backgroundImage: 'url(/img/pc_home_background.png)' }}
        />
      </div>

      {/* Mobile Background */}
      <div className="md:hidden fixed inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/img/mobile_home_background.png)' }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center min-h-screen text-white text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Where soft shadows bloom
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Discover unique art pieces that bring beauty and inspiration to your space
          </p>
        </div>

        {/* White Content Section with Misty Transition */}
        <div className="relative bg-white">
          {/* Misty Transition Overlay */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white pointer-events-none" />
          
          {/* Content */}
          <div className="relative pt-32 px-4">
            {/* Featured Products Section */}
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Featured Artwork
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Discover our curated collection of unique pieces, each telling its own story
                </p>
              </div>

              {/* Product Carousel */}
              {isLoading ? (
                <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                </div>
              ) : (
                <ProductCarousel products={products} />
              )}
            </div>

            {/* About Section */}
            <div className="max-w-4xl mx-auto mt-20 mb-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                About Ghostlight Garden
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We curate and showcase exceptional artwork from talented artists, bringing unique pieces 
                that transform spaces and inspire creativity. Each piece in our collection is carefully 
                selected for its quality, craftsmanship, and artistic vision.
              </p>
            </div>
          </div>
          
          <GlobalFooter />
        </div>
      </div>
    </div>
  );
}
