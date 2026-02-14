"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Copy, Check } from "lucide-react"

interface CodeBlockProps {
  readonly code: string
  readonly language?: string
  readonly title?: string
  readonly showLineNumbers?: boolean
}

export function CodeBlock({ code, language = "text", title, showLineNumbers = false }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API may not be available
    }
  }

  const lines = code.split("\n")

  return (
    <div className="rounded-lg border border-border overflow-hidden my-4">
      {title && (
        <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2">
          <span className="text-xs font-medium text-muted-foreground">{title}</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{language}</span>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              aria-label="コードをコピー"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "コピーしました" : "コピー"}
            </button>
          </div>
        </div>
      )}
      {!title && (
        <div className="flex items-center justify-end border-b border-border bg-muted/50 px-4 py-1.5">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            aria-label="コードをコピー"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        </div>
      )}
      <div className="overflow-x-auto bg-muted/20 p-2 sm:p-4">
        <pre className="text-xs sm:text-sm leading-relaxed">
          <code className={cn("font-mono", `language-${language}`)}>
            {showLineNumbers
              ? lines.map((line, i) => (
                  <div key={i} className="flex">
                    <span className="select-none text-muted-foreground/50 w-8 text-right mr-4 shrink-0">
                      {i + 1}
                    </span>
                    <span>{line}</span>
                  </div>
                ))
              : code}
          </code>
        </pre>
      </div>
    </div>
  )
}
