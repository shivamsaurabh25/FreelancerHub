import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glass-strong rounded-2xl p-8 flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-white/20 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
        </div>
        <p className="text-white/80 text-lg">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
