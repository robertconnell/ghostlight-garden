"use client";

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
  clickPosition?: { x: number; y: number };
}

export default function Toast({ message, isVisible, onClose, duration = 3000, clickPosition }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  // Calculate position with screen boundary constraints
  const getToastPosition = () => {
    if (!clickPosition) {
      // Fallback to center positioning
      return {
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        bottom: 'auto'
      };
    }

    const toastWidth = 320; // w-80 = 320px
    const toastHeight = 80; // Approximate height
    const margin = 16; // 16px margin from screen edges
    
    let left = clickPosition.x - (toastWidth / 2);
    let top = clickPosition.y - toastHeight - 10; // 10px above click point
    
    // Constrain to screen boundaries
    const maxLeft = window.innerWidth - toastWidth - margin;
    const minLeft = margin;
    
    if (left < minLeft) left = minLeft;
    if (left > maxLeft) left = maxLeft;
    
    // If toast would go above screen, position below click point instead
    if (top < margin) {
      top = clickPosition.y + 10; // 10px below click point
    }
    
    return {
      left: `${left}px`,
      top: `${top}px`,
      transform: 'none',
      bottom: 'auto'
    };
  };

  return typeof window !== 'undefined' && createPortal(
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ 
            opacity: 0, 
            scale: 0.95, 
            y: 20,
            x: 0
          }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0,
            x: 0
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.95, 
            y: 20,
            x: 0
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            duration: 0.2
          }}
          className="fixed z-[99999] bg-purple-50 border-l-4 border-[#8A6D9B] p-4 rounded-bl-lg rounded-tr-lg rounded-br-lg shadow-lg w-80"
          style={getToastPosition()}
        >
          <p className="text-[#8A6D9B] font-medium">{message}</p>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
