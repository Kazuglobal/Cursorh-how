import type { Metadata } from "next"
import { Callout } from "@/components/content/callout"
import { CodeBlock } from "@/components/content/code-block"

export const metadata: Metadata = {
  title: "Claude Code ベストプラクティス",
  description: "Claude Codeを最大限活用するためのベストプラクティス、プロンプトテンプレート、よくある間違いとその対策。",
}

export default function ClaudeCodeTipsPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-3">Claude Code ベストプラクティス</h1>
        <p className="text-lg text-muted-foreground">
          Claude Codeを最大限活用するためのヒントを紹介します。
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-6">よくある間違い</h2>

        <div className="space-y-8">
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-lg font-semibold mb-3">間違い 1: CLAUDE.md を書かない</h3>
            <p className="text-sm text-muted-foreground mb-3">
              CLAUDE.mdがないと、Claude Codeはプロジェクトの規約やフレームワークの使い方を推測に頼ることになります。
            </p>
            <Callout type="tip">
              プロジェクトルートに CLAUDE.md を作成し、技術スタック、コーディング規約、テスト方針を明記しましょう。
            </Callout>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-lg font-semibold mb-3">間違い 2: パーミッションを毎回確認する</h3>
            <p className="text-sm text-muted-foreground mb-3">
              安全な操作（git status, npm test 等）を毎回承認するのは非効率です。
            </p>
            <CodeBlock
              title="settings.json での事前許可"
              language="json"
              code={`{
  "permissions": {
    "allow": [
      "Bash(git status:*)",
      "Bash(npm test:*)",
      "Read(**)"
    ],
    "deny": [
      "Bash(rm -rf:*)",
      "Bash(git push --force:*)"
    ]
  }
}`}
            />
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-lg font-semibold mb-3">間違い 3: 一度に大量の変更を依頼する</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4">
                <p className="text-sm font-semibold text-red-600 dark:text-red-400 mb-2">悪い例</p>
                <p className="text-sm font-mono">&quot;全部一気にやって&quot;</p>
              </div>
              <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4">
                <p className="text-sm font-semibold text-green-600 dark:text-green-400 mb-2">良い例</p>
                <p className="text-sm font-mono">&quot;まず型定義を作って、次に実装して、最後にテストを書いて&quot;</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              段階的に進めることで、品質を確認しながら安全に進められます。
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-lg font-semibold mb-3">間違い 4: コンテキストが大きくなりすぎる</h3>
            <p className="text-sm text-muted-foreground mb-3">
              長時間のセッションでコンテキストウィンドウが埋まると、古い指示を忘れてしまいます。
            </p>
            <Callout type="tip">
              /compact で手動コンパクション、またはトピックが変わったら新しいセッションを開始しましょう。
            </Callout>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-lg font-semibold mb-3">間違い 5: 安全でないコマンドを許可する</h3>
            <p className="text-sm text-muted-foreground mb-3">
              rm -rf * や git push --force を許可すると取り返しのつかないことになります。
            </p>
            <Callout type="danger">
              permissions.deny で危険なコマンドを明示的にブロックしましょう。
            </Callout>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">プロンプトテンプレート</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">バグ修正</h3>
            <CodeBlock
              language="text"
              code={`[ファイル名] で [症状] が発生している。
原因を調査して修正して。
修正後、関連するテストを実行して確認して。`}
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">新機能追加</h3>
            <CodeBlock
              language="text"
              code={`[機能の説明] を実装して。
要件:
- [要件1]
- [要件2]
技術制約:
- [制約1]
テストも書いて。`}
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">リファクタリング</h3>
            <CodeBlock
              language="text"
              code={`[ファイル名] をリファクタリングして。
目標:
- 関数を50行以下に分割
- 重複コードを抽出
- エラーハンドリングを追加
既存のテストが通ることを確認して。`}
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">コスト最適化のヒント</h2>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-4 flex items-start gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-xs font-bold">1</span>
            <div>
              <strong>モデル選択</strong>: 単純なタスクにはHaiku 4.5、通常開発にはSonnet 4.5、複雑な推論にはOpus 4.6
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 flex items-start gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-xs font-bold">2</span>
            <div>
              <strong>CLAUDE.mdの活用</strong>: 適切な指示で不要なやり取りを削減
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 flex items-start gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-xs font-bold">3</span>
            <div>
              <strong>コンパクションの管理</strong>: 長いセッションを適切に区切る
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 flex items-start gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-xs font-bold">4</span>
            <div>
              <strong>/cost で確認</strong>: 現在のセッションコストを定期的にチェック
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
