/*
 * RideWayz ESP32 IoT Sensor Code
 * 
 * Hardware Required:
 * - ESP32 Development Board
 * - MPU6050 (Accelerometer + Gyroscope)
 * - Jumper Wires
 * 
 * Connections:
 * MPU6050 VCC -> ESP32 3.3V
 * MPU6050 GND -> ESP32 GND
 * MPU6050 SDA -> ESP32 GPIO 21
 * MPU6050 SCL -> ESP32 GPIO 22
 */

#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <Wire.h>

// WiFi Configuration (Update with your WiFi credentials)
const char* ssid = "YOUR_WIFI_NAME";           // Replace with your WiFi name
const char* password = "YOUR_WIFI_PASSWORD";   // Replace with your WiFi password

// Server Configuration (Your computer's IP address)
const char* serverURL = "http://192.168.0.104:3001/api/sensor-data";  // Your computer's IP

// MPU6050 I2C address
const int MPU6050_addr = 0x68;

// Device Configuration
const String DEVICE_ID = "ESP32_RIDEWAYZ_001";

// Timing Configuration
unsigned long lastSensorRead = 0;
const unsigned long SENSOR_INTERVAL = 1000; // Send data every 1 second

// Sensor Data Variables
int16_t accelerometer_x, accelerometer_y, accelerometer_z;
int16_t gyroscope_x, gyroscope_y, gyroscope_z;
int16_t temperature;

// Status Variables
bool wifiConnected = false;
bool mpuInitialized = false;
int dataPacketsSent = 0;

void setup() {
  Serial.begin(115200);
  Serial.println("\n🚀 RideWayz ESP32 IoT Device Starting...");
  
  // Initialize I2C communication
  Wire.begin();
  
  // Initialize MPU6050
  initializeMPU6050();
  
  // Connect to WiFi
  connectToWiFi();
  
  // Print device information
  printDeviceInfo();
}

void loop() {
  // Check WiFi connection
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("❌ WiFi disconnected! Reconnecting...");
    connectToWiFi();
  }
  
  // Read and send sensor data at specified interval
  if (millis() - lastSensorRead >= SENSOR_INTERVAL) {
    if (mpuInitialized) {
      readAndSendSensorData();
    } else {
      Serial.println("⚠️ MPU6050 not initialized. Retrying...");
      initializeMPU6050();
    }
    lastSensorRead = millis();
  }
  
  delay(100); // Small delay to prevent watchdog issues
}

void initializeMPU6050() {
  Serial.println("🔧 Initializing MPU6050...");
  
  // Wake up MPU6050
  Wire.beginTransmission(MPU6050_addr);
  Wire.write(0x6B);  // PWR_MGMT_1 register
  Wire.write(0);     // Set to zero (wakes up the MPU6050)
  Wire.endTransmission(true);
  
  // Test connection
  Wire.beginTransmission(MPU6050_addr);
  if (Wire.endTransmission() == 0) {
    mpuInitialized = true;
    Serial.println("✅ MPU6050 initialized successfully!");
  } else {
    mpuInitialized = false;
    Serial.println("❌ MPU6050 initialization failed!");
  }
}

void connectToWiFi() {
  Serial.println("🌐 Connecting to WiFi...");
  Serial.print("SSID: ");
  Serial.println(ssid);
  
  WiFi.begin(ssid, password);
  
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 20) {
    delay(1000);
    Serial.print(".");
    attempts++;
  }
  
  if (WiFi.status() == WL_CONNECTED) {
    wifiConnected = true;
    Serial.println("\n✅ WiFi Connected!");
    Serial.print("📍 IP Address: ");
    Serial.println(WiFi.localIP());
    Serial.print("📶 Signal Strength: ");
    Serial.println(WiFi.RSSI());
  } else {
    wifiConnected = false;
    Serial.println("\n❌ WiFi Connection Failed!");
  }
}

void readAndSendSensorData() {
  // Read sensor data from MPU6050
  readMPU6050();
  
  // Create JSON payload
  DynamicJsonDocument doc(1024);
  doc["deviceId"] = DEVICE_ID;
  doc["timestamp"] = millis();
  
  // Add sensor data
  JsonObject sensors = doc.createNestedObject("sensors");
  
  JsonObject accel = sensors.createNestedObject("accelerometer");
  accel["x"] = accelerometer_x;
  accel["y"] = accelerometer_y;
  accel["z"] = accelerometer_z;
  
  JsonObject gyro = sensors.createNestedObject("gyroscope");
  gyro["x"] = gyroscope_x;
  gyro["y"] = gyroscope_y;
  gyro["z"] = gyroscope_z;
  
  // Add simulated GPS (replace with real GPS module data)
  JsonObject gps = sensors.createNestedObject("gps");
  gps["lat"] = 28.6139 + (random(-100, 100) / 10000.0);
  gps["lng"] = 77.2090 + (random(-100, 100) / 10000.0);
  
  // Add device status
  JsonObject status = doc.createNestedObject("status");
  status["battery"] = random(70, 100);  // Simulated battery level
  status["temperature"] = temperature / 340.0 + 36.53; // Convert to Celsius
  status["rssi"] = WiFi.RSSI();
  
  // Convert to string
  String jsonString;
  serializeJson(doc, jsonString);
  
  // Print sensor readings to serial monitor
  printSensorData();
  
  // Send to server
  if (wifiConnected) {
    sendDataToServer(jsonString);
  } else {
    Serial.println("❌ Cannot send data - WiFi not connected");
  }
}

