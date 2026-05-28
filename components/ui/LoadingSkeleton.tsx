import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-sm bg-accent/20", className)}
      {...props}
    >
        <div className="w-full h-full absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent" />
    </div>
  )
}

export function ProductCardSkeleton() {
    return (
        <div className="space-y-4">
            <Skeleton className="aspect-[3/4] relative overflow-hidden" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
            </div>
        </div>
    )
}
