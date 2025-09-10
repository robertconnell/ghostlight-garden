"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface PricingModalContextType {
  isPricingModalOpen: boolean;
  setIsPricingModalOpen: (isOpen: boolean) => void;
  openPricingModal: () => void;
  closePricingModal: () => void;
}

const PricingModalContext = createContext<PricingModalContextType | undefined>(undefined);

export function PricingModalProvider({ children }: { children: ReactNode }) {
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

  const openPricingModal = () => setIsPricingModalOpen(true);
  const closePricingModal = () => setIsPricingModalOpen(false);

  return (
    <PricingModalContext.Provider 
      value={{ 
        isPricingModalOpen, 
        setIsPricingModalOpen, 
        openPricingModal, 
        closePricingModal 
      }}
    >
      {children}
    </PricingModalContext.Provider>
  );
}

export function usePricingModal() {
  const context = useContext(PricingModalContext);
  if (context === undefined) {
    throw new Error('usePricingModal must be used within a PricingModalProvider');
  }
  return context;
}
