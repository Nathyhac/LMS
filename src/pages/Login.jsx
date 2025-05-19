import React, { useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../Slices/user/user";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
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
      <div className="w-full max-w-md p-6 rounded-lg bg-white shadow-lg text-neutral-800 dark:text-neutral-1000">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4 bg-primary">
            Sign In
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal"
          >
            Enter your email and password to Sign In.
          </Typography>
        </div>

        <form className="mt-8 w-full mb-2" onSubmit={onFinish}>
          <div className="mb-1 flex flex-col gap-6 w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Your email
            </Typography>
            <input
              type="email"
              size="lg"
              className="mb-4 w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="name@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 mt-2 font-medium"
            >
              Password
            </Typography>
            <input
              className="mb-4 w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="password"
              size="lg"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-150"
            fullWidth
            type="submit"
          >
            <FaSignInAlt className="text-lg" />
            {isLoading ? "Loading..." : "Sign In"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
