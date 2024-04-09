import React from "react";

import { cn } from "utils/cn";

export const PopupWrapper = ({ children, className }) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-lg bg-gray-300 p-2",
        className,
      )}
    >
      {children}
    </div>
  );
};
