import z from "zod";

export const prioritySelectData = [
  { value: "priority_ASC", label: "Priority ASC" },
  { value: "priority_DESC", label: "Priority DESC" },
];

export const statusSelectData = [
  { value: "all", label: "All" },
  { value: "DONE", label: "Done" },
  { value: "UNDONE", label: "Undone" },
];

export const searchSchema = z.object({
  title: z.string().optional(),
  priority: z.string().optional(),
  status: z.string().optional(),
});
