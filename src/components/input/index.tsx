import React from "react";
import { Icon } from "../icon";
import { Error } from "./error";
import { cn } from "@/utils/cn";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: string;
  error?: string;
};

const _Input = (
  { icon, error, className, ...rest }: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) => {
  return (
    <div
      className={cn(
        "flex w-80 flex-col items-center justify-center",
        className,
      )}
    >
      <div className="flex w-80 items-center rounded-2xl border-2 border-friar-gray bg-white px-5 py-3">
        {icon && <Icon icon={`${icon}`} />}
        <input
          ref={ref}
          className="ml-3 flex w-full items-center font-sans text-base text-black caret-black outline-none placeholder:text-friar-gray"
          {...rest}
        />
      </div>
      {error && <Error>{error}</Error>}
    </div>
  );
};

export const Input = React.forwardRef(_Input);
