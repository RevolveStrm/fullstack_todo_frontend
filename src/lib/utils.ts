import { ALLOWED_FILE_EXTENSIONS, ALLOWED_FILE_MIME_TYPES } from '@/domains/file';
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

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function validateFile(file: File): boolean {
  if (!file) {
    return false;
  }

  if (!ALLOWED_FILE_MIME_TYPES.includes(file.type)) {
    return false;
  }

  const extension: string | undefined = file.name.split('.').pop()?.toLowerCase();

  if (!extension || !ALLOWED_FILE_EXTENSIONS.includes(`.${extension}`)) {
    return false;
  }

  return true;
}
