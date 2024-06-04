"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {cn} from "@/utils/cn";

export const Header = () => {
  const pathname = usePathname();

  const disableCreateButton = pathname !== "/";

  return (
    <header className="w-full border-b">
      <div className="flex mx-auto w-full items-center justify-between px-12 py-5 container">
        <Link href="/">
          <Image src='images/logo.svg' alt="Logo" width={64} height={64}/>
        </Link>
        <Link
          href="/create"
          className={cn("flex items-center justify-between shadow-sm rounded-2xl border-2 px-7 py-4 gap-3 transition duration-100 hover:scale-95",
              {"pointer-events-none" : disableCreateButton}
          )}
          scroll={false}
        >
          <span className={ cn("font-sans text-xl text-zinc-800",
              {"text-zinc-400": disableCreateButton}
          )}
          >
            Create task
          </span>
        </Link>
      </div>
    </header>
  );
};
