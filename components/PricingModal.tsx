"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ArtPricing {
  item: string;
  size: string;
  price: string;
}

interface AddOnPricing {
  option: string;
  additionalCost: string;
}

export default function PricingModal({ isOpen, onClose }: PricingModalProps) {
  const artPricing: ArtPricing[] = [
    { item: "Print",            size: "8x12 inches",  price: "$30" },
    { item: "Print",            size: "11x17 inches", price: "$50" },
    { item: "Print",            size: "14x22 inches", price: "$80" },
    { item: "Original", size: "8x11 inches",  price: "$300" },
    { item: "Limited Edition",  size: "20x30 inches", price: "$700" },
  ];

  const addOnPricing: AddOnPricing[] = [
    { option: "Frame",               additionalCost: "+$20" },
    { option: "Glittered Frame",  additionalCost: "+$25 (includes +$5 glitter)" },
    { option: "Resin Glitter",       additionalCost: "+$5" },
  ];

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Store the current scroll position
      const scrollY = window.scrollY;
      // Lock the scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Restore scroll position when modal closes
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/50 z-[10000] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h2 className="text-4xl font-alex-brush text-gray-900">pricing information</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close pricing modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-8">
            {/* Art Pricing Table */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Artwork</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900">Item</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900">Size</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {artPricing.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 text-gray-900">{item.item}</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-900">{item.size}</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-900">{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Add-ons Table */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Add-ons</h3>
              <p className="text-sm text-gray-600 mb-4">
                Add-on pricing applies to prints only and can be combined.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900">Option</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900">Additional Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {addOnPricing.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 text-gray-900">{item.option}</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-900">{item.additionalCost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Notes */}
            <div className="rounded-md bg-gray-50 border border-gray-200 p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Notes</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
                <li>Frames add $20; glittered frames add $5 more (total $25).</li>
                <li>Resin glitter adds +$5.</li>
                <li>
                  Add-ons do <span className="font-semibold">not</span> change the price of originals and limited editions (they are sold as-is).
                </li>
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-purple-300 hover:bg-purple-400 text-white rounded-lg transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
