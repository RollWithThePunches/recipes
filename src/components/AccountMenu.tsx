"use client";

import { useState, useRef, useEffect } from 'react';
import { User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import contentData from '@/data/content.json';
import { ContentData } from '@/types/content';

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
  const signInButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuItemRef = useRef<HTMLDivElement>(null);
  const signOutButtonRef = useRef<HTMLButtonElement>(null);
  const avatarButtonRef = useRef<HTMLButtonElement>(null);

  // Focus management when menu opens
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure the element is rendered
      setTimeout(() => {
        if (isLoggedIn && firstMenuItemRef.current) {
          firstMenuItemRef.current.focus();
        } else if (!isLoggedIn && signInButtonRef.current) {
          signInButtonRef.current.focus();
        }
      }, 100);
    }
  }, [isOpen, isLoggedIn]);

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

  const handleFirstItemKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab' && e.shiftKey) {
      e.preventDefault();
      setIsOpen(false);
      setTimeout(() => {
        avatarButtonRef.current?.focus();
      }, 100);
    }
  };

  const handleLastItemKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      setIsOpen(false);
      setTimeout(() => {
        avatarButtonRef.current?.focus();
      }, 100);
    }
  };

  const handleSingleItemKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      setIsOpen(false);
      setTimeout(() => {
        avatarButtonRef.current?.focus();
      }, 100);
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          ref={avatarButtonRef}
          variant="ghost"
          size="icon"
          className="relative w-6 h-6 rounded-full p-0 bg-[var(--color-background)] border-2 border-[var(--color-text-heading)] hover:bg-[var(--color-hover-background)] hover:border-[var(--color-primary)] focus:bg-[var(--color-hover-background)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-focus)] transition-colors duration-150 group"
          aria-label="User account menu"
        >
          <User 
            className="w-4 h-4 text-[var(--color-text-heading)] group-hover:text-[var(--color-primary)] transition-colors duration-150" 
            strokeWidth={3}
          />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent
        className="w-64 bg-[var(--color-background)] rounded-none rounded-b-lg shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border-0 p-0"
        align="end"
        sideOffset={17}
      >
        {!isLoggedIn ? (
          // Logged out state
          <div 
            className="space-y-6"
            style={{ 
              padding: 'var(--spacing-md)',
              gap: 'var(--spacing-lg)'
            }}
          >
            <div 
              className="font-semibold text-[var(--color-text-heading)] leading-none"
              style={{ 
                fontFamily: 'var(--font-family-body)',
                fontSize: 'var(--font-size-md)'
              }}
            >
              {content.ui.accountMenu.loginPrompt}
            </div>
            <Button
              ref={signInButtonRef}
              variant="default"
              size="default"
              className="w-full"
              style={{ fontFamily: 'var(--font-family-body)' }}
              onClick={handleSignIn}
              onKeyDown={handleSingleItemKeyDown}
            >
              {content.ui.buttons.signIn}
            </Button>
          </div>
        ) : (
          // Logged in state
          <div 
            className="space-y-6"
            style={{ 
              padding: 'var(--spacing-md)',
              gap: 'var(--spacing-lg)'
            }}
          >
            <div 
              className="font-semibold text-[var(--color-text-heading)] leading-none"
              style={{ 
                fontFamily: 'var(--font-family-body)',
                fontSize: 'var(--font-size-md)'
              }}
            >
              {username || '<Username>'}
            </div>
            
            <div 
              className="space-y-1"
              style={{ 
                gap: 'var(--spacing-xs)'
              }}
            >
              <DropdownMenuItem 
                ref={firstMenuItemRef}
                className="text-[var(--color-text-heading)] hover:bg-[var(--color-hover-background)] focus:bg-[var(--color-hover-background)] cursor-pointer"
                style={{ 
                  fontFamily: 'var(--font-family-body)',
                  fontSize: 'var(--font-size-md)'
                }}
                onClick={() => handleMenuItemClick(onAccountClick)}
                onKeyDown={handleFirstItemKeyDown}
              >
                {content.ui.accountMenu.menuItems.account}
              </DropdownMenuItem>
              
              <DropdownMenuItem 
                className="text-[var(--color-text-heading)] hover:bg-[var(--color-hover-background)] focus:bg-[var(--color-hover-background)] cursor-pointer"
                style={{ 
                  fontFamily: 'var(--font-family-body)',
                  fontSize: 'var(--font-size-md)'
                }}
                onClick={() => handleMenuItemClick(onSecurityClick)}
              >
                {content.ui.accountMenu.menuItems.security}
              </DropdownMenuItem>
              
              <DropdownMenuItem 
                className="text-[var(--color-text-heading)] hover:bg-[var(--color-hover-background)] focus:bg-[var(--color-hover-background)] cursor-pointer"
                style={{ 
                  fontFamily: 'var(--font-family-body)',
                  fontSize: 'var(--font-size-md)'
                }}
                onClick={() => handleMenuItemClick(onMessagesClick)}
                onKeyDown={(e) => {
                  // Handle keyboard on Messages (last menu item before Sign Out button)
                  if (e.key === 'Tab' && !e.shiftKey) {
                    // Let it naturally tab to Sign Out button
                    return;
                  }
                }}
              >
                {content.ui.accountMenu.menuItems.messages}
              </DropdownMenuItem>
            </div>
            
            <Button
              ref={signOutButtonRef}
              variant="default"
              size="default"
              className="w-full"
              style={{ fontFamily: 'var(--font-family-body)' }}
              onClick={handleSignOut}
              onKeyDown={handleLastItemKeyDown}
            >
              {content.ui.buttons.signOut}
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 