import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary border border-primary/20",
        secondary: "bg-secondary text-secondary-foreground border border-border",
        outline: "border border-border text-foreground",
        green: "bg-green-100 text-green-700 border border-green-200",
        blue: "bg-blue-100 text-blue-700 border border-blue-200",
        purple: "bg-purple-100 text-purple-700 border border-purple-200",
        orange: "bg-orange-100 text-orange-700 border border-orange-200",
        gold: "bg-yellow-100 text-yellow-700 border border-yellow-200",
        streak: "bg-orange-100 text-orange-600 border border-orange-200",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
