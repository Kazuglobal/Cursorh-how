import type { Metadata } from "next"
import { cursorFeatures } from "@/lib/tools-data"
import { FeatureCard } from "@/components/content/feature-card"
import { Callout } from "@/components/content/callout"


export const metadata: Metadata = {
  title: "Cursor 機能詳細 - Tab補完・チャット・Agent モード",
  description: "CursorのAI機能を詳しく解説。Tab補完、Cmd+K、AIチャット、Composer、Agentモード、コンテキスト管理の使い方。",
}

export default function CursorFeaturesPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-3">Cursor 機能詳細</h1>
        <p className="text-lg text-muted-foreground">
          Cursorが提供する全てのAI機能を詳しく解説します。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cursorFeatures.map((feature) => (
          <FeatureCard
            key={feature.id}
            icon={feature.icon}
            title={feature.name}
            description={feature.description}
            accentColor="cursor-accent"
          />
        ))}
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-4">Tab 補完（Cursor Tab）</h2>
        <p className="text-muted-foreground mb-4">
          Cursorの最も基本的なAI機能です。コードを書いている最中に、AIがリアルタイムで次のコードを予測・提案します。
        </p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-2 text-left font-semibold">操作</th>
                <th className="px-4 py-2 text-left font-semibold">キー</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-2">補完を受け入れ</td>
                <td className="px-4 py-2"><kbd className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">Tab</kbd></td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-2">補完を拒否</td>
                <td className="px-4 py-2"><kbd className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">Esc</kbd></td>
              </tr>
              <tr>
                <td className="px-4 py-2">単語単位で受け入れ</td>
                <td className="px-4 py-2"><kbd className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">Ctrl + →</kbd> / <kbd className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">Cmd + →</kbd></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Cmd+K（インラインエディット）</h2>
        <p className="text-muted-foreground mb-4">
          選択したコードに対して自然言語で指示を出し、AIにその場で編集させる機能です。
        </p>
        <Callout type="tip" title="活用例">
          「この関数をTypeScriptに変換して」「パフォーマンスを改善して」「コメントを日本語で追加して」「エラーハンドリングを追加して」
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">コンテキスト参照（@シンボル）</h2>
        <p className="text-muted-foreground mb-4">
          チャットやComposerで、AIに参照してほしいファイルやコードを明示的に指定できます。
        </p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-2 text-left font-semibold">記法</th>
                <th className="px-4 py-2 text-left font-semibold">参照先</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border"><td className="px-4 py-2 font-mono text-sm">@file</td><td className="px-4 py-2">特定のファイル</td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2 font-mono text-sm">@folder</td><td className="px-4 py-2">特定のフォルダ</td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2 font-mono text-sm">@code</td><td className="px-4 py-2">関数やクラスなどのシンボル</td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2 font-mono text-sm">@web</td><td className="px-4 py-2">ウェブ検索結果</td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2 font-mono text-sm">@docs</td><td className="px-4 py-2">ドキュメント</td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2 font-mono text-sm">@git</td><td className="px-4 py-2">Git差分・コミット履歴</td></tr>
              <tr><td className="px-4 py-2 font-mono text-sm">@codebase</td><td className="px-4 py-2">プロジェクト全体</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">モデル選択</h2>
        <p className="text-muted-foreground mb-4">
          Cursorは複数のAIモデルに対応しています。タスクに応じて使い分けましょう。
        </p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-2 text-left font-semibold">モデル</th>
                <th className="px-4 py-2 text-left font-semibold">推奨用途</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border"><td className="px-4 py-2">Claude Opus 4.6</td><td className="px-4 py-2">複雑な推論、大規模リファクタリング</td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2">Claude Sonnet 4.5</td><td className="px-4 py-2">日常的なコーディング、リファクタリング</td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2">GPT-5.3 / GPT-4o</td><td className="px-4 py-2">一般的なコーディング、チャット</td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2">Composer</td><td className="px-4 py-2">コーディング全般（Cursor独自、高速）</td></tr>
              <tr><td className="px-4 py-2">cursor-small</td><td className="px-4 py-2">Tab補完、高速応答</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">主要キーボードショートカット</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-2 text-left font-semibold">操作</th>
                <th className="px-4 py-2 text-left font-semibold">Windows / Linux</th>
                <th className="px-4 py-2 text-left font-semibold">macOS</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border"><td className="px-4 py-2">インラインエディット</td><td className="px-4 py-2"><kbd className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">Ctrl + K</kbd></td><td className="px-4 py-2"><kbd className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">Cmd + K</kbd></td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2">AIチャットを開く</td><td className="px-4 py-2"><kbd className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">Ctrl + L</kbd></td><td className="px-4 py-2"><kbd className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">Cmd + L</kbd></td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2">Composerを開く</td><td className="px-4 py-2"><kbd className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">Ctrl + I</kbd></td><td className="px-4 py-2"><kbd className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">Cmd + I</kbd></td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2">コマンドパレット</td><td className="px-4 py-2"><kbd className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">Ctrl + Shift + P</kbd></td><td className="px-4 py-2"><kbd className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">Cmd + Shift + P</kbd></td></tr>
              <tr><td className="px-4 py-2">ファイル検索</td><td className="px-4 py-2"><kbd className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">Ctrl + P</kbd></td><td className="px-4 py-2"><kbd className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">Cmd + P</kbd></td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
