import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  isLoading?: boolean
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, asChild, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const variants = {
      primary: 'bg-sageDark text-surface hover:bg-sageDark/90',
      secondary: 'bg-accent text-text hover:bg-accent/80',
      outline: 'border border-sageDark text-sageDark hover:bg-sageDark/10',
      ghost: 'hover:bg-sage/20 text-text',
      link: 'text-sageDark underline-offset-4 hover:underline',
    }

    const sizes = {
      sm: 'h-9 px-3 text-xs',
      md: 'h-10 px-4 py-2',
      lg: 'h-11 px-8 text-lg',
      icon: 'h-10 w-10',
    }

    return (
      <Comp
        className={cn(
          'inline-flex items-center justify-center rounded-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sageDark disabled:pointer-events-none disabled:opacity-50 uppercase tracking-widest active:scale-95',
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {asChild ? children : (
          <>
            {isLoading && (
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-surface border-t-transparent" />
            )}
            {children}
          </>
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button }
