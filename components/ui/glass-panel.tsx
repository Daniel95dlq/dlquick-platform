import React from "react"
import { cn } from "../../lib/utils"

type Props = React.HTMLAttributes<HTMLDivElement>

// A lightweight frosted glass panel: translucent, blurred, subtle border & shadow.
export default function GlassPanel({ className, children, ...rest }: Props) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.12)]",
        "supports-[backdrop-filter]:bg-white/7 supports-[backdrop-filter]:backdrop-blur-xl",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
