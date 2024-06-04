"use client";
import ReactSelect, { Props } from "react-select";
import { selectClassnamesConfig, selectStylesConfig } from "./constants";
import React, { useEffect, useState } from "react";

const _Select = (
  props: Props<any, false, any>,
  ref: React.ForwardedRef<HTMLSelectElement>,
) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  return isMounted ? (
    <ReactSelect
      styles={selectStylesConfig}
      classNames={selectClassnamesConfig}
      {...props}
    />
  ) : null;
};

export const Select = React.forwardRef(_Select);
