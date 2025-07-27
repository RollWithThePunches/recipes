"use client";

import { useRef } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface FavoritesSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function FavoritesSearch({
  value,
  onChange,
  placeholder = "Search favorites...",
  className = "",
}: FavoritesSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onChange("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      inputRef.current?.blur();
    }
  };

  return (
    <div className={`relative flex items-center ${className}`}>
      <div className="relative w-full">
        <Input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full h-10 text-[var(--color-text-body)] bg-white border border-[var(--color-text-heading)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] focus:border-[var(--color-focus)] transition-colors duration-150 pr-16"
          aria-label="Search favorites"
          style={{
            fontFamily: "var(--font-family-body)",
            fontSize: "var(--font-size-sm)",
            paddingLeft: "var(--spacing-md)",
          }}
        />

        {/* Clear button */}
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center hover:bg-[var(--color-hover-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] rounded transition-colors duration-150 group"
            aria-label="Clear search"
          >
            <X className="w-5 h-5 text-[var(--color-text-heading)] group-hover:text-[var(--color-primary)] transition-colors duration-150" />
          </button>
        )}

        {/* Search icon */}
        <div className="absolute right-1 top-1/2 transform -translate-y-1/2 w-6 h-6 flex items-center justify-center">
          <Search className="w-5 h-5 text-[var(--color-text-heading)]" />
        </div>
      </div>
    </div>
  );
} 