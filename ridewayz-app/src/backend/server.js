const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory storage for demo (use database in production)
let sensorDataStore = [];
let emergencyAlerts = [];

// IoT Sensor Data Endpoint
app.post('/api/sensor-data', (req, res) => {
  try {
    const sensorData = req.body;
    console.log('📊 Received sensor data from:', sensorData.deviceId);
    console.log('Data:', JSON.stringify(sensorData, null, 2));
    
    // Store sensor data
    sensorDataStore.push({
      ...sensorData,
      receivedAt: new Date().toISOString()
    });
    
    // Keep only last 100 readings
    if (sensorDataStore.length > 100) {
      sensorDataStore = sensorDataStore.slice(-100);
    }
    
    // Accident detection
    const isAccident = detectAccident(sensorData.sensors);
    
    if (isAccident) {
      const alert = {
        id: `ALERT_${Date.now()}`,
        deviceId: sensorData.deviceId,
        timestamp: new Date().toISOString(),
        location: sensorData.sensors.gps,
        status: 'ACTIVE',
        severity: 'HIGH'
      };
      
      emergencyAlerts.push(alert);
      console.log('🚨 EMERGENCY ALERT TRIGGERED!', alert);
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'Sensor data received successfully',
      accidentDetected: isAccident,
      dataCount: sensorDataStore.length
    });
    
  } catch (error) {
    console.error('Error processing sensor data:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// Get sensor data for a device
app.get('/api/sensor-data/:deviceId', (req, res) => {
  const { deviceId } = req.params;
  const deviceData = sensorDataStore.filter(
    data => data.deviceId === deviceId
  );
  
  res.json(deviceData.slice(-20)); // Return last 20 readings directly
});

// Get emergency alerts
app.get('/api/emergency-alerts', (req, res) => {
  res.json({
    success: true,
    alerts: emergencyAlerts,
    count: emergencyAlerts.length
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  const uniqueDevices = Array.from(new Set(sensorDataStore.map(d => d.deviceId)));
  
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    service: 'RideWayz IoT API',
    connectedDevices: uniqueDevices.length,
    devices: uniqueDevices,
    totalReadings: sensorDataStore.length,
    emergencyAlerts: emergencyAlerts.length
  });
});

// Accident detection algorithm
function detectAccident(sensors) {
  const { accelerometer, gyroscope } = sensors;
  
  // Calculate total acceleration magnitude
  const totalAccel = Math.sqrt(
    Math.pow(accelerometer.x, 2) + 
    Math.pow(accelerometer.y, 2) + 
    Math.pow(accelerometer.z, 2)
  );
  
  // Calculate total gyroscope magnitude
  const totalGyro = Math.sqrt(
    Math.pow(gyroscope.x, 2) + 
    Math.pow(gyroscope.y, 2) + 
    Math.pow(gyroscope.z, 2)
  );
  
  // Accident thresholds (adjust based on testing)
  const ACCEL_THRESHOLD = 20000; // High acceleration/deceleration
  const GYRO_THRESHOLD = 15000;  // High rotation/impact
  
  const isHighAccel = Math.abs(totalAccel) > ACCEL_THRESHOLD;
  const isHighRotation = Math.abs(totalGyro) > GYRO_THRESHOLD;
  
  console.log(`🔍 Accident Check - Accel: ${totalAccel.toFixed(2)}, Gyro: ${totalGyro.toFixed(2)}`);
  
  return isHighAccel || isHighRotation;
}

// Start server
app.listen(PORT, () => {
  console.log('🚀 RideWayz IoT Server started!');
  console.log(`📡 Server running on http://localhost:${PORT}`);
  console.log(`🔗 ESP32 should POST to: http://localhost:${PORT}/api/sensor-data`);
  console.log(`🧪 Test endpoint: http://localhost:${PORT}/api/health`);
  console.log('');
  console.log('Ready to receive ESP32 data! 📊');
  console.log('');
  console.log('Available endpoints:');
  console.log('GET  /api/health - Server health check');
  console.log('POST /api/sensor-data - Receive ESP32 sensor data');
  console.log('GET  /api/sensor-data/:deviceId - Get device sensor history');
  console.log('GET  /api/emergency-alerts - Get emergency alerts');
});

module.exports = app;