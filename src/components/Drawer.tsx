'use client';

import React, { useEffect, useRef } from 'react';
import { Button } from './ui/button';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

// Icon components
const CloseIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
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

const SearchIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
    <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const ChevronRightIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
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
      d="M9 18L15 12L9 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Search bar component
const SearchBar: React.FC = () => (
  <div className="relative">
    <input
      type="text"
      placeholder="What are looking to cook?"
      className="w-full rounded-lg text-base font-normal focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] focus:border-transparent transition-colors duration-150"
      style={{ 
        fontFamily: 'var(--font-family-body)',
        padding: 'var(--spacing-sm) var(--spacing-md)',
        paddingRight: '2.5rem',
        border: '1px solid var(--color-background-dark)',
        color: 'var(--color-text-heading)',
        backgroundColor: 'var(--color-background)',
      }}
      aria-label="Search recipes"
    />
    <Button
      variant="ghost"
      size="icon"
      className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 text-[var(--color-text-heading)] hover:text-[var(--color-link-hover)] transition-colors duration-150"
      aria-label="Search"
    >
      <SearchIcon className="w-6 h-6" />
    </Button>
  </div>
);

// Navigation menu item component
interface MenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ children, onClick }) => (
  <Button
    variant="ghost"
    size="default"
    onClick={onClick}
                className="w-full justify-between text-left h-auto bg-[var(--color-background)] text-[var(--color-text-heading)] hover:bg-[var(--color-hover-background)] hover:text-[var(--color-text-heading)] transition-colors duration-150"
    style={{ 
      fontFamily: 'var(--font-family-body)',
      padding: 'var(--spacing-sm) var(--spacing-md)',
    }}
  >
    <span className="text-current">{children}</span>
    <ChevronRightIcon className="w-8 h-8 text-current" />
  </Button>
);

export const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, className = '' }) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus management
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle overlay click
  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 ${className}`}
      style={{ backgroundColor: 'var(--color-background-overlay)' }}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
    >
      <div
        ref={drawerRef}
        className="flex flex-col h-full w-full max-w-sm border-r"
        style={{
          backgroundColor: 'var(--color-background)',
          borderColor: 'var(--card-border)',
        }}
        role="document"
      >
        {/* Header */}
        <div className="flex flex-col gap-6" style={{ padding: 'var(--spacing-lg) var(--spacing-xl) var(--spacing-xl) var(--spacing-xl)' }}>
          <div className="flex items-center" style={{ gap: 'var(--spacing-xl)' }}>
            <Button
              ref={closeButtonRef as React.RefObject<HTMLButtonElement>}
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="w-8 h-8 text-[var(--color-text-heading)] hover:bg-[var(--color-hover-background)] hover:text-[var(--color-text-heading)] transition-colors duration-150"
              style={{
                padding: 'var(--spacing-sm)',
              }}
              aria-label="Close navigation menu"
            >
              <CloseIcon className="w-6 h-6" />
            </Button>
            <h1
              id="drawer-title"
              className="font-normal text-[var(--color-primary)]"
              style={{ 
                fontFamily: 'var(--font-family-heading)',
                fontSize: 'var(--font-size-3xl)'
              }}
            >
              Cooking
            </h1>
          </div>
          <SearchBar />
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1" style={{ padding: '0 var(--spacing-xl)' }} aria-label="Main navigation">
          <div className="flex flex-col" style={{ gap: 'var(--spacing-sm)' }}>
            <MenuItem onClick={() => console.log('Meals clicked')}>
              Meals
            </MenuItem>
            <MenuItem onClick={() => console.log('Ingredients clicked')}>
              Ingredients
            </MenuItem>
            <MenuItem onClick={() => console.log('Culture clicked')}>
              Culture
            </MenuItem>
            <MenuItem onClick={() => console.log('Occasions clicked')}>
              Occasions
            </MenuItem>
          </div>
        </nav>

        {/* Footer */}
        <div style={{ padding: 'var(--spacing-xl)' }}>
          <Button
            variant="default"
            size="default"
            className="w-full"
            style={{ fontFamily: 'var(--font-family-body)' }}
            onClick={() => console.log('Login clicked')}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Drawer; 