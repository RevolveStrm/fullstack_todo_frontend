"use client"

import React from "react";
import { ToastContext } from "@/components/toast-provider/context/toast-context";
import { Bounce, ToastContainer } from "react-toastify";
import { showToast } from "@/components/toast-provider/helpers/show-toast";

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ToastContext.Provider value={{ showToast }}>
            <ToastContainer
                transition={Bounce}
                hideProgressBar
                autoClose={3000}
                position="bottom-right"
            />
            {children}
        </ToastContext.Provider>
    )
};