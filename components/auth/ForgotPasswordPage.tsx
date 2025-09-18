
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import ForgotPasswordIllustration from './ForgotPasswordIllustration';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const { checkUserExists } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkUserExists(email)) {
      toast.success('Account found! Redirecting to reset password.');
      navigate(`/reset-password/${encodeURIComponent(email)}`);
    } else {
      toast.error('No account found with that email address.');
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <AuthLayout illustration={<ForgotPasswordIllustration />}>
      <motion.div 
        className="bg-slate-50 rounded-2xl p-6 sm:p-10 shadow-2xl"
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
          <motion.h2 variants={itemVariants} className="text-2xl font-bold text-gray-800">Forgot Password</motion.h2>
          <motion.p variants={itemVariants} className="text-gray-500 mt-2 mb-6">Enter your email to reset your password.</motion.p>
        </motion.div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <motion.input
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-white border border-gray-300 rounded-md text-gray-800 placeholder-gray-400 transition-colors duration-300 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-600/20"
            required
          />
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full p-3 mt-2 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-md text-white font-bold shadow-lg"
          >
            Send Reset Link
          </motion.button>
        </form>
        
        <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-gray-500 mt-6 text-center text-sm">
          Remember your password?{' '}
          <Link to="/login" className="font-bold text-indigo-600 hover:underline">
            Log In
          </Link>
        </motion.p>
      </motion.div>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;