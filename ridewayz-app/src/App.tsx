import React, { useState } from 'react';
import { useAppState } from './hooks/useAppState';
import { simulateSignIn, fetchUserDataFromFirestore, saveUserDataToFirestore } from './services/dataService';
import { LoadingOverlay } from './components/LoadingOverlay';
import { AccidentAlertModal } from './components/AccidentAlertModal';
import { WelcomeScreen } from './components/WelcomeScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { ProfileScreen } from './components/ProfileScreen';
import { TripHistoryScreen } from './components/TripHistoryScreen';
import { AnalyticsScreen } from './components/AnalyticsScreen';
import { SafetyCenterScreen } from './components/SafetyCenterScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { IoTDeviceScreen } from './components/IoTDeviceScreen';
import { UserProfile } from './types';
import './index.css';

const App: React.FC = () => {
  const {
    state,
    vehicleCompanies,
    setCurrentScreen,
    setUserId,
    setVehicleType,
    setVehicleCompany,
    setRideStatus,
    startRideMonitoring,
    stopRideMonitoring
  } = useAppState();

  const [loading, setLoading] = useState(false);
  const [showAccidentAlert, setShowAccidentAlert] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNavScreen, setActiveNavScreen] = useState<string>('dashboard');
  const [userProfile, setUserProfile] = useState<UserProfile>({
    vehicleType: 'Two-Wheeler',
    vehicleCompany: '',
    vehicleNumber: '',
    riderPhoneNumber: '',
    guardianName: '',
    guardianPhoneNumber: ''
  });

  // Handle navigation
  const handleNavigate = (screen: string) => {
    setActiveNavScreen(screen);
    setSidebarOpen(false);
  };

  // Handle sidebar toggle
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Handle sign in (new user)
  const handleSignIn = async () => {
    setLoading(true);
    try {
      const result = await simulateSignIn(true);
      setUserId(result.user.uid);
      setCurrentScreen('vehicle-type');
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle log in (existing user)
  const handleLogIn = async () => {
    setLoading(true);
    try {
      const result = await simulateSignIn(false);
      setUserId(result.user.uid);
      
      // Check if user profile exists
      const profileData = await fetchUserDataFromFirestore(result.user.uid);
      if (profileData.exists && profileData.data()) {
        const data = profileData.data()!;
        setUserProfile(data);
        setVehicleType(data.vehicleType);
        setVehicleCompany(data.vehicleCompany);
        setCurrentScreen('dashboard');
      } else {
        setCurrentScreen('vehicle-type');
      }
    } catch (error) {
      console.error('Log in error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle vehicle type selection
  const handleVehicleTypeSelect = (type: 'Two-Wheeler' | 'Four-Wheeler') => {
    setVehicleType(type);
    setUserProfile(prev => ({ ...prev, vehicleType: type }));
    setCurrentScreen('company-selection');
  };

  // Handle company selection
  const handleCompanySelect = (company: string) => {
    setVehicleCompany(company);
    setUserProfile(prev => ({ ...prev, vehicleCompany: company }));
    setCurrentScreen('details-form');
  };

  // Handle form submission
  const handleFormSubmit = async (formData: Omit<UserProfile, 'vehicleType' | 'vehicleCompany'>) => {
    setLoading(true);
    try {
      const completeProfile: UserProfile = {
        ...formData,
        vehicleType: state.vehicleType!,
        vehicleCompany: state.vehicleCompany!
      };
      
      if (state.userId) {
        await saveUserDataToFirestore(state.userId, completeProfile);
        setUserProfile(completeProfile);
        setCurrentScreen('dashboard');
      }
    } catch (error) {
      console.error('Save profile error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle ride monitoring toggle
  const handleToggleRide = () => {
    if (state.rideInterval) {
      stopRideMonitoring(false);
    } else {
      startRideMonitoring();
    }
  };

  // Handle SOS button
  const handleSOSClick = () => {
    stopRideMonitoring(true);
    setShowAccidentAlert(true);
    setRideStatus('accident');
  };

  // Handle accident alert dismissal
  const handleDismissAccident = () => {
    setShowAccidentAlert(false);
    if (state.rideStatus === 'accident') {
      setRideStatus('alerting-guardian');
    }
  };

  // Show accident alert when status changes to accident
  React.useEffect(() => {
    if (state.rideStatus === 'accident') {
      setShowAccidentAlert(true);
    }
  }, [state.rideStatus]);

  const renderMainContent = () => {
    // Only render navigation content when we're on the dashboard screen
    if (state.currentScreen !== 'dashboard') {
      return null;
    }

    switch (activeNavScreen) {
      case 'dashboard':
        return (
          <DashboardScreen 
            state={state}
            onToggleRide={handleToggleRide}
            onSOSClick={handleSOSClick}
          />
        );
      case 'profile':
        return <ProfileScreen userProfile={userProfile} onUpdateProfile={setUserProfile} />;
      case 'trips':
        return <TripHistoryScreen />;
      case 'analytics':
        return <AnalyticsScreen />;
      case 'safety':
        return <SafetyCenterScreen />;
      case 'iot-device':
        return <IoTDeviceScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return (
          <DashboardScreen 
            state={state}
            onToggleRide={handleToggleRide}
            onSOSClick={handleSOSClick}
          />
        );
    }
  };

  const renderCurrentScreen = () => {
    switch (state.currentScreen) {
      case 'welcome':
        return <WelcomeScreen onSignIn={handleSignIn} onLogIn={handleLogIn} />;
      
      case 'vehicle-type':
        return (
          <div className="screen-container">
            <div className="card text-center p-8">
              <h2 className="text-2xl font-bold text-blue-800 mb-8">Choose Vehicle Type</h2>
              <button 
                onClick={() => handleVehicleTypeSelect('Two-Wheeler')}
                className="btn-primary w-full mb-4 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 mr-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M7.5 3v18m-4.5-3h15.75m-1.5-1.5a4.5 4.5 0 01-9 0m9 0a4.5 4.5 0 00-9 0m9 0h2.25c.577 0 1.122-.084 1.63-.234m-1.63 0a.75.75 0 01-.75-.75V7.5c0-.66.36-1.23.896-1.579M12.75 18H7.5s-2.25-.75-2.25-2.25V7.5c0-1.5 2.25-2.25 2.25-2.25H18c1.5 0 2.25.75 2.25 2.25V13.5m-13.5 0H7.5s-2.25-.75-2.25-2.25V7.5c0-1.5 2.25-2.25 2.25-2.25h3.75m-6 3H7.5" />
                </svg>
                Two-Wheeler
              </button>
              <button 
                onClick={() => handleVehicleTypeSelect('Four-Wheeler')}
                className="btn-primary w-full flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 mr-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M7.5 3v18m-4.5-3h15.75m-1.5-1.5a4.5 4.5 0 01-9 0m9 0a4.5 4.5 0 00-9 0m9 0h2.25c.577 0 1.122-.084 1.63-.234m-1.63 0a.75.75 0 01-.75-.75V7.5c0-.66.36-1.23.896-1.579M12.75 18H7.5s-2.25-.75-2.25-2.25V7.5c0-1.5 2.25-2.25 2.25-2.25H18c1.5 0 2.25.75 2.25 2.25V13.5m-13.5 0H7.5s-2.25-.75-2.25-2.25V7.5c0-1.5 2.25-2.25 2.25-2.25h3.75m-6 3H7.5" />
                </svg>
                Four-Wheeler
              </button>
            </div>
          </div>
        );
      
      case 'company-selection':
        return (
          <div className="screen-container">
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-blue-800 mb-8">Select Vehicle Company</h2>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-semibold mb-2">Company</label>
                <select 
                  className="input-field cursor-pointer"
                  onChange={(e) => e.target.value && handleCompanySelect(e.target.value)}
                  defaultValue=""
                >
                  <option value="" disabled>Select Company</option>
                  {state.vehicleType && vehicleCompanies[state.vehicleType].map(company => (
                    <option key={company} value={company}>{company}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );
      
      case 'details-form':
        return (
          <div className="screen-container">
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-blue-800 mb-8">Enter Vehicle & Guardian Details</h2>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleFormSubmit({
                  vehicleNumber: formData.get('vehicleNumber') as string,
                  riderPhoneNumber: formData.get('riderPhoneNumber') as string,
                  guardianName: formData.get('guardianName') as string,
                  guardianPhoneNumber: formData.get('guardianPhoneNumber') as string
                });
              }}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">Vehicle Number</label>
                  <input 
                    type="text" 
                    name="vehicleNumber"
                    className="input-field" 
                    placeholder="e.g., KA01AB1234" 
                    required 
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">Your Phone Number</label>
                  <input 
                    type="tel" 
                    name="riderPhoneNumber"
                    className="input-field" 
                    placeholder="e.g., 9876543210" 
                    required 
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">Guardian Contact Name</label>
                  <input 
                    type="text" 
                    name="guardianName"
                    className="input-field" 
                    placeholder="e.g., Mom / Dad / Friend" 
                    required 
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">Guardian Phone Number</label>
                  <input 
                    type="tel" 
                    name="guardianPhoneNumber"
                    className="input-field" 
                    placeholder="e.g., 9876543210" 
                    required 
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  Save Details & Go to Dashboard
                </button>
              </form>
            </div>
          </div>
        );
      
      case 'dashboard':
        return (
          <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
            {/* Navigation */}
            <Navbar 
              onMenuClick={toggleSidebar}
              isRideActive={state.rideStatus === 'monitoring'}
              activeScreen={activeNavScreen}
              onNavigate={handleNavigate}
            />
            
            {/* Sidebar - Hidden by default, only show on mobile when menu clicked */}
            <Sidebar 
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
              onNavigate={handleNavigate}
              currentScreen={activeNavScreen}
              userProfile={userProfile}
            />
            
            {/* Main Content */}
            <div className="min-h-screen">
              {renderMainContent()}
            </div>
          </div>
        );
      
      default:
        return <WelcomeScreen onSignIn={handleSignIn} onLogIn={handleLogIn} />;
    }
  };

  return (
    <div className="bg-blue-50">
      {renderCurrentScreen()}
      
      <LoadingOverlay isVisible={loading} />
      
      <AccidentAlertModal 
        isVisible={showAccidentAlert}
        onDismiss={handleDismissAccident}
      />
    </div>
  );
};

export default App;