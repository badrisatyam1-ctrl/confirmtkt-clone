import apiClient from './client';

export interface InitiateBookingPayload {
  tripId: string;
  seatIds: string[];
  boardingStopId: string;
  droppingStopId: string;
  passengers: {
    firstName: string;
    lastName: string;
    age: number;
    gender: 'MALE' | 'FEMALE' | 'OTHER';
  }[];
  contactEmail: string;
  contactPhone: string;
}

export const bookingApi = {
  initiateBooking: async (payload: InitiateBookingPayload) => {
    const { data } = await apiClient.post('/booking/initiate', payload);
    return data;
  },

  applyCoupon: async (bookingId: string, code: string) => {
    const { data } = await apiClient.post(`/booking/${bookingId}/apply-coupon`, { code });
    return data;
  },

  createPaymentIntent: async (bookingId: string) => {
    const { data } = await apiClient.post(`/booking/${bookingId}/payment-intent`);
    return data;
  },

  confirmBooking: async (bookingId: string, paymentDetails: { providerRefId: string; amount: number; provider: string }) => {
    const { data } = await apiClient.post(`/booking/${bookingId}/confirm`, paymentDetails);
    return data;
  },

  cancelBooking: async (bookingId: string) => {
    const { data } = await apiClient.post(`/booking/${bookingId}/cancel`);
    return data;
  },

  getMyBookings: async () => {
    const { data } = await apiClient.get('/booking/history');
    return data;
  }
};
