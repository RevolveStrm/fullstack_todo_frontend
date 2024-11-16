import { z } from 'zod';

export const TaskStatusEnum = z.enum(['TODO', 'IN_PROGRESS', 'DONE', 'CANCELED']);

export type TaskStatus = z.infer<typeof TaskStatusEnum>;

export const TaskPriorityEnum = z.enum(['HIGH', 'MEDIUM', 'LOW']);

export type TaskPriority = z.infer<typeof TaskPriorityEnum>;

export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  status: TaskStatusEnum,
  priority: TaskPriorityEnum,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().optional(),
  userId: z.string(),
});

export type Task = z.infer<typeof taskSchema>;