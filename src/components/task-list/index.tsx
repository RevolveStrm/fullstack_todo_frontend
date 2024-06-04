"use client";
import { useTasks } from "@/domains/task/hooks";
import { TaskItem } from "../task-item";
import { usePathname, useSearchParams } from "next/navigation";
import { TaskQueryParams } from "@/domains/task";

export const TaskList = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queryParams: TaskQueryParams = Object.fromEntries(
    searchParams.entries(),
  );

  if (queryParams.status === "all") {
    delete queryParams.status;
  }

  const { data: tasks } = useTasks(queryParams, { enabled: pathname === "/" });

  return (
    <div className="max-w-2xl w-full h-[57vh] p-5 mt-5 gap-6 flex flex-col overflow-auto">
      {tasks?.length ? (
        tasks.map((task) => <TaskItem key={task.id} task={task} />)
      ) : (
          <div className="flex flex-col items-center">
            <h1 className="text-5xl">😉</h1>
            <span className="font-sans text-lg text-center py-[20px]">No tasks for now</span>
          </div>
      )}
    </div>
  );
};
