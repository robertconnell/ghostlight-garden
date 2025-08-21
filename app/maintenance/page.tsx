import Link from 'next/link';

export default function MaintenancePage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
      <div className="max-w-6xl mx-auto text-center px-6">
        {/* Logo/Brand */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-10 leading-tight ghostlight-font coming-soon-title">
            Ghostlight Garden
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Main Message */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6">
            We're Making Things Better
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            We're currently performing maintenance to improve your experience. Our team is working hard to bring you 
            something even more beautiful and functional.
          </p>
        </div>

        {/* Status */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-12 shadow-lg border border-white/20">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Status</h3>
          <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">
            Under Maintenance
          </div>
          <p className="text-gray-600">We'll be back soon with improvements</p>
        </div>

        {/* Features Preview */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Curated Artwork</h4>
            <p className="text-gray-600">Discover unique pieces that tell their own stories</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Seamless Experience</h4>
            <p className="text-gray-600">Beautiful, intuitive design that feels natural</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Quality Assured</h4>
            <p className="text-gray-600">Every piece carefully selected for excellence</p>
          </div>
        </div>

        {/* Status Updates - Commented out for now, will implement email functionality later */}
        {/* 
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-12 shadow-lg border border-white/20">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Get Status Updates</h3>
          <p className="text-gray-600 mb-6">We'll notify you when maintenance is complete</p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your.email@example.com"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              Notify Me
            </button>
          </form>
          
          <p className="text-sm text-gray-500 mt-4">
            We'll only use this email to send you maintenance updates.
          </p>
        </div>
        */}

        {/* Contact Info */}
        <div className="text-gray-600">
          <p className="mb-2">Questions? We'd love to hear from you</p>
          <p className="font-medium">info@ghostlightgarden.com</p>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            © 2025 Ghostlight Garden. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
