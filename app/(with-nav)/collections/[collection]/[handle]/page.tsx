import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { shopifyFetch } from "@/lib/shopify";
import { PRODUCT_BY_HANDLE, GET_COLLECTION_BY_HANDLE } from "@/lib/queries";
import AddToCartButton from "@/components/AddToCartButton";
import BuyNowButton from "@/components/BuyNowButton";
import VariantPicker from "@/components/VariantPicker";
import ProductImageSlider from "@/components/ProductImageSlider";
import Breadcrumb from "@/components/Breadcrumb";
import BackToCollectionsButton from "@/components/BackToCollectionsButton";
import DynamicBackButton from "@/components/DynamicBackButton";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";


interface ProductPageProps {
  params: Promise<{
    collection: string;
    handle: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const [productData, collectionData] = await Promise.all([
      shopifyFetch<{ product: any }>(PRODUCT_BY_HANDLE, {
        handle: resolvedParams.handle,
      }),
      shopifyFetch<{ collection: any }>(GET_COLLECTION_BY_HANDLE, {
        handle: resolvedParams.collection,
      }),
    ]);

    if (!productData.product) {
      return {
        title: "Product Not Found - Ghostlight Garden",
        description: "The product you're looking for doesn't exist.",
      };
    }

    const product = productData.product;
    const collection = collectionData.collection;

    return {
      title: `${product.title} - ${collection?.title || 'Collection'} | Ghostlight Garden`,
      description: product.description || `Explore ${product.title} from our ${collection?.title || 'art'} collection.`,
      openGraph: {
        title: `${product.title} - Ghostlight Garden`,
        description: product.description || `Explore ${product.title} from our ${collection?.title || 'art'} collection.`,
        images: [
          {
            url: product.images?.edges?.[0]?.node?.url || "https://ghostlightgarden.com/img/brand_logo.png",
            width: 800,
            height: 600,
            alt: `${product.title} - Ghostlight Garden`,
          },
        ],
        type: "website",
        url: `https://ghostlightgarden.com/collections/${resolvedParams.collection}/${resolvedParams.handle}`,
      },
    };
  } catch (error) {
    return {
      title: "Product - Ghostlight Garden",
      description: "Explore our unique artwork collection.",
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    const resolvedParams = await params;
    const [productData, collectionData] = await Promise.all([
      shopifyFetch<{ product: any }>(PRODUCT_BY_HANDLE, {
        handle: resolvedParams.handle,
      }),
      shopifyFetch<{ collection: any }>(GET_COLLECTION_BY_HANDLE, {
        handle: resolvedParams.collection,
      }),
    ]);

    // Validate both product AND collection data before rendering
    if (!productData.product || !collectionData.collection) {
      return (
        <div className="mx-auto max-w-6xl p-6">
          <h1 className="text-3xl font-bold mb-6">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product or collection you're looking for doesn't exist.</p>

          <Link 
            href={`/collections/${resolvedParams.collection}`}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors border border-purple-200 hover:border-purple-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to {resolvedParams.collection}
          </Link>
        </div>
      );
    }

    const product = productData.product;
    const collection = collectionData.collection;
    
    // Helper function to get the primary collection (excluding featured-artwork)
    const getPrimaryCollection = (product: any) => {
      if (!product.collections?.edges) return collection;
      
      const primaryCollection = product.collections.edges.find(
        (edge: any) => edge.node.handle !== 'featured-artwork'
      );
      return primaryCollection?.node || collection;
    };
    
    const primaryCollection = getPrimaryCollection(product);
    
    // Background component to ensure consistency across all states
    const Background = () => (
      <>
        {/* PC Background */}
        <div className="hidden tablet:block fixed inset-0 z-0 bg-gray-50">
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
        <div className="tablet:hidden fixed inset-0 z-0 bg-gray-50">
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
      <>
        <Background />
        
        {/* Breadcrumb Navigation */}
        <DynamicBreadcrumb 
          primaryCollection={primaryCollection}
          productTitle={product.title}
        />

        {/* Back to Collection Button */}
        <div className="relative z-10">
          <div className="max-w-6xl mx-auto px-6 py-6 mt-8">
            <DynamicBackButton primaryCollection={primaryCollection} />
          </div>
        </div>

        {/* Product Details */}
        <div className="relative z-10">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Product Image */}
              <div className="space-y-4">
                <ProductImageSlider 
                  images={product.images?.edges?.map((edge: any) => edge.node) || []}
                  productTitle={product.title}
                />
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl tablet:text-5xl font-bold text-white drop-shadow-lg embossed-text ghostlight-font mb-2">{product.title}</h1>
                  
                  <p className="text-xl text-gray-200 drop-shadow-md">
                    From the <Link href={`/collections/${resolvedParams.collection}`} className="text-purple-900 hover:text-purple-300 transition-colors">
                      {collection.title}
                    </Link> collection
                  </p>

                  {product.variants?.edges?.every((edge: any) => !edge.node.availableForSale) && (
                    <div className="my-3">
                      <span className="inline-block bg-red-800 text-white px-3 py-1 rounded-full text-md font-semibold drop-shadow-md">
                        Sold Out
                      </span>
                    </div>
                  )}

                </div>

                {/* Product Metaphor/Lore */}
                {(product.metafield?.value || product.descriptionHtml) && (
                  <div className="space-y-4">
                    {/* Show metaphor if available, otherwise fallback to description */}
                    {product.metafield?.value ? (
                      <div className="prose text-gray-200 drop-shadow-md">
                        <div className="whitespace-pre-line">{product.metafield.value}</div>
                      </div>
                    ) : (
                      product.descriptionHtml && (
                        <div 
                          className="prose text-gray-200 drop-shadow-md" 
                          dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} 
                        />
                      )
                    )}
                    
                    {/* Lore link */}
                    <div>
                      <Link 
                        href={`/lore/${resolvedParams.collection}/${product.handle}`}
                        className="text-purple-900 hover:text-purple-300 transition-colors font-medium"
                      >
                        Read the full lore →
                      </Link>
                    </div>
                  </div>
                )}

                {/* Always show lore link even if no metaphor/description */}
                {!(product.metafield?.value || product.descriptionHtml) && (
                  <div className="space-y-4">
                    <div>
                      <Link 
                        href={`/lore/${resolvedParams.collection}/${product.handle}`}
                        className="text-purple-900 hover:text-purple-300 transition-colors font-medium"
                      >
                        Read the full lore →
                      </Link>
                    </div>
                  </div>
                )}

                {/* Variants - Show for all products since they all have variants */}
                <div>
                  <VariantPicker product={product} collectionHandle={resolvedParams.collection} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error('Error loading product:', error);
    return (
      <div className="mx-auto max-w-6xl p-6">
        <h1 className="text-3xl font-bold mb-6">Error Loading Product</h1>
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
