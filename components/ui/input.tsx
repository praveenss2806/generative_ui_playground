import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-white placeholder:text-[#A0A0C0]/50 selection:bg-[#FF6B9D]/30 selection:text-white bg-[#252542] border-2 border-[#B47EFF]/20 h-10 w-full min-w-0 rounded-xl px-4 py-2 text-base text-white shadow-sm transition-all duration-300 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus:border-[#FF6B9D] focus:ring-4 focus:ring-[#FF6B9D]/20",
        "hover:border-[#B47EFF]/40",
        className
      )}
      {...props}
    />
  )
}

export { Input }
