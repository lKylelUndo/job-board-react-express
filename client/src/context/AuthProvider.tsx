import React, { createContext, useContext, useEffect, useState } from "react";
import { callVerify } from "../services/AuthServices";

type AuthContextType = {
  auth: AuthType | undefined;
  setAuth: React.Dispatch<React.SetStateAction<any>>;
  loading: boolean;
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
        console.log(result.responseData);
        const { id, username, isAdmin } = result.responseData.user;
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

      setLoading(false);
    };

    verifyUser();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
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
