import React from "react";
import { FaSignInAlt,FaEyeSlash,FaEye } from "react-icons/fa";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function Login() {
     const [showPassword, setShowPassword] = useState(false);
     const navigate =useNavigate()
  return (
    <section className="h-full w-screen bg-gray-100  flex items-center justify-center">
      <div className="w-full max-w-md p-6 rounded-lg bg-white shadow-lg text-neutral-800 dark:text-neutral-1000">
        <div className="text-center mb-6">
          <h4 className="text-xl font-semibold">Welcome to Nisr</h4>
        </div>

        <form>
          <p className="mb-4 text-center">Please login to your account</p>

          
          <input
            type="text"
            placeholder="Username"
            className="mb-4 w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Password input */}
          <div className="relative mb-4 w-full">
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder="Password"
        className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
      />
        <div
        className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
        onClick={() => setShowPassword(!showPassword)}
         >
           {showPassword ? <FaEyeSlash /> : <FaEye />}
         </div>
         </div>

          
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-150"
            onClick={(e)=>{
                e.preventDefault()
                navigate('/dashboard')
            }}
          >
            <FaSignInAlt />
            <span>Log in</span>
          </button>

         
          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-indigo-500 hover:underline">
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}
