import { z } from 'zod';
import { taskFileSchema } from './schema';

export type TaskFile = z.infer<typeof taskFileSchema>;
