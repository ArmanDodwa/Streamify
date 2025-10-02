import React, { useState, useEffect } from 'react';
import { LoaderCircle } from 'lucide-react';

/**
 * The main component that displays a spinning logo to indicate loading,
 * simulating a delay before transitioning to the loaded state.
 */
const PageLoading = () => {
  const [isLoading, setIsLoading] = useState(true);


  return (
    // Full screen, dark mode layout, centered content
    <div className="min-h-screen bg-gray-900 flex items-center justify-center font-sans p-4">
      {isLoading ? (
        // Loading State UI
        <div className="flex flex-col items-center text-white">
          {/* Using the LoaderCircle icon from lucide-react */}
          <LoaderCircle 
            className="w-20 h-20 text-lime-400 animate-spin mb-6" 
          />
          
          <p className="text-xl font-semibold tracking-wide text-gray-200">
            Loading Application Data...
          </p>
          <p className="text-sm text-gray-400 mt-2">
            This won't take long.
          </p>
        </div>
      ) : (
        // Loaded State UI (This is where your main application would render)
        <div className="text-center p-8 bg-gray-800 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-lime-400 mb-4">
            Welcome Back!
          </h2>
          <p className="text-lg text-gray-300">
            The application has successfully loaded.
          </p>
        </div>
      )}
    </div>
  );
};

export default PageLoading;
