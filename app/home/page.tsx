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
        url: "https://ghostlightgarden.com/img/brand_logo_transparent.png",
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
    images: ["https://ghostlightgarden.com/img/brand_logo_transparent.png"],
  },
};

export default function HomePage() {
  return <HomePageContent />;
}
