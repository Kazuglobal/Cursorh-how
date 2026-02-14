"use client"

import { cn } from "@/lib/utils"
import { comparisonCategories, supportLevelConfig } from "@/lib/comparison-data"
import { useState } from "react"

export function ComparisonTable() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const filteredCategories = selectedCategory === "all"
    ? comparisonCategories
    : comparisonCategories.filter((cat) => cat.id === selectedCategory)

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedCategory("all")}
          className={cn(
            "px-3 py-1.5 text-sm rounded-full transition-colors",
            selectedCategory === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
        >
          すべて
        </button>
        {comparisonCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={cn(
              "px-3 py-1.5 text-sm rounded-full transition-colors",
              selectedCategory === cat.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto -mx-4 sm:mx-0 rounded-lg border border-border">
        <table className="w-full text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="sticky left-0 bg-muted/50 px-2 sm:px-4 py-2 sm:py-3 text-left font-semibold min-w-[100px] sm:min-w-[180px]">
                機能
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-center font-semibold min-w-[80px] sm:min-w-[150px] text-cyan-600 dark:text-cyan-400">
                Cursor
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-center font-semibold min-w-[80px] sm:min-w-[150px] text-amber-600 dark:text-amber-400">
                Claude Code
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-center font-semibold min-w-[80px] sm:min-w-[150px] text-violet-600 dark:text-violet-400">
                Manus AI
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((category) => (
              <>
                <tr key={`cat-${category.id}`} className="border-b border-border bg-muted/20">
                  <td colSpan={4} className="px-2 sm:px-4 py-2 font-semibold text-foreground">
                    {category.name}
                  </td>
                </tr>
                {category.features.map((feature) => (
                  <tr key={feature.id} className="border-b border-border hover:bg-muted/10">
                    <td className="sticky left-0 bg-background px-2 sm:px-4 py-2 sm:py-3 font-medium">
                      {feature.name}
                    </td>
                    {(["cursor", "claude-code", "manus"] as const).map((toolId) => {
                      const value = feature.values[toolId]
                      const config = supportLevelConfig[value.support]
                      return (
                        <td key={toolId} className="px-2 sm:px-4 py-2 sm:py-3 text-center">
                          <span className={cn(
                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                            config.className
                          )}>
                            {value.label}
                          </span>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
