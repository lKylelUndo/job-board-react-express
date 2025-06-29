import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";
import { callLogout } from "../services/AuthServices";

const Navbar = () => {
  const { auth, setAuth } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const result = await callLogout();
      if (!result) {
        throw new Error("Failed to logout");
      }

      const { response, responseData } = result;
      console.log(responseData);
      if (response.ok) {
        setAuth(null);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="bg-[#0A0F22] shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="text-[#ebebd3] text-2xl md:text-3xl font-bold tracking-wide  flex items-center gap-x-5">
          <Link to={"/"} className="!text-[#ebebd3]">
            KareraMo
          </Link>

          {auth && (
            <>
              <div className="flex !text-xs !font-semibold">
                <Link to={"/jobs"} className="hover:border-b-2">
                  Job search
                </Link>
              </div>

              <div className="flex !text-xs !font-semibold">
                <Link to={"/profile/me"} className="hover:border-b-2">
                  Profile
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Navigation Items */}
        {auth?.isAuthenticated ? (
          <div className="flex gap-x-5">
            <button
              onClick={handleLogout}
              className="btn btn-neutral !text-[#ebebd3]"
              data-theme="winter"
            >
              Sign out
            </button>
          </div>
        ) : (
          <div className="flex gap-x-5">
            <Link
              to={"/login"}
              className="btn btn-neutral !text-[#ebebd3]"
              data-theme="winter"
            >
              Sign in
            </Link>
          </div>
        )}

        {/* Mobile Menu Icon */}
        <div className="md:hidden text-[#ebebd3]">
          <button className="hover:text-[#56b2bb] transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
