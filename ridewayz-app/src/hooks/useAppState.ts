import { useState, useCallback } from 'react';
import { AppState, UserProfile, VehicleCompanies } from '../types';

const vehicleCompanies: VehicleCompanies = {
  'Two-Wheeler': ['Hero', 'Bajaj', 'TVS', 'Honda', 'Royal Enfield', 'Suzuki'],
  'Four-Wheeler': ['Maruti Suzuki', 'Hyundai', 'Tata Motors', 'Mahindra', 'Kia', 'Toyota']
};

const initialState: AppState = {
  currentScreen: 'welcome',
  userId: null,
  vehicleType: null,
  vehicleCompany: null,
  rideStatus: 'parked',
  rideInterval: null,
  currentSpeed: 0,
  distanceTraveled: 0,
  overspeedingActive: false,
  accidentTriggered: false,
  appId: 'ridewayz_demo'
};

export const useAppState = () => {
  const [state, setState] = useState<AppState>(initialState);

  const updateState = useCallback((updates: Partial<AppState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const setCurrentScreen = useCallback((screen: AppState['currentScreen']) => {
    updateState({ currentScreen: screen });
  }, [updateState]);

  const setUserId = useCallback((userId: string | null) => {
    updateState({ userId });
  }, [updateState]);

  const setVehicleType = useCallback((vehicleType: AppState['vehicleType']) => {
    updateState({ vehicleType });
  }, [updateState]);

  const setVehicleCompany = useCallback((vehicleCompany: string | null) => {
    updateState({ vehicleCompany });
  }, [updateState]);

  const setRideStatus = useCallback((rideStatus: AppState['rideStatus']) => {
    updateState({ rideStatus });
  }, [updateState]);

  const startRideMonitoring = useCallback(() => {
    if (state.rideInterval) return;

    updateState({
      overspeedingActive: false,
      accidentTriggered: false,
      rideStatus: 'monitoring'
    });

    let overspeedingTimer: number | null = null;

    const interval = setInterval(() => {
      setState(prev => {
        // Simulate speed (0-120 km/h)
        const newSpeed = Math.random() * 120;
        const newDistance = prev.distanceTraveled + (newSpeed * (10 / 3600));

        let newStatus = prev.rideStatus;
        let newOverspeedingActive = prev.overspeedingActive;
        let newAccidentTriggered = prev.accidentTriggered;

        // AI Accident Detection: Overspeeding
        if (newSpeed > 80 && prev.rideStatus !== 'accident' && prev.rideStatus !== 'alerting-guardian') {
          if (!prev.overspeedingActive) {
            newOverspeedingActive = true;
            newStatus = 'overspeed';
            if (overspeedingTimer) clearTimeout(overspeedingTimer);
            overspeedingTimer = window.setTimeout(() => {
              setState(current => {
                if (current.rideStatus === 'overspeed') {
                  return {
                    ...current,
                    overspeedingActive: false,
                    rideStatus: 'monitoring'
                  };
                }
                return current;
              });
            }, 5000);
          }
        } else if (prev.overspeedingActive && newSpeed <= 80 && prev.rideStatus !== 'accident' && prev.rideStatus !== 'alerting-guardian') {
          newOverspeedingActive = false;
          if (overspeedingTimer) clearTimeout(overspeedingTimer);
          newStatus = 'monitoring';
        }

        // AI Accident Detection: Fall/Accident
        if (Math.random() < 0.01 && !prev.accidentTriggered && prev.rideStatus !== 'accident' && prev.rideStatus !== 'alerting-guardian') {
          newAccidentTriggered = true;
          newStatus = 'accident';
          clearInterval(interval);
          return {
            ...prev,
            currentSpeed: 0,
            rideInterval: null,
            rideStatus: 'accident',
            accidentTriggered: true
          };
        }

        return {
          ...prev,
          currentSpeed: newSpeed,
          distanceTraveled: newDistance,
          rideStatus: newStatus,
          overspeedingActive: newOverspeedingActive,
          accidentTriggered: newAccidentTriggered
        };
      });
    }, 1000) as ReturnType<typeof setInterval>;

    updateState({ rideInterval: interval });
  }, [state.rideInterval, updateState]);

  const stopRideMonitoring = useCallback((isAccident = false) => {
    if (state.rideInterval) {
      clearInterval(state.rideInterval);
    }

    updateState({
      rideInterval: null,
      currentSpeed: 0,
      overspeedingActive: false,
      rideStatus: isAccident ? 'accident' : 'parked'
    });

    if (isAccident) {
      console.warn('ACCIDENT DETECTED! Simulating guardian alert...');
    }
  }, [state.rideInterval, updateState]);

  return {
    state,
    vehicleCompanies,
    updateState,
    setCurrentScreen,
    setUserId,
    setVehicleType,
    setVehicleCompany,
    setRideStatus,
    startRideMonitoring,
    stopRideMonitoring
  };
};