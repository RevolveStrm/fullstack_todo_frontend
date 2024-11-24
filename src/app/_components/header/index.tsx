"use client";

import { cn } from "@/lib/utils";
import { ListTodo } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { ModeToggle } from "../theme-toggle";
import { UserNav } from "../user-nav";

interface Props {
  showUserNav: boolean;
}

export const Header: React.FC<Props> = ({ showUserNav }) => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const email: string = session?.email ?? "N/A";

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
        <div className="flex gap-4">
          <ModeToggle />
          {showUserNav && session && <UserNav email={email} />}
        </div>
      </div>
    </header>
  );
};
