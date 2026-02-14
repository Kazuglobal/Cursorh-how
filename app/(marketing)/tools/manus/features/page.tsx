import type { Metadata } from "next"
import { manusFeatures } from "@/lib/tools-data"
import { FeatureCard } from "@/components/content/feature-card"
import { Callout } from "@/components/content/callout"

export const metadata: Metadata = {
  title: "Manus AI 機能詳細 - ブラウザ操作・コード実行・自律エージェント",
  description: "Manus AIの全機能を詳しく解説。自律エージェント、ブラウザ制御、コード生成・実行、ファイル操作、マルチステップ計画の使い方。",
}

export default function ManusFeaturesPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-3">Manus AI 機能詳細</h1>
        <p className="text-lg text-muted-foreground">
          Manus AIが提供する全ての機能を詳しく解説します。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {manusFeatures.map((feature) => (
          <FeatureCard
            key={feature.id}
            icon={feature.icon}
            title={feature.name}
            description={feature.description}
            accentColor="manus-accent"
          />
        ))}
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-4">自律エージェントの動作</h2>
        <p className="text-muted-foreground mb-4">
          Manus AIにタスクを記述すると、自動的にサブタスクに分解し、ToDoリスト形式で進捗を表示しながら順次実行します。
        </p>
        <div className="rounded-lg border border-border bg-card p-6">
          <h4 className="font-semibold mb-3">実行例: カフェ調査</h4>
          <div className="space-y-3 text-sm">
            <p className="text-muted-foreground">
              指示: 「東京の人気カフェ10店舗を調査し、住所・営業時間・評価をExcelにまとめて」
            </p>
            <ol className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400 text-xs">1</span>
                Google で「東京 人気カフェ ランキング」を検索
              </li>
              <li className="flex items-start gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400 text-xs">2</span>
                上位の情報源から10店舗を特定
              </li>
              <li className="flex items-start gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400 text-xs">3</span>
                各店舗の詳細情報を個別に収集
              </li>
              <li className="flex items-start gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400 text-xs">4</span>
                情報をExcel形式に整理
              </li>
              <li className="flex items-start gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400 text-xs">5</span>
                ファイルを生成してダウンロードリンクを提供
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">ブラウザ制御</h2>
        <p className="text-muted-foreground mb-4">
          仮想ブラウザをリアルタイムで操作する能力を持ちます。操作の様子をリアルタイムで観察できます。
        </p>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-500 shrink-0" />
            Webサイトの閲覧・情報収集
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-500 shrink-0" />
            フォームの入力・送信
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-500 shrink-0" />
            複数ページにまたがる情報の統合
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-500 shrink-0" />
            スクリーンショットの取得と解析
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">コード生成・実行</h2>
        <p className="text-muted-foreground mb-4">
          クラウドサンドボックス（隔離された仮想環境）内でコードを生成・実行します。
        </p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-2 text-left font-semibold">対応言語</th>
                <th className="px-4 py-2 text-left font-semibold">主な用途</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border"><td className="px-4 py-2">Python</td><td className="px-4 py-2">データ分析、スクリプト、ML</td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2">JavaScript / TypeScript</td><td className="px-4 py-2">Webアプリ、Node.js</td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2">HTML / CSS</td><td className="px-4 py-2">プロトタイプ、ランディングページ</td></tr>
              <tr><td className="px-4 py-2">Shell Script</td><td className="px-4 py-2">自動化、データ処理</td></tr>
            </tbody>
          </table>
        </div>
        <Callout type="info" title="サンドボックス環境">
          各タスクは隔離されたLinuxベース（Ubuntu）の仮想環境で実行されます。ユーザーのローカル環境には影響しません。
          pip / npm 等でのパッケージインストールも可能です。
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">ユースケース</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <h4 className="font-semibold mb-2">Web開発</h4>
            <p className="text-sm text-muted-foreground">
              プロトタイプ作成、ランディングページ、データダッシュボードなど
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h4 className="font-semibold mb-2">データ分析</h4>
            <p className="text-sm text-muted-foreground">
              CSV/Excelの統計分析、グラフ生成、レポート自動作成
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h4 className="font-semibold mb-2">リサーチ</h4>
            <p className="text-sm text-muted-foreground">
              市場調査、競合分析、多言語情報の収集と翻訳
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h4 className="font-semibold mb-2">ドキュメント作成</h4>
            <p className="text-sm text-muted-foreground">
              レポート、プレゼン資料、技術ドキュメントの生成
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
