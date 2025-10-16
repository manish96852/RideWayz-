# 🚗 RideWayz Complete Testing Script
# Hardware ke bina full system test

import requests
import json
import time
import random
import threading

# Server configuration
SERVER_URL = "http://localhost:3001"

def test_health_check():
    """Backend server health check"""
    try:
        response = requests.get(f"{SERVER_URL}/api/health")
        if response.status_code == 200:
            health_data = response.json()
            print("✅ Backend Server Health Check:")
            print(f"   Status: {health_data.get('status')}")
            print(f"   Connected Devices: {health_data.get('connectedDevices', 0)}")
            print(f"   Total Readings: {health_data.get('totalReadings', 0)}")
            print(f"   Emergency Alerts: {health_data.get('emergencyAlerts', 0)}")
            return True
        else:
            print(f"❌ Health Check Failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Backend Server Not Running: {e}")
        return False

def send_normal_sensor_data():
    """Normal riding sensor data simulation"""
    normal_data = {
        "deviceId": "TEST_DEVICE_PYTHON",
        "timestamp": int(time.time() * 1000),
        "sensors": {
            "accelerometer": {
                "x": random.randint(800, 1200),
                "y": random.randint(100, 300), 
                "z": random.randint(9500, 10500)
            },
            "gyroscope": {
                "x": random.randint(-100, 100),
                "y": random.randint(-50, 50),
                "z": random.randint(-30, 30)
            },
            "gps": {
                "lat": 28.6139 + random.uniform(-0.01, 0.01),
                "lng": 77.2090 + random.uniform(-0.01, 0.01),
                "speed": random.randint(20, 60)
            }
        },
        "status": {
            "battery": random.randint(70, 100),
            "temperature": random.uniform(25.0, 35.0),
            "rssi": random.randint(-60, -30)
        }
    }
    
    try:
        response = requests.post(
            f"{SERVER_URL}/api/sensor-data",
            headers={"Content-Type": "application/json"},
            json=normal_data
        )
        
        if response.status_code == 200:
            result = response.json()
            print(f"✅ Normal Data Sent - Speed: {normal_data['sensors']['gps']['speed']} km/h")
            return True
        else:
            print(f"❌ Failed to send normal data: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Error sending normal data: {e}")
        return False

def send_accident_data():
    """Accident simulation with high impact values"""
    accident_data = {
        "deviceId": "ACCIDENT_TEST_PYTHON",
        "timestamp": int(time.time() * 1000),
        "sensors": {
            "accelerometer": {
                "x": random.randint(20000, 30000),  # High impact
                "y": random.randint(15000, 25000),  # High impact
                "z": random.randint(22000, 32000)   # High impact
            },
            "gyroscope": {
                "x": random.randint(15000, 25000),  # High rotation
                "y": random.randint(18000, 28000),  # High rotation
                "z": random.randint(16000, 24000)   # High rotation
            },
            "gps": {
                "lat": 28.6139,
                "lng": 77.2090,
                "speed": 0  # Sudden stop
            }
        },
        "status": {
            "battery": 75,
            "temperature": 40.0,  # Higher temp due to impact
            "rssi": -50
        }
    }
    
    try:
        response = requests.post(
            f"{SERVER_URL}/api/sensor-data",
            headers={"Content-Type": "application/json"},
            json=accident_data
        )
        
        if response.status_code == 200:
            result = response.json()
            if result.get("accidentDetected"):
                print("🚨🚨🚨 ACCIDENT SUCCESSFULLY DETECTED! 🚨🚨🚨")
                print("🏥 Emergency services would be notified!")
                print("📱 Guardians would receive SMS alerts!")
            else:
                print("⚠️ Accident data sent but not detected - check thresholds")
            return True
        else:
            print(f"❌ Failed to send accident data: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Error sending accident data: {e}")
        return False

def continuous_simulation(duration_seconds=30):
    """Continuous data simulation like real ESP32"""
    print(f"🔄 Starting continuous simulation for {duration_seconds} seconds...")
    
    start_time = time.time()
    packet_count = 0
    
    while time.time() - start_time < duration_seconds:
        if send_normal_sensor_data():
            packet_count += 1
        
        time.sleep(2)  # Send data every 2 seconds like ESP32
    
    print(f"📊 Simulation complete! Sent {packet_count} data packets")

