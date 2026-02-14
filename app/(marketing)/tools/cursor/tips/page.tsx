import type { Metadata } from "next"
import { Callout } from "@/components/content/callout"
import { CodeBlock } from "@/components/content/code-block"

export const metadata: Metadata = {
  title: "Cursor ベストプラクティス - 効果的な使い方とよくある間違い",
  description: "Cursorを最大限活用するためのベストプラクティス、効果的なプロンプトの書き方、よくある間違いとその対策を解説。",
}

export default function CursorTipsPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-3">Cursor ベストプラクティス</h1>
        <p className="text-lg text-muted-foreground">
          Cursorを最大限活用するためのヒントとよくある間違いを紹介します。
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-6">よくある間違い</h2>

        <div className="space-y-8">
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-lg font-semibold mb-3">間違い 1: コンテキストを与えずに質問する</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4">
                <p className="text-sm font-semibold text-red-600 dark:text-red-400 mb-2">悪い例</p>
                <p className="text-sm font-mono">&quot;バグを直して&quot;</p>
              </div>
              <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4">
                <p className="text-sm font-semibold text-green-600 dark:text-green-400 mb-2">良い例</p>
                <p className="text-sm font-mono">&quot;@file:src/auth/login.ts の handleSubmit関数で、パスワードが空の場合にバリデーションエラーが表示されないバグを修正して&quot;</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              AIは具体的なファイル、関数、問題の説明がないと的外れな回答になります。@シンボルでファイルを明示し、問題を具体的に記述しましょう。
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-lg font-semibold mb-3">間違い 2: 一度に大きすぎる変更を依頼する</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4">
                <p className="text-sm font-semibold text-red-600 dark:text-red-400 mb-2">悪い例</p>
                <p className="text-sm font-mono">&quot;このアプリをゼロから全部書き直して&quot;</p>
              </div>
              <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4">
                <p className="text-sm font-semibold text-green-600 dark:text-green-400 mb-2">良い例</p>
                <p className="text-sm font-mono">&quot;まず認証モジュールをリファクタリングして。具体的には: 1. auth.tsをauth/フォルダに分割 2. JWTトークンの検証ロジックを分離&quot;</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              小さなステップに分割することで、各ステップの品質を確認でき、問題が発生しても切り戻しが容易です。
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-lg font-semibold mb-3">間違い 3: AIの出力を確認せずに全て受け入れる</h3>
            <p className="text-sm text-muted-foreground mb-3">
              AIの変更は必ず差分を確認してからApplyしましょう。テストを実行して動作確認し、Gitで変更前にコミットしておくと安全です。
            </p>
            <Callout type="warning">
              AIが生成するコードは常に正しいとは限りません。特にビジネスロジックやセキュリティに関わる部分は慎重にレビューしましょう。
            </Callout>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-lg font-semibold mb-3">間違い 4: .cursorrules を設定しない</h3>
            <p className="text-sm text-muted-foreground mb-3">
              プロジェクト固有の規約がないと、AIは一般的なスタイルでコードを生成します。.cursorrules でプロジェクトの技術スタック、命名規則、アーキテクチャを記述しましょう。
            </p>
            <CodeBlock
              title=".cursorrules の例"
              language="markdown"
              code={`# プロジェクト規約
## 技術スタック
- Next.js 15 + TypeScript + Tailwind CSS
## コーディング規約
- TypeScript strict モードを使用
- 関数コンポーネントとReact Hooksのみ使用
- 全ての関数にJSDocコメントを記述
## 禁止事項
- any 型の使用禁止
- console.log の本番コードでの使用禁止`}
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">プロンプトテンプレート</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">バグ修正</h3>
            <CodeBlock
              language="markdown"
              code={`## 問題
@file:src/components/UserList.tsx で、ユーザーリストの
ページネーションが2ページ目以降で動作しない。

## 期待する動作
ページ番号をクリックすると該当ページのデータが表示される。

## 再現手順
1. /users ページを開く
2. ページ2のボタンをクリック
3. リストが更新されない

## 技術スタック
Next.js 14, React Query, REST API`}
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">新機能実装</h3>
            <CodeBlock
              language="markdown"
              code={`## タスク
ダークモード切り替え機能を実装して。

## 要件
- ヘッダーにトグルボタンを配置
- ユーザーの設定をlocalStorageに保存
- システム設定をデフォルトとする
- Tailwind CSS の dark: プレフィックスを使用

## 参照ファイル
@file:src/components/Header.tsx
@file:tailwind.config.ts

## 制約
- 既存のスタイリングを壊さないこと`}
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">開発フロー</h2>
        <div className="rounded-lg border border-border bg-card p-6">
          <ol className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400 text-xs font-bold">1</span>
              <div><strong>計画</strong>: チャットでAIとアーキテクチャを議論</div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400 text-xs font-bold">2</span>
              <div><strong>.cursorrules 作成</strong>: プロジェクト規約を定義</div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400 text-xs font-bold">3</span>
              <div><strong>骨格作成</strong>: Composer/Agentで基本構造を生成</div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400 text-xs font-bold">4</span>
              <div><strong>段階的実装</strong>: Ctrl+Kとチャットで各機能を実装</div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400 text-xs font-bold">5</span>
              <div><strong>レビュー</strong>: AIにコードレビューを依頼</div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400 text-xs font-bold">6</span>
              <div><strong>テスト</strong>: AIにテストコード生成を依頼</div>
            </li>
          </ol>
        </div>
      </section>
    </div>
  )
}
