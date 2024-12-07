import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Map, BarChart3, Navigation } from 'lucide-react';
import TransportMap from './components/Map/TransportMap';
import TransportAnalytics from './components/Analytics/TransportAnalytics';

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <nav className="bg-gray-800 text-white w-16 flex flex-col items-center py-4">
          <Link to="/" className="p-3 hover:bg-gray-700 rounded-lg mb-2" title="Map">
            <Map size={24} />
          </Link>
          <Link to="/analytics" className="p-3 hover:bg-gray-700 rounded-lg" title="Analytics">
            <BarChart3 size={24} />
          </Link>
        </nav>
        
        <main className="flex-1 bg-gray-100">
          <Routes>
            <Route path="/" element={<TransportMap />} />
            <Route path="/analytics" element={<TransportAnalytics />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;