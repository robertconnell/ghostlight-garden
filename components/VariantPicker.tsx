// components/VariantPicker.tsx
"use client";

import { useState } from "react";
import AddToCartButton from "./AddToCartButton";
import BuyNowButton from "./BuyNowButton";
import StickyActionButtons from "./StickyActionButtons";

interface VariantPickerProps {
  product: {
    options: { name: string; values: string[] }[];
    variants: { edges: { node: any }[] };
    title?: string;
    handle?: string; // Add handle to the interface
    images?: { edges: { node: { url: string; altText?: string } }[] };
    descriptionHtml?: string;
  };
  collectionHandle?: string;
}

export default function VariantPicker({ product, collectionHandle }: VariantPickerProps) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);

  // Get all options (Frame, Gold Leaf, etc.)
  const allOptions = product.options;
  
  // Check if we actually have meaningful variants to select from
  const hasMultipleVariants = product.variants.edges.length > 1;
  
  // Get the base price (lowest price variant)
  const allVariants = product.variants.edges.map(({ node }: { node: any }) => node);
  const baseVariant = allVariants.reduce((lowest, current) => {
    const lowestPrice = parseFloat(lowest.price?.amount || '0');
    const currentPrice = parseFloat(current.price?.amount || '0');
    return currentPrice < lowestPrice ? current : lowest;
  });
  const basePrice = baseVariant?.price?.amount || '0';
  
  // Check if all options are selected
  const allOptionsSelected = allOptions.every(option => selectedOptions[option.name]);
  
  // Find matching variant or closest partial match
  const findMatchingVariant = () => {
    // If all options are selected, find exact match
    if (allOptionsSelected) {
      return product.variants.edges.find(({ node }: { node: any }) => {
        return node.selectedOptions.every((option: any) => {
          return selectedOptions[option.name] === option.value;
        });
      })?.node;
    }

    // If some options are selected, find variants that match the selected options
    const selectedOptionNames = Object.keys(selectedOptions);
    if (selectedOptionNames.length > 0) {
      const matchingVariants = product.variants.edges.filter(({ node }: { node: any }) => {
        return node.selectedOptions.every((option: any) => {
          // If this option is selected, it must match
          if (selectedOptions[option.name]) {
            return selectedOptions[option.name] === option.value;
          }
          // If this option is not selected, we don't care what it is
          return true;
        });
      });

      // If we found matching variants, return the first one (they should all have the same price for the selected options)
      if (matchingVariants.length > 0) {
        return matchingVariants[0].node;
      }
    }

    // If no options selected or no matches, return null (show base price)
    return null;
  };

  const selectedVariant = findMatchingVariant();
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
      {/* Dynamic Price Display - Always show price */}
      <div className="text-2xl font-semibold text-gray-800">
        {formatPrice(selectedPrice)}
      </div>

      {/* Product Description */}
      {product.descriptionHtml && (
        <div
          className="prose text-base text-gray-100"
          dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
        />
      )}

      {/* Dynamic Option Selection - Show ALL options when there are multiple variants */}
      {hasMultipleVariants && allOptions.map((option) => (
        <div key={option.name}>
          <label className="block text-lg font-medium text-gray-800 mb-2">
            {option.name}:
          </label>
          <select
            value={selectedOptions[option.name] || ''}
            onChange={(e) => setSelectedOptions(prev => ({
              ...prev,
              [option.name]: e.target.value
            }))}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
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



      {/* Quantity */}
      {/* <div>
                  <label className="block text-lg font-medium text-gray-800 mb-2">
          Quantity:
        </label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
        />
      </div> */}

      {/* Preorder Disclaimer */}
      {/* {!product.variants?.edges?.some((v: any) => v.node.availableForSale && (v.node.quantityAvailable || 0) > 0) && (
        <div className="bg-purple-50 border-l-4 border-[#8A6D9B] p-4 mb-6 rounded-tr-lg rounded-br-lg">
          <h3 className="text-lg font-semibold text-[#8A6D9B] mb-2">Secure your place in the Garden 🌸</h3>
          <p className="text-[#8A6D9B]">
          Your piece will be printed and prepared with care, then shipped out on or before {(() => {
            const today = new Date();
            const twoWeeksFromNow = new Date(today.getTime() + (14 * 24 * 60 * 60 * 1000));
            return twoWeeksFromNow.toLocaleDateString('en-US', { 
              month: 'numeric', 
              day: 'numeric' 
            });
          })()}!
          Thank you for your patience and for bringing a little of the Garden into your home.
          </p>
        </div>
      )} */}

      {/* Action Buttons */}
      {selectedVariant ? (
        <StickyActionButtons
          selectedVariant={selectedVariant}
          product={product}
          quantity={quantity}
          collectionHandle={collectionHandle}
          selectedOptions={selectedOptions}
          hasMultipleVariants={hasMultipleVariants}
          allOptions={allOptions}
        />
      ) : (
        // Fallback: show buttons for first variant if no match
        product.variants.edges[0]?.node && (
          <StickyActionButtons
            selectedVariant={product.variants.edges[0].node}
            product={product}
            quantity={quantity}
            collectionHandle={collectionHandle}
            selectedOptions={{}}
            hasMultipleVariants={hasMultipleVariants}
            allOptions={allOptions}
          />
        )
      )}
    </div>
  );
}
