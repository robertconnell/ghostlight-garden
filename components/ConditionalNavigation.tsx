"use client";

import { usePathname } from "next/navigation";
import Navigation from "./Navigation";

export default function ConditionalNavigation() {
  const pathname = usePathname();
  
  // Don't show navigation on the landing page (root path) or maintenance page
  if (pathname === "/" || pathname === "/maintenance") {
    return null;
  }
  
  return <Navigation />;
}
