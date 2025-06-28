import React, { useEffect, useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";
import { callLogin, callVerify } from "../services/AuthServices";

type ErrorMap = {
  path: string;
  msg: string;
};

const Login = () => {
  const { auth, setAuth, loading } = useAuthContext();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    console.log(auth);
  }, [auth]);

  const handleFormChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    try {
      setFormData({
        ...formData,
        [target.name]: target.value,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await callLogin(formData);

      if (!result) {
        throw new Error("Failed to connect. Please try again.");
      }

      const { response, responseData } = result;

      if (response.ok) {
        console.log(`Loggedin`);
        const result = await callVerify();
        if (!result) {
          throw new Error("Failed to verify. Please try again.");
        }

        const { user } = result.responseData;
        console.log(user);

        const newAuthUser = {
          userId: user.id,
          username: user.username,
          isAdmin: user.isAdmin,
          isAuthenticated: true,
        };
        
        setAuth(newAuthUser);

        if (newAuthUser.isAdmin) {
          navigate("/dashboard");
        } else {
          navigate("/user-page");
        }
      } else {
        const errorsObj: Record<string, string> = {};
        responseData.errors.forEach((error: ErrorMap) => {
          errorsObj[error.path] = error.msg;
        });
        setErrors(errorsObj);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading)
    return (
      <div className="h-lvh flex justify-center mt-50">
        <span className="loading loading-spinner w-32 h-32 text-blue-600"></span>
      </div>
    );

  return (
    <div className="h-lvh w-96 sm:w-3/4 mt-2 mx-auto flex justify-center p-3 pt-20">
      <div
        className={`md:w-3/5 w-96 max-h-[380px] ${
          Object.keys(errors).length > 0 && "min-h-[420px]"
        }  border-2 rounded-lg shadow border-gray-200 p-5`}
      >
        <h1 className="text-3xl font-bold">Sign In</h1>
        <form onSubmit={handleLogin}>
          <div className="flex flex-col my-6">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={handleFormChange}
              id="email"
              name="email"
              className="border border-gray-300 rounded p-3 focus:outline text-[#051c34]"
            />
            {errors.email && <p className="!text-red-700">{errors.email}</p>}
          </div>

          <div className="flex flex-col mt-6">
            <label htmlFor="password">Password</label>
            <input
              value={formData.password}
              onChange={handleFormChange}
              type="password"
              id="password"
              name="password"
              className="border border-gray-300 rounded p-3 focus:outline text-[#051c34]"
            />
            {errors.password && (
              <p className="!text-red-700">{errors.password}</p>
            )}
          </div>
          <div className="mt-3">
            <button className="bg-[#083d77] text-white p-2 w-full rounded hover:opacity-60 transition">
              Login
            </button>
          </div>
        </form>
        <div className="mt-10">
          <p>
            Dont have an account?{" "}
            <span>
              <Link
                to={"/register"}
                className="!text-[#051c34] link font-semibold"
              >
                Register
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
