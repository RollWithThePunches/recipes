import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ToastProps {
  message: string;
  onClose: () => void;
  className?: string;
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ message, onClose, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-[var(--color-background-yellow)] relative rounded-lg border-2 border-[var(--color-secondary)] border-solid flex flex-row items-center p-[var(--spacing-xl)] gap-[var(--spacing-xl)]",
          className,
        )}
        role="alert"
        aria-live="polite"
      >
        <div className="font-[var(--font-family-body)] font-normal text-[var(--color-text-body)] text-[var(--font-size-base)] leading-[var(--line-height-normal)] flex-1">
          {message}
        </div>
        <button
          onClick={onClose}
          className="relative shrink-0 w-6 h-6 flex items-center justify-center text-[var(--color-text-body)] hover:text-[var(--color-primary)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] rounded"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  },
);

Toast.displayName = "Toast";

export { Toast };
