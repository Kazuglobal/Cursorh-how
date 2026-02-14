import type { Metadata } from "next"
import { StepByStep } from "@/components/content/step-by-step"
import { Callout } from "@/components/content/callout"
import { CodeBlock } from "@/components/content/code-block"
import type { SetupStep } from "@/types/tools"

export const metadata: Metadata = {
  title: "Claude Code セットアップガイド - CLI・VSCode・Web・JetBrains対応",
  description: "Claude Codeのインストール・認証設定をプラットフォーム別に解説。CLI、VSCode拡張機能、Web版、JetBrains IDE、モバイルアプリのセットアップ手順を網羅。",
}

const cliSetupSteps: ReadonlyArray<SetupStep> = [
  {
    stepNumber: 1,
    title: "Node.js のインストール確認",
    description: "Claude Code CLI には Node.js 18 以上が必要です。以下のコマンドでバージョンを確認してください。",
    code: "node --version\n# v18.0.0 以上であればOK",
    codeLanguage: "bash",
    callout: {
      type: "info",
      message: "Node.js がインストールされていない場合は https://nodejs.org/ からインストールしてください。",
    },
  },
  {
    stepNumber: 2,
    title: "Claude Code のインストール",
    description: "npm（Node.js のパッケージマネージャ）を使ってグローバルインストールします。",
    code: "npm install -g @anthropic-ai/claude-code",
    codeLanguage: "bash",
  },
  {
    stepNumber: 3,
    title: "インストールの確認",
    description: "正常にインストールされたか確認します。",
    code: "claude --version",
    codeLanguage: "bash",
  },
  {
    stepNumber: 4,
    title: "認証の設定",
    description: "以下のいずれかの方法で認証を設定します。最も手軽なのは Claude Pro/Max サブスクリプション経由（OAuth認証）です。",
    code: "# 方法1: Claude Pro/Max サブスクリプション（OAuth認証）\nclaude\n# ブラウザが開くので Anthropic アカウントでログイン\n\n# 方法2: API キー（従量課金）\nexport ANTHROPIC_API_KEY=\"sk-ant-api03-xxxxx\"",
    codeLanguage: "bash",
    callout: {
      type: "warning",
      message: "APIキーを環境変数に設定する場合、.envファイルに保存してGitにコミットしないよう注意してください。",
    },
  },
  {
    stepNumber: 5,
    title: "プロジェクトディレクトリで起動",
    description: "プロジェクトのディレクトリに移動してから Claude Code を起動します。",
    code: "cd ~/my-project\nclaude",
    codeLanguage: "bash",
  },
  {
    stepNumber: 6,
    title: "最初の指示を出す",
    description: "Claude Code が起動したら、自然言語で指示を出してみましょう。",
    code: "> このプロジェクトの構造を教えて\n> package.json の依存関係を説明して\n> src/App.tsx を読んで、改善点を教えて",
    codeLanguage: "text",
    callout: {
      type: "tip",
      message: "最初は読み取り専用の質問から始めて、Claude Code の動作に慣れましょう。",
    },
  },
]

const vscodeSetupSteps: ReadonlyArray<SetupStep> = [
  {
    stepNumber: 1,
    title: "拡張機能のインストール",
    description: "VSCode の拡張機能パネル（Ctrl+Shift+X / Cmd+Shift+X）を開き、「Claude Code」で検索してインストールします。発行者が「Anthropic」であることを確認してください。",
    callout: {
      type: "info",
      message: "拡張機能ID: anthropic.claude-code。CLI版が先にインストール済みの場合、VSCode拡張が自動検出してパスを設定します。",
    },
  },
  {
    stepNumber: 2,
    title: "Claude Code パネルを開く",
    description: "インストール後、サイドバーに Claude Code アイコンが表示されます。クリックするとチャットパネルが開きます。またはコマンドパレット（Ctrl+Shift+P / Cmd+Shift+P）で「Claude Code: Open」を実行します。",
  },
  {
    stepNumber: 3,
    title: "認証",
    description: "初回起動時にブラウザが開きます。Anthropic アカウント（Pro/Max/Team/Enterprise）でログインすると認証完了です。CLI版で認証済みの場合は自動的に引き継がれます。",
  },
  {
    stepNumber: 4,
    title: "プロジェクトを開いて利用開始",
    description: "VSCode でプロジェクトフォルダを開いた状態で、Claude Code パネルに指示を入力します。ファイル変更はネイティブ diff で表示され、チェックポイントによるロールバックも可能です。",
    callout: {
      type: "tip",
      message: "VSCode拡張ではファイル変更がインラインdiffで表示され、変更の受け入れ/拒否をGUIで操作できます。サブエージェントの動作状況もパネルで確認可能です。",
    },
  },
]

