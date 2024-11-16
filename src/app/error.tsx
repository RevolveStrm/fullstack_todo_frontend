'use client';

import { Button } from '@/components/ui/button';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ reset }: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <h1 className="font-sans text-5xl font-semibold">🥲</h1>
      <h2 className="font-sans text-3xl font-semibold">Something went wrong!</h2>
      <Button onClick={reset} className="border-2xl my-5">
        Try again
      </Button>
    </div>
  );
}
