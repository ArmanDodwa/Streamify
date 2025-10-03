// Sidebar.jsx
import React from 'react';
import { HomeIcon, UsersIcon, BellIcon, StreamifyLogoIcon } from "./Icon/icon";


const Sidebar = () => {
  const navItems = [
    { name: 'Home', icon: HomeIcon, isActive: true, link:"/"},
    { name: 'Friends', icon: UsersIcon, isActive: false, link:"/home" },
    { name: 'Notifications', icon: BellIcon, isActive: false, link:"/notification" },
  ];

  const CurrentUser = {
    name: "Kyle Doe",
    avatarUrl: "https://placehold.co/40x40/22c55e/ffffff?text=KD"
  }

  return (
    <aside className="h-screen w-64 bg-gray-900 flex flex-col justify-between p-4 border-r border-gray-800 shadow-xl">
      {/* Top Section */}
      <div>
        {/* App Logo/Name */}
        <div className="flex items-center gap-2 p-4 text-white text-xl font-extrabold mb-6">
          <StreamifyLogoIcon className="text-green-500 h-8 w-8" />
          Streamify
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.link}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 
                  ${item.isActive 
                    ? 'bg-green-600 text-white font-semibold shadow-md' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                  }`}
              >
                <Icon />
                {item.name}
              </a>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile */}
      <div className="border-t border-gray-700 pt-4">
        <div className="flex items-center gap-3 cursor-pointer p-2 rounded-xl hover:bg-gray-800 transition-colors">
          <img
            className="w-10 h-10 rounded-full object-cover border-2 border-gray-700"
            src={CurrentUser.avatarUrl}
            alt={`${CurrentUser.name} profile`}
          />
          <span className="text-gray-200 font-medium">{CurrentUser.name}</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;