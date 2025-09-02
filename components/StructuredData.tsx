export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Ghostlight Garden",
    "url": "https://ghostlightgarden.com",
    "logo": "https://ghostlightgarden.com/img/brand_logo.png",
    "description": "Ghostlight Garden creates unique hand-painted, mixed-media, spooky-cute artwork and custom commissions. All artwork comes framed. Based in North Carolina, we specialize in original artwork.",
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
    "foundingDate": "2025",
    "areaServed": "United States",
    "serviceType": ["Spooky-Cute Art", "Custom Commissions"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Artwork and Custom Commissions",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Artwork",
            "description": "Unique spooky-cute artwork and creations"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Artwork",
            "description": "Custom artwork and commissions"
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
