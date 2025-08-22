import type { Metadata } from "next";
import { Geist, Geist_Mono, EB_Garamond, Cinzel, Pinyon_Script, Aboreto, Alex_Brush } from "next/font/google";
import { CartProvider } from "@/components/CartContext";
import ConditionalNavigation from "@/components/ConditionalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
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
  title: "Ghostlight Garden",
  description: "Welcome to Ghostlight Garden",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/ghost_favicon.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
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
        <ImageProtection />
        <CartProvider>
          <ConditionalNavigation />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
