import React, { useState, useEffect, useRef } from 'react';

interface WorkingMapComponentProps {
  isRideActive: boolean;
  onLocationUpdate?: (location: { lat: number; lng: number }) => void;
}

export const WorkingMapComponent: React.FC<WorkingMapComponentProps> = ({ 
  isRideActive, 
  onLocationUpdate 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [currentPosition, setCurrentPosition] = useState({ lat: 28.6139, lng: 77.2090 });
  const [estimatedTime, setEstimatedTime] = useState('--');
  const [estimatedDistance, setEstimatedDistance] = useState('--');
  const [routeActive, setRouteActive] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapInstance, setMapInstance] = useState<any>(null);

  // Load Leaflet
  useEffect(() => {
    const loadLeaflet = async () => {
      try {
        // Add Leaflet CSS
        if (!document.querySelector('link[href*="leaflet"]')) {
          const leafletCSS = document.createElement('link');
          leafletCSS.rel = 'stylesheet';
          leafletCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          document.head.appendChild(leafletCSS);
        }

        // Load Leaflet JS
        if (!(window as any).L) {
          const leafletScript = document.createElement('script');
          leafletScript.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
          leafletScript.onload = () => {
            setMapLoaded(true);
          };
          document.head.appendChild(leafletScript);
        } else {
          setMapLoaded(true);
        }
      } catch (error) {
        console.error('Error loading Leaflet:', error);
      }
    };

    loadLeaflet();
  }, []);

  // Initialize map
  useEffect(() => {
    if (mapLoaded && mapRef.current && !mapInstance && (window as any).L) {
      const L = (window as any).L;
      
      // Create simple map
      const map = L.map(mapRef.current).setView([28.6139, 77.2090], 13);

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map);

      setMapInstance(map);
    }
  }, [mapLoaded, mapInstance]);

  // Live location updates
  useEffect(() => {
    if (isRideActive && routeActive && mapInstance) {
      const interval = setInterval(() => {
        const newPos = {
          lat: currentPosition.lat + (Math.random() - 0.5) * 0.001,
          lng: currentPosition.lng + (Math.random() - 0.5) * 0.001
        };
        
        setCurrentPosition(newPos);
        
        if (onLocationUpdate) {
          onLocationUpdate(newPos);
        }
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isRideActive, routeActive, currentPosition, onLocationUpdate, mapInstance]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentPosition(pos);
          setPickupLocation('Current Location');
          
          if (mapInstance) {
            mapInstance.setView([pos.lat, pos.lng], 15);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          setPickupLocation('Current Location (Estimated)');
        }
      );
    } else {
      setPickupLocation('Current Location (Estimated)');
    }
  };

  const calculateRoute = () => {
    if (pickupLocation && dropLocation && mapInstance) {
      const L = (window as any).L;
      
      // Clear existing markers
      mapInstance.eachLayer((layer: any) => {
        if (layer instanceof L.Marker || layer instanceof L.Polyline) {
          mapInstance.removeLayer(layer);
        }
      });

      setRouteActive(true);
      
      // Calculate route
      const distance = Math.random() * 20 + 5;
      const time = Math.round(distance * 3 + Math.random() * 10);
      
      setEstimatedDistance(`${distance.toFixed(1)} km`);
      setEstimatedTime(`${time} min`);

      // Add markers
      const pickupCoords = [currentPosition.lat + (Math.random() - 0.5) * 0.02, currentPosition.lng + (Math.random() - 0.5) * 0.02];
      const dropCoords = [currentPosition.lat + (Math.random() - 0.5) * 0.02, currentPosition.lng + (Math.random() - 0.5) * 0.02];

      // Custom icons
      const pickupIcon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="
          background: #10B981;
          width: 30px;
          height: 30px;
          border-radius: 50% 50% 50% 0;
          border: 2px solid white;
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        ">
          <span style="
            transform: rotate(45deg);
            font-size: 14px;
            font-weight: bold;
            color: white;
          ">A</span>
        </div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 30],
      });

      const dropIcon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="
          background: #EF4444;
          width: 30px;
          height: 30px;
          border-radius: 50% 50% 50% 0;
          border: 2px solid white;
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        ">
          <span style="
            transform: rotate(45deg);
            font-size: 14px;
            font-weight: bold;
            color: white;
          ">B</span>
        </div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 30],
      });

      // Add markers
      L.marker(pickupCoords, { icon: pickupIcon })
        .addTo(mapInstance)
        .bindPopup(`📍 ${pickupLocation}`);

      L.marker(dropCoords, { icon: dropIcon })
        .addTo(mapInstance)
        .bindPopup(`🎯 ${dropLocation}`);

      // Add route line
      L.polyline([pickupCoords, dropCoords], {
        color: '#3B82F6',
        weight: 4,
        opacity: 0.8,
      }).addTo(mapInstance);

      // Fit bounds
      const group = new L.featureGroup([
        L.marker(pickupCoords),
        L.marker(dropCoords)
      ]);
      mapInstance.fitBounds(group.getBounds().pad(0.1));

      // Add current location if ride active
      if (isRideActive) {
        const currentIcon = L.divIcon({
          className: 'current-location-marker',
          html: `<div style="
            background: #F59E0B;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 2px solid white;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          ">🚗</div>`,
          iconSize: [20, 20],
          iconAnchor: [10, 10],
        });

        L.marker([currentPosition.lat, currentPosition.lng], { icon: currentIcon })
          .addTo(mapInstance)
          .bindPopup('🚗 Your Location');
      }
    }
  };

  const clearRoute = () => {
    if (mapInstance) {
      const L = (window as any).L;
      
      mapInstance.eachLayer((layer: any) => {
        if (layer instanceof L.Marker || layer instanceof L.Polyline) {
          mapInstance.removeLayer(layer);
        }
      });
    }

    setRouteActive(false);
    setPickupLocation('');
    setDropLocation('');
    setEstimatedTime('--');
    setEstimatedDistance('--');
  };

  const showDemo = () => {
    setPickupLocation('Connaught Place, New Delhi');
    setDropLocation('India Gate, New Delhi');
    
    setTimeout(() => {
      calculateRoute();
    }, 100);
  };

  return (
    <div className="glass-card bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-400/30 rounded-2xl overflow-hidden shadow-2xl">
      {/* Map Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 mr-3 text-blue-300">
              <path fillRule="evenodd" d="M8.161 2.58a1.875 1.875 0 011.678 0l4.993 2.498c.106.052.23.052.336 0l3.869-1.935A1.875 1.875 0 0121.75 4.82v12.485c0 .71-.401 1.36-1.037 1.677l-4.875 2.437a1.875 1.875 0 01-1.676 0l-4.994-2.497a.375.375 0 00-.336 0l-3.868 1.935A1.875 1.875 0 012.25 19.18V6.695c0-.71.401-1.36 1.036-1.677l4.875-2.437z" clipRule="evenodd" />
            </svg>
            <span className="gradient-text">🗺️ Live Map Navigation (FREE)</span>
          </h3>
          {isRideActive && routeActive && (
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-semibold text-sm">Live Tracking</span>
            </div>
          )}
        </div>

        {/* Location Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="relative">
            <label className="block text-white/80 text-sm font-semibold mb-2">
              📍 Pick-up Location
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                placeholder="Enter pickup location..."
                className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-xl px-4 py-3 focus:border-blue-400 focus:outline-none transition-colors"
              />
              <button
                onClick={getCurrentLocation}
                className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 p-3 rounded-xl transition-colors border border-blue-400/30"
                title="Use current location"
              >
                📍
              </button>
            </div>
          </div>
          
          <div className="relative">
            <label className="block text-white/80 text-sm font-semibold mb-2">
              🎯 Drop Location
            </label>
            <input
              type="text"
              value={dropLocation}
              onChange={(e) => setDropLocation(e.target.value)}
              placeholder="Enter destination..."
              className="w-full bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-xl px-4 py-3 focus:border-purple-400 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={calculateRoute}
            disabled={!pickupLocation || !dropLocation}
            className="bg-green-500/20 hover:bg-green-500/30 disabled:bg-gray-500/10 disabled:text-gray-400 text-green-300 px-6 py-2 rounded-xl font-semibold transition-colors border border-green-400/30 disabled:border-gray-500/20"
          >
            🛣️ Calculate Route
          </button>
          {routeActive && (
            <button
              onClick={clearRoute}
              className="bg-red-500/20 hover:bg-red-500/30 text-red-300 px-6 py-2 rounded-xl font-semibold transition-colors border border-red-400/30"
            >
              ❌ Clear Route
            </button>
          )}
          <button 
            onClick={getCurrentLocation}
            className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 px-6 py-2 rounded-xl font-semibold transition-colors border border-blue-400/30"
          >
            📍 My Location
          </button>
          <button
            onClick={showDemo}
            className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 px-6 py-2 rounded-xl font-semibold transition-colors border border-purple-400/30"
          >
            🗺️ Delhi Demo
          </button>
        </div>
      </div>

      {/* Map Display */}
      <div className="relative h-96 bg-gray-100 overflow-hidden">
        {!mapLoaded ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500/10 to-purple-600/10">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-400/30 border-t-blue-400 rounded-full animate-spin mb-4"></div>
              <p className="text-white font-semibold">Loading Map...</p>
              <p className="text-white/70 text-sm mt-2">Free OpenStreetMap Loading</p>
            </div>
          </div>
        ) : (
          <>
            <div ref={mapRef} className="w-full h-full" />
            
            {/* Attribution */}
            <div className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-sm rounded px-2 py-1 text-xs text-gray-600">
              © OpenStreetMap
            </div>

            {/* Live Tracking */}
            {isRideActive && routeActive && (
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-white/50">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <div>
                    <div className="text-sm font-medium text-gray-800">Live Tracking</div>
                    <div className="text-xs text-gray-600">
                      {currentPosition.lat.toFixed(4)}, {currentPosition.lng.toFixed(4)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Route Information */}
      {routeActive && (
        <div className="p-6 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-400/30 rounded-xl p-4 text-center">
              <h4 className="text-green-200 font-semibold mb-2">⏱️ Travel Time</h4>
              <p className="text-2xl font-bold text-white">{estimatedTime}</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-600/20 border border-blue-400/30 rounded-xl p-4 text-center">
              <h4 className="text-blue-200 font-semibold mb-2">📏 Distance</h4>
              <p className="text-2xl font-bold text-white">{estimatedDistance}</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-purple-400/30 rounded-xl p-4 text-center">
              <h4 className="text-purple-200 font-semibold mb-2">🗺️ Status</h4>
              <p className="text-2xl font-bold text-white">
                {isRideActive ? 'Active' : 'Ready'}
              </p>
            </div>
          </div>

          {/* Live Coordinates */}
          {isRideActive && (
            <div className="mt-4 bg-white/5 rounded-xl p-4">
              <h5 className="text-white font-semibold mb-2 flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Live Location Coordinates
              </h5>
              <div className="text-sm text-white/70">
                <p>Latitude: {currentPosition.lat.toFixed(6)}</p>
                <p>Longitude: {currentPosition.lng.toFixed(6)}</p>
                <p className="text-green-400 mt-1">📡 Using Free OpenStreetMap</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WorkingMapComponent;