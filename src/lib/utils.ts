import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractMessages(obj: Record<string, any>): string[] {
  const messages: string[] = [];

  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      messages.push(obj[key]);
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      messages.push(...extractMessages(obj[key]));
    }
  }

  return messages;
}
