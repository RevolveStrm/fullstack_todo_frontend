import { TaskPriorityEnum } from '@/domains/task';
import z from 'zod';

export const createTaskSchema = z.object({
  title: z.string(),
  description: z.string(),
  priority: TaskPriorityEnum,
});
