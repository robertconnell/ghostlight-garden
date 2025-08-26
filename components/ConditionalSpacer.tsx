"use client";

import { usePathname } from "next/navigation";

export default function ConditionalSpacer() {
  const pathname = usePathname();
  
  // Don't add spacer on the landing page (root path) or maintenance page
  if (pathname === "/" || pathname === "/maintenance") {
    return null;
  }
  
  return <div className="h-16"></div>;
}
