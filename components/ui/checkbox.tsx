"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer bg-[#252542] border-2 border-[#B47EFF]/30 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#FF6B9D] data-[state=checked]:to-[#B47EFF] data-[state=checked]:border-transparent data-[state=checked]:text-white size-5 shrink-0 rounded-md shadow-sm transition-all duration-300 outline-none",
        "focus-visible:ring-4 focus-visible:ring-[#FF6B9D]/20",
        "hover:border-[#B47EFF]/50",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
      >
        <CheckIcon className="size-3.5 stroke-[3]" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
