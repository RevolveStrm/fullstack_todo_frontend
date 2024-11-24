import { z } from "zod";

export const validationMessages = {
  email: {
    ensureFormat: "Ensure the email follows the format: example@domain.com",
  },
  password: {
    minLength: "Password must have at least 8 characters.",
    uppercase: "Password must contain at least one uppercase letter.",
    lowercase: "Password must contain at least one lowercase letter.",
    number: "Password must contain at least one number.",
    specialChar:
      "Password must contain at least one special character (e.g., !@#$%^&*).",
  },
};

export const signUpSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email({ message: "This is not a valid email format." })
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
        message: validationMessages.email.ensureFormat,
      }),
    password: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .min(8, { message: validationMessages.password.minLength })
      .regex(/[A-Z]/, { message: validationMessages.password.uppercase })
      .regex(/[a-z]/, { message: validationMessages.password.lowercase })
      .regex(/\d/, { message: validationMessages.password.number })
      .regex(/[\W_]/, { message: validationMessages.password.specialChar }),
    confirmPassword: z
      .string()
      .min(1, { message: "This field has to be filled." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

export type SignUpData = z.infer<typeof signUpSchema>;
