import type { Metadata } from 'next';
import { Suspense } from 'react';
import { shopifyFetch } from "@/lib/shopify";
import { GET_COLLECTIONS_WITH_PRODUCTS } from "@/lib/queries";
import SearchableAllProductsGrid from "@/components/SearchableAllProductsGrid";
import Breadcrumb from "@/components/Breadcrumb";

import Link from "next/link";

export default async function AllProductsPage() {
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
            <h1 className="text-3xl font-bold mb-6">Unable to Load Products</h1>
            <p className="text-gray-600 mb-6">We're experiencing some technical difficulties loading our products.</p>
            <Link 
              href="/collections" 
              className="inline-flex items-center gap-2 px-4 py-2 text-sm text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors border border-purple-200 hover:border-purple-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Collections
            </Link>
          </main>
        </div>
      );
    }

    // Collect all products from all collections
    const allProducts: any[] = [];
    const collections = data.collections.edges.map(e => e.node);
    
    for (const collection of collections) {
      if (collection.products?.edges) {
        const products = collection.products.edges.map((e: any) => ({
          ...e.node,
          collectionHandle: collection.handle,
          collectionTitle: collection.title,
          // Check if this collection is limited
          isFromLimitedCollection: collection.title?.toLowerCase().includes('limited') || 
                                  collection.handle?.toLowerCase().includes('limited')
        }));
        allProducts.push(...products);
      }
    }

    // Remove duplicates (products might appear in multiple collections)
    const uniqueProducts = allProducts.filter((product, index, self) => 
      index === self.findIndex(p => p.id === product.id)
    );

    // Sort products: limited collection products first, then alphabetically by title
    const sortedProducts = uniqueProducts.sort((a: any, b: any) => {
      // First priority: limited collection products
      if (a.isFromLimitedCollection && !b.isFromLimitedCollection) return -1;
      if (!a.isFromLimitedCollection && b.isFromLimitedCollection) return 1;
      
      // If both are from limited collections or both are not, sort alphabetically by title
      return (a.title || '').localeCompare(b.title || '');
    });

    // Generate metadata
    const metadata: Metadata = {
      title: "All Artwork - Ghostlight Garden | Complete Art Catalog",
      description: "Browse our complete collection of unique artwork, prints, and digital art from talented artists. Find the perfect piece for your space.",
      openGraph: {
        title: "All Artwork - Ghostlight Garden",
        description: "Browse our complete collection of unique artwork, prints, and digital art.",
        images: [
          {
            url: "https://ghostlightgarden.com/img/brand_logo.png",
            width: 800,
            height: 600,
            alt: "All Artwork - Ghostlight Garden",
          },
        ],
        type: "website",
        url: "https://ghostlightgarden.com/collections/all",
      },
    };

    return (
      <>
        {/* Structured Data for All Products */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "All Artwork - Ghostlight Garden",
              "description": "Complete catalog of artwork, prints, and digital art",
              "url": "https://ghostlightgarden.com/collections/all",
              "image": "https://ghostlightgarden.com/img/brand_logo.png",
              "mainEntity": {
                "@type": "ItemList",
                "itemListElement": sortedProducts.map((product: any, index: number) => ({
                  "@type": "ListItem",
                  "position": index + 1,
                  "item": {
                    "@type": "Product",
                    "name": product.title,
                    "url": `https://ghostlightgarden.com/collections/${product.collectionHandle}/${product.handle}`,
                    "image": product.featuredImage?.url || "https://ghostlightgarden.com/img/brand_logo.png",
                    "description": `${product.title} - Part of ${product.collectionTitle} collection`,
                    "offers": {
                      "@type": "Offer",
                      "price": product.priceRange?.minVariantPrice?.amount || "0",
                      "priceCurrency": product.priceRange?.minVariantPrice?.currencyCode || "USD",
                      "availability": "https://schema.org/InStock",
                      "seller": {
                        "@type": "Organization",
                        "name": "Ghostlight Garden"
                      }
                    }
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
                  "name": "Collections",
                  "item": "https://ghostlightgarden.com/collections"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "All Artwork",
                  "item": "https://ghostlightgarden.com/collections/all"
                }
              ]
            })
          }}
        />

        <div className="min-h-screen">
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

          {/* Main Content */}
          <div className="relative z-10 min-h-screen">
            <div className="mx-auto max-w-6xl p-6">
            {/* Breadcrumb Navigation */}
            <Breadcrumb 
              items={[
                { label: "Collections", href: "/collections" },
                { label: "All Artwork", href: "" }
              ]}
              className="mb-6"
            />

            {/* Page Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg embossed-text ghostlight-font">
                All Artwork
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
                Browse our complete catalog of unique artwork, prints, and digital art. 
                Discover pieces from all our collections in one place.
              </p>
              <div className="w-48 h-1 bg-gradient-to-r from-[#FFF9F566] to-[#9A77CC] mx-auto rounded-full"></div>
            </div>

            {/* Products Grid */}
            {sortedProducts.length > 0 ? (
              <Suspense fallback={
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading products...</p>
                </div>
              }>
                <SearchableAllProductsGrid allProducts={sortedProducts} />
              </Suspense>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg mb-4">
                  No products found.
                </p>
                <Link 
                  href="/collections" 
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Browse Collections
                </Link>
              </div>
            )}
            </div>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error('Error loading all products:', error);
    return (
      <div className="mx-auto max-w-6xl p-6">
        <h1 className="text-3xl font-bold mb-6">Error Loading Products</h1>
        <p className="text-gray-600 mb-6">Unable to load product details. Please try again later.</p>
        <Link 
          href="/collections" 
          className="inline-flex items-center gap-2 px-4 py-2 text-sm text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors border border-purple-200 hover:border-purple-300"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Collections
        </Link>
      </div>
    );
  }
}