const webSetupSteps: ReadonlyArray<SetupStep> = [
  {
    stepNumber: 1,
    title: "claude.ai にアクセス",
    description: "ブラウザで claude.ai にアクセスし、Anthropic アカウントでログインします。Pro / Max / Team / Enterprise プランが必要です。",
  },
  {
    stepNumber: 2,
    title: "GitHub リポジトリを接続",
    description: "初回利用時に GitHub アカウントの連携を求められます。対象リポジトリへのアクセスを許可してください。",
    callout: {
      type: "info",
      message: "Web版は GitHub リポジトリとの連携が必須です。ローカルフォルダのみのプロジェクトには CLI版 または VSCode拡張 をお使いください。",
    },
  },
  {
    stepNumber: 3,
    title: "タスクを入力して実行",
    description: "チャットインターフェースにタスクを入力します。Claude がクラウドサンドボックス上でコードを読み書きし、ターミナルコマンドも実行します。完了したら自動でPRを作成できます。",
    callout: {
      type: "tip",
      message: "Web版では最大25タスクを並列実行可能。「バックグラウンドで実行」を選択すると、ブラウザを閉じても作業が継続されます。",
    },
  },
]

const jetbrainsSetupSteps: ReadonlyArray<SetupStep> = [
  {
    stepNumber: 1,
    title: "プラグインのインストール",
    description: "Settings > Plugins > Marketplace で「Claude Code」を検索してインストールします。IntelliJ IDEA、WebStorm、PyCharm、GoLand 等に対応しています。",
  },
  {
    stepNumber: 2,
    title: "IDE を再起動",
    description: "プラグインインストール後、IDE を再起動します。ツールウィンドウに Claude Code パネルが追加されます。",
  },
  {
    stepNumber: 3,
    title: "認証して利用開始",
    description: "パネルを開くとブラウザ認証が起動します。ログイン完了後、プロジェクトを開いた状態で指示を入力できます。ネイティブ diff 表示に対応しています。",
    callout: {
      type: "warning",
      message: "JetBrains 版は現在ベータです。一部機能が CLI版と異なる場合があります。",
    },
  },
]

