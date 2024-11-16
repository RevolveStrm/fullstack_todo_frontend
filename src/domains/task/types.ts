import { Task } from './schema';

export type CreateTask = Pick<Task, 'title' | 'priority'>;

export type UpdateTask = Pick<Task, 'status' | 'priority'>;

export type TaskQueryParams = {
  page?: string;
  title?: string;
  status?: string;
  sortField?: string;
  sortDirection?: string;
};
