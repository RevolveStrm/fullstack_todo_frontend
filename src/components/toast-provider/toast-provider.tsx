'use client';

import { ToastContext } from '@/components/toast-provider/context/toast-context';
import { showToast } from '@/components/toast-provider/helpers/show-toast';
import React from 'react';
import { Bounce, ToastContainer } from 'react-toastify';

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ToastContext.Provider value={{ showToast }}>
      <ToastContainer
        transition={Bounce}
        hideProgressBar
        autoClose={3000}
        position="bottom-right"
        theme="dark"
      />
      {children}
    </ToastContext.Provider>
  );
};
