"use client"

import { cn } from "@/lib/utils"
import { useState, type ReactNode } from "react"

interface Tab {
  readonly id: string
  readonly label: string
  readonly content: ReactNode
}

interface TabsProps {
  readonly tabs: ReadonlyArray<Tab>
  readonly defaultTab?: string
  readonly className?: string
}

export function Tabs({ tabs, defaultTab, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab ?? tabs[0]?.id ?? "")

  const activeContent = tabs.find((tab) => tab.id === activeTab)?.content

  return (
    <div className={cn("w-full", className)}>
      <div className="flex border-b border-border" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors duration-150 border-b-2 -mb-px",
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4" role="tabpanel">
        {activeContent}
      </div>
    </div>
  )
}
