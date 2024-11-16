import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="mt-10 lg:mt-[200px] px-6 lg:px-12 max-w-4xl mx-auto text-center">
      <h1 className="font-black text-[48px] md:text-[64px] leading-tight mb-6 text-gray-900 dark:text-white">
        Your Tasks, Simplified and Modernized
      </h1>
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12">
        Discover a new level of task management with our sleek and modern todo app. With a simple
        interface, intuitive features, and unmatched convenience, keeping track of your tasks has
        never been easier.
      </p>
      <Link href="/tasks">
        <Button className="bg-black text-white dark:bg-white dark:text-black font-semibold py-6 px-12 rounded-lg shadow-lg transition-all text-lg">
          Get Started
        </Button>
      </Link>
    </main>
  );
}
