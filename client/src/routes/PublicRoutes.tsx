import React, { useEffect } from "react";
import { useAuthContext } from "../context/AuthProvider";
import { Outlet, useNavigate } from "react-router-dom";

const PublicRoutes = () => {
  const { auth, loading } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.isAuthenticated && !loading) {
      if (auth.isAdmin) {
        navigate("/dashboard");
      } else {
        navigate("/user-page");
      }
    }
  }, [auth]);

  if (loading)
    return (
      <div className="h-lvh flex justify-center mt-50">
        <span className="loading loading-spinner w-32 h-32 text-blue-600"></span>
      </div>
    );

  return !auth?.isAuthenticated ? <Outlet/> : null;
};

export default PublicRoutes;
