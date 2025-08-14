// app/products/[handle]/page.tsx
import Image from "next/image";
import { shopifyFetch } from "@/lib/shopify";
import { PRODUCT_BY_HANDLE } from "@/lib/queries";
import VariantPicker from "@/components/VariantPicker";

export default async function ProductPage({ params }: { params: { handle: string } }) {
  try {
    // Fetch the product (make sure PRODUCT_BY_HANDLE includes `options { name values }`)
    const { product } = await shopifyFetch<{ product: any }>(PRODUCT_BY_HANDLE, {
      handle: params.handle,
    });

    if (!product) {
      return <main className="p-6">Product not found.</main>;
    }

    const firstImg = product.images?.edges?.[0]?.node;
    const firstVariant = product.variants?.edges?.[0]?.node;

    return (
      <main className="mx-auto max-w-6xl p-6 grid gap-8 md:grid-cols-2">
        {/* Gallery */}
        <div>
          {firstImg ? (
            <Image
              src={firstImg.url}
              alt={firstImg.altText || product.title}
              width={firstImg.width || 1200}
              height={firstImg.height || 1200}
              className="rounded-xl w-full h-auto object-cover"
              priority
            />
          ) : (
            <div className="w-full h-96 bg-gray-200 rounded-xl flex items-center justify-center">
              <span className="text-gray-500">No image available</span>
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>

          {/* Baseline price from first variant (optional; we can live-update later) */}
          {firstVariant?.price ? (
            <p className="mt-2 text-lg opacity-80">
              {Number(firstVariant.price.amount).toFixed(2)} {firstVariant.price.currencyCode}
            </p>
          ) : null}

          {/* Variant & quantity picker + Buy Now */}
          <div className="mt-6">
            <VariantPicker
              product={{
                options: product.options,     // requires options { name, values } in the query
                variants: product.variants,   // requires variants { id, price, selectedOptions, availableForSale }
                title: product.title,
                featuredImage: firstImg ? {
                  url: firstImg.url,
                  altText: firstImg.altText || product.title
                } : undefined
              }}
            />
          </div>

          {/* Description */}
          {product.descriptionHtml ? (
            <div
              className="prose mt-8"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          ) : (
            <p className="mt-8 text-gray-600">No description available.</p>
          )}
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error fetching product:', error);
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Product</h1>
        <p className="text-gray-600">Unable to load product details. Please try again later.</p>
      </main>
    );
  }
}
