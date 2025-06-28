import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = {
        username,
        email,
        password,
        confirmPassword,
      };

      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      console.log(responseData);

      if (response.ok) {
        navigate("/login");
      } else {
        const errorsObj: Record<string, string> = {};

        responseData.errors.forEach((error: Record<string, string>) => {
          errorsObj[error.path] = error.msg;
        });

        console.log(errorsObj);
        setErrors(errorsObj);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-lvh w-96 sm:w-3/4 mt-2 mx-auto flex justify-center p-3 pt-11">
      <div className="md:w-3/5 w-96 max-h-[630px] border-2 rounded-lg shadow border-gray-200 p-5">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <form onSubmit={handleRegister}>
          <div className="flex flex-col my-6">
            <label htmlFor="username">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              required
              id="username"
              name="username"
              className="border border-gray-300 rounded p-3 focus:outline text-[#051c34]"
            />
            {errors.username && (
              <p className="!text-red-700">{errors.username}</p>
            )}
          </div>

          <div className="flex flex-col my-6">
            <label htmlFor="email">Email Address</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              id="email"
              name="email"
              className="border border-gray-300 rounded p-3 focus:outline text-[#051c34]"
            />
            {errors.email && <p className="!text-red-700">{errors.email}</p>}
          </div>

          <div className="flex flex-col mt-6">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              className="border border-gray-300 rounded p-3 focus:outline text-[#051c34]"
            />
            {errors.password && (
              <p className="!text-red-700">{errors.password}</p>
            )}
          </div>

          <div className="flex flex-col mt-6">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="border border-gray-300 rounded p-3 focus:outline text-[#051c34]"
            />
            {errors.confirmPassword && (
              <p className="!text-red-700">{errors.confirmPassword}</p>
            )}
          </div>
          <div className="mt-3">
            <button
              type="submit"
              className="bg-[#083d77] text-white p-2 w-full rounded hover:opacity-60 transition"
            >
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
