import * as React from "react";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center button_padding justify-center max-w-[240px] py-8 flex justify-center items-center w-full rounded-md text-sm font-medium transition-colors focus:outline-none active:scale-95 disabled:pointer-events-none disabled:opacity-50 ",
  {
    variants: {
      variant: {
        primary:
          "rounded-[18px] bg-gradient-to-r from-[rgba(254,5,85,1)] to-[rgba(255,135,0,1)] text-base text-white hover:bg-gradient-to-r hover:to-[#db6c06] hover:from-[#cc0d41]",
        primary_outline:
          "rounded-[18px] border text-black border-[rgba(254,5,85,1)] hover:border-none text-slate-900 hover:text-white hover:bg-gradient-to-r hover:to-[#db6c06] hover:from-[#cc0d41]",
        secondary:
          "rounded-[18px] bg-gradient-to-r from-darkBlue to-lightBlue text-base text-white hover:bg-gradient-to-r hover:from-[#0d4867] hover:to-[#158b87]",
        default:
          " color-black cursor-pointer rounded-[18px] border border-[rgba(254,5,85,1)] focus:outline-none hover:border-transparent hover:bg-gradient-to-r hover:from-[rgba(254,5,85,1)] hover:to-[rgba(255,135,0,1)] active:scale-95",
        secondary_outline:
          "  border border-darkBlue text-black rounded-[18px] text-base hover:border-none hover:text-white hover:bg-gradient-to-r hover:from-[#0d4867] hover:to-[#158b87]",
        destructive:
          "bg-red-500 text-white  hover:bg-red-600 dark:hover:bg-red-600",
        alternate:
          "border border-slate-300 bg-transparent rounded-[18px] text-slate-500 hover:border-slate-700 hover:text-slate-700 dark:border-slate-700 dark:text-slate-100",
        subtle:
          "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-100",
        ghost:
          "bg-transparent hover:bg-slate-100 data-[state=open]:bg-transparent dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:data-[state=open]:bg-transparent",
        link: "bg-transparent text-slate-900 underline-offset-4 hover:bg-transparent hover:underline dark:bg-transparent dark:text-slate-100 dark:hover:bg-transparent",
      },
      size: {
        default: "h-12 py-2 px-14",
        sm: "h-9 rounded-md px-2",
        lg: "h-11 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  // TODO:TW need to implement
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, disabled, variant, size, isLoading, ...props }, ref) => {
    //TODO: isLoading
    return (
      <>
        <button
          type="button"
          className={cn(buttonVariants({ variant, size, className }))}
          disabled={disabled || isLoading}
          ref={ref}
          {...props}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            props.children
          )}
        </button>
      </>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
