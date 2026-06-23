import { createContext, useContext, useState, useEffect } from 'react';
import { 
  register as registerService, 
  login as loginService, 
  logout as logoutService,
  getCurrentUser,
  isAuthenticated,
  isAdmin,
  getAuthHeaders
} from '../services/authService';
import { toast } from 'sonner';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      if (isAuthenticated()) {
        const currentUser = getCurrentUser();
        setUser(currentUser);
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const register = async (name, email, password) => {
    try {
      const data = await registerService(name, email, password);
      setUser(data.user);
      toast.success('Registration successful!');
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Registration failed');
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const data = await loginService(email, password);
      setUser(data.user);
      toast.success('Login successful!');
      return data;
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message || 'Login failed');
      throw error;
    }
  };

  const logout = () => {
    logoutService();
    setUser(null);
    toast.success('Logged out successfully');
  };

  const updateProfile = async (name, email) => {
    try {
      const data = await updateProfile(name, email);
      setUser(data.user);
      toast.success('Profile updated successfully!');
      return data;
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error(error.message || 'Profile update failed');
      throw error;
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      const data = await changePassword(currentPassword, newPassword);
      toast.success('Password changed successfully!');
      return data;
    } catch (error) {
      console.error('Password change error:', error);
      toast.error(error.message || 'Password change failed');
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        register,
        login,
        logout,
        updateProfile,
        changePassword,
        getAuthHeaders
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
