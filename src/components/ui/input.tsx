import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-lg border border-[var(--color-text-heading)] bg-[var(--color-background)] px-3 py-2 text-[var(--font-size-base)] ring-offset-[var(--color-background)] file:border-0 file:bg-transparent file:text-[var(--font-size-sm)] file:font-medium placeholder:text-[var(--color-text-body)] placeholder:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
