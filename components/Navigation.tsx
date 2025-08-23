"use client";

import Link from "next/link";
import { useCart } from "./CartContext";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CartDisplay from "./CartDisplay";
import SearchModal from "./SearchModal";

export default function Navigation() {
  const { totalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);

  // Close cart when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
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
      setIsCartOpen(true);
    }
  };

  const handleSearchToggle = () => {
    if (isSearchOpen) {
      setIsSearchOpen(false);
    } else {
      setIsCartOpen(false);
      setIsMobileMenuOpen(false);
      setIsSearchOpen(true);
    }
  };

  const handleMobileMenuToggle = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    } else {
      setIsCartOpen(false);
      setIsSearchOpen(false);
      setIsMobileMenuOpen(true);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link href="/" className="text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
            Ghostlight Garden
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/home" className="text-gray-600 hover:text-gray-900 transition-colors">
              Home
            </Link>
                              <Link href="/collection" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Collection
                  </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
              Contact
            </Link>
          </div>

          {/* Right side - Search, Cart and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <div className="relative">
              <button
                onClick={handleSearchToggle}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
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
                className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
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
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
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
                    className="fixed sm:absolute left-4 sm:left-auto right-4 sm:right-0 top-20 sm:top-full mt-0 sm:mt-2 w-auto sm:w-80 md:w-96 lg:w-[28rem] max-w-[calc(100vw-2rem)] sm:max-w-none bg-white/95 backdrop-blur-sm border border-gray-200/80 rounded-lg shadow-lg z-50 overflow-hidden"
                  >
                    <CartDisplay />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={handleMobileMenuToggle}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
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
                className="fixed top-16 inset-x-0 bottom-0 bg-black/50 z-40 md:hidden"
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
                className="fixed top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50 md:hidden overflow-hidden"
              >
                <div className="py-4 space-y-1 px-6">
                  <Link 
                    href="/home" 
                    className="text-gray-600 hover:text-gray-900 transition-colors px-4 py-3 block rounded-lg hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link 
                    href="/collection" 
                    className="text-gray-600 hover:text-gray-900 transition-colors px-4 py-3 block rounded-lg hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Collection
                  </Link>
                  <Link 
                    href="/about" 
                    className="text-gray-600 hover:text-gray-900 transition-colors px-4 py-3 block rounded-lg hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                  <Link 
                    href="/contact" 
                    className="text-gray-600 hover:text-gray-900 transition-colors px-4 py-3 block rounded-lg hover:bg-gray-50"
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
    </nav>
  );
}
