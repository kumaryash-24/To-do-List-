
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from '../ui/Icons';

interface AddTaskFormProps {
  onAddTask: (text: string) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTask(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 md:gap-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new brilliant task..."
        className="flex-grow bg-[#2e2e2e] shadow-neumorphic-dark-inset text-white placeholder-gray-500 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
      />
      <motion.button
        type="submit"
        className="bg-gradient-to-br from-purple-600 to-blue-500 text-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <Plus size={24} />
      </motion.button>
    </form>
  );
};

export default AddTaskForm;
