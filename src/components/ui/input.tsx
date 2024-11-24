import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className="relative py-2 mb-2 w-full">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm transition-colors placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-950 dark:text-neutral-50 dark:placeholder:text-neutral-400",
            { "border-red-500 focus-visible:ring-red-500": error },
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="absolute left-0 bottom-[-1] w-full truncate text-sm text-red-500 text-right">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
