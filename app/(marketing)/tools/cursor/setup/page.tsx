import type { Metadata } from "next"
import { StepByStep } from "@/components/content/step-by-step"
import { Callout } from "@/components/content/callout"
import type { SetupStep } from "@/types/tools"

export const metadata: Metadata = {
  title: "Cursor セットアップガイド",
  description: "Cursorのダウンロード・インストール・初期設定からVSCodeからの移行まで、ステップバイステップで解説します。",
}

const setupSteps: ReadonlyArray<SetupStep> = [
  {
    stepNumber: 1,
    title: "ダウンロード",
    description: "公式サイト https://www.cursor.com/ にアクセスし、お使いのOSに合わせたインストーラをダウンロードします。",
    callout: {
      type: "info",
      message: "Windows: .exe インストーラ / macOS: .dmg ファイル / Linux: .AppImage または .deb",
    },
  },
  {
    stepNumber: 2,
    title: "インストール",
    description: "ダウンロードしたインストーラを実行し、画面の指示に従ってインストールを完了します。",
  },
  {
    stepNumber: 3,
    title: "初期設定ウィザード",
    description: "初回起動時にセットアップウィザードが表示されます。テーマ選択、キーバインド設定、VSCode拡張機能のインポートを行います。",
    callout: {
      type: "tip",
      message: "VSCodeユーザーは「Import from VSCode」を選択するだけで、拡張機能・テーマ・設定が全て自動インポートされます。",
    },
  },
  {
    stepNumber: 4,
    title: "アカウント作成・ログイン",
    description: "メール、GitHub、またはGoogleアカウントでCursorに登録・ログインします。無料プランで始められます。",
  },
  {
    stepNumber: 5,
    title: "AIモデルの選択",
    description: "使用するデフォルトAIモデルを選択します。初心者にはClaude Sonnet 4.5またはComposerがおすすめです。",
  },
  {
    stepNumber: 6,
    title: "プロジェクトを開く",
    description: "File > Open Folder でプロジェクトフォルダを開きます。Cursorがプロジェクトを自動インデックスします（初回のみ数秒〜数分）。",
  },
  {
    stepNumber: 7,
    title: "Tab 補完を体験",
    description: "任意のファイルを開いてコードを書き始めましょう。灰色のテキストで補完候補が表示されたら、Tab で受け入れ、Esc で拒否します。",
    callout: {
      type: "tip",
      message: "最初は簡単なコードから試してみましょう。AIの補完精度に驚くはずです。",
    },
  },
]

export default function CursorSetupPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-3">Cursor セットアップガイド</h1>
        <p className="text-lg text-muted-foreground">
          ダウンロードからAI機能の初体験まで、ステップバイステップで解説します。
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-2">前提条件</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-500 shrink-0" />
            Windows / macOS / Linux のいずれかのPC
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-500 shrink-0" />
            インターネット接続
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-500 shrink-0" />
            メール、GitHub、またはGoogleアカウント（登録用）
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">セットアップ手順</h2>
        <StepByStep steps={setupSteps} />
      </section>

      <Callout type="warning" title="VSCodeとの共存">
        CursorとVSCodeは同時にインストール・実行可能です。ただし、GitHub Copilot等のAI系拡張機能はCursorのAI機能と競合する可能性があるため、Cursor側では無効化することをおすすめします。
      </Callout>
    </div>
  )
}
