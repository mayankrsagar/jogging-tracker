import {
  useEffect,
  useState,
} from 'react';

export default function NetworkStatus() {
  const [status, setStatus] = useState(navigator.onLine ? 'online' : 'offline');
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

  useEffect(() => {
    const updateOnline = () => setStatus('online');
    const updateOffline = () => setStatus('offline');
    window.addEventListener('online',  updateOnline);
    window.addEventListener('offline', updateOffline);

    let updateConnection;
    if (connection) {
      updateConnection = () => {
        setStatus(connection.effectiveType || (navigator.onLine ? 'online' : 'offline'));
      };
      connection.addEventListener('change', updateConnection);
    }

    return () => {
      window.removeEventListener('online',  updateOnline);
      window.removeEventListener('offline', updateOffline);
      if (connection) connection.removeEventListener('change', updateConnection);
    };
  }, [connection]);

  // Render a warning if offline or slow
  const isWarn = status === 'offline' || ['2g', 'slow-2g'].includes(status);

  return (
    <div
      className={
        `text-sm px-2 py-1 rounded ${
          isWarn ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
        }`
      }
    >
      {connection
        ? `Connection: ${status}`
        : status === 'offline'
          ? 'You are offline'
          : 'You are online'}
    </div>
  );
}
