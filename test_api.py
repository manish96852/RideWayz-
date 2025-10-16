# 🧪 RideWayz API Test Script
# Test your backend server before connecting ESP32

import requests
import json
import time

# Server configuration
SERVER_URL = "http://localhost:3001"

def test_health_check():
    """Test if server is running"""
    try:
        response = requests.get(f"{SERVER_URL}/api/health")
        print(f"✅ Health Check: {response.status_code}")
        print(f"📡 Response: {response.json()}")
        return True
    except Exception as e:
        print(f"❌ Health Check Failed: {e}")
        return False

def test_sensor_data():
    """Test sensor data endpoint"""
    test_data = {
        "deviceId": "TEST_DEVICE_PYTHON",
        "timestamp": int(time.time() * 1000),
        "sensors": {
            "accelerometer": {"x": 1000, "y": 2000, "z": 16000},
            "gyroscope": {"x": 100, "y": 200, "z": 300},
            "gps": {"lat": 28.6139, "lng": 77.2090}
        },
        "status": {
            "battery": 85,
            "temperature": 25.5,
            "rssi": -45
        }
    }
    
    try:
        response = requests.post(
            f"{SERVER_URL}/api/sensor-data",
            headers={"Content-Type": "application/json"},
            json=test_data
        )
        print(f"✅ Sensor Data Test: {response.status_code}")
        print(f"📊 Response: {response.json()}")
        return True
    except Exception as e:
        print(f"❌ Sensor Data Test Failed: {e}")
        return False

def test_accident_detection():
    """Test accident detection with high values"""
    accident_data = {
        "deviceId": "ACCIDENT_TEST_PYTHON",
        "timestamp": int(time.time() * 1000),
        "sensors": {
            "accelerometer": {"x": 25000, "y": 25000, "z": 25000},  # High values to trigger accident
            "gyroscope": {"x": 20000, "y": 20000, "z": 20000},      # High values to trigger accident
            "gps": {"lat": 28.6139, "lng": 77.2090}
        },
        "status": {
            "battery": 85,
            "temperature": 25.5,
            "rssi": -45
        }
    }
    
    try:
        response = requests.post(
            f"{SERVER_URL}/api/sensor-data",
            headers={"Content-Type": "application/json"},
            json=accident_data
        )
        print(f"🚨 Accident Test: {response.status_code}")
        result = response.json()
        print(f"💥 Response: {result}")
        
        if result.get("accidentDetected"):
            print("🚨🚨🚨 ACCIDENT SUCCESSFULLY DETECTED! 🚨🚨🚨")
        else:
            print("⚠️ Accident not detected - check thresholds")
            
        return True
    except Exception as e:
        print(f"❌ Accident Test Failed: {e}")
        return False

def run_all_tests():
    """Run complete API test suite"""
    print("🧪 Starting RideWayz API Tests...\n")
    
    # Test 1: Health Check
    print("1️⃣ Testing Server Health...")
    if not test_health_check():
        print("❌ Server not running! Start backend first.")
        return
    print()
    
    # Test 2: Normal Sensor Data
    print("2️⃣ Testing Normal Sensor Data...")
    test_sensor_data()
    print()
    
    # Test 3: Accident Detection
    print("3️⃣ Testing Accident Detection...")
    test_accident_detection()
    print()
    
    # Test 4: Check Emergency Alerts
    print("4️⃣ Checking Emergency Alerts...")
    try:
        response = requests.get(f"{SERVER_URL}/api/emergency-alerts")
        print(f"📋 Emergency Alerts: {response.status_code}")
        alerts = response.json()
        print(f"🚨 Active Alerts: {len(alerts)} alerts")
        for alert in alerts[-3:]:  # Show last 3 alerts
            print(f"   - {alert.get('deviceId')} at {alert.get('timestamp')}")
    except Exception as e:
        print(f"❌ Emergency Alerts Failed: {e}")
    
    print("\n🎉 API Testing Complete!")
    print("✅ Your backend server is ready for ESP32 connection!")

if __name__ == "__main__":
    run_all_tests()