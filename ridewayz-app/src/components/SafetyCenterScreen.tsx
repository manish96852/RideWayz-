import React, { useState } from 'react';

interface SafetyCenterScreenProps {
  // Add props if needed
}

export const SafetyCenterScreen: React.FC<SafetyCenterScreenProps> = () => {
  const [activeTab, setActiveTab] = useState('tips');

  const safetyTips = [
    {
      id: 1,
      category: 'Speed Management',
      title: 'Maintain Safe Following Distance',
      description: 'Keep at least 3 seconds between you and the vehicle ahead. Increase this in bad weather.',
      icon: '🚗',
      priority: 'high'
    },
    {
      id: 2,
      category: 'Weather Awareness',
      title: 'Adjust Speed in Rain',
      description: 'Reduce speed by 25% in wet conditions and avoid sudden braking or steering.',
      icon: '🌧️',
      priority: 'high'
    },
    {
      id: 3,
      category: 'Defensive Driving',
      title: 'Check Blind Spots',
      description: 'Always check mirrors and blind spots before changing lanes or turning.',
      icon: '👁️',
      priority: 'medium'
    },
    {
      id: 4,
      category: 'Vehicle Maintenance',
      title: 'Regular Brake Checks',
      description: 'Have your brakes inspected every 6 months for optimal stopping power.',
      icon: '🔧',
      priority: 'medium'
    },
    {
      id: 5,
      category: 'Technology',
      title: 'Use Navigation Wisely',
      description: 'Set up GPS before driving and use voice commands to stay focused on the road.',
      icon: '📱',
      priority: 'low'
    }
  ];

  const emergencyContacts = [
    { name: 'Emergency Services', number: '911', type: 'emergency' },
    { name: 'Roadside Assistance', number: '1-800-AAA-HELP', type: 'roadside' },
    { name: 'Insurance Company', number: '1-800-GEICO', type: 'insurance' },
    { name: 'Family Contact', number: '+1 (555) 123-4567', type: 'family' }
  ];

  const safetyChecklist = [
    { item: 'Check tire pressure and tread', checked: true, category: 'Vehicle' },
    { item: 'Test brakes and brake lights', checked: true, category: 'Vehicle' },
    { item: 'Check mirrors and seat position', checked: false, category: 'Setup' },
    { item: 'Ensure seatbelt works properly', checked: true, category: 'Safety' },
    { item: 'Check headlights and turn signals', checked: false, category: 'Vehicle' },
    { item: 'Review route and weather conditions', checked: false, category: 'Planning' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500/50 bg-red-500/10';
      case 'medium': return 'border-yellow-500/50 bg-yellow-500/10';
      case 'low': return 'border-green-500/50 bg-green-500/10';
      default: return 'border-gray-500/50 bg-gray-500/10';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Safety Center</h2>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-400 text-sm font-medium">System Active</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-6 text-center">
          <div className="w-12 h-12 mx-auto mb-4 bg-green-500/20 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-400">
              <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.814 3.909 10.732 9.227 12.061a.75.75 0 00.966 0 12.74 12.74 0 007.227-12.06 12.74 12.74 0 00-.635-3.985.75.75 0 00-.722-.516 11.209 11.209 0 01-7.877-3.08z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-green-400">95%</h3>
          <p className="text-white/70 text-sm">Safety Score</p>
        </div>

        <div className="glass-card p-6 text-center">
          <div className="w-12 h-12 mx-auto mb-4 bg-blue-500/20 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-400">
              <path d="M11.25 5.337c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.036 1.007-1.875 2.25-1.875S15 2.34 15 3.375c0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959 0 .332.278.598.61.578 1.91-.114 3.79-.342 5.632-.676a.75.75 0 01.878.645 49.17 49.17 0 01.376 5.452.657.657 0 01-.66.664c-.354 0-.675-.186-.958-.401a1.647 1.647 0 00-1.003-.349c-1.035 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.958-.401.359 0 .659.299.66.664a49.19 49.19 0 01-.376 5.452.75.75 0 01-.878.645c-1.842-.334-3.722-.562-5.632-.676a.58.58 0 00-.61.578c0 .355.186.676.401.959.221.29.349.634.349 1.003 0 1.035-1.007 1.875-2.25 1.875s-2.25-.84-2.25-1.875c0-.369.128-.713.349-1.003.215-.283.401-.604.401-.959a.58.58 0 00-.61-.578c-1.91.114-3.79.342-5.632.676a.75.75 0 01-.878-.645 49.17 49.17 0 01-.376-5.452.657.657 0 01.66-.664c.354 0 .675.186.958.401.29.221.634.349 1.003.349 1.035 0 1.875-1.007 1.875-2.25s-.84-2.25-1.875-2.25c-.369 0-.713.128-1.003.349-.283.215-.604.401-.958.401a.657.657 0 01-.66-.664 49.17 49.17 0 01.376-5.452.75.75 0 01.878-.645c1.842.334 3.722.562 5.632.676.327.02.61-.246.61-.578z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-blue-400">0</h3>
          <p className="text-white/70 text-sm">Incidents</p>
        </div>

        <div className="glass-card p-6 text-center">
          <div className="w-12 h-12 mx-auto mb-4 bg-purple-500/20 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-purple-400">
              <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-purple-400">7</h3>
          <p className="text-white/70 text-sm">Days Safe</p>
        </div>

        <div className="glass-card p-6 text-center">
          <div className="w-12 h-12 mx-auto mb-4 bg-yellow-500/20 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-yellow-400">
              <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
              <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-yellow-400">24/7</h3>
          <p className="text-white/70 text-sm">Monitoring</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="glass-card p-2">
        <div className="flex space-x-1">
          {[
            { id: 'tips', label: 'Safety Tips', icon: '💡' },
            { id: 'checklist', label: 'Pre-Trip Check', icon: '✅' },
            { id: 'emergency', label: 'Emergency', icon: '🚨' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-500/30 text-blue-400 border border-blue-400/30'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'tips' && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Safety Tips & Guidelines</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {safetyTips.map((tip) => (
              <div key={tip.id} className={`glass-card p-6 border ${getPriorityColor(tip.priority)}`}>
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{tip.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-white/60 uppercase tracking-wide">{tip.category}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        tip.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                        tip.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {tip.priority}
                      </span>
                    </div>
                    <h4 className="text-white font-semibold mb-2">{tip.title}</h4>
                    <p className="text-white/70 text-sm">{tip.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'checklist' && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Pre-Trip Safety Checklist</h3>
          <div className="glass-card p-6">
            <div className="space-y-4">
              {safetyChecklist.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    item.checked ? 'bg-green-500 border-green-500' : 'border-white/30'
                  }`}>
                    {item.checked && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                        <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${item.checked ? 'text-white' : 'text-white/70'}`}>{item.item}</p>
                    <p className="text-xs text-white/50">{item.category}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.checked ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {item.checked ? 'Complete' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-blue-400">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-blue-400 font-semibold">Completion: 50%</h4>
                  <p className="text-white/70 text-sm">Complete all items before starting your trip for maximum safety.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'emergency' && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Emergency Contacts & Procedures</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Quick Contacts</h4>
              <div className="space-y-3">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div>
                      <p className="text-white font-medium">{contact.name}</p>
                      <p className="text-white/60 text-sm capitalize">{contact.type}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-white/70 font-mono">{contact.number}</span>
                      <button className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                          <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.653.349 2.121.915l1.155 1.386a1.5 1.5 0 01-.066 2.007l-1.02 1.02a.75.75 0 00-.195.65 16.656 16.656 0 007.733 7.733.75.75 0 00.65-.195l1.02-1.02a1.5 1.5 0 012.007-.066l1.386 1.155c.566.468.915 1.261.915 2.121V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Emergency Procedures</h4>
              <div className="space-y-4">
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <h5 className="text-red-400 font-semibold mb-2">🚨 Accident Protocol</h5>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>1. Check for injuries and call 911</li>
                    <li>2. Move to safety if possible</li>
                    <li>3. Document the scene</li>
                    <li>4. Contact insurance company</li>
                  </ul>
                </div>

                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <h5 className="text-yellow-400 font-semibold mb-2">⚠️ Vehicle Breakdown</h5>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>1. Pull over safely</li>
                    <li>2. Turn on hazard lights</li>
                    <li>3. Call roadside assistance</li>
                    <li>4. Stay inside vehicle if safe</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h5 className="text-blue-400 font-semibold mb-2">🩹 Medical Emergency</h5>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>1. Call 911 immediately</li>
                    <li>2. Provide first aid if trained</li>
                    <li>3. Stay calm and follow instructions</li>
                    <li>4. Wait for professional help</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};