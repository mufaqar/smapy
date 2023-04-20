import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: any;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, ...props }, ref) => {
    return (
      <input
        className={cn(
          "flex h-12 w-full rounded-md border border-slate-300 bg-transparent py-3 px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-0 text-slate-400 focus:text-black",
          { "border-red-300": error },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
