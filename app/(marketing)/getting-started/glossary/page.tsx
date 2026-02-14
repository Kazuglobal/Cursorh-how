import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Callout } from "@/components/content/callout"
import { Terminal, Monitor, Zap, MessageSquare, FileCode, Globe, Shield, Settings } from "lucide-react"

export const metadata: Metadata = {
  title: "用語集 - AIコーディングツールの基本用語",
  description: "Cursor、Claude Code、Manus AIを理解するための基本用語を初心者向けに解説します。",
}

interface GlossaryTermProps {
  readonly term: string
  readonly icon: React.ReactNode
  readonly definition: string
  readonly example?: string
  readonly relatedTerms?: readonly string[]
}

function GlossaryTerm({ term, icon, definition, example, relatedTerms }: GlossaryTermProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="inline-flex items-center justify-center rounded-lg p-2 bg-primary/10">
            {icon}
          </div>
          <CardTitle className="text-xl">{term}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm leading-relaxed">{definition}</p>

        {example && (
          <div className="rounded-lg bg-muted p-3">
            <p className="text-xs font-semibold text-muted-foreground mb-1">例：</p>
            <p className="text-sm">{example}</p>
          </div>
        )}

        {relatedTerms && relatedTerms.length > 0 && (
          <div className="pt-2 border-t">
            <p className="text-xs font-semibold text-muted-foreground mb-2">関連用語：</p>
            <div className="flex flex-wrap gap-2">
              {relatedTerms.map((related) => (
                <span key={related} className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground">
                  {related}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function GlossaryPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-3">用語集</h1>
        <p className="text-lg text-muted-foreground">
          AIコーディングツールを理解するための基本用語を、初心者にもわかりやすく解説します。
        </p>
      </div>

      <Callout type="tip" title="このページの使い方">
        各用語をクリックすると詳しい説明が表示されます。関連用語も一緒に確認することで、理解が深まります。
      </Callout>

      {/* 基本概念 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">基本概念</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlossaryTerm
            term="CLI（コマンドラインインターフェース）"
            icon={<Terminal className="h-5 w-5 text-primary" />}
            definition="文字（コマンド）を入力してコンピュータを操作する方法。マウスを使わず、キーボードだけで操作します。"
            example="Windows の「コマンドプロンプト」、Mac の「ターミナル」がCLIです。`npm install` や `git commit` などのコマンドを入力して使います。"
            relatedTerms={["ターミナル", "シェル", "コマンド"]}
          />

          <GlossaryTerm
            term="IDE（統合開発環境）"
            icon={<Monitor className="h-5 w-5 text-primary" />}
            definition="コードを書く・実行する・デバッグするなど、開発に必要な機能がすべて揃ったソフトウェア。"
            example="VSCode、Cursor、IntelliJ IDEA などが IDE です。メモ帳よりも遥かに高機能で、開発を効率化します。"
            relatedTerms={["エディタ", "VSCode", "Cursor"]}
          />

          <GlossaryTerm
            term="エージェント型 AI"
            icon={<Zap className="h-5 w-5 text-primary" />}
            definition="人間の指示を受けて、自律的にタスクを分解・実行するAI。途中で人間の確認を挟みながら、複雑な作業を自動で進めます。"
            example="Claude Code は典型的なエージェント型。「認証機能を追加して」と指示すると、ファイル作成→コード生成→テスト→確認を自動で実行します。"
            relatedTerms={["自律実行", "タスク分解", "プロンプト"]}
          />

          <GlossaryTerm
            term="プロンプト"
            icon={<MessageSquare className="h-5 w-5 text-primary" />}
            definition="AI に与える指示文。自然な日本語や英語で書きます。プロンプトの質が、AIの出力品質を左右します。"
            example="❌ 悪い例：「直して」\n✅ 良い例：「src/App.tsx のログイン処理で、パスワードが間違っている時にエラーメッセージを表示してください」"
            relatedTerms={["指示文", "質問", "チャット"]}
          />
        </div>
      </section>

      {/* ツール固有の用語 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">ツール固有の用語</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlossaryTerm
            term="CLAUDE.md"
            icon={<FileCode className="h-5 w-5 text-primary" />}
            definition="Claude Code がプロジェクトのルールや制約を理解するための設定ファイル。プロジェクトのルートに配置します。"
            example="「TypeScript を使う」「テストを必ず書く」「Tailwind CSS でスタイリング」などのルールを書いておくと、Claude がそれに従ってコードを生成します。"
            relatedTerms={[".cursorrules", "プロジェクト設定", "コーディング規約"]}
          />

          <GlossaryTerm
            term="MCP（Model Context Protocol）"
            icon={<Globe className="h-5 w-5 text-primary" />}
            definition="AI が外部ツール（データベース、API、ファイルシステムなど）と連携するための仕組み。プラグインのようなもの。"
            example="MCP を使うと、Claude Code が Notion のデータを読み書きしたり、Google Calendar を操作したりできます。"
            relatedTerms={["プラグイン", "統合", "拡張機能"]}
          />

          <GlossaryTerm
            term="Hooks（フック）"
            icon={<Settings className="h-5 w-5 text-primary" />}
            definition="特定のタイミング（ファイル編集後、コマンド実行前など）で自動的に実行される処理。品質チェックや自動フォーマットに使います。"
            example="TypeScript ファイルを編集後、自動で型チェックを実行する。git commit 前に、自動で Prettier でコードを整形する。"
            relatedTerms={["トリガー", "自動化", "ワークフロー"]}
          />

          <GlossaryTerm
            term="Agent Teams"
            icon={<Zap className="h-5 w-5 text-primary" />}
            definition="複数の AI エージェントが協力してタスクを処理する仕組み（Claude Code の実験的機能）。役割分担で効率化します。"
            example="1つのエージェントがバックエンド、別のエージェントがフロントエンドを担当して、並列で開発を進める。"
            relatedTerms={["マルチエージェント", "並列処理", "協調作業"]}
          />
        </div>
      </section>

      {/* 技術用語 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">開発に関する技術用語</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlossaryTerm
            term="リポジトリ（Repository）"
            icon={<FileCode className="h-5 w-5 text-primary" />}
            definition="プロジェクトのコードやファイルをまとめて管理する場所。Git で バージョン管理します。"
            example="GitHub にアップロードされている1つのプロジェクトが「リポジトリ」です。ローカル（自分のPC）にもリポジトリを作れます。"
            relatedTerms={["Git", "GitHub", "バージョン管理"]}
          />

          <GlossaryTerm
            term="環境変数"
            icon={<Shield className="h-5 w-5 text-primary" />}
            definition="プログラムが参照できる設定値。API キーやデータベース接続情報など、秘密情報を安全に管理するのに使います。"
            example="ANTHROPIC_API_KEY=sk-ant-xxx のように .env ファイルに書きます。コードには直接書かず、環境変数から読み込みます。"
            relatedTerms={[".env", "シークレット", "設定"]}
          />

          <GlossaryTerm
            term="API（Application Programming Interface）"
            icon={<Globe className="h-5 w-5 text-primary" />}
            definition="プログラム同士が通信するための仕組み。Web API の場合、インターネット経由でデータをやり取りします。"
            example="Claude Code は Anthropic API を使って Claude と通信します。OpenWeatherMap API を使えば天気データを取得できます。"
            relatedTerms={["REST API", "エンドポイント", "リクエスト"]}
          />

          <GlossaryTerm
            term="コンテキストウィンドウ"
            icon={<MessageSquare className="h-5 w-5 text-primary" />}
            definition="AI が一度に理解できる文字数の上限。チャット履歴やファイルの内容を含めた総量で判断されます。"
            example="Sonnet 4.5 は 200,000 トークン（約15万語）のコンテキストウィンドウを持ちます。超えると古い情報が削除されます。"
            relatedTerms={["トークン", "メモリ", "履歴"]}
          />
        </div>
      </section>

      {/* よく使う操作 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">よく使う操作</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlossaryTerm
            term="Tab 補完"
            icon={<Zap className="h-5 w-5 text-primary" />}
            definition="コードを書いている最中に、AI が次に書くべきコードを予測して提案する機能。Tab キーで受け入れます。"
            example="function add( まで入力すると、AI が a: number, b: number): number { return a + b } を提案してくれます。"
            relatedTerms={["コード補完", "オートコンプリート", "インライン補完"]}
          />

          <GlossaryTerm
            term="インラインエディット"
            icon={<FileCode className="h-5 w-5 text-primary" />}
            definition="コードの一部を選択して、その場で AI に修正・改善を指示する機能。Cursor では Ctrl+K / Cmd+K で使えます。"
            example="古いコードを選択して「TypeScript に書き換えて」と指示すると、その場でコードが置き換わります。"
            relatedTerms={["リファクタリング", "編集", "書き換え"]}
          />

          <GlossaryTerm
            term="チェックポイント"
            icon={<Settings className="h-5 w-5 text-primary" />}
            definition="AI の編集前の状態を保存しておく機能。間違った変更をした場合に、簡単に元に戻せます。"
            example="Claude Code VSCode 拡張では、AI が編集する前に自動でチェックポイントを作成。「前の状態に戻す」ボタンで巻き戻せます。"
            relatedTerms={["undo", "バックアップ", "復元"]}
          />

          <GlossaryTerm
            term="コミット（Commit）"
            icon={<FileCode className="h-5 w-5 text-primary" />}
            definition="変更をバージョン管理システム（Git）に記録すること。スナップショットを取るイメージです。"
            example="git commit -m 'ログイン機能を追加' のように実行します。こまめにコミットすることで、いつでも過去の状態に戻れます。"
            relatedTerms={["Git", "バージョン管理", "履歴"]}
          />
        </div>
      </section>

      {/* 次のステップ */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>用語を理解したら、次のステップへ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              基本用語を理解したら、前提知識のチェックと学習ロードマップを確認しましょう。
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/getting-started/prerequisites">
                <Button variant="outline">前提知識をチェック</Button>
              </Link>
              <Link href="/getting-started/roadmap">
                <Button variant="outline">学習ロードマップ</Button>
              </Link>
              <Link href="/getting-started">
                <Button variant="primary">ツール選択ガイドに戻る</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
