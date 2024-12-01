import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { deleteTaskFile, downloadTaskFile, uploadTaskFile } from './services';

export const useDownloadTaskFile = (
  fileId: string,
  fileName: string,
  options: { autoDownload?: boolean } = { autoDownload: false },
) => {
  const [downloading, setDownloading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const download = React.useCallback(async () => {
    setDownloading(true);
    setError(null);

    try {
      const data: Blob = await downloadTaskFile(fileId);

      if (!data) {
        throw new Error('Could not download file');
      }

      const link: HTMLAnchorElement = document.createElement('a');
      link.href = URL.createObjectURL(data);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      setError((err as Error).message || 'Error downloading file');
    } finally {
      setDownloading(false);
    }
  }, [fileId, fileName]);

  React.useEffect(() => {
    if (options.autoDownload) {
      download();
    }
  }, [download, options.autoDownload]);

  return {
    downloading,
    error,
    download,
  };
};

export const useUploadTaskFile = (taskId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['upload-task-file'],
    mutationFn: ({ taskId, file }: { taskId: string; file: File }) => uploadTaskFile(taskId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['task', taskId] });
    },
  });
};

export const useDeleteTaskFile = (taskId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['delete-task-file'],
    mutationFn: ({ fileId }: { fileId: string }) => deleteTaskFile(fileId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['task', taskId] });
    },
  });
};
