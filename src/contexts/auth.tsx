import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { LoginFormData } from "../validations/LoginScreen";
import { SignInWithCredentials } from "./mock";

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
  signIn(data: LoginFormData): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function signIn({ userCPF, password }: LoginFormData) {
    setIsLoading(true);
    const { error, data } = SignInWithCredentials({
      userCPF: userCPF,
      password: password,
    });

    if (data) {
      await AsyncStorage.setItem("@Auth:user", JSON.stringify(data));
      await AsyncStorage.setItem("@Auth:token", data.session);
      setUser(data);
    }

    if (error) {
      Alert.alert(error.message);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }

  async function signOut() {
    setIsLoading(true);
    await AsyncStorage.removeItem("@Auth:user");
    await AsyncStorage.removeItem("@Auth:token");
    setUser(null);
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }

  async function loadStorageData() {
    try {
      const storagedUser = await AsyncStorage.getItem("@Auth:user");
      const storagedToken = await AsyncStorage.getItem("@Auth:token");

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
        setToken(storagedToken);
      }
    } catch (error) {
      console.log("Error loading storage data:", error);
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
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}

export { AuthProvider, useAuth };
