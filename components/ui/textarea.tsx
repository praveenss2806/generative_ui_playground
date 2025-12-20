import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "bg-[#252542] border-2 border-[#B47EFF]/20 placeholder:text-[#A0A0C0]/50 text-white flex field-sizing-content min-h-24 w-full rounded-xl px-4 py-3 text-base shadow-sm transition-all duration-300 outline-none md:text-sm",
        "focus:border-[#FF6B9D] focus:ring-4 focus:ring-[#FF6B9D]/20",
        "hover:border-[#B47EFF]/40",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
