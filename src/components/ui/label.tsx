import * as React from "react";

import { cn } from "@/lib/utils";

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "text-[var(--font-size-base)] font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[var(--color-text-body)]",
      className,
    )}
    {...props}
  />
));
Label.displayName = "Label";

export { Label };
