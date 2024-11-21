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
