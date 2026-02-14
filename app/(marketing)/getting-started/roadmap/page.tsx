import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Callout } from "@/components/content/callout"
import { CheckCircle2, Clock, Trophy, Target, BookOpen, Code2, Rocket } from "lucide-react"

export const metadata: Metadata = {
  title: "学習ロードマップ - AIコーディングツール習得への道",
  description: "Cursor、Claude Code、Manus AIを段階的に習得するための学習ロードマップ。初心者から上級者まで対応。",
}

interface LevelCardProps {
  readonly level: number
  readonly title: string
  readonly duration: string
  readonly goal: string
  readonly tasks: readonly string[]
  readonly checkpoint: string
  readonly resources: readonly { label: string; href: string }[]
  readonly icon: React.ReactNode
  readonly accentClass: string
}

function LevelCard({ level, title, duration, goal, tasks, checkpoint, resources, icon, accentClass }: LevelCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className={`inline-flex items-center justify-center rounded-lg p-2 ${accentClass}`}>
            {icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-muted-foreground">Level {level}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {duration}
              </span>
            </div>
            <CardTitle className="text-xl mt-1">{title}</CardTitle>
          </div>
        </div>
        <div className="rounded-lg bg-muted p-3">
          <p className="text-sm font-semibold text-muted-foreground mb-1">🎯 目標</p>
          <p className="text-sm">{goal}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold mb-3">学習タスク</h4>
          <ul className="space-y-2">
            {tasks.map((task, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span>{task}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-4 border-t">
          <div className="rounded-lg bg-primary/5 border border-primary/20 p-3 mb-3">
            <p className="text-xs font-semibold text-muted-foreground mb-1">✅ チェックテスト</p>
            <p className="text-sm">{checkpoint}</p>
          </div>
        </div>

        <div className="pt-2">
          <h4 className="text-sm font-semibold mb-2">学習リソース</h4>
          <div className="flex flex-wrap gap-2">
            {resources.map((resource, index) => (
              <Link key={index} href={resource.href}>
                <Button variant="outline" size="sm" className="text-xs">
                  {resource.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function RoadmapPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-3">学習ロードマップ</h1>
        <p className="text-lg text-muted-foreground">
          AIコーディングツールを段階的に習得するための学習計画。
          自分のレベルに合わせて、着実にスキルアップしましょう。
        </p>
      </div>

      <Callout type="tip" title="ロードマップの使い方">
        各レベルの「チェックテスト」をクリアしてから次のレベルに進みましょう。
        焦らず、一つずつ確実にマスターすることが大切です。
      </Callout>

      {/* 全体像 */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>習得までの全体像</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="inline-flex items-center justify-center rounded-full p-3 bg-cyan-100 dark:bg-cyan-900/30 mb-2">
                  <BookOpen className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <h4 className="font-semibold text-sm mb-1">Level 1</h4>
                <p className="text-xs text-muted-foreground">30分〜2時間</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center rounded-full p-3 bg-green-100 dark:bg-green-900/30 mb-2">
                  <Code2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h4 className="font-semibold text-sm mb-1">Level 2</h4>
                <p className="text-xs text-muted-foreground">2〜4時間</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center rounded-full p-3 bg-amber-100 dark:bg-amber-900/30 mb-2">
                  <Target className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h4 className="font-semibold text-sm mb-1">Level 3</h4>
                <p className="text-xs text-muted-foreground">1〜3日</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center rounded-full p-3 bg-violet-100 dark:bg-violet-900/30 mb-2">
                  <Rocket className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                </div>
                <h4 className="font-semibold text-sm mb-1">Level 4</h4>
                <p className="text-xs text-muted-foreground">1週間</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center rounded-full p-3 bg-red-100 dark:bg-red-900/30 mb-2">
                  <Trophy className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <h4 className="font-semibold text-sm mb-1">Level 5</h4>
                <p className="text-xs text-muted-foreground">継続的</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Level 1 */}
      <section>
        <LevelCard
          level={1}
          title="インストールと基本操作"
          duration="30分〜2時間"
          goal="AIツールを起動して、基本的な補完・チャットを体験する"
          tasks={[
            "システム要件を確認（Node.js、OS バージョン）",
            "Cursor または Claude Code をインストール",
            "初回認証（API キーまたは Pro/Max アカウント）",
            "サンプルプロジェクトで Tab 補完を試す（Cursor）",
            "簡単なプロンプトでコードを生成してもらう",
          ]}
          checkpoint="「AIにコード補完してもらい、それを受け入れて実行できた」"
          resources={[
            { label: "Cursor セットアップ", href: "/tools/cursor/setup" },
            { label: "Claude Code セットアップ", href: "/tools/claude-code/setup" },
            { label: "30分チュートリアル", href: "/tutorials/first-30-minutes" },
          ]}
          icon={<BookOpen className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />}
          accentClass="bg-cyan-100 dark:bg-cyan-900/30"
        />
      </section>

      {/* Level 2 */}
      <section>
        <LevelCard
          level={2}
          title="効果的な使い方を学ぶ"
          duration="2〜4時間"
          goal="AI の効果的な使い方を理解し、生産性向上を実感する"
          tasks={[
            "プロンプトテンプレート（バグ修正、新機能、リファクタリング）を試す",
            "CLAUDE.md または .cursorrules を作成して、プロジェクトルールを設定",
            "チェックポイント機能を使って、AIの変更を巻き戻す練習",
            "コンテキストの与え方を工夫（@file、@folder の使い方）",
            "よくある間違いを理解して回避する",
          ]}
          checkpoint="「既存のコードを改善する1タスクを、AIと協力して完了できた」"
          resources={[
            { label: "Cursor Tips", href: "/tools/cursor/tips" },
            { label: "Claude Code Tips", href: "/tools/claude-code/tips" },
            { label: "用語集", href: "/getting-started/glossary" },
          ]}
          icon={<Code2 className="h-5 w-5 text-green-600 dark:text-green-400" />}
          accentClass="bg-green-100 dark:bg-green-900/30"
        />
      </section>

      {/* Level 3 */}
      <section>
        <LevelCard
          level={3}
          title="日常開発への統合"
          duration="1〜3日"
          goal="実際のプロジェクトでAIツールを日常的に使えるようになる"
          tasks={[
            "自分のプロジェクトに CLAUDE.md/.cursorrules を適切に設定",
            "複数ファイルにまたがる変更（Composer / エージェント型）を実践",
            "AIとペアプログラミング（TDD：テスト駆動開発）の流れを体験",
            "Git と連携したワークフロー（コミット、PR作成）を確立",
            "コスト管理（トークン消費の確認、モデル選択）を意識する",
          ]}
          checkpoint="「1つの機能を、設計→実装→テスト→コミットまで完了できた」"
          resources={[
            { label: "Cursor 機能詳細", href: "/tools/cursor/features" },
            { label: "Claude Code 機能詳細", href: "/tools/claude-code/features" },
            { label: "トラブルシューティング", href: "/troubleshooting" },
          ]}
          icon={<Target className="h-6 w-6 text-amber-600 dark:text-amber-400" />}
          accentClass="bg-amber-100 dark:bg-amber-900/30"
        />
      </section>

      {/* Level 4 */}
      <section>
        <LevelCard
          level={4}
          title="高度な機能を活用"
          duration="1週間"
          goal="Hooks、MCP、Agent Teams などの高度な機能を使いこなす"
          tasks={[
            "Agent Teams（複数エージェント協調）で大規模タスクを処理（Claude Code）",
            "MCP プラグインで外部ツール（Notion、Slack、DB）と連携",
            "Hooks を設定して、自動フォーマット・型チェックを実行",
            "カスタムコマンド（/plan、/tdd、/review）を活用",
            "Plan モードで実装前に計画を立てる習慣をつける",
          ]}
          checkpoint="「複雑な要件を、計画→分担→実装→統合のフローで完了できた」"
          resources={[
            { label: "Claude Code 高度な機能", href: "/tools/claude-code/features" },
            { label: "MCP について", href: "/tools/claude-code/features#mcp" },
          ]}
          icon={<Rocket className="h-6 w-6 text-violet-600 dark:text-violet-400" />}
          accentClass="bg-violet-100 dark:bg-violet-900/30"
        />
      </section>

      {/* Level 5 */}
      <section>
        <LevelCard
          level={5}
          title="エキスパート（継続学習）"
          duration="継続的"
          goal="独自のワークフローを構築し、チーム導入を推進する"
          tasks={[
            "カスタム MCP プラグインを自作する",
            "CI/CD パイプラインに AI ツールを統合",
            "チーム全体での導入計画を策定（トレーニング、ライセンス管理）",
            "セキュリティポリシーとコンプライアンスを確立",
            "コミュニティに貢献（ブログ執筆、プラグイン公開）",
          ]}
          checkpoint="「チームメンバーにベストプラクティスを教えられるレベル」"
          resources={[
            { label: "比較ページ", href: "/compare" },
            { label: "Claude Code 公式", href: "https://docs.anthropic.com/claude/docs/claude-code" },
          ]}
          icon={<Trophy className="h-6 w-6 text-red-600 dark:text-red-400" />}
          accentClass="bg-red-100 dark:bg-red-900/30"
        />
      </section>

      {/* ツール別の学習パス */}
      <section>
        <h2 className="text-2xl font-bold mb-6">ツール別の推奨学習順序</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cursor */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Cursor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">初心者向け、GUIで使いやすい</p>
              <ol className="space-y-2 text-sm list-decimal list-inside">
                <li>インストール → Tab補完を試す</li>
                <li>Ctrl+K で インラインエディット</li>
                <li>チャット（Ctrl+L）で質問</li>
                <li>Composer で複数ファイル編集</li>
                <li>.cursorrules で自動化</li>
              </ol>
              <Link href="/tools/cursor/setup">
                <Button variant="outline" size="sm" className="w-full">Cursor を始める</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Claude Code */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Claude Code</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">エンジニア向け、高度な自動化</p>
              <ol className="space-y-2 text-sm list-decimal list-inside">
                <li>CLI インストール → 認証</li>
                <li>簡単なプロンプトで実行</li>
                <li>CLAUDE.md で設定</li>
                <li>Hooks で自動化</li>
                <li>Agent Teams で並列処理</li>
              </ol>
              <Link href="/tools/claude-code/setup">
                <Button variant="outline" size="sm" className="w-full">Claude Code を始める</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Manus AI */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Manus AI</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">ノンコーダー向け、自律実行</p>
              <ol className="space-y-2 text-sm list-decimal list-inside">
                <li>アカウント作成</li>
                <li>簡単なリサーチタスク</li>
                <li>データ分析・可視化</li>
                <li>レポート自動生成</li>
                <li>Webスクレイピング</li>
              </ol>
              <Link href="/tools/manus/setup">
                <Button variant="outline" size="sm" className="w-full">Manus AI を始める</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 次のアクション */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>さあ、始めましょう！</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              自分のレベルに合った Level から始めて、チェックテストをクリアしながら進みましょう。
              わからないことがあれば、トラブルシューティングページや用語集を参照してください。
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/tutorials/first-30-minutes">
                <Button variant="primary">30分チュートリアルを始める</Button>
              </Link>
              <Link href="/getting-started/prerequisites">
                <Button variant="outline">前提知識をチェック</Button>
              </Link>
              <Link href="/troubleshooting">
                <Button variant="outline">トラブルシューティング</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
