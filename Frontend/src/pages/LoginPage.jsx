import React, { useState } from 'react';
import videoCallIllustration from "../assets/Video call-bro.png"; // Correct path
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {login} from "../lib/app"

const LoginPage = () => {
  const queryClient = useQueryClient()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

   const {mutate:onLogin, isPending} = useMutation({
    mutationFn:login,
    onSuccess: ()=>{
      // toast.success("Profile Onboarding Complete");
      queryClient.invalidateQueries({queryKey:["authUser"]})
      window.location.href = '/login'; // ✅ force navigate
    },
    onError:(err)=>{
      console.log(err)
    }
  })

  const handleSubmit = (e) => {
    // e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // Here you would typically send the data to a backend API
    // alert(`Submitting with Email: ${formData.email} and Password: ${formData.password}`);
    onLogin(formData)
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#2c2f2f] text-gray-200 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-5xl h-auto md:h-[600px] rounded-2xl overflow-hidden shadow-2xl bg-[#222323]">
        {/* Login Form Section */}
        <div className="flex-1 p-8 md:p-16 flex flex-col justify-center space-y-8">
          <div className="flex items-center text-[#38b25a] text-2xl font-bold">
            <span className="text-3xl mr-2">⚙️</span>
            <span>Streamify</span>
          </div>
          <div className="space-y-2">
            <h2 className="text-4xl font-semibold">Welcome Back</h2>
            <p className="text-gray-400 text-lg">Sign in to your account to continue your language journey</p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-400">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="hello@example.com"
                value={formData.email}
                onChange={handleChange}
                className="p-4 rounded-xl bg-[#303233] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#38b25a]"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-400">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="p-4 rounded-xl bg-[#303233] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#38b25a]"
              />
            </div>
            <button
              type="submit"
              className="w-full p-4 rounded-xl bg-[#38b25a] text-white font-bold text-lg hover:bg-[#2e9f4e] transition-colors"
            >
              Sign In
            </button>
          </form>
          <div className="text-center text-sm text-gray-400 mt-4">
            Don't have an account?{' '}
            <a href="/signup" className="text-[#38b25a] font-bold hover:underline">
              Create one
            </a>
          </div>
        </div>
        
        {/* Illustration Section */}
        <div className="flex-1 hidden md:flex flex-col justify-center items-center p-10 text-center bg-[#252828]">
          <img
            src={videoCallIllustration}
            alt="Language partners video call illustration"
            className="w-full max-w-xs"
          />
          <div className="mt-8 space-y-3">
            <h3 className="text-3xl font-semibold">Connect with language partners worldwide</h3>
            <p className="text-gray-400 text-lg">Practice conversations, make friends, and improve your language skills together</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;