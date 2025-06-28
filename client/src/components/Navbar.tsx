import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-[#0A0F22] shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="text-[#ebebd3] text-2xl md:text-3xl font-bold tracking-wide">
          <Link to={'/'} className="!text-[#ebebd3]">KareraMo</Link>
        </div>

        {/* Navigation Items */}
       

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
