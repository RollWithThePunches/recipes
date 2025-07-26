"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Toast } from "./toast";

interface ToastContextType {
  showToast: (message: string) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toast, setToast] = useState<{ message: string; id: number } | null>(
    null,
  );
  const [idCounter, setIdCounter] = useState(0);

  const showToast = (message: string) => {
    const id = idCounter + 1;
    setIdCounter(id);
    setToast({ message, id });
  };

  const hideToast = () => {
    setToast(null);
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        hideToast();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {toast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-md">
          <Toast message={toast.message} onClose={hideToast} key={toast.id} />
        </div>
      )}
    </ToastContext.Provider>
  );
}
