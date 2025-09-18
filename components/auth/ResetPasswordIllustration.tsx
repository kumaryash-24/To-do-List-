
import React from 'react';
import { motion } from 'framer-motion';

const ResetPasswordIllustration: React.FC = () => (
  <svg width="100%" height="100%" viewBox="0 0 500 500" className="w-full h-auto max-w-sm md:max-w-md">
    <defs>
      <radialGradient id="reset-grad">
        <stop offset="0%" stopColor="#14b8a6" />
        <stop offset="100%" stopColor="#06b6d4" />
      </radialGradient>
       <filter id="resetGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="12" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Key */}
    <motion.g 
        transform="translate(250 250)"
        initial={{ y: 30, opacity: 0, scale: 0.8 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
    >
        <path d="M 50 0 C 22.38 0 0 22.38 0 50 C 0 77.62 22.38 100 50 100 C 77.62 100 100 77.62 100 50 C 100 22.38 77.62 0 50 0 Z M 50 20 C 66.57 20 80 33.43 80 50 C 80 66.57 66.57 80 50 80 C 33.43 80 20 66.57 20 50 C 20 33.43 33.43 20 50 20 Z" fill="url(#reset-grad)" transform="translate(-160, -50)" />
        <path d="M -80 10 L 120 10 L 120 -10 L -80 -10 Z" fill="url(#reset-grad)" />
        <path d="M 80 25 L 80 -25 L 95 -25 L 95 25 Z" fill="url(#reset-grad)" />
        <path d="M 110 25 L 110 -25 L 125 -25 L 125 25 Z" fill="url(#reset-grad)" />
    </motion.g>

    {/* Checkmark */}
     <motion.g 
        transform="translate(250 250)"
        filter="url(#resetGlow)"
     >
        <motion.path 
            d="M 150 150 L 220 220 L 350 90"
            fill="none"
            stroke="url(#reset-grad)"
            strokeWidth="30"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeInOut' }}
        />
    </motion.g>
  </svg>
);

export default ResetPasswordIllustration;