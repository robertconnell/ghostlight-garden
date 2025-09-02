import { Metadata } from 'next';
import CommissionForm from './CommissionForm';

export const metadata: Metadata = {
  title: 'Commission Custom Art | Ghostlight Garden',
  description: 'Request a custom art commission from Ghostlight Garden. Bring your vision to life with personalized digital artwork, illustrations, and creative solutions.',
  keywords: 'custom art, commission art, digital art commission, illustration commission, custom artwork, personalized art, Ghostlight Garden',
  openGraph: {
    title: 'Commission Custom Art | Ghostlight Garden',
    description: 'Request a custom art commission from Ghostlight Garden. Bring your vision to life with personalized digital artwork.',
    type: 'website',
    url: 'https://ghostlightgarden.com/commissions',
    images: [
      {
        url: '/img/brand_logo.png',
        width: 1200,
        height: 630,
        alt: 'Ghostlight Garden - Commission Custom Art',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Commission Custom Art | Ghostlight Garden',
    description: 'Request a custom art commission from Ghostlight Garden. Bring your vision to life with personalized digital artwork.',
    images: ['/img/brand_logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/commissions',
  },
};

export default function CommissionsPage() {
  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Custom Art Commission Service",
            "description": "Professional custom art commission service by Ghostlight Garden. Digital artwork, illustrations, character design, and more.",
            "provider": {
              "@type": "Organization",
              "name": "Ghostlight Garden",
              "url": "https://ghostlightgarden.com",
              "email": "info@ghostlightgarden.com"
            },
            "serviceType": "Art Commission",
            "areaServed": "Worldwide",
            "availableChannel": {
              "@type": "ServiceChannel",
              "serviceUrl": "https://ghostlightgarden.com/commissions",
              "serviceSmsNumber": null,
              "servicePhone": null
            },
            "offers": {
              "@type": "Offer",
              "priceRange": "$100-$2500+",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock"
            }
          })
        }}
      />
      {/* Background component to ensure consistency */}
      <div className="hidden md:block fixed inset-0 z-0 bg-gray-50">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(/img/pc_home_background.png)',
            willChange: 'transform',
            transform: 'translateZ(0)'
          }}
          role="img"
          aria-label="PC background: Artistic garden scene with soft shadows and blooming flowers"
        />
      </div>

      {/* Mobile Background */}
      <div className="md:hidden fixed inset-0 z-0 bg-gray-50">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(/img/mobile_home_background.png)',
            willChange: 'transform',
            transform: 'translateZ(0)'
          }}
          role="img"
          aria-label="Mobile background: Artistic garden scene with soft shadows and blooming flowers"
        />
      </div>

      <div className="relative z-10 min-h-full">
        {/* Hero Section */}
        <div className="py-10 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg embossed-text ghostlight-font mb-6">Custom Art Commission</h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Bring your vision to life with a custom piece created just for you. Let's collaborate to create something truly unique.
            </p>
            <div className="w-72 h-1 bg-gradient-to-r from-[#FFF9F566] to-[#9A77CC] mx-auto mt-6 rounded-full"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-6 mb-16">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Commission Form */}
            <div className="lg:w-1/2">
              <CommissionForm />
            </div>

            {/* Commission Information */}
            <div className="lg:w-1/2 space-y-8">
              <div>
                <h2 className="text-3xl font-semibold text-gray-900 mb-6">How It Works</h2>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Commissioning custom art is a collaborative process. Here's what you can expect when working with us.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 font-bold text-lg">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Initial Consultation</h3>
                    <p className="text-gray-600">We'll review your request and discuss your vision in detail to ensure we understand exactly what you're looking for.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold text-lg">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Quote & Timeline</h3>
                    <p className="text-gray-600">We'll provide a detailed quote and timeline based on your project requirements and complexity.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold text-lg">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Creation Process</h3>
                    <p className="text-gray-600">We'll create your custom piece, keeping you updated with progress and incorporating your feedback.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-yellow-600 font-bold text-lg">4</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Final Delivery</h3>
                    <p className="text-gray-600">You'll receive your finished artwork in high-resolution format, ready for your intended use.</p>
                  </div>
                </div>
              </div>

              {/* Pricing Guidelines */}
              <div className="mt-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Pricing Guidelines</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-purple-200 pl-4">
                    <h4 className="font-medium text-gray-900">Simple Illustrations</h4>
                    <p className="text-sm text-gray-600">Starting at $100 - Basic digital art pieces with minimal complexity</p>
                  </div>
                  <div className="border-l-4 border-purple-200 pl-4">
                    <h4 className="font-medium text-gray-900">Detailed Artwork</h4>
                    <p className="text-sm text-gray-600">$250-$500 - Complex pieces with detailed backgrounds and multiple elements</p>
                  </div>
                  <div className="border-l-4 border-purple-200 pl-4">
                    <h4 className="font-medium text-gray-900">Commercial Use</h4>
                    <p className="text-sm text-gray-600">Additional licensing fees may apply for commercial or business use</p>
                  </div>
                  <div className="border-l-4 border-purple-200 pl-4">
                    <h4 className="font-medium text-gray-900">Rush Jobs</h4>
                    <p className="text-sm text-gray-600">50% surcharge for projects needed within 48 hours</p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mt-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Questions?</h3>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">Email Us</h4>
                    <p className="text-gray-600">info@ghostlightgarden.com</p>
                    <p className="text-sm text-gray-500">We typically respond within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}