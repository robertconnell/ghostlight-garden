export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Ghostlight Garden",
    "url": "https://ghostlightgarden.com",
    "logo": "https://ghostlightgarden.com/img/brand_logo.png",
    "description": "Ghostlight Garden offers unique digital artwork, creative solutions, and innovative digital experiences. Based in North Carolina, we specialize in artistic digital products and custom solutions.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US",
      "addressRegion": "NC",
      "addressLocality": "North Carolina"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "info@ghostlightgarden.com"
    },
    "sameAs": [
      "https://instagram.com/ghostlightgarden",
      "https://twitter.com/ghostlightgarden",
      "https://linkedin.com/company/ghostlightgarden"
    ],
    "foundingDate": "2024",
    "areaServed": "United States",
    "serviceType": ["Digital Art", "Creative Solutions", "Custom Development"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Digital Products & Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Digital Artwork",
            "description": "Unique digital artwork and creative designs"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Creative Solutions",
            "description": "Custom digital solutions and creative consulting"
          }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
