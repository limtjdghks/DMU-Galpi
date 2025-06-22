import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {api} from '../AxiosInstance';

interface AuthContextType {
  isAuthenticated: boolean;
  username: string | null;
  refreshAuth: () => Promise<void>;  // 👈 추가
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  username: null,
  refreshAuth: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  const checkAuthStatus = async () => {
    try {
      const res = await api.get('/api/status', { withCredentials: true });
      const data = res.data;

      if (data.isAuthenticated) {
        setIsAuthenticated(true);
        setUsername(data.username);
      } else {
        setIsAuthenticated(false);
        setUsername(null);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUsername(null);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const refreshAuth = async () => {
    await checkAuthStatus(); // 외부에서 호출 가능하게 만듦
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
