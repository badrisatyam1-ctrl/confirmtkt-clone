import { apiClient } from './client';

export interface CreatePaymentIntentPayload {
  bookingId: string;
}

export interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
}

export const paymentApi = {
  createPaymentIntent: (payload: CreatePaymentIntentPayload) =>
    apiClient.post<{ data: PaymentIntentResponse }>('/payments/create-intent', payload),

  getPaymentStatus: (paymentIntentId: string) =>
    apiClient.get<{ data: { status: string; bookingId: string } }>(
      `/payments/status/${paymentIntentId}`,
    ),
};
