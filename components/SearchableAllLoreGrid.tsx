"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import AnimatedAllLoreGrid from "./AnimatedAllLoreGrid";

interface SearchableAllLoreGridProps {
  allProducts: any[];
}

export default function SearchableAllLoreGrid({ allProducts }: SearchableAllLoreGridProps) {
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams();

  // Get search term from URL params
  useEffect(() => {
    const search = searchParams.get('search');
    if (search) {
      setSearchTerm(search);
    }
  }, [searchParams]);

  // Filter products based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter(product => 
        product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.collectionTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags?.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, allProducts]);

  return (
    <div>
      {/* Search Results Header */}
      {searchTerm && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Search Results for "{searchTerm}"
          </h2>
          <p className="text-gray-600">
            Found {filteredProducts.length} {filteredProducts.length === 1 ? 'lore story' : 'lore stories'}
            {filteredProducts.length === 0 && ' - try a different search term'}
          </p>
        </div>
      )}
      
      {/* Products Grid */}
      <AnimatedAllLoreGrid 
        products={filteredProducts}
        searchTerm={searchTerm}
      />
    </div>
  );
}
