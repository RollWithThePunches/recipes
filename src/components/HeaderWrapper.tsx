"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import SimpleHeader from "./SimpleHeader";

export default function HeaderWrapper() {
  const pathname = usePathname();
  
  // Use SimpleHeader for login and account pages
  const isSimpleHeaderPage = pathname === "/login" || pathname === "/account" || pathname === "/create-account" || pathname === "/reset-password";
  
  return isSimpleHeaderPage ? <SimpleHeader /> : <Header />;
} 