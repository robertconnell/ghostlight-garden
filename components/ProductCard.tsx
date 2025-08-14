import Image from "next/image";
import Link from "next/link";

export default function ProductCard({
  product,
}: { product: {
  title: string; handle: string;
  featuredImage?: { url: string; altText?: string; width: number; height: number } | null;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
}}) {
  const img = product.featuredImage;
  return (
    <Link href={`/products/${product.handle}`} className="group block">
      <div className="rounded-xl overflow-hidden bg-gray-100 aspect-square">
        {img && (
          <Image
            src={img.url}
            alt={img.altText || product.title}
            width={img.width || 800}
            height={img.height || 800}
            className="h-full w-full object-cover transition-transform group-hover:scale-[1.03]"
          />
        )}
      </div>
      <div className="mt-3">
        <h3 className="font-medium leading-tight group-hover:underline">{product.title}</h3>
        <p className="text-sm opacity-70">
          {Number(product.priceRange.minVariantPrice.amount).toFixed(2)}{" "}
          {product.priceRange.minVariantPrice.currencyCode}
        </p>
      </div>
    </Link>
  );
}
