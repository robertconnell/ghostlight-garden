"use client";

import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <div className={`relative z-10 ${className}`}>
      <div className="max-w-6xl mx-auto px-6 mt-8">
        <nav className="flex items-center space-x-2 text-md text-gray-100">
          {items.map((item, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && (
                <span className="mx-2 text-gray-100">&lt;</span>
              )}
              {index === items.length - 1 ? (
                <span className="text-gray-900 font-medium">{item.label}</span>
              ) : (
                <Link 
                  href={item.href} 
                  className="hover:text-purple-900 transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
