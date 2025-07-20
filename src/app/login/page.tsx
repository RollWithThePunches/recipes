"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/toast-provider";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
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
    const loginData = {
      username: formData.get('username') as string,
      password: formData.get('password') as string,
    };

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Login failed');
      }

      // Show success toast
      showToast("Login successful! Welcome back.");

      // Store login state and user data from database response
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userId", result.user.id);
      localStorage.setItem("username", result.user.username);
      localStorage.setItem("firstName", result.user.firstName);
      
      // Redirect to the original page or account page as fallback
      router.push(redirectTo);
    } catch (error) {
      console.error('Login error:', error);
      showToast(error instanceof Error ? error.message : 'Login failed');
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
          Sign in to your account
        </h1>
        <form
          className="flex flex-col gap-[var(--spacing-lg)] w-full"
          autoComplete="off"
          aria-label="Sign in form"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-[var(--spacing-xs)] w-full">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
            />
          </div>
          <div className="flex flex-col gap-[var(--spacing-xs)] w-full">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </div>
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
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </div>
        </form>

        {/* Links container */}
        <div className="w-full flex items-center justify-between text-[var(--font-size-base)] text-[var(--color-secondary)]">
          <Link
            href={`/reset-password?redirectTo=${encodeURIComponent(redirectTo)}`}
            className="underline decoration-solid underline-offset-2 hover:text-[var(--color-primary)] transition-colors"
            style={{ fontFamily: "var(--font-family-body)" }}
          >
            Forgot your password?
          </Link>
          <Link
            href={`/create-account?redirectTo=${encodeURIComponent(redirectTo)}`}
            className="underline decoration-solid underline-offset-2 hover:text-[var(--color-primary)] transition-colors"
            style={{ fontFamily: "var(--font-family-body)" }}
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
