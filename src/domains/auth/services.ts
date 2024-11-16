import http from '@/services/http';
import { AuthResponse, Credentials } from './types';

export const signIn = async (credentials: Credentials): Promise<AuthResponse> => {
  const response = await http.post<AuthResponse>('/auth/sign-in', credentials);
  return response.data;
};

export const signUp = async (credentials: Credentials): Promise<AuthResponse> => {
  const response = await http.post<AuthResponse>('/auth/sign-up', credentials);
  return response.data;
};

export const refreshToken = async (refreshToken: string): Promise<AuthResponse> => {
  const response = await http.get<AuthResponse>('/auth/refresh', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  return response.data;
};
