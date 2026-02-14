import Link from "next/link"
import { cn } from "@/lib/utils"
import type { ToolInfo } from "@/types/tools"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface ToolCardProps {
  readonly tool: ToolInfo
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <div className={cn(
      "group rounded-xl border-2 bg-card p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-2",
      tool.id === "cursor" && "border-cyan-200 hover:border-cyan-400 dark:border-cyan-800 dark:hover:border-cyan-600",
      tool.id === "claude-code" && "border-amber-200 hover:border-amber-400 dark:border-amber-800 dark:hover:border-amber-600",
      tool.id === "manus" && "border-violet-200 hover:border-violet-400 dark:border-violet-800 dark:hover:border-violet-600",
    )}>
      <div className="mb-4">
        <div className={cn(
          "inline-flex items-center justify-center rounded-lg px-3 py-1 text-xs font-medium mb-3",
          tool.id === "cursor" && "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
          tool.id === "claude-code" && "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
          tool.id === "manus" && "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
        )}>
          {tool.category}
        </div>
        <h3 className="text-2xl font-bold mb-1">{tool.name}</h3>
        <p className="text-sm text-muted-foreground">{tool.developer}</p>
      </div>

      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{tool.tagline}</p>

      <ul className="space-y-2 mb-6">
        {tool.highlights.map((highlight, index) => (
          <li key={index} className="flex items-start gap-2 text-sm">
            <span className={cn(
              "mt-1.5 h-1.5 w-1.5 rounded-full shrink-0",
              tool.id === "cursor" && "bg-cyan-500",
              tool.id === "claude-code" && "bg-amber-500",
              tool.id === "manus" && "bg-violet-500",
            )} />
            {highlight}
          </li>
        ))}
      </ul>

      <Link href={`/tools/${tool.id}`}>
        <Button variant="outline" className="w-full group-hover:bg-accent">
          詳しく見る
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  )
}
