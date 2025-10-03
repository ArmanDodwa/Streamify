import React from 'react';

import Sidebar from './Sidebar';
import Navbar from './Navbar';

import {UsersIcon} from "./Icon/icon"






// --- Dummy Data and Helper Components for Content ---

const LanguageBadge = ({ type, language, color }) => (
    <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${color} text-white`}>
        <span className="mr-1">{type}:</span>
        {language}
    </span>
);

const FriendCard = ({ name, location, nativeLang, learningLang, bio, isFriend }) => (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-xl hover:bg-gray-700/50 transition-colors duration-300">
        <div className="flex items-start gap-4 mb-4">
            <img
                className="w-12 h-12 rounded-full object-cover border-2 border-green-500"
                src={`https://placehold.co/48x48/1f2937/ffffff?text=${name.split(' ')[0][0]}${name.split(' ')[1][0]}`}
                alt={name}
            />
            <div>
                <h3 className="text-xl font-semibold text-white">{name}</h3>
                <p className="text-sm text-gray-400 mt-0.5">{location}</p>
            </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
            <LanguageBadge type="Native" language={nativeLang} color="bg-green-600" />
            <LanguageBadge type="Learning" language={learningLang} color="bg-indigo-600" />
        </div>

        {bio && <p className="text-sm text-gray-400 mb-4 italic line-clamp-2">"{bio}"</p>}

        {isFriend ? (
            <button className="mt-2 w-full bg-gray-600 text-white font-medium py-3 rounded-xl hover:bg-gray-700 transition-colors shadow-lg">
                Message
            </button>
        ) : (
            <button className="mt-2 w-full bg-green-600 text-white font-medium py-3 rounded-xl hover:bg-green-500 transition-colors shadow-lg flex items-center justify-center gap-2">
                <UsersIcon className="h-4 w-4" />
                Send Friend Request
            </button>
        )}
    </div>
);

const MainContent = () => {
    const friends = [
        { name: 'Burak Örkmez', location: 'Istanbul, Turkey', nativeLang: 'Spanish', learningLang: 'English', isFriend: true },
        { name: 'Beth Doe', location: 'Munich, Germany', nativeLang: 'Portuguese', learningLang: 'Spanish', isFriend: true },
    ];

    const learners = [
        { name: 'John Doe', location: 'Istanbul, Turkey', nativeLang: 'Mandarin', learningLang: 'Spanish', bio: 'dadsdsafsana', isFriend: false },
        { name: 'Test Acc', location: 'Istanbul, Turkey', nativeLang: 'Spanish', learningLang: 'Japanese', bio: 'sfsdsadsad', isFriend: false },
        { name: 'Sofia Garcia', location: 'Madrid', nativeLang: 'Spanish', learningLang: 'German', bio: 'Language teacher looking to improve my German skills.', isFriend: false },
        { name: 'Kenji Tanaka', location: 'Tokyo', nativeLang: 'Japanese', learningLang: 'English', bio: 'Tech professional looking for language exchange partners.', isFriend: false },
        { name: 'Elena Petrov', location: 'Moscow', nativeLang: 'Russian', learningLang: 'French', bio: 'University student studying languages and international relations.', isFriend: false },
        { name: 'Marco Rossi', location: 'Rome', nativeLang: 'Italian', learningLang: 'Mandarin', bio: 'Food blogger interested in cultural exchange through cuisine.', isFriend: false },
    ];

    return (
        <main className="flex-1 p-8 overflow-y-auto bg-gray-900">
            {/* Friends Section */}
            <h1 className="text-3xl font-bold mb-8 text-gray-100">Your Friends</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                {friends.map((friend, index) => (
                    <FriendCard key={index} {...friend} />
                ))}
            </div>

            {/* Meet New Learners Section */}
            <h2 className="text-3xl font-bold mb-2 text-gray-100">Meet New Learners</h2>
            <p className="text-gray-400 mb-8">Discover perfect language exchange partners based on your profile</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {learners.map((learner, index) => (
                    <FriendCard key={index} {...learner} />
                ))}
            </div>
        </main>
    );
};


// --- Main App Component ---

export default function App() {
  return (
    <div className="flex h-screen bg-gray-900 font-['Inter',_sans-serif]">
      {/* 1. Sidebar */}
      <Sidebar />

      {/* 2. Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* 3. Navbar */}
        <Navbar />

        {/* 4. Page Content */}
        <MainContent />
      </div>
    </div>
  );
}
