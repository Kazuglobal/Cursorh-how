import type { Metadata } from "next"
import { StepByStep } from "@/components/content/step-by-step"
import { Callout } from "@/components/content/callout"
import type { SetupStep } from "@/types/tools"

export const metadata: Metadata = {
  title: "Manus AI セットアップガイド",
  description: "Manus AIのアカウント作成から最初のタスク実行まで、ステップバイステップで解説します。",
}

const setupSteps: ReadonlyArray<SetupStep> = [
  {
    stepNumber: 1,
    title: "公式サイトにアクセス",
    description: "https://manus.im にアクセスします。Webブラウザさえあれば利用可能です。デスクトップアプリのインストールは不要です。",
  },
  {
    stepNumber: 2,
    title: "アカウント作成",
    description: "メールアドレスまたはGoogleアカウントでサインアップします。",
    callout: {
      type: "info",
      message: "以前は招待制でしたが、現在は段階的に一般開放されています。新規登録時に無料のトライアルクレジットが付与されます。",
    },
  },
  {
    stepNumber: 3,
    title: "無料クレジットを確認",
    description: "ログイン後、ダッシュボードで付与された無料クレジット数を確認します。このクレジットで数回のタスクを無料で実行できます。",
  },
  {
    stepNumber: 4,
    title: "最初のタスクを実行",
    description: "チャット欄に自然言語でタスクを記述します。最初は簡単なタスクから試しましょう。",
    callout: {
      type: "tip",
      message: "例: 「Pythonで九九の表を作って」「東京の天気予報を調べてまとめて」",
    },
  },
  {
    stepNumber: 5,
    title: "実行過程を観察",
    description: "Manus AIがタスクを実行する過程をリアルタイムで観察できます。ToDoリスト形式で進捗が表示され、ブラウザ操作の様子も確認できます。",
  },
  {
    stepNumber: 6,
    title: "結果をダウンロード",
    description: "タスク完了後、生成されたファイル（Excel、PDF等）をダウンロードできます。結果を確認し、必要に応じて修正の指示を出しましょう。",
  },
]

export default function ManusSetupPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-3">Manus AI セットアップガイド</h1>
        <p className="text-lg text-muted-foreground">
          アカウント作成から最初のタスク実行まで、ステップバイステップで解説します。
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-2">前提条件</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-500 shrink-0" />
            Webブラウザ（Chrome、Firefox、Safari等）
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-500 shrink-0" />
            インターネット接続
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-500 shrink-0" />
            メールまたはGoogleアカウント（登録用）
          </li>
        </ul>
        <Callout type="tip" title="インストール不要">
          Manus AIはWebアプリなので、ソフトウェアのインストールは不要です。ブラウザからすぐに始められます。
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">セットアップ手順</h2>
        <StepByStep steps={setupSteps} />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">クレジットの仕組み</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-2 text-left font-semibold">タスクの種類</th>
                <th className="px-4 py-2 text-left font-semibold">消費クレジット（目安）</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border"><td className="px-4 py-2">簡単な質問</td><td className="px-4 py-2">1〜2 クレジット</td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2">Web検索 + まとめ</td><td className="px-4 py-2">5〜10 クレジット</td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2">複雑なリサーチ + レポート作成</td><td className="px-4 py-2">10〜30 クレジット以上</td></tr>
              <tr><td className="px-4 py-2">コード生成 + 実行</td><td className="px-4 py-2">5〜15 クレジット</td></tr>
            </tbody>
          </table>
        </div>
        <Callout type="warning" title="クレジット節約のコツ">
          タスクを具体的に記述するとクレジットの無駄遣いを防げます。曖昧な指示はリトライが発生し、消費クレジットが増えてしまいます。
        </Callout>
      </section>
    </div>
  )
}
