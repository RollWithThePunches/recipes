"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import Link from "@/components/ui/link";
import Text from "@/components/ui/text";
import { useRouter, usePathname } from "next/navigation";

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FavoritesModal({ isOpen, onClose }: FavoritesModalProps) {
  const router = useRouter();
  const pathname = usePathname();

  console.log('FavoritesModal render:', { isOpen, pathname });

  if (!isOpen) return null;

  const handleSignIn = () => {
    onClose();
    // Route to login page with current page as redirect
    router.push(`/login?redirectTo=${encodeURIComponent(pathname)}`);
  };



  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black"
        style={{ opacity: 0.5 }}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div 
        className="relative bg-[var(--color-background)] rounded-lg shadow-lg w-full mx-4"
        style={{ maxWidth: "320px" }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        {/* Header with close button */}
        <div className="flex justify-end p-[var(--spacing-xl)]" style={{ paddingBottom: "var(--spacing-md)" }}>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            onKeyDown={(e) => handleKeyDown(e, onClose)}
            aria-label="Close modal"
            className="hover:bg-[var(--color-hover-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] transition-colors"
          >
            <X className="w-6 h-6 text-[var(--color-text-heading)]" />
          </Button>
        </div>

        {/* Body */}
        <div className="flex flex-col items-center gap-[var(--spacing-xl)] px-[var(--spacing-xl)] pb-[var(--spacing-xl)]">
          {/* Title and Sign In Button */}
          <div className="flex flex-col items-center gap-[var(--spacing-lg)] w-full">
            <Heading as="h2" size="base" font="body" id="modal-title" className="font-semibold text-center">
              Sign in to add to Favorites
            </Heading>
            
            <Button
              onClick={handleSignIn}
              onKeyDown={(e) => handleKeyDown(e, handleSignIn)}
              className="bg-[var(--color-primary)] font-semibold rounded-lg py-2 px-[var(--spacing-lg)] hover:bg-[var(--color-secondary)] focus:ring-2 focus:ring-[var(--color-focus)] transition-colors"
              style={{
                color: "var(--color-text-on-dark)",
                width: "fit-content",
                fontSize: "var(--font-size-base)",
              }}
            >
              Sign in
            </Button>
          </div>

          {/* Create Account Section */}
          <div className="flex flex-col items-center gap-[var(--spacing-sm)] text-[var(--font-size-base)] text-center">
            <Text color="body">
              Don&apos;t have an account?
            </Text>
            <Link
              href={`/create-account?redirectTo=${encodeURIComponent(pathname)}`}
              variant="secondary"
              underline
              className="focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] rounded"
              id="modal-description"
            >
              Create one to get started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 