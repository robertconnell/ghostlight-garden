import type { Metadata } from 'next';
import { shopifyFetch } from "@/lib/shopify";
import { GET_PRODUCT_LIST } from "@/lib/queries";
import ProductCard from "@/components/ProductCard";
import GlobalFooter from "@/components/GlobalFooter";
import ShopContent from "@/components/ShopContent";

// SEO Metadata for Collection Page
export const metadata: Metadata = {
  title: "Art Collection - Ghostlight Garden | Curated Original Artwork",
  description: "Discover our curated collection of unique artwork from talented artists. Browse original paintings, spooky cute art, and ghost-themed pieces. Each artwork tells a story and transforms spaces with creativity.",
  keywords: "art collection, original paintings, spooky cute art, ghost art, curated art, artist marketplace, unique artwork, art for sale, original art, ghostlight garden art",
  openGraph: {
    title: "Art Collection - Ghostlight Garden",
    description: "Discover our curated collection of unique artwork from talented artists. Browse original paintings and spooky cute art pieces.",
    images: [
      {
        url: "https://ghostlightgarden.com/img/brand_logo.png",
        width: 800,
        height: 600,
        alt: "Ghostlight Garden Art Collection - Curated Original Artwork",
      },
    ],
    type: "website",
    url: "https://ghostlightgarden.com/collection",
  },
  twitter: {
    card: "summary_large_image",
    title: "Art Collection - Ghostlight Garden",
    description: "Discover our curated collection of unique artwork from talented artists. Browse original paintings and spooky cute art pieces.",
            images: ["https://ghostlightgarden.com/img/brand_logo.png"],
  },
};

interface ShopPageProps {
  searchParams: Promise<{ search?: string }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const resolvedSearchParams = await searchParams;
  const searchTerm = resolvedSearchParams.search || "";

  try {
    const data = await shopifyFetch<{ products: { edges: { node: any }[] } }>(
      GET_PRODUCT_LIST, { first: 50 }
    );
    const products = data.products.edges.map(e => e.node);

    return (
      <>
        {/* Structured Data for Product Collection */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "Artwork Collection - Ghostlight Garden",
              "description": "Curated collection of unique artwork from talented artists, featuring original paintings, spooky cute art, and ghost-themed pieces.",
              "url": "https://ghostlightgarden.com/collection",
              "mainEntity": {
                "@type": "ItemList",
                "itemListElement": products.map((product: any, index: number) => ({
                  "@type": "ListItem",
                  "position": index + 1,
                  "item": {
                    "@type": "Product",
                    "name": product.title,
                                               "url": `https://ghostlightgarden.com/collection/${product.handle}`,
                    "image": product.featuredImage?.url || "https://ghostlightgarden.com/img/brand_logo.png",
                    "description": product.description || `${product.title} - Unique artwork from Ghostlight Garden`,
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
                   "name": "Collection",
                   "item": "https://ghostlightgarden.com/collection"
                }
              ]
            })
          }}
        />

        <div className="sticky-footer-container">
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
          <main className="sticky-footer-content mx-auto max-w-6xl p-6 relative z-10">
            {/* SEO-Optimized Header Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                Art Collection
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Discover our curated collection of unique artwork from talented artists. Each piece tells a story 
                and brings the perfect blend of spooky charm and artistic beauty to your space.
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-purple-600 mx-auto mt-6 rounded-full"></div>
            </div>
            
            {/* Product list */}
            <ShopContent products={products} searchTerm={searchTerm} />
          </main>
          
          {/* Footer - Full Width */}
          <GlobalFooter />
        </div>
      </>
    );
  } catch (error: any) {
    console.error('Error loading products:', error);
    
    // Provide a user-friendly error message
    return (
      <div className="sticky-footer-container bg-gray">
        <main className="sticky-footer-content mx-auto max-w-6xl p-6">
          <h1 className="text-3xl font-bold mb-6">Shop</h1>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
            <div className="text-red-600 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-red-800 mb-2">Unable to Load Products</h2>
            <p className="text-red-700 mb-4">
              We're experiencing some technical difficulties loading our product catalog. 
              This is usually temporary and should resolve shortly.
            </p>
            <p className="text-sm text-red-600">
              Error: {error.message || 'Unknown error occurred'}
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </main>
        
        <GlobalFooter />
      </div>
    );
  }
}
