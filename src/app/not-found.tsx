import { Container } from "@/components/container";
import { MoveLeftIcon } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex items-center justify-center">
      <Container className="text-center mt-10">
        <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-black dark:text-white mb-6">
          Sorry, the page you were looking for does not exist.
        </p>
        <Link
          href="/"
          className="flex gap-2 bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-lg font-medium transition"
        >
          <MoveLeftIcon />
          Back to home
        </Link>
      </Container>
    </main>
  );
}
