import { Metadata } from "next";
import Link from "next/link";
import { shopifyFetch } from "@/lib/shopify";
import { PRODUCT_LORE_BY_HANDLE } from "@/lib/queries";
import DynamicLoreBackButton from "@/components/DynamicLoreBackButton";
import ConditionalInspiredSection from "@/components/ConditionalInspiredSection";

interface LoreDetailPageProps {
  params: Promise<{ collection: string; slug: string }>;
}

export async function generateMetadata({ params }: LoreDetailPageProps): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const data = await shopifyFetch<{ product: any }>(PRODUCT_LORE_BY_HANDLE, {
      handle: resolvedParams.slug,
    });

    if (!data.product) {
      return {
        title: "Lore Not Found - Ghostlight Garden",
        description: "The lore you're looking for doesn't exist.",
      };
    }

    const product = data.product;
    const loreText = product.metafield?.value || product.metafield?.value || product.descriptionHtml || '';
    const description = loreText.length > 160 
      ? loreText.substring(0, 160).replace(/<[^>]*>/g, '') + '...'
      : loreText.replace(/<[^>]*>/g, '');

    return {
      title: `${product.title} — Lore | Ghostlight Garden`,
      description: description || `Explore the lore behind ${product.title}.`,
    };
  } catch (error) {
    return {
      title: "Lore - Ghostlight Garden",
      description: "Explore the stories and lore behind our creations.",
    };
  }
}

export default async function LoreDetailPage({ params }: LoreDetailPageProps) {
  try {
    const resolvedParams = await params;
    const data = await shopifyFetch<{ product: any }>(PRODUCT_LORE_BY_HANDLE, {
      handle: resolvedParams.slug,
    });

    if (!data.product) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Lore Not Found</h1>
            <p className="text-gray-600 mb-8">The lore you're looking for doesn't exist.</p>
            <Link href="/lore" className="text-purple-600 hover:text-purple-800 font-medium">
              ← Back to Lore
            </Link>
          </div>
        </div>
      );
    }

    const product = data.product;
    // Get the lore metafield
    const lore = product.metafield?.value;
    const hasLore = lore && lore.trim().length > 0;

    return (
      <>
        {/* Background */}
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

          {/* Hero Section */}
          <div className="relative z-10 py-10 px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg embossed-text ghostlight-font mb-6">
                {product.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-200 drop-shadow-md mb-6">
                The Lore & Story
              </p>
              <div className="w-72 h-1 bg-gradient-to-r from-[#FFF9F566] to-[#9A77CC] mx-auto mt-6 rounded-full"></div>
            </div>

            {/* Dynamic Back Button */}
            <div className="max-w-4xl mx-auto px-4 md:px-6 mt-8">
              <DynamicLoreBackButton 
                collectionHandle={resolvedParams.collection}
                collectionTitle={resolvedParams.collection.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                productHandle={product.handle}
              />
            </div>

            {/* Main Content - Reverse About Page Layout */}
            <div className="max-w-5xl mx-auto px-4 md:px-6 mb-16 mt-12">
              <div className="grid gap-12 md:grid-cols-2">
                {/* Lore Content - Left Side */}
                <div className="order-1 md:order-1">
                  {hasLore ? (
                    <div className="bg-gray-100/30 backdrop-blur-sm rounded-lg p-6 space-y-4 shadow-lg">
                      <div className="prose text-gray-800 text-left">
                        {/* Check if lore contains HTML tags */}
                        {lore.includes('<') ? (
                          <div dangerouslySetInnerHTML={{ __html: lore }} />
                        ) : (
                          <div className="whitespace-pre-line">
                            {lore}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-100/30 backdrop-blur-sm rounded-lg p-6 space-y-4 shadow-lg text-center">
                      <h2 className="text-3xl font-bold text-gray-800 mb-4">Lore Coming Soon</h2>
                      <p className="text-gray-600 mb-8">
                        We're working on bringing you the full story behind this piece. 
                        Check back soon for the complete lore and tale that inspired this creation.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link 
                          href={`/collections/${resolvedParams.collection}/${product.handle}`}
                          className="inline-flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                        >
                          View Product
                        </Link>
                        <Link 
                          href={`/lore/${resolvedParams.collection}`}
                          className="inline-flex items-center justify-center px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-medium"
                        >
                          Explore Collection Lore
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Product Image - Right Side */}
                <div className="flex justify-center items-center order-2 md:order-2 px-2">
                  <div className="relative w-full max-w-sm">
                    <div className="absolute -inset-4 bg-gradient-to-r from-purple-300 to-pink-300 rounded-3xl blur-lg opacity-30"></div>
                    <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-2 shadow-xl">
                      {product.featuredImage ? (
                        <img
                          src={product.featuredImage.url}
                          alt={product.featuredImage.altText || product.title}
                          className="w-full rounded-xl shadow-lg object-contain bg-transparent"
                        />
                      ) : (
                        <div className="w-full h-64 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                          <span className="text-gray-400 text-lg">{product.title}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Conditional "Inspired by this story?" section - only show if coming from lore collection */}
          {hasLore && (
            <ConditionalInspiredSection 
              collectionHandle={resolvedParams.collection}
              productHandle={product.handle}
            />
          )}
        </div>
      </>
    );
  } catch (error) {
    console.error('Error loading lore detail:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Error Loading Lore</h1>
          <p className="text-gray-600 mb-8">There was an error loading the lore content.</p>
          <Link href="/lore" className="text-purple-600 hover:text-purple-800 font-medium">
            ← Back to Lore
          </Link>
        </div>
      </div>
    );
  }
}
