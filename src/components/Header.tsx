"use client";

import { useState } from 'react';
import contentData from '@/data/content.json';
import { ContentData } from '@/types/content';
import Drawer from './Drawer';

const content = contentData as ContentData;

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };
  return (
    <header 
      className="relative w-full h-[60px] bg-white border-b border-solid border-[var(--color-text-heading)]"
      role="banner"
    >
      <div className="flex flex-row items-center h-full">
        <div className="flex flex-row items-center justify-between px-4 w-full h-full">
          {/* Left section with hamburger and brand */}
          <div className="flex flex-row items-center gap-6">
            {/* Hamburger menu button */}
            <button
              className="w-6 h-4 shrink-0 flex items-center justify-center hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] rounded transition-opacity duration-150"
              aria-label="Open navigation menu"
              aria-expanded={isDrawerOpen}
              onClick={handleDrawerToggle}
            >
              <svg 
                width="24" 
                height="16" 
                viewBox="0 0 24 16" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <rect width="24" height="2" fill="var(--color-text-heading)" />
                <rect y="7" width="24" height="2" fill="var(--color-text-heading)" />
                <rect y="14" width="24" height="2" fill="var(--color-text-heading)" />
              </svg>
            </button>
            
            {/* Brand name */}
            <h1 
              className="text-[32px] text-[var(--color-primary)] leading-none"
              style={{ 
                fontFamily: 'var(--font-family-heading)',
                fontSize: 'var(--font-size-3xl)'
              }}
            >
              {content.ui.navigation.brand}
            </h1>
          </div>
          
          {/* Right section with search and profile */}
          <div className="flex flex-row items-center gap-4">
            {/* Search button */}
            <button
              className="w-8 h-8 flex items-center justify-center rounded-lg"
              aria-label="Search recipes"
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
              >
                <circle 
                  cx="11" 
                  cy="11" 
                  r="8" 
                  stroke="var(--color-text-heading)" 
                  strokeWidth="2"
                />
                <path 
                  d="m21 21-4.35-4.35" 
                  stroke="var(--color-text-heading)" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            
            {/* Profile button */}
            <button
              className="relative w-6 h-6 flex items-center justify-center"
              aria-label="User profile"
            >
              {/* Profile icon background circle */}
              <div className="absolute inset-0 w-6 h-6">
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle 
                    cx="12" 
                    cy="12" 
                    r="12" 
                    fill="var(--color-text-heading)"
                  />
                </svg>
              </div>
              
              {/* Profile icon */}
              <div className="absolute inset-[4px] w-4 h-4">
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M8 8a3 3 0 100-6 3 3 0 000 6zM8 10c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z" 
                    fill="white"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Drawer Component */}
      <Drawer isOpen={isDrawerOpen} onClose={handleDrawerClose} />
    </header>
  );
} 