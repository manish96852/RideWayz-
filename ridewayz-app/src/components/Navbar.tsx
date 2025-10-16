import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onMenuClick: () => void;
  currentLocation?: string;
  batteryLevel?: number;
  networkStrength?: number;
  notifications?: number;
  isRideActive?: boolean;
  activeScreen?: string;
  onNavigate?: (screen: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onMenuClick, 
  currentLocation = "Getting location...",
  batteryLevel = 85,
  networkStrength = 4,
  notifications = 3,
  isRideActive = false,
  activeScreen = 'dashboard',
  onNavigate = () => {}
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather] = useState({ temp: 28, condition: 'sunny' });

  const navigationItems = [
    { id: 'profile', label: 'Profile', icon: '👤', badge: null },
    { id: 'trips', label: 'Trip History', icon: '📅', badge: '12' },
    { id: 'safety', label: 'Safety Center', icon: '🛡️', badge: null },
    { id: 'iot-device', label: 'IoT Device', icon: '🔧', badge: null },
    { id: 'analytics', label: 'Analytics', icon: '📊', badge: null },
    { id: 'settings', label: 'Settings', icon: '⚙️', badge: null }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getWeatherIcon = () => {
    switch (weather.condition) {
      case 'sunny': return '☀️';
      case 'cloudy': return '⛅';
      case 'rainy': return '🌧️';
      default: return '☀️';
    }
  };

  const getBatteryColor = () => {
    if (batteryLevel > 50) return 'text-green-400';
    if (batteryLevel > 20) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getNetworkBars = () => {
    return Array.from({ length: 4 }, (_, i) => (
      <div
        key={i}
        className={`w-1 rounded-full transition-colors ${
          i < networkStrength ? 'bg-white' : 'bg-white/30'
        }`}
        style={{ height: `${(i + 1) * 3 + 2}px` }}
      />
    ));
  };

  return (
    <div className="glass-card sticky top-0 z-30 mx-4 mt-4 rounded-2xl overflow-hidden">
      {/* Main Navigation Bar */}
      <div className="flex items-center justify-between p-4">
        {/* Left Section - Logo & Navigation */}
        <div className="flex items-center space-x-6">
          {/* Logo & Brand - Clickable to go to Dashboard */}
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center space-x-3 p-2 rounded-xl hover:bg-white/10 transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
              </svg>
            </div>
            <div className="group-hover:text-blue-300 transition-colors">
              <h1 className="text-white font-bold text-xl">RideWayz</h1>
              {activeScreen === 'dashboard' && (
                <div className="w-full h-0.5 bg-blue-400 rounded-full mt-1"></div>
              )}
            </div>
          </button>

          {/* Navigation Menu */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 group ${
                  activeScreen === item.id 
                    ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-white border border-blue-400/40' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium text-sm">{item.label}</span>
                {item.badge && (
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[18px] text-center">
                    {item.badge}
                  </span>
                )}
                {activeScreen === item.id && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full"></div>
                )}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={onMenuClick}
            className="lg:hidden text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 group-hover:scale-110 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>

        {/* Right Section - Status Indicators */}
        <div className="flex items-center space-x-4">
          {/* Ride Status */}
          <div className="hidden md:flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isRideActive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-white/80 text-sm font-medium">
              {isRideActive ? 'Active' : 'Parked'}
            </span>
          </div>

          {/* Weather */}
          <div className="hidden xl:flex items-center space-x-2">
            <span className="text-lg">{getWeatherIcon()}</span>
            <span className="text-white/70 text-sm">{weather.temp}°C</span>
          </div>

          {/* Time */}
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-white font-bold text-sm">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            <span className="text-white/60 text-xs">
              {currentTime.toLocaleDateString([], { weekday: 'short', day: 'numeric' })}
            </span>
          </div>

          {/* Battery */}
          <div className="flex items-center space-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 ${getBatteryColor()}`}>
              <path fillRule="evenodd" d="M3.75 6.75a3 3 0 00-3 3v6a3 3 0 003 3h15a3 3 0 003-3v-.037c.856-.174 1.5-.93 1.5-1.838v-2.25c0-.907-.644-1.664-1.5-1.837V9.75a3 3 0 00-3-3h-15zm15 1.5a1.5 1.5 0 011.5 1.5v6a1.5 1.5 0 01-1.5 1.5h-15a1.5 1.5 0 01-1.5-1.5v-6a1.5 1.5 0 011.5-1.5h15z" clipRule="evenodd" />
            </svg>
            <span className={`text-xs font-medium ${getBatteryColor()}`}>{batteryLevel}%</span>
          </div>

          {/* Network Strength */}
          <div className="hidden sm:flex items-center space-x-1">
            <div className="flex items-end space-x-0.5 h-4">
              {getNetworkBars()}
            </div>
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-white/10 transition-colors group">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white/80 group-hover:text-white transition-colors">
              <path d="M5.85 3.5a.75.75 0 00-1.117-1 9.719 9.719 0 00-2.348 6.242C2.119 8.246 2.5 8.5 3 8.5h1c.23 0 .45-.01.67-.03a.75.75 0 00.717-.67 8.25 8.25 0 012.004-5.3z" />
              <path fillRule="evenodd" d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM20.2 4.983a.75.75 0 00-1.117 1A8.25 8.25 0 0121.33 7.7a.75.75 0 00.717.67c.22.02.44.03.67.03h1c.5 0 .881-.254.615-.758a9.719 9.719 0 00-2.348-6.242zM12 9a3 3 0 11-6 0 3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                {notifications > 9 ? '9+' : notifications}
              </span>
            )}
          </button>

          {/* Emergency Button */}
          <button className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1 group">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 group-hover:animate-pulse">
              <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
            </svg>
            <span className="hidden lg:inline">SOS</span>
          </button>
        </div>
      </div>

      {/* Secondary Info Bar (only when ride is active) */}
      {isRideActive && (
        <div className="border-t border-white/10 px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <span className="text-white/60">Speed:</span>
                <span className="text-white font-medium">45 km/h</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-white/60">Duration:</span>
                <span className="text-white font-medium">12m 34s</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-white/60">Distance:</span>
                <span className="text-white font-medium">8.2 km</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-xs font-medium">Monitoring Active</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};