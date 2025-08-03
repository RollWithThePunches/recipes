"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/toast-provider";
import Heading from "@/components/ui/heading";
import Link from "@/components/ui/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function ResetPasswordForm() {
  const { showToast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get the redirect URL from query parameters
  const redirectTo = searchParams.get('redirectTo') || '/account';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const resetData = {
      username: formData.get('username') as string,
      currentPassword: formData.get('currentPassword') as string,
      newPassword: formData.get('newPassword') as string,
      confirmNewPassword: formData.get('confirmNewPassword') as string,
    };

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resetData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to reset password');
      }

      // Show success toast
      showToast("Your password has been reset successfully. You can now sign in with your new password.");

      // Redirect to login page with the original redirect parameter
      router.push(`/login?redirectTo=${encodeURIComponent(redirectTo)}`);
    } catch (error) {
      console.error('Password reset error:', error);
      showToast(error instanceof Error ? error.message : 'Failed to reset password');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-[var(--color-background)]"
      style={{
        padding: "var(--spacing-3xl) var(--spacing-lg)",
      }}
    >
      <div
        className="w-full max-w-md border border-[var(--color-text-heading)] rounded-lg bg-white flex flex-col gap-[var(--spacing-lg)] items-center"
        style={{ padding: "var(--spacing-xl)" }}
      >
        <Heading as="h1" size="3xl" font="body" className="font-semibold w-full text-left mb-[var(--spacing-md)]">
          Reset your password
        </Heading>
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

          {/* Current password field */}
          <div className="flex flex-col gap-[var(--spacing-xs)] w-full">
            <Label htmlFor="currentPassword">Current password*</Label>
            <Input
              id="currentPassword"
              name="currentPassword"
              type="password"
              autoComplete="current-password"
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
            <Link href={`/login?redirectTo=${encodeURIComponent(redirectTo)}`}>
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

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
