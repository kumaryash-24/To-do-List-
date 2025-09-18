
import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from '../components/ui/Icons';

type ToastType = 'success' | 'info' | 'warning' | 'error';

interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  addToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const ToastIcons: { [key in ToastType]: React.ReactElement } = {
    success: <Check size={20} className="text-green-400" />,
    info: <Check size={20} className="text-blue-400" />,
    warning: <Check size={20} className="text-yellow-400" />,
    error: <Check size={20} className="text-red-400" />,
};


const Toast: React.FC<{ message: ToastMessage; onDismiss: (id: string) => void }> = ({ message, onDismiss }) => {
    React.useEffect(() => {
        const timer = setTimeout(() => {
            onDismiss(message.id);
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, [message.id, onDismiss]);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 50, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8, transition: { duration: 0.2 } }}
            className="flex items-center gap-4 w-full max-w-sm p-4 bg-[#3a3a3a]/80 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg"
        >
            {ToastIcons[message.type]}
            <p className="text-white text-sm font-medium">{message.message}</p>
        </motion.div>
    );
};


export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Date.now().toString() + Math.random();
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
  }, []);
  
  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-[100] flex flex-col items-end gap-3">
        <AnimatePresence>
            {toasts.map((toast) => (
                <Toast key={toast.id} message={toast} onDismiss={removeToast} />
            ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
