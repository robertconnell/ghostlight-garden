import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { shopifyFetch } from "@/lib/shopify";
import { GET_COLLECTION_BY_HANDLE } from "@/lib/queries";
import ProductCard from "@/components/ProductCard";

interface CollectionPageProps {
  params: Promise<{
    collection: string;
  }>;
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const data = await shopifyFetch<{ collection: any }>(GET_COLLECTION_BY_HANDLE, {
    handle: resolvedParams.collection,
  });

  if (!data.collection) {
    return {
      title: "Collection Not Found - Ghostlight Garden",
      description: "The collection you're looking for doesn't exist.",
    };
  }

  return {
    title: `${data.collection.title} - Ghostlight Garden | Art Collection`,
    description: data.collection.description || `Explore our ${data.collection.title} collection featuring unique artwork from talented artists.`,
    openGraph: {
      title: `${data.collection.title} - Ghostlight Garden`,
      description: data.collection.description || `Explore our ${data.collection.title} collection.`,
      images: [
        {
          url: data.collection.image?.url || "https://ghostlightgarden.com/img/brand_logo.png",
          width: 800,
          height: 600,
          alt: `${data.collection.title} Collection - Ghostlight Garden`,
        },
      ],
      type: "website",
      url: `https://ghostlightgarden.com/collections/${data.collection.handle}`,
    },
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  try {
    const resolvedParams = await params;
    const data = await shopifyFetch<{ collection: any }>(GET_COLLECTION_BY_HANDLE, {
      handle: resolvedParams.collection,
    });

    if (!data.collection) {
      return (
        <div className="mx-auto max-w-6xl p-6">
          <h1 className="text-3xl font-bold mb-6">Collection Not Found</h1>
          <p className="text-gray-600 mb-6">The collection you're looking for doesn't exist.</p>
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

    const collectionData = data.collection;
    const products = collectionData.products?.edges?.map((e: any) => e.node) || [];

    return (
      <div className="min-h-full">
        {/* Breadcrumb Navigation */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/collections" className="hover:text-gray-900 transition-colors">
                Collections
              </Link>
              <span className="text-gray-400">&lt;</span>
              <span className="text-gray-900 font-medium">{collectionData.title}</span>
            </nav>
          </div>
        </div>



        {/* Collection Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{collectionData.title}</h1>
              {collectionData.description && (
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  {collectionData.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="bg-gray-50 min-h-screen">
          <div className="max-w-6xl mx-auto px-6 py-12">
            {products.length > 0 ? (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    {products.length} Product{products.length !== 1 ? 's' : ''} in {collectionData.title}
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product: any) => (
                    <ProductCard key={product.id} product={product} collectionHandle={resolvedParams.collection} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">No Products Found</h3>
                <p className="text-gray-600 mb-6">
                  This collection doesn't have any products yet. Check back soon!
                </p>
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
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading collection:', error);
    return (
      <div className="mx-auto max-w-6xl p-6">
        <h1 className="text-3xl font-bold mb-6">Error Loading Collection</h1>
          <p className="text-gray-600 mb-6">Unable to load collection details. Please try again later.</p>
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
