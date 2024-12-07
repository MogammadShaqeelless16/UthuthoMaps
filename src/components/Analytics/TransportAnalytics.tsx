import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import L from 'leaflet';
import 'leaflet.heat'; // Ensure you have leaflet-heat installed
import 'leaflet/dist/leaflet.css';

// Mock Heatmap Data
const heatMapData = [
  [-26.2041, 28.0473, 0.8], // Johannesburg
  [-33.9249, 18.4241, 0.6], // Cape Town
  [-29.8587, 31.0218, 0.7], // Durban
];

// Mock Bar Chart Data
const transportUsageData = [
  { name: 'Taxi', users: 4500, vehicles: 250 },
  { name: 'Train', users: 3200, vehicles: 40 },
  { name: 'Bus', users: 2100, vehicles: 160 },
];

// Mock Line Chart Data (Monthly Growth)
const monthlyGrowthData = [
  { month: 'Jan', taxi: 3000, train: 2000, bus: 1500 },
  { month: 'Feb', taxi: 3500, train: 2500, bus: 1800 },
  { month: 'Mar', taxi: 4000, train: 3000, bus: 2000 },
  { month: 'Apr', taxi: 4200, train: 3100, bus: 2100 },
  { month: 'May', taxi: 4600, train: 3200, bus: 2200 },
];

// Heatmap Layer Component
function HeatMapLayer() {
  const map = useMap(); // Access map instance from react-leaflet's useMap hook

  useEffect(() => {
    if (map) {
      // Create and add the heatmap layer
      const heat = L.heatLayer(heatMapData, {
        radius: 25,
        blur: 15,
        maxZoom: 10,
      }).addTo(map);

      // Cleanup heatmap layer when component unmounts
      return () => {
        map.removeLayer(heat);
      };
    }
  }, [map]); // Re-run the effect if map changes

  return null;
}

// Main Dashboard Component
export default function TransportDashboard() {
  const [selectedVisualization, setSelectedVisualization] = useState('bar');

  return (
    <div className="p-6 flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Transport Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Map with Heatmap */}
        <div className="bg-white p-4 rounded-lg shadow-lg col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">
            Heatmap of Transport Density
          </h2>
          <MapContainer
            center={[-28.4793, 24.6727]}
            zoom={6}
            style={{ height: '400px', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <HeatMapLayer />
          </MapContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            Transport Usage Comparison
          </h2>
          <BarChart width={500} height={300} data={transportUsageData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="users" fill="#8884d8" name="Daily Users" />
            <Bar dataKey="vehicles" fill="#82ca9d" name="Vehicles" />
          </BarChart>
        </div>

        {/* Line Chart */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            Monthly Growth in Transport Usage
          </h2>
          <LineChart width={500} height={300} data={monthlyGrowthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="taxi" stroke="#ff7300" name="Taxi" />
            <Line
              type="monotone"
              dataKey="train"
              stroke="#387908"
              name="Train"
            />
            <Line type="monotone" dataKey="bus" stroke="#8884d8" name="Bus" />
          </LineChart>
        </div>
      </div>

      {/* Visualization Selector */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          Interactive Visualization
        </h2>
        <select
          value={selectedVisualization}
          onChange={(e) => setSelectedVisualization(e.target.value)}
          className="p-2 border rounded-md mb-4"
        >
          <option value="bar">Bar Chart</option>
          <option value="line">Line Chart</option>
        </select>

        {/* Render Selected Visualization */}
        {selectedVisualization === 'bar' && (
          <BarChart width={600} height={300} data={transportUsageData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="users" fill="#8884d8" name="Daily Users" />
            <Bar dataKey="vehicles" fill="#82ca9d" name="Vehicles" />
          </BarChart>
        )}
        {selectedVisualization === 'line' && (
          <LineChart width={600} height={300} data={monthlyGrowthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="taxi" stroke="#ff7300" name="Taxi" />
            <Line
              type="monotone"
              dataKey="train"
              stroke="#387908"
              name="Train"
            />
            <Line type="monotone" dataKey="bus" stroke="#8884d8" name="Bus" />
          </LineChart>
        )}
      </div>
    </div>
  );
}
