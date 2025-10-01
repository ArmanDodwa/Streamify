import React from "react";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/HomePage"
import Chat from "./pages/ChatPage"
import Call from "./pages/CallPage"
import Login from "./pages/LoginPage"
import Notification from "./pages/LoginPage"
import Onboarding from "./pages/OnboardingPage"
import SignUp from "./pages/SignUpPage"

import toast, { Toaster } from "react-hot-toast";

import { useQuery } from "@tanstack/react-query";



const App = () => {


  return (
    <div className="h-screen" data-theme="night">
    
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/chat" element={<Chat/>}/>
        <Route path="/call" element={<Call/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/notification" element={<Notification/>}/>
        <Route path="/onboarding" element={<Onboarding/>}/>
        <Route path="/signUp" element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>

    <Toaster/>
    </div>
  );
};

export default App;
