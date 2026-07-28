import { apiClient } from './client';

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  type: string;
  isRead: boolean;
  data: Record<string, unknown>;
  createdAt: string;
}

export const notificationApi = {
  subscribe: (fcmToken: string) =>
    apiClient.post('/notifications/subscribe', { fcmToken }),

  unsubscribe: () => apiClient.post('/notifications/unsubscribe'),

  getAll: (params?: Record<string, string>) =>
    apiClient.get<{ data: { notifications: NotificationItem[]; unreadCount: number } }>(
      '/notifications',
      { params },
    ),

  markAsRead: (id: string) => apiClient.put(`/notifications/${id}/read`),

  markAllAsRead: () => apiClient.put('/notifications/read-all'),
};
