import { cn } from "@/lib/utils"
import { ImageIcon, Code, Terminal, Zap } from "lucide-react"

interface ImagePlaceholderProps {
  title?: string
  type?: "screenshot" | "diagram" | "chart" | "code"
  aspectRatio?: "16/9" | "4/3" | "1/1" | "21/9"
  className?: string
}

const typeConfig = {
  screenshot: {
    icon: ImageIcon,
    gradient: "from-cyan-500/20 via-blue-500/20 to-violet-500/20",
    label: "スクリーンショット",
  },
  diagram: {
    icon: Code,
    gradient: "from-green-500/20 via-emerald-500/20 to-teal-500/20",
    label: "図解",
  },
  chart: {
    icon: Zap,
    gradient: "from-amber-500/20 via-orange-500/20 to-red-500/20",
    label: "チャート",
  },
  code: {
    icon: Terminal,
    gradient: "from-violet-500/20 via-purple-500/20 to-pink-500/20",
    label: "コード例",
  },
}

const aspectRatioMap = {
  "16/9": "aspect-video",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
  "21/9": "aspect-[21/9]",
}

export function ImagePlaceholder({
  title = "画像は近日公開",
  type = "screenshot",
  aspectRatio = "16/9",
  className,
}: ImagePlaceholderProps) {
  const config = typeConfig[type]
  const Icon = config.icon

  return (
    <div
      className={cn(
        "relative rounded-lg border-2 border-dashed border-border overflow-hidden",
        "bg-gradient-to-br",
        config.gradient,
        aspectRatioMap[aspectRatio],
        className
      )}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
        <div className="rounded-full bg-background/80 backdrop-blur-sm p-4">
          <Icon className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-foreground mb-1">{title}</p>
          <p className="text-xs text-muted-foreground">{config.label}</p>
        </div>
      </div>

      {/* 装飾的なグリッド */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
    </div>
  )
}

// グリッドパターン用のCSS（globals.cssに追加）
// .bg-grid-pattern {
//   background-image: linear-gradient(to right, currentColor 1px, transparent 1px),
//                     linear-gradient(to bottom, currentColor 1px, transparent 1px);
//   background-size: 20px 20px;
// }
