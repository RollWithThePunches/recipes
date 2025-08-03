import type { Metadata } from "next";
import { Lexend, Madimi_One } from "next/font/google";
import "./globals.css";
import HeaderWrapper from "@/components/HeaderWrapper";
import Footer from "@/components/Footer";
import { ToastProvider } from "@/components/ui/toast-provider";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  display: "swap",
});

const madimiOne = Madimi_One({
  variable: "--font-madimi-one",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Recipe Browser - Cooking",
  description: "Browse and discover amazing recipes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lexend.variable} ${madimiOne.variable} antialiased min-h-screen flex flex-col`}
      >
        <ToastProvider>
          {/* Skip to main content link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 z-50 bg-white p-4 text-secondary underline"
          >
            Skip to main content
          </a>

          <HeaderWrapper />

          <main 
            id="main-content" 
            className="flex-1"
          >
            {children}
          </main>

          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
