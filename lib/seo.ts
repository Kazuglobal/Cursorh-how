import type { Metadata } from "next"

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  path?: string
  ogImage?: string
  noindex?: boolean
}

export function generateSEO({
  title,
  description,
  keywords = [],
  path = "/",
  ogImage = "/og-image.png",
  noindex = false,
}: SEOProps = {}): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://ai-coding-tools-guide.vercel.app"
  const fullTitle = title
    ? `${title} | AI Coding Tools ガイド`
    : "AI Coding Tools ガイド - Cursor、Claude Code、Manus AI完全比較"

  const defaultDescription =
    "Cursor、Claude Code、Manus AIの機能・料金・使い方を徹底比較。初心者向けチュートリアル、実践的なワークフロー、コスト最適化ガイドで、あなたに最適なAIコーディングツールを見つけましょう。"

  const defaultKeywords = [
    "AI コーディング",
    "Cursor",
    "Claude Code",
    "Manus AI",
    "AI プログラミング",
    "コード補完",
    "AI 開発ツール",
    "プログラミング効率化",
    "Next.js",
    "React",
    "TypeScript",
  ]

  const allKeywords = [...defaultKeywords, ...keywords]

  return {
    title: fullTitle,
    description: description || defaultDescription,
    keywords: allKeywords,
    authors: [{ name: "AI Coding Tools ガイド" }],
    creator: "AI Coding Tools ガイド",
    publisher: "AI Coding Tools ガイド",
    robots: noindex ? "noindex, nofollow" : "index, follow",
    alternates: {
      canonical: `${baseUrl}${path}`,
    },
    openGraph: {
      type: "website",
      locale: "ja_JP",
      url: `${baseUrl}${path}`,
      title: fullTitle,
      description: description || defaultDescription,
      siteName: "AI Coding Tools ガイド",
      images: [
        {
          url: `${baseUrl}${ogImage}`,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: description || defaultDescription,
      images: [`${baseUrl}${ogImage}`],
      creator: "@ai_coding_tools",
    },
    viewport: {
      width: "device-width",
      initialScale: 1,
      maximumScale: 5,
    },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [
        { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    manifest: "/manifest.json",
    metadataBase: new URL(baseUrl),
  }
}

// よく使うページのSEO設定プリセット
export const seoPresets = {
  home: generateSEO({
    description:
      "Cursor、Claude Code、Manus AIを徹底比較。機能・料金・使い方を詳しく解説。初心者から上級者まで、あなたに最適なAIコーディングツールを見つけましょう。",
    keywords: ["AI コーディングツール 比較", "プログラミング AI", "開発効率化"],
  }),

  cursor: generateSEO({
    title: "Cursor - VSCode派のためのAIエディタ",
    description:
      "CursorはVSCodeベースのAIコーディングエディタ。Tab補完、Chat、Composerなどの強力な機能で開発を効率化。インストールから使い方まで詳しく解説。",
    keywords: ["Cursor", "VSCode", "AI エディタ", "Tab補完"],
    path: "/tools/cursor",
  }),

  claudeCode: generateSEO({
    title: "Claude Code - Anthropic公式CLIツール",
    description:
      "Claude CodeはAnthropic公式のCLI型AIコーディングツール。Agent Teams、Hooks、MCPプラグインで高度な自動化を実現。セットアップから実践まで完全ガイド。",
    keywords: ["Claude Code", "Anthropic", "CLI", "Agent Teams", "自動化"],
    path: "/tools/claude-code",
  }),

  manus: generateSEO({
    title: "Manus AI - ノンコーダー向け自律型AIエージェント",
    description:
      "Manus AIは自律型AIエージェント。Web検索、データ分析、レポート生成を自動化。プログラミング初心者でも使える直感的なインターフェース。",
    keywords: ["Manus AI", "自律型AI", "ノンコーダー", "データ分析"],
    path: "/tools/manus",
  }),

  compare: generateSEO({
    title: "徹底比較 - Cursor vs Claude Code vs Manus AI",
    description:
      "3大AIコーディングツールを機能・料金・使いやすさで徹底比較。あなたの開発スタイルに最適なツールを診断クイズで見つけましょう。",
    keywords: ["AI ツール比較", "Cursor vs Claude Code", "料金比較"],
    path: "/compare",
  }),

  gettingStarted: generateSEO({
    title: "はじめに - AIコーディングツール選び方ガイド",
    description:
      "AIコーディングツールの選び方を初心者向けに解説。用語集、前提知識チェック、学習ロードマップで段階的にスキルアップ。",
    keywords: ["初心者向け", "学習ガイド", "ツール選び", "チュートリアル"],
    path: "/getting-started",
  }),

  tutorials: generateSEO({
    title: "実践チュートリアル - AIツールで開発スキルアップ",
    description:
      "Next.js認証、バグ修正、リファクタリングなど実践的なチュートリアル。AIツールを活用した効率的な開発ワークフローを習得。",
    keywords: ["チュートリアル", "実践", "Next.js", "バグ修正", "リファクタリング"],
    path: "/tutorials",
  }),

  security: generateSEO({
    title: "セキュリティガイド - AIツールの安全な使い方",
    description:
      "AIコーディングツールを安全に使うためのセキュリティベストプラクティス。API キー管理、機密情報の扱い、企業での導入方法を解説。",
    keywords: ["セキュリティ", "API キー", "機密情報", "企業導入"],
    path: "/security",
  }),

  costOptimization: generateSEO({
    title: "コスト最適化 - AIツールの料金を節約する方法",
    description:
      "AIコーディングツールのコストを最適化する実践的なテクニック。モデル選択、使用量削減、サブスクvs従量課金の比較を詳しく解説。",
    keywords: ["コスト最適化", "料金削減", "サブスクリプション", "従量課金"],
    path: "/cost-optimization",
  }),
} as const
