import axios, { AxiosInstance } from "axios";

const baseURL: string = "http://localhost:3001/api/v1";

export const http: AxiosInstance = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});
