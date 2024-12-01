"use client";

import { cn } from "@/lib/utils";
import { ListTodo } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { ModeToggle } from "../theme-toggle";
import { UserNav } from "../user-nav";

interface Props {
  showUserNav: boolean;
}

export const Header: React.FC<Props> = ({ showUserNav }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const email: string = session?.email ?? "N/A";

  useEffect(() => {
    console.log(pathname, searchParams.get("success"));
    if (pathname.includes("/tasks") && searchParams.has("success")) {
      toast.success("Welcome back! You have successfully signed in.");

      router.replace("/tasks");
    }
  }, [pathname, router, searchParams]);

  return (
    <header
      className={cn("w-full border-b", {
        hidden: !pathname.includes("/tasks"),
      })}
    >
      <div className="flex mx-auto w-full items-center justify-between px-4 lg:px-12 py-2">
        <Link href="/">
          <ListTodo size={48} />
        </Link>
        <div className="space-x-3">
          <ModeToggle />
          {showUserNav && session && <UserNav email={email} />}
        </div>
      </div>
    </header>
  );
};
