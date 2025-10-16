import React, { useState, useEffect } from 'react';
import { iotSimulator } from '../services/iotSimulator';

const IoTSimulatorControl: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState<any>(null);

  useEffect(() => {
    // Check simulator status every 2 seconds
    const interval = setInterval(() => {
      const currentStatus = iotSimulator.getStatus();
      setStatus(currentStatus);
      setIsRunning(currentStatus.isRunning);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleStartSimulation = () => {
    iotSimulator.startSimulation();
    setIsRunning(true);
  };

  const handleStopSimulation = () => {
    iotSimulator.stopSimulation();
    setIsRunning(false);
  };

  const handleSimulateAccident = () => {
    if (isRunning) {
      iotSimulator.simulateAccident();
    } else {
      alert('⚠️ Please start simulation first!');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        🚗 IoT Device Simulator
        <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
          isRunning ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {isRunning ? '🟢 ACTIVE' : '🔴 STOPPED'}
        </span>
      </h3>

      {/* Control Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={handleStartSimulation}
          disabled={isRunning}
          className={`px-4 py-2 rounded-lg font-medium ${
            isRunning
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          🚀 Start Simulation
        </button>

        <button
          onClick={handleStopSimulation}
          disabled={!isRunning}
          className={`px-4 py-2 rounded-lg font-medium ${
            !isRunning
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-red-500 text-white hover:bg-red-600'
          }`}
        >
          ⏹️ Stop Simulation
        </button>

        <button
          onClick={handleSimulateAccident}
          disabled={!isRunning}
          className={`px-4 py-2 rounded-lg font-medium ${
            !isRunning
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-orange-500 text-white hover:bg-orange-600'
          }`}
        >
          💥 Simulate Accident
        </button>
      </div>

      {/* Status Display */}
      {status && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">📡 Device Info</h4>
            <p className="text-sm text-blue-600">ID: {status.deviceId}</p>
            <p className="text-sm text-blue-600">
              Status: {status.isRunning ? 'Sending Data' : 'Disconnected'}
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">📍 Location</h4>
            <p className="text-sm text-green-600">
              Lat: {status.currentLocation?.lat.toFixed(4)}
            </p>
            <p className="text-sm text-green-600">
              Lng: {status.currentLocation?.lng.toFixed(4)}
            </p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-2">🏃 Speed</h4>
            <p className="text-lg font-bold text-purple-600">
              {status.speed?.toFixed(1)} km/h
            </p>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-6 bg-yellow-50 p-4 rounded-lg">
        <h4 className="font-semibold text-yellow-800 mb-2">📋 Instructions:</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Start Simulation to begin sending fake sensor data</li>
          <li>• Check backend terminal to see received data</li>
          <li>• Use "Simulate Accident" to test emergency detection</li>
          <li>• Stop simulation when done testing</li>
        </ul>
      </div>
    </div>
  );
};

export default IoTSimulatorControl;