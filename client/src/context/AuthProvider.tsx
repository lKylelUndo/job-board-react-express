import React, { createContext, useContext, useEffect, useState } from "react";
import { callVerify } from "../services/AuthServices";

type AuthContextType = {
  auth: AuthType | undefined;
  setAuth: React.Dispatch<React.SetStateAction<any>>;
};

type AuthType = {
  isAuthenticated: string | boolean;
  userId: number | null;
  username: string;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthType>({
    userId: null,
    username: "",
    isAdmin: false,
    isAuthenticated: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      const result = await callVerify();
      if (result?.response.ok) {
        const { id, username, isAdmin } = result.responseData;
        setAuth({
          userId: id,
          username,
          isAdmin,
          isAuthenticated: true,
        });
        setLoading(false);
      } else {
        setAuth({
          userId: null,
          username: "",
          isAdmin: false,
          isAuthenticated: false,
        });
      }
    };

    verifyUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuthContext must be used within an AuthProvider");

  return context;
};
