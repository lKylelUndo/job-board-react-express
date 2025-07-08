import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";

const ProtectedRoutes = () => {
  const { auth, loading } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const adminRoutes: string[] = ["/dashboard", "/admin-settings"];
  const userRoutes: string[] = [
    "/user-page",
    "/profile/me",
    "/jobs",
    "/view-applied-jobs",
    "/apply-employer",
  ];

  useEffect(() => {
    if (!loading) {
      if (!auth?.isAuthenticated) {
        navigate("/login");
      } else {
        // Redirect based on role

        const path = location.pathname;

        if (auth.isAdmin && !adminRoutes.includes(path)) {
          navigate("/dashboard");
        } else if (!auth.isAdmin && !userRoutes.includes(path)) {
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
