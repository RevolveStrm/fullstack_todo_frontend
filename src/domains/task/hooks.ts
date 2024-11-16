import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createTask, deleteTask, getAllTasks, getTask, updateTask } from './services';
import { CreateTask, TaskQueryParams, UpdateTask } from './types';

export const useTask = (id: string, { enabled = true } = {}) =>
  useQuery({
    queryKey: ['task', id],
    queryFn: () => getTask(id),
    placeholderData: keepPreviousData,
    enabled,
  });

export const useTasks = (params: TaskQueryParams, { enabled = true } = {}) =>
  useQuery({
    queryKey: ['tasks', params],
    queryFn: () => getAllTasks(params),
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
