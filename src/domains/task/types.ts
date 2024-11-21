import { Task } from './schema';

export type CreateTask = Partial<Pick<Task, 'title' | 'priority'>>;

export type UpdateTask = Partial<Pick<Task, 'status' | 'priority'>>;
