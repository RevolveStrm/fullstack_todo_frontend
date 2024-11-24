import { cn } from "@/lib/utils";
import React from "react";

type SpinnerProps = {
  className?: string;
  size?: number;
  color?: string;
};

export const Spinner = ({
  size = 64,
  color = "text-zinc-500",
  className,
}: SpinnerProps) => {
  return (
    <div className={cn(`flex items-center justify-center`, className)}>
      <div
        className={`animate-spin rounded-full border-t-2 border-r-2 border-b-2 border-l-4 ${color}`}
        style={{
          width: size,
          height: size,
          borderTopColor: "transparent",
          borderRightColor: "transparent",
          borderBottomColor: "transparent",
        }}
      ></div>
    </div>
  );
};
