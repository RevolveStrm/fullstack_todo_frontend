import { z } from 'zod';

export const taskFileSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  size: z.number(),
  extension: z.string(),
  originalName: z.string(),
  encryptedName: z.string(),
  isPublic: z.boolean(),
  deletedAt: z.string().nullable(),
  taskId: z.string(),
});
