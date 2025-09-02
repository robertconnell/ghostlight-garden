"use client";

import { useState } from "react";

interface FilterBarProps {
  onFiltersChange: (filters: FilterState) => void;
  initialSearch?: string;
}

export interface FilterState {
  search: string;
  priceRange: [number, number];
  availability: string;
}

export default function FilterBar({ onFiltersChange, initialSearch = "" }: FilterBarProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: initialSearch,
    priceRange: [0, 1000],
    availability: "all"
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const clearFilters = () => {
    const clearedFilters: FilterState = {
      search: "",
      priceRange: [0, 1000] as [number, number],
      availability: "all"
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      {/* Header with Toggle */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          {isExpanded ? "Hide" : "Show"} Filters
        </button>
      </div>

      {/* Search Bar - Always Visible */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Ghostlight Garden..."
          value={filters.search}
          onChange={(e) => handleFilterChange({ search: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      {/* Expandable Filters */}
      {isExpanded && (
        <div className="space-y-4 pt-4 border-t border-gray-200">
          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.priceRange[0]}
                onChange={(e) => handleFilterChange({ 
                  priceRange: [Number(e.target.value), filters.priceRange[1]] 
                })}
                className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <span className="text-gray-500">to</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.priceRange[1]}
                onChange={(e) => handleFilterChange({ 
                  priceRange: [filters.priceRange[0], Number(e.target.value)] 
                })}
                className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Availability
            </label>
            <select
              value={filters.availability}
              onChange={(e) => handleFilterChange({ availability: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Items</option>
              <option value="in-stock">In Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>

          {/* Clear Filters Button */}
          <div className="pt-2">
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
