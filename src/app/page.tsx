import { AuroraBackground } from "@/components/aurora-background";
import { Container } from "@/components/container";
import { Transition } from "@/components/transition";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <AuroraBackground>
        <Container className="mt-10">
          <div className="max-w-[1024px]">
            <Transition initialX={-200}>
              <h1 className="font-black text-[36px] md:text-[64px] leading-tight mb-6 text-gray-900 dark:text-white">
                Your Tasks, Simplified and Modernized
              </h1>
            </Transition>
            <Transition initialX={200} delay={0.5}>
              <p className="text-[20px] md:text-xl text-gray-600 dark:text-gray-300 mb-12">
                Discover a new level of task management with our sleek and
                modern todo app. With a simple interface, intuitive features,
                and unmatched convenience, keeping track of your tasks has never
                been easier.
              </p>
            </Transition>
            <Transition delay={1}>
              <Link
                href="/tasks"
                className="absolute bg-black text-white dark:bg-white dark:text-black font-semibold py-2 px-12 rounded-lg shadow-lg transition-all text-lg hover:dark:bg-black hover:dark:text-white hover:duration-500"
              >
                Get Started
              </Link>
            </Transition>
          </div>
        </Container>
      </AuroraBackground>
    </main>
  );
}
