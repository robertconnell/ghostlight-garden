import type { Metadata } from 'next';
import { Suspense } from 'react';
import { shopifyFetch } from "@/lib/shopify";
import { GET_COLLECTIONS_WITH_PRODUCTS } from "@/lib/queries";
import SearchableAllLoreGrid from "@/components/SearchableAllLoreGrid";
import Breadcrumb from "@/components/Breadcrumb";
import ViewCollectionsButton from "@/components/ViewCollectionsButton";
import AnimatedAllProductsHeader from "@/components/AnimatedAllProductsHeader";

import Link from "next/link";

export default async function AllLorePage() {
  try {
    // Fetch all collections to get all products
    const data = await shopifyFetch<{ collections: { edges: { node: any }[] } }>(
      GET_COLLECTIONS_WITH_PRODUCTS, 
      { first: 50 }
    );

    if (!data.collections) {
             return (
         <div className="mx-auto max-w-6xl p-6">
           <main>
            <h1 className="text-3xl font-bold mb-6">Unable to Load Lore</h1>
            <p className="text-gray-600 mb-6">We're experiencing some technical difficulties loading our lore content.</p>
            <Link 
              href="/lore" 
              className="inline-flex items-center gap-2 px-4 py-2 text-sm text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors border border-purple-200 hover:border-purple-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Lore
            </Link>
          </main>
        </div>
      );
    }

    // Helper function to get the primary collection (excluding featured-artwork)
    const getPrimaryCollection = (product: any, allCollections: any[]) => {
      if (!product.collections?.edges) return null;
      
      const primaryCollection = product.collections.edges.find(
        (edge: any) => edge.node.handle !== 'featured-artwork'
      );
      
      if (primaryCollection) {
        return primaryCollection.node;
      }
      
      // If no primary collection found, return the first collection
      return product.collections.edges[0]?.node || null;
    };

    // Collect all products from all collections
    const allProducts: any[] = [];
    const collections = data.collections.edges.map(e => e.node);
    
    for (const collection of collections) {
      if (collection.products?.edges) {
        const products = collection.products.edges.map((e: any) => {
          const product = e.node;
          const primaryCollection = getPrimaryCollection(product, collections);
          
          return {
            ...product,
            collectionHandle: primaryCollection?.handle || collection.handle,
            collectionTitle: primaryCollection?.title || collection.title,
            // Check if this collection is limited
            isFromLimitedCollection: primaryCollection?.title?.toLowerCase().includes('limited') || 
                                    primaryCollection?.handle?.toLowerCase().includes('limited') ||
                                    collection.title?.toLowerCase().includes('limited') || 
                                    collection.handle?.toLowerCase().includes('limited')
          };
        });
        allProducts.push(...products);
      }
    }

    // Remove duplicates (products might appear in multiple collections)
    const uniqueProducts = allProducts.filter((product, index, self) => 
      index === self.findIndex(p => p.id === product.id)
    );

    // Filter to only show products with lore content
    const productsWithLore = uniqueProducts.filter((product: any) => {
      return product.metafield?.value && product.metafield.value.trim() !== '';
    });

    // Sort products: limited collection products first, then maintain original order
    const sortedProducts = productsWithLore.sort((a: any, b: any) => {
      // First priority: limited collection products
      if (a.isFromLimitedCollection && !b.isFromLimitedCollection) return -1;
      if (!a.isFromLimitedCollection && b.isFromLimitedCollection) return 1;
      
      // If both are from limited collections or both are not, maintain original order (no sorting)
      return 0;
    });

    // Generate metadata
    const metadata: Metadata = {
      title: "All Lore - Ghostlight Garden | Complete Story Catalog",
      description: "Explore the complete collection of character lore and stories behind our unique hand-painted artwork. Discover the tales that inspire each piece.",
      openGraph: {
        title: "All Lore - Ghostlight Garden",
        description: "Explore the complete collection of character lore and stories behind our unique hand-painted artwork.",
        images: [
          {
            url: "https://ghostlightgarden.com/img/brand_logo.png",
            width: 800,
            height: 600,
            alt: "All Lore - Ghostlight Garden",
          },
        ],
        type: "website",
        url: "https://ghostlightgarden.com/lore/all",
      },
    };

    return (
      <>
        {/* Structured Data for All Lore */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "All Lore - Ghostlight Garden",
              "description": "Complete catalog of character lore and stories behind our hand-painted artwork.",
              "url": "https://ghostlightgarden.com/lore/all",
              "image": "https://ghostlightgarden.com/img/brand_logo.png",
              "mainEntity": {
                "@type": "ItemList",
                "itemListElement": sortedProducts.map((product: any, index: number) => ({
                  "@type": "ListItem",
                  "position": index + 1,
                  "item": {
                    "@type": "Product",
                    "name": product.title,
                    "url": `https://ghostlightgarden.com/lore/${product.collectionHandle}/${product.handle}`,
                    "image": product.featuredImage?.url || "https://ghostlightgarden.com/img/brand_logo.png",
                    "description": `${product.title} - Part of ${product.collectionTitle} collection lore`,
                  }
                }))
              },
              "publisher": {
                "@type": "Organization",
                "name": "Ghostlight Garden",
                "url": "https://ghostlightgarden.com"
              }
            })
          }}
        />

        {/* Breadcrumb Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Ghostlight Garden",
                  "item": "https://ghostlightgarden.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Lore",
                  "item": "https://ghostlightgarden.com/lore"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "All Lore",
                  "item": "https://ghostlightgarden.com/lore/all"
                }
              ]
            })
          }}
        />

        <div className="min-h-full">
          {/* PC Background */}
          <div className="hidden md:block fixed inset-0 z-0 bg-gray-50">
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ 
                backgroundImage: 'url(/img/pc_lore_background.png)',
                willChange: 'transform',
                transform: 'translateZ(0)'
              }}
              role="img"
              aria-label="PC background: Lore and stories scene"
            />
            {/* Light pink overlay to brighten and add pink tint */}
            <div className="absolute inset-0 bg-pink-100/30"></div>
          </div>

          {/* Mobile Background */}
          <div className="md:hidden fixed inset-0 z-0 bg-gray-50">
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ 
                backgroundImage: 'url(/img/mobile_lore_background.png)',
                willChange: 'transform',
                transform: 'translateZ(0)'
              }}
              role="img"
              aria-label="Mobile background: Lore and stories scene"
            />
            {/* Light pink overlay to brighten and add pink tint */}
            <div className="absolute inset-0 bg-pink-100/30"></div>
          </div>

          {/* Breadcrumb Navigation */}
          <Breadcrumb 
            items={[
              { label: "Home", href: "/home" },
              { label: "Lore", href: "/lore" },
              { label: "All Lore", href: "" }
            ]}
          />

          {/* Page Header */}
          <AnimatedAllProductsHeader 
            title="All Lore & Stories"
            description="Explore the complete collection of character lore and stories behind our unique artwork. Discover the tales that inspire each piece from all our collections in one place."
          />

          {/* Main Content */}
          <div className="relative z-10">
            <div className="max-w-6xl mx-auto px-6">
            
            {/* View Collections Button */}
            <ViewCollectionsButton 
              href="/lore" 
              text="View Collection Lore" 
            />

            {/* Products Grid */}
            <div className="py-12">
            {sortedProducts.length > 0 ? (
              <Suspense fallback={
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading lore...</p>
                </div>
              }>
                <SearchableAllLoreGrid allProducts={sortedProducts} />
              </Suspense>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg mb-4">
                  No lore content found.
                </p>
                <Link 
                  href="/lore" 
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Browse Collection Lore
                </Link>
              </div>
            )}
            </div>
            </div>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error('Error loading all lore:', error);
    return (
      <div className="mx-auto max-w-6xl p-6">
        <h1 className="text-3xl font-bold mb-6">Error Loading Lore</h1>
        <p className="text-gray-600 mb-6">Unable to load lore details. Please try again later.</p>
        <Link 
          href="/lore" 
          className="inline-flex items-center gap-2 px-4 py-2 text-sm text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors border border-purple-200 hover:border-purple-300"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Lore
        </Link>
      </div>
    );
  }
}
