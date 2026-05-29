import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-outfit font-700 text-sm transition-all duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_5px_0_0_hsl(145_65%_32%)] active:shadow-none active:translate-y-[4px] hover:brightness-105",
        accent:
          "bg-accent text-accent-foreground shadow-[0_5px_0_0_hsl(38_92%_40%)] active:shadow-none active:translate-y-[4px] hover:brightness-105",
        secondary:
          "bg-secondary text-secondary-foreground shadow-[0_5px_0_0_hsl(210_15%_80%)] active:shadow-none active:translate-y-[4px] hover:bg-secondary/80",
        outline:
          "border-2 border-primary text-primary bg-transparent hover:bg-primary/8 active:scale-95",
        ghost:
          "text-foreground hover:bg-secondary active:scale-95",
        destructive:
          "bg-destructive text-destructive-foreground shadow-[0_5px_0_0_hsl(0_72%_40%)] active:shadow-none active:translate-y-[4px]",
        premium:
          "bg-gradient-to-r from-yellow-400 to-amber-500 text-white shadow-[0_5px_0_0_hsl(45_90%_35%)] active:shadow-none active:translate-y-[4px] hover:brightness-105",
      },
      size: {
        default: "h-12 px-8 py-3 text-base",
        sm: "h-9 px-5 text-sm",
        lg: "h-14 px-10 text-lg",
        icon: "h-10 w-10",
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
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
