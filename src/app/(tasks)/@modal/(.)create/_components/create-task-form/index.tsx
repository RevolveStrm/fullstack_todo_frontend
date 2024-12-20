"use client";
import { priorities } from "@/app/(tasks)/tasks/_components/tasks-table/constants";
import { CustomSelect } from "@/components/custom-select";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAddTask } from "@/domains/task/hooks";
import { ErrorHelpers } from "@/services/error/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { createTaskSchema } from "./constants";

type CreateTaskFormData = z.infer<typeof createTaskSchema>;

export const CreateTaskForm = () => {
  const { mutateAsync: createTaskAction } = useAddTask();
  const router = useRouter();

  const form = useForm<CreateTaskFormData>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: { title: "", description: "", priority: "MEDIUM" },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await createTaskAction(data, {
        onSuccess() {
          toast.success("New task is created!");
          router.back();
        },
      });
    } catch (error) {
      const message = ErrorHelpers.getMessage(error);
      if (message) {
        toast.error(message);
      }
    }
  });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-5 w-full px-4 md:px-0"
      >
        <h2 className="font-sans text-3xl font-semibold">Create new task</h2>

        <div className="w-full mt-5 flex flex-col items-center gap-4">
          <Label htmlFor="title" className="text-left w-full">
            Title
          </Label>
          <Input
            id="title"
            placeholder="Enter your task title.."
            {...form.register("title")}
          />

          <Label htmlFor="description" className="text-left w-full">
            Description
          </Label>
          <Textarea
            {...form.register("description")}
            id="description"
            name="description"
            placeholder="Enter your task description.."
            defaultValue={form.getValues("description")}
            className="h-[150px] max-h-[200px]"
          />

          <Label htmlFor="priority" className="text-left w-full">
            Priority
          </Label>
          <CustomSelect name="priority" items={priorities} />
        </div>

        <div className="flex items-center justify-center gap-5 text-zinc-800">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="mt-5 py-2 px-4 bg-dark bg-black text-white w-full text-lg dark:bg-white dark:text-black"
          >
            {form.formState.isSubmitting ? <Spinner size={24} /> : "Create"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
