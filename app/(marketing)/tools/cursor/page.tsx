import type { Metadata } from "next"
import Link from "next/link"
import { getToolById, cursorFeatures } from "@/lib/tools-data"
import { FeatureCard } from "@/components/content/feature-card"
import { Callout } from "@/components/content/callout"
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink } from "lucide-react"

export const metadata: Metadata = {
  title: "Cursor - AIファーストのコードエディタ",
  description: "CursorはVSCodeベースのAIコードエディタ。Tab補完、チャット、Agent モードなどAI機能を統合的に提供し、開発者の生産性を大幅に向上させます。",
}

export default function CursorOverviewPage() {
  const tool = getToolById("cursor")!

  return (
    <div className="space-y-10">
      <div>
        <div className="inline-flex items-center rounded-full bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400 px-3 py-1 text-sm font-medium mb-4">
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
          <p className="text-sm text-muted-foreground">対応OS</p>
          <p className="font-semibold">Windows / macOS / Linux</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">ベース</p>
          <p className="font-semibold">Visual Studio Code（フォーク）</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">料金</p>
          <p className="font-semibold">無料〜 $20/月（Pro）</p>
        </div>
      </div>

      <Callout type="tip" title="VSCode ユーザーへ">
        CursorはVSCodeのフォークなので、拡張機能・テーマ・キーバインド・設定をワンクリックでインポートできます。移行は非常に簡単です。
      </Callout>

      <section>
        <h2 className="text-2xl font-bold mb-2">VSCode との違い</h2>
        <p className="text-muted-foreground mb-6">
          CursorはVSCodeの全機能に加えて、以下のAI機能が統合されています。
        </p>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-2 w-2 rounded-full bg-cyan-500 shrink-0" />
            <div>
              <strong>AI ネイティブ統合</strong> - コード補完、チャット、エージェントモードが組み込み済み
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-2 w-2 rounded-full bg-cyan-500 shrink-0" />
            <div>
              <strong>コンテキスト認識</strong> - プロジェクト全体をインデックスし、AIがコンテキストを理解
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-2 w-2 rounded-full bg-cyan-500 shrink-0" />
            <div>
              <strong>マルチモデル対応</strong> - Claude Opus 4.6、Sonnet 4.5、GPT-5.3、Composer など複数のLLMを選択可能
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-2 w-2 rounded-full bg-cyan-500 shrink-0" />
            <div>
              <strong>プライバシーモード</strong> - コードをリモートに保存しない設定が可能
            </div>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">主要機能</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cursorFeatures.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              title={feature.name}
              description={feature.description}
              accentColor="cursor-accent"
            />
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/tools/cursor/features">
            <Button variant="outline">
              全機能を詳しく見る <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/tools/cursor/setup">
          <Button size="lg">
            セットアップガイド <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
        <a href={tool.officialUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="lg">
            公式サイト <ExternalLink className="h-4 w-4" />
          </Button>
        </a>
      </div>
    </div>
  )
}
