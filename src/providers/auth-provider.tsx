'use client';
import { auth } from '@/firebase/firebase-config';
import { onAuthStateChanged, User } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children, ...props }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const value = { user, setUser };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => setUser(user));
  }, [user]);
  return (
    <AuthContext.Provider value={value as any} {...props}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  if (!context) {
    return { user: null, setUser: () => {} };
  }
  return context;
}
