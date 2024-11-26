"use client";

import { Spinner } from "@/components/spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDeadlineTimeLeft, useTask, useUpdateTask } from "@/domains/task";
import type { Task as TaskT } from "@/domains/task";
import { ErrorHelpers } from "@/services/error/helpers";
import { CalendarIcon, Clock, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { EditForm } from "../edit-form";

type Props = {
  id: string;
};

export type TaskFormValues = Pick<
  TaskT,
  "title" | "description" | "status" | "priority" | "deadlineAt"
>;

export const Task: React.FC<Props> = ({ id }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const { data: task, isLoading, error } = useTask(id);
  const { mutateAsync: updateTaskAction } = useUpdateTask();
  const timeLeft = useDeadlineTimeLeft(task.deadlineAt);

  const onSubmit = async (data: TaskFormValues) => {
    try {
      await updateTaskAction(
        { id: task.id, data },
        {
          onSuccess() {
            toast.success(`Updated task ${task.title}`);
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
          <h2 className="text-2xl font-semibold dark:text-white">
            Task Not Found
          </h2>
          <p className="text-gray-600 mt-2">
            The task you are looking for does not exist or may have been
            removed.
          </p>
          <button
            className="mt-4 px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded"
            onClick={() => router.replace("/tasks")}
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
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsEditing(!isEditing)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="mt-4">
        {isEditing ? (
          <EditForm onFormSubmit={onSubmit} task={task} />
        ) : (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold">{task.title}</h3>
              <p className="text-muted-foreground mt-2">
                {task.description || "No description provided"}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge>{task?.priority}</Badge>
              <Badge>{task?.status}</Badge>
            </div>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                <span>
                  Created: {new Date(task.createdAt).toLocaleString()}
                </span>
              </div>
              {task.updatedAt && (
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  <span>
                    Updated: {new Date(task.updatedAt).toLocaleString()}
                  </span>
                </div>
              )}
              {task.deadlineAt && (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    <span>
                      Deadline: {new Date(task.deadlineAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Time left: {timeLeft}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
