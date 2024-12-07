export interface TransportRoute {
  id: string;
  type: 'taxi' | 'train' | 'bus';
  name: string;
  coordinates: [number, number][];
  schedule: Schedule[];
}

export interface Schedule {
  departureTime: string;
  arrivalTime: string;
  frequency: string;
}

export interface Town {
  id: string;
  name: string;
  coordinates: [number, number];
  zoom: number;
}

export interface TransportStats {
  type: string;
  count: number;
  usage: number;
}

export interface RoadWork {
  id: string;
  location: [number, number];
  description: string;
  startDate: string;
  endDate: string;
  status: 'ongoing' | 'planned' | 'completed';
}