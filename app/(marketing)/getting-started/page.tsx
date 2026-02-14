import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Callout } from "@/components/content/callout"
import { ToolQuiz } from "@/components/interactive/tool-quiz"
import { ArrowRight, Monitor, Terminal, Globe, BookOpen, Code2, BarChart3 } from "lucide-react"

export const metadata: Metadata = {
  title: "はじめに - あなたに最適なAIコーディングツールを選ぼう",
  description: "経験レベルや目的に応じて、Cursor・Claude Code・Manus AIの中からあなたに最適なAIツールを見つけましょう。",
}

interface ScenarioCardProps {
  readonly title: string
  readonly description: string
  readonly tool: string
  readonly toolHref: string
  readonly icon: React.ReactNode
  readonly accentClass: string
}

function ScenarioCard({ title, description, tool, toolHref, icon, accentClass }: ScenarioCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className={`inline-flex items-center justify-center rounded-lg p-2 w-fit ${accentClass}`}>
          {icon}
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <Link href={toolHref}>
          <Button variant="outline" size="sm">
            {tool} を見る <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

export default function GettingStartedPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-3">はじめに</h1>
        <p className="text-lg text-muted-foreground">
          あなたの目的や経験に合わせて、最適なAIコーディングツールを選びましょう。
        </p>
      </div>

      <Callout type="tip" title="迷ったらここをチェック">
        下の「目的別ガイド」から、自分に一番近いシナリオを選んでください。
        複数のツールを組み合わせて使うのもおすすめです。
      </Callout>

      {/* Decision Flowchart (Text-based) */}
      <section>
        <h2 className="text-2xl font-bold mb-6">ツール選択フローチャート</h2>
        <div className="rounded-xl border border-border bg-card p-6 lg:p-8">
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-lg font-semibold mb-4">あなたは何をしたいですか？</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-lg border-2 border-cyan-200 dark:border-cyan-800 p-4 text-center">
                <Monitor className="h-8 w-8 mx-auto mb-2 text-cyan-600 dark:text-cyan-400" />
                <p className="font-semibold mb-1">コードを書きたい</p>
                <p className="text-sm text-muted-foreground mb-3">
                  GUIのエディタで快適にコーディング
                </p>
                <Link href="/tools/cursor">
                  <Button variant="outline" size="sm" className="border-cyan-300 dark:border-cyan-700">
                    Cursor がおすすめ
                  </Button>
                </Link>
              </div>

              <div className="rounded-lg border-2 border-amber-200 dark:border-amber-800 p-4 text-center">
                <Terminal className="h-8 w-8 mx-auto mb-2 text-amber-600 dark:text-amber-400" />
                <p className="font-semibold mb-1">大規模な開発・自動化</p>
                <p className="text-sm text-muted-foreground mb-3">
                  ターミナルから一括でコード変更
                </p>
                <Link href="/tools/claude-code">
                  <Button variant="outline" size="sm" className="border-amber-300 dark:border-amber-700">
                    Claude Code がおすすめ
                  </Button>
                </Link>
              </div>

              <div className="rounded-lg border-2 border-violet-200 dark:border-violet-800 p-4 text-center">
                <Globe className="h-8 w-8 mx-auto mb-2 text-violet-600 dark:text-violet-400" />
                <p className="font-semibold mb-1">リサーチ・データ分析</p>
                <p className="text-sm text-muted-foreground mb-3">
                  コード不要でタスクを自動化
                </p>
                <Link href="/tools/manus">
                  <Button variant="outline" size="sm" className="border-violet-300 dark:border-violet-700">
                    Manus AI がおすすめ
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tool Selection Quiz */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">あなたに最適なツールを診断</h2>
          <p className="text-muted-foreground">
            簡単な5つの質問に答えるだけで、あなたにぴったりなツールが見つかります。
            経験レベルや開発スタイルから、最適なツールを診断します。
          </p>
        </div>
        <ToolQuiz />
      </section>

      {/* Scenario-based Recommendations */}
      <section>
        <h2 className="text-2xl font-bold mb-6">目的別ガイド</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ScenarioCard
            title="プログラミングを学び始めた"
            description="VSCodeベースの使いやすいUIで、AIがリアルタイムにコードを補完してくれます。初心者でもすぐに使い始められます。"
            tool="Cursor"
            toolHref="/tools/cursor"
            icon={<BookOpen className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />}
            accentClass="bg-cyan-100 dark:bg-cyan-900/60"
          />
          <ScenarioCard
            title="既存プロジェクトの開発を加速したい"
            description="プロジェクト全体を理解したAIがコード補完・チャット・自動編集で開発をサポート。VSCodeの拡張機能もそのまま使えます。"
            tool="Cursor"
            toolHref="/tools/cursor"
            icon={<Code2 className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />}
            accentClass="bg-cyan-100 dark:bg-cyan-900/60"
          />
          <ScenarioCard
            title="大規模なリファクタリング・自動化がしたい"
            description="ターミナルからファイル操作・Git・テスト実行まで一気通貫。Hooks・MCPで開発フローを高度にカスタマイズできます。"
            tool="Claude Code"
            toolHref="/tools/claude-code"
            icon={<Terminal className="h-6 w-6 text-amber-600 dark:text-amber-400" />}
            accentClass="bg-amber-100 dark:bg-amber-900/60"
          />
          <ScenarioCard
            title="Web調査・データ分析・レポート作成"
            description="ブラウザ操作で情報を自動収集し、分析結果をExcelやPDFで出力。プログラミング知識がなくても使えます。"
            tool="Manus AI"
            toolHref="/tools/manus"
            icon={<BarChart3 className="h-6 w-6 text-violet-600 dark:text-violet-400" />}
            accentClass="bg-violet-100 dark:bg-violet-900/60"
          />
        </div>
      </section>

      {/* Experience Level Guide */}
      <section>
        <h2 className="text-2xl font-bold mb-6">経験レベル別のおすすめ</h2>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-lg font-semibold mb-2">完全な初心者（プログラミング未経験）</h3>
            <p className="text-sm text-muted-foreground mb-3">
              まずは <strong>Cursor</strong> から始めるのがおすすめです。VSCodeと同じ使い心地で、AIがリアルタイムにコードを提案してくれます。
              コーディング以外のタスク（リサーチ、データ分析）には <strong>Manus AI</strong> が便利です。
            </p>
            <div className="flex gap-3">
              <Link href="/tools/cursor/setup">
                <Button variant="outline" size="sm">Cursor セットアップ</Button>
              </Link>
              <Link href="/tools/manus/setup">
                <Button variant="outline" size="sm">Manus AI セットアップ</Button>
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-lg font-semibold mb-2">プログラミング経験あり</h3>
            <p className="text-sm text-muted-foreground mb-3">
              日常的なコーディングには <strong>Cursor</strong>、大規模な変更や自動化には <strong>Claude Code</strong> を併用するのがベストです。
              両方を使い分けることで、開発効率が大幅に向上します。
            </p>
            <div className="flex gap-3">
              <Link href="/tools/cursor">
                <Button variant="outline" size="sm">Cursor を見る</Button>
              </Link>
              <Link href="/tools/claude-code">
                <Button variant="outline" size="sm">Claude Code を見る</Button>
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-lg font-semibold mb-2">プロの開発者</h3>
            <p className="text-sm text-muted-foreground mb-3">
              3つのツールすべてを場面に応じて使い分けるのが最も効果的です。
              <strong>Claude Code</strong> のHooks・MCP・Agent SDKを活用すると、開発フロー全体を高度に自動化できます。
            </p>
            <div className="flex gap-3">
              <Link href="/compare">
                <Button variant="outline" size="sm">詳細比較を見る</Button>
              </Link>
              <Link href="/tools/claude-code/tips">
                <Button variant="outline" size="sm">Claude Code Tips</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
