import { CustomSelect } from "@/components/custom-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Task } from "@/domains/task";
import { Save } from "lucide-react";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  priorities,
  statuses,
} from "../../../_components/tasks-table/constants";
import { TaskFormValues } from "../task";

interface Props {
  className?: string;
  task: Task;
  onFormSubmit: SubmitHandler<TaskFormValues>;
}

export const EditForm: React.FC<Props> = ({ task, onFormSubmit }) => {
  const form = useForm<TaskFormValues>({
    defaultValues: {
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
    },
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            {...form.register("title")}
            id="title"
            name="title"
            defaultValue={form.getValues("title")}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            {...form.register("description")}
            id="description"
            name="description"
            defaultValue={form.getValues("description")}
            className="min-h-[100px]"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <CustomSelect name="status" items={statuses} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <CustomSelect name="priority" items={priorities} />
          </div>
        </div>
        <Button type="submit" className="w-full">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </form>
    </FormProvider>
  );
};
