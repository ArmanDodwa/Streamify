import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/HomePage";
import Chat from "./pages/ChatPage";
import Call from "./pages/CallPage";
import Login from "./pages/LoginPage";
import Notification from "./pages/NotificationPage";
import Onboarding from "./pages/OnboardingPage";
import SignUp from "./pages/SignUpPage";

import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./lib/axios.js";

const App = () => {

  const { data: authUser, isLoading, isError } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      // It's generally better to pass the token via a header for authenticated requests.
      const res = await axiosInstance.get("/auth/me");
      return res.data;
    },

    retry: false,
  });

  const authUserData = authUser?.user || null;

  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen" data-theme="night">
      <Router>
        <Routes>
          {/* Private routes */}
          <Route path="/" element={authUserData ? <Home /> : <Navigate to="/signUp" />} />
          <Route path="/chat" element={authUserData ? <Chat /> : <Navigate to="/signUp" />} />
          <Route path="/call" element={authUserData ? <Call /> : <Navigate to="/signUp" />} />
          <Route path="/notification" element={authUserData ? <Notification /> : <Navigate to="/signUp" />} />
          <Route path="/onboarding" element={authUserData ? <Onboarding /> : <Navigate to="/signUp" />} />

          {/* Public routes */}
          <Route path="/login" element={!authUserData ? <Login /> : <Navigate to="/" />} />
          <Route path="/signUp" element={!authUserData ? <SignUp /> : <Navigate to="/" />} />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to={authUserData ? "/" : "/signUp"} />} />
        </Routes>
      </Router>
      <Toaster />
    </div>
  );
};

export default App;