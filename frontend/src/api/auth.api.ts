import apiClient from './client';
import { User, LoginCredentials, RegisterData } from '../types';

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const { data } = await apiClient.post<{ success: boolean; data: { user: User; accessToken: string } }>('/auth/login', credentials);
    return data;
  },

  register: async (userData: RegisterData) => {
    const { data } = await apiClient.post<{ success: boolean; message: string; userId: string }>('/auth/register', userData);
    return data;
  },

  verifyOtp: async (email: string, otp: string) => {
    const { data } = await apiClient.post<{ success: boolean; data: { user: User; accessToken: string } }>('/auth/verify-otp', { email, otp });
    return data;
  },

  googleLogin: async (idToken: string) => {
    const { data } = await apiClient.post<{ success: boolean; data: { user: User; accessToken: string } }>('/auth/google', { idToken });
    return data;
  },

  logout: async () => {
    const { data } = await apiClient.post('/auth/logout');
    return data;
  },

  forgotPassword: async (email: string) => {
    const { data } = await apiClient.post('/auth/forgot-password', { email });
    return data;
  },

  resetPassword: async (token: string, newPassword: string) => {
    const { data } = await apiClient.post('/auth/reset-password', { token, newPassword });
    return data;
  },
  
  getProfile: async () => {
    const { data } = await apiClient.get<{ success: boolean; data: User }>('/auth/me');
    return data;
  }
};
