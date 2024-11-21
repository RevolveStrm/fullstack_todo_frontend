"use client";
import React from "react";
import { Bounce, ToastContainer } from "react-toastify";

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ToastContainer
        transition={Bounce}
        hideProgressBar
        autoClose={3000}
        position="bottom-right"
        theme="dark"
      />
      {children}
    </>
  );
};
