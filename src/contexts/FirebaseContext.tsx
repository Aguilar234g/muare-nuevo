import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: 'admin' | 'user';
}

interface FirebaseContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};

interface FirebaseProviderProps {
  children: ReactNode;
}

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Simulación de login
    if (email === 'admin_muare@gmail.com' && password === 'admin123') {
      setUser({ uid: '1', email, displayName: 'Admin', role: 'admin' });
    } else {
      setUser({ uid: '2', email, displayName: 'Usuario', role: 'user' });
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    // Simulación de registro
    setUser({ uid: '3', email, displayName: name, role: 'user' });
  };

  const logout = async () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    signup,
    logout
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};