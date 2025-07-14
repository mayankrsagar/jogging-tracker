// src/App.jsx
import React, {
  useCallback,
  useMemo,
  useState,
} from 'react';

import AutoSaveTask from './components/AutoSaveTask';
import LocationTracker from './components/LocationTracker';
import NetworkStatus from './components/NetworkStatus';
import RouteCanvas from './components/RouteCanvas';

// Haversine formula to compute distance (in meters)
const haversine = ([lat1, lon1], [lat2, lon2]) => {
  const toRad = deg => (deg * Math.PI) / 180;
  const R = 6371000; // meters
  const φ1 = toRad(lat1), φ2 = toRad(lat2);
  const Δφ = toRad(lat2 - lat1), Δλ = toRad(lon2 - lon1);
  const a = Math.sin(Δφ/2)**2
    + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

function App() {
  const [points, setPoints] = useState([]); 
  // points: { latitude, longitude, timestamp }

  const handleLocationUpdate = useCallback(({ latitude, longitude, timestamp }) => {
    setPoints(prev => [...prev, { latitude, longitude, timestamp }]);
  }, []);

  // Total distance in meters
  const totalDistance = useMemo(() => {
    if (points.length < 2) return 0;
    return points.slice(1).reduce((sum, pt, i) => {
      const prev = points[i];
      return sum + haversine(
        [prev.latitude, prev.longitude],
        [pt.latitude, pt.longitude]
      );
    }, 0);
  }, [points]);

  // Total time in seconds
  const totalTime = useMemo(() => {
    if (points.length < 2) return 0;
    const start = points[0].timestamp;
    const end   = points[points.length - 1].timestamp;
    return (end - start) / 1000;
  }, [points]);

  // Average speed in m/s
  const avgSpeed = useMemo(() => (
    totalTime > 0 ? totalDistance / totalTime : 0
  ), [totalDistance, totalTime]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow p-4">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-3xl font-semibold">Jogging Tracker</h1>
          <p className="text-gray-600 mt-1">
            Track your jogging sessions and improve your fitness!
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-md mx-auto p-4 space-y-6">
        {/* Network Status */}
        <NetworkStatus />

        {/* Route Visualization */}
        <div className="bg-white p-4 rounded-lg shadow">
          <LocationTracker onLocationUpdate={handleLocationUpdate} />
          <div className="flex justify-center my-4">
            <RouteCanvas points={points} width={300} height={300} />
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white p-4 rounded-lg shadow space-y-2">
          <h2 className="text-xl font-medium">Session Stats</h2>
          <p>Total Points: <strong>{points.length}</strong></p>
          <p>
            Total Distance:{' '}
            <strong>{(totalDistance / 1000).toFixed(2)} km</strong>
          </p>
          <p>
            Total Time:{' '}
            <strong>
              {Math.floor(totalTime / 60)} min {Math.floor(totalTime % 60)} s
            </strong>
          </p>
          <p>
            Average Speed:{' '}
            <strong>{(avgSpeed * 3.6).toFixed(2)} km/h</strong>
          </p>
        </div>

        {/* Auto-save Task */}
        <AutoSaveTask
          data={{ points, totalDistance, totalTime, avgSpeed }}
        />
      </main>

      {/* Footer */}
      <footer className="bg-white p-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Jogging Tracker. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
