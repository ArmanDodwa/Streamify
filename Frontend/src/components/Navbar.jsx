// Navbar.jsx
import React from "react";
import { SearchIcon, BellIcon, UsersIcon } from "./Icon/icon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/app";

const Navbar = () => {
  const queryClient = useQueryClient();

  const CurrentUser = {
    avatarUrl: "https://placehold.co/36x36/22c55e/ffffff?text=ME",
  };

  const { mutate: logoutMutation, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleLogout = (e) => {
     e.preventDefault();
     logoutMutation();
  };

  return (
    <header className="flex justify-end items-center p-4 bg-gray-900 border-b border-gray-800 shadow-lg">
      <div className="flex items-center gap-4">
        {/* Search Icon */}
        <button className="p-2 rounded-full text-gray-400 hover:text-green-500 hover:bg-gray-800 transition-colors">
          <SearchIcon className="h-6 w-6" />
        </button>
        {/* Notification Icon (bell with badge) */}
        <button className="relative p-2 rounded-full text-gray-400 hover:text-green-500 hover:bg-gray-800 transition-colors">
          <BellIcon className="h-6 w-6" />
          {/* Notification Badge */}
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-gray-900"></span>
        </button>

        {/* Friend Requests Button */}
        <button className="flex items-center bg-green-600 text-white text-sm font-medium py-2 px-4 rounded-xl shadow-lg hover:bg-green-500 transition-colors">
          <UsersIcon className="h-4 w-4 mr-2" />
          Friend Requests
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="ml-2 flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full font-medium transition-all duration-200 hover:bg-green-700 hover:scale-105"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
            />
          </svg>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
