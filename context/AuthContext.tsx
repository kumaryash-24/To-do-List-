
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password_plaintext: string) => boolean;
  register: (name: string, email: string, password_plaintext: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useLocalStorage<User[]>('users', []);
  const [currentUser, setCurrentUser] = useLocalStorage<User | null>('currentUser', null);
  
  const login = (email: string, password_plaintext: string): boolean => {
    const user = users.find(u => u.email === email);
    // NOTE: This is a simplified hash for demonstration.
    // In a real app, use a secure library like bcrypt.
    const passwordHash = btoa(password_plaintext);
    if (user && user.passwordHash === passwordHash) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, password_plaintext: string): boolean => {
    if (users.some(u => u.email === email)) {
      return false; // User already exists
    }
    const passwordHash = btoa(password_plaintext);
    const newUser: User = { id: Date.now().toString(), name, email, passwordHash };
    setUsers([...users, newUser]);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
