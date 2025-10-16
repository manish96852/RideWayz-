import React, { useState } from 'react';

interface SettingsScreenProps {
  // Add props if needed
}

export const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  const [notifications, setNotifications] = useState({
    speedAlerts: true,
    safetyScores: true,
    tripReports: false,
    emergencyAlerts: true,
    weatherWarnings: true
  });

  const [preferences, setPreferences] = useState({
    units: 'metric',
    language: 'english',
    theme: 'dark',
    autoStart: true,
    voiceCommands: false
  });

  const [privacy, setPrivacy] = useState({
    shareData: false,
    locationTracking: true,
    analytics: true,
    crashReporting: true
  });

  const toggleNotification = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const togglePreference = (key: string, value?: string) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value || !prev[key as keyof typeof prev]
    }));
  };

  const togglePrivacy = (key: string) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Settings</h2>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          <span className="text-green-400 text-sm font-medium">All Systems Online</span>
        </div>
      </div>

      {/* Notifications Settings */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-bold text-white mb-6">Notifications</h3>
        <div className="space-y-4">
          {[
            { key: 'speedAlerts', label: 'Speed Limit Alerts', description: 'Get notified when exceeding speed limits' },
            { key: 'safetyScores', label: 'Safety Score Updates', description: 'Receive daily safety score reports' },
            { key: 'tripReports', label: 'Trip Summary Reports', description: 'Weekly trip analysis and insights' },
            { key: 'emergencyAlerts', label: 'Emergency Alerts', description: 'Critical safety and emergency notifications' },
            { key: 'weatherWarnings', label: 'Weather Warnings', description: 'Severe weather condition alerts' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div className="flex-1">
                <h4 className="text-white font-medium">{item.label}</h4>
                <p className="text-white/60 text-sm">{item.description}</p>
              </div>
              <button
                onClick={() => toggleNotification(item.key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications[item.key as keyof typeof notifications] ? 'bg-blue-500' : 'bg-white/20'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications[item.key as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* General Preferences */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-bold text-white mb-6">General Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Units */}
          <div className="space-y-3">
            <label className="text-white font-medium">Units</label>
            <div className="flex space-x-2">
              {['metric', 'imperial'].map((unit) => (
                <button
                  key={unit}
                  onClick={() => togglePreference('units', unit)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    preferences.units === unit
                      ? 'bg-blue-500/30 text-blue-400 border border-blue-400/30'
                      : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {unit.charAt(0).toUpperCase() + unit.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Language */}
          <div className="space-y-3">
            <label className="text-white font-medium">Language</label>
            <select
              value={preferences.language}
              onChange={(e) => togglePreference('language', e.target.value)}
              className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
              <option value="german">German</option>
            </select>
          </div>

          {/* Theme */}
          <div className="space-y-3">
            <label className="text-white font-medium">Theme</label>
            <div className="flex space-x-2">
              {['dark', 'light', 'auto'].map((theme) => (
                <button
                  key={theme}
                  onClick={() => togglePreference('theme', theme)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    preferences.theme === theme
                      ? 'bg-blue-500/30 text-blue-400 border border-blue-400/30'
                      : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Auto Start */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-white font-medium">Auto Start Monitoring</label>
                <p className="text-white/60 text-sm">Start monitoring when vehicle starts</p>
              </div>
              <button
                onClick={() => togglePreference('autoStart')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences.autoStart ? 'bg-blue-500' : 'bg-white/20'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.autoStart ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy & Data */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-bold text-white mb-6">Privacy & Data</h3>
        <div className="space-y-4">
          {[
            { 
              key: 'shareData', 
              label: 'Share Anonymous Data', 
              description: 'Help improve safety features by sharing anonymized driving data',
              sensitive: false 
            },
            { 
              key: 'locationTracking', 
              label: 'Location Tracking', 
              description: 'Required for route analysis and emergency services',
              sensitive: true 
            },
            { 
              key: 'analytics', 
              label: 'Usage Analytics', 
              description: 'Track app usage to improve user experience',
              sensitive: false 
            },
            { 
              key: 'crashReporting', 
              label: 'Automatic Crash Reporting', 
              description: 'Send crash reports to help fix bugs and improve stability',
              sensitive: false 
            }
          ].map((item) => (
            <div key={item.key} className={`p-4 rounded-lg ${item.sensitive ? 'bg-yellow-500/10 border border-yellow-500/20' : 'bg-white/5'}`}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-white font-medium">{item.label}</h4>
                    {item.sensitive && (
                      <span className="px-2 py-1 text-xs bg-yellow-500/20 text-yellow-400 rounded-full">Required</span>
                    )}
                  </div>
                  <p className="text-white/60 text-sm mt-1">{item.description}</p>
                </div>
                <button
                  onClick={() => togglePrivacy(item.key)}
                  disabled={item.sensitive}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    privacy[item.key as keyof typeof privacy] 
                      ? 'bg-blue-500' 
                      : item.sensitive 
                        ? 'bg-yellow-500/50' 
                        : 'bg-white/20'
                  } ${item.sensitive ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      privacy[item.key as keyof typeof privacy] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Account Actions */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-bold text-white mb-6">Account & Data</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400 hover:bg-blue-500/20 transition-colors">
            <div className="flex items-center space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M3 20.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
              </svg>
              <div className="text-left">
                <h4 className="font-medium">Export Data</h4>
                <p className="text-xs opacity-70">Download all your driving data</p>
              </div>
            </div>
          </button>

          <button className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 hover:bg-green-500/20 transition-colors">
            <div className="flex items-center space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clipRule="evenodd" />
              </svg>
              <div className="text-left">
                <h4 className="font-medium">Backup Settings</h4>
                <p className="text-xs opacity-70">Save your preferences to cloud</p>
              </div>
            </div>
          </button>

          <button className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-400 hover:bg-yellow-500/20 transition-colors">
            <div className="flex items-center space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
              </svg>
              <div className="text-left">
                <h4 className="font-medium">Clear Data</h4>
                <p className="text-xs opacity-70">Reset all trip history and stats</p>
              </div>
            </div>
          </button>

          <button className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors">
            <div className="flex items-center space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
              <div className="text-left">
                <h4 className="font-medium">Sign Out</h4>
                <p className="text-xs opacity-70">Log out of your account</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* App Info */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-bold text-white mb-6">About</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-500/20 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-blue-400">
                <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.814 3.909 10.732 9.227 12.061a.75.75 0 00.966 0 12.74 12.74 0 007.227-12.06 12.74 12.74 0 00-.635-3.985.75.75 0 00-.722-.516 11.209 11.209 0 01-7.877-3.08z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="text-white font-semibold">RideWayz</h4>
            <p className="text-white/60 text-sm">Version 1.0.0</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-500/20 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-green-400">
                <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="text-white font-semibold">Latest Update</h4>
            <p className="text-white/60 text-sm">Oct 30, 2024</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-purple-500/20 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-purple-400">
                <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="text-white font-semibold">Support</h4>
            <p className="text-white/60 text-sm">24/7 Available</p>
          </div>
        </div>
      </div>
    </div>
  );
};