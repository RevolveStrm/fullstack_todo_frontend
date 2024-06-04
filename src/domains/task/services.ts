import { CreateTask, Task, TaskQueryParams, UpdateTask } from "./types";
import { http } from "@/services/http";

export const getAllTasks = async (params: TaskQueryParams): Promise<Task[]> => {
    const response = await http.get<Task[]>("tasks", { params });
    return response.data;
};

export const createTask = async (createTaskData: CreateTask): Promise<Task> => {
    const response = await http.post<Task>("tasks", createTaskData);
    return response.data;
};

export const updateTask = async ({ id, data }: { id: string; data: UpdateTask }): Promise<Task> => {
    const response = await http.patch<Task>(`tasks/${id}`, data);
    return response.data;
};

export const deleteTask = async (id: string): Promise<Task> => {
    const response = await http.delete<Task>(`tasks/${id}`);
    return response.data;
};