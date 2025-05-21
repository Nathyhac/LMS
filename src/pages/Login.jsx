import React, { useEffect, useState } from "react";
import { FaSignInAlt, FaEyeSlash, FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../Slices/user/user";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    form: "",
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });
  const navigate = useNavigate();

  const { isLoading, token, user } = useSelector((state) => state.user);

  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    validateForm();
  };

  const onFinish = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    dispatch(userLogin({ email, password }))
      .then((response) => {
        if (response.error) {
          setErrors({
            ...errors,
            form: "Invalid email or password", // Generic error message for security
          });
          console.error("Login failed:", response.error);
        }
      })
      .catch((error) => {
        setErrors({
          ...errors,
          form: "An error occurred during login. Please try again.",
        });
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

        {errors.form && (
          <div className="mt-4 p-2 bg-red-100 text-red-700 rounded-md text-center">
            {errors.form}
          </div>
        )}

        <form className="mt-8 w-full mb-2" onSubmit={onFinish}>
          <div className="flex flex-col gap-4 w-full">
            <div>
              <h3 className="font-medium text-emerald-900">Your email:</h3>
              <input
                type="email"
                size="lg"
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.email && touched.email
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => handleBlur("email")}
              />
              {errors.email && touched.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="relative w-full">
              <h3 className="font-medium text-emerald-900">Password:</h3>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={`w-full px-4 py-2 mt-2 rounded-lg border ${
                  errors.password && touched.password
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => handleBlur("password")}
              />
              <div
                className="absolute inset-y-0 right-3 mt-4 flex items-center cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
              {errors.password && touched.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
          </div>
          <button
            className={`flex items-center justify-center gap-2 ${
              isLoading ? "bg-gray-500" : "bg-gray-800 hover:bg-blue-800"
            } text-white text-xl px-4 mt-6 py-2 w-full rounded-lg transition duration-150`}
            type="submit"
            disabled={isLoading}
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
