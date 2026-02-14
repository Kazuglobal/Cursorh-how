import Link from "next/link"
import { ArrowRight, BookOpen, Code, Rocket, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface NextStep {
  title: string
  description: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  difficulty?: "beginner" | "intermediate" | "advanced"
}

interface NextStepsProps {
  steps: NextStep[]
  title?: string
  description?: string
  className?: string
}

const difficultyConfig = {
  beginner: {
    label: "初級",
    color: "text-green-600 dark:text-green-400",
    bg: "bg-green-50 dark:bg-green-900/60",
  },
  intermediate: {
    label: "中級",
    color: "text-yellow-600 dark:text-yellow-300",
    bg: "bg-yellow-50 dark:bg-yellow-900/60",
  },
  advanced: {
    label: "上級",
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-900/60",
  },
}

export function NextSteps({
  steps,
  title = "次のステップ",
  description = "以下のガイドで学習を続けましょう",
  className,
}: NextStepsProps) {
  return (
    <div className={cn("not-prose my-12 rounded-lg border bg-card p-6", className)}>
      <div className="mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2 mb-2">
          <Rocket className="h-5 w-5 text-primary" />
          {title}
        </h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {steps.map((step) => {
          const Icon = step.icon
          const difficultyStyle = step.difficulty
            ? difficultyConfig[step.difficulty]
            : null

          return (
            <Link
              key={step.href}
              href={step.href}
              className={cn(
                "group relative flex gap-4 rounded-lg border p-4",
                "transition-all hover:border-primary hover:shadow-md",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              )}
            >
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">
                    {step.title}
                  </h4>
                  {difficultyStyle && (
                    <span
                      className={cn(
                        "text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0",
                        difficultyStyle.bg,
                        difficultyStyle.color
                      )}
                    >
                      {difficultyStyle.label}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {step.description}
                </p>

                <div className="mt-2 flex items-center gap-1 text-xs font-medium text-primary">
                  続きを読む
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

// 便利なプリセット
export const commonNextSteps = {
  afterSetup: [
    {
      title: "基本機能を試す",
      description: "コード補完、Chat、Composerの使い方を学びましょう",
      href: "/getting-started/first-steps",
      icon: Zap,
      difficulty: "beginner" as const,
    },
    {
      title: "30分チュートリアル",
      description: "実際にTODOアプリを作りながらAIツールの使い方を習得",
      href: "/tutorials/first-30-minutes",
      icon: Code,
      difficulty: "beginner" as const,
    },
    {
      title: "ベストプラクティス",
      description: "効果的なプロンプトの書き方とワークフローのコツ",
      href: "/best-practices",
      icon: BookOpen,
      difficulty: "intermediate" as const,
    },
  ],

  afterTutorial: [
    {
      title: "実践ワークフロー",
      description: "Next.js認証機能の実装など、実際のプロジェクトでの活用例",
      href: "/workflows/nextjs-auth",
      icon: Code,
      difficulty: "intermediate" as const,
    },
    {
      title: "高度な機能",
      description: "Agent Teams、Hooks、MCPプラグインの活用法",
      href: "/advanced-features",
      icon: Rocket,
      difficulty: "advanced" as const,
    },
  ],
}
