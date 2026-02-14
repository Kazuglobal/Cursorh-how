import type { ToolId, SupportLevel } from "@/types/tools"

export interface ComparisonCategory {
  readonly id: string
  readonly name: string
  readonly features: ReadonlyArray<ComparisonFeature>
}

export interface ComparisonFeature {
  readonly id: string
  readonly name: string
  readonly values: Readonly<Record<ToolId, ComparisonValue>>
}

export interface ComparisonValue {
  readonly support: SupportLevel
  readonly label: string
}

export const comparisonCategories: ReadonlyArray<ComparisonCategory> = [
  {
    id: "basic",
    name: "基本情報",
    features: [
      {
        id: "type",
        name: "ツール形式",
        values: {
          cursor: { support: "full", label: "IDE（GUIエディタ）" },
          "claude-code": { support: "full", label: "CLI + IDE拡張 + Web + モバイル" },
          manus: { support: "full", label: "Webアプリ" },
        },
      },
      {
        id: "approach",
        name: "操作方式",
        values: {
          cursor: { support: "full", label: "インタラクティブ型" },
          "claude-code": { support: "full", label: "エージェント型" },
          manus: { support: "full", label: "自律エージェント型" },
        },
      },
      {
        id: "platform",
        name: "対応プラットフォーム",
        values: {
          cursor: { support: "full", label: "デスクトップ（Win/Mac/Linux）" },
          "claude-code": { support: "full", label: "CLI / VSCode / JetBrains / Web / Mobile" },
          manus: { support: "full", label: "Webブラウザのみ" },
        },
      },
      {
        id: "target",
        name: "対象ユーザー",
        values: {
          cursor: { support: "full", label: "開発者（初心者〜上級者）" },
          "claude-code": { support: "full", label: "開発者（中級〜上級者）" },
          manus: { support: "full", label: "全ユーザー（非エンジニアも可）" },
        },
      },
    ],
  },
  {
    id: "code-features",
    name: "コーディング機能",
    features: [
      {
        id: "code-completion",
        name: "コード補完",
        values: {
          cursor: { support: "full", label: "Tab 補完（リアルタイム）" },
          "claude-code": { support: "none", label: "非対応" },
          manus: { support: "none", label: "非対応" },
        },
      },
      {
        id: "inline-edit",
        name: "インラインエディット",
        values: {
          cursor: { support: "full", label: "Cmd+K で対応" },
          "claude-code": { support: "full", label: "Edit ツールで対応" },
          manus: { support: "none", label: "非対応" },
        },
      },
      {
        id: "multi-file",
        name: "複数ファイル同時変更",
        values: {
          cursor: { support: "full", label: "Composer / Agent" },
          "claude-code": { support: "full", label: "標準機能" },
          manus: { support: "partial", label: "サンドボックス内で可能" },
        },
      },
      {
        id: "code-execution",
        name: "コード実行",
        values: {
          cursor: { support: "full", label: "Agent モードで可能" },
          "claude-code": { support: "full", label: "Bash ツールで直接実行" },
          manus: { support: "full", label: "サンドボックス内で実行" },
        },
      },
    ],
  },
  {
    id: "agent-features",
    name: "エージェント機能",
    features: [
      {
        id: "autonomous",
        name: "自律実行",
        values: {
          cursor: { support: "full", label: "Agent モード" },
          "claude-code": { support: "full", label: "標準動作" },
          manus: { support: "full", label: "標準動作" },
        },
      },
      {
        id: "browser-control",
        name: "ブラウザ操作",
        values: {
          cursor: { support: "none", label: "非対応" },
          "claude-code": { support: "partial", label: "Chrome拡張 + MCP（Playwright）" },
          manus: { support: "full", label: "仮想ブラウザで直接操作" },
        },
      },
      {
        id: "shell-execution",
        name: "シェルコマンド実行",
        values: {
          cursor: { support: "full", label: "Agent モードで可能" },
          "claude-code": { support: "full", label: "Bash ツールで直接" },
          manus: { support: "partial", label: "サンドボックス内のみ" },
        },
      },
    ],
  },
  {
    id: "ecosystem",
    name: "エコシステム・拡張性",
    features: [
      {
        id: "git-integration",
        name: "Git 統合",
        values: {
          cursor: { support: "full", label: "完全統合（VSCode互換）" },
          "claude-code": { support: "full", label: "完全統合（CLI操作）" },
          manus: { support: "none", label: "限定的" },
        },
      },
      {
        id: "customization",
        name: "カスタマイズ",
        values: {
          cursor: { support: "full", label: ".cursorrules / 拡張機能" },
          "claude-code": { support: "full", label: "CLAUDE.md / Hooks / MCP" },
          manus: { support: "none", label: "限定的" },
        },
      },
      {
        id: "extensions",
        name: "拡張機能・プラグイン",
        values: {
          cursor: { support: "full", label: "VSCode Marketplace" },
          "claude-code": { support: "full", label: "MCP プラグインシステム" },
          manus: { support: "none", label: "なし" },
        },
      },
      {
        id: "spreadsheet",
        name: "スプレッドシート連携",
        values: {
          cursor: { support: "none", label: "非対応" },
          "claude-code": { support: "full", label: "Claude in Excel アドイン" },
          manus: { support: "partial", label: "ファイル処理で対応" },
        },
      },
      {
        id: "desktop-agent",
        name: "デスクトップエージェント",
        values: {
          cursor: { support: "none", label: "非対応" },
          "claude-code": { support: "full", label: "Claude Cowork" },
          manus: { support: "none", label: "非対応" },
        },
      },
      {
        id: "multi-agent",
        name: "マルチエージェント",
        values: {
          cursor: { support: "none", label: "非対応" },
          "claude-code": { support: "full", label: "Agent Teams（実験的）" },
          manus: { support: "none", label: "非対応" },
        },
      },
    ],
  },
  {
    id: "pricing",
    name: "料金",
    features: [
      {
        id: "free-plan",
        name: "無料プラン",
        values: {
          cursor: { support: "full", label: "あり（制限付き）" },
          "claude-code": { support: "partial", label: "なし（Pro $20/月〜）" },
          manus: { support: "partial", label: "初回クレジットのみ" },
        },
      },
      {
        id: "paid-plan",
        name: "有料プラン",
        values: {
          cursor: { support: "full", label: "$20/月〜" },
          "claude-code": { support: "full", label: "$20/月〜 または API従量課金" },
          manus: { support: "full", label: "$39/月〜" },
        },
      },
    ],
  },
]

export const supportLevelConfig: Record<SupportLevel, { readonly label: string; readonly className: string }> = {
  full: { label: "対応", className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
  partial: { label: "一部対応", className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" },
  none: { label: "非対応", className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" },
  "via-plugin": { label: "プラグイン経由", className: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200" },
}
