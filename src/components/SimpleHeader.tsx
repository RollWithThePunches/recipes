"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import contentData from "@/data/content.json";
import { ContentData } from "@/types/content";
import AccountMenu from "./AccountMenu";

const content = contentData as ContentData;

export default function SimpleHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState<string>("");

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
          {/* Left section with brand */}
          <div className="flex flex-row items-center">
            {/* Brand name */}
            <Link
              href="/"
              className="text-[32px] text-[var(--color-primary)] leading-none hover:text-[var(--color-primary)] transition-colors duration-150"
              style={{
                fontFamily: "var(--font-family-heading)",
                fontSize: "var(--font-size-3xl)",
              }}
            >
              {content.ui.navigation.brand}
            </Link>
          </div>

          {/* Right section with profile */}
          <div className="flex flex-row items-center">
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
    </header>
  );
} 