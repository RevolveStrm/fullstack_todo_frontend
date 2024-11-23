"use client";
import { Button } from "@/components/ui/button";
import { useTasks } from "@/domains/task/hooks";
import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

export const TasksTable = () => {
  const pathname = usePathname();
  const { data: tasks, isLoading } = useTasks({
    enabled: pathname === "/tasks",
  });

  if (!tasks?.length && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center w-full p-8 text-black dark:text-white">
        <h2 className="text-3xl font-semibold mb-4">No tasks available</h2>
        <p className="text-lg mb-6">
          It seems like you do not have any tasks yet. You can start by creating
          one!
        </p>
        <Link href="/create">
          <Button
            variant="default"
            className="flex items-center gap-2 py-2 px-6 rounded-lg bg-black text-white dark:bg-white dark:text-black"
          >
            <Plus />
            Create Task
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full pb-10">
      {tasks?.length && <DataTable data={tasks} columns={columns} />}
    </div>
  );
};
