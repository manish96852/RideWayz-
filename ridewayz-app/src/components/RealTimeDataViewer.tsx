import React, { useState, useEffect } from 'react';

interface SensorData {
  deviceId: string;
  timestamp: number;
  sensors: {
    accelerometer: { x: number; y: number; z: number };
    gyroscope: { x: number; y: number; z: number };
    gps: { lat: number; lng: number; speed: number };
  };
  status: {
    battery: number;
    temperature: number;
    rssi: number;
  };
}

const RealTimeDataViewer: React.FC = () => {
  const [latestData, setLatestData] = useState<SensorData | null>(null);
  const [sensorHistory, setSensorHistory] = useState<SensorData[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Fetch latest sensor data every 3 seconds
    const interval = setInterval(() => {
      fetchLatestData();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const fetchLatestData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/sensor-data/SIM_ESP32_001');
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          const latest = data[data.length - 1];
          setLatestData(latest);
          setSensorHistory(data.slice(-10)); // Keep last 10 readings
          setIsConnected(true);
        }
      } else {
        setIsConnected(false);
      }
    } catch (error) {
      setIsConnected(false);
      console.log('❌ Failed to fetch sensor data:', error);
    }
  };

  const calculateMagnitude = (vector: { x: number; y: number; z: number }) => {
    return Math.sqrt(vector.x ** 2 + vector.y ** 2 + vector.z ** 2);
  };

  const getAccelerationLevel = (magnitude: number) => {
    if (magnitude > 20000) return { level: 'DANGER', color: 'text-red-400', bg: 'bg-red-500/20' };
    if (magnitude > 15000) return { level: 'HIGH', color: 'text-yellow-400', bg: 'bg-yellow-500/20' };
    if (magnitude > 10000) return { level: 'NORMAL', color: 'text-green-400', bg: 'bg-green-500/20' };
    return { level: 'LOW', color: 'text-blue-400', bg: 'bg-blue-500/20' };
  };

  if (!latestData) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          📊 Real-time Sensor Data
          <span className="ml-2 px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
            🔴 NO DATA
          </span>
        </h3>
        <div className="text-center py-8 text-gray-500">
          <p>⏳ Waiting for sensor data...</p>
          <p className="text-sm mt-2">Start the simulator to see live data</p>
        </div>
      </div>
    );
  }

  const accelMagnitude = calculateMagnitude(latestData.sensors.accelerometer);
  const gyroMagnitude = calculateMagnitude(latestData.sensors.gyroscope);
  const accelLevel = getAccelerationLevel(accelMagnitude);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        📊 Real-time Sensor Data
        <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
          isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {isConnected ? '🟢 LIVE' : '🔴 OFFLINE'}
        </span>
      </h3>

      {/* Current Readings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Accelerometer */}
        <div className={`p-4 rounded-lg border-2 ${accelLevel.bg} border-opacity-30`}>
          <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
            🎯 Accelerometer
            <span className={`ml-2 text-xs px-2 py-1 rounded ${accelLevel.color} font-bold`}>
              {accelLevel.level}
            </span>
          </h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>X:</span>
              <span className="font-mono">{latestData.sensors.accelerometer.x.toFixed(0)}</span>
            </div>
            <div className="flex justify-between">
              <span>Y:</span>
              <span className="font-mono">{latestData.sensors.accelerometer.y.toFixed(0)}</span>
            </div>
            <div className="flex justify-between">
              <span>Z:</span>
              <span className="font-mono">{latestData.sensors.accelerometer.z.toFixed(0)}</span>
            </div>
            <div className="flex justify-between font-bold border-t pt-1">
              <span>Magnitude:</span>
              <span className={`font-mono ${accelLevel.color}`}>
                {accelMagnitude.toFixed(0)}
              </span>
            </div>
          </div>
        </div>

        {/* Gyroscope */}
        <div className="p-4 rounded-lg bg-purple-50 border-2 border-purple-200">
          <h4 className="font-semibold text-gray-800 mb-2">🌪️ Gyroscope</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>X:</span>
              <span className="font-mono">{latestData.sensors.gyroscope.x.toFixed(0)}</span>
            </div>
            <div className="flex justify-between">
              <span>Y:</span>
              <span className="font-mono">{latestData.sensors.gyroscope.y.toFixed(0)}</span>
            </div>
            <div className="flex justify-between">
              <span>Z:</span>
              <span className="font-mono">{latestData.sensors.gyroscope.z.toFixed(0)}</span>
            </div>
            <div className="flex justify-between font-bold border-t pt-1">
              <span>Magnitude:</span>
              <span className="font-mono text-purple-600">
                {gyroMagnitude.toFixed(0)}
              </span>
            </div>
          </div>
        </div>

        {/* GPS & Status */}
        <div className="p-4 rounded-lg bg-blue-50 border-2 border-blue-200">
          <h4 className="font-semibold text-gray-800 mb-2">📍 GPS & Status</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Latitude:</span>
              <span className="font-mono">{latestData.sensors.gps.lat.toFixed(4)}</span>
            </div>
            <div className="flex justify-between">
              <span>Longitude:</span>
              <span className="font-mono">{latestData.sensors.gps.lng.toFixed(4)}</span>
            </div>
            <div className="flex justify-between">
              <span>Speed:</span>
              <span className="font-mono text-blue-600 font-bold">
                {latestData.sensors.gps.speed.toFixed(1)} km/h
              </span>
            </div>
            <div className="flex justify-between">
              <span>Battery:</span>
              <span className="font-mono text-green-600">
                {latestData.status.battery.toFixed(0)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Data History Chart */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-3">📈 Sensor History (Last 10 readings)</h4>
        <div className="space-y-2">
          {sensorHistory.slice(-5).map((data, index) => {
            const magnitude = calculateMagnitude(data.sensors.accelerometer);
            const level = getAccelerationLevel(magnitude);
            const timeAgo = Math.round((Date.now() - data.timestamp) / 1000);
            
            return (
              <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                <span className="text-xs text-gray-500">
                  {timeAgo}s ago
                </span>
                <div className="flex items-center space-x-4 text-sm">
                  <span>Speed: {data.sensors.gps.speed.toFixed(1)} km/h</span>
                  <span className={`px-2 py-1 rounded text-xs ${level.color} ${level.bg}`}>
                    Accel: {magnitude.toFixed(0)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Accident Detection Threshold Indicators */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
          <h5 className="font-semibold text-yellow-800 text-sm mb-1">⚠️ Accident Thresholds</h5>
          <div className="text-xs text-yellow-700">
            <div>Accelerometer: &gt; 20,000</div>
            <div>Gyroscope: &gt; 15,000</div>
          </div>
        </div>
        <div className="bg-red-50 p-3 rounded-lg border border-red-200">
          <h5 className="font-semibold text-red-800 text-sm mb-1">🚨 Current Status</h5>
          <div className="text-xs text-red-700">
            <div>Accel: {accelMagnitude > 20000 ? '🚨 DANGER' : '✅ SAFE'}</div>
            <div>Gyro: {gyroMagnitude > 15000 ? '🚨 DANGER' : '✅ SAFE'}</div>
          </div>
        </div>
      </div>

      {/* Last Update Time */}
      <div className="mt-4 text-center text-xs text-gray-500">
        Last updated: {new Date(latestData.timestamp).toLocaleTimeString()}
      </div>
    </div>
  );
};

export default RealTimeDataViewer;