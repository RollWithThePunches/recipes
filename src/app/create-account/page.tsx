"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/toast-provider";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateAccountPage() {
  const { showToast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form processing
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Show success toast
    showToast("Your account was created. Sign in to view your account");

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
          Create an account
        </h1>
        <form
          className="flex flex-col gap-[var(--spacing-lg)] w-full"
          autoComplete="off"
          aria-label="Create account form"
          onSubmit={handleSubmit}
        >
          {/* Name fields container */}
          <div className="flex flex-col gap-[var(--spacing-xs)] w-full">
            <div className="flex flex-row gap-[var(--spacing-md)] items-start w-full">
              {/* First name field */}
              <div className="flex flex-col gap-[var(--spacing-xs)] flex-1">
                <Label htmlFor="firstName">First name*</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                />
              </div>
              {/* Last name field */}
              <div className="flex flex-col gap-[var(--spacing-xs)] flex-1">
                <Label htmlFor="lastName">Last name*</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                />
              </div>
            </div>
          </div>

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

          {/* Password field */}
          <div className="flex flex-col gap-[var(--spacing-xs)] w-full">
            <Label htmlFor="password">Password*</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
            />
          </div>

          {/* Confirm password field */}
          <div className="flex flex-col gap-[var(--spacing-xs)] w-full">
            <Label htmlFor="confirmPassword">Confirm password*</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
            />
          </div>

          {/* Submit button */}
          <div className="w-full flex justify-end">
            <Button
              type="submit"
              className="bg-[var(--color-primary)] font-semibold text-[var(--font-size-base)] rounded-lg py-2 mt-2 hover:bg-[var(--color-secondary)] focus:ring-2 focus:ring-[var(--color-focus)] transition-colors"
              style={{
                color: "var(--color-text-on-dark)",
                width: "fit-content",
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
