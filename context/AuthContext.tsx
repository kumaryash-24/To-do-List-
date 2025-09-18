
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password_plaintext: string) => boolean;
  register: (name: string, email: string, password_plaintext: string) => boolean;
  logout: () => void;
  checkUserExists: (email: string) => boolean;
  resetPassword: (email: string, new_password_plaintext: string) => boolean;
  updateUser: (updatedData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useLocalStorage<User[]>('users', []);
  const [currentUser, setCurrentUser] = useLocalStorage<User | null>('currentUser', null);
  
  // This effect ensures that if the user's details (e.g., name, profile picture)
  // are updated in another tab (which updates the `users` list in localStorage),
  // the `currentUser` session in this tab is also updated with the fresh data.
  useEffect(() => {
    if (currentUser) {
      const userInList = users.find(u => u.id === currentUser.id);
      // Simple string comparison to check for differences
      if (userInList && JSON.stringify(userInList) !== JSON.stringify(currentUser)) {
        setCurrentUser(userInList);
      }
    }
  }, [users, currentUser, setCurrentUser]);

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
  
  const checkUserExists = (email: string): boolean => {
    return users.some(u => u.email.toLowerCase() === email.toLowerCase());
  };

  const resetPassword = (email: string, new_password_plaintext: string): boolean => {
    const userIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
    if (userIndex !== -1) {
      const updatedUsers = [...users];
      const passwordHash = btoa(new_password_plaintext);
      updatedUsers[userIndex] = { ...updatedUsers[userIndex], passwordHash };
      setUsers(updatedUsers);
      return true;
    }
    return false;
  };

  const updateUser = (updatedData: Partial<User>) => {
    if (!currentUser) return;

    // Update the currentUser state
    const updatedCurrentUser = { ...currentUser, ...updatedData };
    setCurrentUser(updatedCurrentUser);

    // Update the user in the global users list
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
      const updatedUsers = [...users];
      updatedUsers[userIndex] = updatedCurrentUser;
      setUsers(updatedUsers);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, checkUserExists, resetPassword, updateUser }}>
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