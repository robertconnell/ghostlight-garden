import Image from "next/image";
import Link from "next/link";
import { IMAGE_PROTECTION_ENABLED } from '@/lib/config';

export default function ProductCard({
  product,
  collectionHandle,
}: { 
  product: {
    title: string; 
    handle: string;
    featuredImage?: { url: string; altText?: string; width: number; height: number } | null;
    priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
    availableForSale?: boolean;
  };
  collectionHandle?: string;
}) {
  const img = product.featuredImage;
  const isAvailable = product.availableForSale !== false;

  // Prevent right-click context menu
  const handleContextMenu = (e: React.MouseEvent) => {
    if (IMAGE_PROTECTION_ENABLED) {
      e.preventDefault();
      return false;
    }
  };

  // Prevent drag and drop
  const handleDragStart = (e: React.DragEvent) => {
    if (IMAGE_PROTECTION_ENABLED) {
      e.preventDefault();
      return false;
    }
  };

  return (
          <Link href={`/collections/${collectionHandle || 'all'}/${product.handle}`} className="group block">
      <div 
        className="relative rounded-xl overflow-hidden bg-gray-100 aspect-square"
        {...(IMAGE_PROTECTION_ENABLED ? {
          onContextMenu: handleContextMenu,
          onDragStart: handleDragStart
        } : {})}
      >
        {img && (
          <Image
            src={img.url}
            alt={img.altText || product.title}
            width={img.width || 800}
            height={img.height || 800}
            className={`h-full w-full object-cover transition-transform group-hover:scale-[1.03] ${IMAGE_PROTECTION_ENABLED ? 'select-none pointer-events-none' : ''}`}
            draggable={!IMAGE_PROTECTION_ENABLED}
            {...(IMAGE_PROTECTION_ENABLED ? {
              onContextMenu: handleContextMenu,
              onDragStart: handleDragStart
            } : {})}
          />
        )}
        
        {/* Availability Badge */}
        {!isAvailable && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            Sold Out
          </div>
        )}
      </div>
      <div className="mt-3">
        <h3 className="font-medium leading-tight group-hover:underline">{product.title}</h3>
        {!isAvailable && (
          <p className="text-xs text-red-500 mt-1">Out of Stock</p>
        )}
      </div>
    </Link>
  );
}
