import React from "react";

import { cn } from "utils/cn";

export const Button = ({ children, className, onClick }) => {
  return (
    <button
      className={cn("min-w-10 border bg-slate-400 p-2", className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
