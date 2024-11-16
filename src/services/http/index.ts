import axios, { AxiosInstance } from 'axios';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

const http: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

http.interceptors.request.use(async (request) => {
  const session: Session | null = await getSession();

  if (session && !request.headers.Authorization) {
    request.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return request;
});

export default http;
