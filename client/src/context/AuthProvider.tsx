import React, { createContext, useContext, useState } from "react";

type AuthContextType = {
  auth: AuthType | undefined;
  setAuth: React.Dispatch<React.SetStateAction<any>>;
};

type AuthType = {
  username: string;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthType>({username: "", isAdmin: false});
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
