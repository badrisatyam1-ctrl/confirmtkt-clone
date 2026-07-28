import apiClient from './client';

export const busApi = {
  searchBuses: async (origin: string, destination: string, date: string) => {
    const { data } = await apiClient.get('/bus/search', {
      params: { origin, destination, date }
    });
    return data;
  },

  getSeatLayout: async (tripId: string) => {
    const { data } = await apiClient.get(`/bus/trip/${tripId}/layout`);
    return data;
  }
};
