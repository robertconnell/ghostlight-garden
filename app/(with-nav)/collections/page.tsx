"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Breadcrumb from "@/components/Breadcrumb";

export default function CollectionsPage() {
  const [collections, setCollections] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);



  useEffect(() => {
    const fetchCollections = async () => {
      const startTime = Date.now();
      const minLoadingTime = 500; // Half second minimum loading time
      
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
          
          // Ensure minimum loading time
          const elapsed = Date.now() - startTime;
          const remainingTime = Math.max(0, minLoadingTime - elapsed);
          
          setTimeout(() => {
            setIsLoading(false);
          }, remainingTime);
        } else {
          setError(result.error || 'Failed to load collections');
          
          // Ensure minimum loading time even for errors
          const elapsed = Date.now() - startTime;
          const remainingTime = Math.max(0, minLoadingTime - elapsed);
          
          setTimeout(() => {
            setIsLoading(false);
          }, remainingTime);
        }
      } catch (err: any) {
        console.error('Error fetching collections:', err);
        setError(err.message || 'Failed to load collections');
        
        // Ensure minimum loading time even for errors
        const elapsed = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadingTime - elapsed);
        
        setTimeout(() => {
          setIsLoading(false);
        }, remainingTime);
      }
    };

    fetchCollections();
  }, []);

  // Background component to ensure consistency across all states
  const Background = () => (
    <>
      {/* PC Background */}
      <div className="hidden md:block fixed inset-0 z-0 bg-gray-50">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(/img/pc_collections_background.png)',
            willChange: 'transform',
            transform: 'translateZ(0)'
          }}
          role="img"
          aria-label="PC background: Artistic collection scene"
        />
        {/* Light pink overlay to brighten and add pink tint */}
        <div className="absolute inset-0 bg-pink-100/30"></div>
      </div>

      {/* Mobile Background */}
      <div className="md:hidden fixed inset-0 z-0 bg-gray-50">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(/img/mobile_collections_background.png)',
            willChange: 'transform',
            transform: 'translateZ(0)'
          }}
          role="img"
          aria-label="Mobile background: Artistic collection scene"
        />
        {/* Light pink overlay to brighten and add pink tint */}
        <div className="absolute inset-0 bg-pink-100/30"></div>
      </div>
    </>
  );

  return (
    <div>
      <Background />
      
      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center relative z-10" style={{ minHeight: 'calc(100dvh - 200px)' }}>
          <div className="text-center">
            <div className="animate-spin rounded-full h-20 w-20 border-b-3 border-purple-300 drop-shadow-lg mx-auto mb-4"></div>
            <p className="font-alex-brush text-white text-3xl">loading collections...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
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
      )}

      {/* Success State */}
      {!isLoading && !error && (
        <motion.div 
          className="mx-auto max-w-6xl relative z-10 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
        {/* Breadcrumb Navigation */}
        <Breadcrumb 
          items={[
            { label: "Home", href: "/home" },
            { label: "Collections", href: "" }
          ]}
        />
        
        {/* SEO-Optimized Header Section */}
        <div className="text-center py-10 px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg embossed-text ghostlight-font">
            Art Collections
          </h1>
          <p className="text-xl text-gray-100 max-w-4xl mx-auto drop-shadow-md leading-relaxed">
            Explore our curated collections, each showcasing unique characters and artistic styles. 
            From spooky wisps to whimsical faeries, discover the perfect pieces to add to your space.
          </p>
          <div className="w-72 h-1 bg-gradient-to-r from-[#FFF9F566] to-[#9A77CC] mx-auto mt-6 rounded-full"></div>
        </div>
        
        {/* All Products Button */}
        <div className="text-center mb-12 px-6">
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
              href="/collections/all"
              className="inline-flex items-center gap-3 px-8 py-4 text-lg font-bold text-white bg-[#8A6D9B] hover:bg-[#8A6D9B]/90 rounded-full border-2 border-white shadow-lg button-font"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              View All Artwork
            </Link>
          </motion.div>
        </div>
        
        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
          {collections && collections.length > 0 && collections.map((collection: any, index: number) => (
            <motion.div 
              key={collection.id} 
              className="flex"
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
              <Link 
                href={`/collections/${collection.handle}`}
                className="group block flex-1 flex flex-col"
              >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex-1 flex flex-col">
                {/* Collection Image */}
                <div className="aspect-square overflow-hidden">
                  {collection.image ? (
                    <Image
                      src={collection.image.url}
                      alt={collection.image.altText || collection.title}
                      width={collection.image.width || 400}
                      height={collection.image.height || 400}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      priority={index === 0}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                      <span className="text-gray-400 text-lg">{collection.title}</span>
                    </div>
                  )}
                </div>
                
                {/* Collection Info */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-700 drop-shadow-md group-hover:text-purple-900 transition-colors flex-1">
                    {collection.title}
                  </h3>
                  <div className="flex items-center justify-end mt-auto">
                    <span className="text-gray-500 font-medium group-hover:text-purple-900 drop-shadow-md transition-colors">
                      View Collection →
                    </span>
                  </div>
                                 </div>
               </div>
             </Link>
            </motion.div>
            ))}
          {(!collections || collections.length === 0) && (
            <div className="text-center py-12 col-span-full">
              <p className="text-gray-600 text-lg">No collections found.</p>
            </div>
          )}
        </div>
        </motion.div>
      )}
    </div>
  );
}
