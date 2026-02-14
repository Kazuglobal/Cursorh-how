export interface NavItem {
  readonly title: string
  readonly href: string
  readonly toolId?: string
  readonly children?: ReadonlyArray<NavItem>
  readonly badge?: string
}

export const mainNavigation: ReadonlyArray<NavItem> = [
  { title: "ホーム", href: "/" },
  {
    title: "Cursor",
    href: "/tools/cursor",
    toolId: "cursor",
    children: [
      { title: "概要", href: "/tools/cursor" },
      { title: "機能詳細", href: "/tools/cursor/features" },
      { title: "セットアップ", href: "/tools/cursor/setup" },
      { title: "ベストプラクティス", href: "/tools/cursor/tips" },
    ],
  },
  {
    title: "Claude Code",
    href: "/tools/claude-code",
    toolId: "claude-code",
    children: [
      { title: "概要", href: "/tools/claude-code" },
      { title: "機能詳細", href: "/tools/claude-code/features" },
      { title: "セットアップ", href: "/tools/claude-code/setup" },
      { title: "ベストプラクティス", href: "/tools/claude-code/tips" },
    ],
  },
  {
    title: "Manus AI",
    href: "/tools/manus",
    toolId: "manus",
    children: [
      { title: "概要", href: "/tools/manus" },
      { title: "機能詳細", href: "/tools/manus/features" },
      { title: "セットアップ", href: "/tools/manus/setup" },
      { title: "ベストプラクティス", href: "/tools/manus/tips" },
    ],
  },
  { title: "比較", href: "/compare" },
  {
    title: "はじめに",
    href: "/getting-started",
    badge: "おすすめ",
    children: [
      { title: "ツール選択ガイド", href: "/getting-started" },
      { title: "用語集", href: "/getting-started/glossary" },
      { title: "前提知識チェック", href: "/getting-started/prerequisites" },
      { title: "学習ロードマップ", href: "/getting-started/roadmap" },
    ],
  },
  {
    title: "チュートリアル",
    href: "/tutorials/first-30-minutes",
    children: [
      { title: "30分でTODOアプリ", href: "/tutorials/first-30-minutes" },
    ],
  },
  { title: "トラブルシューティング", href: "/troubleshooting" },
  {
    title: "ユースケース",
    href: "/usecases/web-development",
    children: [
      { title: "Web開発", href: "/usecases/web-development" },
      { title: "バックエンドAPI", href: "/usecases/backend-api" },
      { title: "データ分析", href: "/usecases/data-analysis" },
    ],
  },
  { title: "セキュリティ", href: "/security" },
  { title: "コスト最適化", href: "/cost-optimization" },
]

export const footerNavigation = {
  tools: [
    { title: "Cursor", href: "/tools/cursor" },
    { title: "Claude Code", href: "/tools/claude-code" },
    { title: "Manus AI", href: "/tools/manus" },
  ],
  resources: [
    { title: "はじめに", href: "/getting-started" },
    { title: "用語集", href: "/getting-started/glossary" },
    { title: "学習ロードマップ", href: "/getting-started/roadmap" },
    { title: "30分チュートリアル", href: "/tutorials/first-30-minutes" },
    { title: "トラブルシューティング", href: "/troubleshooting" },
    { title: "ツール比較", href: "/compare" },
    { title: "セキュリティガイド", href: "/security" },
    { title: "コスト最適化", href: "/cost-optimization" },
    { title: "Web開発", href: "/usecases/web-development" },
    { title: "バックエンドAPI", href: "/usecases/backend-api" },
    { title: "データ分析", href: "/usecases/data-analysis" },
  ],
  external: [
    { title: "Cursor 公式", href: "https://www.cursor.com/" },
    { title: "Claude Code 公式", href: "https://docs.anthropic.com/en/docs/claude-code/overview" },
    { title: "Manus AI 公式", href: "https://manus.im" },
  ],
  community: [
    { title: "GitHub Discussions", href: "https://github.com/topics/ai-coding-tools" },
    { title: "Stack Overflow", href: "https://stackoverflow.com/questions/tagged/cursor+or+claude-code" },
    { title: "Reddit Community", href: "https://www.reddit.com/r/AICodingTools/" },
    { title: "Discord Server", href: "https://discord.gg/ai-coding" },
  ],
} as const
