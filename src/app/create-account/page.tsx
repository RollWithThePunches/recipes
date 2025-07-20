"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/toast-provider";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function CreateAccountPage() {
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
    const userData = {
      email: formData.get('email') as string,
      username: formData.get('username') as string,
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
    };

    console.log('Frontend: Form submitted with data:', { 
      email: userData.email, 
      username: userData.username, 
      firstName: userData.firstName, 
      lastName: userData.lastName 
    });

    try {
      console.log('Frontend: Making fetch request to /api/auth/register');
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();
      console.log('Frontend: Response received:', { status: response.status, result });

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create account');
      }

      console.log('Frontend: Account created successfully, showing toast');
      // Show success toast
      showToast("Your account was created. Sign in to view your account");

      // Redirect to login page with the original redirect parameter
      router.push(`/login?redirectTo=${encodeURIComponent(redirectTo)}`);
    } catch (error) {
      console.error('Registration error:', error);
      showToast(error instanceof Error ? error.message : 'Failed to create account');
    } finally {
      setIsSubmitting(false);
    }
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

          {/* Email field */}
          <div className="flex flex-col gap-[var(--spacing-xs)] w-full">
            <Label htmlFor="email">Email*</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
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
