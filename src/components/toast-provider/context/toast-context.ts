"use client"

import { createContext } from 'react';
import { ToastType } from "@/components/toast-provider/helpers/show-toast";

type ToastContextType = {
    showToast: (type: ToastType, message: string) => void;
};

export const ToastContext = createContext<ToastContextType>({
    showToast: () => {},
});