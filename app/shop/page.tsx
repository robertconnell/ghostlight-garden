import { shopifyFetch } from "@/lib/shopify";
import { GET_PRODUCT_LIST } from "@/lib/queries";
import ProductCard from "@/components/ProductCard";
import GlobalFooter from "@/components/GlobalFooter";
import ShopContent from "@/components/ShopContent";

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
      <div className="min-h-screen bg-gray flex flex-col">
        {/* Main Content */}
        <main className="flex-1 mx-auto max-w-6xl p-6">
          <h1 className="text-3xl font-bold mb-6">Shop</h1>
          
          {/* Product list */}
          <ShopContent products={products} searchTerm={searchTerm} />
        </main>
        
        {/* Footer - Full Width */}
        <GlobalFooter />
      </div>
    );
  } catch (error: any) {
    console.error('Error loading products:', error);
    
    // Provide a user-friendly error message
    return (
      <div className="min-h-screen bg-gray flex flex-col">
        <main className="flex-1 mx-auto max-w-6xl p-6">
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
