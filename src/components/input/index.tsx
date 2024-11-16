import { cn } from '@/utils/cn';
import React from 'react';
import { Error } from './error';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode;
  error?: string;
};

const _Input = (
  { error, className, ...rest }: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) => {
  return (
    <div className={cn('flex flex-col items-center justify-center w-full', className)}>
      <div className="flex w-full items-center rounded-md border border-black/30 dark:border-gray-500 dark:bg-black px-2 py-2">
        <input
          ref={ref}
          className="ml-1 flex w-full items-center font-sans text-base outline-none dark:bg-black"
          {...rest}
        />
      </div>
      {error && <Error>{error}</Error>}
    </div>
  );
};

export const Input = React.forwardRef(_Input);
