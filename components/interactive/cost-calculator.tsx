"use client"

import { useState } from "react"
import { DollarSign, TrendingDown, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

interface ToolCost {
  name: string
  color: string
  calculate: (usage: UsageProfile) => number
  plan: string
}

interface UsageProfile {
  codeCompletionsPerDay: number
  chatRequestsPerDay: number
  largeEditsPerWeek: number
}

const tools: ToolCost[] = [
  {
    name: "Cursor",
    color: "cyan",
    plan: "Pro ($20/月)",
    calculate: () => 20, // 固定料金
  },
  {
    name: "Claude Code",
    color: "amber",
    plan: "従量課金",
    calculate: (usage) => {
      // 簡易計算: 補完 $0.01, Chat $0.03, 大規模編集 $0.50
      const completionCost = (usage.codeCompletionsPerDay * 30 * 0.01)
      const chatCost = (usage.chatRequestsPerDay * 30 * 0.03)
      const editCost = (usage.largeEditsPerWeek * 4 * 0.50)
      return completionCost + chatCost + editCost
    },
  },
  {
    name: "Manus AI",
    color: "violet",
    plan: "Basic ($39/月)",
    calculate: (usage) => {
      // 軽度使用: $39, 中度以上: $99
      const totalRequests = usage.chatRequestsPerDay * 30 + usage.largeEditsPerWeek * 4
      return totalRequests > 200 ? 99 : 39
    },
  },
]

export function CostCalculator() {
  const [usage, setUsage] = useState<UsageProfile>({
    codeCompletionsPerDay: 200,
    chatRequestsPerDay: 30,
    largeEditsPerWeek: 5,
  })

  const costs = tools.map((tool) => ({
    ...tool,
    cost: tool.calculate(usage),
  }))

  const minCost = Math.min(...costs.map((c) => c.cost))
  const maxCost = Math.max(...costs.map((c) => c.cost))

  const getBarWidth = (cost: number) => {
    if (maxCost === minCost) return 100
    return ((cost - minCost) / (maxCost - minCost)) * 60 + 40 // 40-100%
  }

  const colorMap = {
    cyan: {
      bg: "bg-cyan-500/10",
      bar: "bg-cyan-500",
      text: "text-cyan-700 dark:text-cyan-400",
      border: "border-cyan-500/30",
    },
    amber: {
      bg: "bg-amber-500/10",
      bar: "bg-amber-500",
      text: "text-amber-700 dark:text-amber-400",
      border: "border-amber-500/30",
    },
    violet: {
      bg: "bg-violet-500/10",
      bar: "bg-violet-500",
      text: "text-violet-700 dark:text-violet-400",
      border: "border-violet-500/30",
    },
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          <CardTitle>コスト計算機</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          使用量を調整して、3つのツールの月額コストを比較しましょう
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* スライダー */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium">
                コード補完回数/日
              </label>
              <span className="text-sm font-semibold tabular-nums">
                {usage.codeCompletionsPerDay}回
              </span>
            </div>
            <Slider
              value={[usage.codeCompletionsPerDay]}
              onValueChange={([value]) =>
                setUsage({ ...usage, codeCompletionsPerDay: value })
              }
              min={0}
              max={500}
              step={10}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Tab補完、インライン提案の利用回数
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium">
                Chat利用回数/日
              </label>
              <span className="text-sm font-semibold tabular-nums">
                {usage.chatRequestsPerDay}回
              </span>
            </div>
            <Slider
              value={[usage.chatRequestsPerDay]}
              onValueChange={([value]) =>
                setUsage({ ...usage, chatRequestsPerDay: value })
              }
              min={0}
              max={100}
              step={5}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground mt-1">
              チャットで質問・コード生成を依頼する回数
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium">
                大規模編集回数/週
              </label>
              <span className="text-sm font-semibold tabular-nums">
                {usage.largeEditsPerWeek}回
              </span>
            </div>
            <Slider
              value={[usage.largeEditsPerWeek]}
              onValueChange={([value]) =>
                setUsage({ ...usage, largeEditsPerWeek: value })
              }
              min={0}
              max={50}
              step={1}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Composer、複数ファイル編集、リファクタリングの回数
            </p>
          </div>
        </div>

        {/* 結果表示 */}
        <div className="space-y-3 pt-4 border-t">
          <h4 className="text-sm font-semibold mb-4">月額コスト比較</h4>

          {costs.map((tool) => {
            const colors = colorMap[tool.color as keyof typeof colorMap]
            const isMin = tool.cost === minCost

            return (
              <div
                key={tool.name}
                className={cn(
                  "relative rounded-lg border-2 p-4 transition-all",
                  colors.bg,
                  colors.border,
                  isMin && "ring-2 ring-green-500 ring-offset-2 ring-offset-background"
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className={cn("font-semibold", colors.text)}>
                        {tool.name}
                      </h5>
                      {isMin && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-green-500/10 text-green-700 dark:text-green-400">
                          <TrendingDown className="h-3 w-3" />
                          最安値
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {tool.plan}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={cn("text-2xl font-bold tabular-nums", colors.text)}>
                      ${tool.cost.toFixed(0)}
                    </div>
                    <div className="text-xs text-muted-foreground">/月</div>
                  </div>
                </div>

                {/* バーグラフ */}
                <div className="relative h-2 bg-background/50 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "absolute inset-y-0 left-0 rounded-full transition-all duration-500",
                      colors.bar
                    )}
                    style={{ width: `${getBarWidth(tool.cost)}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* サマリー */}
        <div className="rounded-lg bg-muted p-4 space-y-2">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="text-sm text-muted-foreground space-y-1">
              <p>
                <strong>Cursor:</strong> 固定料金なので使い放題。ヘビーユーザー向け。
              </p>
              <p>
                <strong>Claude Code:</strong> 従量課金。軽度使用なら最安。月$20未満なら検討。
              </p>
              <p>
                <strong>Manus AI:</strong> リサーチ機能が強力。コーディング以外にも活用。
              </p>
            </div>
          </div>
        </div>

        {/* 年間コスト */}
        <div className="pt-4 border-t">
          <h5 className="text-sm font-semibold mb-3">年間コスト試算</h5>
          <div className="grid grid-cols-3 gap-3">
            {costs.map((tool) => {
              const colors = colorMap[tool.color as keyof typeof colorMap]
              const yearlyCost = tool.cost * 12

              return (
                <div key={tool.name} className="text-center">
                  <div className={cn("text-xs font-medium mb-1", colors.text)}>
                    {tool.name}
                  </div>
                  <div className={cn("text-lg font-bold tabular-nums", colors.text)}>
                    ${yearlyCost.toFixed(0)}
                  </div>
                  <div className="text-xs text-muted-foreground">/年</div>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
