import { cn } from "@/lib/utils"
import { Info, AlertTriangle, Lightbulb, AlertCircle, CheckCircle } from "lucide-react"
import type { CalloutType } from "@/types/tools"
import type { ReactNode } from "react"

interface CalloutProps {
  readonly type: CalloutType
  readonly title?: string
  readonly children: ReactNode
}

const calloutConfig: Record<CalloutType, {
  readonly icon: ReactNode
  readonly label: string
  readonly className: string
}> = {
  info: {
    icon: <Info className="h-5 w-5" />,
    label: "情報",
    className: "border-blue-500 bg-blue-50 text-blue-900 dark:bg-blue-950/30 dark:text-blue-200 dark:border-blue-400",
  },
  warning: {
    icon: <AlertTriangle className="h-5 w-5" />,
    label: "注意",
    className: "border-amber-500 bg-amber-50 text-amber-900 dark:bg-amber-950/30 dark:text-amber-200 dark:border-amber-400",
  },
  tip: {
    icon: <Lightbulb className="h-5 w-5" />,
    label: "ヒント",
    className: "border-green-500 bg-green-50 text-green-900 dark:bg-green-950/30 dark:text-green-200 dark:border-green-400",
  },
  danger: {
    icon: <AlertCircle className="h-5 w-5" />,
    label: "重要",
    className: "border-red-500 bg-red-50 text-red-900 dark:bg-red-950/30 dark:text-red-200 dark:border-red-400",
  },
  success: {
    icon: <CheckCircle className="h-5 w-5" />,
    label: "成功",
    className: "border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200 dark:border-emerald-400",
  },
}

export function Callout({ type, title, children }: CalloutProps) {
  const config = calloutConfig[type]

  return (
    <div className={cn("my-4 rounded-lg border-l-4 p-4", config.className)}>
      <div className="flex items-center gap-2 mb-2">
        {config.icon}
        <span className="font-semibold text-sm">{title ?? config.label}</span>
      </div>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  )
}
