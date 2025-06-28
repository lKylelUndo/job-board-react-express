import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";

const ProtectedRoutes = () => {
  const { auth, loading } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.isAuthenticated && !loading) {
      navigate("/login");
    }
  }, [auth, loading]);

  if (loading)
    return (
      <div className="h-lvh flex justify-center mt-50">
        <span className="loading loading-spinner w-32 h-32 text-blue-600"></span>
      </div>
    );

  return auth?.isAuthenticated ? <Outlet /> : null;
};

export default ProtectedRoutes;
