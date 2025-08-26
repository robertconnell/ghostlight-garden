import type { Metadata } from 'next';
import { shopifyFetch } from "@/lib/shopify";
import { GET_COLLECTIONS_WITH_PRODUCTS } from "@/lib/queries";

import Link from "next/link";
import Image from "next/image";

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
      title: "All Products - Ghostlight Garden | Complete Art Catalog",
      description: "Browse our complete collection of unique artwork, prints, and digital art from talented artists. Find the perfect piece for your space.",
      openGraph: {
        title: "All Products - Ghostlight Garden",
        description: "Browse our complete collection of unique artwork, prints, and digital art.",
        images: [
          {
            url: "https://ghostlightgarden.com/img/brand_logo.png",
            width: 800,
            height: 600,
            alt: "All Products - Ghostlight Garden",
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
              "name": "All Products - Ghostlight Garden",
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
                  "name": "All Products",
                  "item": "https://ghostlightgarden.com/collections/all"
                }
              ]
            })
          }}
        />

        <div>
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

          {/* Main Content */}
          <main className="mx-auto max-w-6xl p-6 relative z-10">
            {/* Breadcrumb Navigation */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                <Link 
                  href="/collections" 
                  className="text-purple-600 hover:text-purple-700 font-medium hover:underline transition-colors"
                >
                  Collections
                </Link>
                <span className="text-gray-400">&lt;</span>
                <span className="text-gray-900 font-medium">All Products</span>
              </div>
            </div>

            {/* Page Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                All Products
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
                Browse our complete catalog of unique artwork, prints, and digital art. 
                Discover pieces from all our collections in one place.
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-purple-600 mx-auto rounded-full"></div>
            </div>

            {/* Products Grid */}
            {sortedProducts.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {sortedProducts.map((product: any) => (
                  <Link 
                    key={product.id} 
                    href={`/collections/${product.collectionHandle}/${product.handle}`}
                    className="group block"
                  >
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 relative">
                      {/* Limited Collection Gold Star */}
                      {product.isFromLimitedCollection && (
                        <div className="absolute top-3 right-3 z-10">
                          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white p-2 rounded-full shadow-lg">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </div>
                        </div>
                      )}

                      {/* Product Image */}
                      <div className="aspect-square overflow-hidden">
                        {product.featuredImage ? (
                          <Image
                            src={product.featuredImage.url}
                            alt={product.featuredImage.altText || product.title}
                            width={product.featuredImage.width || 400}
                            height={product.featuredImage.height || 400}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                            <span className="text-gray-400 text-lg">{product.title}</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Product Info */}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors flex-1">
                            {product.title}
                          </h3>
                          {product.isFromLimitedCollection && (
                            <span className="text-xs bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-2 py-1 rounded-full font-medium ml-2">
                              Limited
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mb-3">
                          From {product.collectionTitle} collection
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-purple-600 font-medium group-hover:text-purple-700 transition-colors">
                            View Details →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
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
          </main>
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
