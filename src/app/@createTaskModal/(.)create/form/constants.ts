import z from "zod";

export const createTaskSchema = z.object({
  title: z.string(),
  priority: z.number(),
});

export const prioritySelectData = Array.from({ length: 10 }).map((_, i) => ({
  value: i + 1,
  label: String(i + 1),
}));
