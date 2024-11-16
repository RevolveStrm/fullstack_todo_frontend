'use client';

import { Row } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { ToastType, showToast } from '@/components/toast-provider/helpers/show-toast';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  TaskPriority,
  TaskStatus,
  TaskStatusEnum,
  taskSchema,
  useDeleteTask,
  useUpdateTask,
} from '@/domains/task';
import { ErrorHelpers } from '@/services/error/helpers';
import { useRouter } from 'next/navigation';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  const task = taskSchema.parse(row.original);

  const { mutateAsync: deleteTaskAction } = useDeleteTask();
  const { mutateAsync: updateTaskAction } = useUpdateTask();

  const handleClickEdit = () => {
    router.push(`/tasks/${task.id}`);
  };

  const handleUpdatePriority = async (priority: TaskPriority) => {
    try {
      await updateTaskAction(
        { id: task.id, data: { priority } },
        {
          onSuccess() {
            showToast(ToastType.SUCCESS, `Changed task ${task.title} priority`);
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

  const handleUpdateStatus = async (status: TaskStatus) => {
    try {
      await updateTaskAction(
        { id: task.id, data: { status } },
        {
          onSuccess() {
            showToast(ToastType.SUCCESS, `Changed task ${task.title} status`);
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

  const handleClickDelete = async () => {
    try {
      await deleteTaskAction(task.id, {
        onSuccess() {
          showToast(ToastType.SUCCESS, `Task successfully removed: ${task.title}`);
        },
      });
    } catch (error) {
      const message: string | undefined = ErrorHelpers.getMessage(error);
      if (message) {
        showToast(ToastType.ERROR, message);
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <MoreHorizontal />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Update priority</DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-[180px]">
            <DropdownMenuRadioGroup onValueChange={handleUpdatePriority}>
              <DropdownMenuRadioItem value="HIGH">High</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="MEDIUM">Medium</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="LOW">Low</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Update status</DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-[180px]">
            <DropdownMenuRadioGroup onValueChange={handleUpdateStatus}>
              <DropdownMenuRadioItem value="TODO">Todo</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="IN_PROGRESS">In progress</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="DONE">Done</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="CANCELED">Canceled</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleClickEdit}>
          Edit
          <DropdownMenuShortcut>⌘✎</DropdownMenuShortcut>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleClickDelete}>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
