'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const router = useRouter();

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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Welcome to
        </motion.h1>
        
        {/* Placeholder for brand name - PC size */}
        <motion.div 
          className="mb-16 w-full text-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 1.4 }}
        >
          <span className="text-[clamp(2.5rem,8vw,8rem)] font-bold text-white drop-shadow-lg leading-none whitespace-nowrap embossed-text ghostlight-font">Ghostlight Garden</span>
        </motion.div>

        {/* Enter the garden button - PC size */}
        <motion.button
          onClick={handleNavigateToHome}
          className="rounded-full border-2 border-white flex items-center justify-center bg-[#8A6D9B] hover:bg-[#8A6D9B]/90 text-white font-bold text-3xl h-16 px-12 shadow-lg cursor-pointer button-font"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(255, 255, 255, 0.6)"
          }}
          whileTap={{ scale: 0.95 }}
          transition={{
            opacity: { duration: 1, delay: 2.6, ease: "easeOut" },
            y: { duration: 1, delay: 2.6, ease: "easeOut" },
            boxShadow: { duration: 0.4, ease: "easeInOut" }
          }}
        >
          Enter the Garden
        </motion.button>
      </div>

      {/* Mobile UI - Hidden on PC */}
      <div
        className="md:hidden relative z-10 flex-1 flex flex-col items-center justify-start pt-16"
      >
        <motion.h1
          className="text-2xl font-bold text-center mb-6 text-white drop-shadow-lg welcome-font"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Welcome to
        </motion.h1>

        {/* Placeholder for brand name - Mobile size */}
        <motion.div 
          className="mb-8 w-full text-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.8 }}
        >
          <span className="text-[9.5vw] font-bold text-white drop-shadow-lg leading-none whitespace-nowrap ghostlight-font">Ghostlight Garden</span>
        </motion.div>

        {/* Enter the garden button - Mobile size */}
        <motion.button
          onClick={handleNavigateToHome}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 rounded-full border-2 border-white flex items-center justify-center bg-[#8A6D9B] hover:bg-[#8A6D9B]/90 text-white font-bold text-lg h-14 px-8 shadow-lg cursor-pointer w-full max-w-xs button-font"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(255, 255, 255, 0.6)"
          }}
          whileTap={{ scale: 0.95 }}
          transition={{
            opacity: { duration: 0.8, delay: 1.2, ease: "easeOut" },
            y: { duration: 0.8, delay: 1.2, ease: "easeOut" },
            boxShadow: { duration: 0.4, ease: "easeInOut" }
          }}
        >
          Enter the Garden
        </motion.button>
      </div>
      
      {/* Footer - Responsive */}
      <motion.footer 
        className="absolute bottom-0 left-0 right-0 z-10 p-4 md:p-8 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <span className="text-xs md:text-sm text-white/80 drop-shadow-sm font-serif">© 2024 Ghostlight</span>
      </motion.footer>
    </div>
  );
}
