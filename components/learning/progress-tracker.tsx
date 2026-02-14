"use client"

import { useState, useEffect } from "react"
import { CheckCircle2, Circle, Trophy } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface LearningItem {
  id: string
  title: string
  category: "setup" | "basics" | "intermediate" | "advanced"
}

const learningItems: LearningItem[] = [
  // セットアップ
  { id: "install-cursor", title: "Cursorをインストール", category: "setup" },
  { id: "install-claude-code", title: "Claude Codeをインストール", category: "setup" },
  { id: "api-key-setup", title: "API キーを設定", category: "setup" },

  // 基礎
  { id: "tab-completion", title: "Tab補完を試す", category: "basics" },
  { id: "first-chat", title: "Chatで質問する", category: "basics" },
  { id: "code-generation", title: "コード生成を体験", category: "basics" },
  { id: "glossary", title: "用語集を読む", category: "basics" },

  // 中級
  { id: "claude-md", title: "CLAUDE.mdを作成", category: "intermediate" },
  { id: "multi-file-edit", title: "複数ファイル編集", category: "intermediate" },
  { id: "tutorial-30min", title: "30分チュートリアル完了", category: "intermediate" },
  { id: "git-integration", title: "Gitワークフロー確立", category: "intermediate" },

  // 上級
  { id: "agent-teams", title: "Agent Teamsを使う", category: "advanced" },
  { id: "hooks", title: "Hooksを設定", category: "advanced" },
  { id: "mcp-plugin", title: "MCPプラグイン導入", category: "advanced" },
]

const STORAGE_KEY = "ai-tools-learning-progress"

export function ProgressTracker() {
  const [completed, setCompleted] = useState<Set<string>>(new Set())
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // LocalStorageから進捗を読み込み
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const data = JSON.parse(saved)
        setCompleted(new Set(data))
      } catch (e) {
        console.error("Failed to load progress:", e)
      }
    }
  }, [])

  useEffect(() => {
    if (!isClient) return
    // LocalStorageに進捗を保存
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(completed)))
  }, [completed, isClient])

  const toggleItem = (id: string) => {
    setCompleted((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const categoryProgress = (category: LearningItem["category"]) => {
    const items = learningItems.filter((item) => item.category === category)
    const completedCount = items.filter((item) => completed.has(item.id)).length
    return {
      completed: completedCount,
      total: items.length,
      percentage: Math.round((completedCount / items.length) * 100),
    }
  }

  const totalProgress = () => {
    return {
      completed: completed.size,
      total: learningItems.length,
      percentage: Math.round((completed.size / learningItems.length) * 100),
    }
  }

  const categoryConfig = {
    setup: { label: "セットアップ", color: "text-cyan-600 dark:text-cyan-400" },
    basics: { label: "基礎", color: "text-green-600 dark:text-green-400" },
    intermediate: { label: "中級", color: "text-amber-600 dark:text-amber-400" },
    advanced: { label: "上級", color: "text-violet-600 dark:text-violet-400" },
  }

  if (!isClient) {
    return null // SSR時は何も表示しない
  }

  const total = totalProgress()

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">学習進捗</CardTitle>
          {total.percentage === 100 && (
            <Trophy className="h-5 w-5 text-yellow-500" />
          )}
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">全体の進捗</span>
            <span className="font-semibold">
              {total.completed}/{total.total} ({total.percentage}%)
            </span>
          </div>
          <Progress value={total.percentage} className="h-2" />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {(["setup", "basics", "intermediate", "advanced"] as const).map((category) => {
          const items = learningItems.filter((item) => item.category === category)
          const progress = categoryProgress(category)
          const config = categoryConfig[category]

          return (
            <div key={category}>
              <div className="flex items-center justify-between mb-3">
                <h4 className={cn("font-semibold text-sm", config.color)}>
                  {config.label}
                </h4>
                <span className="text-xs text-muted-foreground">
                  {progress.completed}/{progress.total}
                </span>
              </div>

              <div className="space-y-2">
                {items.map((item) => {
                  const isCompleted = completed.has(item.id)
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left",
                        "hover:bg-muted focus:bg-muted focus:outline-none",
                        isCompleted && "bg-muted/50"
                      )}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                      ) : (
                        <Circle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      )}
                      <span
                        className={cn(
                          "text-sm",
                          isCompleted
                            ? "text-muted-foreground line-through"
                            : "text-foreground"
                        )}
                      >
                        {item.title}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
