import { SearchForm } from "@/components/forms/search-form";
import { TaskList } from "@/components/task-list";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-between px-24 py-12">
      <SearchForm />
      <TaskList />
    </main>
  );
}
