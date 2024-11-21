import http from '@/services/http';
import { AuthResponse, Credentials } from './types';

export const signIn = async (credentials: Credentials): Promise<AuthResponse> => {
  return (await http.post<AuthResponse>('/auth/sign-in', credentials))?.data;
};

export const signUp = async (credentials: Credentials): Promise<AuthResponse> => {
  return (await http.post<AuthResponse>('/auth/sign-up', credentials))?.data;
};

export const refreshToken = async (refreshToken: string): Promise<AuthResponse> => {
  return (
    await http.get<AuthResponse>('/auth/refresh', {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    })
  )?.data;
};

export const logout = async (): Promise<void> => {
  await http.post<AuthResponse>('/auth/logout');
};
