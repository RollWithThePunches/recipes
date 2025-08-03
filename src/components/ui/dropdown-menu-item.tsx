"use client";

import { ReactNode } from "react";

interface DropdownMenuItemProps {
  id: string;
  label: string;
  isSelected?: boolean;
  onToggle?: (checked: boolean) => void;
  onClick?: () => void;
  children?: ReactNode;
  variant?: "checkbox" | "menu";
}

export default function DropdownMenuItem({
  id,
  label,
  isSelected = false,
  onToggle,
  onClick,
  children,
  variant = "checkbox",
}: DropdownMenuItemProps) {
  if (variant === "checkbox") {
    return (
      <>
        <div className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <input
            type="checkbox"
            id={id}
            checked={isSelected}
            onChange={(e) => onToggle?.(e.target.checked)}
            className="h-4 w-4 focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] focus:ring-offset-1"
            aria-checked={isSelected}
          />
        </div>
        <span className="flex-1 text-sm">
          {children || label}
        </span>
      </>
    );
  }

  // Menu variant
  return (
    <div 
      className="flex-1 cursor-pointer text-sm"
      onClick={onClick}
      role="menuitem"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {children || label}
    </div>
  );
} 