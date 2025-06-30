"use client";

import { Home } from "lucide-react";
import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrentPage?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  showHomeIcon?: boolean;
  className?: string;
}

export default function Breadcrumb({ 
  items, 
  showHomeIcon = true, 
  className = "" 
}: BreadcrumbProps) {
  return (
    <nav 
      aria-label="Breadcrumb navigation" 
      className={`flex items-center gap-[var(--spacing-xs)] text-sm ${className}`}
    >
      <ul className="flex items-center gap-[var(--spacing-xs)] list-none">
        {showHomeIcon && (
          <li className="flex items-center">
            <Link 
              href="/"
              className="flex items-center text-[var(--color-secondary)] hover:text-[var(--color-link-hover)] transition-colors duration-[var(--transition-fast)]"
              aria-label="Home"
            >
              <Home className="w-4 h-4" />
            </Link>
            {items.length > 0 && (
              <span className="mx-[var(--spacing-sm)] text-[var(--color-text-body)] font-normal">/</span>
            )}
          </li>
        )}
        
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isCurrent = item.isCurrentPage || isLast;
          
          return (
            <li key={index} className="flex items-center">
              {item.href && !isCurrent ? (
                <Link
                  href={item.href}
                  className="text-[var(--color-secondary)] hover:text-[var(--color-link-hover)] transition-colors duration-[var(--transition-fast)] font-medium"
                >
                  {item.label}
                </Link>
              ) : (
                <span 
                  className={`${
                    isCurrent 
                      ? "text-[var(--color-text-body)] font-semibold" 
                      : "text-[var(--color-secondary)] font-medium"
                  }`}
                  aria-current={isCurrent ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
              
              {!isLast && (
                <span className="mx-[var(--spacing-sm)] text-[var(--color-text-body)] font-normal">/</span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// Utility function to create breadcrumb items from a path
export function createBreadcrumbsFromPath(
  pathname: string,
  labelMap?: Record<string, string>
): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(segment => segment !== '');
  
  return segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const label = labelMap?.[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
    
    return {
      label,
      href,
      isCurrentPage: index === segments.length - 1
    };
  });
} 