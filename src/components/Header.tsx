"use client";

import { useState, useRef, useEffect } from "react";
import { Menu, Search, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import contentData from "@/data/content.json";
import { ContentData } from "@/types/content";
import Drawer from "./Drawer";
import AccountMenu from "./AccountMenu";

const content = contentData as ContentData;

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const [firstName, setFirstName] = useState<string>("");

  // Focus management for search
  useEffect(() => {
    if (isSearchVisible && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchVisible]);

  // Check if user is logged in based on localStorage and current route
  useEffect(() => {
    // Check if user has logged in before (stored in localStorage)
    const hasLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedFirstName = localStorage.getItem("firstName") || "";
    
    // User is logged in if they have logged in before OR if they're on the account page
    if (hasLoggedIn || pathname === "/account") {
      setIsLoggedIn(true);
      setFirstName(storedFirstName);
      // Ensure localStorage is set to true
      localStorage.setItem("isLoggedIn", "true");
    } else {
      setIsLoggedIn(false);
      setFirstName("");
    }
  }, [pathname]);

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
    setSearchQuery("");
    // Return focus to search button
    if (searchButtonRef.current) {
      searchButtonRef.current.focus();
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // TODO: Implement search functionality
      console.log("Searching for:", searchQuery);
      // For now, just close the search
      handleSearchClose();
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleSearchClose();
    }
  };

  const handleClearSearch = () => {
    // Clear the search and close the search bar
    handleSearchClose();
  };

  const handleSignIn = () => {
    // Navigate to login page with current path as redirect parameter
    const currentPath = pathname === '/login' ? '/' : pathname;
    router.push(`/login?redirectTo=${encodeURIComponent(currentPath)}`);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setFirstName("");
    // Clear login state from localStorage
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("firstName");
    console.log("Sign out clicked - localStorage cleared");
    console.log("After sign out - isLoggedIn:", localStorage.getItem("isLoggedIn"));
    console.log("After sign out - userId:", localStorage.getItem("userId"));
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('localStorageChange'));
    
    // Don't redirect - user stays on current page
  };

  const handleAccountClick = () => {
    console.log("Account clicked");
    // Navigate to account page
    router.push("/account");
  };

  const handleSecurityClick = () => {
    console.log("Security clicked");
    // Navigate to security page (if it exists)
    // router.push("/security");
  };

  const handleMessagesClick = () => {
    console.log("Messages clicked");
    // Navigate to messages page (if it exists)
    // router.push("/messages");
  };

  return (
    <header
      className="relative w-full h-[60px] border-b border-solid bg-[var(--color-background)] border-[var(--color-gray)]"
      role="banner"
    >
      <div className="flex flex-row items-center h-full">
        <div className="flex flex-row items-center justify-between w-full h-full px-[var(--spacing-xl)]">
          {/* Left section with hamburger and brand */}
          <div className="flex flex-row items-center gap-[var(--spacing-lg)]">
            {/* Hamburger menu button */}
            <button
              className="w-6 h-6 shrink-0 flex items-center justify-center hover:bg-[var(--color-hover-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] rounded transition-colors duration-150 group"
              aria-label="Open navigation menu"
              aria-expanded={isDrawerOpen}
              onClick={handleDrawerToggle}
            >
              <Menu className="w-6 h-6 text-[var(--color-text-heading)] group-hover:text-[var(--color-primary)] transition-colors duration-150" />
            </button>

            {/* Brand name */}
            <h1
              className="text-[32px] text-[var(--color-primary)] leading-none"
              style={{
                fontFamily: "var(--font-family-heading)",
                fontSize: "var(--font-size-3xl)",
              }}
            >
              {content.ui.navigation.brand}
            </h1>
          </div>

          {/* Right section with search and profile */}
          <div className="flex flex-row items-center gap-[var(--spacing-lg)]">
            {/* Search section */}
            <div className="relative flex items-center">
              {/* Expandable search form */}
              <form
                onSubmit={handleSearchSubmit}
                className={`flex items-center transition-all duration-300 ease-in-out ${
                  isSearchVisible
                    ? "w-[300px] opacity-100"
                    : "w-0 opacity-0 overflow-hidden"
                }`}
                style={{
                  visibility: isSearchVisible ? "visible" : "hidden",
                }}
              >
                <div className="relative w-full">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                    placeholder={content.ui.navigation.searchPlaceholder}
                    className="w-full h-8 text-[var(--color-text-body)] bg-white border border-[var(--color-text-heading)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] focus:border-[var(--color-focus)] transition-colors duration-150"
                    aria-label="Search recipes"
                    tabIndex={isSearchVisible ? 0 : -1}
                    style={{
                      fontFamily: "var(--font-family-body)",
                      fontSize: "var(--font-size-sm)",
                      paddingLeft: "var(--spacing-md)",
                      paddingRight: "var(--spacing-xl)",
                    }}
                  />

                  {/* Clear button */}
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-8 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center hover:bg-[var(--color-hover-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] rounded transition-colors duration-150 group"
                    aria-label="Close search"
                    tabIndex={isSearchVisible ? 0 : -1}
                  >
                    <X className="w-5 h-5 text-[var(--color-text-heading)] group-hover:text-[var(--color-primary)] transition-colors duration-150" />
                  </button>

                  {/* Search submit button */}
                  <button
                    type="submit"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 w-6 h-6 flex items-center justify-center hover:bg-[var(--color-hover-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] rounded transition-colors duration-150 group"
                    aria-label="Submit search"
                    tabIndex={isSearchVisible ? 0 : -1}
                  >
                    <Search className="w-5 h-5 text-[var(--color-text-heading)] group-hover:text-[var(--color-primary)] transition-colors duration-150" />
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
                  <Search className="w-5 h-5 text-[var(--color-text-heading)] group-hover:text-[var(--color-primary)] transition-colors duration-150" />
                </button>
              )}
            </div>

            {/* Account Menu */}
                    <AccountMenu
          isLoggedIn={isLoggedIn}
          username={firstName}
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
      <Drawer isOpen={isDrawerOpen} onClose={handleDrawerClose} currentPath={pathname} />
    </header>
  );
}
