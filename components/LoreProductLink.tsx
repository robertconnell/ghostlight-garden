'use client';

import Link from 'next/link';

interface LoreProductLinkProps {
  href: string;
  className: string;
  children: React.ReactNode;
}

export default function LoreProductLink({ href, className, children }: LoreProductLinkProps) {
  const handleClick = () => {
    // Set session storage flag to indicate user came from lore collection
    sessionStorage.setItem('fromLoreCollection', 'true');
    
    // Clear the flag after 30 seconds to prevent persistence
    setTimeout(() => {
      sessionStorage.removeItem('fromLoreCollection');
    }, 30000);
  };

  return (
    <Link
      href={href}
      className={className}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
