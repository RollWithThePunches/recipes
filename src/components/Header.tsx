"use client";

import { useState, useRef, useEffect } from 'react';
import { Menu, Search, X } from 'lucide-react';
import contentData from '@/data/content.json';
import { ContentData } from '@/types/content';
import Drawer from './Drawer';
import AccountMenu from './AccountMenu';

const content = contentData as ContentData;

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const username = 'John Doe';

  // Focus management for search
  useEffect(() => {
    if (isSearchVisible && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchVisible]);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleSearchOpen = () => {
    setIsSearchVisible(true);
  };

  const handleSearchClose = () => {
    setIsSearchVisible(false);
    setSearchQuery('');
    // Return focus to search button
    if (searchButtonRef.current) {
      searchButtonRef.current.focus();
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // TODO: Implement search functionality
      console.log('Searching for:', searchQuery);
      // For now, just close the search
      handleSearchClose();
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleSearchClose();
    }
  };

  const handleClearSearch = () => {
    // Clear the search and close the search bar
    handleSearchClose();
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
            {/* Search section */}
            <div className="relative flex items-center">
              {/* Expandable search form */}
              <form 
                onSubmit={handleSearchSubmit}
                className={`flex items-center transition-all duration-300 ease-in-out ${
                  isSearchVisible 
                    ? 'w-[300px] opacity-100' 
                    : 'w-0 opacity-0 overflow-hidden'
                }`}
              >
                <div className="relative w-full">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                    placeholder={content.ui.navigation.searchPlaceholder}
                    className="w-full h-8 pl-3 pr-16 text-[var(--color-text-body)] bg-white border border-[var(--color-text-heading)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] focus:border-[var(--color-focus)] transition-colors duration-150"
                    aria-label="Search recipes"
                    style={{ 
                      fontFamily: 'var(--font-family-body)',
                      fontSize: 'var(--font-size-sm)'
                    }}
                  />
                  
                  {/* Clear button */}
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-8 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center hover:bg-[var(--color-hover-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] rounded transition-colors duration-150 group"
                    aria-label="Close search"
                  >
                    <X 
                      className="w-5 h-5 text-[var(--color-text-heading)] group-hover:text-[var(--color-primary)] transition-colors duration-150"
                    />
                  </button>
                  
                  {/* Search submit button */}
                  <button
                    type="submit"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 w-6 h-6 flex items-center justify-center hover:bg-[var(--color-hover-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] rounded transition-colors duration-150 group"
                    aria-label="Submit search"
                  >
                    <Search 
                      className="w-5 h-5 text-[var(--color-text-heading)] group-hover:text-[var(--color-primary)] transition-colors duration-150"
                    />
                  </button>
                </div>
              </form>
              
              {/* Search toggle button - only visible when search is closed */}
              {!isSearchVisible && (
                <button
                  ref={searchButtonRef}
                  onClick={handleSearchOpen}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[var(--color-hover-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] transition-colors duration-150 group"
                  aria-label="Open search"
                >
                  <Search 
                    className="w-5 h-5 text-[var(--color-text-heading)] group-hover:text-[var(--color-primary)] transition-colors duration-150"
                  />
                </button>
              )}
            </div>
            
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