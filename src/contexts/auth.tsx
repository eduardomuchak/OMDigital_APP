import 'react-native-url-polyfill/auto';
import { MMKV } from 'react-native-mmkv';

import React, { createContext, useState, useContext, useEffect } from 'react';

import { Alert } from 'react-native';
import { SignInWithCredentials } from './mock';

interface User {
  user: string;
  role: string;
  session: string;
}

interface AuthContextData {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  signIn({ userCPF, password }: { userCPF: string; password: string }): Promise<void>;
  signOut(): void;
}

const storage = new MMKV({ id: 'auth' });

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function signIn({ userCPF, password }: { userCPF: string; password: string }) {
    setIsLoading(true);
    const { error, data } = SignInWithCredentials({
      userCPF: userCPF,
      password: password,
    });

    if (data) {
      const user = data;
      const accessToken = data.session;

      storage.set('user', JSON.stringify(user));
      storage.set('token', accessToken);
    }

    if (error) {
      Alert.alert('Email ou senha inválidos');
    }
    setIsLoading(false);
  }

  async function signOut() {
    setIsLoading(true);
    storage.delete('user');
    storage.delete('token');
    setUser(null);
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }

  function loadStorageData() {
    const storagedUser = storage.getString('user');
    const storagedToken = storage.getString('token');
    // storage.clearAll();

    if (storagedUser && storagedToken) {
      setUser(JSON.parse(storagedUser));
      setToken(storagedToken);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    loadStorageData();
    const listener = storage.addOnValueChangedListener((changedKey) => {
      const newValue = storage.getString(changedKey);
      // console.log(`The value of ${changedKey} changed to ${newValue}`);

      if (changedKey === 'user') {
        if (!newValue) return setUser(null);
        setUser(JSON.parse(newValue));
      }
      if (changedKey === 'token') {
        if (!newValue) return setToken(null);
        setToken(newValue);
      }
    });
    return () => listener.remove();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
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
