"use client";

import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
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
} from "@/components/ui/dropdown-menu";
import {
  TaskPriority,
  TaskStatus,
  taskSchema,
  useDeleteTask,
  useUpdateTask,
} from "@/domains/task";
import { ErrorHelpers } from "@/services/error/helpers";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { priorities, statuses } from "../constants";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
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
            toast.success(
              `Successfully updated priority of task: "${task.title}" to "${
                priorities.find((p) => p.value === priority)?.label
              }"`
            );
          },
        }
      );
    } catch (error) {
      const message: string | undefined = ErrorHelpers.getMessage(error);
      if (message) {
        toast.error(message);
      }
    }
  };

  const handleUpdateStatus = async (status: TaskStatus) => {
    try {
      await updateTaskAction(
        { id: task.id, data: { status } },
        {
          onSuccess() {
            toast.success(
              `Successfully updated status of task: "${task.title}" to "${
                statuses.find((s) => s.value === status)?.label
              }"`
            );
          },
        }
      );
    } catch (error) {
      const message: string | undefined = ErrorHelpers.getMessage(error);
      if (message) {
        toast.error(message);
      }
    }
  };

  const handleClickDelete = async () => {
    try {
      await deleteTaskAction(task.id, {
        onSuccess() {
          toast.success(`Successfully removed task: "${task.title}"`);
        },
      });
    } catch (error) {
      const message: string | undefined = ErrorHelpers.getMessage(error);
      if (message) {
        toast.error(message);
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Update priority</DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-[180px]">
            <DropdownMenuRadioGroup
              onValueChange={(value) =>
                handleUpdatePriority(value as TaskPriority)
              }
            >
              {priorities.map((priority) => (
                <DropdownMenuRadioItem
                  disabled={task.priority === priority.value}
                  key={priority.value}
                  value={priority.value}
                >
                  <div className="flex flex-row-reverse w-full gap-2 justify-end items-center">
                    {priority.label}
                    <priority.icon size={16} />
                  </div>
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Update status</DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-[180px]">
            <DropdownMenuRadioGroup
              onValueChange={(value) => handleUpdateStatus(value as TaskStatus)}
            >
              {statuses.map((status) => (
                <DropdownMenuRadioItem
                  disabled={task.status === status.value}
                  key={status.value}
                  value={status.value}
                >
                  <div className="flex flex-row-reverse w-full gap-2 justify-end items-center">
                    {status.label}
                    <status.icon size={16} />
                  </div>
                </DropdownMenuRadioItem>
              ))}
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
