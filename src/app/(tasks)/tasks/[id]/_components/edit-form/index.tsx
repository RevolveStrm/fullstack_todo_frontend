import { CustomSelect } from "@/components/custom-select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "@/components/upload";
import { MAX_FILES_COUNT_PER_TASK, TaskFile } from "@/domains/file";
import { Task } from "@/domains/task";
import { Save, X } from "lucide-react";
import React from "react";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { FileCard } from "../../../_components/file-card";
import {
  priorities,
  statuses,
} from "../../../_components/tasks-table/constants";
import { TaskFormValues } from "../task";

interface Props {
  className?: string;
  task: Task;
  onFormSubmit: SubmitHandler<TaskFormValues>;
  onFileUpload: (file: File) => void;
  onFileDelete: (fileId: string) => void;
}

export const EditForm: React.FC<Props> = ({
  task,
  onFormSubmit,
  onFileUpload,
  onFileDelete,
}) => {
  const form = useForm<TaskFormValues>({
    defaultValues: {
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      deadlineAt: task.deadlineAt,
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
          <Accordion type="single" collapsible>
            <AccordionItem value="item-description">
              <AccordionTrigger>
                <Label htmlFor="description">Description</Label>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2">
                <p>
                  Provide a detailed description of your task. This helps ensure
                  clarity and better understanding of the task requirements.
                </p>
                <Textarea
                  {...form.register("description")}
                  id="description"
                  name="description"
                  defaultValue={form.getValues("description")}
                  className="max-h-[200px]"
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-files">
              <AccordionTrigger>
                <Label htmlFor="files">Files</Label>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2">
                {task.files.map((file: TaskFile) => (
                  <FileCard
                    key={file.id}
                    file={file}
                    onDelete={() => onFileDelete(file.id)}
                  />
                ))}
                {task.files.length < MAX_FILES_COUNT_PER_TASK && (
                  <Upload onUpload={onFileUpload} />
                )}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-deadline">
              <AccordionTrigger>
                <Label htmlFor="deadlineAt">Deadline</Label>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2">
                <p>
                  Please select the deadline date for your task using the
                  calendar below.
                </p>
                <div className="flex justify-center items-center">
                  <Controller
                    name="deadlineAt"
                    control={form.control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Calendar
                        fromDate={new Date()}
                        mode="single"
                        selected={value ? new Date(value) : undefined}
                        onDayBlur={onBlur}
                        onSelect={onChange}
                      />
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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
