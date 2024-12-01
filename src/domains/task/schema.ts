import { z } from 'zod';
import { taskFileSchema } from '../file';

export const tagSchema = z.object({
  id: z.string(),
  title: z.string(),
  color: z.string(),
});

export type Tag = z.infer<typeof tagSchema>;

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
  updatedAt: z.string().datetime().nullable().optional(),
  deadlineAt: z.string().datetime().nullable().optional(),
  userId: z.string(),
  tags: z.array(tagSchema),
  files: z.array(taskFileSchema),
});

export type Task = z.infer<typeof taskSchema>;
