import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type SignInData = z.infer<typeof signInSchema>;
