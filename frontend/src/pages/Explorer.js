import React from 'react';

export default function Explorer() {
  // This is a copy of the explorer page for the src/pages directory
  // Same content as the main explorer page
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white mb-8">Block Explorer</h1>
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
        <p className="text-blue-200">
          Block explorer functionality is implemented in the main pages directory. 
          This component serves as a routing placeholder.
        </p>
      </div>
    </div>
  );
}
