'use client';

import { useEffect, useState } from 'react';

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-sans min-h-screen">
      {/* First Section - Background Image with Content */}
      <div className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Background overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20 dark:bg-black/40 pointer-events-none z-10"></div>

        {/* PC Background Image - Hidden on mobile with enhanced parallax */}
        <div
          className="hidden md:block absolute inset-0 bg-cover bg-center bg-no-repeat bg-[url('/img/pc_home_background.png')]"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            willChange: 'transform'
          }}
        ></div>

        {/* Mobile Background Image - Hidden on PC with enhanced parallax */}
        <div
          className="md:hidden absolute inset-0 bg-cover bg-center bg-no-repeat bg-[url('/img/mobile_home_background.png')]"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            willChange: 'transform'
          }}
        ></div>

        {/* Misty transition overlay - fades from transparent to white */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/60 to-transparent pointer-events-none z-20"></div>

        {/* PC UI - Hidden on mobile */}
        <div className="hidden md:flex relative z-20 flex-1 flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-center text-white">PC Home Page</h1>
        </div>

        {/* Mobile UI - Hidden on PC */}
        <div className="md:hidden relative z-20 flex-1 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-center text-white">Mobile Home Page</h1>
        </div>
      </div>

      {/* Second Section - White Background */}
      <div className="min-h-screen bg-white flex flex-col items-center justify-center relative z-10">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Welcome to the Garden</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto px-6">
            This is the second section with a white background. Users can scroll down from the background image above to reach this area.
          </p>
        </div>
      </div>
    </div>
  );
}
