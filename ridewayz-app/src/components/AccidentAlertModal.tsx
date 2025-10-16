import React from 'react';

interface AccidentAlertModalProps {
  isVisible: boolean;
  onDismiss: () => void;
}

export const AccidentAlertModal: React.FC<AccidentAlertModalProps> = ({ isVisible, onDismiss }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-red-600 bg-opacity-95 z-50 flex flex-col items-center justify-center p-4 text-white text-center modal-backdrop">
      <div className="scale-in-animation">
        {/* Emergency Icon with enhanced animation */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 w-32 h-32 bg-white/20 rounded-full animate-ping"></div>
          <div className="relative w-32 h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth="2" 
              stroke="currentColor" 
              className="w-16 h-16 animate-pulse"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.174 3.35 1.945 3.35h14.71c1.771 0 2.816-1.85 1.945-3.35L13.75 4.5a1.125 1.125 0 00-1.945 0L3.753 16.756zM12 15.75h.007v.008H12v-.008z" 
              />
            </svg>
          </div>
        </div>
        
        <h2 className="text-5xl font-bold mb-6 animate-pulse">ACCIDENT DETECTED!</h2>
        
        {/* Status indicators */}
        <div className="mb-8 space-y-3">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-lg">Location Acquired</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <span className="text-lg">Contacting Guardian...</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            <span className="text-lg">Emergency Services Notified</span>
          </div>
        </div>
        
        <p className="text-xl mb-10 font-medium">ALERTING GUARDIAN WITH LIVE LOCATION</p>
        
        <button 
          onClick={onDismiss}
          className="bg-white text-red-600 font-bold py-4 px-10 rounded-full shadow-2xl text-lg hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-105 vehicle-button"
        >
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Dismiss Alert
          </span>
        </button>
        
        {/* Emergency contact info */}
        <div className="mt-8 text-sm opacity-80">
          <p>Emergency Contact: 112 | Medical: 108</p>
        </div>
      </div>
    </div>
  );
};