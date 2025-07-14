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
  signIn: string;
  signOut: string;
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

export interface AccountMenuUI {
  loginPrompt: string;
  menuItems: {
    account: string;
    security: string;
    messages: string;
  };
}

export interface UI {
  navigation: NavigationUI;
  buttons: ButtonsUI;
  accountMenu: AccountMenuUI;
  footer: FooterUI;
}

export interface MealType {
  id: string;
  name: string;
  href: string;
}

export interface CategoryNavigation {
  title: string;
  mealTypes: MealType[];
}

export interface ExploreSection {
  title: string;
  recipes: string[];
}

export interface CategoryPage {
  id: string;
  name: string;
  description: string;
  navigation: CategoryNavigation;
  featuredRecipe: string;
  exploreSection: ExploreSection;
}

export interface Categories {
  [key: string]: CategoryPage;
}

export interface ContentData {
  homepage: Homepage;
  recipes: Recipe[];
  categories: Categories;
  ui: UI;
} 