"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DropdownItem {
  id: string;
  label: string;
  value: string;
}

interface DropdownProps {
  title?: string;
  items: DropdownItem[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
  placeholder?: string;
  className?: string;
  renderItem?: (item: DropdownItem, index: number) => ReactNode;
  required?: boolean;
  closeOnSelection?: boolean;
}

export default function Dropdown({
  title,
  items,
  selectedValues,
  onSelectionChange,
  placeholder = "Select options",
  className = "",
  renderItem,
  required,
  closeOnSelection = false,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const firstItemRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case "Escape":
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
        case "Tab":
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
        case "ArrowDown":
          event.preventDefault();
          setFocusedIndex(prev => 
            prev < items.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          setFocusedIndex(prev => 
            prev > 0 ? prev - 1 : items.length - 1
          );
          break;
        case "Enter":
        case " ":
          if (focusedIndex >= 0 && focusedIndex < items.length) {
            event.preventDefault();
            const item = items[focusedIndex];
            
            // For single-select dropdowns (closeOnSelection = true), directly call onSelectionChange
            if (closeOnSelection) {
              onSelectionChange([item.value]);
              setIsOpen(false);
              setFocusedIndex(-1);
            } else {
              // For multi-select dropdowns, toggle the item
              const isCurrentlySelected = selectedValues.includes(item.value);
              handleItemToggle(item.value, !isCurrentlySelected);
            }
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, focusedIndex, items, selectedValues]);

  // Focus first item when menu opens
  useEffect(() => {
    if (isOpen && items.length > 0) {
      setFocusedIndex(0);
    } else if (!isOpen) {
      setFocusedIndex(-1);
    }
  }, [isOpen, items.length]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleItemToggle = (value: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedValues, value]);
    } else {
      onSelectionChange(selectedValues.filter(v => v !== value));
    }
    // Close dropdown after selection
    setIsOpen(false);
    setFocusedIndex(-1);
  };

  const getDisplayText = () => {
    if (selectedValues.length === 0) {
      return placeholder;
    }
    if (selectedValues.length === 1) {
      const item = items.find(item => item.value === selectedValues[0]);
      return item?.label || selectedValues[0];
    }
    return `${selectedValues.length} selected`;
  };



  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      {/* Label */}
      {title && (
        <label className="font-semibold relative text-[var(--font-size-md)] text-left w-full block mb-[var(--spacing-sm)]"
        style={{
          fontFamily: "var(--font-family-body)",
          fontSize: "var(--font-size-base)",
          color: "var(--color-text-heading)"
        }}
        >
          {title}
        </label>
      )}

      {/* Dropdown Trigger */}
      <Button
        variant="outline"
        onClick={handleToggle}
        className="flex h-10 w-full items-center justify-between rounded-md bg-[var(--color-background)] px-3 py-2 text-[var(--color-text-heading)] placeholder:text-[var(--color-text-body)] hover:bg-[var(--color-hover-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] focus:ring-offset-2"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`${title} dropdown`}
        aria-required={required}
      >
        <span className="line-clamp-1">
          {getDisplayText()}
        </span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 opacity-50" />
        ) : (
          <ChevronDown className="h-4 w-4 opacity-50" />
        )}
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className="absolute top-full left-0 right-0 z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-[var(--color-gray)] bg-[var(--color-background)] text-[var(--color-text-heading)] shadow-md"
          role="listbox"
          aria-label={`${title} options`}
        >
          <div className="p-1">
            {items.map((item, index) => (
              <div
                key={item.id}
                data-item-index={index}
                className={`relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pr-2 text-sm outline-none hover:bg-[var(--color-hover-background)] focus:bg-[var(--color-hover-background)] focus:text-[var(--color-text-heading)] ${
                  focusedIndex === index ? 'bg-[var(--color-hover-background)]' : ''
                } ${closeOnSelection ? 'pl-2' : 'pl-8'}`}
                role="option"
                aria-selected={selectedValues.includes(item.value)}
                tabIndex={focusedIndex === index ? 0 : -1}
                onFocus={() => setFocusedIndex(index)}
                onClick={() => {
                  if (closeOnSelection) {
                    setTimeout(() => {
                      setIsOpen(false);
                      setFocusedIndex(-1);
                    }, 0);
                  }
                }}
                ref={index === 0 ? firstItemRef : undefined}
              >
                {renderItem ? (
                  renderItem(item, index)
                ) : (
                  <span className="flex-1">{item.label}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 