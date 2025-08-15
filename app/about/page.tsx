import GlobalFooter from "@/components/GlobalFooter";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      {/* Hero Section */}
      <div className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">About Ghostlight Garden</h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Welcome to our enchanted corner of the digital world, where creativity blooms and imagination takes root.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-4xl mx-auto px-6 mb-16">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Our Story */}
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Ghostlight Garden began as a simple idea: to create a space where beauty and functionality coexist harmoniously. 
                What started as a personal project has grown into something we're proud to share with the world.
              </p>
              <p>
                We believe that every digital experience should feel as natural and inspiring as a walk through a well-tended garden. 
                Each element is carefully crafted, every interaction thoughtfully designed.
              </p>
            </div>
          </div>

          {/* Our Mission */}
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Our Mission</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                To cultivate digital experiences that not only serve their purpose but also bring joy and wonder to those who use them. 
                We're committed to creating products that feel both familiar and extraordinary.
              </p>
              <p>
                Like a garden that changes with the seasons, we're constantly evolving, learning, and growing. 
                Our journey is ongoing, and we invite you to be part of it.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">What We Value</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Creativity</h3>
              <p className="text-gray-600">We believe in the power of creative thinking and innovative solutions.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Care</h3>
              <p className="text-gray-600">Every detail matters. We craft with attention and love for what we do.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Growth</h3>
              <p className="text-gray-600">We're always learning, evolving, and striving to be better.</p>
            </div>
          </div>
        </div>
      </div>
      
      <GlobalFooter />
    </div>
  );
}
