"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Search, FileText, ArrowRight } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface SearchResult {
  title: string
  description: string
  href: string
  category: string
  keywords?: string[]
}

// 検索対象のコンテンツ（静的データ）
const searchableContent: SearchResult[] = [
  // ツールページ
  { title: "Cursor", description: "VSCodeベースのAIコーディングエディタ", href: "/tools/cursor", category: "ツール" },
  { title: "Claude Code", description: "Anthropic公式のCLI型AIコーディングツール", href: "/tools/claude-code", category: "ツール" },
  { title: "Manus AI", description: "自律型AIエージェント、ノンコーダー向け", href: "/tools/manus", category: "ツール" },

  // セットアップ
  { title: "Cursorセットアップ", description: "Cursorのインストールと初期設定", href: "/tools/cursor/setup", category: "セットアップ", keywords: ["インストール", "API", "認証"] },
  { title: "Claude Codeセットアップ", description: "Claude CodeのCLIインストール", href: "/tools/claude-code/setup", category: "セットアップ", keywords: ["npm", "CLI", "ターミナル"] },
  { title: "Manus AIセットアップ", description: "Manus AIアカウント作成とワークスペース設定", href: "/tools/manus/setup", category: "セットアップ" },

  // 機能
  { title: "Cursor機能詳細", description: "Tab補完、Chat、Composerなど", href: "/tools/cursor/features", category: "機能", keywords: ["Tab", "Composer", "インライン"] },
  { title: "Claude Code機能詳細", description: "Agent Teams、Hooks、MCPプラグイン", href: "/tools/claude-code/features", category: "機能", keywords: ["エージェント", "自動化", "MCP"] },
  { title: "Manus AI機能詳細", description: "Web検索、データ分析、レポート生成", href: "/tools/manus/features", category: "機能", keywords: ["リサーチ", "分析", "レポート"] },

  // はじめに
  { title: "ツール選択ガイド", description: "あなたに最適なAIツールを見つける", href: "/getting-started", category: "はじめに" },
  { title: "用語集", description: "AIコーディングツールの基本用語", href: "/getting-started/glossary", category: "はじめに", keywords: ["CLI", "IDE", "プロンプト", "API"] },
  { title: "前提知識チェック", description: "始める前に必要な知識を確認", href: "/getting-started/prerequisites", category: "はじめに", keywords: ["ターミナル", "Git", "環境変数"] },
  { title: "学習ロードマップ", description: "段階的に習得する5つのレベル", href: "/getting-started/roadmap", category: "はじめに", keywords: ["初心者", "学習パス", "ステップ"] },

  // チュートリアル
  { title: "30分チュートリアル", description: "TODOアプリを作りながら学ぶ", href: "/tutorials/first-30-minutes", category: "チュートリアル", keywords: ["React", "TODO", "初心者"] },

  // ユースケース
  { title: "Web開発", description: "Next.js、React、フロントエンド開発", href: "/usecases/web-development", category: "ユースケース", keywords: ["Next.js", "React", "フロントエンド"] },
  { title: "バックエンドAPI", description: "Express、データベース、認証", href: "/usecases/backend-api", category: "ユースケース", keywords: ["Express", "Prisma", "API"] },
  { title: "データ分析", description: "Python、Pandas、可視化", href: "/usecases/data-analysis", category: "ユースケース", keywords: ["Python", "Pandas", "分析"] },

  // その他
  { title: "ツール比較", description: "Cursor vs Claude Code vs Manus AI", href: "/compare", category: "比較", keywords: ["比較表", "料金", "機能"] },
  { title: "トラブルシューティング", description: "よくあるエラーと解決方法", href: "/troubleshooting", category: "サポート", keywords: ["エラー", "問題", "解決"] },
  { title: "セキュリティガイド", description: "API キー管理、機密情報の扱い", href: "/security", category: "セキュリティ", keywords: ["API キー", "認証", "セキュリティ"] },
  { title: "コスト最適化", description: "料金削減のテクニック", href: "/cost-optimization", category: "コスト", keywords: ["料金", "節約", "モデル選択"] },
]

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)

  // 簡易検索ロジック（FlexSearchの代わりに正規表現を使用）
  const search = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    const lowerQuery = searchQuery.toLowerCase()
    const filtered = searchableContent.filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(lowerQuery)
      const descMatch = item.description.toLowerCase().includes(lowerQuery)
      const categoryMatch = item.category.toLowerCase().includes(lowerQuery)
      const keywordMatch = item.keywords?.some((kw) =>
        kw.toLowerCase().includes(lowerQuery)
      )
      return titleMatch || descMatch || categoryMatch || keywordMatch
    })

    // 関連性でソート（タイトル一致を優先）
    const sorted = filtered.sort((a, b) => {
      const aTitle = a.title.toLowerCase().includes(lowerQuery)
      const bTitle = b.title.toLowerCase().includes(lowerQuery)
      if (aTitle && !bTitle) return -1
      if (!aTitle && bTitle) return 1
      return 0
    })

    setResults(sorted.slice(0, 8)) // 最大8件
  }, [])

  useEffect(() => {
    search(query)
    setSelectedIndex(0)
  }, [query, search])

  const handleSelect = (href: string) => {
    router.push(href)
    onOpenChange(false)
    setQuery("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => Math.max(prev - 1, 0))
    } else if (e.key === "Enter" && results[selectedIndex]) {
      e.preventDefault()
      handleSelect(results[selectedIndex].href)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0">
        <DialogHeader className="px-4 pt-4 pb-0">
          <DialogTitle className="sr-only">サイト内検索</DialogTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="ページを検索... (Cursor, セットアップ, エラーなど)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-10 border-0 focus-visible:ring-0 text-base"
              autoFocus
            />
          </div>
        </DialogHeader>

        <div className="max-h-96 overflow-y-auto px-2 py-2">
          {query && results.length === 0 && (
            <div className="py-8 text-center text-sm text-muted-foreground">
              「{query}」に一致する結果が見つかりませんでした
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-1">
              {results.map((result, index) => (
                <button
                  key={result.href}
                  onClick={() => handleSelect(result.href)}
                  className={cn(
                    "w-full text-left px-3 py-2.5 rounded-lg transition-colors",
                    "hover:bg-muted focus:bg-muted focus:outline-none",
                    index === selectedIndex && "bg-muted"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm truncate">
                          {result.title}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary flex-shrink-0">
                          {result.category}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {result.description}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {!query && (
          <div className="border-t px-4 py-3 text-xs text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>矢印キーで移動、Enterで選択</span>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 rounded bg-muted">↑</kbd>
                <kbd className="px-2 py-1 rounded bg-muted">↓</kbd>
                <kbd className="px-2 py-1 rounded bg-muted">Enter</kbd>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
