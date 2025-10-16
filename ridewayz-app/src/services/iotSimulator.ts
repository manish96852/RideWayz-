// 🚗 RideWayz IoT Simulator - Hardware ke bina testing
// Ye real ESP32 jaisa behave karega

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

class ESP32Simulator {
  private deviceId: string;
  private isRunning: boolean = false;
  private interval: NodeJS.Timeout | null = null;
  private currentLocation = { lat: 28.6139, lng: 77.2090 };
  private speed = 0;
  private direction = 0;

  constructor(deviceId: string = 'SIM_ESP32_001') {
    this.deviceId = deviceId;
  }

  // 🚀 Simulation start karna
  startSimulation() {
    if (this.isRunning) {
      console.log('⚠️ Simulator already running!');
      return;
    }
    
    this.isRunning = true;
    console.log('🚀 ESP32 Simulator Started!');
    console.log(`📡 Device ID: ${this.deviceId}`);
    
    // Har 2 second mein data send karna
    this.interval = setInterval(() => {
      this.generateAndSendData();
    }, 2000);
  }

  // ⏹️ Simulation stop karna
  stopSimulation() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.isRunning = false;
    console.log('⏹️ ESP32 Simulator Stopped');
  }

  // 📊 Realistic sensor data generate karna
  private generateRealisticSensorData(): SensorData {
    // Normal riding simulation
    const time = Date.now() / 1000;
    
    // Speed simulate karna (0-80 km/h)
    this.speed = Math.max(0, Math.min(80, this.speed + (Math.random() - 0.5) * 10));
    
    // Direction change
    this.direction += (Math.random() - 0.5) * 0.1;
    
    // Location update
    const speedInDegrees = this.speed / 111000; // Convert km/h to degrees/second
    this.currentLocation.lat += Math.cos(this.direction) * speedInDegrees / 3600;
    this.currentLocation.lng += Math.sin(this.direction) * speedInDegrees / 3600;

    // Accelerometer - normal riding vibrations
    const baseAccel = 9810; // 1g in mg
    const vibration = Math.random() * 500 - 250; // Road vibrations
    
    return {
      deviceId: this.deviceId,
      timestamp: Date.now(),
      sensors: {
        accelerometer: {
          x: 100 + vibration + Math.sin(time) * 200,
          y: 200 + vibration + Math.cos(time) * 150,
          z: baseAccel + vibration
        },
        gyroscope: {
          x: Math.random() * 100 - 50,
          y: Math.random() * 80 - 40,
          z: Math.random() * 60 - 30
        },
        gps: {
          lat: this.currentLocation.lat,
          lng: this.currentLocation.lng,
          speed: this.speed
        }
      },
      status: {
        battery: Math.max(20, 100 - (Date.now() % 100000) / 1000), // Battery slowly decreasing
        temperature: 25 + Math.random() * 10, // 25-35°C
        rssi: -30 - Math.random() * 40 // WiFi signal strength
      }
    };
  }

  // 📡 Backend ko data send karna
  private async generateAndSendData() {
    const sensorData = this.generateRealisticSensorData();
    
    try {
      const response = await fetch('http://localhost:3001/api/sensor-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sensorData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`✅ Data sent successfully | Speed: ${sensorData.sensors.gps.speed.toFixed(1)} km/h`);
        
        // Accident detection check
        if (result.accidentDetected) {
          console.log('🚨🚨🚨 ACCIDENT DETECTED BY SERVER! 🚨🚨🚨');
        }
      } else {
        console.log('❌ Failed to send data:', response.status);
      }
    } catch (error) {
      console.log('❌ Network error:', error);
    }
  }

  // 💥 Accident simulate karna
  simulateAccident() {
    console.log('💥 Simulating ACCIDENT scenario...');
    
    const accidentData: SensorData = {
      deviceId: this.deviceId,
      timestamp: Date.now(),
      sensors: {
        accelerometer: {
          x: 25000, // High impact values
          y: 22000,
          z: 28000
        },
        gyroscope: {
          x: 18000, // High rotation values
          y: 20000,
          z: 16000
        },
        gps: {
          lat: this.currentLocation.lat,
          lng: this.currentLocation.lng,
          speed: 0 // Sudden stop
        }
      },
      status: {
        battery: 50,
        temperature: 35,
        rssi: -45
      }
    };

    this.sendAccidentData(accidentData);
  }

  // 🚨 Emergency data send karna
  private async sendAccidentData(data: SensorData) {
    try {
      const response = await fetch('http://localhost:3001/api/sensor-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        console.log('🚨 ACCIDENT DATA SENT TO SERVER!');
      }
    } catch (error) {
      console.log('❌ Failed to send accident data:', error);
    }
  }

  // 🏁 Current status check karna
  getStatus() {
    return {
      isRunning: this.isRunning,
      deviceId: this.deviceId,
      currentLocation: this.currentLocation,
      speed: this.speed
    };
  }
}

// Global simulator instance
const iotSimulator = new ESP32Simulator();

export { ESP32Simulator, iotSimulator };