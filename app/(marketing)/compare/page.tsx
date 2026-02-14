import type { Metadata } from "next"
import { ComparisonTable } from "@/components/content/comparison-table"
import { Callout } from "@/components/content/callout"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "ツール比較 - Cursor vs Claude Code vs Manus AI",
  description: "Cursor、Claude Code、Manus AIの機能・料金・ユースケースを徹底比較。あなたの開発スタイルに最適なAIツールが一目でわかります。",
}

export default function ComparePage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-3">ツール比較</h1>
        <p className="text-lg text-muted-foreground">
          Cursor、Claude Code、Manus AI の3ツールを機能ごとに比較します。
        </p>
      </div>

      <Callout type="info" title="比較の見方">
        カテゴリボタンで表示を絞り込めます。表は横スクロールに対応しています。
      </Callout>

      <ComparisonTable />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">使い分けのポイント</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-lg border-2 border-cyan-200 dark:border-cyan-800 bg-card p-6">
            <h3 className="text-lg font-bold text-cyan-600 dark:text-cyan-400 mb-3">
              Cursor がおすすめの場面
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-500 shrink-0" />
                既存プロジェクトのコード編集・リファクタリング
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-500 shrink-0" />
                リアルタイムのコード補完を受けながら開発したい
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-500 shrink-0" />
                VSCodeに慣れている・GUI操作が好み
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-500 shrink-0" />
                プログラミング初心者で始めやすいツールが欲しい
              </li>
            </ul>
          </div>

          <div className="rounded-lg border-2 border-amber-200 dark:border-amber-800 bg-card p-6">
            <h3 className="text-lg font-bold text-amber-600 dark:text-amber-400 mb-3">
              Claude Code がおすすめの場面
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                複数ファイルにまたがる大規模なコード変更
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                Git操作・テスト実行・ビルドを含む包括的タスク
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                ターミナル操作が得意・CLI好み
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                Hooks・MCP・カスタムエージェントで高度にカスタマイズしたい
              </li>
            </ul>
          </div>

          <div className="rounded-lg border-2 border-violet-200 dark:border-violet-800 bg-card p-6">
            <h3 className="text-lg font-bold text-violet-600 dark:text-violet-400 mb-3">
              Manus AI がおすすめの場面
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-500 shrink-0" />
                Web上の情報収集・リサーチ・レポート作成
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-500 shrink-0" />
                データ分析やExcel/PDF出力
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-500 shrink-0" />
                プログラミング知識なしでタスクを自動化したい
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-500 shrink-0" />
                素早くプロトタイプを作りたい
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Callout type="tip" title="組み合わせ活用がおすすめ">
        3つのツールはそれぞれ得意分野が異なります。例えば、Manus AI でリサーチ → Cursor でコーディング → Claude Code でテスト・デプロイという組み合わせが効果的です。
      </Callout>

      <div className="text-center py-4">
        <Link href="/getting-started">
          <Button size="lg">
            自分に合うツールを診断する
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
