import type { Metadata } from "next"
import Link from "next/link"
import { getToolById, manusFeatures } from "@/lib/tools-data"
import { FeatureCard } from "@/components/content/feature-card"
import { Callout } from "@/components/content/callout"
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink } from "lucide-react"

export const metadata: Metadata = {
  title: "Manus AI - 汎用AIエージェント",
  description: "Manus AIはMonica.imが開発した汎用AIエージェント。ブラウザ操作、コード実行、データ分析、リサーチなどを自律的に実行します。",
}

export default function ManusOverviewPage() {
  const tool = getToolById("manus")!

  return (
    <div className="space-y-10">
      <div>
        <div className="inline-flex items-center rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400 px-3 py-1 text-sm font-medium mb-4">
          {tool.category}
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-3">{tool.name}</h1>
        <p className="text-lg text-muted-foreground">{tool.description}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">開発元</p>
          <p className="font-semibold">{tool.developer}（中国・深セン）</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">利用環境</p>
          <p className="font-semibold">Webブラウザ（デスクトップ・モバイル）</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">実行環境</p>
          <p className="font-semibold">クラウドサンドボックス（隔離環境）</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">料金</p>
          <p className="font-semibold">クレジットベース（$39/月〜）</p>
        </div>
      </div>

      <Callout type="info" title="Manus AI の特徴">
        Manus AIは単なるチャットボットではなく、タスクを自律的に計画・実行するAIエージェントです。
        ブラウザ操作やコード実行を含む複雑なタスクを、自然言語の指示だけで自動化できます。
        プログラミング知識がなくても使えるのが大きな特徴です。
      </Callout>

      <section>
        <h2 className="text-2xl font-bold mb-2">GAIA ベンチマーク</h2>
        <p className="text-muted-foreground">
          Manus AIはGAIA（General AI Assistants）ベンチマークで高スコアを記録し、注目を集めました。
          これはAIの汎用的なタスク遂行能力を測定するベンチマークです。
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">主要機能</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {manusFeatures.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              title={feature.name}
              description={feature.description}
              accentColor="manus-accent"
            />
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/tools/manus/features">
            <Button variant="outline">
              全機能を詳しく見る <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">できること・できないこと</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-6">
            <h3 className="font-semibold text-green-700 dark:text-green-400 mb-3">できること</h3>
            <ul className="space-y-2 text-sm">
              <li>公開Webサイトの閲覧と情報収集</li>
              <li>サンドボックス内でのコード実行</li>
              <li>ファイルの生成とダウンロード</li>
              <li>データ分析と可視化</li>
              <li>ドキュメント生成（PDF/Excel等）</li>
            </ul>
          </div>
          <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-6">
            <h3 className="font-semibold text-red-700 dark:text-red-400 mb-3">できないこと / 制限</h3>
            <ul className="space-y-2 text-sm">
              <li>ローカルPCへの直接アクセス</li>
              <li>認証が必要なサービスへのログイン</li>
              <li>大規模コードベースの開発</li>
              <li>金銭取引・購入操作</li>
              <li>長時間の連続監視タスク</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/tools/manus/setup">
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
