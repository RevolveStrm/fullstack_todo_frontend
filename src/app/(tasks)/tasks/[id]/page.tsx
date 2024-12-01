import { Task } from "@/app/(tasks)/tasks/[id]/_components/task";
import { Container } from "@/components/container";
import { Spinner } from "@/components/spinner";
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
    <main>
      <Container className="mt-10 flex flex-col items-start">
        <Link href="/tasks" className="w-full md:w-auto lg:mt-2">
          <Button variant="default" className="h-8 px-2 lg:px-3 w-full">
            Back to tasks <ArrowLeft />
          </Button>
        </Link>

        <div className="relative w-full">
          <Suspense
            fallback={
              <Spinner className="absolute mt-20 inset-0 flex items-center justify-center" />
            }
          >
            <Task id={id} />
          </Suspense>
        </div>
      </Container>
    </main>
  );
}
