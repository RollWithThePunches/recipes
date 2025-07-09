"use client";

import { useState } from 'react';
import { Menu, Search } from 'lucide-react';
import contentData from '@/data/content.json';
import { ContentData } from '@/types/content';
import Drawer from './Drawer';
import AccountMenu from './AccountMenu';

const content = contentData as ContentData;

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const username = 'John Doe';

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleSignIn = () => {
    setIsLoggedIn(true);
    console.log('Sign in clicked');
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    console.log('Sign out clicked');
  };

  const handleAccountClick = () => {
    console.log('Account clicked');
  };

  const handleSecurityClick = () => {
    console.log('Security clicked');
  };

  const handleMessagesClick = () => {
    console.log('Messages clicked');
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
              className="w-6 h-6 shrink-0 flex items-center justify-center hover:bg-[var(--color-hover-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] rounded transition-colors duration-150 group"
              aria-label="Open navigation menu"
              aria-expanded={isDrawerOpen}
              onClick={handleDrawerToggle}
            >
              <Menu 
                className="w-6 h-6 text-[var(--color-text-heading)] group-hover:text-[var(--color-primary)] transition-colors duration-150"
              />
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
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[var(--color-hover-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] transition-colors duration-150 group"
              aria-label="Search recipes"
            >
              <Search 
                className="w-6 h-6 text-[var(--color-text-heading)] group-hover:text-[var(--color-primary)] transition-colors duration-150"
              />
            </button>
            
            {/* Account Menu */}
            <AccountMenu
              isLoggedIn={isLoggedIn}
              username={username}
              onSignIn={handleSignIn}
              onSignOut={handleSignOut}
              onAccountClick={handleAccountClick}
              onSecurityClick={handleSecurityClick}
              onMessagesClick={handleMessagesClick}
            />
          </div>
        </div>
      </div>
      
      {/* Drawer Component */}
      <Drawer isOpen={isDrawerOpen} onClose={handleDrawerClose} />
    </header>
  );
} 