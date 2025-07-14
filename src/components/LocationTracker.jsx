import {
  useEffect,
  useState,
} from 'react';

export default function LocationTracker({ onLocationUpdate, watchOptions = {} }) {
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setError('Geolocation API not supported');
      return;
    }

    const success = (position) => {
      const { latitude, longitude } = position.coords;
      onLocationUpdate({ latitude, longitude, timestamp: position.timestamp });
    };

    const fail = (err) => {
      setError(err.message);
    };

    // Start watching position
    const watcherId = navigator.geolocation.watchPosition(
      success,
      fail,
      {
        enableHighAccuracy: true,
        maximumAge: 1000,
        timeout: 5000,
        ...watchOptions,
      }
    );

    // Cleanup on unmount
    return () => navigator.geolocation.clearWatch(watcherId);
  }, [onLocationUpdate, watchOptions]);

  if (error) {
    return <div className="text-red-500">Geolocation error: {error}</div>;
  }

  return null; // no UI; just feeds location to parent
}
