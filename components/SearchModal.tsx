"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Focus search input when modal opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/collections/all?search=${encodeURIComponent(searchTerm.trim())}`);
      onClose();
      setSearchTerm("");
    }
  };

  const handleClose = () => {
    setSearchTerm("");
    onClose();
  };

  return (
    <>
      {isOpen && (
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
          {/* Search Form */}
          <form onSubmit={handleSearch} className="p-4">
            <h3 className="text-lg font-semibold mb-4 text-black">Search Ghostlight Garden</h3>
            
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search the garden..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent text-gray-900"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              {/* Clear Button */}
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Clear search"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            
            <button
              type="submit"
              disabled={!searchTerm.trim()}
              className="w-full mt-4 rounded-lg px-4 py-3 bg-[#8A6D9B] hover:bg-[#8A6D9B]/90 border-1 border-white text-white font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed button-font"
            >
              Search
            </button>
          </form>
        </motion.div>
      )}
    </>
  );
}
