import React, { useState } from 'react';

interface ProfileScreenProps {
  userProfile: any;
  onUpdateProfile: (data: any) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ userProfile, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userProfile || {});

  const handleSave = () => {
    onUpdateProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Profile Header */}
      <div className="glass-card p-8 text-center fade-in-animation">
        <div className="relative inline-block mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-3xl">
              {userProfile?.guardianName?.charAt(0) || 'U'}
            </span>
          </div>
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-400 rounded-full border-4 border-white flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4">
              <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">{userProfile?.guardianName || 'User Name'}</h2>
        <p className="text-white/70">{userProfile?.vehicleType || 'Vehicle Owner'}</p>
        <div className="flex items-center justify-center mt-4 space-x-4">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="text-green-400 text-sm">Verified User</span>
          </div>
          <div className="flex items-center space-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-400">
              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
            </svg>
            <span className="text-white/70 text-sm">4.9 Rating</span>
          </div>
        </div>
      </div>

      {/* Profile Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 text-center slide-in-animation">
          <div className="w-12 h-12 mx-auto mb-4 bg-blue-500/20 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-400">
              <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
              <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white">24</h3>
          <p className="text-white/70">Total Trips</p>
        </div>

        <div className="glass-card p-6 text-center slide-in-animation" style={{animationDelay: '0.1s'}}>
          <div className="w-12 h-12 mx-auto mb-4 bg-green-500/20 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-400">
              <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5V3z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white">342</h3>
          <p className="text-white/70">KM Traveled</p>
        </div>

        <div className="glass-card p-6 text-center slide-in-animation" style={{animationDelay: '0.2s'}}>
          <div className="w-12 h-12 mx-auto mb-4 bg-yellow-500/20 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-yellow-400">
              <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.814 3.909 10.732 9.227 12.061a.75.75 0 00.966 0 12.74 12.74 0 007.227-12.06 12.74 12.74 0 00-.635-3.985.75.75 0 00-.722-.516 11.209 11.209 0 01-7.877-3.08z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white">98%</h3>
          <p className="text-white/70">Safety Score</p>
        </div>
      </div>

      {/* Profile Information */}
      <div className="glass-card p-6 fade-in-animation">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Profile Information</h3>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="btn-primary px-4 py-2"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white/70 text-sm font-medium mb-2">Vehicle Type</label>
            {isEditing ? (
              <select 
                className="input-field"
                value={formData.vehicleType || ''}
                onChange={(e) => setFormData({...formData, vehicleType: e.target.value})}
              >
                <option value="Two-Wheeler">Two-Wheeler</option>
                <option value="Four-Wheeler">Four-Wheeler</option>
              </select>
            ) : (
              <p className="text-white font-medium">{userProfile?.vehicleType || 'Not set'}</p>
            )}
          </div>

          <div>
            <label className="block text-white/70 text-sm font-medium mb-2">Vehicle Company</label>
            {isEditing ? (
              <input 
                type="text"
                className="input-field"
                value={formData.vehicleCompany || ''}
                onChange={(e) => setFormData({...formData, vehicleCompany: e.target.value})}
              />
            ) : (
              <p className="text-white font-medium">{userProfile?.vehicleCompany || 'Not set'}</p>
            )}
          </div>

          <div>
            <label className="block text-white/70 text-sm font-medium mb-2">Vehicle Number</label>
            {isEditing ? (
              <input 
                type="text"
                className="input-field"
                value={formData.vehicleNumber || ''}
                onChange={(e) => setFormData({...formData, vehicleNumber: e.target.value})}
              />
            ) : (
              <p className="text-white font-medium">{userProfile?.vehicleNumber || 'Not set'}</p>
            )}
          </div>

          <div>
            <label className="block text-white/70 text-sm font-medium mb-2">Phone Number</label>
            {isEditing ? (
              <input 
                type="tel"
                className="input-field"
                value={formData.riderPhoneNumber || ''}
                onChange={(e) => setFormData({...formData, riderPhoneNumber: e.target.value})}
              />
            ) : (
              <p className="text-white font-medium">{userProfile?.riderPhoneNumber || 'Not set'}</p>
            )}
          </div>

          <div>
            <label className="block text-white/70 text-sm font-medium mb-2">Guardian Name</label>
            {isEditing ? (
              <input 
                type="text"
                className="input-field"
                value={formData.guardianName || ''}
                onChange={(e) => setFormData({...formData, guardianName: e.target.value})}
              />
            ) : (
              <p className="text-white font-medium">{userProfile?.guardianName || 'Not set'}</p>
            )}
          </div>

          <div>
            <label className="block text-white/70 text-sm font-medium mb-2">Guardian Phone</label>
            {isEditing ? (
              <input 
                type="tel"
                className="input-field"
                value={formData.guardianPhoneNumber || ''}
                onChange={(e) => setFormData({...formData, guardianPhoneNumber: e.target.value})}
              />
            ) : (
              <p className="text-white font-medium">{userProfile?.guardianPhoneNumber || 'Not set'}</p>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="mt-6 flex space-x-4">
            <button onClick={handleSave} className="btn-primary flex-1">
              Save Changes
            </button>
            <button onClick={() => setIsEditing(false)} className="btn-secondary flex-1">
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Emergency Contacts */}
      <div className="glass-card p-6 fade-in-animation">
        <h3 className="text-xl font-bold text-white mb-6">Emergency Contacts</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                <span className="text-red-400 text-lg">🚨</span>
              </div>
              <div>
                <p className="text-white font-medium">Police</p>
                <p className="text-white/60 text-sm">Emergency Services</p>
              </div>
            </div>
            <div className="text-white font-mono">100</div>
          </div>

          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                <span className="text-green-400 text-lg">🏥</span>
              </div>
              <div>
                <p className="text-white font-medium">Medical Emergency</p>
                <p className="text-white/60 text-sm">Ambulance Services</p>
              </div>
            </div>
            <div className="text-white font-mono">108</div>
          </div>

          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                <span className="text-blue-400 text-lg">👨‍👩‍👧‍👦</span>
              </div>
              <div>
                <p className="text-white font-medium">{userProfile?.guardianName || 'Guardian'}</p>
                <p className="text-white/60 text-sm">Primary Contact</p>
              </div>
            </div>
            <div className="text-white font-mono">{userProfile?.guardianPhoneNumber || 'Not set'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};