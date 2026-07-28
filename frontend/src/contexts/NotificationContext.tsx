import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { requestNotificationPermission, onForegroundMessage } from '@/lib/firebase';
import { notificationApi, type NotificationItem } from '@/api/notification.api';
import { useAuthStore } from '@/store/auth.store';
import { toast } from 'sonner';

interface NotificationContextValue {
  notifications: NotificationItem[];
  unreadCount: number;
  isSupported: boolean;
  fcmToken: string | null;
  requestPermission: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  refreshNotifications: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [isSupported] = useState(() => 'Notification' in window && 'serviceWorker' in navigator);
  const { isAuthenticated } = useAuthStore();

  const refreshNotifications = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      const { data } = await notificationApi.getAll();
      setNotifications(data.data.notifications);
      setUnreadCount(data.data.unreadCount);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  }, [isAuthenticated]);

  const requestPermission = useCallback(async () => {
    if (!isSupported) return;
    const token = await requestNotificationPermission();
    if (token) {
      setFcmToken(token);
      await notificationApi.subscribe(token);
    }
  }, [isSupported]);

  const markAsRead = useCallback(async (id: string) => {
    await notificationApi.markAsRead(id);
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
    setUnreadCount((prev) => Math.max(0, prev - 1));
  }, []);

  const markAllAsRead = useCallback(async () => {
    await notificationApi.markAllAsRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setUnreadCount(0);
  }, []);

  // Listen for foreground FCM messages
  useEffect(() => {
    if (!isAuthenticated || !isSupported) return;

    const unsubscribe = onForegroundMessage((payload) => {
      const message = payload as { notification?: { title?: string; body?: string } };
      if (message.notification) {
        toast.info(message.notification.title, {
          description: message.notification.body,
        });
        refreshNotifications();
      }
    });

    return unsubscribe;
  }, [isAuthenticated, isSupported, refreshNotifications]);

  // Fetch notifications on auth change
  useEffect(() => {
    if (isAuthenticated) {
      refreshNotifications();
    } else {
      setNotifications([]);
      setUnreadCount(0);
    }
  }, [isAuthenticated, refreshNotifications]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        isSupported,
        fcmToken,
        requestPermission,
        markAsRead,
        markAllAsRead,
        refreshNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications(): NotificationContextValue {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
