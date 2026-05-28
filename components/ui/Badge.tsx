import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline' | 'success' | 'warning' | 'danger' | 'accent'
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'bg-sage text-surface',
    accent: 'bg-accent text-text',
    outline: 'border border-sageDark text-sageDark',
    success: 'bg-sageDark/20 text-sageDark border border-sageDark/30',
    warning: 'bg-accent/40 text-text border border-accent/50',
    danger: 'bg-red-100 text-red-600 border border-red-200',
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 uppercase tracking-wider",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }
