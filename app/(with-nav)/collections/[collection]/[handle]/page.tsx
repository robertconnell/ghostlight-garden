import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { shopifyFetch } from "@/lib/shopify";
import { PRODUCT_BY_HANDLE, GET_COLLECTION_BY_HANDLE } from "@/lib/queries";
import AddToCartButton from "@/components/AddToCartButton";
import BuyNowButton from "@/components/BuyNowButton";
import VariantPicker from "@/components/VariantPicker";


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
    

    
    return (
      <>
        {/* Breadcrumb Navigation */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/collections" className="hover:text-gray-900 transition-colors">
                Collections
              </Link>
              <span className="text-gray-400">&lt;</span>
              <Link href={`/collections/${resolvedParams.collection}`} className="hover:text-gray-900 transition-colors">
                {collection.title}
              </Link>
              <span className="text-gray-400">&lt;</span>
              <span className="text-gray-900 font-medium">{product.title}</span>
            </nav>
          </div>
        </div>



        {/* Product Details */}
        <div className="bg-white min-h-screen">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Product Image */}
              <div className="space-y-4">
                {product.images?.edges?.[0]?.node ? (
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={product.images.edges[0].node.url}
                      alt={product.images.edges[0].node.altText || product.title}
                      width={product.images.edges[0].node.width || 800}
                      height={product.images.edges[0].node.height || 800}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-gray-400 text-center">
                      <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p>No image available</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
                  <p className="text-lg text-gray-600">
                    From <Link href={`/collections/${resolvedParams.collection}`} className="text-purple-600 hover:text-purple-700">
                      {collection.title}
                    </Link> collection
                  </p>
                </div>

                {product.description && (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
                    <div className="prose text-gray-600" dangerouslySetInnerHTML={{ __html: product.description }} />
                  </div>
                )}

                {/* Price */}
                {product.priceRange && (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">Price</h2>
                    <p className="text-2xl font-bold text-purple-600">
                      ${product.priceRange.minVariantPrice.amount}
                    </p>
                  </div>
                )}

                {/* Variants */}
                {product.variants?.edges?.length > 1 && (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">Options</h2>
                    <VariantPicker product={product} />
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <AddToCartButton 
                    merchandiseId={product.variants?.edges?.[0]?.node?.id || product.id}
                    title={product.title}
                    price={product.priceRange?.minVariantPrice?.amount || "0"}
                    image={product.images?.edges?.[0]?.node?.url || ""}
                    handle={product.handle}
                    disabled={!product.variants?.edges?.some((v: any) => v.node.availableForSale)}
                  />
                  <BuyNowButton 
                    merchandiseId={product.variants?.edges?.[0]?.node?.id || product.id}
                    disabled={!product.variants?.edges?.some((v: any) => v.node.availableForSale)}
                  />
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
