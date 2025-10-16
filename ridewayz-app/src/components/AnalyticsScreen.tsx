import React, { useState } from 'react';

interface AnalyticsScreenProps {
  // Add props if needed
}

export const AnalyticsScreen: React.FC<AnalyticsScreenProps> = () => {
  const [selectedMetric, setSelectedMetric] = useState<'safety' | 'speed' | 'efficiency' | 'incidents'>('safety');
  const [timeRange, setTimeRange] = useState('week');

  const metricsData = {
    safety: {
      score: 92,
      trend: '+5%',
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      chartData: [85, 87, 90, 88, 92, 94, 92]
    },
    speed: {
      score: 24.5,
      trend: '-2%',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      chartData: [25, 26, 24, 23, 25, 24, 24.5]
    },
    efficiency: {
      score: 87,
      trend: '+12%',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      chartData: [75, 78, 82, 85, 87, 88, 87]
    },
    incidents: {
      score: 0,
      trend: '0%',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20',
      chartData: [2, 1, 0, 1, 0, 0, 0]
    }
  };

  const weeklyData = [
    { day: 'Mon', trips: 2, distance: 18.5, safety: 95 },
    { day: 'Tue', trips: 3, distance: 24.2, safety: 89 },
    { day: 'Wed', trips: 1, distance: 12.5, safety: 98 },
    { day: 'Thu', trips: 2, distance: 19.8, safety: 91 },
    { day: 'Fri', trips: 4, distance: 32.1, safety: 88 },
    { day: 'Sat', trips: 1, distance: 8.5, safety: 96 },
    { day: 'Sun', trips: 0, distance: 0, safety: 0 }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
        <div className="flex space-x-2">
          {['week', 'month', 'year'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-blue-500/30 text-blue-400 border border-blue-400/30'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {(Object.entries(metricsData) as Array<[keyof typeof metricsData, typeof metricsData[keyof typeof metricsData]]>).map(([key, data]) => (
          <div 
            key={key}
            className={`glass-card p-6 cursor-pointer transition-all duration-300 ${
              selectedMetric === key ? 'ring-2 ring-blue-400/50' : ''
            }`}
            onClick={() => setSelectedMetric(key)}
          >
            <div className={`w-12 h-12 mx-auto mb-4 ${data.bgColor} rounded-full flex items-center justify-center`}>
              {key === 'safety' && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 ${data.color}`}>
                  <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.814 3.909 10.732 9.227 12.061a.75.75 0 00.966 0 12.74 12.74 0 007.227-12.06 12.74 12.74 0 00-.635-3.985.75.75 0 00-.722-.516 11.209 11.209 0 01-7.877-3.08z" clipRule="evenodd" />
                </svg>
              )}
              {key === 'speed' && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 ${data.color}`}>
                  <path d="M12 1.5a.75.75 0 01.75.75V6a.75.75 0 01-1.5 0V2.704l-.77.77a.75.75 0 01-1.061-1.061l2.25-2.25a.75.75 0 011.06 0l2.25 2.25a.75.75 0 11-1.06 1.061L12.75 2.704V6a.75.75 0 01-.75.75zM12 9a3 3 0 100 6 3 3 0 000-6z" />
                </svg>
              )}
              {key === 'efficiency' && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 ${data.color}`}>
                  <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5V3z" clipRule="evenodd" />
                </svg>
              )}
              {key === 'incidents' && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 ${data.color}`}>
                  <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <h3 className={`text-2xl font-bold ${data.color} text-center`}>
              {key === 'speed' ? `${data.score} km/h` : key === 'incidents' ? data.score : `${data.score}%`}
            </h3>
            <p className="text-white/70 text-sm text-center capitalize">{key}</p>
            <div className={`text-xs text-center mt-2 ${data.trend.startsWith('+') ? 'text-green-400' : data.trend.startsWith('-') ? 'text-red-400' : 'text-gray-400'}`}>
              {data.trend} from last {timeRange}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Selected Metric Chart */}
        <div className="glass-card p-6">
          <h3 className="text-xl font-bold text-white mb-6 capitalize">{selectedMetric} Trend</h3>
          <div className="h-48 flex items-end justify-between space-x-2">
            {metricsData[selectedMetric].chartData.map((value, index) => (
              <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                <div 
                  className={`w-full ${metricsData[selectedMetric].bgColor} rounded-t-lg transition-all duration-500`}
                  style={{height: `${(value / Math.max(...metricsData[selectedMetric].chartData)) * 100}%`}}
                ></div>
                <span className="text-white/60 text-xs">Day {index + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Summary */}
        <div className="glass-card p-6">
          <h3 className="text-xl font-bold text-white mb-6">Weekly Summary</h3>
          <div className="space-y-4">
            {weeklyData.slice(0, 5).map((day) => (
              <div key={day.day} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <span className="text-blue-400 text-sm font-medium">{day.day[0]}</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">{day.day}</p>
                    <p className="text-white/60 text-sm">{day.trips} trips</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">{day.distance} km</p>
                  <p className={`text-sm ${day.safety >= 95 ? 'text-green-400' : day.safety >= 85 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {day.safety > 0 ? `${day.safety}% safe` : 'No trips'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-bold text-white mb-6">AI Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-green-400">
                  <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="text-green-400 font-semibold">Good Progress</h4>
            </div>
            <p className="text-white/70 text-sm">Your safety score improved by 5% this week. Keep maintaining safe speeds!</p>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-400">
                  <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="text-yellow-400 font-semibold">Watch Your Speed</h4>
            </div>
            <p className="text-white/70 text-sm">You had 3 overspeeding incidents on Friday. Try to maintain speed limits.</p>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-blue-400">
                  <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                  <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="text-blue-400 font-semibold">Peak Hours</h4>
            </div>
            <p className="text-white/70 text-sm">Most incidents occur between 5-7 PM. Consider alternative routes during rush hours.</p>
          </div>
        </div>
      </div>
    </div>
  );
};