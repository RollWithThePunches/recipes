"use client";

import { useState, useRef, useEffect } from "react";
import { User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import contentData from "@/data/content.json";
import { ContentData } from "@/types/content";

const content = contentData as ContentData;

interface AccountMenuProps {
  isLoggedIn?: boolean;
  username?: string;
  onSignIn?: () => void;
  onSignOut?: () => void;
  onAccountClick?: () => void;
  onSecurityClick?: () => void;
  onMessagesClick?: () => void;
}

export default function AccountMenu({
  isLoggedIn = false,
  username,
  onSignIn,
  onSignOut,
  onAccountClick,
  onSecurityClick,
  onMessagesClick,
}: AccountMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isKeyboardNavigation, setIsKeyboardNavigation] = useState(false);
  const signInButtonRef = useRef<HTMLButtonElement>(null);
  const accountItemRef = useRef<HTMLDivElement>(null);
  const securityItemRef = useRef<HTMLDivElement>(null);
  const messagesItemRef = useRef<HTMLDivElement>(null);
  const signOutButtonRef = useRef<HTMLButtonElement>(null);
  const avatarButtonRef = useRef<HTMLButtonElement>(null);

  // Focus management when menu opens
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure the element is rendered
      setTimeout(() => {
        if (isLoggedIn && accountItemRef.current) {
          accountItemRef.current.focus();
        } else if (!isLoggedIn && signInButtonRef.current) {
          signInButtonRef.current.focus();
        }
      }, 100);
    }
  }, [isOpen, isLoggedIn]);

  // Reset keyboard navigation state when menu closes
  useEffect(() => {
    if (!isOpen) {
      setIsKeyboardNavigation(false);
    }
  }, [isOpen]);

  const handleSignIn = () => {
    setIsOpen(false);
    onSignIn?.();
  };

  const handleSignOut = () => {
    setIsOpen(false);
    onSignOut?.();
  };

  const handleMenuItemClick = (action?: () => void) => {
    setIsOpen(false);
    action?.();
  };

  // Track when mouse interaction happens
  const handleMouseEnter = () => {
    setIsKeyboardNavigation(false);
  };

  // Handle keyboard navigation for the entire dropdown content
  const handleContentKeyDown = (e: React.KeyboardEvent) => {
    setIsKeyboardNavigation(true);

    if (e.key === "Escape") {
      setIsOpen(false);
      setTimeout(() => {
        avatarButtonRef.current?.focus();
      }, 100);
      return;
    }

    // Handle Tab navigation manually within the dropdown
    if (e.key === "Tab") {
      const currentElement = e.target as HTMLElement;

      if (!e.shiftKey) {
        // Forward Tab navigation
        if (currentElement === accountItemRef.current) {
          e.preventDefault();
          securityItemRef.current?.focus();
        } else if (currentElement === securityItemRef.current) {
          e.preventDefault();
          messagesItemRef.current?.focus();
        } else if (currentElement === messagesItemRef.current) {
          e.preventDefault();
          signOutButtonRef.current?.focus();
        } else if (currentElement === signOutButtonRef.current) {
          e.preventDefault();
          setIsOpen(false);
          setTimeout(() => {
            avatarButtonRef.current?.focus();
          }, 100);
        } else if (currentElement === signInButtonRef.current) {
          e.preventDefault();
          setIsOpen(false);
          setTimeout(() => {
            avatarButtonRef.current?.focus();
          }, 100);
        }
      } else {
        // Backward Tab navigation (Shift+Tab)
        if (currentElement === signOutButtonRef.current) {
          e.preventDefault();
          messagesItemRef.current?.focus();
        } else if (currentElement === messagesItemRef.current) {
          e.preventDefault();
          securityItemRef.current?.focus();
        } else if (currentElement === securityItemRef.current) {
          e.preventDefault();
          accountItemRef.current?.focus();
        } else if (currentElement === accountItemRef.current) {
          e.preventDefault();
          setIsOpen(false);
          setTimeout(() => {
            avatarButtonRef.current?.focus();
          }, 100);
        } else if (currentElement === signInButtonRef.current) {
          e.preventDefault();
          setIsOpen(false);
          setTimeout(() => {
            avatarButtonRef.current?.focus();
          }, 100);
        }
      }
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          ref={avatarButtonRef}
          variant="ghost"
          size="icon"
          className={`relative w-6 h-6 rounded-full p-0 border-2 focus:ring-2 focus:ring-[var(--color-focus)] transition-colors duration-150 group ${
            isLoggedIn
              ? "bg-[var(--color-primary)] border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] focus:bg-[var(--color-primary)] focus:border-[var(--color-primary)]"
              : "bg-[var(--color-background)] border-[var(--color-text-heading)] hover:bg-[var(--color-hover-background)] hover:border-[var(--color-primary)] focus:bg-[var(--color-hover-background)] focus:border-[var(--color-primary)]"
          }`}
          aria-label="User account menu"
        >
          <User
            className={`w-4 h-4 transition-colors duration-150 ${
              isLoggedIn
                ? "text-white group-hover:text-white"
                : "text-[var(--color-text-heading)] group-hover:text-[var(--color-primary)]"
            }`}
            strokeWidth={3}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-64 bg-[var(--color-background)] rounded-none rounded-b-lg shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border-0 p-0 data-[state=open]:animate-none data-[state=closed]:animate-none data-[side=bottom]:animate-none data-[side=left]:animate-none data-[side=right]:animate-none data-[side=top]:animate-none"
        align="end"
        sideOffset={17}
        onKeyDown={handleContentKeyDown}
      >
        {!isLoggedIn ? (
          // Logged out state
          <div
            className="space-y-6"
            style={{
              padding: "var(--spacing-md)",
              gap: "var(--spacing-lg)",
            }}
          >
            <div
              className="font-semibold text-[var(--color-text-heading)] leading-none"
              style={{
                fontFamily: "var(--font-family-body)",
                fontSize: "var(--font-size-md)",
              }}
            >
              {content.ui.accountMenu.loginPrompt}
            </div>
            <Button
              ref={signInButtonRef}
              variant="default"
              size="default"
              className="w-full"
              style={{ fontFamily: "var(--font-family-body)" }}
              onClick={handleSignIn}
              onMouseEnter={handleMouseEnter}
            >
              {content.ui.buttons.signIn}
            </Button>
          </div>
        ) : (
          // Logged in state
          <div
            className="space-y-6"
            style={{
              padding: "var(--spacing-md)",
              gap: "var(--spacing-lg)",
            }}
          >
            <div
              className="font-semibold text-[var(--color-text-heading)] leading-none"
              style={{
                fontFamily: "var(--font-family-body)",
                fontSize: "var(--font-size-md)",
              }}
            >
              {username || "<Username>"}
            </div>

            <div
              className="space-y-1"
              style={{
                gap: "var(--spacing-xs)",
              }}
            >
              <DropdownMenuItem
                ref={accountItemRef}
                className={`text-[var(--color-text-heading)] hover:bg-[var(--color-hover-background)] hover:text-[var(--color-text-heading)] focus:bg-[var(--color-hover-background)] focus:text-[var(--color-text-heading)] focus:outline-none cursor-pointer transition-colors duration-150 ${
                  isKeyboardNavigation
                    ? "focus:ring-2 focus:ring-[var(--color-focus)]"
                    : ""
                }`}
                style={{
                  fontFamily: "var(--font-family-body)",
                  fontSize: "var(--font-size-md)",
                }}
                onClick={() => handleMenuItemClick(onAccountClick)}
                onMouseEnter={handleMouseEnter}
              >
                {content.ui.accountMenu.menuItems.account}
              </DropdownMenuItem>

              <DropdownMenuItem
                ref={securityItemRef}
                className={`text-[var(--color-text-heading)] hover:bg-[var(--color-hover-background)] hover:text-[var(--color-text-heading)] focus:bg-[var(--color-hover-background)] focus:text-[var(--color-text-heading)] focus:outline-none cursor-pointer transition-colors duration-150 ${
                  isKeyboardNavigation
                    ? "focus:ring-2 focus:ring-[var(--color-focus)]"
                    : ""
                }`}
                style={{
                  fontFamily: "var(--font-family-body)",
                  fontSize: "var(--font-size-md)",
                }}
                onClick={() => handleMenuItemClick(onSecurityClick)}
                onMouseEnter={handleMouseEnter}
              >
                {content.ui.accountMenu.menuItems.security}
              </DropdownMenuItem>

              <DropdownMenuItem
                ref={messagesItemRef}
                className={`text-[var(--color-text-heading)] hover:bg-[var(--color-hover-background)] hover:text-[var(--color-text-heading)] focus:bg-[var(--color-hover-background)] focus:text-[var(--color-text-heading)] focus:outline-none cursor-pointer transition-colors duration-150 ${
                  isKeyboardNavigation
                    ? "focus:ring-2 focus:ring-[var(--color-focus)]"
                    : ""
                }`}
                style={{
                  fontFamily: "var(--font-family-body)",
                  fontSize: "var(--font-size-md)",
                }}
                onClick={() => handleMenuItemClick(onMessagesClick)}
                onMouseEnter={handleMouseEnter}
              >
                {content.ui.accountMenu.menuItems.messages}
              </DropdownMenuItem>
            </div>

            <Button
              ref={signOutButtonRef}
              variant="default"
              size="default"
              className="w-full"
              style={{ fontFamily: "var(--font-family-body)" }}
              onClick={handleSignOut}
              onMouseEnter={handleMouseEnter}
            >
              {content.ui.buttons.signOut}
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
