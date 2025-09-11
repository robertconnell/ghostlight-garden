import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { shopifyFetch } from "@/lib/shopify";
import { GET_COLLECTION_BY_HANDLE } from "@/lib/queries";
import AnimatedCollectionHeader from "@/components/AnimatedCollectionHeader";
import Breadcrumb from "@/components/Breadcrumb";
import BackToCollectionsButton from "@/components/BackToCollectionsButton";
import AnimatedLoreProductGrid from "@/components/AnimatedLoreProductGrid";

interface CollectionLorePageProps {
  params: Promise<{
    collection: string;
  }>;
}

export async function generateMetadata({ params }: CollectionLorePageProps): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const data = await shopifyFetch<{ collection: any }>(GET_COLLECTION_BY_HANDLE, {
      handle: resolvedParams.collection,
    });

    if (!data.collection) {
      return {
        title: "Collection Not Found - Lore | Ghostlight Garden",
        description: "The collection you're looking for doesn't exist.",
      };
    }

    return {
      title: `${data.collection.title} - Lore | Ghostlight Garden`,
      description: data.collection.description || `Explore the stories and lore behind our ${data.collection.title} collection.`,
      openGraph: {
        title: `${data.collection.title} - Lore | Ghostlight Garden`,
        description: data.collection.description || `Explore the stories and lore behind our ${data.collection.title} collection.`,
        images: [
          {
            url: data.collection.image?.url || "https://ghostlightgarden.com/img/brand_logo.png",
            width: 800,
            height: 600,
            alt: `${data.collection.title} Collection Lore - Ghostlight Garden`,
          },
        ],
        type: "website",
        url: `https://ghostlightgarden.com/lore/${data.collection.handle}`,
      },
    };
  } catch (error) {
    console.warn('Failed to generate metadata for collection lore, using fallback:', error);
    return {
      title: "Collection Lore - Ghostlight Garden",
      description: "Explore our collection lore and stories.",
    };
  }
}

export default async function CollectionLorePage({ params }: CollectionLorePageProps) {
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

    const collectionData = data.collection;
    const rawProducts = collectionData.products?.edges?.map((e: any) => e.node) || [];
    
    // Check if this collection is limited
    const isLimitedCollection = collectionData.title?.toLowerCase().includes('limited') || 
                               collectionData.handle?.toLowerCase().includes('limited');
    
    // Add limited collection status to each product and sort
    const productsWithLimitedStatus = rawProducts.map((product: any) => {
      // Check if this product belongs to any limited collection
      const isProductFromLimitedCollection = product.collections?.edges?.some(({ node: collection }: { node: any }) => 
        collection.title?.toLowerCase().includes('limited') || 
        collection.handle?.toLowerCase().includes('limited')
      ) || false;
      
      return {
        ...product,
        isFromLimitedCollection: isProductFromLimitedCollection
      };
    });
    
    // Filter products to only show those with custom.lore content
    const productsWithLore = productsWithLimitedStatus.filter((product: any) => {
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

    // Background component to ensure consistency across all states
    const Background = () => (
      <>
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
      </>
    );

    return (
      <div className="min-h-full">
        <Background />
        
        {/* Breadcrumb Navigation */}
        <Breadcrumb 
          items={[
            { label: "Home", href: "/home" },
            { label: "Lore", href: "/lore" },
            { label: collectionData.title, href: "" }
          ]}
        />

        {/* Collection Header */}
        <AnimatedCollectionHeader 
          title={`${collectionData.title} Lore`}
          description={collectionData.description}
        />

        {/* Back to Lore Button */}
        <div className="relative z-10">
          <div className="max-w-6xl mx-auto px-6">
            <BackToCollectionsButton 
              href="/lore" 
              text="Back to Lore" 
            />
          </div>
        </div>

        {/* Products Lore Grid */}
        <div className="relative z-10">
          <div className="max-w-6xl mx-auto px-6 py-12">
            {sortedProducts.length > 0 ? (
              <>
                <AnimatedLoreProductGrid 
                  products={sortedProducts} 
                  collectionHandle={resolvedParams.collection}
                />
              </>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Lore Coming Soon</h3>
                <p className="text-gray-600 mb-6">
                  We're working on bringing you some amazing lore soon...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading collection lore:', error);
    return (
      <div className="mx-auto max-w-6xl p-6">
        <h1 className="text-3xl font-bold mb-6">Error Loading Collection Lore</h1>
          <p className="text-gray-600 mb-6">Unable to load collection lore details. Please try again later.</p>
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