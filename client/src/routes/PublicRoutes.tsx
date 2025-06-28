import React from "react";
import { useAuthContext } from "../context/AuthProvider";

const PublicRoutes = ({ children }: { children: React.ReactNode }) => {
  const { auth } = useAuthContext();
  return <div>{auth ? children : null}</div>;
};

export default PublicRoutes;
