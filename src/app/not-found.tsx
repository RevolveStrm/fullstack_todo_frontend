import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-between items-center px-24 py-12">
      <h1 className="font-sans text-5xl font-semibold">🥲</h1>
      <h2 className="font-sans text-3xl font-semibold py-[20px]">Page not found!</h2>
      <Link href={'/'} className="text-md font-semibold text-blue-400 hover:text-blue-600">
        Back to your tasks
      </Link>
    </main>
  );
}
