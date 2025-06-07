import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); 
      
  
      const existingUsers = localStorage.getItem('users');
      const users = existingUsers ? JSON.parse(existingUsers) : [];
      

      const existingUser = users.find((u: any) => u.email === email && u.password === password);
      
      if (!existingUser) {
        setIsLoading(false);
        return false;
      }
      
  
      const mockUser = {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const register = async (userData: any): Promise<boolean> => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); 
      
    
      const existingUsers = localStorage.getItem('users');
      const users = existingUsers ? JSON.parse(existingUsers) : [];
      
 
      const userExists = users.some((u: any) => u.email === userData.email);
      if (userExists) {
        setIsLoading(false);
        return false;
      }
      
      
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        email: userData.email,
        name: userData.name,
        password: userData.password 
      };
      
    
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      setUser({
        id: newUser.id,
        email: newUser.email,
        name: newUser.name
      });
      localStorage.setItem('user', JSON.stringify({
        id: newUser.id,
        email: newUser.email,
        name: newUser.name
      }));
      
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('selectedCategories');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
