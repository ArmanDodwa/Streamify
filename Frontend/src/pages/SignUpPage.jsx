// src/pages/SignupPage.jsx
import React, { useState } from "react";
import bgImage from "../assets/Video call-bro.png"; // Your image path
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { axiosInstance } from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { singup } from "../lib/app";


const SignupPage = () => {


  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();


  const { mutate, isPending, error } = useMutation({
    mutationFn: singup,
    onSuccess: (data) => {
      console.log("Backend response:", data); // <-- log backend response here
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", form);
    // Here you can add your API call
    mutate(form);
    // Navigate to home page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col md:flex-row bg-white shadow-xl rounded-xl overflow-hidden max-w-4xl">
        {/* Left Side Image */}
        <div className="md:w-1/2 hidden md:block">
          <img
            src={bgImage}
            alt="Signup"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Create Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-gray-900 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200 text-gray-900"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-900 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200 text-gray-900 "
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-900 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="********"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200 text-gray-900"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-gray-500 mt-5">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
