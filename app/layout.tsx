import type { Metadata } from "next";
import { Geist, Geist_Mono, EB_Garamond, Cinzel, Pinyon_Script, Aboreto, Alex_Brush } from "next/font/google";
import { CartProvider } from "@/components/CartContext";
import ConditionalNavigation from "@/components/ConditionalNavigation";
import ConditionalSpacer from "@/components/ConditionalSpacer";
import StructuredData from "@/components/StructuredData";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ConversionTracking from "@/components/ConversionTracking";
import ScrollToTop from "@/components/ScrollToTop";
// import GlobalFooter from "@/components/GlobalFooter";
import ImageProtection from "@/components/ImageProtection";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

const pinyonScript = Pinyon_Script({
  variable: "--font-pinyon-script",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const aboreto = Aboreto({
  variable: "--font-aboreto",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const alexBrush = Alex_Brush({
  variable: "--font-alex-brush",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ghostlight Garden | Digital Art & Creative Solutions",
    template: "%s | Ghostlight Garden"
  },
  description: "Ghostlight Garden offers unique digital artwork, creative solutions, and innovative digital experiences. Based in North Carolina, we specialize in artistic digital products and custom solutions.",
  keywords: ["digital art", "creative solutions", "North Carolina", "digital experiences", "artwork", "custom solutions", "Ghostlight Garden"],
  authors: [{ name: "Ghostlight Garden" }],
  creator: "Ghostlight Garden",
  publisher: "Ghostlight Garden",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ghostlightgarden.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ghostlightgarden.com',
    siteName: 'Ghostlight Garden',
    title: 'Ghostlight Garden | Digital Art & Creative Solutions',
    description: 'Unique digital artwork and creative solutions from North Carolina',
    images: [
      {
        url: '/img/brand_logo.png',
        width: 1200,
        height: 630,
        alt: 'Ghostlight Garden - Digital Art & Creative Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ghostlight Garden | Digital Art & Creative Solutions',
    description: 'Unique digital artwork and creative solutions from North Carolina',
    images: ['/img/brand_logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/ghost_favicon.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/ghost_favicon.png',
    apple: '/ghost_favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ebGaramond.variable} ${cinzel.variable} ${pinyonScript.variable} ${aboreto.variable} ${alexBrush.variable} antialiased`}
      >
        <StructuredData />
        <GoogleAnalytics />
        <ImageProtection />
        <CartProvider>
          <ScrollToTop />
          <ConditionalSpacer />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
