import { Task } from "@/app/(tasks)/tasks/[id]/_components/task";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function TaskPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <main className="h-[64vh]">
      <Container className="mt-10">
        <Link href="/tasks">
          <Button>
            Back to tasks <ArrowLeft />
          </Button>
        </Link>

        <Suspense
          fallback={
            <h1 className="text-2xl text-yellow-400 animate-pulse">
              LOADING TASK...
            </h1>
          }
        >
          <Task id={id} />
        </Suspense>
      </Container>
    </main>
  );
}
