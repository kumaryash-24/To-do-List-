import React from 'react';
// Fix: Import AnimatePresence for exit animations.
import { motion, AnimatePresence } from 'framer-motion';
import { Task } from '../../types';
import { Trash2, Edit, Check } from '../ui/Icons';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, onEdit }) => {
    const variants = {
        initial: { opacity: 0, y: 20, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, x: -50, transition: { duration: 0.2 } },
    };

  return (
    <motion.div
        layout
        variants={variants}
        initial="initial"
        animate={{
            backgroundColor: task.completed ? "rgba(42, 42, 42, 0.5)" : "rgba(60, 60, 60, 0.5)",
            opacity: 1, 
            y: 0, 
            scale: 1
        }}
        exit="exit"
        transition={{ duration: 0.3, ease: "easeInOut" }}
        whileHover={{ scale: 1.02, backgroundColor: task.completed ? "rgba(42, 42, 42, 0.5)" : "rgba(74, 74, 74, 0.5)" }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(event, info) => {
            if (info.offset.x < -100) {
                onDelete(task.id);
            }
        }}
        className={`flex items-center p-4 my-2 rounded-xl cursor-grab active:cursor-grabbing ${task.completed ? 'shadow-neumorphic-dark-inset' : 'shadow-neumorphic-dark'}`}
    >
      <motion.button 
        onClick={() => onToggle(task.id)}
        className={`w-7 h-7 rounded-full border-2 flex-shrink-0 mr-4 flex items-center justify-center transition-all ${task.completed ? 'border-purple-500 bg-purple-500' : 'border-gray-500 hover:border-purple-400'}`}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence>
        {task.completed && (
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
            >
                <Check className="text-white" size={18}/>
            </motion.div>
        )}
        </AnimatePresence>
      </motion.button>
      <motion.span 
        className="flex-grow"
        animate={{
            color: task.completed ? "#6b7280" : "#d1d5db",
            textDecoration: task.completed ? "line-through" : "none"
        }}
        transition={{ duration: 0.3 }}
      >
        {task.text}
      </motion.span>
      <div className="flex items-center gap-2 ml-4">
        <motion.button onClick={() => onEdit(task)} className="p-2 text-gray-400 hover:text-blue-400" whileTap={{ scale: 0.9 }}><Edit size={18}/></motion.button>
        <motion.button onClick={() => onDelete(task.id)} className="p-2 text-gray-400 hover:text-red-400" whileTap={{ scale: 0.9 }}><Trash2 size={18}/></motion.button>
      </div>
    </motion.div>
  );
};

export default TaskItem;