void readMPU6050() {
  // Request data from MPU6050
  Wire.beginTransmission(MPU6050_addr);
  Wire.write(0x3B);  // Starting with register 0x3B (ACCEL_XOUT_H)
  Wire.endTransmission(false);
  Wire.requestFrom(MPU6050_addr, 14, true);  // Request 14 registers
  
  // Read accelerometer data
  accelerometer_x = Wire.read() << 8 | Wire.read();  // 0x3B (ACCEL_XOUT_H) & 0x3C (ACCEL_XOUT_L)
  accelerometer_y = Wire.read() << 8 | Wire.read();  // 0x3D (ACCEL_YOUT_H) & 0x3E (ACCEL_YOUT_L)
  accelerometer_z = Wire.read() << 8 | Wire.read();  // 0x3F (ACCEL_ZOUT_H) & 0x40 (ACCEL_ZOUT_L)
  
  // Read temperature
  temperature = Wire.read() << 8 | Wire.read();      // 0x41 (TEMP_OUT_H) & 0x42 (TEMP_OUT_L)
  
  // Read gyroscope data
  gyroscope_x = Wire.read() << 8 | Wire.read();      // 0x43 (GYRO_XOUT_H) & 0x44 (GYRO_XOUT_L)
  gyroscope_y = Wire.read() << 8 | Wire.read();      // 0x45 (GYRO_YOUT_H) & 0x46 (GYRO_YOUT_L)
  gyroscope_z = Wire.read() << 8 | Wire.read();      // 0x47 (GYRO_ZOUT_H) & 0x48 (GYRO_ZOUT_L)
}

void sendDataToServer(String jsonData) {
  HTTPClient http;
  http.begin(serverURL);
  http.addHeader("Content-Type", "application/json");
  
  int httpResponseCode = http.POST(jsonData);
  
  if (httpResponseCode > 0) {
    String response = http.getString();
    dataPacketsSent++;
    
    Serial.print("📤 Data sent successfully! ");
    Serial.print("Response: ");
    Serial.println(response);
    Serial.print("📊 Total packets sent: ");
    Serial.println(dataPacketsSent);
    
    // Check if accident was detected
    if (response.indexOf("accidentDetected\":true") > 0) {
      Serial.println("🚨🚨🚨 ACCIDENT DETECTED BY SERVER! 🚨🚨🚨");
    }
    
  } else {
    Serial.print("❌ Error sending data. HTTP Response: ");
    Serial.println(httpResponseCode);
    
    // Print error details
    if (httpResponseCode == -1) {
      Serial.println("Connection failed");
    } else if (httpResponseCode == -11) {
      Serial.println("Timeout");
    }
  }
  
  http.end();
}

void printSensorData() {
  Serial.println("\n📊 Sensor Readings:");
  Serial.print("Accelerometer - X: "); Serial.print(accelerometer_x);
  Serial.print(" | Y: "); Serial.print(accelerometer_y);
  Serial.print(" | Z: "); Serial.println(accelerometer_z);
  
  Serial.print("Gyroscope - X: "); Serial.print(gyroscope_x);
  Serial.print(" | Y: "); Serial.print(gyroscope_y);
  Serial.print(" | Z: "); Serial.println(gyroscope_z);
  
  float temp_celsius = temperature / 340.0 + 36.53;
  Serial.print("Temperature: "); Serial.print(temp_celsius); Serial.println("°C");
  
  // Calculate magnitude for accident detection visualization
  float accel_magnitude = sqrt(pow(accelerometer_x, 2) + pow(accelerometer_y, 2) + pow(accelerometer_z, 2));
  float gyro_magnitude = sqrt(pow(gyroscope_x, 2) + pow(gyroscope_y, 2) + pow(gyroscope_z, 2));
  
  Serial.print("Acceleration Magnitude: "); Serial.println(accel_magnitude);
  Serial.print("Gyroscope Magnitude: "); Serial.println(gyro_magnitude);
  
  // Local accident detection (matches server algorithm)
  if (accel_magnitude > 20000 || gyro_magnitude > 15000) {
    Serial.println("⚠️ LOCAL ACCIDENT THRESHOLD EXCEEDED! ⚠️");
  }
  
  Serial.println("─────────────────────────");
}

void printDeviceInfo() {
  Serial.println("\n🔧 Device Information:");
  Serial.print("Device ID: "); Serial.println(DEVICE_ID);
  Serial.print("WiFi SSID: "); Serial.println(ssid);
  Serial.print("Server URL: "); Serial.println(serverURL);
  Serial.print("Sensor Interval: "); Serial.print(SENSOR_INTERVAL); Serial.println("ms");
  Serial.println("\n📡 Ready to send data to RideWayz server!");
  Serial.println("═══════════════════════════════════════");
}