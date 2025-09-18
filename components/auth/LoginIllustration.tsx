
import React from 'react';
import { motion } from 'framer-motion';

const LoginIllustration = () => (
  <svg width="100%" height="100%" viewBox="0 0 500 500" className="w-full h-auto max-w-sm md:max-w-md">
    <defs>
      <linearGradient id="login-grad-pen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
       <filter id="loginGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="6" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    
    {/* Paper */}
    <motion.g
      initial={{ rotate: -5, y: 10 }}
      animate={{ rotate: [-5, 0, -5], y: [10, -10, 10] }}
      transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
    >
      <path 
        d="M100 150 H 400 V 380 H 100 Z" 
        fill="#f8fafc" 
        stroke="#e2e8f0" 
        strokeWidth="2"
        rx="15"
        style={{ filter: 'drop-shadow(0 10px 8px rgb(0 0 0 / 0.1))' }}
      />
    </motion.g>

    {/* Signature spelling "Yash" */}
    <motion.path
      d="M 150 280 C 173 240, 172 240, 200 280 L 175 330 C 197 304, 219 281, 240 300 C 260 280, 270 320, 250 320 C 230 320, 260 280, 290 300 C 310 320, 280 340, 300 320 L 320 260 L 320 330 C 320 300, 340 300, 360 330"
      fill="none"
      stroke="url(#login-grad-pen)"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
      filter="url(#loginGlow)"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 3, ease: 'easeInOut', delay: 0.5 }}
    />

    {/* Pen */}
    <motion.g
      initial={{ x: 150, y: 280, rotate: 20 }}
      animate={{ 
          x: [150, 175, 250, 290, 320, 360],
          y: [280, 330, 320, 300, 260, 330],
          rotate: [20, -10, 15, -5, 25, 10]
      }}
      transition={{ duration: 3, ease: 'easeInOut', delay: 0.5 }}
    >
      <path
        d="M 0 0 L 10 -10 L 120 -10 L 130 0 L 120 10 L 10 10 Z"
        fill="url(#login-grad-pen)"
        transform="translate(-135, 0)"
      />
      <path
        d="M 10 -10 L 0 0 L 10 10 L 25 -10 Z"
        fill="#475569"
        transform="translate(-135, 0)"
      />
    </motion.g>
  </svg>
);

export default LoginIllustration;