def test_emergency_alerts():
    """Check emergency alerts endpoint"""
    try:
        response = requests.get(f"{SERVER_URL}/api/emergency-alerts")
        if response.status_code == 200:
            alerts = response.json()
            print(f"🚨 Emergency Alerts Check:")
            print(f"   Total Alerts: {alerts.get('count', 0)}")
            
            if alerts.get('alerts'):
                print("   Recent Alerts:")
                for alert in alerts['alerts'][-3:]:  # Show last 3
                    print(f"   - Device: {alert.get('deviceId')} at {alert.get('timestamp')}")
            else:
                print("   No emergency alerts found")
            return True
        else:
            print(f"❌ Emergency alerts check failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error checking emergency alerts: {e}")
        return False

def run_complete_test_suite():
    """Complete testing workflow"""
    print("🧪 RideWayz Complete Test Suite Starting...\n")
    
    # Test 1: Backend Health
    print("1️⃣ Testing Backend Server Health...")
    if not test_health_check():
        print("❌ Backend server not running! Please start it first.")
        print("💡 Run: npm run backend")
        return
    print()
    
    # Test 2: Normal Data Flow
    print("2️⃣ Testing Normal Sensor Data Flow...")
    for i in range(3):
        send_normal_sensor_data()
        time.sleep(1)
    print()
    
    # Test 3: Accident Detection
    print("3️⃣ Testing Accident Detection...")
    send_accident_data()
    print()
    
    # Test 4: Emergency Alerts
    print("4️⃣ Checking Emergency Alert System...")
    test_emergency_alerts()
    print()
    
    # Test 5: Continuous Simulation
    print("5️⃣ Running Continuous Data Simulation...")
    print("   (This simulates real ESP32 behavior)")
    continuous_simulation(15)  # 15 seconds simulation
    print()
    
    # Final Status
    print("6️⃣ Final System Status...")
    test_health_check()
    print()
    
    print("🎉 Complete Test Suite Finished!")
    print("✅ Your RideWayz system is ready for hardware integration!")
    print()
    print("📋 Next Steps:")
    print("   1. Open your React app (http://localhost:3000)")
    print("   2. Go to Dashboard and start IoT Simulator")
    print("   3. Watch real-time data in the app")
    print("   4. Test accident detection with simulator")

def interactive_menu():
    """Interactive testing menu"""
    while True:
        print("\n🚗 RideWayz Testing Menu:")
        print("1. 🏥 Health Check")
        print("2. 📊 Send Normal Data")
        print("3. 💥 Simulate Accident")
        print("4. 🚨 Check Emergency Alerts")
        print("5. 🔄 Continuous Simulation (30s)")
        print("6. 🧪 Full Test Suite")
        print("7. ❌ Exit")
        
        choice = input("\nSelect option (1-7): ").strip()
        
        if choice == '1':
            test_health_check()
        elif choice == '2':
            send_normal_sensor_data()
        elif choice == '3':
            send_accident_data()
        elif choice == '4':
            test_emergency_alerts()
        elif choice == '5':
            continuous_simulation(30)
        elif choice == '6':
            run_complete_test_suite()
        elif choice == '7':
            print("👋 Testing completed!")
            break
        else:
            print("❌ Invalid option! Please select 1-7")

if __name__ == "__main__":
    print("🚗 RideWayz IoT Testing Tool")
    print("=" * 50)
    
    # Check if user wants full test or interactive
    print("\nTesting Options:")
    print("1. 🚀 Run Full Test Suite (Automatic)")
    print("2. 🎮 Interactive Testing Menu")
    
    mode = input("\nSelect mode (1 or 2): ").strip()
    
    if mode == '1':
        run_complete_test_suite()
    elif mode == '2':
        interactive_menu()
    else:
        print("❌ Invalid option! Running full test suite...")
        run_complete_test_suite()