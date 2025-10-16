import React from 'react';
import { AppState } from '../types';
import { FreeMapComponent } from './FreeMapComponent';
import IoTSimulatorControl from './IoTSimulatorControl';
import RealTimeDataViewer from './RealTimeDataViewer';

interface DashboardScreenProps {
  state: AppState;
  onToggleRide: () => void;
  onSOSClick: () => void;
} 

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ 
  state, 
  onToggleRide, 
  onSOSClick 
}) => {
  const getStatusColor = () => {
    switch (state.rideStatus) {
      case 'parked':
        return 'bg-gray-400';
      case 'monitoring':
        return 'bg-green-500';
      case 'overspeed':
        return 'bg-yellow-500';
      case 'accident':
      case 'alerting-guardian':
        return 'bg-red-600';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusText = () => {
    switch (state.rideStatus) {
      case 'parked':
        return 'Parked';
      case 'monitoring':
        return 'Monitoring Active';
      case 'overspeed':
        return 'Overspeeding!';
      case 'accident':
        return 'ACCIDENT DETECTED!';
      case 'alerting-guardian':
        return 'ALERTING GUARDIAN';
      default:
        return 'Parked';
    }
  };

  return (
    <div className="p-6 space-y-6 min-h-screen relative overflow-hidden">
      {/* Floating Background Shapes */}
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>
      
      {/* Dashboard Header */}
      <div className="text-center mb-8 fade-in-animation">
        <h1 className="text-4xl font-bold text-white mb-2 gradient-text">RideWayz Dashboard</h1>
        <p className="text-white/80 text-lg">Your Safety Companion</p>
      </div>

      {/* IoT Simulator Control Panel */}
      <IoTSimulatorControl />

      {/* Real-time Sensor Data Viewer */}
      <RealTimeDataViewer />

      {/* Free OpenStreetMap Component - No API Keys Required! */}
      <div className="mb-8">
        <FreeMapComponent 
          isRideActive={state.rideInterval !== null}
          onLocationUpdate={(location: { lat: number; lng: number }) => {
            // Handle live location updates here
            console.log('Live location updated:', location);
          }}
        />
      </div>
      
      {/* Enhanced Alert Banners */}
      {state.rideStatus === 'overspeed' && (
        <div className="glass-card bg-gradient-to-r from-yellow-400/30 to-orange-500/30 border border-yellow-400/50 p-6 rounded-2xl alert-banner shadow-2xl">
          <div className="flex items-center justify-center text-yellow-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-8 h-8 mr-4 animate-pulse text-yellow-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.174 3.35 1.945 3.35h14.71c1.771 0 2.816-1.85 1.945-3.35L13.75 4.5a1.125 1.125 0 00-1.945 0L3.753 16.756zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <span className="font-bold text-xl text-yellow-100">⚠️ Overspeeding Detected! Slow Down</span>
          </div>
        </div>
      )}

      {state.rideStatus === 'alerting-guardian' && (
        <div className="glass-card bg-gradient-to-r from-red-500/40 to-pink-600/40 border border-red-400/60 p-6 rounded-2xl alert-banner shadow-2xl">
          <div className="flex items-center justify-center text-red-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-8 h-8 mr-4 animate-pulse text-red-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.174 3.35 1.945 3.35h14.71c1.771 0 2.816-1.85 1.945-3.35L13.75 4.5a1.125 1.125 0 00-1.945 0L3.753 16.756zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <span className="font-bold text-xl text-red-100">🚨 ACCIDENT DETECTED! ALERTING GUARDIAN!</span>
          </div>
        </div>
      )}

      {/* Enhanced Rider Status Card */}
      <div className="glass-card bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-400/30 p-8 rounded-2xl fade-in-animation shadow-2xl">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 mr-3 text-blue-300">
            <path d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" />
          </svg>
          <span className="gradient-text">Rider Status</span>
        </h3>
        <div className="flex items-center justify-center">
          <span className={`w-6 h-6 rounded-full mr-4 status-dot ${getStatusColor()} shadow-lg`}></span>
          <span className="text-3xl font-bold text-white">{getStatusText()}</span>
        </div>
      </div>

      {/* Enhanced Speed and Distance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card bg-gradient-to-br from-green-500/25 to-emerald-600/25 border border-green-400/40 text-center p-8 rounded-2xl slide-in-animation shadow-2xl">
          <div className="flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-green-300 mr-3">
              <path d="M12 1.5a.75.75 0 01.75.75V6a.75.75 0 01-1.5 0V2.704l-.77.77a.75.75 0 01-1.061-1.061l2.25-2.25a.75.75 0 011.06 0l2.25 2.25a.75.75 0 11-1.06 1.061L12.75 2.704V6a.75.75 0 01-.75.75zM12 9a3 3 0 100 6 3 3 0 000-6z" />
            </svg>
            <h4 className="text-xl font-bold text-green-200">Current Speed</h4>
          </div>
          <div className="relative">
            <p className="text-6xl font-bold speed-meter bg-gradient-to-r from-green-300 to-blue-300 bg-clip-text text-transparent">
              {Math.round(state.currentSpeed)}
            </p>
            <span className="text-lg text-green-200 font-semibold">km/h</span>
          </div>
          {/* Enhanced Speed indicator bar */}
          <div className="mt-6 w-full bg-white/20 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 h-3 rounded-full transition-all duration-500 shadow-lg"
              style={{width: `${Math.min(100, (state.currentSpeed / 120) * 100)}%`}}
            ></div>
          </div>
          <p className="text-green-200/80 text-sm mt-2">Speed Limit: 120 km/h</p>
        </div>
        
        <div className="glass-card bg-gradient-to-br from-purple-500/25 to-pink-600/25 border border-purple-400/40 text-center p-8 rounded-2xl slide-in-animation shadow-2xl">
          <div className="flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-purple-300 mr-3">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
            </svg>
            <h4 className="text-xl font-bold text-purple-200">Distance Traveled</h4>
          </div>
          <div className="relative">
            <p className="text-6xl font-bold distance-counter bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
              {state.distanceTraveled.toFixed(1)}
            </p>
            <span className="text-lg text-purple-200 font-semibold">km</span>
          </div>
          {/* Enhanced Distance progress ring */}
          <div className="mt-6 flex justify-center">
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-white/20"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-purple-400"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={`${Math.min(100, (state.distanceTraveled / 50) * 100)}, 100`}
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-purple-200">
                  {Math.round((state.distanceTraveled / 50) * 100)}%
                </span>
              </div>
            </div>
          </div>
          <p className="text-purple-200/80 text-sm mt-2">Target: 50 km</p>
        </div>
      </div>

      {/* Enhanced Control Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button 
          onClick={onToggleRide}
          className={`glass-card p-8 text-center rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
            state.rideInterval 
              ? 'bg-gradient-to-br from-red-500/30 to-pink-600/30 border border-red-400/50 hover:from-red-500/40 hover:to-pink-600/40' 
              : 'bg-gradient-to-br from-green-500/30 to-emerald-600/30 border border-green-400/50 hover:from-green-500/40 hover:to-emerald-600/40'
          }`}
        >
          <div className="flex items-center justify-center mb-4">
            {state.rideInterval ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-red-300">
                <path fillRule="evenodd" d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-green-300">
                <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <h4 className="text-xl font-bold text-white mb-3">
            {state.rideInterval ? '🛑 Stop Monitoring' : '▶️ Start Monitoring'}
          </h4>
          <p className={`text-sm ${state.rideInterval ? 'text-red-200/80' : 'text-green-200/80'}`}>
            {state.rideInterval ? 'End ride safety monitoring' : 'Begin real-time safety tracking'}
          </p>
        </button>

        <button 
          onClick={onSOSClick}
          className="glass-card bg-gradient-to-br from-red-600/40 to-orange-600/40 border border-red-500/60 p-8 text-center rounded-2xl transition-all duration-300 transform hover:scale-105 hover:from-red-600/50 hover:to-orange-600/50 pulse-glow shadow-2xl"
        >
          <div className="flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-red-200 animate-pulse">
              <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
            </svg>
          </div>
          <h4 className="text-xl font-bold text-red-100 mb-3">🚨 Emergency SOS</h4>
          <p className="text-red-200/80 text-sm">Press in case of emergency</p>
        </button>
      </div>

      {/* IoT Device Status Section */}
      <div className="glass-card bg-gradient-to-br from-cyan-500/25 to-teal-600/25 border border-cyan-400/40 p-8 rounded-2xl fade-in-animation shadow-2xl">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 mr-3 text-cyan-300">
            <path d="M9.375 3a1.875 1.875 0 000 3.75h1.875v4.5H3.375A1.875 1.875 0 011.5 9.375v-1.5A1.875 1.875 0 013.375 6h6v-2.625zM11.25 12.75H3v6.375a3 3 0 003 3h3.75V12.75zM9.375 21a1.875 1.875 0 000-3.75H7.5v-4.5h11.25A1.875 1.875 0 0020.625 14.625v1.5A1.875 1.875 0 0018.75 18h-6v2.625zM12.75 11.25H21v-6.375a3 3 0 00-3-3h-3.75v9.375z" />
          </svg>
          <span className="gradient-text">🔧 ESP32 IoT Device Status</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* ESP32 Core Status */}
          <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-400/30 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center mb-3">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-blue-200 font-semibold">ESP32 Core</span>
            </div>
            <p className="text-2xl font-bold text-white">240MHz</p>
            <p className="text-blue-200/80 text-xs mt-1">Dual Core Active</p>
          </div>

          {/* Multi-Sensor Fusion */}
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-400/30 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center mb-3">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-green-200 font-semibold">Sensors Active</span>
            </div>
            <p className="text-2xl font-bold text-white">5/5</p>
            <p className="text-green-200/80 text-xs mt-1">Precise Detection</p>
          </div>

          {/* Connectivity Status */}
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-purple-400/30 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center mb-3">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-purple-200 font-semibold">Connectivity</span>
            </div>
            <p className="text-2xl font-bold text-white">WiFi</p>
            <p className="text-purple-200/80 text-xs mt-1">BLE/Cellular Ready</p>
          </div>

          {/* Power Status */}
          <div className="bg-gradient-to-br from-yellow-500/20 to-orange-600/20 border border-yellow-400/30 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center mb-3">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-yellow-200 font-semibold">Battery</span>
            </div>
            <p className="text-2xl font-bold text-white">89%</p>
            <p className="text-yellow-200/80 text-xs mt-1">Ultra Low Power</p>
          </div>
        </div>

        {/* Device Specifications */}
        <div className="bg-gradient-to-r from-gray-800/40 to-gray-900/40 border border-gray-600/30 rounded-xl p-6">
          <h4 className="text-lg font-bold text-white mb-4 flex items-center">
            <span className="mr-2">⚡</span>
            Hardware Specifications
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">ESP32 Core:</span>
                <span className="text-white font-semibold">Powerful microcontroller</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Multi-Sensor Fusion:</span>
                <span className="text-white font-semibold">Precise detection</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">Connectivity:</span>
                <span className="text-white font-semibold">BLE/WiFi/Cellular</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Power Mode:</span>
                <span className="text-white font-semibold">Ultra Low Power</span>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Sensor Data */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-red-500/20 to-pink-600/20 border border-red-400/30 rounded-xl p-4">
            <h5 className="text-white font-semibold mb-2 flex items-center">
              <span className="mr-2">🌡️</span>
              Temperature
            </h5>
            <p className="text-2xl font-bold text-red-200">28°C</p>
            <div className="w-full bg-white/20 rounded-full h-2 mt-2">
              <div className="bg-red-400 h-2 rounded-full" style={{width: '56%'}}></div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-600/20 border border-blue-400/30 rounded-xl p-4">
            <h5 className="text-white font-semibold mb-2 flex items-center">
              <span className="mr-2">📊</span>
              Vibration
            </h5>
            <p className="text-2xl font-bold text-blue-200">0.3g</p>
            <div className="w-full bg-white/20 rounded-full h-2 mt-2">
              <div className="bg-blue-400 h-2 rounded-full animate-pulse" style={{width: '30%'}}></div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-400/30 rounded-xl p-4">
            <h5 className="text-white font-semibold mb-2 flex items-center">
              <span className="mr-2">📡</span>
              Signal Strength
            </h5>
            <p className="text-2xl font-bold text-green-200">-45dBm</p>
            <div className="w-full bg-white/20 rounded-full h-2 mt-2">
              <div className="bg-green-400 h-2 rounded-full" style={{width: '85%'}}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Trip Statistics */}
      {state.rideInterval && (
        <div className="glass-card bg-gradient-to-br from-indigo-500/25 to-blue-600/25 border border-indigo-400/40 p-8 rounded-2xl scale-in-animation shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 mr-3 text-indigo-300">
              <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5V3z" clipRule="evenodd" />
            </svg>
            <span className="gradient-text">📊 Live Trip Statistics</span>
          </h3>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-400/30 rounded-xl p-4">
              <p className="text-4xl font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">
                {Math.round(state.currentSpeed)}
              </p>
              <p className="text-green-200 text-sm font-semibold mt-2">Current Speed</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-600/20 border border-yellow-400/30 rounded-xl p-4">
              <p className="text-4xl font-bold bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                {Math.round(Math.max(...[state.currentSpeed]))}
              </p>
              <p className="text-yellow-200 text-sm font-semibold mt-2">Max Speed</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-400/30 rounded-xl p-4">
              <p className="text-4xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                {(state.distanceTraveled * 60).toFixed(0)}
              </p>
              <p className="text-blue-200 text-sm font-semibold mt-2">Time (min)</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};