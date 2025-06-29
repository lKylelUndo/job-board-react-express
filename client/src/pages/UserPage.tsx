import React, { useEffect } from "react";
import { useAuthContext } from "../context/AuthProvider";
import { Link } from "react-router-dom";

const UserPage = () => {
  const { auth } = useAuthContext();

  useEffect(() => {
    console.log(auth);
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-16 p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Welcome to Your Career Portal
      </h1>
      <p className="text-md text-gray-700 mb-6">
        To begin your professional journey with us, please complete your
        profile. This will help us tailor opportunities that align with your
        goals and expertise.
      </p>

      <Link
        to="/profile/me"
        className="inline-block px-5 py-3 bg-blue-700 text-white text-sm font-medium rounded-md hover:bg-blue-800 transition"
      >
        Proceed to Profile Setup
      </Link>
    </div>
  );
};

export default UserPage;