export default function ClaudeCodeSetupPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-3">Claude Code セットアップガイド</h1>
        <p className="text-lg text-muted-foreground">
          CLI・VSCode・Web・JetBrains・モバイル、各プラットフォーム別にインストールから初回利用までを解説します。
        </p>
      </div>

      <Callout type="info" title="どのプラットフォームを選ぶ？">
        <strong>CLI</strong>: 最もフル機能。Agent Teams・パイプ連携・CI/CD対応。ターミナル操作に慣れた方に。<br />
        <strong>VSCode 拡張</strong>: GUI でファイル差分やチェックポイントを視覚的に操作したい方に。<br />
        <strong>Web版</strong>: インストール不要。GitHub リポジトリに対してクラウド上で並列タスク実行。<br />
        <strong>JetBrains</strong>: IntelliJ / WebStorm / PyCharm ユーザーに。ベータ版。<br />
        <strong>モバイル</strong>: iOS アプリで Web版セッションの監視・操作。外出先からのタスク管理に。
      </Callout>

      <section>
        <h2 className="text-2xl font-bold mb-2">共通の前提条件</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
            Anthropic アカウント（Pro $20/月〜、Max $100-200/月、Team、Enterprise のいずれか）
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
            または Anthropic API キー（従量課金。CLI / VSCode / JetBrains で利用可能）
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
            インターネット接続（API通信のため必須）
          </li>
        </ul>
      </section>

      {/* CLI セットアップ */}
      <section>
        <div className="flex items-center gap-3 mb-2">
          <span className="inline-flex items-center rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-3 py-1 text-xs font-medium">正式版</span>
          <h2 className="text-2xl font-bold">1. CLI（ターミナル）セットアップ</h2>
        </div>
        <p className="text-muted-foreground mb-4">
          最もフル機能なプラットフォーム。CLAUDE.md、Hooks、MCP、Agent Teams など全機能に対応します。
        </p>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">システム要件</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
              OS: macOS 12+、Ubuntu 20.04+、Windows 10+（WSL推奨、ネイティブも対応）
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
              Node.js 18 以上
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
              RAM: 4GB 以上推奨
            </li>
          </ul>
        </div>

        <StepByStep steps={cliSetupSteps} />
      </section>

      {/* VSCode 拡張機能セットアップ */}
      <section>
        <div className="flex items-center gap-3 mb-2">
          <span className="inline-flex items-center rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-3 py-1 text-xs font-medium">正式版</span>
          <h2 className="text-2xl font-bold">2. VSCode 拡張機能セットアップ</h2>
        </div>
        <p className="text-muted-foreground mb-4">
          ネイティブ diff 表示、チェックポイント、サブエージェントパネルなど、GUI で直感的に操作できます。
        </p>
        <StepByStep steps={vscodeSetupSteps} />

        <Callout type="tip" title="VSCode 拡張のキーボードショートカット">
          <code className="text-xs bg-muted px-1 py-0.5 rounded">Cmd+Esc</code> / <code className="text-xs bg-muted px-1 py-0.5 rounded">Ctrl+Esc</code>: Claude Code パネルの開閉<br />
          <code className="text-xs bg-muted px-1 py-0.5 rounded">Cmd+Shift+P</code> → 「Claude Code」: 全コマンド一覧
        </Callout>
      </section>

      {/* Web版セットアップ */}
      <section>
        <div className="flex items-center gap-3 mb-2">
          <span className="inline-flex items-center rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 px-3 py-1 text-xs font-medium">プレビュー</span>
          <h2 className="text-2xl font-bold">3. Web版セットアップ</h2>
        </div>
        <p className="text-muted-foreground mb-4">
          インストール不要。ブラウザから GitHub リポジトリに対してクラウド上でタスクを実行します。
        </p>
        <StepByStep steps={webSetupSteps} />
      </section>

      {/* JetBrains セットアップ */}
      <section>
        <div className="flex items-center gap-3 mb-2">
          <span className="inline-flex items-center rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 px-3 py-1 text-xs font-medium">ベータ</span>
          <h2 className="text-2xl font-bold">4. JetBrains IDE セットアップ</h2>
        </div>
        <p className="text-muted-foreground mb-4">
          IntelliJ IDEA、WebStorm、PyCharm、GoLand などの JetBrains IDE に対応。ネイティブ diff 表示をサポートします。
        </p>
        <StepByStep steps={jetbrainsSetupSteps} />
      </section>

      {/* モバイルアプリ */}
      <section>
        <div className="flex items-center gap-3 mb-2">
          <span className="inline-flex items-center rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-3 py-1 text-xs font-medium">正式版</span>
          <h2 className="text-2xl font-bold">5. iOS モバイルアプリ</h2>
        </div>
        <p className="text-muted-foreground mb-4">
          Web版のセッションをモバイルから監視・操作できます。外出先からタスクの進捗確認や追加指示が可能です。
        </p>
        <div className="rounded-lg border border-border bg-card p-6">
          <ol className="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
            <li>App Store で「Claude」を検索してダウンロード</li>
            <li>Anthropic アカウントでサインイン（Pro / Max / Team / Enterprise）</li>
            <li>Web版と同じセッションにアクセスし、進捗確認や指示の追加が可能</li>
          </ol>
        </div>
        <Callout type="info">
          モバイルアプリは Web版セッションとの連携が主な用途です。新規にコーディングタスクを開始する場合は CLI または VSCode 拡張をお使いください。
        </Callout>
      </section>

      {/* 認証方法の比較 */}
      <section>
        <h2 className="text-2xl font-bold mb-4">認証方法の比較</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-2 text-left font-semibold">方法</th>
                <th className="px-4 py-2 text-left font-semibold">料金形態</th>
                <th className="px-4 py-2 text-left font-semibold">対応プラットフォーム</th>
                <th className="px-4 py-2 text-left font-semibold">おすすめの人</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border"><td className="px-4 py-2">API キー</td><td className="px-4 py-2">従量課金</td><td className="px-4 py-2">CLI / VSCode / JetBrains</td><td className="px-4 py-2">使用量をコントロールしたい人</td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2">Claude Pro ($20/月)</td><td className="px-4 py-2">サブスクリプション</td><td className="px-4 py-2">全プラットフォーム</td><td className="px-4 py-2">気軽に始めたい人</td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2">Claude Max ($100-200/月)</td><td className="px-4 py-2">サブスクリプション</td><td className="px-4 py-2">全プラットフォーム</td><td className="px-4 py-2">ヘビーユーザー</td></tr>
              <tr><td className="px-4 py-2">Bedrock / Vertex AI</td><td className="px-4 py-2">クラウド課金</td><td className="px-4 py-2">CLI / VSCode / JetBrains</td><td className="px-4 py-2">企業ユーザー</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 基本設定 */}
      <section>
        <h2 className="text-2xl font-bold mb-4">基本設定（CLI / VSCode / JetBrains 共通）</h2>
        <p className="text-muted-foreground mb-4">
          Claude Code は CLAUDE.md ファイルでプロジェクト固有の指示を定義できます。プロジェクトルートに作成すると、全プラットフォームで共有されます。
        </p>
        <CodeBlock
          title="CLAUDE.md の例"
          language="markdown"
          code={`# プロジェクト指示

## 技術スタック
- Next.js 15 (App Router)
- TypeScript (strict mode)
- Tailwind CSS

## コーディング規約
- 関数コンポーネントを使用
- const を優先、let は最小限
- 日本語コメントで記述

## テスト
- Vitest でユニットテスト
- npm run test で実行`}
        />
        <Callout type="tip">
          CLAUDE.md はリポジトリにコミットしてチーム全体で共有できます。個人用の設定は ~/.claude/CLAUDE.md に置くことも可能です。
        </Callout>
      </section>

      {/* プラットフォーム別の使い分け */}
      <section>
        <h2 className="text-2xl font-bold mb-4">プラットフォームの使い分け</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-2 text-left font-semibold">やりたいこと</th>
                <th className="px-4 py-2 text-left font-semibold">おすすめ</th>
                <th className="px-4 py-2 text-left font-semibold">理由</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border"><td className="px-4 py-2">大規模リファクタリング</td><td className="px-4 py-2 font-medium text-amber-600 dark:text-amber-400">CLI</td><td className="px-4 py-2">全機能対応、パイプ連携、Agent Teams</td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2">日常的なコーディング</td><td className="px-4 py-2 font-medium text-amber-600 dark:text-amber-400">VSCode 拡張</td><td className="px-4 py-2">diff 表示、チェックポイント、GUI 操作</td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2">複数タスクを並列実行</td><td className="px-4 py-2 font-medium text-amber-600 dark:text-amber-400">Web版</td><td className="px-4 py-2">最大25並列、バックグラウンド実行</td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2">CI/CD パイプラインに組み込む</td><td className="px-4 py-2 font-medium text-amber-600 dark:text-amber-400">CLI</td><td className="px-4 py-2">ヘッドレス実行、パイプ入出力対応</td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2">IntelliJ / PyCharm で開発</td><td className="px-4 py-2 font-medium text-amber-600 dark:text-amber-400">JetBrains</td><td className="px-4 py-2">IDE を離れずに利用可能</td></tr>
              <tr><td className="px-4 py-2">外出先からの進捗確認</td><td className="px-4 py-2 font-medium text-amber-600 dark:text-amber-400">モバイル</td><td className="px-4 py-2">Web版セッションの監視・操作</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <Callout type="tip" title="Cursor との併用">
        Cursor の AI 機能と Claude Code を併用することも可能です。日常のコーディングは Cursor、大規模な変更は Claude Code（CLI または VSCode 拡張）という使い分けが効果的です。
      </Callout>
    </div>
  )
}
