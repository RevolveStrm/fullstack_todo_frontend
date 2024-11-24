import { z } from 'zod';

export const BAD_CREDENTIALS_AUTH_ERROR = 'CredentialsSignin';

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .email({ message: 'This is not a valid email format.' })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
      message: 'Ensure the email follows the format: example@domain.com',
    }),
  password: z.string().min(1, { message: 'This field has to be filled.' }),
});

export type SignInData = z.infer<typeof signInSchema>;
