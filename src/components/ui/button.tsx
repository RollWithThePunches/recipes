import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-primary)] border border-[var(--color-primary)] text-[var(--color-text-on-dark)] shadow-xs transition-colors duration-[150ms] hover:bg-[var(--color-hover-background)] hover:border-[var(--color-hover-background)] hover:text-[var(--color-text-heading)]",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground border-[var(--card-border)] hover:bg-[var(--color-hover-background)] hover:text-[var(--color-text-heading)]",
        secondary:
          "bg-[var(--color-background)] border border-[var(--color-secondary)] text-[var(--color-secondary)] shadow-xs hover:bg-[var(--color-hover-background)] hover:text-[var(--color-text-heading)] transition-colors duration-[150ms]",
        tertiary:
          "bg-transparent border border-transparent text-[var(--color-text-heading)] hover:bg-[var(--color-hover-background)] hover:text-[var(--color-text-heading)] transition-colors duration-[150ms]",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 hover:bg-[var(--color-hover-background)] hover:text-[var(--color-text-heading)]",
        link: "text-[var(--color-link)] underline-offset-4 hover:underline hover:text-[var(--color-link-hover)] transition-colors duration-[150ms]",
      },
      size: {
        default:
          "h-10 gap-[var(--spacing-sm)] px-[var(--spacing-lg)] py-[var(--spacing-sm)] has-[>svg]:px-[var(--spacing-md)]",
        sm: "h-8 text-xs rounded-md gap-[var(--spacing-xs)] px-[var(--spacing-md)] has-[>svg]:px-[var(--spacing-sm)]",
        lg: "h-12 text-base rounded-md gap-[var(--spacing-md)] px-[var(--spacing-xl)] has-[>svg]:px-[var(--spacing-lg)]",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      style={{
        fontSize: size === "default" ? "var(--font-size-base)" : undefined,
      }}
      {...props}
    />
  );
}

export { Button, buttonVariants };
