import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-primary to-purple-500 text-white shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
        destructive:
          "bg-gradient-to-r from-destructive to-primary text-white shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-muted hover:border-primary/50",
        secondary:
          "bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80",
        ghost:
          "text-foreground hover:bg-muted hover:text-primary",
        link: 
          "text-primary underline-offset-4 hover:underline",
        // Playful color variants
        pink:
          "bg-gradient-to-r from-primary to-pink-400 text-white shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
        blue:
          "bg-gradient-to-r from-accent to-cyan-400 text-white shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
        yellow:
          "bg-gradient-to-r from-yellow-400 to-yellow-500 text-foreground shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
        green:
          "bg-gradient-to-r from-green-400 to-green-500 text-white shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
        purple:
          "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
        orange:
          "bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
      },
      size: {
        default: "h-10 px-5 py-2 has-[>svg]:px-4",
        sm: "h-8 rounded-lg gap-1.5 px-3 has-[>svg]:px-2.5 text-xs",
        lg: "h-12 rounded-xl px-8 has-[>svg]:px-6 text-base",
        icon: "size-10 rounded-xl",
        "icon-sm": "size-8 rounded-lg",
        "icon-lg": "size-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
