import React from 'react';
import ParallaxBackground from '../ui/ParallaxBackground';
import { motion, Variants } from 'framer-motion';

interface AuthLayoutProps {
  children: React.ReactNode;
  illustration: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, illustration }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
    exit: {
        opacity: 0,
        transition: {
            when: "afterChildren",
            staggerChildren: 0.1,
            staggerDirection: -1,
        }
    }
  };

  const panelVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] } },
    exit: { opacity: 0, x: -30, transition: { duration: 0.4, ease: "easeIn" } }
  };
  
  const formVariants: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] } },
    exit: { opacity: 0, x: 30, transition: { duration: 0.4, ease: "easeIn" } }
  };

  return (
    <div className="fixed inset-0 w-full flex items-center justify-center p-4 overflow-hidden">
      <ParallaxBackground />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-full max-w-5xl z-10 grid md:grid-cols-2 gap-8 items-center"
      >
        <motion.div 
          className="hidden md:flex justify-center items-center"
          variants={panelVariants}
        >
          {illustration}
        </motion.div>
        
        <motion.div variants={formVariants}>
          {children}
        </motion.div>
        
      </motion.div>
    </div>
  );
};

export default AuthLayout;