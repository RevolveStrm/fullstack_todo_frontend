import { cn } from '@/lib/utils';
import React from 'react';

type Props = {
  className?: string;
  children: React.ReactNode;
};

export const Container = ({ children, className }: Props) => {
  return (
    <div className={cn('max-w-[1024px] mx-auto flex flex-col justify-between', className)}>
      {children}
    </div>
  );
};
