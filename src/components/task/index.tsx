'use client';

import { Spinner } from '@/components/spinner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useTask, useUpdateTask } from '@/domains/task';
import type { Task as TaskT } from '@/domains/task';
import { ErrorHelpers } from '@/services/error/helpers';
import { CalendarIcon, Pencil, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PrioritySelect } from '../priority-select';
import { StatusSelect } from '../status-select';
import { ToastType, showToast } from '../toast-provider/helpers/show-toast';

type Props = {
  id: string;
};

type TaskFormValues = Pick<TaskT, 'title' | 'description' | 'status' | 'priority'>;

export const Task: React.FC<Props> = ({ id }) => {
  const router = useRouter();
  const isMountedRef = useRef(false);
  const [isEditing, setIsEditing] = useState(false);
  const { data: task, isLoading, error } = useTask(id);
  const { mutateAsync: updateTaskAction } = useUpdateTask();

  const { handleSubmit, reset, register, control } = useForm<TaskFormValues>({
    defaultValues: {
      title: '',
      description: '',
      status: 'TODO',
      priority: 'MEDIUM',
    },
  });

  const onSubmit = async (data: TaskFormValues) => {
    try {
      await updateTaskAction(
        { id: task.id, data },
        {
          onSuccess() {
            showToast(ToastType.SUCCESS, `Updated task ${task.title}`);
          },
        },
      );
    } catch (error) {
      const message: string | undefined = ErrorHelpers.getMessage(error);
      if (message) {
        showToast(ToastType.ERROR, message);
      }
    }
  };

  React.useEffect(() => {
    if (task && !isMountedRef.current) {
      reset({
        title: task?.title || '',
        description: task?.description || '',
        status: task?.status || 'TODO',
        priority: task?.priority || 'MEDIUM',
      });
      isMountedRef.current = true;
    }
  }, [task, reset]);

  if (isLoading) {
    return (
      <div className="text-center flex justify-center items-center mt-20">
        <Spinner />
      </div>
    );
  }
  if (error || !task) {
    return (
      <div className="flex items-center justify-center h-full mt-20">
        <div className="text-center">
          <h2 className="text-2xl font-semibold dark:text-white">Task Not Found</h2>
          <p className="text-gray-600 mt-2">
            The task you are looking for does not exist or may have been removed.
          </p>
          <button
            className="mt-4 px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded"
            onClick={() => router.replace('/tasks')}
          >
            Go Back to tasks
          </button>
        </div>
      </div>
    );
  }

  return (
    <Card className="w-full mx-auto my-8">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle>Task Details</CardTitle>
          <CardDescription>View and manage task information</CardDescription>
        </div>
        <Button variant="outline" size="icon" onClick={() => setIsEditing(!isEditing)}>
          <Pencil className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="mt-4">
        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                {...register('title')}
                id="title"
                name="title"
                defaultValue={task.title}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                {...register('description')}
                id="description"
                name="description"
                defaultValue={task.description}
                className="min-h-[100px]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <StatusSelect control={control} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <PrioritySelect control={control} />
              </div>
            </div>
            <Button type="submit" className="w-full">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </form>
        ) : (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold">{task.title}</h3>
              <p className="text-muted-foreground mt-2">
                {task.description || 'No description provided'}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge>{task?.priority}</Badge>
              <Badge>{task?.status}</Badge>
            </div>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                <span>Created: {new Date(task.createdAt).toLocaleString()}</span>
              </div>
              {task.updatedAt && (
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  <span>Updated: {new Date(task.updatedAt).toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
