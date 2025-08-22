import Link from 'next/link';

export default function MaintenancePage() {

  return (
    <div className="min-h-screen relative bg-transparent" style={{ background: 'transparent' }}>
      {/* PC Background - Only for XL screens */}
      <div 
        className="hidden xl:block fixed inset-0 w-full h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/img/pc_maintenance_background.png)',
          zIndex: -1
        }}
      />

      {/* Mobile & iPad Background - For everything else */}
      <div 
        className="xl:hidden fixed inset-0 w-full h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/img/mobile_maintenance_background.png)',
          zIndex: -1
        }}
      />



      <div className="relative z-10 pt-8 md:pt-16 pb-8 px-2 sm:px-4 lg:px-0">
        <div className="max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        {/* Logo/Brand */}
        <div className="mb-12 px-2 sm:px-4">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-[#FFF9F5] to-[#9A77CC] bg-clip-text text-transparent mb-10 leading-tight ghostlight-font coming-soon-title drop-shadow-lg">
            Ghostlight Garden
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#FFF9F5] to-[#9A77CC] mx-auto rounded-full"></div>
        </div>

        {/* Main Message */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-4xl font-semibold text-white mb-6 drop-shadow-lg">
            We're Making Things Better
          </h2>
          <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto drop-shadow-lg">
            We're currently performing maintenance to improve your experience. Our team is working hard to bring you 
            something even more beautiful and functional.
          </p>
        </div>

        {/* Status */}
        <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-8 mb-12 shadow-lg border border-white/30 max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-600 mb-4">Status</h3>
          <div className="text-4xl md:text-5xl text-white mb-2 font-alex-brush">
            Under Maintenance
          </div>
          <p className="text-gray-600">We'll be back soon with improvements</p>
        </div>

        {/* Brand Logo */}
        <div className="flex justify-center mb-12">
          <img 
            src="/img/brand_logo_transparent.png" 
            alt="Ghostlight Garden Logo" 
            className="w-48 h-48 md:w-64 md:h-64 object-contain bg-transparent"
            style={{ 
              background: 'transparent', 
              backgroundColor: 'transparent',
              backgroundImage: 'none'
            }}
          />
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
        <div className="text-white/90 drop-shadow-lg mb-16">
          <p className="mb-2">Questions? We'd love to hear from you</p>
          <p className="font-medium">info@ghostlightgarden.com</p>
        </div>

        {/* Footer */}
        <div className="pt-8 pb-4 md:pb-0 border-t border-white/30 mt-32">
          <p className="text-sm text-white/80">
            © 2025 Ghostlight Garden. All rights reserved.
          </p>
        </div>
        </div>
      </div>
      

    </div>
  );
}
