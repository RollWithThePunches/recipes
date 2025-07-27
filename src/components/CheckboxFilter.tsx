"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface FilterOption {
  id: string;
  label: string;
  value: string;
}

interface CheckboxFilterProps {
  title: string;
  options: FilterOption[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
  placeholder?: string;
  className?: string;
}

export default function CheckboxFilter({
  title,
  options,
  selectedValues,
  onSelectionChange,
  placeholder = "Select options",
  className = "",
}: CheckboxFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const firstCheckboxRef = useRef<HTMLButtonElement>(null);

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
            prev < options.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          setFocusedIndex(prev => 
            prev > 0 ? prev - 1 : options.length - 1
          );
          break;
        case "Enter":
        case " ":
          if (focusedIndex >= 0 && focusedIndex < options.length) {
            event.preventDefault();
            const option = options[focusedIndex];
            const isCurrentlyChecked = selectedValues.includes(option.value);
            handleCheckboxChange(option.value, !isCurrentlyChecked);
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, focusedIndex, options, selectedValues]);

  // Focus first checkbox when menu opens
  useEffect(() => {
    if (isOpen && options.length > 0) {
      setFocusedIndex(0);
      // Focus will be handled by the checkbox ref
    } else if (!isOpen) {
      setFocusedIndex(-1);
    }
  }, [isOpen, options.length]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (value: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedValues, value]);
    } else {
      onSelectionChange(selectedValues.filter(v => v !== value));
    }
  };

  const getDisplayText = () => {
    if (selectedValues.length === 0) {
      return placeholder;
    }
    if (selectedValues.length === 1) {
      const option = options.find(opt => opt.value === selectedValues[0]);
      return option?.label || selectedValues[0];
    }
    return `${selectedValues.length} selected`;
  };

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      {/* Label */}
      <label className="font-semibold relative text-[var(--font-size-md)] text-left w-full block mb-[var(--spacing-sm)]"
      style={{
        fontFamily: "var(--font-family-body)",
        fontSize: "var(--font-size-base)",
        color: "var(--color-text-heading)"
      }}
      >
        {title}
      </label>

      {/* Dropdown Trigger */}
      <Button
        variant="outline"
        onClick={handleToggle}
        className="h-10 w-full bg-[var(--color-background)] border border-[var(--color-gray)] text-[var(--color-text-heading)] hover:bg-[var(--color-hover-background)] justify-between px-3 py-1"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`${title} filter dropdown`}
      >
        <span className="font-['Lexend:Regular',_sans-serif] font-normal text-[var(--font-size-md)]">
          {getDisplayText()}
        </span>
        {isOpen ? (
          <ChevronUp className="w-6 h-6 text-[var(--color-text-heading)]" />
        ) : (
          <ChevronDown className="w-6 h-6 text-[var(--color-text-heading)]" />
        )}
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className="absolute top-full left-0 right-0 bg-[var(--color-background)] border border-[var(--color-gray)] rounded-bl-lg rounded-br-lg shadow-lg z-50 max-h-60 overflow-y-auto py-[var(--spacing-lg)] px-[var(--spacing-sm)]"
          role="menu"
          aria-label={`${title} options`}
        >
          <div className="flex flex-col items-start justify-start p-0 relative w-full">
            {options.map((option, index) => (
              <div
                key={option.id}
                className={`flex flex-row items-center justify-start p-0 relative w-full hover:bg-[var(--color-hover-background)] transition-colors duration-150 pl-[var(--spacing-sm)] gap-[var(--spacing-sm)] rounded-[var(--radius-sm)] ${
                  focusedIndex === index ? 'bg-[var(--color-hover-background)]' : ''
                }`}
                role="menuitem"
                tabIndex={focusedIndex === index ? 0 : -1}
                onFocus={() => setFocusedIndex(index)}
              >
                <div className="flex items-center justify-center p-1">
                  <Checkbox
                    id={option.id}
                    checked={selectedValues.includes(option.value)}
                    onCheckedChange={(checked) => handleCheckboxChange(option.value, checked as boolean)}
                    className="h-[18px] w-[18px] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] focus:ring-offset-1"
                    ref={index === 0 ? firstCheckboxRef : undefined}
                    aria-checked={selectedValues.includes(option.value)}
                  />
                </div>
                <label
                  htmlFor={option.id}
                  className="relative text-left cursor-pointer py-2 flex-1 h-12 flex items-center"
                  style={{ 
                    fontFamily: "var(--font-family-body)",
                    fontSize: "var(--font-size-base)",
                    color: "var(--color-text-heading)"
                  }}
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 