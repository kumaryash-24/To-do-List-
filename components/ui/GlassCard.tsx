
import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className }) => {
  return (
    <motion.div
      className={`bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
