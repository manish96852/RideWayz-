import React, { useState } from 'react';

interface TripHistoryScreenProps {
  trips?: any[];
}

export const TripHistoryScreen: React.FC<TripHistoryScreenProps> = ({ trips = [] }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedTrip, setSelectedTrip] = useState<any>(null);

  // Mock trip data
  const mockTrips = [
    {
      id: 1,
      date: '2025-09-30',
      startTime: '09:15 AM',
      endTime: '09:45 AM',
      duration: '30 min',
      distance: '12.5 km',
      avgSpeed: '25 km/h',
      maxSpeed: '45 km/h',
      route: 'Home → Office',
      safetyScore: 95,
      incidents: 0,
      overspeedingCount: 1,
      status: 'completed'
    },
    {
      id: 2,
      date: '2025-09-29',
      startTime: '06:30 PM',
      endTime: '07:15 PM',
      duration: '45 min',
      distance: '18.2 km',
      avgSpeed: '24 km/h',
      maxSpeed: '52 km/h',
      route: 'Office → Home',
      safetyScore: 88,
      incidents: 0,
      overspeedingCount: 3,
      status: 'completed'
    },
    {
      id: 3,
      date: '2025-09-29',
      startTime: '08:45 AM',
      endTime: '09:20 AM',
      duration: '35 min',
      distance: '15.8 km',
      avgSpeed: '27 km/h',
      maxSpeed: '48 km/h',
      route: 'Home → Office',
      safetyScore: 92,
      incidents: 0,
      overspeedingCount: 2,
      status: 'completed'
    }
  ];

  const getSafetyScoreColor = (score: number) => {
    if (score >= 95) return 'text-green-400';
    if (score >= 85) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getSafetyScoreBg = (score: number) => {
    if (score >= 95) return 'bg-green-500/20';
    if (score >= 85) return 'bg-yellow-500/20';
    return 'bg-red-500/20';
  };

  const totalDistance = mockTrips.reduce((sum, trip) => sum + parseFloat(trip.distance), 0);
  const totalTrips = mockTrips.length;
  const avgSafetyScore = Math.round(mockTrips.reduce((sum, trip) => sum + trip.safetyScore, 0) / totalTrips);

  return (
    <div className="p-6 space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-6 text-center fade-in-animation">
          <div className="w-12 h-12 mx-auto mb-4 bg-blue-500/20 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-400">
              <path d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white">{totalTrips}</h3>
          <p className="text-white/70 text-sm">Total Trips</p>
        </div>

        <div className="glass-card p-6 text-center slide-in-animation">
          <div className="w-12 h-12 mx-auto mb-4 bg-green-500/20 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-400">
              <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5V3z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white">{totalDistance.toFixed(1)}</h3>
          <p className="text-white/70 text-sm">KM Traveled</p>
        </div>

        <div className="glass-card p-6 text-center slide-in-animation">
          <div className="w-12 h-12 mx-auto mb-4 bg-yellow-500/20 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-yellow-400">
              <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.814 3.909 10.732 9.227 12.061a.75.75 0 00.966 0 12.74 12.74 0 007.227-12.06 12.74 12.74 0 00-.635-3.985.75.75 0 00-.722-.516 11.209 11.209 0 01-7.877-3.08z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white">{avgSafetyScore}%</h3>
          <p className="text-white/70 text-sm">Avg Safety</p>
        </div>

        <div className="glass-card p-6 text-center slide-in-animation">
          <div className="w-12 h-12 mx-auto mb-4 bg-purple-500/20 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-purple-400">
              <path d="M12 1.5a.75.75 0 01.75.75V6a.75.75 0 01-1.5 0V2.704l-.77.77a.75.75 0 01-1.061-1.061l2.25-2.25a.75.75 0 011.06 0l2.25 2.25a.75.75 0 11-1.06 1.061L12.75 2.704V6a.75.75 0 01-.75.75zM12 9a3 3 0 100 6 3 3 0 000-6z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white">24</h3>
          <p className="text-white/70 text-sm">Avg Speed</p>
        </div>
      </div>

      {/* Period Filter */}
      <div className="glass-card p-6 fade-in-animation">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Trip History</h3>
          <div className="flex space-x-2">
            {['week', 'month', 'year'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedPeriod === period
                    ? 'bg-blue-500/30 text-blue-400 border border-blue-400/30'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Trip List */}
        <div className="space-y-4">
          {mockTrips.map((trip, index) => (
            <div
              key={trip.id}
              className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedTrip(trip)}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-400">
                      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{trip.route}</h4>
                    <p className="text-white/60 text-sm">{trip.date} • {trip.startTime} - {trip.endTime}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-white font-medium">{trip.distance}</p>
                    <p className="text-white/60 text-xs">Distance</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-medium">{trip.duration}</p>
                    <p className="text-white/60 text-xs">Duration</p>
                  </div>
                  <div className="text-center">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      getSafetyScoreBg(trip.safetyScore)
                    }`}>
                      <span className={getSafetyScoreColor(trip.safetyScore)}>
                        {trip.safetyScore}%
                      </span>
                    </div>
                    <p className="text-white/60 text-xs mt-1">Safety</p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white/40 group-hover:text-white/60 transition-colors">
                    <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trip Detail Modal */}
      {selectedTrip && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto scale-in-animation">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Trip Details</h3>
                <button
                  onClick={() => setSelectedTrip(null)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Trip Overview */}
                <div className="bg-white/5 rounded-xl p-4">
                  <h4 className="text-lg font-semibold text-white mb-4">{selectedTrip.route}</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-white/60 text-sm">Date</p>
                      <p className="text-white font-medium">{selectedTrip.date}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Duration</p>
                      <p className="text-white font-medium">{selectedTrip.duration}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Distance</p>
                      <p className="text-white font-medium">{selectedTrip.distance}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Avg Speed</p>
                      <p className="text-white font-medium">{selectedTrip.avgSpeed}</p>
                    </div>
                  </div>
                </div>

                {/* Safety Metrics */}
                <div className="bg-white/5 rounded-xl p-4">
                  <h4 className="text-lg font-semibold text-white mb-4">Safety Metrics</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <div className={`text-2xl font-bold ${getSafetyScoreColor(selectedTrip.safetyScore)}`}>
                        {selectedTrip.safetyScore}%
                      </div>
                      <p className="text-white/60 text-sm mt-1">Safety Score</p>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <div className="text-2xl font-bold text-green-400">{selectedTrip.incidents}</div>
                      <p className="text-white/60 text-sm mt-1">Incidents</p>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-400">{selectedTrip.overspeedingCount}</div>
                      <p className="text-white/60 text-sm mt-1">Overspeeding</p>
                    </div>
                  </div>
                </div>

                {/* Speed Analysis */}
                <div className="bg-white/5 rounded-xl p-4">
                  <h4 className="text-lg font-semibold text-white mb-4">Speed Analysis</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/70">Average Speed</span>
                      <span className="text-white font-medium">{selectedTrip.avgSpeed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Maximum Speed</span>
                      <span className="text-white font-medium">{selectedTrip.maxSpeed}</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-yellow-400 h-2 rounded-full"
                        style={{width: `${(parseInt(selectedTrip.avgSpeed) / parseInt(selectedTrip.maxSpeed)) * 100}%`}}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};