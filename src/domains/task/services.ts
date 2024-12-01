import http from '@/services/http';
import { Task } from './schema';
import type { CreateTask, UpdateTask } from './types';

export const getTask = async (id: string): Promise<Task> => {
  return (await http.get<Task>(`/tasks/${id}`))?.data;
};

export const getAllTasks = async (): Promise<Task[]> => {
  return (await http.get<Task[]>('/tasks'))?.data;
};

export const createTask = async (createTaskData: CreateTask): Promise<Task> => {
  return (await http.post<Task>('/tasks', createTaskData))?.data;
};

export const updateTask = async ({ id, data }: { id: string; data: UpdateTask }): Promise<Task> => {
  return (await http.patch<Task>(`/tasks/${id}`, data))?.data;
};

export const deleteTask = async (id: string): Promise<Task> => {
  return (await http.delete<Task>(`/tasks/${id}`))?.data;
};
