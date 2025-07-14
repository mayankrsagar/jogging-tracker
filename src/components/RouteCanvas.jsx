import {
  useEffect,
  useRef,
} from 'react';

export default function RouteCanvas({ points = [], width = 400, height = 400 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || points.length < 2) return;

    const ctx = canvas.getContext('2d');
    // Clear previous drawing
    ctx.clearRect(0, 0, width, height);

    // Draw path
    ctx.beginPath();
    // Scale lat/lng to canvas coords (simple normalization)
    const lats = points.map(p => p.latitude);
    const lngs = points.map(p => p.longitude);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    const scaleX = width / (maxLng - minLng || 1);
    const scaleY = height / (maxLat - minLat || 1);

    points.forEach((pt, idx) => {
      const x = (pt.longitude - minLng) * scaleX;
      const y = height - (pt.latitude - minLat) * scaleY; // invert Y so north is up

      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });

    ctx.strokeStyle = '#3b82f6'; // Tailwind blue-500
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [points, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="border border-gray-300 rounded-md"
    />
  );
}
