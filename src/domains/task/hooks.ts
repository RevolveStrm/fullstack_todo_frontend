import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { createTask, deleteTask, getAllTasks, getTask, updateTask } from './services';
import { CreateTask, UpdateTask } from './types';

export const useTask = (id: string) =>
  useSuspenseQuery({
    queryKey: ['task', id],
    queryFn: () => getTask(id),
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

export const useTasks = ({ enabled }: { enabled: boolean }) =>
  useQuery({
    queryKey: ['tasks'],
    queryFn: () => getAllTasks(),
    placeholderData: keepPreviousData,
    enabled,
  });

export const useAddTask = () =>
  useMutation({
    mutationKey: ['create-task'],
    mutationFn: (data: CreateTask) => createTask(data),
  });

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['update-task'],
    mutationFn: ({ id, data }: { id: string; data: UpdateTask }) => updateTask({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['delete-task'],
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

import { useEffect, useState } from 'react';

export const useDeadlineTimeLeft = (deadlineAt: string | null | undefined) => {
  const [timeLeft, setTimeLeft] = useState<string | null>(null);

  useEffect(() => {
    if (!deadlineAt) {
      setTimeLeft('No deadline set');
      return;
    }

    const calculateTimeLeft = () => {
      const deadline = new Date(deadlineAt);
      const now = new Date();
      const timeDiff = deadline.getTime() - now.getTime();

      if (timeDiff <= 0) {
        setTimeLeft('Deadline has passed');
        return;
      }

      const days: number = Math.floor(timeDiff / (1000 * 3600 * 24));
      const hours: number = Math.floor((timeDiff % (1000 * 3600 * 24)) / (1000 * 3600));
      const minutes: number = Math.floor((timeDiff % (1000 * 3600)) / (1000 * 60));

      const sign: string = days === 0 ? '🔥' : '';

      setTimeLeft(`${days} days, ${hours} hours, ${minutes} minutes left ${sign}`);
    };

    calculateTimeLeft();
    const intervalId = setInterval(calculateTimeLeft, 60000);

    return () => clearInterval(intervalId);
  }, [deadlineAt]);

  return timeLeft;
};
