"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"

export function Breadcrumbs() {
  const pathname = usePathname()

  // パスを分割してセグメントを取得
  const segments = pathname.split("/").filter(Boolean)

  // ルートの場合はパンくずを表示しない
  if (segments.length === 0) {
    return null
  }

  // セグメントを日本語ラベルに変換
  const getLabel = (segment: string): string => {
    const labels: Record<string, string> = {
      "tools": "ツール",
      "cursor": "Cursor",
      "claude-code": "Claude Code",
      "manus": "Manus AI",
      "setup": "セットアップ",
      "features": "機能",
      "tips": "Tips",
      "pricing": "料金",
      "getting-started": "はじめに",
      "glossary": "用語集",
      "prerequisites": "前提知識",
      "roadmap": "学習ロードマップ",
      "tutorials": "チュートリアル",
      "first-30-minutes": "30分チュートリアル",
      "nextjs-auth": "Next.js認証",
      "bug-fix-workflow": "バグ修正",
      "refactoring": "リファクタリング",
      "comparison": "比較",
      "usecases": "ユースケース",
      "web-development": "Web開発",
      "data-analysis": "データ分析",
      "backend-api": "バックエンドAPI",
      "mobile-development": "モバイル開発",
      "data-science": "データサイエンス",
      "security": "セキュリティ",
      "cost-optimization": "コスト最適化",
      "troubleshooting": "トラブルシューティング",
      "best-practices": "ベストプラクティス",
      "workflows": "ワークフロー",
    }

    return labels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
  }

  // パンくずリンクを構築
  const breadcrumbs = segments.map((segment, index) => {
    const path = `/${segments.slice(0, index + 1).join("/")}`
    const label = getLabel(segment)
    const isLast = index === segments.length - 1

    return {
      label,
      path,
      isLast,
    }
  })

  return (
    <nav aria-label="パンくずナビゲーション" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
        {/* ホームリンク */}
        <li>
          <Link
            href="/"
            className="flex items-center hover:text-foreground transition-colors"
            aria-label="ホームに戻る"
          >
            <Home className="h-4 w-4" />
          </Link>
        </li>

        {breadcrumbs.map((crumb) => (
          <li key={crumb.path} className="flex items-center gap-2">
            <ChevronRight className="h-4 w-4 text-muted-foreground/50" aria-hidden="true" />
            {crumb.isLast ? (
              <span className="font-medium text-foreground" aria-current="page">
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.path}
                className="hover:text-foreground transition-colors"
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
