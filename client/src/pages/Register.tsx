import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="h-lvh w-96 sm:w-3/4 mt-2 mx-auto flex justify-center p-3 pt-11">
      <div className="md:w-3/5 w-96 max-h-[580px] border-2 rounded-lg shadow border-gray-200 p-5">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <form>
          <div className="flex flex-col my-6">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="border border-gray-300 rounded p-3 focus:outline"
            />
          </div>

          <div className="flex flex-col my-6">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="border border-gray-300 rounded p-3 focus:outline"
            />
          </div>

          <div className="flex flex-col mt-6">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="border border-gray-300 rounded p-3 focus:outline"
            />
          </div>

          <div className="flex flex-col mt-6">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="border border-gray-300 rounded p-3 focus:outline"
            />
          </div>
          <div className="mt-3">
            <button className="bg-[#083d77] text-white p-2 w-full rounded hover:opacity-60 transition">
              Register
            </button>
          </div>
        </form>
        <div className="mt-10">
          <p>
            Already have an account?{" "}
            <span>
              <Link
                to={"/login"}
                className="!text-[#051c34] link font-semibold"
              >
                Login
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
