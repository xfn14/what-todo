import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        red: "border-transparent bg-red-800/60 text-red-300",
        green: "border-transparent bg-green-800/60 text-green-300",
        blue: "border-transparent bg-blue-800/60 text-blue-300",
        purple: "border-transparent bg-purple-800/60 text-purple-300",
        yellow:
          "border-transparent bg-yellow-400/60 dark:text-yellow-200 text-yellow-600",
        redbg: "border-transparent bg-red-400/30 text-red-500",
        yellowbg:
          "border-transparent bg-yellow-400/30 dark:text-yellow-400 text-yellow-600",
        greenbg: "border-transparent bg-green-400/30 text-green-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
