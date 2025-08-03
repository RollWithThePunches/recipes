import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Recipe - Cooking",
  description: "Create your own recipe",
};

export default function CreateRecipeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}