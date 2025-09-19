import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Eye, EyeOff, GitHub, LinkedIn } from '../ui/Icons';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      const errorMessage = "Passwords don't match";
      setError(errorMessage);
      toast.error(errorMessage);
      return;
    }
    if (!register(name, email, password)) {
      const errorMessage = 'An account with this email already exists.';
      setError(errorMessage);
      toast.error(errorMessage);
    } else {
      toast.success('Registration successful! Please log in.');
      navigate('/login');
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <AuthLayout>
      <motion.div
        className="bg-slate-50 rounded-2xl p-6 sm:p-8 shadow-2xl"
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
          <motion.h2 variants={itemVariants} className="text-2xl font-bold text-gray-800">Create an Account</motion.h2>
          <motion.p variants={itemVariants} className="text-gray-500 mt-2 mb-6">Let's get you started!</motion.p>
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
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 bg-white border border-gray-300 rounded-md text-gray-800 placeholder-gray-400 transition-colors duration-300 focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-600/20"
                required
            />
            <motion.input
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-white border border-gray-300 rounded-md text-gray-800 placeholder-gray-400 transition-colors duration-300 focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-600/20"
                required
            />
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="relative"
            >
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 bg-white border border-gray-300 rounded-md text-gray-800 placeholder-gray-400 transition-colors duration-300 focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-600/20 pr-10"
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
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="relative"
            >
                <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-3 bg-white border border-gray-300 rounded-md text-gray-800 placeholder-gray-400 transition-colors duration-300 focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-600/20 pr-10"
                    required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </motion.div>
            <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full p-3 mt-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-md text-white font-bold shadow-lg"
            >
                Create Account
            </motion.button>
        </form>

        <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-gray-500 mt-6 text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-pink-600 hover:underline">
                Log In
            </Link>
        </motion.p>
        
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-6 pt-4 border-t border-gray-200 flex justify-center items-center gap-5"
        >
            <a href="https://github.com/kumaryash-24" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="GitHub Profile">
                <GitHub size={24} />
            </a>
            <a href="https://www.linkedin.com/in/kumar-yash-592973227" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors" aria-label="LinkedIn Profile">
                <LinkedIn size={24} />
            </a>
        </motion.div>
      </motion.div>
    </AuthLayout>
  );
};

export default RegisterPage;