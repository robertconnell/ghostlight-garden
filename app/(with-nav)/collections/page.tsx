"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CollectionsPage() {
  const [collections, setCollections] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch('/api/collections');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success && result.collections) {
          // Filter out featured collection and sort: limited collection first, then alphabetically
          const filteredAndSortedCollections = result.collections
            .filter((collection: any) => {
              // Hide collections with "featured" in title or handle
              const isFeatured = collection.title?.toLowerCase().includes('featured') || 
                                collection.handle?.toLowerCase().includes('featured');
              return !isFeatured;
            })
            .sort((a: any, b: any) => {
              // Check if either collection has "limited" in title or handle
              const aIsLimited = a.title?.toLowerCase().includes('limited') || a.handle?.toLowerCase().includes('limited');
              const bIsLimited = b.title?.toLowerCase().includes('limited') || b.handle?.toLowerCase().includes('limited');
              
              if (aIsLimited && !bIsLimited) return -1; // a first
              if (!aIsLimited && bIsLimited) return 1;  // b first
              if (aIsLimited && bIsLimited) return 0;   // both limited, maintain order
              
              // If neither is limited, sort alphabetically by title
              return (a.title || '').localeCompare(b.title || '');
            });
          
          setCollections(filteredAndSortedCollections);
          setIsLoading(false);
        } else {
          setError(result.error || 'Failed to load collections');
          setIsLoading(false);
        }
      } catch (err: any) {
        console.error('Error fetching collections:', err);
        setError(err.message || 'Failed to load collections');
        setIsLoading(false);
      }
    };

    fetchCollections();
  }, []);

  // Background component to ensure consistency across all states
  const Background = () => (
    <>
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
    </>
  );

  if (isLoading) {
    return (
      <div>
        <Background />
        <div className="mx-auto max-w-6xl p-6 relative z-10">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading collections...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Background />
        <div className="mx-auto max-w-6xl p-6 relative z-10">
          <h1 className="text-3xl font-bold mb-6">Collections</h1>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
            <div className="text-red-600 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-red-800 mb-2">Unable to Load Collections</h2>
            <p className="text-red-700 mb-4">
              We're experiencing some technical difficulties loading our collections. 
              This is usually temporary and should resolve shortly.
            </p>
            <p className="text-sm text-red-600">
              Error: {error}
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Background />
      
      {/* Main Content */}
      <div className="mx-auto max-w-6xl p-6 relative z-10">
        {/* SEO-Optimized Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Art Collections
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our curated collections, each showcasing unique themes and artistic styles. 
            From spooky cute art to serene landscapes, discover the perfect pieces for your space.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-purple-600 mx-auto mt-6 rounded-full"></div>
        </div>
        
        {/* All Products Button */}
        <div className="text-center mb-12">
          <Link 
            href="/collections/all"
            className="inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            View All Products
          </Link>
          <p className="text-sm text-gray-500 mt-3">
            Browse our complete catalog of artwork
          </p>
        </div>
        
        {/* Collections Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection: any) => (
            <Link 
              key={collection.id} 
              href={`/collections/${collection.handle}`}
              className="group block"
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Collection Image */}
                <div className="aspect-square overflow-hidden">
                  {collection.image ? (
                    <Image
                      src={collection.image.url}
                      alt={collection.image.altText || collection.title}
                      width={collection.image.width || 400}
                      height={collection.image.height || 400}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                      <span className="text-gray-400 text-lg">{collection.title}</span>
                    </div>
                  )}
                </div>
                
                {/* Collection Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {collection.title}
                  </h3>
                  {collection.description && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {collection.description}
                    </p>
                  )}
                  <div className="flex items-center justify-end">
                    <span className="text-purple-600 font-medium group-hover:text-purple-700 transition-colors">
                      View Collection →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
