
import React from 'react';
// Fix: Import 'Variants' type from framer-motion.
import { motion, AnimatePresence, Variants } from 'framer-motion';
import GlassCard from './GlassCard';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: React.ReactNode;
}

// Fix: Explicitly type the variants object with 'Variants' to fix type inference issues.
const backdropVariants: Variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
};

// Fix: Explicitly type the variants object with 'Variants' to fix type inference issues.
const modalVariants: Variants = {
    hidden: { y: "-50px", opacity: 0 },
    visible: { 
      y: "0", 
      opacity: 1,
      transition: { type: "spring", stiffness: 150, damping: 20 }
    }
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
        >
            <motion.div
                onClick={e => e.stopPropagation()}
                variants={modalVariants}
            >
              <GlassCard className="w-[90vw] max-w-md p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
                  <div className="text-gray-300 mb-8">
                    {children}
                  </div>
                  <div className="flex justify-end gap-4">
                      <motion.button
                          type="button"
                          onClick={onClose}
                          className="px-6 py-2 bg-white/20 rounded-md text-white font-semibold"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                      >
                          No
                      </motion.button>
                      <motion.button
                          type="button"
                          onClick={onConfirm}
                          className="px-6 py-2 bg-red-500/80 hover:bg-red-500 rounded-md text-white font-bold"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                      >
                          Yes
                      </motion.button>
                  </div>
              </GlassCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;
