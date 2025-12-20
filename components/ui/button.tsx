import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-bold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[3px] focus-visible:ring-[#FF6B9D]/30",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[#FF6B9D] to-[#B47EFF] text-white shadow-lg shadow-[#FF6B9D]/25 hover:shadow-[#FF6B9D]/40 hover:scale-105 active:scale-95",
        destructive:
          "bg-gradient-to-r from-[#FF6B6B] to-[#FF6B9D] text-white shadow-lg shadow-[#FF6B6B]/25 hover:shadow-[#FF6B6B]/40 hover:scale-105 active:scale-95",
        outline:
          "border-2 border-[#B47EFF]/30 bg-transparent text-white hover:bg-[#B47EFF]/10 hover:border-[#B47EFF]/50",
        secondary:
          "bg-[#252542] text-white border-2 border-[#B47EFF]/20 hover:bg-[#B47EFF]/10 hover:border-[#B47EFF]/30",
        ghost:
          "text-white hover:bg-[#B47EFF]/10 hover:text-[#FF6B9D]",
        link: 
          "text-[#FF6B9D] underline-offset-4 hover:underline hover:text-[#B47EFF]",
        // Playful color variants
        pink:
          "bg-gradient-to-r from-[#FF6B9D] to-[#FF8CB5] text-white shadow-lg shadow-[#FF6B9D]/25 hover:shadow-[#FF6B9D]/40 hover:scale-105 active:scale-95",
        blue:
          "bg-gradient-to-r from-[#4ECDC4] to-[#6EEAE2] text-white shadow-lg shadow-[#4ECDC4]/25 hover:shadow-[#4ECDC4]/40 hover:scale-105 active:scale-95",
        yellow:
          "bg-gradient-to-r from-[#FFE66D] to-[#FFF099] text-[#1A1A2E] shadow-lg shadow-[#FFE66D]/25 hover:shadow-[#FFE66D]/40 hover:scale-105 active:scale-95",
        green:
          "bg-gradient-to-r from-[#95E879] to-[#ABED95] text-[#1A1A2E] shadow-lg shadow-[#95E879]/25 hover:shadow-[#95E879]/40 hover:scale-105 active:scale-95",
        purple:
          "bg-gradient-to-r from-[#B47EFF] to-[#C99AFF] text-white shadow-lg shadow-[#B47EFF]/25 hover:shadow-[#B47EFF]/40 hover:scale-105 active:scale-95",
        orange:
          "bg-gradient-to-r from-[#FF8C69] to-[#FFB8A3] text-white shadow-lg shadow-[#FF8C69]/25 hover:shadow-[#FF8C69]/40 hover:scale-105 active:scale-95",
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
