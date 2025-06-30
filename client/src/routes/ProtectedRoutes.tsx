import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";

const ProtectedRoutes = () => {
  const { auth, loading } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading) {
      if (!auth?.isAuthenticated) {
        navigate("/login");
      } else if (
        location.pathname === "/dashboard" ||
        location.pathname === "/user-page"
      ) {
        
        if (auth.isAdmin && location.pathname !== "/dashboard") {
          navigate("/dashboard");
        } else if (!auth.isAdmin && location.pathname !== "/user-page") {
          navigate("/user-page");
        }
      }
    }
  }, [auth, loading, navigate, location]);

  if (loading)
    return (
      <div className="h-lvh flex justify-center mt-50">
        <span className="loading loading-spinner w-32 h-32 text-blue-600"></span>
      </div>
    );

  return auth?.isAuthenticated ? <Outlet /> : null;
};

export default ProtectedRoutes;
