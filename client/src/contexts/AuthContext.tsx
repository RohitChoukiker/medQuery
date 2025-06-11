import React, { createContext, useContext, useState } from 'react';

export type UserRole = 'doctor' | 'researcher' | 'patient' | 'admin';

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  licenseNumber?: string;
  institution?: string;
  specialization?: string;
}

interface SignupData {
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
  licenseNumber?: string;
  institution?: string;
  specialization?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  signup: (data: SignupData) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - in real app, this would call your API
    if (email && password) {
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        role
      };
      setUser(mockUser);
      return true;
    }
    return false;
  };

  const signup = async (data: SignupData): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock signup - in real app, this would call your API
    try {
      const newUser: User = {
        id: Date.now().toString(),
        email: data.email,
        name: data.fullName,
        role: data.role,
        licenseNumber: data.licenseNumber,
        institution: data.institution,
        specialization: data.specialization
      };
      
      setUser(newUser);
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};