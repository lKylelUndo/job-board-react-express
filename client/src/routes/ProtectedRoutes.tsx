import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";

const ProtectedRoutes = () => {
  const { auth } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.isAuthenticated) {
      navigate("/login");
    }
  }, [auth]);

  return auth?.isAuthenticated ? <Outlet /> : null;
};

export default ProtectedRoutes;
