import { Recipe, Category, RecipeCard } from './recipe';

export interface HeroSection {
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  learnMoreText: string;
  image: string;
}

export interface SummerRecipesSection {
  title: string;
  recipes: RecipeCard[];
}

export interface PopularSection {
  title: string;
}

export interface HomepageSections {
  summerRecipes: SummerRecipesSection;
  popularNow: PopularSection;
}

export interface Homepage {
  hero: HeroSection;
  categories: Category[];
  featuredRecipes: string[];
  sections: HomepageSections;
}

export interface NavigationUI {
  brand: string;
  searchPlaceholder: string;
  menuItems: string[];
}

export interface ButtonsUI {
  learnMore: string;
  viewRecipe: string;
  searchRecipes: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterUI {
  brand: string;
  copyright: string;
  links: FooterLink[];
}

export interface UI {
  navigation: NavigationUI;
  buttons: ButtonsUI;
  footer: FooterUI;
}

export interface ContentData {
  homepage: Homepage;
  recipes: Recipe[];
  ui: UI;
} 