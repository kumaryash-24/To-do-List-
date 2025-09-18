import React, { useState } from 'react';
// Fix: Import 'Variants' type from framer-motion.
import { motion, Variants } from 'framer-motion';
import { Task } from '../../types';
import GlassCard from '../ui/GlassCard';

interface EditTaskModalProps {
  task: Task;
  onClose: () => void;
  onSave: (id: string, newText: string) => void;
}

// Fix: Explicitly type the variants object with 'Variants' to fix type inference issues.
const backdropVariants: Variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
};

// Fix: Explicitly type the variants object with 'Variants' to fix type inference issues.
const modalVariants: Variants = {
    hidden: { y: "-100vh", opacity: 0 },
    visible: { 
      y: "0", 
      opacity: 1,
      transition: { delay: 0.2, type: "spring", stiffness: 120 }
    }
};

const EditTaskModal: React.FC<EditTaskModalProps> = ({ task, onClose, onSave }) => {
  const [text, setText] = useState(task.text);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSave(task.id, text);
    }
  };

  return (
    <motion.div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
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
          <GlassCard className="w-[90vw] max-w-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Edit Task</h2>
              <form onSubmit={handleSubmit}>
                  <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="w-full h-32 p-3 bg-white/10 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-6"
                  />
                  <div className="flex justify-end gap-4">
                      <motion.button
                          type="button"
                          onClick={onClose}
                          className="px-6 py-2 bg-white/20 rounded-md text-white font-semibold"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                      >
                          Cancel
                      </motion.button>
                      <motion.button
                          type="submit"
                          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-md text-white font-bold"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                      >
                          Save
                      </motion.button>
                  </div>
              </form>
          </GlassCard>
      </motion.div>
    </motion.div>
  );
};

export default EditTaskModal;
