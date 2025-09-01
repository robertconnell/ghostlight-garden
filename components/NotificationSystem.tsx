'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  duration?: number;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Date.now().toString();
    const newNotification = { ...notification, id };
    
    setNotifications(prev => [...prev, newNotification]);
    
    // Auto-remove after duration (default: 5 seconds)
    setTimeout(() => {
      removeNotification(id);
    }, notification.duration || 5000);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      removeNotification,
      clearNotifications
    }}>
      {children}
      
      {/* Notification Container */}
      <div className="fixed top-20 right-4 z-[9999] space-y-2">
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 300, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`
                max-w-sm w-full bg-white rounded-lg shadow-lg border-l-4 p-4
                ${notification.type === 'success' ? 'border-green-500' : ''}
                ${notification.type === 'error' ? 'border-red-500' : ''}
                ${notification.type === 'warning' ? 'border-yellow-500' : ''}
                ${notification.type === 'info' ? 'border-blue-500' : ''}
              `}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className={`font-semibold text-sm
                    ${notification.type === 'success' ? 'text-green-800' : ''}
                    ${notification.type === 'error' ? 'text-red-800' : ''}
                    ${notification.type === 'warning' ? 'text-yellow-800' : ''}
                    ${notification.type === 'info' ? 'text-blue-800' : ''}
                  `}>
                    {notification.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {notification.message}
                  </p>
                </div>
                <button
                  onClick={() => removeNotification(notification.id)}
                  className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
