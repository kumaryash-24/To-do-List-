import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Eye, EyeOff } from '../ui/Icons';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!login(email, password)) {
      const errorMessage = 'Invalid email or password';
      setError(errorMessage);
      toast.error(errorMessage);
    } else {
      toast.success('Login successful! Welcome back.');
      navigate('/');
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <AuthLayout>
      <motion.div 
        className="bg-slate-50 rounded-2xl p-6 sm:p-10 shadow-2xl max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
            className="text-center"
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.1 }}
        >
          <motion.h2 variants={itemVariants} className="text-2xl font-bold text-gray-800">Welcome Back</motion.h2>
          <motion.p variants={itemVariants} className="text-gray-500 mt-2 mb-6">Sign in to continue to your dashboard.</motion.p>
        </motion.div>
        
        <AnimatePresence>
            {error && (
                <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-red-100 text-red-700 p-3 rounded-md mb-6 text-center text-sm"
                >
                    {error}
                </motion.p>
            )}
        </AnimatePresence>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <motion.input
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-white border border-gray-300 rounded-md text-gray-800 placeholder-gray-400 transition-colors duration-300 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-600/20"
            required
          />
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="relative"
          >
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-white border border-gray-300 rounded-md text-gray-800 placeholder-gray-400 transition-colors duration-300 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-600/20 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </motion.div>
          <div className="text-right -mt-2">
            <Link to="/forgot-password" className="text-sm font-medium text-purple-600 hover:underline">
              Forgot Password?
            </Link>
          </div>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full p-3 mt-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-md text-white font-bold shadow-lg"
          >
            Log In
          </motion.button>
        </form>
        
        <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-gray-500 mt-6 text-center text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-purple-600 hover:underline">
            Sign Up
          </Link>
        </motion.p>
      </motion.div>
    </AuthLayout>
  );
};

export default LoginPage;
