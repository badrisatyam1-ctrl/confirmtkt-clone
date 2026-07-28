import { apiClient } from './client';
import type { PaginatedResponse } from '@/types';

export interface Review {
  id: string;
  userId: string;
  tripId: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    name: string;
    avatar: string | null;
  };
}

export interface CreateReviewPayload {
  tripId: string;
  rating: number;
  comment: string;
}

export const reviewApi = {
  create: (payload: CreateReviewPayload) =>
    apiClient.post<{ data: Review }>('/reviews', payload),

  getByTrip: (tripId: string, params?: Record<string, string>) =>
    apiClient.get<{ data: PaginatedResponse<Review> }>(`/reviews/trip/${tripId}`, { params }),
};
