import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Town } from '../../types';
import { southAfricanTowns } from '../../data/towns';
import { transportRoutes } from '../../data/transportRoutes';
import { Navigation } from 'lucide-react';
import RouteLayer from './RouteLayer';
import 'leaflet/dist/leaflet.css';
import { HeatMapLayer } from '../HeatMap/TransportHeatMap';

function LocationMarker() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", (e) => {
      setPosition([e.latlng.lat, e.latlng.lng]);
      map.flyTo(e.latlng, 13);
    });
  }, [map]);

  return position ? (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  ) : null;
}

export default function TransportMap() {
  const [selectedTown, setSelectedTown] = useState<Town | null>(null);

  const handleTownChange = (townId: string) => {
    const town = southAfricanTowns.find(t => t.id === townId);
    if (town) {
      setSelectedTown(town);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="p-4 bg-white shadow-md z-10">
        <select
          className="w-full p-2 border rounded-md"
          onChange={(e) => handleTownChange(e.target.value)}
        >
          <option value="">Select a town</option>
          {southAfricanTowns.map((town) => (
            <option key={town.id} value={town.id}>
              {town.name}
            </option>
          ))}
        </select>
      </div>
      
      <MapContainer
        center={selectedTown?.coordinates || [-28.4793, 24.6727]}
        zoom={selectedTown?.zoom || 6}
        className="flex-1 w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />

               {/* Add HeatMapLayer */}
               <HeatMapLayer />
        
        {/* Render all transport routes */}
        {Object.entries(transportRoutes).map(([type, routes]) =>
          routes.map(route => (
            <RouteLayer
              key={route.id}
              origin={route.origin}
              destination={route.destination}
              transportType={type as 'taxi' | 'bus' | 'train'}
            />
          ))
        )}
      </MapContainer>
    </div>
  );
}