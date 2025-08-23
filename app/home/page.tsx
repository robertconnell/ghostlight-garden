import type { Metadata } from 'next';
import HomePageContent from './HomePageContent';

export const metadata: Metadata = {
  title: "Ghostlight Garden - Where Soft Shadows Bloom",
  description: "Discover curated artwork from talented artists. Unique pieces that transform spaces and inspire creativity. Where spooky meets cute and soft shadows bloom.",
  keywords: "curated artwork, original art, spooky cute art, ghost art, garden art, unique paintings, art collection, artist marketplace, soft shadows bloom",
  openGraph: {
    title: "Ghostlight Garden - Where Soft Shadows Bloom",
    description: "Discover curated artwork from talented artists. Unique pieces that transform spaces and inspire creativity.",
    images: [
      {
        url: "https://ghostlightgarden.com/img/brand_logo.png",
        width: 800,
        height: 600,
        alt: "Ghostlight Garden - Curated Art Collection",
      },
    ],
    type: "website",
    url: "https://ghostlightgarden.com/home",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ghostlight Garden - Where Soft Shadows Bloom",
    description: "Discover curated artwork from talented artists. Unique pieces that transform spaces and inspire creativity.",
            images: ["https://ghostlightgarden.com/img/brand_logo.png"],
  },
};

export default function HomePage() {
  return (
    <>
      {/* Preload critical images for performance */}
      <link
        rel="preload"
        as="image"
        href="/img/pc_home_background.png"
        media="(min-width: 768px)"
      />
      <link
        rel="preload"
        as="image"
        href="/img/mobile_home_background.png"
        media="(max-width: 767px)"
      />
      
      {/* Structured Data for Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Ghostlight Garden",
            "description": "Curated artwork from talented artists - where soft shadows bloom and spooky meets cute. Discover unique pieces that transform spaces and inspire creativity.",
            "url": "https://ghostlightgarden.com/home",
                         "potentialAction": {
               "@type": "SearchAction",
               "target": "https://ghostlightgarden.com/collection?q={search_term_string}",
               "query-input": "required name=search_term_string"
             },
            "publisher": {
              "@type": "Organization",
              "name": "Ghostlight Garden",
              "url": "https://ghostlightgarden.com/home"
            }
          })
        }}
      />
      
      {/* Organization Schema for Business Recognition */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Ghostlight Garden",
            "description": "Curated artwork from talented artists - where soft shadows bloom and spooky meets cute.",
            "url": "https://ghostlightgarden.com/home",
            "logo": "https://ghostlightgarden.com/img/brand_logo.png",
            "sameAs": [
              "https://ghostlightgarden.com/home"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "email": "info@ghostlightgarden.com"
            },
                               "areaServed": "Worldwide"
          })
        }}
      />
      
      {/* Breadcrumb Schema for Site Navigation */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Ghostlight Garden",
                "item": "https://ghostlightgarden.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Where Soft Shadows Bloom",
                "item": "https://ghostlightgarden.com/home"
              }
            ]
          })
        }}
      />
      
      <HomePageContent />
    </>
  );
}
