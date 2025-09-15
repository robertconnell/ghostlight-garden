import { Metadata } from 'next';
import CommissionForm from './CommissionForm';

export const metadata: Metadata = {
  title: 'Commission Custom Art | Ghostlight Garden',
  description: 'Request a custom art commission from Ghostlight Garden. Bring your vision to life with personalized artwork, illustrations, and spooky-cute creations.',
  keywords: 'custom art, commission art, hand-painted commission, mixed-media commission, custom artwork, personalized art, spooky-cute art, Ghostlight Garden',
  openGraph: {
    title: 'Commission Custom Art | Ghostlight Garden',
    description: 'Request a custom art commission from Ghostlight Garden. Bring your vision to life with personalized spooky-cute creations.',
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
    description: 'Request a custom art commission from Ghostlight Garden. Bring your vision to life with personalized spooky-cute creations.',
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
            "description": "Professional custom art commission service by Ghostlight Garden. Artwork, spooky-cute character design, and more.",
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
      <div className="hidden tablet:block fixed inset-0 z-0 bg-gradient-to-b from-[#DDC1CB] to-white"></div>

      {/* Mobile Background */}
      <div className="tablet:hidden fixed inset-0 z-0 bg-gradient-to-b from-[#DDC1CB] to-white"></div>

      <div className="relative z-10 min-h-full">
        {/* Hero Section */}
        <div className="py-10 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl tablet:text-5xl font-bold text-white drop-shadow-lg embossed-text ghostlight-font mb-6">Custom Art Commission</h1>
            <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
              Bring your vision to life in my pastel-spooky garden—hand-painted, mixed-media pieces made just for you 🩷
            </p>
            <p className="text-md text-white mt-4">
              Limited Monthly Spots · Transparent Pricing · Progress Updates
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
                  Commissioning custom art is a collaborative process. Here's what you can expect when working with me:
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 font-bold text-lg">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Initial Consultation</h3>
                    <p className="text-gray-600">I confirm your concept, size, budget, and timeline by email or short phone call.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold text-lg">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Quote & Booking</h3>
                    <p className="text-gray-600">Approve your quote and pay a 50% non-refundable deposit to reserve your spot.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold text-lg">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Updates</h3>
                    <p className="text-gray-600">I'll create your custom piece, keeping you updated on progress. 1-2 revisions allowed.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-yellow-600 font-bold text-lg">4</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Final Magic</h3>
                    <p className="text-gray-600">When it's perfect, you'll receive final photos for approval and pay the remaining balance.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-pink-600 font-bold text-lg">5</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Delivery</h3>
                    <p className="text-gray-600">Packed with care; tracking will be provided.</p>
                    <p className="text-sm text-gray-600 font-bold">Note: Rush availability is limited; fees may apply for deadlines under 2 weeks.</p>
                  </div>
                </div>
              </div>

              {/* Pricing Guidelines */}
              <div className="mt-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Guidelines</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-purple-200 pl-4">
                    <h4 className="font-medium text-gray-900">Starting Price Point</h4>
                    <p className="text-sm text-gray-600">Pricing starts at $200+, but final pricing varies based on size, detail, backgrounds, and deadline.</p>
                  </div>
                  <div className="border-l-4 border-purple-200 pl-4">
                    <h4 className="font-medium text-gray-900">Timeline</h4>
                    <p className="text-sm text-gray-600">Most pieces finish in 2–6 weeks depending on complexity and current queue.</p>
                  </div>
                  <div className="border-l-4 border-purple-200 pl-4">
                    <h4 className="font-medium text-gray-900">Shipping</h4>
                    <p className="text-sm text-gray-600">Tracking number will be provided. Originals come signed, and framed.</p>
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
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">Email Me</h4>
                    <a 
                      href="mailto:info@ghostlightgarden.com"
                      className="text-gray-600 hover:text-purple-900 transition-colors"
                    >
                      info@ghostlightgarden.com
                    </a>
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