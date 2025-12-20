import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-xl border-2 px-4 py-4 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*5)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-1 items-start [&>svg]:size-5 [&>svg]:translate-y-0.5 [&>svg]:text-current font-medium transition-all duration-300",
  {
    variants: {
      variant: {
        default: 
          "bg-[#4ECDC4]/10 border-[#4ECDC4]/30 text-[#4ECDC4] [&>svg]:text-[#4ECDC4]",
        destructive:
          "bg-[#FF6B9D]/10 border-[#FF6B9D]/30 text-[#FF6B9D] [&>svg]:text-[#FF6B9D]",
        success:
          "bg-[#95E879]/10 border-[#95E879]/30 text-[#95E879] [&>svg]:text-[#95E879]",
        warning:
          "bg-[#FFE66D]/10 border-[#FFE66D]/30 text-[#FFE66D] [&>svg]:text-[#FFE66D]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-bold tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "col-start-2 grid justify-items-start gap-1 text-sm opacity-90 [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
