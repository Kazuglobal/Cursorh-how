import type { Metadata } from "next"
import Link from "next/link"
import { getToolById, claudeCodeFeatures } from "@/lib/tools-data"
import { FeatureCard } from "@/components/content/feature-card"
import { Callout } from "@/components/content/callout"
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink } from "lucide-react"

export const metadata: Metadata = {
  title: "Claude Code - マルチプラットフォーム対応AIコーディングエージェント",
  description: "Claude CodeはAnthropicが開発したAIコーディングエージェント。CLI・VSCode・Web・JetBrains・モバイルで動作し、Chrome拡張・Excel連携・Coworkデスクトップエージェントなどの広範なエコシステムと連携します。",
}

export default function ClaudeCodeOverviewPage() {
  const tool = getToolById("claude-code")!

  return (
    <div className="space-y-10">
      <div>
        <div className="inline-flex items-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-3 py-1 text-sm font-medium mb-4">
          {tool.category}
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-3">{tool.name}</h1>
        <p className="text-lg text-muted-foreground">{tool.description}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">開発元</p>
          <p className="font-semibold">{tool.developer}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">対応プラットフォーム</p>
          <p className="font-semibold">CLI / VSCode / Web / JetBrains / Mobile</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">対応OS</p>
          <p className="font-semibold">Windows / macOS / Linux / Web</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">料金</p>
          <p className="font-semibold">API従量課金 / Pro $20/月〜</p>
        </div>
      </div>

      <Callout type="info" title="CLIだけじゃない！マルチプラットフォーム対応">
        Claude Codeは当初CLIツールとして登場しましたが、現在はVSCode拡張機能、Web版（claude.ai/code）、JetBrains IDE、さらにiOSモバイルアプリからも利用可能です。さらにChrome拡張・Excel連携・Coworkデスクトップエージェントなど、コーディング以外の領域にもエコシステムが広がっています。
      </Callout>

      <section>
        <h2 className="text-2xl font-bold mb-4">利用可能なプラットフォーム</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-2 text-left font-semibold">プラットフォーム</th>
                <th className="px-4 py-2 text-left font-semibold">特徴</th>
                <th className="px-4 py-2 text-left font-semibold">ステータス</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border"><td className="px-4 py-2 font-medium">CLI（ターミナル）</td><td className="px-4 py-2">最も高機能。全設定・Agent Teams・パイプ連携に対応</td><td className="px-4 py-2"><span className="rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 text-xs">正式版</span></td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2 font-medium">VSCode 拡張機能</td><td className="px-4 py-2">ネイティブdiff表示、チェックポイント可視化、サブエージェントパネル</td><td className="px-4 py-2"><span className="rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 text-xs">正式版</span></td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2 font-medium">Web版（claude.ai/code）</td><td className="px-4 py-2">インストール不要。GitHub連携でクラウド上で並列タスク実行</td><td className="px-4 py-2"><span className="rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 px-2 py-0.5 text-xs">プレビュー</span></td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2 font-medium">JetBrains IDE</td><td className="px-4 py-2">IntelliJ / WebStorm / PyCharm等に対応。ネイティブdiff表示</td><td className="px-4 py-2"><span className="rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 px-2 py-0.5 text-xs">ベータ</span></td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2 font-medium">iOS モバイル</td><td className="px-4 py-2">Web版セッションの監視・操作。外出先からタスク管理</td><td className="px-4 py-2"><span className="rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 text-xs">正式版</span></td></tr>
              <tr><td className="px-4 py-2 font-medium">Neovim / Zed</td><td className="px-4 py-2">コミュニティプラグインまたはACP連携で利用可能</td><td className="px-4 py-2"><span className="rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 text-xs">コミュニティ</span></td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">主要機能 &amp; エコシステム</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {claudeCodeFeatures.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              title={feature.name}
              description={feature.description}
              accentColor="claude-accent"
            />
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/tools/claude-code/features">
            <Button variant="outline">
              全機能を詳しく見る <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-2">Claude Code が使えるツール群</h2>
        <p className="text-muted-foreground mb-4">
          Claude Codeは内部的に以下のツールを使い分けてタスクを遂行します。
        </p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-2 text-left font-semibold">ツール</th>
                <th className="px-4 py-2 text-left font-semibold">用途</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border"><td className="px-4 py-2 font-mono">Read</td><td className="px-4 py-2">ファイルの読み取り（画像・PDF・Notebook対応）</td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2 font-mono">Write / Edit</td><td className="px-4 py-2">ファイルの新規作成・編集</td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2 font-mono">Bash</td><td className="px-4 py-2">シェルコマンドの実行（git, npm等）</td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2 font-mono">Glob / Grep</td><td className="px-4 py-2">ファイル検索・内容検索</td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2 font-mono">WebFetch / WebSearch</td><td className="px-4 py-2">Webコンテンツ取得・Web検索</td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2 font-mono">Task</td><td className="px-4 py-2">サブエージェントの起動（並列処理）</td></tr>
              <tr><td className="px-4 py-2 font-mono">TeamCreate / SendMessage</td><td className="px-4 py-2">Agent Teams（マルチエージェント協調）</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Cursor との違い</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-2 text-left font-semibold">比較項目</th>
                <th className="px-4 py-2 text-left font-semibold text-amber-600 dark:text-amber-400">Claude Code</th>
                <th className="px-4 py-2 text-left font-semibold text-cyan-600 dark:text-cyan-400">Cursor</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border"><td className="px-4 py-2 font-medium">形式</td><td className="px-4 py-2">CLI + IDE拡張 + Web + Mobile</td><td className="px-4 py-2">IDE（GUI）</td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2 font-medium">操作方式</td><td className="px-4 py-2">エージェント型（自律実行）</td><td className="px-4 py-2">インタラクティブ型</td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2 font-medium">最適な用途</td><td className="px-4 py-2">大規模変更、CI/CD連携、マルチエージェント</td><td className="px-4 py-2">日常のコーディング</td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2 font-medium">エコシステム</td><td className="px-4 py-2">Chrome拡張・Excel・Cowork・Agent Teams</td><td className="px-4 py-2">VSCode拡張機能</td></tr>
              <tr><td className="px-4 py-2 font-medium">学習コスト</td><td className="px-4 py-2">中〜高</td><td className="px-4 py-2">低</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/tools/claude-code/setup">
          <Button size="lg">
            セットアップガイド <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
        <a href={tool.officialUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="lg">
            公式ドキュメント <ExternalLink className="h-4 w-4" />
          </Button>
        </a>
      </div>
    </div>
  )
}
