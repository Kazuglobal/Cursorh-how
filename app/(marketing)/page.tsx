import type { Metadata } from "next"
import Link from "next/link"
import { tools } from "@/lib/tools-data"
import { ToolCard } from "@/components/content/tool-card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, GitCompare, Rocket } from "lucide-react"

export const metadata: Metadata = {
  title: "AI Coding Tools ガイド - Cursor / Claude Code / Manus AI 完全解説",
  description: "Cursor、Claude Code、Manus AI の3つのAIコーディングツールを徹底比較・解説。プログラミング初学者でも最適なツールが見つかる日本語ガイド。",
}

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12 lg:py-16">
        <div className="animate-fade-in-up inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
          <Sparkles className="h-4 w-4" />
          2026年最新版
        </div>
        <h1 className="animate-fade-in-up text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4" style={{ animationDelay: '0.1s' }}>
          AI コーディングツール
          <br />
          <span className="text-primary">完全ガイド</span>
        </h1>
        <p className="animate-fade-in-up mx-auto max-w-2xl text-lg text-muted-foreground mb-8" style={{ animationDelay: '0.2s' }}>
          Cursor、Claude Code、Manus AI &#8212;
          3つの主要AIツールの機能・料金・使い方を日本語で徹底解説。
          あなたに最適なツールが見つかります。
        </p>
        <div className="animate-fade-in-up flex flex-col sm:flex-row items-center justify-center gap-4" style={{ animationDelay: '0.3s' }}>
          <Link href="/getting-started">
            <Button size="lg">
              <Rocket className="h-5 w-5" />
              自分に合うツールを見つける
            </Button>
          </Link>
          <Link href="/compare">
            <Button variant="outline" size="lg">
              <GitCompare className="h-5 w-5" />
              3ツールを比較する
            </Button>
          </Link>
        </div>
      </section>

      {/* Tool Cards */}
      <section>
        <div className="text-center mb-8">
          <h2 className="animate-fade-in-up text-2xl font-bold mb-2">3つのAIコーディングツール</h2>
          <p className="animate-fade-in-up text-muted-foreground" style={{ animationDelay: '0.1s' }}>
            それぞれ異なる強みを持つ3つのツールを詳しく解説します
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, idx) => (
            <div key={tool.id} className="animate-fade-in-up" style={{ animationDelay: `${0.2 + idx * 0.1}s` }}>
              <ToolCard tool={tool} />
            </div>
          ))}
        </div>
      </section>

      {/* Quick Comparison */}
      <section className="animate-fade-in-up rounded-xl border border-border bg-card p-6 lg:p-8">
        <h2 className="text-2xl font-bold mb-4">ざっくり比較</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-3 px-4 text-left font-semibold">項目</th>
                <th className="py-3 px-4 text-center font-semibold text-cyan-600 dark:text-cyan-400">Cursor</th>
                <th className="py-3 px-4 text-center font-semibold text-amber-600 dark:text-amber-400">Claude Code</th>
                <th className="py-3 px-4 text-center font-semibold text-violet-600 dark:text-violet-400">Manus AI</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="py-3 px-4 font-medium">形式</td>
                <td className="py-3 px-4 text-center">IDE（エディタ）</td>
                <td className="py-3 px-4 text-center">CLI（ターミナル）</td>
                <td className="py-3 px-4 text-center">Webアプリ</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-4 font-medium">得意なこと</td>
                <td className="py-3 px-4 text-center">日常のコーディング</td>
                <td className="py-3 px-4 text-center">大規模コード変更</td>
                <td className="py-3 px-4 text-center">リサーチ・データ分析</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-4 font-medium">対象ユーザー</td>
                <td className="py-3 px-4 text-center">初心者〜上級者</td>
                <td className="py-3 px-4 text-center">中級〜上級者</td>
                <td className="py-3 px-4 text-center">全ユーザー</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">料金</td>
                <td className="py-3 px-4 text-center">無料〜$20/月</td>
                <td className="py-3 px-4 text-center">$20/月〜</td>
                <td className="py-3 px-4 text-center">$39/月〜</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-6 text-center">
          <Link href="/compare" className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1">
            詳細な比較を見る <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="animate-fade-in-up text-center py-8">
        <h2 className="text-2xl font-bold mb-3">どのツールから始めればいい？</h2>
        <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
          あなたの経験レベルや目的に応じて、最適なツールをご案内します。
        </p>
        <Link href="/getting-started">
          <Button size="lg">
            ツール選びガイドへ
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      </section>
    </div>
  )
}
