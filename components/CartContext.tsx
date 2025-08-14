"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
  id: string;
  merchandiseId: string;
  quantity: number;
  title?: string;
  price?: string;
  image?: string;
  addedAt: number; // Timestamp when item was added
  variantOptions?: Record<string, string>; // e.g., { "Frame": "Yes", "Gold Leaf": "No" }
  variantTitle?: string; // e.g., "Yes / No" or "None / Yes"
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id' | 'addedAt'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  clearExpiredItems: () => void;
  clearCartByOrderId: (orderId: string) => void;
  markCartAsOrdered: (orderId: string) => void;
  validateCartItems: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart expiration time: 7 days in milliseconds
const CART_EXPIRATION_TIME = 7 * 24 * 60 * 60 * 1000;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('ghostlight-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        // Filter out expired items when loading
        const now = Date.now();
        const validItems = parsedCart.filter((item: CartItem) => 
          (now - item.addedAt) < CART_EXPIRATION_TIME
        );
        
        if (validItems.length !== parsedCart.length) {
          // Some items expired, update localStorage
          localStorage.setItem('ghostlight-cart', JSON.stringify(validItems));
        }
        
        setItems(validItems);
        
        // Validate items after loading
        setTimeout(() => validateCartItems(), 1000);
      } catch (error) {
        console.error('Failed to parse saved cart:', error);
        localStorage.removeItem('ghostlight-cart');
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ghostlight-cart', JSON.stringify(items));
  }, [items]);

  // Clear expired items function
  const clearExpiredItems = () => {
    const now = Date.now();
    const validItems = items.filter(item => 
      (now - item.addedAt) < CART_EXPIRATION_TIME
    );
    
    if (validItems.length !== items.length) {
      setItems(validItems);
      console.log('Expired cart items cleared');
    }
  };

  // Validate cart items against current catalog
  const validateCartItems = async () => {
    try {
      // For now, we'll implement basic validation
      // In production, you'd check against your Shopify catalog
      
      const validItems = items.filter(item => {
        // Basic validation - ensure required fields exist
        return item.merchandiseId && item.quantity > 0 && item.title;
      });
      
      if (validItems.length !== items.length) {
        setItems(validItems);
        console.log('Invalid cart items removed');
      }
    } catch (error) {
      console.error('Error validating cart items:', error);
    }
  };

  // Check for expired items every hour
  useEffect(() => {
    const interval = setInterval(clearExpiredItems, 60 * 60 * 1000); // Every hour
    return () => clearInterval(interval);
  }, [items]);

  // Mark cart as ordered (store order ID in localStorage)
  const markCartAsOrdered = (orderId: string) => {
    localStorage.setItem('ghostlight-ordered-cart', orderId);
    console.log('Cart marked as ordered:', orderId);
  };

  // Clear cart by order ID (called when webhook confirms payment)
  const clearCartByOrderId = (orderId: string) => {
    const storedOrderId = localStorage.getItem('ghostlight-ordered-cart');
    if (storedOrderId === orderId) {
      clearCart();
      localStorage.removeItem('ghostlight-ordered-cart');
      console.log('Cart cleared after successful payment for order:', orderId);
    }
  };

  // Check for post-payment cart clearing on mount
  useEffect(() => {
    const checkForOrderCompletion = async () => {
      const orderedCartId = localStorage.getItem('ghostlight-ordered-cart');
      if (orderedCartId) {
        console.log('Cart was marked as ordered, clearing automatically:', orderedCartId);
        
        // Simple approach: clear cart immediately when returning from checkout
        // This assumes the user completed payment if they're back on the site
        clearCart();
        localStorage.removeItem('ghostlight-ordered-cart');
        console.log('Cart cleared after checkout return');
      }
    };
    
    // Check immediately on mount
    checkForOrderCompletion();
  }, []);

  const addItem = (newItem: Omit<CartItem, 'id' | 'addedAt'>) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.merchandiseId === newItem.merchandiseId);
      
      if (existingItem) {
        // Update quantity if item already exists and refresh timestamp
        return currentItems.map(item =>
          item.merchandiseId === newItem.merchandiseId
            ? { ...item, quantity: item.quantity + newItem.quantity, addedAt: Date.now() }
            : item
        );
      } else {
        // Add new item with unique ID and current timestamp
        return [...currentItems, { 
          ...newItem, 
          id: `${Date.now()}-${Math.random()}`,
          addedAt: Date.now()
        }];
      }
    });
  };

  const removeItem = (id: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, quantity, addedAt: Date.now() } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => {
    const price = item.price ? parseFloat(item.price) : 0;
    return sum + (price * item.quantity);
  }, 0);

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      clearExpiredItems,
      clearCartByOrderId,
      markCartAsOrdered,
      validateCartItems,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
