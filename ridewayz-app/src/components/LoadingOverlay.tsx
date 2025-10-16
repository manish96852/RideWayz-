import React from 'react';

interface LoadingOverlayProps {
  isVisible: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 modal-backdrop z-50 flex items-center justify-center">
      <div className="flex flex-col items-center text-white scale-in-animation">
        {/* Custom loading animation */}
        <div className="relative w-20 h-20 mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-white loading-spinner"></div>
          <div className="absolute inset-2 rounded-full border-2 border-white/10"></div>
          <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-white/50 loading-spinner" style={{animationDirection: 'reverse', animationDuration: '1s'}}></div>
        </div>
        
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2">Loading</h3>
          <p className="text-white/80 font-medium">Please wait...</p>
          
          {/* Loading dots animation */}
          <div className="flex justify-center mt-4 space-x-1">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
};