
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, Link, useParams } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import ResetPasswordIllustration from './ResetPasswordIllustration';
import { Eye, EyeOff } from '../ui/Icons';

const ResetPasswordPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { resetPassword, checkUserExists } = useAuth();
  const navigate = useNavigate();
  const { email } = useParams<{ email: string }>();
  const decodedEmail = email ? decodeURIComponent(email) : '';

  useEffect(() => {
    if (!decodedEmail || !checkUserExists(decodedEmail)) {
        toast.error("Invalid reset link or user not found.");
        navigate('/forgot-password');
    }
  }, [decodedEmail, checkUserExists, navigate]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    if (resetPassword(decodedEmail, password)) {
      toast.success('Password reset successfully! Please log in.');
      navigate('/login');
    } else {
        toast.error('Could not reset password. Please try again.');
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <AuthLayout illustration={<ResetPasswordIllustration />}>
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
          <motion.h2 variants={itemVariants} className="text-2xl font-bold text-gray-800">Reset Your Password</motion.h2>
          <motion.p variants={itemVariants} className="text-gray-500 mt-2 mb-6">Enter a new password for {decodedEmail}</motion.p>
        </motion.div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="relative"
            >
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 bg-white border border-gray-300 rounded-md text-gray-800 placeholder-gray-400 transition-colors duration-300 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-600/20 pr-10"
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
                transition={{ duration: 0.4, delay: 0.3 }}
                className="relative"
            >
                <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-3 bg-white border border-gray-300 rounded-md text-gray-800 placeholder-gray-400 transition-colors duration-300 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-600/20 pr-10"
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
            transition={{ duration: 0.4, delay: 0.4 }}
            whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full p-3 mt-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-md text-white font-bold shadow-lg"
          >
            Set New Password
          </motion.button>
        </form>
        
        <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-gray-500 mt-6 text-center text-sm">
          <Link to="/login" className="font-bold text-teal-600 hover:underline">
            Back to Log In
          </Link>
        </motion.p>
      </motion.div>
    </AuthLayout>
  );
};

export default ResetPasswordPage;