
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import ParallaxBackground from '../ui/ParallaxBackground';
import { Edit, Camera, Check, X } from '../ui/Icons';
import { toast } from 'react-hot-toast';

const ProfilePage: React.FC = () => {
  const { currentUser, updateUser } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(currentUser?.name || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!currentUser) {
    return null; // Should be handled by ProtectedRoute
  }

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        updateUser({ profilePicture: base64String });
        toast.success('Profile picture updated!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNameSave = () => {
    if (name.trim() && name.trim() !== currentUser.name) {
      updateUser({ name: name.trim() });
      toast.success('Name updated successfully!');
    }
    setEditMode(false);
  };
  
  const handleEditClick = () => {
    setName(currentUser.name); // Reset name to current on edit start
    setEditMode(true);
  };
  
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="min-h-screen w-full relative flex items-center justify-center text-white p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ParallaxBackground />
      <motion.div
        className="relative z-10 w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-[#2e2e2e]/80 backdrop-blur-sm p-8 rounded-2xl shadow-neumorphic-dark border border-white/10">
          <motion.h1 variants={itemVariants} className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            My Profile
          </motion.h1>
          
          <motion.div variants={itemVariants} className="relative w-32 h-32 mx-auto mb-6">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center overflow-hidden">
              {currentUser.profilePicture ? (
                <img src={currentUser.profilePicture} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl font-bold">{getInitials(currentUser.name)}</span>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePictureChange}
              accept="image/*"
              className="hidden"
            />
            <motion.button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 bg-[#1e1e1e] p-2 rounded-full border-2 border-purple-500 text-purple-400"
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Change profile picture"
            >
              <Camera size={20} />
            </motion.button>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">Name</p>
              {editMode ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-grow bg-white/10 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    autoFocus
                  />
                  <motion.button onClick={handleNameSave} className="p-2 text-green-400" whileTap={{ scale: 0.9 }}><Check size={20}/></motion.button>
                  <motion.button onClick={() => setEditMode(false)} className="p-2 text-red-400" whileTap={{ scale: 0.9 }}><X size={20}/></motion.button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-xl font-semibold">{currentUser.name}</p>
                  <motion.button onClick={handleEditClick} className="p-2 text-gray-400 hover:text-purple-400" whileTap={{ scale: 0.9 }}><Edit size={18}/></motion.button>
                </div>
              )}
            </div>
            <div className="border-t border-white/10"></div>
            <div>
              <p className="text-sm text-gray-400">Email</p>
              <p className="text-lg font-medium text-gray-300">{currentUser.email}</p>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="text-center mt-8">
            <Link to="/">
              <motion.button
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-md text-white font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Back to Dashboard
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfilePage;