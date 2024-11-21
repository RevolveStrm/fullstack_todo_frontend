"use client";

import { motion } from "framer-motion";
import React from "react";

interface Props {
  className?: string;
  children: React.ReactNode;
  initialX?: number;
  initialY?: number;
  finalX?: number;
  finalY?: number;
  duration?: number;
  delay?: number;
}

export const Transition: React.FC<Props> = ({
  className,
  children,
  initialX = 0,
  initialY = 0,
  finalX = 0,
  finalY = 0,
  duration = 0.75,
  delay = 0,
}) => {
  return (
    <motion.div
      className={className}
      initial={{ x: initialX, y: initialY, opacity: 0 }}
      animate={{ x: finalX, y: finalY, opacity: 1 }}
      transition={{ ease: "easeInOut", duration, delay }}
    >
      {children}
    </motion.div>
  );
};
