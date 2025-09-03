"use client";

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, isVisible, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return typeof window !== 'undefined' && createPortal(
    <div className="fixed bottom-24 md:bottom-auto md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 left-1/2 transform -translate-x-1/2 z-[99999] bg-purple-50 border-l-4 border-[#8A6D9B] p-4 rounded-tr-lg rounded-br-lg shadow-lg w-80 mx-auto">
      <p className="text-[#8A6D9B] font-medium">{message}</p>
    </div>,
    document.body
  );
}
