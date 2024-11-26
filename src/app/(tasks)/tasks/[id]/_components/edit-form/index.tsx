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
import { Task } from "@/domains/task";
import { Save, X } from "lucide-react";
import React from "react";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
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
            {/* <AccordionItem value="item-files">
              <AccordionTrigger>
                <Label htmlFor="files">Files</Label>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2">
                <Upload/>
              </AccordionContent>
            </AccordionItem> */}
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
            {/* <AccordionItem value="item-2">
              <AccordionTrigger>
                <Label htmlFor="tags">Tags</Label>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {task.tags.map((tag, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-primary text-primary-foreground rounded-full px-3 py-1"
                      >
                        <span>{tag.title}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="ml-2 h-5 w-5 p-0"
                          onClick={() => handleRemoveTag(tag.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add new tag"
                    />
                    <Button type="button" onClick={handleAddTag}>
                      Add
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem> */}
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
