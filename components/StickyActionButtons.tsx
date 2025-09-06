"use client";

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import AddToCartButton from './AddToCartButton';
import BuyNowButton from './BuyNowButton';
import Toast from './Toast';

interface StickyActionButtonsProps {
  selectedVariant: any;
  product: any;
  quantity: number;
  collectionHandle?: string;
  selectedOptions: any;
  hasMultipleVariants: boolean;
  allOptions: any[];
  isSoldOut?: boolean;
}

export default function StickyActionButtons({
  selectedVariant,
  product,
  quantity,
  collectionHandle,
  selectedOptions,
  hasMultipleVariants,
  allOptions,
  isSoldOut = false
}: StickyActionButtonsProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldShowSticky, setShouldShowSticky] = useState(false);
  const lastScrollY = useRef(0);
  const [showToast, setShowToast] = useState(false);
  const [clickPosition, setClickPosition] = useState<{ x: number; y: number } | undefined>();
  const [toastKey, setToastKey] = useState(0);



    useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Normal scroll behavior - always apply
      if (currentScrollY < lastScrollY.current) {
        // Show buttons when scrolling up (any amount) or when at the very top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        // Only hide when scrolling down AND we're more than 50px from top
        setIsVisible(false);
      }
      // If we're near the top (within 50px), always show buttons

      lastScrollY.current = currentScrollY;
    };

        // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    document.body.addEventListener('scroll', handleScroll, { passive: true });

    // Test scroll immediately
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
      document.body.removeEventListener('scroll', handleScroll);
    };
  }, [hasMultipleVariants, allOptions, selectedOptions]); // Add dependencies to track option changes

  const isDisabled = isSoldOut || (hasMultipleVariants && !allOptions.every(option => selectedOptions[option.name] && selectedOptions[option.name] !== ''));
  const allOptionsSelected = !hasMultipleVariants || allOptions.every(option => selectedOptions[option.name] && selectedOptions[option.name] !== '');
  
  // Dynamic toast message based on priority
  const getToastMessage = () => {
    if (isSoldOut) {
      return "This item is sold out";
    }
    if (hasMultipleVariants && !allOptions.every(option => selectedOptions[option.name] && selectedOptions[option.name] !== '')) {
      return "Please select all options to add to cart";
    }
    return "Please select all options to add to cart";
  };

  // Update shouldShowSticky when options change
  useEffect(() => {
    setShouldShowSticky(allOptionsSelected);
    
    // If all options are selected, show them regardless of scroll position
    if (allOptionsSelected) {
      setIsVisible(true);
    }
  }, [allOptionsSelected, selectedOptions]);

  const handleButtonClick = (e: React.MouseEvent) => {
    if (isDisabled) {
      e.preventDefault();
      e.stopPropagation();
      setClickPosition({ x: e.clientX, y: e.clientY });
      setShowToast(true);
    }
  };

  // Handle disabled button clicks specifically
  const handleDisabledClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Force restart animation by changing key to bypass exit animation
    setClickPosition({ x: e.clientX, y: e.clientY });
    setToastKey(prev => prev + 1); // Change key to force new component
    setShowToast(true);
  };





  return (
    <>
      {/* Desktop: Side by side buttons */}
      <div className="hidden md:flex gap-3">
        <div className="flex-1">
          <div 
            className="w-full relative" 
            onClick={isDisabled ? handleDisabledClick : undefined}
            style={{ cursor: isDisabled ? 'pointer' : 'default' }}
          >
            <AddToCartButton
              merchandiseId={selectedVariant.id}
              quantity={quantity}
              title={product.title || 'Product'}
              price={selectedVariant.price?.amount || '0'}
              image={product.images?.edges?.[0]?.node?.url || ""}
              handle={product.handle}
              collectionHandle={collectionHandle}
              variantOptions={selectedOptions}
              variantTitle={selectedVariant.title}
              disabled={isDisabled}
            />
            {isDisabled && (
              <div className="absolute inset-0 z-10 bg-transparent" />
            )}
          </div>
        </div>
        <div className="flex-1">
          <div 
            className="w-full relative" 
            onClick={isDisabled ? handleDisabledClick : undefined}
            style={{ cursor: isDisabled ? 'pointer' : 'default' }}
          >
                               <BuyNowButton
                     merchandiseId={selectedVariant.id}
                     quantity={quantity}
                     disabled={isDisabled}
                   />
            {isDisabled && (
              <div className="absolute inset-0 z-10 bg-transparent" />
            )}
          </div>
        </div>
      </div>

      {/* Mobile: Sticky bottom buttons - rendered via portal */}
      {typeof window !== 'undefined' && createPortal(
        <div 
          className={`md:hidden fixed bottom-0 left-0 right-0 transition-transform duration-300 sticky-action-buttons ${
            isVisible ? 'translate-y-0' : 'translate-y-full'
          }`}
          style={{ zIndex: 99999 }}
        >
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex gap-3 max-w-md mx-auto min-h-[60px]">
              <div className="flex-1">
                <div 
                  className="w-full relative" 
                  onClick={isDisabled ? handleDisabledClick : undefined}
                  style={{ cursor: isDisabled ? 'pointer' : 'default' }}
                >
                  <div className="h-12">
                    <AddToCartButton
                      merchandiseId={selectedVariant.id}
                      quantity={quantity}
                      title={product.title || 'Product'}
                      price={selectedVariant.price?.amount || '0'}
                      image={product.images?.edges?.[0]?.node?.url || ""}
                      handle={product.handle}
                      collectionHandle={collectionHandle}
                      variantOptions={selectedOptions}
                      variantTitle={selectedVariant.title}
                      disabled={isDisabled}
                    />
                  </div>
                  {isDisabled && (
                    <div className="absolute inset-0 z-10 bg-transparent" />
                  )}
                </div>
              </div>
              <div className="flex-1">
                <div 
                  className="w-full relative" 
                  onClick={isDisabled ? handleDisabledClick : undefined}
                  style={{ cursor: isDisabled ? 'pointer' : 'default' }}
                >
                  <div className="h-12">
                                       <BuyNowButton
                     merchandiseId={selectedVariant.id}
                     quantity={quantity}
                     disabled={isDisabled}
                   />
                  </div>
                  {isDisabled && (
                    <div className="absolute inset-0 z-10 bg-transparent" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Mobile: Spacer to prevent content from being hidden behind sticky buttons */}
      <div className="md:hidden h-20"></div>





      {/* Toast Message */}
      <Toast
        key={toastKey}
        message={getToastMessage()}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        clickPosition={clickPosition}
      />
    </>
  );
}
