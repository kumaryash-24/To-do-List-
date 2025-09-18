

import React from 'react';
import { motion } from 'framer-motion';
import { LogOut, Search } from '../ui/Icons';

interface HeaderProps {
  userName: string;
  onLogout: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ userName, onLogout, searchTerm, setSearchTerm }) => {
  return (
    <header 
      className="flex flex-col md:flex-row justify-between items-center mb-12"
    >
      <div className="text-center md:text-left mb-4 md:mb-0">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
          Yash To Do
        </h1>
        <p className="text-gray-400">Welcome back, {userName}!</p>
      </div>
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input 
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#2e2e2e] shadow-neumorphic-dark-inset text-white placeholder-gray-500 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <motion.button 
          onClick={onLogout} 
          className="p-2.5 bg-[#2e2e2e] rounded-full shadow-neumorphic-dark hover:shadow-neumorphic-dark-inset transition-shadow"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Logout"
        >
          <LogOut className="text-gray-300" />
        </motion.button>
      </div>
    </header>
  );
};

export default Header;