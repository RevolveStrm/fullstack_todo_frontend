import { isAxiosError } from "axios";

export const ErrorHelpers = {
  getMessage(error: unknown): string | undefined {
    if (isAxiosError<{ message: string | string[] }>(error)) {
      const message = error.response?.data?.message;
      if (message) {
        return Array.isArray(message) ? message.join(", ") : message;
      }
    } else if (error instanceof Error) {
      return error.message;
    }
    return undefined;
  },
};
