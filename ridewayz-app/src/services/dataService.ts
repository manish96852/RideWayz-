import { UserProfile } from '../types';

// Simulated Firebase/Firestore operations
export const simulateSignIn = async (isNewUser: boolean): Promise<{ user: { uid: string } }> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const tempUserId = `user_${Date.now()}`;
      console.log(`Simulated ${isNewUser ? 'Sign In' : 'Log In'}. User ID: ${tempUserId}`);
      resolve({ user: { uid: tempUserId } });
    }, 1500);
  });
};

export const saveUserDataToFirestore = async (userId: string, data: UserProfile): Promise<void> => {
  const path = `/artifacts/ridewayz_demo/users/${userId}/ridewayz_profile`;
  console.log(`Simulating save to Firestore at: ${path}`, data);
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("Data saved successfully (simulated).");
      resolve();
    }, 1000);
  });
};

export const fetchUserDataFromFirestore = async (userId: string): Promise<{ exists: boolean; data: () => UserProfile | null }> => {
  const path = `/artifacts/ridewayz_demo/users/${userId}/ridewayz_profile`;
  console.log(`Simulating fetch from Firestore at: ${path}`);
  return new Promise(resolve => {
    setTimeout(() => {
      // For simulation, return a fixed profile
      const simulatedData: UserProfile = {
        vehicleType: "Two-Wheeler",
        vehicleCompany: "Hero",
        vehicleNumber: "KA01AB1234",
        riderPhoneNumber: "9876543210",
        guardianName: "Mom",
        guardianPhoneNumber: "9988776655"
      };
      console.log("Data fetched successfully (simulated).", simulatedData);
      resolve({ exists: true, data: () => simulatedData });
    }, 1000);
  });
};