import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { postLogin } from '../services/POST/Login';
import { PostLogin } from '../services/POST/Login/interface';
import { LoginFormData } from '../validations/common/LoginScreen';

interface AuthContextData {
  user: PostLogin.User | null;
  employee: PostLogin.Employee | null;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  signIn(data: LoginFormData): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<PostLogin.User | null>(null);
  const [employee, setEmployee] = useState<PostLogin.Employee | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function signIn({ userCPF, password }: LoginFormData) {
    try {
      setIsLoading(true);
      const response = await postLogin({
        userCPF: userCPF,
        password: password,
      });

      if (response.return) {
        await AsyncStorage.setItem(
          '@Auth:user',
          JSON.stringify(response.return.user),
        );
        await AsyncStorage.setItem(
          '@Auth:employee',
          JSON.stringify(response.return.employee),
        );
        setUser(response.return.user);
        setEmployee(response.return.employee);
      }
    } catch (error) {
      throw error;
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    }
  }

  async function signOut() {
    setIsLoading(true);
    await AsyncStorage.removeItem('@Auth:user');

    setUser(null);
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }

  async function loadStorageData() {
    try {
      const storagedUser = await AsyncStorage.getItem('@Auth:user');
      const storagedEmployee = await AsyncStorage.getItem('@Auth:employee');

      if (storagedUser) {
        setUser(JSON.parse(storagedUser));
      }
      if (storagedEmployee) {
        setEmployee(JSON.parse(storagedEmployee));
      }
    } catch (error) {
      console.log('Error loading storage data:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadStorageData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        employee,
        isLoading,
        setIsLoading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}

export { AuthProvider, useAuth };
