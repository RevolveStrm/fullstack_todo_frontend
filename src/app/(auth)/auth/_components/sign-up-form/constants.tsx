import { z } from 'zod';

export const signUpSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: 'This field has to be filled.' })
      .email({ message: 'This is not a valid email format.' })
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
        message: 'Ensure the email follows the format: example@domain.com',
      }),
    password: z
      .string()
      .min(1, { message: 'This field has to be filled.' })
      .min(8, { message: 'Password must have at least 8 characters.' })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter.',
      })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter.',
      })
      .regex(/\d/, { message: 'Password must contain at least one number.' })
      .regex(/[\W_]/, {
        message: 'Password must contain at least one special character (e.g., !@#$%^&*).',
      }),
    confirmPassword: z.string().min(1, { message: 'This field has to be filled.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'],
  });

export type SignUpData = z.infer<typeof signUpSchema>;
