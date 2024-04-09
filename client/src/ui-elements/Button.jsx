import React from "react";

import { cn } from "utils/cn";

export const Button = ({ children, className, onClick }) => {
  return (
    <button className={cn("", className)} onClick={onClick}>
      {children}
    </button>
  );
};
