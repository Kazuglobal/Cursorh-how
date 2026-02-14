import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Callout } from "@/components/content/callout"
import { StepByStep } from "@/components/content/step-by-step"
import { Clock, CheckCircle2, Star, Rocket } from "lucide-react"
import type { SetupStep } from "@/types/tools"

export const metadata: Metadata = {
  title: "30分チュートリアル - TODOアプリを作ってClaude Codeを体験",
  description: "Claude Codeを使って30分でTODOアプリを作成するハンズオンチュートリアル。初心者でも完走できます。",
}

const steps: SetupStep[] = [
  {
    stepNumber: 1,
    title: "プロジェクトの作成",
    description: "Vite を使って React + TypeScript プロジェクトを作成します。",
    code: `# 新しいディレクトリを作成
mkdir my-first-app
cd my-first-app

# Vite で React TypeScript プロジェクトを初期化
npm create vite@latest . -- --template react-ts

# 依存関係をインストール
npm install`,
    codeLanguage: "bash",
    callout: {
      type: "info",
      message: "プロジェクト名を聞かれたら、カレントディレクトリを使用する場合は「.」を入力します。",
    },
  },
  {
    stepNumber: 2,
    title: "Claude Code を起動",
    description: "プロジェクトディレクトリで Claude Code を起動します。",
    code: `# Claude Code を起動
claude`,
    codeLanguage: "bash",
    callout: {
      type: "tip",
      message: "初回起動時は認証が必要な場合があります。画面の指示に従って認証してください。",
    },
  },
  {
    stepNumber: 3,
    title: "AI に TODO アプリを作成してもらう",
    description: "Claude に具体的な指示を出して、TODOアプリを実装してもらいます。",
    code: `React TypeScript で TODO アプリを作ってください。

要件:
- タスクの追加（入力欄 + 追加ボタン）
- タスク一覧表示
- タスクの削除（各タスクに削除ボタン）
- タスクの完了/未完了トグル（チェックボックス）

技術制約:
- React Hooks を使用（useState）
- CSS は App.css に記述
- テストコードも書いてください（Vitest使用）

まず src/App.tsx から作成してください。`,
    codeLanguage: "plaintext",
  },
  {
    stepNumber: 4,
    title: "実装を確認",
    description: "Claude が生成したコードを確認します。不明点があればチャットで質問しましょう。",
    callout: {
      type: "info",
      message: "Claude は通常、以下のファイルを作成・編集します：\n・src/App.tsx (メインロジック)\n・src/App.css (スタイル)\n・src/App.test.tsx (テスト)",
    },
  },
  {
    stepNumber: 5,
    title: "アプリを実行",
    description: "開発サーバーを起動して、ブラウザで動作を確認します。",
    code: `# 開発サーバーを起動
npm run dev

# ブラウザで http://localhost:5173 を開く`,
    codeLanguage: "bash",
    callout: {
      type: "tip",
      message: "Ctrl+C (Mac: Cmd+C) でサーバーを停止できます。",
    },
  },
  {
    stepNumber: 6,
    title: "機能を追加",
    description: "ローカルストレージにタスクを保存する機能を追加してもらいます。",
    code: `ローカルストレージにタスクを保存して、
ページをリロードしても残るようにしてください。

useEffect を使って、タスクが変更されるたびに自動保存し、
初回読み込み時にローカルストレージから復元してください。`,
    codeLanguage: "plaintext",
  },
  {
    stepNumber: 7,
    title: "テストを実行",
    description: "Claude が書いたテストを実行して、正しく動作することを確認します。",
    code: `# テストを実行
npm test`,
    codeLanguage: "bash",
    callout: {
      type: "warning",
      message: "テストが失敗した場合は、Claude に「テストが失敗しました。修正してください」と伝えましょう。",
    },
  },
  {
    stepNumber: 8,
    title: "Git コミット",
    description: "変更を Git にコミットします。",
    code: `# Git リポジトリを初期化
git init

# すべての変更をステージング
git add .

# コミット
git commit -m "feat: create TODO app with localStorage"`,
    codeLanguage: "bash",
  },
]

