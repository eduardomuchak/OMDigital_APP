import React, { createContext, useContext, useState } from 'react';
import { useMMKVObject } from 'react-native-mmkv';
import { postLogin } from '../services/POST/Login';
import { PostLogin } from '../services/POST/Login/interface';
import { LoginFormData } from '../validations/common/LoginScreen';

interface AuthContextData {
  user: PostLogin.User | undefined;
  employee: PostLogin.Employee | undefined;
  isLoading: boolean;
  signIn(data: LoginFormData): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useMMKVObject<PostLogin.User>('user');
  const [employee, setEmployee] = useMMKVObject<PostLogin.Employee>('employee');
  const [isLoading, setIsLoading] = useState(false);

  async function signIn({ user, password }: LoginFormData) {
    try {
      setIsLoading(true);
      const response = await postLogin({
        user: user,
        password: password,
      });

      if (response.return) {
        setUser(response.return.user);
        setEmployee(response.return.employee);
      }
    } catch (error) {
      console.error('Error on signIn: ', error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    }
  }

  async function signOut() {
    try {
      setIsLoading(true);
      setUser(undefined);
      setEmployee(undefined);
      // storage.clearAll();
    } catch (error) {
      console.error('Error signing out: ', error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        employee,
        isLoading,
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
