import React from 'react';
import { motion } from 'framer-motion';

const LoginIllustration = () => (
  <svg width="100%" height="100%" viewBox="0 0 500 500" className="w-full h-auto max-w-sm md:max-w-md">
    <defs>
      <filter id="loginGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="8" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <radialGradient id="login-grad">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#a855f7" />
      </radialGradient>
    </defs>

    {/* Background shape */}
    <motion.path
      d="M100,250 C100,167 167,100 250,100 C333,100 400,167 400,250 C400,333 333,400 250,400 C167,400 100,333 100,250"
      fill="none"
      stroke="url(#login-grad)"
      strokeWidth="4"
      strokeOpacity="0.4"
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
    />

    {/* Keyhole */}
    <g transform="translate(250 250)" filter="url(#loginGlow)">
      <motion.g
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 4, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      >
        <motion.circle
          cy="-40"
          r="50"
          fill="url(#login-grad)"
          initial={{ y: -45 }}
          animate={{ y: -35 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        />
        <motion.path
          d="M -30 20 L -30 100 Q -30 120 0 120 Q 30 120 30 100 L 30 20 Z"
          fill="url(#login-grad)"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0.95 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 0.5 }}
          style={{ transformOrigin: 'top' }}
        />
      </motion.g>
    </g>
  </svg>
);
export default LoginIllustration;