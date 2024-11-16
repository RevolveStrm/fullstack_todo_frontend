'use client';
import { PrioritySelect } from '@/components/priority-select';
import { Spinner } from '@/components/spinner';
import { ToastContext } from '@/components/toast-provider/context/toast-context';
import { ToastType } from '@/components/toast-provider/helpers/show-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAddTask } from '@/domains/task/hooks';
import { ErrorHelpers } from '@/services/error/helpers';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createTaskSchema } from './constants';

type CreateTaskFormData = z.infer<typeof createTaskSchema>;

export const CreateTaskForm = () => {
  const { showToast } = useContext(ToastContext);
  const { mutateAsync: createTaskAction } = useAddTask();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = useForm<CreateTaskFormData>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: { title: '', description: '', priority: 'MEDIUM' },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createTaskAction(data, {
        onSuccess() {
          showToast(ToastType.SUCCESS, 'New task is created!');
          router.back();
        },
      });
    } catch (error) {
      const message = ErrorHelpers.getMessage(error);
      if (message) {
        showToast(ToastType.ERROR, message);
      }
    }
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col w-[400px] gap-5">
      <h2 className="font-sans text-3xl font-semibold">Create new task</h2>

      <div className="w-full mt-5 flex flex-col items-center gap-4">
        <label htmlFor="title" className="text-left w-full">
          Title
        </label>
        <Input id="title" placeholder="Title" {...register('title')} />
        <label htmlFor="description" className="text-left w-full">
          Description
        </label>
        <Input id="description" placeholder="Description" {...register('description')} />
        <label htmlFor="priority" className="text-left w-full">
          Priority
        </label>

        <PrioritySelect control={control} />
      </div>

      <div className="flex items-center justify-center gap-5 text-zinc-800">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="mt-5 py-2 px-4 bg-dark bg-black text-white w-full text-lg dark:bg-white dark:text-black"
        >
          {isSubmitting ? <Spinner size={24} /> : 'Create'}
        </Button>
      </div>
    </form>
  );
};
