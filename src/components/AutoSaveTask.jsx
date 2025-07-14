// src/components/AutoSaveTask.jsx
import { useEffect } from 'react';

export default function AutoSaveTask({ data }) {
  useEffect(() => {
    let intervalId;
    let taskController;

    const saveSession = () => {
      localStorage.setItem('jogSession', JSON.stringify(data));
      console.log('Session auto-saved');
    };

    if (!('scheduler' in window)) {
      console.warn(
        'Background Tasks API not supported; falling back to setInterval'
      );
      // Fallback: save every 30 seconds
      intervalId = setInterval(saveSession, 30000);
    } else {
      // Use the Background Tasks API
      taskController = window.scheduler.postTask(saveSession, {
        delay: 30000,
        timeout: 5000,
      });
    }

    return () => {
      // Cleanup fallback interval
      if (intervalId) clearInterval(intervalId);

      // Cleanup scheduler task
      if (taskController && typeof taskController.cancel === 'function') {
        taskController.cancel();
      }
    };
  }, [data]);

  return null;
}
