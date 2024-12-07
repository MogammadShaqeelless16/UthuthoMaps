import { useEffect, useState } from 'react';
import { Polyline, useMap } from 'react-leaflet';
import { getRoute } from '../../services/hereApi';
import { decode } from '../../utils/polyline';

interface RouteLayerProps {
  origin: [number, number];
  destination: [number, number];
  transportType: 'taxi' | 'bus' | 'train';
}

const transportColors = {
  taxi: '#22c55e',  // green
  bus: '#3b82f6',   // blue
  train: '#ef4444'  // red
};

export default function RouteLayer({ origin, destination, transportType }: RouteLayerProps) {
  const [routePoints, setRoutePoints] = useState<[number, number][]>([]);
  const [error, setError] = useState<string | null>(null);
  const map = useMap();

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const response = await getRoute(origin, destination, transportType);
        if (!response) {
          setError('Failed to fetch route');
          // Fallback to direct line between points
          setRoutePoints([origin, destination]);
          return;
        }
        
        const polyline = response.routes[0]?.sections[0]?.polyline;
        if (!polyline) {
          setError('No route data available');
          setRoutePoints([origin, destination]);
          return;
        }

        const decodedPoints = decode(polyline);
        setRoutePoints(decodedPoints);
        setError(null);
      } catch (error) {
        console.error('Error in RouteLayer:', error);
        setError('Failed to process route data');
        // Fallback to direct line
        setRoutePoints([origin, destination]);
      }
    };

    fetchRoute();
  }, [origin, destination, transportType]);

  if (error) {
    console.warn(`Route Error (${transportType}):`, error);
  }

  return (
    <Polyline
      positions={routePoints}
      color={transportColors[transportType]}
      weight={4}
      opacity={error ? 0.4 : 0.8} // Reduce opacity for fallback routes
      dashArray={error ? "5, 10" : ""} // Use dashed line for fallback routes
    />
  );
}