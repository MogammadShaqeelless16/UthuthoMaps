import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';

// Extend Leaflet to include the heat layer type
declare module 'leaflet' {
  export function heatLayer(latlngs: any[], options?: any): any;
}

// Import transport routes data
import { transportRoutes } from '../../data/transportRoutes'; // Adjust the path as needed

export function HeatMapLayer() {
  const map = useMap();

  useEffect(() => {
    // Prepare heat map data from transport routes
    const heatData = [
      ...transportRoutes.taxi.map((route) => [...route.origin, 0.7]), // Intensity for taxi routes
      ...transportRoutes.bus.map((route) => [...route.origin, 0.5]), // Intensity for bus routes
      ...transportRoutes.train.map((route) => [...route.origin, 0.8]), // Intensity for train routes
    ];

    // Add the heat layer to the map
    const heat = L.heatLayer(heatData, {
      radius: 20,
      blur: 15,
      maxZoom: 10,
    }).addTo(map);

    return () => {
      map.removeLayer(heat);
    };
  }, [map]);

  return null;
}
