'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import GlobalFooter from "@/components/GlobalFooter";

export default function LandingPage() {
  const router = useRouter();

  // Animation variables for consistent timing across PC and mobile
  const welcomeAnimation = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.4 }
  };

  const ghostlightAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 1.4, delay: 1.2 }
  };

  const buttonAnimation = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { 
      opacity: { duration: 1, delay: 2.6, ease: "easeOut" as const },
      y: { duration: 1, delay: 2.6, ease: "easeOut" as const }
    }
  };

  const handleNavigateToHome = () => {
    router.push('/home');
  };

  return (
    <div className="font-sans min-h-screen flex flex-col">
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20 dark:bg-black/40 pointer-events-none"></div>

      {/* PC Background Image - Hidden on mobile */}
      <div 
        className="hidden md:block absolute inset-0 bg-cover bg-center bg-no-repeat bg-[url('/img/pc_landing_background.png')]"
      ></div>

      {/* Mobile Background Image - Hidden on PC */}
      <div
        className="md:hidden absolute inset-0 bg-cover bg-center bg-no-repeat bg-[url('/img/mobile_landing_background.png')]"
      ></div>

      {/* PC UI - Hidden on mobile */}
      <div className="hidden md:flex relative z-10 flex-1 flex-col items-center justify-start pt-[25vh]">
        <motion.h1 
          className="text-6xl font-bold text-center mb-12 text-white drop-shadow-lg welcome-font"
          {...welcomeAnimation}
        >
          Welcome to
        </motion.h1>
        
        {/* Placeholder for brand name - PC size */}
        <motion.div 
          className="mb-16 w-full text-center px-4"
          {...ghostlightAnimation}
        >
          <span className="text-[clamp(2.5rem,8vw,8rem)] font-bold text-white drop-shadow-lg leading-none whitespace-nowrap embossed-text ghostlight-font">Ghostlight Garden</span>
        </motion.div>

        {/* Enter the garden button - PC size */}
        <motion.button
          onClick={handleNavigateToHome}
          className="rounded-full border-2 border-white flex items-center justify-center bg-[#8A6D9B] hover:bg-[8A6D9B]/90 text-white font-bold text-3xl h-16 px-12 shadow-lg cursor-pointer button-font"
          {...buttonAnimation}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(255, 255, 255, 0.6)"
          }}
          whileTap={{ scale: 0.95 }}
          transition={{
            ...buttonAnimation.transition,
            boxShadow: { duration: 0.4, ease: "easeInOut" }
          }}
        >
          Enter the Garden
        </motion.button>
      </div>

      {/* Mobile UI */}
      <div className="md:hidden relative z-10 flex-1">
        {/* Welcome to Ghostlight Garden - Positioned in upper area */}
        <div className="absolute top-1/6 left-1/2 transform -translate-x-1/2 w-full px-4">
          <motion.h1
            className="text-2xl font-bold text-center mb-4 text-white drop-shadow-lg welcome-font"
            {...welcomeAnimation}
          >
            Welcome to
          </motion.h1>
          <motion.div
            className="w-full text-center px-2"
            {...ghostlightAnimation}
          >
            <span className="text-[8vw] font-bold text-white drop-shadow-lg leading-tight embossed-text ghostlight-font whitespace-nowrap">Ghostlight Garden</span>
          </motion.div>
        </div>

        {/* Enter the Garden Button - Positioned in lower area */}
        <motion.button
          onClick={handleNavigateToHome}
          className="absolute bottom-1/6 left-1/2 transform -translate-x-1/2 rounded-full border-2 border-white flex items-center justify-center bg-[#8A6D9B] hover:bg-[#8A6D9B]/90 text-white font-bold text-xl h-14 px-8 shadow-lg cursor-pointer button-font whitespace-nowrap mobile-button-glow"
          {...buttonAnimation}
          whileTap={{ scale: 0.95 }}
          transition={{
            ...buttonAnimation.transition
          }}
        >
          Enter the Garden
        </motion.button>
      </div>
      
      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 py-6 px-4 text-center z-20">
        <p className="text-sm text-white drop-shadow-lg">
          © 2025 Ghostlight Garden. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
