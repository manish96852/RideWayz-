export interface AppState {
  currentScreen: 'welcome' | 'vehicle-type' | 'company-selection' | 'details-form' | 'dashboard';
  userId: string | null;
  vehicleType: 'Two-Wheeler' | 'Four-Wheeler' | null;
  vehicleCompany: string | null;
  rideStatus: 'parked' | 'monitoring' | 'overspeed' | 'accident' | 'alerting-guardian';
  rideInterval: ReturnType<typeof setInterval> | null;
  currentSpeed: number;
  distanceTraveled: number;
  overspeedingActive: boolean;
  accidentTriggered: boolean;
  appId: string;
}

export interface UserProfile {
  vehicleType: 'Two-Wheeler' | 'Four-Wheeler';
  vehicleCompany: string;
  vehicleNumber: string;
  riderPhoneNumber: string;
  guardianName: string;
  guardianPhoneNumber: string;
}

export interface VehicleCompanies {
  'Two-Wheeler': string[];
  'Four-Wheeler': string[];
}

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}