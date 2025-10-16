# 🚗 RideWayz ESP32 IoT Setup Guide
## Complete Step-by-Step Implementation

### ⚙️ **PHASE 1: Hardware Setup**

#### 🛒 **Required Components:**
1. **ESP32 Development Board** (NodeMCU or WROOM-32)
2. **MPU6050 Sensor** (6-axis accelerometer + gyroscope)
3. **Jumper Wires** (Male-to-Female)
4. **Breadboard** (optional)
5. **USB Cable** (for ESP32 programming)

#### 🔌 **Wiring Connections:**
```
MPU6050 → ESP32
├── VCC → 3.3V
├── GND → GND
├── SDA → GPIO 21
└── SCL → GPIO 22
```

### 💻 **PHASE 2: Software Setup**

#### 📦 **Install Arduino IDE:**
1. Download Arduino IDE from: https://www.arduino.cc/en/software
2. Install and open Arduino IDE

#### 🔧 **ESP32 Board Configuration:**
1. **File → Preferences**
2. **Additional Board Manager URLs:** 
   ```
   https://dl.espressif.com/dl/package_esp32_index.json
   ```
3. **Tools → Board → Boards Manager**
4. Search "ESP32" and install **ESP32 by Espressif Systems**

#### 📚 **Install Required Libraries:**
1. **Sketch → Include Library → Manage Libraries**
2. Install these libraries:
   - **ArduinoJson** by Benoit Blanchon
   - **WiFi** (built-in with ESP32)
   - **HTTPClient** (built-in with ESP32)
   - **Wire** (built-in)

### 🛠️ **PHASE 3: Code Upload**

#### 1️⃣ **Configure WiFi & Server:**
Edit the ESP32 code (`ESP32_RideWayz_Code.ino`):
```cpp
// Update these lines:
const char* ssid = "YOUR_WIFI_NAME";           // Your WiFi name
const char* password = "YOUR_WIFI_PASSWORD";   // Your WiFi password
const char* serverURL = "http://YOUR_PC_IP:3001/api/sensor-data";  // Your computer's IP
```

#### 2️⃣ **Find Your Computer's IP Address:**
**On Windows (PowerShell):**
```powershell
ipconfig | findstr "IPv4"
```

#### 3️⃣ **Upload Code to ESP32:**
1. **Connect ESP32** to computer via USB
2. **Tools → Board:** Select "ESP32 Dev Module"
3. **Tools → Port:** Select the COM port for ESP32
4. **Upload** the code (Ctrl+U)

### 🔍 **PHASE 4: Testing & Verification**

#### 📡 **Serial Monitor Testing:**
1. **Tools → Serial Monitor** (Ctrl+Shift+M)
2. **Set baud rate:** 115200
3. **Expected output:**
```
🚀 RideWayz ESP32 IoT Device Starting...
🔧 Initializing MPU6050...
✅ MPU6050 initialized successfully!
🌐 Connecting to WiFi...
✅ WiFi Connected!
📍 IP Address: 192.168.1.150
📡 Ready to send data to RideWayz server!
```

#### 🧪 **API Testing with Postman:**
1. **Install Postman:** https://www.postman.com/downloads/
2. **Create new POST request:**
   - **URL:** `http://localhost:3001/api/sensor-data`
   - **Method:** POST
   - **Headers:** `Content-Type: application/json`
   - **Body (raw JSON):**
   ```json
   {
     "deviceId": "TEST_DEVICE",
     "timestamp": 1234567890,
     "sensors": {
       "accelerometer": { "x": 1000, "y": 2000, "z": 16000 },
       "gyroscope": { "x": 100, "y": 200, "z": 300 },
       "gps": { "lat": 28.6139, "lng": 77.2090 }
     },
     "status": {
       "battery": 85,
       "temperature": 25.5,
       "rssi": -45
     }
   }
   ```

#### 🔥 **Real-time Data Monitoring:**
**Check your backend server terminal - you should see:**
```
📊 Sensor data received from: ESP32_RIDEWAYZ_001
🔍 Checking for accidents...
✅ Normal operation detected
📡 Data stored successfully
```

### 🚨 **PHASE 5: Emergency Testing**

#### 💥 **Accident Simulation:**
1. **Shake the ESP32** vigorously (simulate accident)
2. **Check Serial Monitor** for local detection:
   ```
   ⚠️ LOCAL ACCIDENT THRESHOLD EXCEEDED! ⚠️
   ```
3. **Check Backend Server** for emergency response:
   ```
   🚨 ACCIDENT DETECTED! 
   Emergency alert triggered for device: ESP32_RIDEWAYZ_001
   ```

#### 📱 **Test High-Impact Values with Postman:**
Send this JSON to trigger accident detection:
```json
{
  "deviceId": "EMERGENCY_TEST",
  "timestamp": 1234567890,
  "sensors": {
    "accelerometer": { "x": 25000, "y": 25000, "z": 25000 },
    "gyroscope": { "x": 20000, "y": 20000, "z": 20000 },
    "gps": { "lat": 28.6139, "lng": 77.2090 }
  },
  "status": {
    "battery": 85,
    "temperature": 25.5,
    "rssi": -45
  }
}
```

### 📊 **PHASE 6: Complete System Check**

#### ✅ **Verification Checklist:**
- [ ] **ESP32 Hardware:** Connected and powered
- [ ] **WiFi Connection:** ESP32 connected to internet
- [ ] **Backend Server:** Running on localhost:3001
- [ ] **Sensor Data:** Flowing from ESP32 to server
- [ ] **Accident Detection:** Working for high-impact values
- [ ] **Real-time Updates:** Data updating every second
- [ ] **Emergency Alerts:** Triggering when thresholds exceeded

#### 🔄 **Full System Flow:**
```
ESP32 → WiFi → Backend Server → Accident Detection → Emergency Response
  ↓         ↓           ↓              ↓                    ↓
Sensors → JSON → POST Request → Algorithm → Alert System
```

### 🐛 **Common Issues & Solutions**

#### ❌ **WiFi Not Connecting:**
- Double-check SSID and password
- Ensure 2.4GHz WiFi (ESP32 doesn't support 5GHz)
- Try moving closer to router

#### ❌ **MPU6050 Not Detected:**
- Check wiring connections
- Ensure proper voltage (3.3V, not 5V)
- Try different I2C pins if needed

#### ❌ **Server Connection Failed:**
- Verify your computer's IP address
- Ensure backend server is running
- Check firewall settings
- Test with Postman first

#### ❌ **No Data in Serial Monitor:**
- Check baud rate (115200)
- Press ESP32 reset button
- Verify COM port selection

### 🎯 **Success Indicators**

#### ✅ **Everything Working When You See:**
1. **ESP32 Serial Monitor:**
   ```
   📤 Data sent successfully! Response: {"status":"success"}
   📊 Total packets sent: 42
   ```

2. **Backend Server:**
   ```
   🚀 RideWayz IoT Server started on port 3001
   📊 Sensor data received from: ESP32_RIDEWAYZ_001
   ```

3. **Emergency Detection:**
   ```
   🚨🚨🚨 ACCIDENT DETECTED BY SERVER! 🚨🚨🚨
   ```

### 🚀 **Next Steps**
- Integrate with React frontend for real-time dashboard
- Add GPS module for accurate location tracking
- Implement SMS/email emergency notifications
- Add more sensors (heart rate, temperature)
- Deploy to cloud server for remote monitoring

---

## 🎉 **Congratulations!**
Your RideWayz IoT system is now fully operational with ESP32 hardware integration!