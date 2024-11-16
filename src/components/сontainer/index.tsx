import React, { ReactNode } from 'react';

interface Props {
  className?: string;
  children: ReactNode;
}

export const Container: React.FC<Props> = ({ className, children }) => {
  return (
    <div
      className={`
            max-w-screen-lg 
            mx-auto 
            px-4 
            sm:px-6 
            lg:px-8 
            ${className}
        `}
    >
      {children}
    </div>
  );
};
