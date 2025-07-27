"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  currentPath?: string;
}

// Icon components
const CloseIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M18 6L6 18M6 6L18 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);







// Navigation menu item component
interface MenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  isOpen: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ children, onClick, isOpen }) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Use -1 for server-side rendering to avoid hydration mismatch
  const tabIndex = mounted ? (isOpen ? 0 : -1) : -1;
  
  return (
    <Button
      variant="ghost"
      size="default"
      onClick={onClick}
      className="w-full justify-start text-left h-auto bg-[var(--color-background)] text-[var(--color-text-heading)] hover:bg-[var(--color-hover-background)] hover:text-[var(--color-text-heading)] transition-colors duration-150"
      style={{
        fontFamily: "var(--font-family-body)",
        padding: "var(--spacing-sm) var(--spacing-md)",
      }}
      tabIndex={tabIndex}
    >
      <span className="text-current">{children}</span>
    </Button>
  );
};

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  className = "",
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);
  const { isLoggedIn } = useAuth();
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Use -1 for server-side rendering to avoid hydration mismatch
  const tabIndex = mounted ? (isOpen ? 0 : -1) : -1;

  // Focus management
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle overlay click
  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 ${className}`}
      style={{ 
        backgroundColor: "var(--color-background-overlay)",
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? "auto" : "none",
      }}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
      tabIndex={tabIndex}
    >
      <div
        ref={drawerRef}
        className="flex flex-col h-full w-full max-w-sm border-r transition-transform duration-250 ease-in"
        style={{
          backgroundColor: "var(--color-background)",
          borderColor: "var(--card-border)",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        }}
        role="document"
      >
        {/* Header */}
        <div
            className="flex items-center px-[var(--spacing-lg)] align-center pl-[var(--spacing-xl)] gap-[var(--spacing-sm)]"
            style={{
              height: "59px",
            }}
          >
            <Button
              ref={closeButtonRef as React.RefObject<HTMLButtonElement>}
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="w-8 h-8 text-[var(--color-text-heading)] hover:bg-[var(--color-hover-background)] hover:text-[var(--color-text-heading)] transition-colors duration-150"
              style={{
                padding: "var(--spacing-sm)",
              }}
              aria-label="Close navigation menu"
              tabIndex={tabIndex}
            >
              <CloseIcon className="w-6 h-6" />
            </Button>
            <h1
              id="drawer-title"
              className="font-normal text-[var(--color-primary)]"
              style={{
                fontFamily: "var(--font-family-heading)",
                fontSize: "var(--font-size-3xl)",
              }}
            >
              Cooking
            </h1>
          </div>


        {/* Navigation Menu */}
        <nav
          className="flex-1"
          style={{ 
            padding: "var(--spacing-xl) var(--spacing-xl) 0 var(--spacing-xl)",
            borderTop: "1px solid var(--color-gray)"
          }}
          aria-label="Main navigation"
        >
          <div className="flex flex-col" style={{ gap: "var(--spacing-sm)" }}>
            <MenuItem onClick={() => console.log("Meals clicked")} isOpen={isOpen}>
              Meals
            </MenuItem>
            <MenuItem onClick={() => console.log("Ingredients clicked")} isOpen={isOpen}>
              Ingredients
            </MenuItem>
            <MenuItem onClick={() => console.log("Culture clicked")} isOpen={isOpen}>
              Culture
            </MenuItem>
            <MenuItem onClick={() => console.log("Occasions clicked")} isOpen={isOpen}>
              Occasions
            </MenuItem>
          </div>
          
          {isLoggedIn && (
            <div 
              className="flex flex-col" 
              style={{ 
                gap: "var(--spacing-sm)",
                marginTop: "var(--spacing-xl)",
                paddingTop: "var(--spacing-xl)",
                borderTop: "1px solid var(--color-gray)"
              }}
            >
              <MenuItem onClick={() => console.log("Favorites clicked")} isOpen={isOpen}>
                Favorites
              </MenuItem>
              <MenuItem onClick={() => console.log("Your recipes clicked")} isOpen={isOpen}>
                Your recipes
              </MenuItem>
            </div>
          )}
        </nav>


      </div>
    </div>
  );
};

export default Drawer;
