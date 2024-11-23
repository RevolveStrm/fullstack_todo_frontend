import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  className?: string;
  children: React.ReactNode;
};

export const Container = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        "px-4 sm:px-6 md:px-8 max-w-[720px] sm:max-w-[768px] md:max-w-[1024px] lg:max-w-[1280px] xl:max-w-[1440px] mx-auto flex flex-col justify-start items-center",
        className
      )}
    >
      {children}
    </div>
  );
};
