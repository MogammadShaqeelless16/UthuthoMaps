import axios, { AxiosError } from 'axios';

const API_KEY = 'Bss0treqpLpb71X4U0OtE7ny-lIKUnsM_4K5b3kd5os';

const hereApi = axios.create({
  baseURL: 'https://router.hereapi.com/v8',
  params: {
    apiKey: API_KEY
  }
});

interface RouteResponse {
  routes: Array<{
    sections: Array<{
      polyline: string;
    }>;
  }>;
}

export const getRoute = async (
  origin: [number, number], 
  destination: [number, number], 
  transportMode: string
): Promise<RouteResponse | null> => {
  try {
    const response = await hereApi.get<RouteResponse>('/routes', {
      params: {
        transportMode,
        origin: `${origin[0]},${origin[1]}`,
        destination: `${destination[0]},${destination[1]}`,
        return: 'polyline'
      }
    });
    
    // Return only the necessary data
    return {
      routes: response.data.routes.map(route => ({
        sections: route.sections.map(section => ({
          polyline: section.polyline
        }))
      }))
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('HERE API Error:', error.response?.data || error.message);
    } else {
      console.error('Error fetching route:', error);
    }
    return null;
  }
};