import React, { useState } from 'react';

export const IoTDeviceScreen: React.FC = () => {
  const [deviceConnected, setDeviceConnected] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState(89);
  const [signalStrength, setSignalStrength] = useState(-45);
  const [temperature, setTemperature] = useState(28);
  const [vibration, setVibration] = useState(0.3);

  const connectDevice = () => {
    setDeviceConnected(!deviceConnected);
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
      
      {/* Header */}
      <div className="text-center mb-8 fade-in-animation">
        <h1 className="text-4xl font-bold text-white mb-2 gradient-text">IoT Device Management</h1>
        <p className="text-white/80 text-lg">ESP32 Hardware Integration</p>
      </div>

      {/* Device Connection Status */}
      <div className="glass-card bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-400/30 p-8 rounded-2xl fade-in-animation shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 mr-3 text-blue-300">
              <path d="M9.375 3a1.875 1.875 0 000 3.75h1.875v4.5H3.375A1.875 1.875 0 011.5 9.375v-1.5A1.875 1.875 0 013.375 6h6v-2.625zM11.25 12.75H3v6.375a3 3 0 003 3h3.75V12.75zM9.375 21a1.875 1.875 0 000-3.75H7.5v-4.5h11.25A1.875 1.875 0 0020.625 14.625v1.5A1.875 1.875 0 0018.75 18h-6v2.625zM12.75 11.25H21v-6.375a3 3 0 00-3-3h-3.75v9.375z" />
            </svg>
            ESP32 Device Status
          </h3>
          <button
            onClick={connectDevice}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              deviceConnected
                ? 'bg-red-500/20 border border-red-400/40 text-red-200 hover:bg-red-500/30'
                : 'bg-green-500/20 border border-green-400/40 text-green-200 hover:bg-green-500/30'
            }`}
          >
            {deviceConnected ? 'Disconnect' : 'Connect'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`text-center p-6 rounded-xl border ${
            deviceConnected 
              ? 'bg-green-500/20 border-green-400/40' 
              : 'bg-red-500/20 border-red-400/40'
          }`}>
            <div className={`w-4 h-4 rounded-full mx-auto mb-3 ${
              deviceConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'
            }`}></div>
            <p className={`text-xl font-bold ${
              deviceConnected ? 'text-green-200' : 'text-red-200'
            }`}>
              {deviceConnected ? 'Connected' : 'Disconnected'}
            </p>
            <p className="text-white/60 text-sm mt-1">Device Status</p>
          </div>

          <div className="text-center p-6 rounded-xl bg-blue-500/20 border border-blue-400/40">
            <p className="text-3xl font-bold text-blue-200">240MHz</p>
            <p className="text-white/60 text-sm mt-1">Dual Core</p>
          </div>

          <div className="text-center p-6 rounded-xl bg-purple-500/20 border border-purple-400/40">
            <p className="text-3xl font-bold text-purple-200">ESP32</p>
            <p className="text-white/60 text-sm mt-1">Microcontroller</p>
          </div>
        </div>
      </div>

      {/* Hardware Specifications */}
      <div className="glass-card bg-gradient-to-br from-cyan-500/25 to-teal-600/25 border border-cyan-400/40 p-8 rounded-2xl slide-in-animation shadow-2xl">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
          <span className="mr-3">⚡</span>
          Hardware Specifications
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-400/30 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                <span className="mr-2">🔧</span>ESP32 Core
              </h4>
              <ul className="space-y-2 text-blue-200">
                <li>• Powerful microcontroller</li>
                <li>• Dual-core Tensilica LX6</li>
                <li>• 240 MHz processing speed</li>
                <li>• 520 KB SRAM memory</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 border border-green-400/30 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                <span className="mr-2">📊</span>Multi-Sensor Fusion
              </h4>
              <ul className="space-y-2 text-green-200">
                <li>• Accelerometer & Gyroscope</li>
                <li>• Temperature sensor</li>
                <li>• GPS module integration</li>
                <li>• Precise collision detection</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-600/20 border border-purple-400/30 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                <span className="mr-2">📡</span>Connectivity Options
              </h4>
              <ul className="space-y-2 text-purple-200">
                <li>• WiFi 802.11 b/g/n</li>
                <li>• Bluetooth Low Energy (BLE)</li>
                <li>• Cellular module ready</li>
                <li>• Real-time data transmission</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-600/20 border border-yellow-400/30 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                <span className="mr-2">🔋</span>Ultra Low Power
              </h4>
              <ul className="space-y-2 text-yellow-200">
                <li>• Deep sleep mode</li>
                <li>• Battery optimization</li>
                <li>• Long lasting performance</li>
                <li>• Power management system</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Sensor Monitoring */}
      <div className="glass-card bg-gradient-to-br from-indigo-500/25 to-blue-600/25 border border-indigo-400/40 p-8 rounded-2xl scale-in-animation shadow-2xl">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 mr-3 text-indigo-300">
            <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" clipRule="evenodd" />
          </svg>
          Real-time Sensor Data
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Battery Level */}
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-400/30 rounded-xl p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-green-300">
                <path d="M4.5 9.75a6 6 0 00-.75 2.906l.75.094a5.25 5.25 0 01.75-2.906l-.75-.094zM19.5 9.75l-.75.094a5.25 5.25 0 01.75 2.906l.75-.094a6 6 0 00-.75-2.906zM9 15.75l-.75.094a5.25 5.25 0 002.906.75l.094-.75a6 6 0 01-2.906-.75l.656-.344zM15 8.25l.75-.094a5.25 5.25 0 00-2.906-.75l-.094.75a6 6 0 012.906.75l-.656.344z" />
              </svg>
            </div>
            <h4 className="text-lg font-bold text-green-200 mb-2">Battery Level</h4>
            <p className="text-4xl font-bold text-white">{batteryLevel}%</p>
            <div className="w-full bg-white/20 rounded-full h-3 mt-4">
              <div 
                className="bg-green-400 h-3 rounded-full transition-all duration-500"
                style={{width: `${batteryLevel}%`}}
              ></div>
            </div>
          </div>

          {/* Signal Strength */}
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-600/20 border border-blue-400/30 rounded-xl p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-blue-300">
                <path fillRule="evenodd" d="M1.371 8.143c5.858-5.857 15.356-5.857 21.213 0a.75.75 0 010 1.061l-.53.53a.75.75 0 01-1.06 0c-4.98-4.979-13.053-4.979-18.032 0a.75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.182 3.182c4.1-4.1 10.749-4.1 14.849 0a.75.75 0 010 1.061l-.53.53a.75.75 0 01-1.061 0c-3.208-3.208-8.418-3.208-11.626 0a.75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.061zm3.204 3.182a6 6 0 018.486 0 .75.75 0 010 1.061l-.53.53a.75.75 0 01-1.061 0 3.75 3.75 0 00-5.304 0 .75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.061zm3.182 3.182a1.5 1.5 0 012.122 0 .75.75 0 010 1.061l-.53.53a.75.75 0 01-1.061 0l-.53-.53a.75.75 0 010-1.061z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="text-lg font-bold text-blue-200 mb-2">Signal Strength</h4>
            <p className="text-4xl font-bold text-white">{signalStrength}dBm</p>
            <div className="flex justify-center mt-4 space-x-1">
              {[1, 2, 3, 4, 5].map((bar) => (
                <div
                  key={bar}
                  className={`w-2 rounded-full ${
                    signalStrength > -50 - (bar * 10) ? 'bg-blue-400' : 'bg-white/20'
                  }`}
                  style={{height: `${bar * 6 + 10}px`}}
                ></div>
              ))}
            </div>
          </div>

          {/* Temperature */}
          <div className="bg-gradient-to-br from-red-500/20 to-pink-600/20 border border-red-400/30 rounded-xl p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-red-300">
                <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v8.954a3 3 0 11-1.5 0V3a.75.75 0 01.75-.75zM4.133 12.75a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm1.125-9a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zm0 3.75a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V8.25a.75.75 0 01.75-.75z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="text-lg font-bold text-red-200 mb-2">Temperature</h4>
            <p className="text-4xl font-bold text-white">{temperature}°C</p>
            <div className="w-full bg-white/20 rounded-full h-3 mt-4">
              <div 
                className="bg-red-400 h-3 rounded-full transition-all duration-500"
                style={{width: `${(temperature / 50) * 100}%`}}
              ></div>
            </div>
          </div>

          {/* Vibration */}
          <div className="bg-gradient-to-br from-purple-500/20 to-violet-600/20 border border-purple-400/30 rounded-xl p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-purple-300">
                <path fillRule="evenodd" d="M5.636 4.575a.75.75 0 010 1.061 9 9 0 000 12.728.75.75 0 11-1.06 1.06c-4.101-4.1-4.101-10.748 0-14.849a.75.75 0 011.06 0zm12.728 0a.75.75 0 011.06 0c4.101 4.101 4.101 10.749 0 14.85a.75.75 0 11-1.06-1.061 9 9 0 000-12.728.75.75 0 010-1.06zm-9.9 2.83a.75.75 0 010 1.06 6 6 0 000 8.486.75.75 0 01-1.061 1.06 7.5 7.5 0 010-10.606.75.75 0 011.06 0zm7.072 0a.75.75 0 011.06 0 7.5 7.5 0 010 10.607.75.75 0 01-1.06-1.061 6 6 0 000-8.486.75.75 0 010-1.06zM9.878 9.878a.75.75 0 011.06 0C11.481 10.421 12 11.169 12 12s-.519 1.579-1.062 2.122a.75.75 0 11-1.06-1.061A1.5 1.5 0 1010.939 10.939a.75.75 0 01-.061 1.06zm4.244 0a.75.75 0 010 1.061A1.5 1.5 0 1013.061 13.06a.75.75 0 111.06 1.061C14.52 13.579 15 12.831 15 12s-.48-1.579-1.122-2.122a.75.75 0 011.06 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="text-lg font-bold text-purple-200 mb-2">Vibration</h4>
            <p className="text-4xl font-bold text-white">{vibration}g</p>
            <div className="w-full bg-white/20 rounded-full h-3 mt-4">
              <div 
                className="bg-purple-400 h-3 rounded-full transition-all duration-500 animate-pulse"
                style={{width: `${(vibration / 2) * 100}%`}}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Device Configuration */}
      <div className="glass-card bg-gradient-to-br from-gray-700/25 to-gray-800/25 border border-gray-600/40 p-8 rounded-2xl fade-in-animation shadow-2xl">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
          <span className="mr-3">⚙️</span>
          Device Configuration
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl">
              <span className="text-white font-semibold">Auto-Connect</span>
              <button className="w-12 h-6 bg-green-500 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl">
              <span className="text-white font-semibold">Low Power Mode</span>
              <button className="w-12 h-6 bg-gray-400 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl">
              <span className="text-white font-semibold">Real-time Alerts</span>
              <button className="w-12 h-6 bg-green-500 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            <button className="w-full p-4 bg-blue-500/20 border border-blue-400/40 rounded-xl text-blue-200 font-semibold hover:bg-blue-500/30 transition-all">
              📡 Update Firmware
            </button>
            
            <button className="w-full p-4 bg-green-500/20 border border-green-400/40 rounded-xl text-green-200 font-semibold hover:bg-green-500/30 transition-all">
              🔄 Sync Settings
            </button>
            
            <button className="w-full p-4 bg-red-500/20 border border-red-400/40 rounded-xl text-red-200 font-semibold hover:bg-red-500/30 transition-all">
              🔧 Factory Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};