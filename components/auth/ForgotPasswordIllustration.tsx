
import React from 'react';
import { motion } from 'framer-motion';

const ForgotPasswordIllustration: React.FC = () => (
  <svg width="100%" height="100%" viewBox="0 0 500 500" className="w-full h-auto max-w-sm md:max-w-md">
    <defs>
      <radialGradient id="forgot-grad">
        <stop offset="0%" stopColor="#4f46e5" />
        <stop offset="100%" stopColor="#3b82f6" />
      </radialGradient>
       <filter id="forgotGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="10" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Key */}
    <motion.g 
        transform="translate(180 250) rotate(-30)"
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
    >
        <path d="M 50 0 C 22.38 0 0 22.38 0 50 C 0 77.62 22.38 100 50 100 C 77.62 100 100 77.62 100 50 C 100 22.38 77.62 0 50 0 Z M 50 20 C 66.57 20 80 33.43 80 50 C 80 66.57 66.57 80 50 80 C 33.43 80 20 66.57 20 50 C 20 33.43 33.43 20 50 20 Z" fill="url(#forgot-grad)" />
        <path d="M 80 60 L 200 60 L 200 40 L 80 40 Z" fill="url(#forgot-grad)" />
        <path d="M 160 75 L 160 25 L 175 25 L 175 75 Z" fill="url(#forgot-grad)" />
        <path d="M 190 75 L 190 25 L 205 25 L 205 75 Z" fill="url(#forgot-grad)" />
    </motion.g>

    {/* Question Mark */}
    <motion.g
        transform="translate(350 250)"
        filter="url(#forgotGlow)"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4, type: 'spring' }}
    >
        <text
            x="0"
            y="0"
            fontFamily="Arial, sans-serif"
            fontSize="150"
            fontWeight="bold"
            fill="url(#forgot-grad)"
            textAnchor="middle"
            dominantBaseline="central"
        >
            ?
        </text>
    </motion.g>
  </svg>
);

export default ForgotPasswordIllustration;