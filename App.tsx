
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import DashboardPage from './components/dashboard/DashboardPage';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
    return (
        <AnimatePresence mode="wait">
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route 
                    path="/" 
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    } 
                />
            </Routes>
        </AnimatePresence>
    );
};


const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
          <AppRoutes />
      </HashRouter>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#3a3a3a',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          },
        }}
      />
    </AuthProvider>
  );
};

export default App;