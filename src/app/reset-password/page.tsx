"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/toast-provider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function ResetPasswordPage() {
  const { showToast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form processing
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Show success toast
    showToast(
      "Your password has been reset successfully. You can now sign in with your new password.",
    );

    // Redirect to login page
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
      <div
        className="w-full max-w-md border border-[var(--color-text-heading)] rounded-lg bg-white flex flex-col gap-[var(--spacing-lg)] items-center"
        style={{ padding: "var(--spacing-xl)" }}
      >
        <h1
          className="font-semibold text-[var(--color-text-heading)] w-full text-left mb-[var(--spacing-md)]"
          style={{
            fontSize: "var(--font-size-3xl)",
            fontFamily: "var(--font-family-body)",
          }}
        >
          Reset your password
        </h1>
        <form
          className="flex flex-col gap-[var(--spacing-lg)] w-full"
          autoComplete="off"
          aria-label="Reset password form"
          onSubmit={handleSubmit}
        >
          {/* Username field */}
          <div className="flex flex-col gap-[var(--spacing-xs)] w-full">
            <Label htmlFor="username">Username*</Label>
            <Input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
            />
          </div>

          {/* New password field */}
          <div className="flex flex-col gap-[var(--spacing-xs)] w-full">
            <Label htmlFor="newPassword">New password*</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              autoComplete="new-password"
              required
            />
          </div>

          {/* Confirm new password field */}
          <div className="flex flex-col gap-[var(--spacing-xs)] w-full">
            <Label htmlFor="confirmNewPassword">Confirm new password*</Label>
            <Input
              id="confirmNewPassword"
              name="confirmNewPassword"
              type="password"
              autoComplete="new-password"
              required
            />
          </div>

          {/* Button container */}
          <div className="w-full flex gap-[var(--spacing-md)] justify-end">
            <Link href="/login">
              <Button
                type="button"
                variant="secondary"
                className="font-semibold text-[var(--font-size-base)] rounded-lg py-2 px-[var(--spacing-md)] hover:bg-[var(--color-hover-background)] focus:ring-2 focus:ring-[var(--color-focus)] transition-colors"
                style={{ width: "fit-content" }}
              >
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              className="bg-[var(--color-primary)] font-semibold text-[var(--font-size-base)] rounded-lg py-2 px-[var(--spacing-md)] hover:bg-[var(--color-secondary)] focus:ring-2 focus:ring-[var(--color-focus)] transition-colors"
              style={{
                color: "var(--color-text-on-dark)",
                width: "fit-content",
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Resetting password..." : "Reset password"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
