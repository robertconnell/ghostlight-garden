"use client";

import Link from "next/link";
import { useCart } from "./CartContext";
import { usePricingModal } from "./PricingModalContext";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CartDisplay from "./CartDisplay";
import SearchModal from "./SearchModal";
import PricingModal from "./PricingModal";

export default function Navigation() {
  const { totalItems } = useCart();
  const { isPricingModalOpen, openPricingModal, closePricingModal } = usePricingModal();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollectionsSubmenuOpen, setIsCollectionsSubmenuOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);
  const collectionsRef = useRef<HTMLDivElement>(null);

  // Close cart when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
      if (collectionsRef.current && !collectionsRef.current.contains(event.target as Node)) {
        setIsCollectionsSubmenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close other modals when one opens
  const handleCartToggle = () => {
    if (isCartOpen) {
      setIsCartOpen(false);
    } else {
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
      setIsCollectionsSubmenuOpen(false);
      closePricingModal();
      setIsCartOpen(true);
    }
  };

  const handleSearchToggle = () => {
    if (isSearchOpen) {
      setIsSearchOpen(false);
    } else {
      setIsCartOpen(false);
      setIsMobileMenuOpen(false);
      setIsCollectionsSubmenuOpen(false);
      closePricingModal();
      setIsSearchOpen(true);
    }
  };

  const handleMobileMenuToggle = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    } else {
      setIsCartOpen(false);
      setIsSearchOpen(false);
      setIsCollectionsSubmenuOpen(false);
      closePricingModal();
      setIsMobileMenuOpen(true);
    }
  };

  const handleCollectionsSubmenuToggle = () => {
    if (isCollectionsSubmenuOpen) {
      setIsCollectionsSubmenuOpen(false);
    } else {
      setIsCartOpen(false);
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
      closePricingModal();
      setIsCollectionsSubmenuOpen(true);
    }
  };

  const handlePricingModalOpen = () => {
    openPricingModal();
    setIsCollectionsSubmenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="w-full px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link href="/home" className="relative text-3xl font-alex-brush text-gray-900 hover:text-purple-900 transition-colors">
            ghostlight garden
            <img 
              src="/img/logo_accent_transparent.png" 
              alt="Ghostlight Garden Logo Accent" 
              className="absolute -top-1 -right-4 w-6 h-6"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/home" className="text-gray-600 hover:text-purple-900 transition-colors">
              Home
            </Link>
            
            {/* Collections Submenu */}
            <div className="relative" ref={collectionsRef}>
              <button
                onClick={handleCollectionsSubmenuToggle}
                className="text-gray-600 hover:text-purple-900 transition-colors flex items-center space-x-1"
              >
                <span>Collections</span>
                <svg 
                  className={`w-4 h-4 transition-transform ${isCollectionsSubmenuOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Collections Submenu Dropdown */}
              <AnimatePresence>
                {isCollectionsSubmenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg z-[10000] overflow-hidden"
                  >
                    <Link 
                      href="/collections" 
                      className="block px-4 py-3 text-gray-600 hover:text-purple-900 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsCollectionsSubmenuOpen(false)}
                    >
                      Collections
                    </Link>
                    <button
                      onClick={handlePricingModalOpen}
                      className="block w-full text-left px-4 py-3 text-gray-600 hover:text-purple-900 hover:bg-gray-50 transition-colors"
                    >
                      Pricing
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/commissions" className="text-gray-600 hover:text-purple-900 transition-colors">
              Commissions
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-purple-900 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-purple-900 transition-colors">
              Contact
            </Link>
          </div>

          {/* Right side - Search, Cart and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <div className="relative">
              <button
                onClick={handleSearchToggle}
                className="p-2 text-gray-600 hover:text-purple-900 transition-colors cursor-pointer"
                aria-label="Search artwork"
              >
                <svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                  />
                </svg>
              </button>

              {/* Search Dropdown with Animation */}
              <AnimatePresence>
                {isSearchOpen && (
                  <SearchModal 
                    isOpen={isSearchOpen}
                    onClose={() => setIsSearchOpen(false)}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Cart Icon */}
            <div className="relative" ref={cartRef}>
              <button
                onClick={handleCartToggle}
                className="relative p-2 text-gray-600 hover:text-purple-900 transition-colors cursor-pointer group"
                aria-label="Shopping cart"
              >
                <svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9m-9 0h9" 
                  />
                </svg>
                
                {/* Cart Badge */}
                {totalItems > 0 && (
                  <motion.span 
                    className="absolute -top-1 -right-1 bg-purple-300 group-hover:bg-purple-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium transition-colors"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {totalItems > 99 ? '99+' : totalItems}
                  </motion.span>
                )}
              </button>

              {/* Cart Dropdown with Animation */}
              <AnimatePresence>
                {isCartOpen && (
                  <motion.div
                    initial={{ 
                      opacity: 0, 
                      scale: 0.95, 
                      y: -10,
                      height: 0,
                      x: 20
                    }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      y: 0,
                      height: "auto",
                      x: 0
                    }}
                    exit={{ 
                      opacity: 0, 
                      scale: 0.95, 
                      y: -10,
                      height: 0,
                      x: 20
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 30,
                      duration: 0.2
                    }}
                    className="fixed sm:absolute left-4 sm:left-auto right-4 sm:right-0 top-20 sm:top-full mt-0 sm:mt-2 w-auto sm:w-80 md:w-96 lg:w-[28rem] max-w-[calc(100vw-2rem)] sm:max-w-none bg-white/95 backdrop-blur-sm border border-gray-200/80 rounded-lg shadow-lg z-[9999] overflow-hidden"
                  >
                    <CartDisplay />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={handleMobileMenuToggle}
              className="md:hidden p-2 text-gray-600 hover:text-purple-900 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu with Animation - Now Overlays Content */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop Overlay - Positioned below navigation bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed top-16 inset-x-0 bottom-0 bg-black/50 z-[9998] md:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              
              {/* Mobile Menu Overlay - Height Animation */}
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ 
                  duration: 0.3, 
                  ease: "easeInOut",
                  height: { duration: 0.3, ease: "easeInOut" }
                }}
                className="fixed top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-[9999] md:hidden overflow-hidden"
              >
                <div className="py-4 space-y-1 px-6">
                  <Link 
                    href="/home" 
                    className="text-gray-600 hover:text-purple-900 transition-colors px-4 py-3 block rounded-lg hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  
                  {/* Mobile Collections Submenu */}
                  <div className="space-y-1">
                    <button
                      onClick={() => setIsCollectionsSubmenuOpen(!isCollectionsSubmenuOpen)}
                      className="text-gray-600 hover:text-purple-900 transition-colors px-4 py-3 block rounded-lg hover:bg-gray-50 w-full text-left flex items-center justify-between"
                    >
                      <span>Collections</span>
                      <svg 
                        className={`w-4 h-4 transition-transform ${isCollectionsSubmenuOpen ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {/* Mobile Collections Submenu Items */}
                    <AnimatePresence>
                      {isCollectionsSubmenuOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <Link 
                            href="/collections" 
                            className="text-gray-600 hover:text-purple-900 transition-colors px-8 py-2 block rounded-lg hover:bg-gray-50"
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setIsCollectionsSubmenuOpen(false);
                            }}
                          >
                            Collections
                          </Link>
                          <button
                            onClick={() => {
                              handlePricingModalOpen();
                              setIsMobileMenuOpen(false);
                            }}
                            className="text-gray-600 hover:text-purple-900 transition-colors px-8 py-2 block rounded-lg hover:bg-gray-50 w-full text-left"
                          >
                            Pricing
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  <Link 
                    href="/commissions" 
                    className="text-gray-600 hover:text-purple-900 transition-colors px-4 py-3 block rounded-lg hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Commissions
                  </Link>
                  <Link 
                    href="/about" 
                    className="text-gray-600 hover:text-purple-900 transition-colors px-4 py-3 block rounded-lg hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                  <Link 
                    href="/contact" 
                    className="text-gray-600 hover:text-purple-900 transition-colors px-4 py-3 block rounded-lg hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Pricing Modal */}
      <PricingModal 
        isOpen={isPricingModalOpen}
        onClose={closePricingModal}
      />
    </nav>
  );
}
