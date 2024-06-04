export enum TaskStatus {
  "DONE" = "DONE",
  "UNDONE" = "UNDONE",
}

export type Task = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  priority: number;
  status: TaskStatus;
};

export type CreateTask = Pick<Task, "title" | "priority">;

export type UpdateTask = Pick<Task, "status">;

export type TaskQueryParams = {
  title?: string;
  status?: string;
  sortField?: string;
  sortDirection?: string;
};
