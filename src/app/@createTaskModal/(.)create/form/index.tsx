"use client";
import { z } from "zod";
import { createTaskSchema, prioritySelectData } from "./constants";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { useAddTask } from "@/domains/task/hooks";
import { ErrorHelpers } from "@/services/error/helpers";
import { useRouter } from "next/navigation";
import { Select } from "@/components/select";
import { useContext } from "react";
import { ToastContext } from "@/components/toast-provider/context/toast-context";
import { ToastType } from "@/components/toast-provider/helpers/show-toast";
import { Spinner } from "@/components/spinner";

type CreateTaskFormData = z.infer<typeof createTaskSchema>;

export const CreateTaskForm = () => {
  const { showToast } = useContext(ToastContext);
  const { mutateAsync: createTaskAction } = useAddTask();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    control,
  } = useForm<CreateTaskFormData>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: { title: "", priority: 1 },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createTaskAction(data, {
        onSuccess() {
          showToast(ToastType.SUCCESS, "New task is created!");
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
      <form onSubmit={onSubmit} className="flex w-[460px] flex-col items-center gap-5">
        <h2 className="font-sans text-5xl font-semibold">Create new task</h2>
        <span>Please, enter title and select a priority between 1 and 10</span>

        <div className="mt-10 flex items-center gap-4">
          <Input id="title" placeholder="Title" {...register("title")} />
          <Controller
              control={control}
              name="priority"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Select
                      options={prioritySelectData}
                      onChange={(val) => onChange(val?.value)}
                      onBlur={onBlur}
                      isSearchable={false}
                      unstyled
                      value={prioritySelectData.find((c) => c.value === value)}
                      id="priority"
                      ref={ref}
                  />
              )}
          />
        </div>

        <div className="flex items-center justify-center gap-5 text-zinc-800">
          <Button type="submit" disabled={isSubmitting} className="mt-5 bg-white text-zinc-800" fill>
            {isSubmitting ? <Spinner size={24} /> : "Create"}
          </Button>
        </div>
      </form>
  );
};