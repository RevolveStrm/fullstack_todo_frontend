"use client";
import { useTasks } from "@/domains/task/hooks";
import { usePathname } from "next/navigation";
import React from "react";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

export const TasksTable = () => {
  const pathname = usePathname();

  const { data: tasks } = useTasks({ enabled: pathname === "/tasks" });

  return (
    <div>{tasks?.length && <DataTable data={tasks} columns={columns} />}</div>
  );
};
