import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'doctor' | 'researcher' | 'patient' | 'admin';

interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  license_number?: string;
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

// API URL
const API_URL = 'http://127.0.0.1:8000';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch(`${API_URL}/auth/me`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            const userData = await response.json();
            setUser({
              id: userData.id.toString(),
              email: userData.email,
              full_name: userData.full_name,
              role: userData.role as UserRole,
              license_number: userData.license_number,
              institution: userData.institution,
              specialization: userData.specialization
            });
          } else {
            // Token is invalid or expired
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          localStorage.removeItem('token');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, role })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Login failed:', errorData);
        throw new Error(errorData.detail || 'Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.access_token);

      // Fetch user data
      const userResponse = await fetch(`${API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${data.access_token}`
        }
      });

      if (userResponse.ok) {
        const userData = await userResponse.json();
        setUser({
          id: userData.id.toString(),
          email: userData.email,
          full_name: userData.full_name,
          role: userData.role as UserRole,
          license_number: userData.license_number,
          institution: userData.institution,
          specialization: userData.specialization
        });
        return true;
      }
      
      throw new Error('Failed to fetch user data');
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Re-throw to handle in component
    }
  };

  const signup = async (data: SignupData): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: data.email,
          full_name: data.fullName,
          password: data.password,
          role: data.role,
          license_number: data.licenseNumber,
          institution: data.institution,
          specialization: data.specialization
        })
      });

      if (!response.ok) {
        return false;
      }

      // After signup, log the user in
      return await login(data.email, data.password, data.role);
    } catch (error) {
      console.error('Signup failed:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  if (isLoading) {
    // You could return a loading component here
    return <div>Loading...</div>;
  }

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