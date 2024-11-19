import { TasksTable } from "@/app/(tasks)/tasks/_components/tasks-table";
import { Container } from "@/components/container";

export default async function TasksPage() {
  return (
    <main className="h-[64vh]">
      <Container className="mt-10">
        <TasksTable />
      </Container>
    </main>
  );
}
