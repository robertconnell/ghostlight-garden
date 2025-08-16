// components/VariantPicker.tsx
"use client";

import { useState } from "react";
import AddToCartButton from "./AddToCartButton";
import BuyNowButton from "./BuyNowButton";

interface VariantPickerProps {
  product: {
    options: { name: string; values: string[] }[];
    variants: { edges: { node: any }[] };
    title?: string;
    handle?: string; // Add handle to the interface
    featuredImage?: { url: string; altText?: string };
    descriptionHtml?: string;
  };
}

export default function VariantPicker({ product }: VariantPickerProps) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);

  // Get all options (Frame, Gold Leaf, etc.)
  const allOptions = product.options;
  
  // Check if we actually have meaningful variants to select from
  const hasMultipleVariants = product.variants.edges.length > 1;
  
  // Find matching variant
  const findMatchingVariant = () => {
    // If no options are selected, return the first variant
    if (Object.keys(selectedOptions).length === 0) {
      return product.variants.edges[0]?.node;
    }

    // Find variant that matches selected options
    return product.variants.edges.find(({ node }: { node: any }) => {
      return node.selectedOptions.every((option: any) => {
        // If this option isn't selected, skip it
        if (!selectedOptions[option.name]) return true;
        // If this option is selected, check if it matches
        return selectedOptions[option.name] === option.value;
      });
    })?.node;
  };

  const selectedVariant = findMatchingVariant();

  // Get the base price (lowest price variant)
  const allVariants = product.variants.edges.map(({ node }: { node: any }) => node);
  const baseVariant = allVariants.reduce((lowest, current) => {
    const lowestPrice = parseFloat(lowest.price?.amount || '0');
    const currentPrice = parseFloat(current.price?.amount || '0');
    return currentPrice < lowestPrice ? current : lowest;
  });
  const basePrice = baseVariant?.price?.amount || '0';
  const selectedPrice = selectedVariant?.price?.amount || basePrice;
  
  // Format prices for display
  const formatPrice = (price: string) => {
    const numPrice = parseFloat(price);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(numPrice);
  };

  return (
    <div className="space-y-4">
      {/* Dynamic Price Display */}
      <div className="text-lg font-semibold text-gray-900">
        <span className="text-gray-600">Price: </span>
        {formatPrice(selectedPrice)}
        {selectedPrice !== basePrice && (
          <span className="text-sm text-gray-500 ml-2">
            (Base: {formatPrice(basePrice)})
          </span>
        )}
      </div>

      {/* Product Description */}
      {product.descriptionHtml && (
        <div
          className="prose text-sm text-gray-600"
          dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
        />
      )}

      {/* Dynamic Option Selection - Show ALL options when there are multiple variants */}
      {hasMultipleVariants && allOptions.map((option) => (
        <div key={option.name}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {option.name}
          </label>
          <select
            value={selectedOptions[option.name] || ''}
            onChange={(e) => setSelectedOptions(prev => ({
              ...prev,
              [option.name]: e.target.value
            }))}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select {option.name}</option>
            {option.values.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      ))}

      {/* Helpful message when options aren't selected */}
      {hasMultipleVariants && !allOptions.every(option => selectedOptions[option.name] && selectedOptions[option.name] !== '') && (
        <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-200">
          <p className="font-medium">Please select all options to add to cart</p>
          <p className="text-xs mt-1">Choose your preferences above to enable the Add to Cart button</p>
        </div>
      )}

      {/* Quantity */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quantity
        </label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        {selectedVariant ? (
          <>
            <AddToCartButton
              merchandiseId={selectedVariant.id}
              quantity={quantity}
              title={product.title || 'Product'}
              price={selectedVariant.price?.amount || '0'}
              image={product.featuredImage?.url}
              handle={product.handle}
              variantOptions={selectedOptions}
              variantTitle={selectedVariant.title}
              disabled={hasMultipleVariants && !allOptions.every(option => selectedOptions[option.name] && selectedOptions[option.name] !== '')}
            />
            <BuyNowButton
              merchandiseId={selectedVariant.id}
              quantity={quantity}
              disabled={hasMultipleVariants && !allOptions.every(option => selectedOptions[option.name] && selectedOptions[option.name] !== '')}
            />
          </>
        ) : (
          // Fallback: show buttons for first variant if no match
          product.variants.edges[0]?.node && (
            <>
              <AddToCartButton
                merchandiseId={product.variants.edges[0].node.id}
                quantity={quantity}
                title={product.title || 'Product'}
                price={product.variants.edges[0].node.price?.amount || '0'}
                image={product.featuredImage?.url}
                handle={product.handle}
                variantOptions={{}}
                variantTitle={product.variants.edges[0].node.title}
                disabled={hasMultipleVariants && !allOptions.every(option => selectedOptions[option.name] && selectedOptions[option.name] !== '')}
              />
              <BuyNowButton
                merchandiseId={product.variants.edges[0].node.id}
                quantity={quantity}
                disabled={hasMultipleVariants && !allOptions.every(option => selectedOptions[option.name] && selectedOptions[option.name] !== '')}
              />
            </>
          )
        )}
      </div>
    </div>
  );
}