export default function FirstTutorialPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-3">30分チュートリアル</h1>
        <p className="text-lg text-muted-foreground">
          Claude Code を使って、30分で TODO アプリを作成します。
          プログラミング初心者でも完走できる、ハンズオン形式のチュートリアルです。
        </p>
      </div>

      {/* チュートリアル概要 */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-muted-foreground">所要時間</span>
              </div>
              <CardTitle>30分</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              セットアップから完成まで、平均30分で完了します。
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-muted-foreground">難易度</span>
              </div>
              <CardTitle>⭐ 初心者向け</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              プログラミング経験が少なくても大丈夫です。
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Rocket className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-muted-foreground">学べること</span>
              </div>
              <CardTitle>AI ペアプログラミング</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              プロンプトの書き方、コードレビュー、テスト実行を体験。
            </CardContent>
          </Card>
        </div>
      </section>

      <Callout type="info" title="前提条件">
        <ul className="list-disc list-inside space-y-1">
          <li>Node.js 18 以上がインストール済み</li>
          <li>Claude Code がインストール済み（<Link href="/tools/claude-code/setup" className="text-primary hover:underline">セットアップガイド</Link>）</li>
          <li>ターミナル / コマンドプロンプトを開ける</li>
        </ul>
      </Callout>

      {/* 完成イメージ */}
      <section>
        <h2 className="text-2xl font-bold mb-6">完成イメージ</h2>
        <Card>
          <CardHeader>
            <CardTitle>作成する TODO アプリの機能</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span><strong>タスク追加:</strong> 入力欄に入力して「追加」ボタンをクリック</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span><strong>完了/未完了:</strong> チェックボックスでトグル（完了したタスクは打ち消し線）</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span><strong>タスク削除:</strong> 各タスクの「削除」ボタンをクリック</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span><strong>永続化:</strong> ページをリロードしてもタスクが残る（localStorage）</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span><strong>テスト:</strong> Vitest でユニットテスト実装済み</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* ステップバイステップ */}
      <section>
        <h2 className="text-2xl font-bold mb-6">ステップバイステップガイド</h2>
        <StepByStep steps={steps} />
      </section>

      {/* おめでとうございます */}
      <section>
        <Card className="bg-gradient-to-r from-green-50 to-cyan-50 dark:from-green-950/50 dark:to-cyan-950/50 border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🎉 おめでとうございます！
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              これで Claude Code の基本的な使い方をマスターしました。
              以下のスキルを習得しました：
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span>プロジェクトのセットアップ</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span>効果的なプロンプトの書き方（要件・技術制約の明示）</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span>AI とのやり取り（段階的な機能追加）</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span>テストの実行</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span>Git でのバージョン管理</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* 次のステップ */}
      <section>
        <h2 className="text-2xl font-bold mb-6">次のステップ</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">さらに学ぶ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                基本をマスターしたら、以下のトピックに進みましょう：
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/tools/claude-code/tips" className="text-primary hover:underline">
                    Claude Code のベストプラクティス
                  </Link>
                </li>
                <li>
                  <Link href="/tools/claude-code/features" className="text-primary hover:underline">
                    高度な機能（Hooks、MCP、Agent Teams）
                  </Link>
                </li>
                <li>
                  <Link href="/getting-started/roadmap" className="text-primary hover:underline">
                    学習ロードマップ（Level 2へ）
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">実践してみる</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                自分のプロジェクトで Claude Code を使ってみましょう：
              </p>
              <ul className="space-y-2 text-sm list-disc list-inside text-muted-foreground">
                <li>既存のプロジェクトをリファクタリング</li>
                <li>新しい機能を追加</li>
                <li>バグを修正</li>
                <li>ドキュメントを生成</li>
              </ul>
              <Link href="/tools/claude-code">
                <Button variant="outline" size="sm" className="w-full mt-3">
                  Claude Code の全機能を見る
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* よくある質問 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">よくある質問</h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Q: AI が生成したコードは安全に使えますか？</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              A: 基本的には安全ですが、重要なプロジェクトでは必ずコードレビューとテストを行ってください。
              特にセキュリティ関連（認証、データベース操作）は慎重に確認しましょう。
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Q: コストはどれくらいかかりますか？</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              A: このチュートリアル程度なら、API 従量課金で約 $0.50〜$1.00 です。
              Claude Pro/Max サブスクリプションなら定額で使い放題です。
              詳細は <Link href="/compare" className="text-primary hover:underline">料金比較ページ</Link> をご覧ください。
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Q: エラーが出た場合はどうすればいいですか？</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              A: <Link href="/troubleshooting" className="text-primary hover:underline">トラブルシューティングページ</Link> をご確認ください。
              よくあるエラーと解決方法を網羅しています。
            </CardContent>
          </Card>
        </div>
      </section>

      {/* フィードバック */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>フィードバックをお待ちしています</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              このチュートリアルはいかがでしたか？改善点があればぜひお聞かせください。
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/getting-started">
                <Button variant="primary">はじめにページに戻る</Button>
              </Link>
              <Link href="/getting-started/roadmap">
                <Button variant="outline">学習ロードマップを見る</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
