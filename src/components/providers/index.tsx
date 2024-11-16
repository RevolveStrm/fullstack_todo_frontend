'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { PropsWithChildren } from 'react';
import { QueryProvider } from '../query-provider/query-provider';
import { ToastProvider } from '../toast-provider/toast-provider';

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <ToastProvider>
          <SessionProvider>{children}</SessionProvider>
        </ToastProvider>
      </ThemeProvider>
    </QueryProvider>
  );
};
