import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import PageLoading from "./components/pageLoader.jsx";
import { getAuthUser } from "./lib/app.js";
import useAuthUser from "./Hooks/useAuthUser.js";
import Layout from "./components/Layout.jsx";

const App = () => {
  const { isLoading, authUser } = useAuthUser();

  const isAuthenticated = Boolean(authUser);
  console.log("isAuthenticated", isAuthenticated);
  const onBoarded = authUser?.isOnboarded;
  console.log("onBoarded", onBoarded);

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <div className="h-screen" data-theme="night">
      <Router>
        <Routes>
          {/* Private routes */}
          <Route
            path="/"
            element={
              isAuthenticated && onBoarded ? (
                // <Layout><Home/></Layout>
                <Home />
              ) : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
              )
            }
          />
          <Route
            path="/chat/:id"
            element={
              isAuthenticated && onBoarded ? (
                <Chat />
              ) : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
              )
            }
          />
          <Route
            path="/call"
            element={isAuthenticated ? <Call /> : <Navigate to="/signUp" />}
          />
          <Route
            path="/notification"
            element={
              isAuthenticated ? <Notification /> : <Navigate to="/signUp" />
            }
          />

          <Route
            path="/onboarding"
            element={
              isAuthenticated ? (
                !onBoarded ? (
                  <Onboarding />
                ) : (
                  <Navigate to="/" />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Public routes */}
          <Route
            path="/login"
            element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signUp"
            element={!isAuthenticated ? <SignUp /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
      <Toaster />
    </div>
  );
};

export default App;
