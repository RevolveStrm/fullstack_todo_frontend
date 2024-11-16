import { Container } from '@/components/container';
import { Task } from '@/components/task';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

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
        <Task id={id} />
      </Container>
    </main>
  );
}
