
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Simple media query hook
const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
}


const ParallaxBackground: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Static Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#1e1e1e] to-[#242424]"></div>
      
      {/* Floating Blobs */}
      <motion.div
        animate={isMobile ? {
          x: [-50, 50, -50],
          y: [-25, 75, -25],
        } : {
          x: [-100, 100, -100],
          y: [-50, 150, -50],
          rotate: [0, 180, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: isMobile ? 60 : 40,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        }}
        className="absolute top-[10%] left-[10%] w-72 h-72 bg-purple-500/30 rounded-full filter blur-3xl opacity-50"
        style={{ willChange: 'transform' }}
      ></motion.div>
      <motion.div
        animate={isMobile ? {
          x: [25, -75, 25],
          y: [50, -50, 50],
        } : {
          x: [50, -150, 50],
          y: [100, -100, 100],
          rotate: [0, -180, -360],
          scale: [1.1, 0.9, 1.1],
        }}
        transition={{
          duration: isMobile ? 75 : 50,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
          delay: 5
        }}
        className="absolute bottom-[5%] right-[15%] w-96 h-96 bg-blue-500/30 rounded-full filter blur-3xl opacity-40"
        style={{ willChange: 'transform' }}
      ></motion.div>
       <motion.div
        animate={isMobile ? {
          x: [-10, 10, -10],
          y: [15, -15, 15],
        } : {
          x: [-20, 20, -20],
          y: [30, -30, 30],
          rotate: [0, 90, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: isMobile ? 50 : 35,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
          delay: 10
        }}
        className="absolute top-[30%] right-[5%] w-64 h-64 bg-pink-500/20 rounded-full filter blur-2xl opacity-60"
        style={{ willChange: 'transform' }}
      ></motion.div>
    </div>
  );
};

export default ParallaxBackground;