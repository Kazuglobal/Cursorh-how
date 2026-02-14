import type { Metadata } from "next"
import { claudeCodeFeatures } from "@/lib/tools-data"
import { FeatureCard } from "@/components/content/feature-card"
import { Callout } from "@/components/content/callout"
import { CodeBlock } from "@/components/content/code-block"

export const metadata: Metadata = {
  title: "Claude Code 機能詳細 - プラットフォーム・エコシステム・エージェント",
  description: "Claude Codeの全機能を詳しく解説。マルチプラットフォーム対応、Chrome拡張、Excel連携、Cowork、Agent Teams、CLAUDE.md、MCP、Hooksの使い方とサンプル。",
}

export default function ClaudeCodeFeaturesPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-3">Claude Code 機能詳細</h1>
        <p className="text-lg text-muted-foreground">
          Claude Codeが提供する全ての機能と、Claudeエコシステムを詳しく解説します。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {claudeCodeFeatures.map((feature) => (
          <FeatureCard
            key={feature.id}
            icon={feature.icon}
            title={feature.name}
            description={feature.description}
            accentColor="claude-accent"
          />
        ))}
      </div>

      {/* ====================== プラットフォーム ====================== */}

      <section>
        <h2 className="text-2xl font-bold mb-4">マルチプラットフォーム対応</h2>
        <p className="text-muted-foreground mb-4">
          Claude Codeは CLI だけでなく、VSCode拡張・Web版・JetBrains・モバイルなど多様な環境で利用できます。
        </p>

        <div className="space-y-6">
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-lg font-semibold mb-3">VSCode 拡張機能</h3>
            <p className="text-sm text-muted-foreground mb-3">
              VSCode Marketplace から「Claude Code」（anthropic.claude-code）をインストール。VS Code 1.98.0以上が必要。
            </p>
            <div className="overflow-x-auto rounded-lg border border-border mb-3">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border bg-muted/50"><th className="px-4 py-2 text-left font-semibold">機能</th><th className="px-4 py-2 text-left font-semibold">説明</th></tr></thead>
                <tbody>
                  <tr className="border-b border-border"><td className="px-4 py-2">ネイティブdiff</td><td className="px-4 py-2">変更箇所をVSCodeのdiffビューアで表示。Accept/Rejectボタンで操作</td></tr>
                  <tr className="border-b border-border"><td className="px-4 py-2">チェックポイント</td><td className="px-4 py-2">変更前の状態を自動保存。Esc+Escで巻き戻し、/rewindで任意の時点に復帰</td></tr>
                  <tr className="border-b border-border"><td className="px-4 py-2">サブエージェントパネル</td><td className="px-4 py-2">並列実行中のエージェントをサイドバーで可視化。タスク内容と結果を確認</td></tr>
                  <tr className="border-b border-border"><td className="px-4 py-2">@メンション</td><td className="px-4 py-2">ファイル・シンボル・選択範囲をコンテキストとして渡す</td></tr>
                  <tr><td className="px-4 py-2">バックグラウンドタスク</td><td className="px-4 py-2">devサーバー等の長時間プロセスを他の作業と並行実行</td></tr>
                </tbody>
              </table>
            </div>
            <Callout type="tip">
              VSCode拡張は CLI と同等のAI能力を持ちながら、GUIのdiff表示やチェックポイント可視化など、IDEならではの体験を提供します。
            </Callout>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-lg font-semibold mb-3">Web版（claude.ai/code）</h3>
            <p className="text-sm text-muted-foreground mb-3">
              ブラウザだけで利用可能。GitHubリポジトリを接続し、クラウド上のサンドボックスでコーディングタスクを実行します。
            </p>
            <div className="overflow-x-auto rounded-lg border border-border mb-3">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border bg-muted/50"><th className="px-4 py-2 text-left font-semibold">機能</th><th className="px-4 py-2 text-left font-semibold">説明</th></tr></thead>
                <tbody>
                  <tr className="border-b border-border"><td className="px-4 py-2">インストール不要</td><td className="px-4 py-2">ブラウザからアクセスするだけで利用開始</td></tr>
                  <tr className="border-b border-border"><td className="px-4 py-2">並列タスク</td><td className="px-4 py-2">複数リポジトリのタスクを同時実行</td></tr>
                  <tr className="border-b border-border"><td className="px-4 py-2">自動PR作成</td><td className="px-4 py-2">変更内容をまとめたPull Requestを自動生成</td></tr>
                  <tr><td className="px-4 py-2">クロスプラットフォーム</td><td className="px-4 py-2">PCで開始→モバイルで確認→PCで続行が可能</td></tr>
                </tbody>
              </table>
            </div>
            <Callout type="warning">
              Web版はリサーチプレビューです。GitHub接続のみ対応（GitLab等は未対応）。Pro/Maxプランが必要です。
            </Callout>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="text-lg font-semibold mb-3">JetBrains IDE</h3>
              <p className="text-sm text-muted-foreground mb-3">
                IntelliJ IDEA / WebStorm / PyCharm等で利用可能。JetBrains Marketplaceから「Claude Code [Beta]」プラグインをインストール。
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />ネイティブdiffビューア対応</li>
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />選択コードのコンテキスト自動送信</li>
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />Cmd+Esc / Ctrl+Esc でクイック起動</li>
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="text-lg font-semibold mb-3">iOS モバイル</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Claude iOSアプリからWeb版セッションの監視・操作が可能。外出先からタスク確認やPRレビューに便利。
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />Web版セッションのリアルタイム監視</li>
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />モバイルから新規タスク投入</li>
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />PR要約の確認・進捗チェック</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ====================== Chrome拡張 ====================== */}

      <section>
        <h2 className="text-2xl font-bold mb-4">Claude in Chrome（ブラウザ拡張）</h2>
        <p className="text-muted-foreground mb-4">
          ChromeブラウザのサイドパネルでAIアシスタントが動作し、自然言語の指示でWebサイトの操作を自動化します。
        </p>

        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-lg font-semibold mb-3">セットアップ</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              <li>Chrome Web Store で「Claude」を検索してインストール</li>
              <li>Claude有料プラン（Pro / Max / Team / Enterprise）でサインイン</li>
              <li>許可モードを選択:「操作前に確認」（推奨）または「自動実行」</li>
            </ol>
          </div>

          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border bg-muted/50"><th className="px-4 py-2 text-left font-semibold">やりたいこと</th><th className="px-4 py-2 text-left font-semibold">指示の例</th></tr></thead>
              <tbody>
                <tr className="border-b border-border"><td className="px-4 py-2">Web検索・比較</td><td className="px-4 py-2">「この商品の最安値を3サイトで比較して」</td></tr>
                <tr className="border-b border-border"><td className="px-4 py-2">フォーム入力</td><td className="px-4 py-2">「このフォームに以下の情報を入力して: 名前は...」</td></tr>
                <tr className="border-b border-border"><td className="px-4 py-2">メール管理</td><td className="px-4 py-2">「未読メールを要約して、重要なものをリストアップ」</td></tr>
                <tr><td className="px-4 py-2">データ抽出</td><td className="px-4 py-2">「このページの表データをコピーして」</td></tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
              <p className="text-sm font-semibold text-amber-600 dark:text-amber-400 mb-2">ワークフロー録画</p>
              <p className="text-sm text-muted-foreground">録画アイコンをクリック → 操作を実行 → 停止して保存。次回は保存ワークフローを選ぶだけで自動再実行。</p>
            </div>
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
              <p className="text-sm font-semibold text-amber-600 dark:text-amber-400 mb-2">マルチタブ管理</p>
              <p className="text-sm text-muted-foreground">複数タブをClaudeのタブグループにドラッグ＆ドロップ → 全タブを同時に監視・操作。</p>
            </div>
          </div>

          <Callout type="info">
            スケジュール機能で定期実行も可能（日次/週次/月次）。Chrome拡張とClaude Code CLIの連携で「ビルド→ブラウザテスト」の自動フローも実現できます。
          </Callout>
        </div>
      </section>

      {/* ====================== Excel連携 ====================== */}

      <section>
        <h2 className="text-2xl font-bold mb-4">Claude in Excel（スプレッドシート連携）</h2>
        <p className="text-muted-foreground mb-4">
          Microsoft Excelのアドインとして動作し、スプレッドシート上で数式作成・データ分析・エラー修正を自然言語で実行します。
        </p>

        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-lg font-semibold mb-3">セットアップ</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              <li>Excel を開く → 挿入 → アドインを取得</li>
              <li>「Claude by Anthropic for Excel」を検索してインストール</li>
              <li>Claude アカウントでサインイン（Pro / Max / Team / Enterprise 必要）</li>
              <li>ショートカットで起動: Windows <kbd className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">Ctrl+Alt+C</kbd> / Mac <kbd className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">Ctrl+Option+C</kbd></li>
            </ol>
          </div>

          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border bg-muted/50"><th className="px-4 py-2 text-left font-semibold">カテゴリ</th><th className="px-4 py-2 text-left font-semibold">サンプルプロンプト</th></tr></thead>
              <tbody>
                <tr className="border-b border-border"><td className="px-4 py-2 font-medium">数式作成</td><td className="px-4 py-2">「A列の売上とB列のコストから利益率を計算する数式を作って」</td></tr>
                <tr className="border-b border-border"><td className="px-4 py-2 font-medium">数式の説明</td><td className="px-4 py-2">「C3セルの数式を日本語で説明して」</td></tr>
                <tr className="border-b border-border"><td className="px-4 py-2 font-medium">エラー修正</td><td className="px-4 py-2">「#VALUE! エラーが出ている原因を調べて修正して」</td></tr>
                <tr className="border-b border-border"><td className="px-4 py-2 font-medium">データ分析</td><td className="px-4 py-2">「2024年と2025年のトレンドを比較して」</td></tr>
                <tr className="border-b border-border"><td className="px-4 py-2 font-medium">書式設定</td><td className="px-4 py-2">「売上が目標未満のセルを赤色でハイライトして」</td></tr>
                <tr className="border-b border-border"><td className="px-4 py-2 font-medium">データ整理</td><td className="px-4 py-2">「電話番号を +81-XXX-XXXX-XXXX 形式に統一して」</td></tr>
                <tr><td className="px-4 py-2 font-medium">ピボットテーブル</td><td className="px-4 py-2">「地域別の売上サマリーをピボットテーブルで作って」</td></tr>
              </tbody>
            </table>
          </div>

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
            <p className="text-sm font-semibold text-amber-600 dark:text-amber-400 mb-2">サンプル: 財務モデルの自動構築</p>
            <p className="text-sm text-muted-foreground">
              「SaaS企業の3ステートメント財務モデルを作って」→ P/L・B/S・C/Fの3シート + 前提条件シートをリンク数式付きで自動生成。前提値を変更するとモデル全体に自動反映。
            </p>
          </div>

          <Callout type="info">
            Opus 4.6ではネイティブ操作が強化: ピボットテーブル編集・チャート作成・条件付き書式・ソート＆フィルタ・データ入力規則に対応。
          </Callout>
        </div>
      </section>

      {/* ====================== Cowork ====================== */}

      <section>
        <h2 className="text-2xl font-bold mb-4">Claude Cowork（デスクトップエージェント）</h2>
        <p className="text-muted-foreground mb-4">
          Claude Desktopアプリのエージェント機能。ローカルファイルの操作や複雑なタスクを自律実行し、「指示して離席、完成品を受け取る」ワークフローを実現します。
        </p>

        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-lg font-semibold mb-3">セットアップ</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              <li>claude.com/download から Claude Desktop 最新版をダウンロード</li>
              <li>アプリ起動 → 上部モードセレクタで「Chat」→「Cowork」に切り替え</li>
              <li>タスクを記述 → Claudeのアプローチを確認 → 承認して実行開始</li>
            </ol>
            <p className="text-xs text-muted-foreground mt-2">
              対応: macOS（2026年1月〜）/ Windows x64（2026年2月〜）。Pro / Max プラン必要。
            </p>
          </div>

          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border bg-muted/50"><th className="px-4 py-2 text-left font-semibold">カテゴリ</th><th className="px-4 py-2 text-left font-semibold">サンプル指示</th></tr></thead>
              <tbody>
                <tr className="border-b border-border"><td className="px-4 py-2 font-medium">ファイル整理</td><td className="px-4 py-2">「Downloadsフォルダを種類別に整理して」</td></tr>
                <tr className="border-b border-border"><td className="px-4 py-2 font-medium">レポート作成</td><td className="px-4 py-2">「この会議メモ3つから要点をまとめたレポートを作って」</td></tr>
                <tr className="border-b border-border"><td className="px-4 py-2 font-medium">経費処理</td><td className="px-4 py-2">「レシート写真のフォルダから経費一覧Excelを作って」</td></tr>
                <tr className="border-b border-border"><td className="px-4 py-2 font-medium">プレゼン作成</td><td className="px-4 py-2">「このメモからPowerPointスライドを作って」</td></tr>
                <tr className="border-b border-border"><td className="px-4 py-2 font-medium">データ分析</td><td className="px-4 py-2">「このCSVの外れ値を検出して統計レポートを作って」</td></tr>
                <tr><td className="px-4 py-2 font-medium">リサーチ</td><td className="px-4 py-2">「Web検索してこのトピックの調査レポートをまとめて」</td></tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
              <p className="text-sm font-semibold text-amber-600 dark:text-amber-400 mb-2">サンプル: 経費レポート自動作成</p>
              <p className="text-sm text-muted-foreground">「receiptsフォルダのレシート写真から経費一覧を作成して」→ 全画像読み取り → 日付・店名・金額抽出 → Excel生成（合計行・円グラフ付き）</p>
            </div>
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
              <p className="text-sm font-semibold text-amber-600 dark:text-amber-400 mb-2">スキルの保存と再利用</p>
              <p className="text-sm text-muted-foreground">一度実行したタスクを「スキル」として保存 → 次回は保存スキルを選ぶだけで同じ処理を再実行。定型業務の自動化に最適。</p>
            </div>
          </div>

          <Callout type="tip">
            11個のオープンソースプラグインで営業・法務・金融・マーケティング・データ分析の外部ツールと連携可能。グローバル設定やフォルダ別コンテキストでカスタマイズも。
          </Callout>
        </div>
      </section>

      {/* ====================== Agent Teams ====================== */}

      <section>
        <h2 className="text-2xl font-bold mb-4">Agent Teams（マルチエージェント協調）</h2>
        <p className="text-muted-foreground mb-4">
          複数のClaudeエージェントをチームとして組織し、並列に協調作業させる実験的機能。2026年2月、Opus 4.6と同時リリース。
        </p>

        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-lg font-semibold mb-3">セットアップ</h3>
            <CodeBlock
              title="settings.json で機能を有効化"
              language="json"
              code={`{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}`}
            />
            <p className="text-sm text-muted-foreground mt-3">
              有効化後、Claude Codeで自然言語でチーム構成を指示するだけでチームが作成されます。
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
              <p className="text-sm font-semibold text-amber-600 dark:text-amber-400 mb-2">サンプル: 並列コードレビュー</p>
              <CodeBlock language="text" code={`PR #142 をエージェントチームでレビューして。3人のレビュワーを作成:
- セキュリティの観点からレビュー
- パフォーマンスへの影響をチェック
- テストカバレッジの検証
各自レビュー結果をまとめて。`} />
              <p className="text-xs text-muted-foreground mt-2">→ 3つの観点から同時にレビューが進行し、リーダーが結果を統合</p>
            </div>

            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
              <p className="text-sm font-semibold text-amber-600 dark:text-amber-400 mb-2">サンプル: 競合仮説でのデバッグ</p>
              <CodeBlock language="text" code={`アプリが1メッセージ後に切断される問題を調査して。
5人のエージェントでそれぞれ異なる仮説を検証。
互いの仮説を反証し合う科学的議論の形式で進めて。
結果をまとめて findings ドキュメントを更新して。`} />
              <p className="text-xs text-muted-foreground mt-2">→ 各エージェントが独立して仮説検証し、最有力な原因に収束</p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border bg-muted/50"><th className="px-4 py-2 text-left font-semibold">操作</th><th className="px-4 py-2 text-left font-semibold">キー / コマンド</th></tr></thead>
              <tbody>
                <tr className="border-b border-border"><td className="px-4 py-2">メンバー選択・メッセージ送信</td><td className="px-4 py-2"><kbd className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">Shift+↑/↓</kbd></td></tr>
                <tr className="border-b border-border"><td className="px-4 py-2">共有タスクリスト表示</td><td className="px-4 py-2"><kbd className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">Ctrl+T</kbd></td></tr>
                <tr><td className="px-4 py-2">リーダーを調整専任モードに</td><td className="px-4 py-2"><kbd className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">Shift+Tab</kbd>（Delegateモード）</td></tr>
              </tbody>
            </table>
          </div>

          <Callout type="warning">
            実験的機能（デフォルト無効）。/resume ではチームメイト復元不可。同ファイルの同時編集は避けてください。トークン消費はメンバー数に比例して増加します。
          </Callout>
        </div>
      </section>

      {/* ====================== 既存機能 ====================== */}

      <section>
        <h2 className="text-2xl font-bold mb-4">CLAUDE.md 設定ファイル</h2>
        <p className="text-muted-foreground mb-4">
          プロジェクトのルートに CLAUDE.md を配置すると、Claude Code がプロジェクト固有のルールに従ってコードを生成します。
        </p>

        <div className="overflow-x-auto rounded-lg border border-border mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-2 text-left font-semibold">配置場所</th>
                <th className="px-4 py-2 text-left font-semibold">範囲</th>
                <th className="px-4 py-2 text-left font-semibold">優先順位</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border"><td className="px-4 py-2 font-mono">~/.claude/CLAUDE.md</td><td className="px-4 py-2">全プロジェクト共通</td><td className="px-4 py-2">低</td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2 font-mono">プロジェクトルート/CLAUDE.md</td><td className="px-4 py-2">プロジェクト固有</td><td className="px-4 py-2">中</td></tr>
              <tr><td className="px-4 py-2 font-mono">サブディレクトリ/CLAUDE.md</td><td className="px-4 py-2">ディレクトリ固有</td><td className="px-4 py-2">高</td></tr>
            </tbody>
          </table>
        </div>

        <CodeBlock
          title="CLAUDE.md の記述例"
          language="markdown"
          code={`# プロジェクト指示

## 技術スタック
- Next.js 15 + React 19
- TypeScript (strict mode)
- Prisma + PostgreSQL
- TailwindCSS

## コーディング規約
- 関数は50行以下に保つ
- イミュータブルパターンを使用
- エラーハンドリングは try/catch で包括的に行う

## テスト
- 新しい機能には必ずテストを書く
- テストカバレッジ 80% 以上を維持`}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">MCP（Model Context Protocol）</h2>
        <p className="text-muted-foreground mb-4">
          MCPは外部サービスと連携するためのプロトコルです。プラグインで機能を大幅に拡張できます。
        </p>

        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-2 text-left font-semibold">プラグイン</th>
                <th className="px-4 py-2 text-left font-semibold">機能</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border"><td className="px-4 py-2">Supabase</td><td className="px-4 py-2">データベース操作、マイグレーション</td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2">Vercel</td><td className="px-4 py-2">デプロイ、プロジェクト管理</td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2">Playwright</td><td className="px-4 py-2">ブラウザ操作、E2Eテスト</td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2">GitHub</td><td className="px-4 py-2">PR管理、Issue操作</td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2">Figma</td><td className="px-4 py-2">デザインデータ取得</td></tr>
              <tr><td className="px-4 py-2">Slack</td><td className="px-4 py-2">メッセージ送受信</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Hooks（フックシステム）</h2>
        <p className="text-muted-foreground mb-4">
          ツール実行の前後やセッション終了時にカスタムスクリプトを自動実行する仕組みです。
        </p>

        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-2 text-left font-semibold">フック</th>
                <th className="px-4 py-2 text-left font-semibold">タイミング</th>
                <th className="px-4 py-2 text-left font-semibold">用途例</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border"><td className="px-4 py-2">PreToolUse</td><td className="px-4 py-2">ツール実行前</td><td className="px-4 py-2">バリデーション、実行ブロック</td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2">PostToolUse</td><td className="px-4 py-2">ツール実行後</td><td className="px-4 py-2">自動フォーマット、型チェック</td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2">Stop</td><td className="px-4 py-2">セッション終了時</td><td className="px-4 py-2">最終チェック</td></tr>
              <tr><td className="px-4 py-2">PreCompact</td><td className="px-4 py-2">コンパクション前</td><td className="px-4 py-2">メモリ永続化</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">スラッシュコマンド</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-2 text-left font-semibold">コマンド</th>
                <th className="px-4 py-2 text-left font-semibold">説明</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border"><td className="px-4 py-2 font-mono">/help</td><td className="px-4 py-2">ヘルプを表示</td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2 font-mono">/clear</td><td className="px-4 py-2">会話履歴をクリア</td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2 font-mono">/compact</td><td className="px-4 py-2">コンテキストをコンパクション</td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2 font-mono">/model</td><td className="px-4 py-2">使用モデルの切り替え</td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2 font-mono">/cost</td><td className="px-4 py-2">セッションのコスト表示</td></tr>
              <tr><td className="px-4 py-2 font-mono">/resume</td><td className="px-4 py-2">前のセッションを再開</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
