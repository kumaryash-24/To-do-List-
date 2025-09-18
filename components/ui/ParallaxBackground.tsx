
import React from 'react';
import { motion } from 'framer-motion';

const ParallaxBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Static Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#1e1e1e] to-[#242424]"></div>
      
      {/* Floating Blobs */}
      <motion.div
        animate={{
          x: [-100, 100, -100],
          y: [-50, 150, -50],
          rotate: [0, 180, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 40,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        }}
        className="absolute top-[10%] left-[10%] w-72 h-72 bg-purple-500/30 rounded-full filter blur-3xl opacity-50"
      ></motion.div>
      <motion.div
        animate={{
          x: [50, -150, 50],
          y: [100, -100, 100],
          rotate: [0, -180, -360],
          scale: [1.1, 0.9, 1.1],
        }}
        transition={{
          duration: 50,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
          delay: 5
        }}
        className="absolute bottom-[5%] right-[15%] w-96 h-96 bg-blue-500/30 rounded-full filter blur-3xl opacity-40"
      ></motion.div>
       <motion.div
        animate={{
          x: [-20, 20, -20],
          y: [30, -30, 30],
          rotate: [0, 90, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 35,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
          delay: 10
        }}
        className="absolute top-[30%] right-[5%] w-64 h-64 bg-pink-500/20 rounded-full filter blur-2xl opacity-60"
      ></motion.div>
    </div>
  );
};

export default ParallaxBackground;
