import React, { useEffect, useState } from "react";
import { FaSignInAlt, FaEyeSlash, FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../Slices/user/user";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { isLoading, token, user } = useSelector((state) => state.user);

  const onFinish = (e) => {
    e.preventDefault();
    dispatch(userLogin({ email, password }))
      .then((response) => {
        if (response.error) {
          console.error("Login failed:", response.error);
        } else {
          console.log("Login successful:");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  useEffect(() => {
    if (token && user) {
      navigate("/nisir");
    }
  }, [token, user, navigate]);

  return (
    <section className="h-screen w-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md p-6 rounded-2xl bg-white shadow-lg text-neutral-800 dark:text-neutral-1000">
        <div className="text-center">
          <h2 className="font-bold mb-4 text-2xl bg-primary text-emerald-800">
            Sign In to Nisir
          </h2>
          <h3 className="text-lg font-normal text-emerald-900">
            Enter your email and password to Sign In.
          </h3>
        </div>

        <form className="mt-8 w-full mb-2" onSubmit={onFinish}>
          <div className=" flex flex-col gap-4 w-full">
            <h3 className="font-medium text-emerald-900">Your email:</h3>
            <input
              type="email"
              size="lg"
              className=" w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="relative w-full">
              <h3 className="font-medium text-emerald-900">Password:</h3>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-2 mt-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                className="absolute inset-y-0 right-3 mt-8 flex items-center cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>
          <button
            className="flex items-center justify-center gap-2 bg-gray-800 text-white text-xl px-4 mt-6 py-2 w-full rounded-lg hover:bg-blue-800 transition duration-150"
            type="submit"
          >
            <FaSignInAlt className="text-lg " />
            {isLoading ? "Loading..." : "Sign In"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
