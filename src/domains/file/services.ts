import http from '@/services/http';
import { TaskFile } from './types';

export const downloadTaskFile = async (fileId: string): Promise<Blob> => {
  return (
    await http.get<Blob>(`/files/${fileId}`, {
      responseType: 'blob',
    })
  )?.data;
};

export const uploadTaskFile = async (taskId: string, file: File): Promise<TaskFile> => {
  const formData: FormData = new FormData();
  formData.append('taskId', taskId);
  formData.append('file', file);
  return (
    await http.post<TaskFile>(`/files`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data; charset=UTF-8',
      },
    })
  )?.data;
};

export const deleteTaskFile = async (fileId: string): Promise<TaskFile> => {
  return (await http.delete<TaskFile>(`/files/${fileId}`))?.data;
};
