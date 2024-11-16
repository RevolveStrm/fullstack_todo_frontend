import { Container } from '@/components/container';
import { TasksTable } from '@/components/tasks-table';

export default async function TasksPage() {
  return (
    <main className="h-[64vh]">
      <Container className="mt-10">
        <TasksTable />
      </Container>
    </main>
  );
}
