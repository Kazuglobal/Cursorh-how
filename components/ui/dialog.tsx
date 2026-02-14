import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: ReactNode
}

export function Dialog({ open = false, onOpenChange, children }: DialogProps) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50"
      onClick={() => onOpenChange?.(false)}
    >
      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] sm:w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

export function DialogContent({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'rounded-lg border border-border bg-card p-6 shadow-lg',
        className
      )}
    >
      {children}
    </div>
  )
}

export function DialogHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mb-4", className)}>{children}</div>
}

export function DialogTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h2 className={cn("text-lg font-semibold", className)}>{children}</h2>
}
