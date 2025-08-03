"use client";

import { useState, useEffect } from "react";
import { Plus, User, Heart, BookOpen, Shield, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import Text from "@/components/ui/text";
import contentData from "@/data/content.json";
import { ContentData } from "@/types/content";
import Link from "next/link";
import Image from "next/image";
import { useFavorites } from "@/hooks/useFavorites";

const content = contentData as ContentData;

export default function AccountPage() {
  const [firstName, setFirstName] = useState<string>("");
  const { getSortedFavorites, isLoading: favoritesLoading } = useFavorites();

  // Get firstName from localStorage on component mount
  useEffect(() => {
    const storedFirstName = localStorage.getItem("firstName") || "";
    setFirstName(storedFirstName);
  }, []);

  const navigationItems = [
    { id: "account-info", label: "Account information", icon: User, href: "#" },
    { id: "create-recipe", label: "Your recipes", icon: BookOpen, href: "/create-recipe" },
    { id: "favorites", label: "Favorites", icon: Heart, href: "/favorites" },
    { id: "security", label: "Security and privacy", icon: Shield, href: "#" },
    { id: "help", label: "Help and support", icon: HelpCircle, href: "#" },
  ];

  const quickActions = content.account?.quickActions || [];
  const favoriteRecipes = getSortedFavorites();

  return (
    <div 
      className="min-h-screen bg-[var(--color-background)] flex flex-col"
      style={{
        padding: "var(--spacing-3xl) var(--spacing-lg)",
      }}
    >
      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row items-start justify-start p-0">
        {/* Side Navigation */}
        <nav
          className="flex flex-col gap-[var(--spacing-sm)] p-6 w-full lg:w-[352px] lg:shrink-0"
          role="navigation"
          aria-label="Account navigation"
        >
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[var(--color-text-body)] hover:bg-[var(--color-background-hover)] transition-colors"
              >
                <IconComponent className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Main Content Area */}
        <div className="flex flex-col gap-6 p-6 lg:p-0 flex-1 w-full lg:max-w-[1024px]">
          {/* Welcome Header */}
          <Heading as="h1" size="4xl" font="body" className="text-[var(--color-text-body)] leading-none font-bold">
            Welcome {firstName}!
          </Heading>

          {/* Content Container */}
          <div className="flex flex-col gap-10">
            {/* Most Used Section */}
            <section aria-labelledby="most-used-heading">
              <Heading as="h2" size="xl" font="body" id="most-used-heading" className="text-[var(--color-text-body)] mb-6 font-semibold">
                Most used
              </Heading>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
                {quickActions.map((action) => (
                  <Button
                    key={action.label}
                    variant="secondary"
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            </section>

            {/* Your Favorites Section */}
            <section aria-labelledby="favorites-heading">
              <div className="flex items-end justify-between mb-6">
                <Heading as="h2" size="xl" font="body" id="favorites-heading" className="text-[var(--color-text-body)] font-semibold">
                  Your favorites
                </Heading>
                <Link
                  href="/favorites"
                  className="text-[var(--color-link)] underline hover:text-[var(--color-primary)] transition-colors text-base"
                  style={{ fontFamily: "var(--font-family-body)" }}
                >
                  View all
                </Link>
              </div>
              {favoritesLoading ? (
                <div className="flex items-center justify-center h-32">
                  <Text color="body">Loading favorites...</Text>
                </div>
              ) : favoriteRecipes.length > 0 ? (
                <div className="flex flex-wrap gap-6 items-start">
                  {favoriteRecipes.map((recipe) => (
                    <Link key={recipe.id} href={`/recipe/${recipe.id}`}>
                      <Card className="w-full sm:w-[calc(50%-12px)] lg:w-80 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] hover:shadow-[0px_4px_8px_0px_rgba(0,0,0,0.3)] transition-shadow cursor-pointer">
                        <div className="h-[203px] w-full rounded-t-lg overflow-hidden">
                          <Image
                            src={recipe.image}
                            alt={recipe.title}
                            width={320}
                            height={203}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="p-[14px]">
                          <Heading as="h3" size="base" font="body" className="text-[var(--color-text-body)] font-semibold">
                            {recipe.title}
                          </Heading>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-32">
                  <Text color="body">No favorites yet. Start adding recipes to see them here!</Text>
                </div>
              )}
            </section>

            {/* Your Recipes Section */}
            <section aria-labelledby="your-recipes-heading">
              <Heading as="h2" size="xl" font="body" id="your-recipes-heading" className="text-[var(--color-text-body)] mb-6 font-semibold">
                Your recipes
              </Heading>
              <div className="flex flex-wrap gap-6">
                <Link href="/create-recipe">
                  <Card className="w-full sm:w-[calc(50%-12px)] lg:w-80 h-[188px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] hover:shadow-[0px_4px_8px_0px_rgba(0,0,0,0.3)] transition-shadow cursor-pointer">
                    <CardContent className="flex flex-col items-center justify-center h-full p-[14px]">
                      <div className="flex flex-row gap-2 items-center">
                        <Text 
                          as="span"
                          size="xl"
                          color="body"
                          weight="semibold"
                        >
                          Create a recipe
                        </Text>
                        <Plus className="w-12 h-12 text-[var(--color-text-body)]" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 