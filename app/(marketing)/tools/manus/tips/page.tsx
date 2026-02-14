import type { Metadata } from "next"
import { Callout } from "@/components/content/callout"

export const metadata: Metadata = {
  title: "Manus AI ベストプラクティス",
  description: "Manus AIを効果的に使うためのタスク指示のコツ、よくある失敗と対策、クレジット最適化のヒント。",
}

export default function ManusTipsPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-3">Manus AI ベストプラクティス</h1>
        <p className="text-lg text-muted-foreground">
          Manus AIを効果的に使うためのヒントとよくある失敗を紹介します。
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-6">効果的なタスク指示の書き方</h2>

        <div className="space-y-6">
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-2 text-left font-semibold">コツ</th>
                  <th className="px-4 py-2 text-left font-semibold">説明</th>
                  <th className="px-4 py-2 text-left font-semibold">例</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="px-4 py-2 font-medium">具体的なゴール</td>
                  <td className="px-4 py-2">最終成果物を明示</td>
                  <td className="px-4 py-2">「Excelファイルで」「PDFレポートで」</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2 font-medium">項目を列挙</td>
                  <td className="px-4 py-2">必要な情報を箇条書き</td>
                  <td className="px-4 py-2">「名前、価格、URL」</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2 font-medium">形式を指定</td>
                  <td className="px-4 py-2">出力形式を明記</td>
                  <td className="px-4 py-2">「表形式で」「グラフ付きで」</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2 font-medium">範囲を絞る</td>
                  <td className="px-4 py-2">スコープを限定</td>
                  <td className="px-4 py-2">「東京都内」「2024年以降」</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">ステップを示す</td>
                  <td className="px-4 py-2">手順を提示</td>
                  <td className="px-4 py-2">「まず検索し、次に比較し...」</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4">
              <p className="text-sm font-semibold text-green-600 dark:text-green-400 mb-2">良い指示</p>
              <p className="text-sm">
                「東京都内のコワーキングスペース10箇所を調査し、以下の項目を含むExcelファイルを作成してください:
                名称、所在地（最寄り駅）、月額料金、営業時間、WiFi速度（情報があれば）。
                料金の安い順にソートしてください。」
              </p>
            </div>
            <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4">
              <p className="text-sm font-semibold text-red-600 dark:text-red-400 mb-2">悪い指示</p>
              <p className="text-sm">
                「コワーキングスペースについて調べて」
                <br />
                <span className="text-muted-foreground mt-1 block">
                  → 何をどこまで、どの形式で求めているか不明
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">よくある失敗と対策</h2>

        <div className="space-y-6">
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h3 className="font-semibold mb-2">情報が古い</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>原因:</strong> Webの情報が更新されていない場合がある
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>対策:</strong> 「最新の情報を確認して」「2024年以降のデータに限定して」と追記する
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h3 className="font-semibold mb-2">タスクが途中で止まる</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>原因:</strong> 指示が複雑すぎてステップ数が多くなりすぎる
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>対策:</strong> タスクを分割して段階的に依頼する
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h3 className="font-semibold mb-2">期待と異なる出力</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>原因:</strong> 指示が曖昧で解釈の余地が大きい
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>対策:</strong> 出力形式・項目・ソート順を具体的に指定する
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h3 className="font-semibold mb-2">クレジット消費が多い</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>原因:</strong> 不必要に複雑なタスクや、やり直しの発生
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>対策:</strong> シンプルなタスクに分割し、具体的に記述する
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Cursor / Claude Code との使い分け</h2>

        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="font-semibold mb-4">組み合わせ活用例: 新サービスの立ち上げ</h3>
          <ol className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400 text-xs font-bold">1</span>
              <div><strong className="text-violet-600 dark:text-violet-400">Manus AI</strong>: 市場調査・競合分析レポートを作成</div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400 text-xs font-bold">2</span>
              <div><strong className="text-violet-600 dark:text-violet-400">Manus AI</strong>: プロトタイプ（HTML/CSS/JS）を生成</div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400 text-xs font-bold">3</span>
              <div><strong className="text-cyan-600 dark:text-cyan-400">Cursor</strong>: プロトタイプを本格的なNext.jsプロジェクトに変換</div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-xs font-bold">4</span>
              <div><strong className="text-amber-600 dark:text-amber-400">Claude Code</strong>: テスト作成、CI/CD設定、デプロイ自動化</div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400 text-xs font-bold">5</span>
              <div><strong className="text-violet-600 dark:text-violet-400">Manus AI</strong>: ユーザーフィードバック収集・分析</div>
            </li>
          </ol>
        </div>
      </section>

      <Callout type="tip" title="まとめ">
        Manus AIの最大の強みは「非エンジニアでも使える」点です。コーディングが必要な本格開発にはCursorやClaude Codeを、
        リサーチ・分析・レポート作成にはManus AIを使うのが効果的な組み合わせです。
      </Callout>
    </div>
  )
}
