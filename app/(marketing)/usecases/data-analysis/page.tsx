import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Callout } from "@/components/content/callout"
import { StepByStep } from "@/components/content/step-by-step"
import { BarChart3, TrendingUp, Code2, CheckCircle2, Zap } from "lucide-react"
import type { SetupStep } from "@/types/tools"

export const metadata: Metadata = {
  title: "データ分析ワークフロー - Claude Code & Manus AI",
  description: "Python + Pandas/NumPy でデータ分析を行うAIアシストワークフロー。データクリーニング、可視化、Jupyter Notebook との連携を実装。",
}

const workflowSteps: SetupStep[] = [
  {
    stepNumber: 1,
    title: "分析環境のセットアップ",
    description: "Python 環境を準備し、必要なライブラリをインストールします。",
    code: `# 新しいディレクトリを作成
mkdir data-analysis-project
cd data-analysis-project

# Python 仮想環境を作成
python -m venv venv

# 仮想環境を有効化
# Windows:
venv\\Scripts\\activate
# Mac/Linux:
source venv/bin/activate

# 必要なパッケージをインストール
pip install pandas numpy matplotlib plotly jupyter openpyxl`,
    codeLanguage: "bash",
    callout: {
      type: "info",
      message: "仮想環境を使うことで、プロジェクト間の依存関係の衝突を防げます。常に仮想環境を有効化した状態で作業してください。",
    },
  },
  {
    stepNumber: 2,
    title: "データファイルを準備",
    description: "分析対象のデータを CSV または Excel 形式で用意します。",
    code: `# requirements.txt を作成（プロジェクト管理用）
cat > requirements.txt << 'EOF'
pandas==2.0.3
numpy==1.24.3
matplotlib==3.7.2
plotly==5.15.0
jupyter==1.0.0
openpyxl==3.1.2
EOF

# データディレクトリを作成
mkdir data
# サンプル CSV を作成（または既存のデータを配置）
# data/sales.csv, data/users.csv など`,
    codeLanguage: "bash",
    callout: {
      type: "tip",
      message: "requirements.txt を作成することで、別の環境で同じ依存関係を簡単に再現できます。",
    },
  },
  {
    stepNumber: 3,
    title: "Claude Code でデータ分析スクリプトを作成",
    description: "Claude Code を起動して、データクリーニングと分析スクリプトを生成してもらいます。",
    code: `# Claude Code を起動
claude

# チャットで以下のプロンプトを入力:
"""
Python で Pandas を使ったデータ分析スクリプトを作ってください。

要件:
- data/sales.csv を読み込み
- 欠損値の処理（NaN を削除または補完）
- データ型の正規化（日付をdatetime に変換）
- 基本統計量を計算（平均、中央値、標準偏差）
- カテゴリ別の集計

出力:
- DataFrame の基本情報を表示
- summary.csv に集計結果を保存

エラーハンドリングと ログ出力も含めてください。
"""`,
    codeLanguage: "plaintext",
    callout: {
      type: "info",
      message: "Claude Code はデータ分析の複雑なロジックを効率的に実装できます。エラーハンドリングも含めるよう指示することが重要です。",
    },
  },
  {
    stepNumber: 4,
    title: "データクリーニングコードを実行",
    description: "生成されたコードを実行して、データをクリーニングします。",
    code: `# 生成されたスクリプトを実行
python scripts/clean_data.py

# 出力例:
# データ読み込み: 1000 行
# 欠損値: 45 行を削除
# データ型変換完了
# 集計結果を summary.csv に保存しました`,
    codeLanguage: "bash",
    callout: {
      type: "warning",
      message: "スクリプト実行前に、必ずデータのバックアップを取ってください。不意なデータ損失を防ぐため、元ファイルは修正せず、処理結果を新ファイルに保存します。",
    },
  },
  {
    stepNumber: 5,
    title: "Manus AI で可視化コードを生成",
    description: "Manus AI を使ってデータ可視化コード（Matplotlib/Plotly）を生成します。",
    code: `# Manus AI プロンプト例:
"""
summary.csv のデータを以下の可視化で表現してください:

1. カテゴリ別売上の棒グラフ（Matplotlib）
2. 月別トレンドの折れ線グラフ（Plotly - インタラクティブ）
3. 売上分布のヒストグラム
4. 相関マトリックスのヒートマップ

- すべてのグラフをサブプロットで表示
- x軸, y軸のラベルは日本語
- グラフを PNG で保存
- 出力: visualizations/ ディレクトリに保存
"""`,
    codeLanguage: "plaintext",
    callout: {
      type: "info",
      message: "Manus AI はビジュアル設計が得意。複数の可視化パターンを一度に提示させて、最適なものを選択できます。",
    },
  },
  {
    stepNumber: 6,
    title: "可視化コードを実行",
    description: "生成された可視化コードを実行してグラフを生成します。",
    code: `# 可視化スクリプトを実行
python scripts/visualize_data.py

# 出力ファイル:
# visualizations/sales_by_category.png
# visualizations/trend_interactive.html
# visualizations/distribution.png
# visualizations/correlation_heatmap.png`,
    codeLanguage: "bash",
  },
  {
    stepNumber: 7,
    title: "Jupyter Notebook で対話的に探索",
    description: "Jupyter Notebook を使ってデータを対話的に探索します。",
    code: `# Jupyter Notebook を起動
jupyter notebook

# 新しい Notebook を作成: analysis.ipynb
# セル1: データ読み込み
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

df = pd.read_csv('data/sales.csv')
df.head()

# セル2: 基本統計量
df.describe()

# セル3: カテゴリ別分析
df.groupby('category')['sales'].agg(['sum', 'mean', 'count'])`,
    codeLanguage: "python",
    callout: {
      type: "tip",
      message: "Jupyter Notebook は対話的な分析に最適。実験的なコードを試して、良い結果が得られたら本スクリプトに移します。",
    },
  },
  {
    stepNumber: 8,
    title: "Claude Code で統計分析コードを実装",
    description: "Claude Code を使って、高度な統計分析を実装します。",
    code: `# プロンプト例:
"""
Pandas と SciPy を使って、以下の統計分析を実装してください:

1. グループ間の差の検定（t検定）
   - 各カテゴリ間の売上に有意差があるか検証

2. 相関分析
   - 各列間の相関係数を計算
   - p値も含める

3. 外れ値検出
   - IQR 方式で外れ値を特定
   - 外れ値の件数を報告

4. トレンド分析
   - 月別売上の増減率を計算
   - 前月比 %を DataFrame に追加

出力形式:
- 統計結果を statistical_report.csv に保存
- p値 < 0.05 の結果は「有意」と表示
- Markdown 形式のレポートも生成
"""`,
    codeLanguage: "plaintext",
  },
  {
    stepNumber: 9,
    title: "Excel にレポートをエクスポート",
    description: "分析結果を Excel ファイルでまとめます。複数シートで結果を整理。",
    code: `# プロンプト例（Claude Code）:
"""
Pandas の ExcelWriter を使って、以下の内容を 1 つの Excel ファイルに出力:

Sheet1: 元データ（処理済み）
Sheet2: 基本統計量
Sheet3: カテゴリ別集計
Sheet4: 相関マトリックス
Sheet5: 統計検定結果
Sheet6: 外れ値リスト

フォーマット要件:
- ヘッダー行は太字、背景色を使用
- 数値は小数点第2位まで（金額は通貨形式）
- グラフも埋め込み（可能であれば）
- ファイル名: analysis_report_[実行日時].xlsx
"""`,
    codeLanguage: "plaintext",
    callout: {
      type: "info",
      message: "Excel エクスポート時は日本語フォント（MS ゴシック等）を指定すると、見栄えが良くなります。",
    },
  },
  {
    stepNumber: 10,
    title: "Git コミットと成果物の整理",
    description: "プロジェクト全体を Git で管理し、再現可能な分析環境を作成します。",
    code: `# Git リポジトリを初期化
git init

# .gitignore を作成
cat > .gitignore << 'EOF'
venv/
__pycache__/
.ipynb_checkpoints/
*.pyc
.env
data/raw/*
visualizations/
*.xlsx
EOF

# コミット
git add .
git commit -m "feat: 初期データ分析パイプライン

- データクリーニングスクリプト
- 可視化生成スクリプト
- 統計分析実装
- requirements.txt で依存関係管理
- Jupyter Notebook で探索的分析"`,
    codeLanguage: "bash",
  },
]

const promptExamples = [
  {
    title: "例1: 基本的なデータクリーニング",
    tool: "Claude Code",
    prompt: `sales.csv を読み込んで以下の処理を実装:
1. 欠損値の確認と処理（削除 or 補完）
2. 重複行の削除
3. 外れ値の検出と標準化
4. データ型の正規化
5. 処理結果を clean_sales.csv に保存

エラーハンドリング付きでお願いします。`,
    response: `✅ 完成: clean_data.py
- read_csv() で読み込み
- dropna() で欠損値処理
- duplicated().sum() で確認
- StandardScaler で標準化
- to_csv() で保存
- Try-except でエラー処理`,
  },
  {
    title: "例2: Plotly でインタラクティブな可視化",
    tool: "Manus AI",
    prompt: `summary.csv の売上データを Plotly で可視化:
- 月別トレンド（折れ線グラフ）
- カテゴリ別売上（積み上げ棒グラフ）
- ホバーで詳細表示
- ダウンロードボタン付き
- HTML を出力（ブラウザで開く）`,
    response: `✅ 完成: interactive_charts.py
- go.Scatter() で月別トレンド
- go.Bar() で カテゴリ別集計
- hovertemplate で詳細表示
- .show() でブラウザ表示`,
  },
  {
    title: "例3: 複雑な統計分析",
    tool: "Claude Code",
    prompt: `次の統計分析を実装:
1. グループ間差の t検定
2. 分散分析（ANOVA）
3. 相関係数（Pearson & Spearman）
4. 線形回帰分析
5. Markdown レポート生成

出力: analysis_report.md`,
    response: `✅ 完成: statistical_analysis.py
- scipy.stats.ttest_ind() で t検定
- scipy.stats.f_oneway() で ANOVA
- df.corr() と scipy.stats.spearmanr()
- sklearn.linear_model.LinearRegression()
- 結果を Markdown で記述`,
  },
]

const toolComparison = [
  {
    task: "データクリーニングスクリプト",
    claudeCode: {
      strength: "複雑なロジック、エラーハンドリング、本格的な実装",
      suitable: true,
    },
    manusAI: {
      strength: "ビジュアル確認の必要性は低い",
      suitable: false,
    },
  },
  {
    task: "グラフの可視化コード",
    claudeCode: {
      strength: "複数グラフの統合、複雑な処理",
      suitable: true,
    },
    manusAI: {
      strength: "デザイン確認、複数パターンの提示",
      suitable: true,
    },
  },
  {
    task: "統計分析実装",
    claudeCode: {
      strength: "複数ライブラリの組み合わせ、本格的な分析",
      suitable: true,
    },
    manusAI: {
      strength: "結果の可視化、図表の作成",
      suitable: false,
    },
  },
  {
    task: "Excel レポート生成",
    claudeCode: {
      strength: "複数シート、複雑なフォーマット、公式組み込み",
      suitable: true,
    },
    manusAI: {
      strength: "レイアウト、デザイン確認",
      suitable: false,
    },
  },
]

export default function DataAnalysisPage() {
  return (
    <div className="space-y-12">
      {/* ページ概要 */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-3">データ分析ワークフロー</h1>
        <p className="text-lg text-muted-foreground">
          Python + Pandas/NumPy を使ったデータ分析を、Claude Code と Manus AI で効率化します。
          データクリーニングから可視化、統計分析まで、実践的なワークフローを学びます。
        </p>
      </div>

      {/* 概要カード */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-muted-foreground">所要時間</span>
              </div>
              <CardTitle>2-3時間</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              セットアップから完全な分析パイプラインまで
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-muted-foreground">難易度</span>
              </div>
              <CardTitle>⭐⭐ 中級</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Python 基礎知識があると最適
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Code2 className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-muted-foreground">スキル</span>
              </div>
              <CardTitle>複数領域</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Python、Pandas、可視化、統計
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-muted-foreground">効率化</span>
              </div>
              <CardTitle>70%削減</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              AI を使わない場合との時間比較
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 前提条件 */}
      <Callout type="info" title="前提条件">
        <ul className="list-disc list-inside space-y-1">
          <li>Python 3.9 以上がインストール済み</li>
          <li>CSV または Excel 形式の分析対象データ</li>
          <li>Claude Code がインストール済み</li>
          <li>Manus AI のアクセス権（推奨）</li>
          <li>Git がインストール済み（成果物管理用）</li>
        </ul>
      </Callout>

      {/* 完成イメージ */}
      <section>
        <h2 className="text-2xl font-bold mb-6">完成イメージ</h2>
        <Card>
          <CardHeader>
            <CardTitle>構築するデータ分析パイプライン</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span>
                  <strong>自動化されたクリーニング:</strong> 欠損値、重複、外れ値を自動処理
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span>
                  <strong>複数の可視化:</strong> 棒グラフ、折れ線、ヒートマップ、インタラクティブチャート
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span>
                  <strong>統計分析:</strong> t検定、相関分析、回帰分析、トレンド検出
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span>
                  <strong>Jupyter Notebook:</strong> 対話的な探索分析環境
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span>
                  <strong>Excel レポート:</strong> 複数シートの整形済みレポート出力
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span>
                  <strong>再現可能性:</strong> requirements.txt で環境を完全再現
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* ステップバイステップ */}
      <section>
        <h2 className="text-2xl font-bold mb-6">ステップバイステップガイド</h2>
        <StepByStep steps={workflowSteps} />
      </section>

      {/* Claude Code vs Manus AI */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Claude Code vs Manus AI の使い分け</h2>
        <Card>
          <CardHeader>
            <CardTitle>データ分析タスク別おすすめツール</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-2">タスク</th>
                    <th className="text-left py-2 px-2">Claude Code</th>
                    <th className="text-left py-2 px-2">Manus AI</th>
                  </tr>
                </thead>
                <tbody>
                  {toolComparison.map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-muted/50" : ""}>
                      <td className="py-2 px-2 font-medium">{item.task}</td>
                      <td className="py-2 px-2">
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                            item.claudeCode.suitable
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                          }`}
                        >
                          {item.claudeCode.suitable ? "✅ 推奨" : "⭕ 可"}
                        </span>
                        <p className="text-xs text-muted-foreground mt-1">{item.claudeCode.strength}</p>
                      </td>
                      <td className="py-2 px-2">
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                            item.manusAI.suitable
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                          }`}
                        >
                          {item.manusAI.suitable ? "✅ 推奨" : "❌ 不向き"}
                        </span>
                        <p className="text-xs text-muted-foreground mt-1">{item.manusAI.strength}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* プロンプト例 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">実際のプロンプト例と応答</h2>
        <div className="space-y-6">
          {promptExamples.map((example, idx) => (
            <Card key={idx}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{example.title}</CardTitle>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary">
                    {example.tool}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 text-sm text-muted-foreground">プロンプト:</h4>
                  <div className="bg-muted p-3 rounded text-sm whitespace-pre-wrap font-mono">
                    {example.prompt}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-sm text-muted-foreground">応答の概要:</h4>
                  <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded text-sm border border-green-200 dark:border-green-800">
                    {example.response}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* よくある落とし穴 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">よくある落とし穴と対策</h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">落とし穴1: 仮想環境を使わない</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                <strong>問題:</strong> グローバル環境にパッケージをインストールすると、プロジェクト間で依存関係が衝突します。
              </p>
              <p>
                <strong>対策:</strong> 常に `python -m venv venv` で仮想環境を作成し、有効化してから作業してください。
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">落とし穴2: 元のデータファイルを直接編集</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                <strong>問題:</strong> 処理に失敗した時、元のデータを復旧できなくなります。
              </p>
              <p>
                <strong>対策:</strong> `data/raw/` に元ファイルを保存し、処理結果は別ファイルに出力してください。
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">落とし穴3: エラーハンドリングなしのスクリプト</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                <strong>問題:</strong> 本番環境で予期しないエラーが発生し、分析が中断します。
              </p>
              <p>
                <strong>対策:</strong> Claude Code に「エラーハンドリングとログ出力を含めてください」と指示してください。
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">落とし穴4: Jupyter Notebook のコードを本スクリプトに使わない</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                <strong>問題:</strong> Notebook は対話的で、セル依存性が複雑。本スクリプトに変換すると動作しないことがあります。
              </p>
              <p>
                <strong>対策:</strong> Notebook で検証後、Claude Code に「このロジックを .py ファイルにリファクタリングしてください」と依頼してください。
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">落とし穴5: requirements.txt を作成しない</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                <strong>問題:</strong> 別の環境や同僚が同じプロジェクトを実行する時、依存関係が不明で動作しません。
              </p>
              <p>
                <strong>対策:</strong> <code>pip freeze &gt; requirements.txt</code> で依存関係を記録。別環境では <code>pip install -r requirements.txt</code> で復現。
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 実務ポイント */}
      <section>
        <h2 className="text-2xl font-bold mb-6">実務で活躍するポイント</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">スケーラビリティ</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <ul className="list-disc list-inside space-y-1">
                <li>スクリプトは大規模データにも対応（Pandas は効率的）</li>
                <li>月次や日次の自動化に最適</li>
                <li>CSV、Excel、SQL、API 等多数のデータソースに対応</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">再現性</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <ul className="list-disc list-inside space-y-1">
                <li>同じスクリプトで同じ結果を得られます</li>
                <li>分析プロセスが明確に記録される</li>
                <li>監査やコンプライアンスに対応</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">保守性</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <ul className="list-disc list-inside space-y-1">
                <li>ログ出力で問題を素早く発見</li>
                <li>エラーメッセージで対応が容易</li>
                <li>コード review がしやすい（Claude Code の出力は読みやすい）</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">生産性向上</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <ul className="list-disc list-inside space-y-1">
                <li>データクリーニングに 70% の時間削減</li>
                <li>複数の可視化を一度に生成</li>
                <li>統計分析コードも自動生成</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 応用例 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">応用例とさらなる拡張</h2>
        <Card>
          <CardHeader>
            <CardTitle>このワークフローを応用できる領域</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-sm mb-1">1. 売上分析・ダッシュボード</h4>
                <p className="text-sm text-muted-foreground">
                  月次売上の自動分析、カテゴリ別の傾向分析、予測モデルの構築
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">2. ユーザー行動分析</h4>
                <p className="text-sm text-muted-foreground">
                  ログデータのクリーニング、セッション分析、セグメンテーション
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">3. 品質管理・製造データ</h4>
                <p className="text-sm text-muted-foreground">
                  不良率の分析、SPC（統計的過程管理）、异常検知
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">4. マーケティング分析</h4>
                <p className="text-sm text-muted-foreground">
                  キャンペーン効果測定、A/B テスト分析、顧客ライフタイムバリュー分析
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">5. 財務分析・会計</h4>
                <p className="text-sm text-muted-foreground">
                  費用分析、予算対比、財務比率分析、異常検知
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 次のステップ */}
      <section>
        <h2 className="text-2xl font-bold mb-6">次のステップ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">高度なテクニック</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                このワークフローをマスターしたら、次に進みましょう：
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-primary hover:underline">
                    機械学習モデルの実装（scikit-learn）
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-primary hover:underline">
                    時系列分析（ARIMA, Prophet）
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-primary hover:underline">
                    Web スクレイピングとデータ収集
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-primary hover:underline">
                    API からのデータ取得と自動化
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">実践してみる</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                自分のデータで Claude Code を使ってみましょう：
              </p>
              <ul className="space-y-2 text-sm list-disc list-inside text-muted-foreground">
                <li>Kaggle のデータセットで練習</li>
                <li>会社の既存データで分析パイプライン構築</li>
                <li>公開 API からデータを取得して分析</li>
                <li>自動化スクリプトを cron で定期実行</li>
              </ul>
              <Link href="/tools/claude-code">
                <Button variant="outline" size="sm" className="w-full mt-3">
                  Claude Code の全機能を見る
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* トラブルシューティング */}
      <section>
        <h2 className="text-2xl font-bold mb-6">よくあるエラー</h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Q: ModuleNotFoundError: No module named &apos;pandas&apos;</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              A: 仮想環境が有効になっていません。`source venv/bin/activate` (Mac/Linux) または `venv\Scripts\activate` (Windows) を実行してから、`pip install pandas` してください。
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Q: Excel ファイルが文字化けする</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              A: Excel Writer 生成時に日本語フォントを指定してください。Claude Code に「Excel 出力時に MS ゴシックフォントを使用してください」と指示。
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Q: Jupyter Notebook が起動しない</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              A: `pip install --upgrade jupyter` で更新。ポート競合の場合は `jupyter notebook --port=8889` で異なるポートを指定。
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Q: Plotly の HTML が大きすぎる</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              A: <code>{"fig.write_html('file.html', config={'responsive': True})"}</code> でサイズ最適化。または <code>{"plotly.io.write_html()"}</code> で圧縮オプションを使用。
            </CardContent>
          </Card>
        </div>
      </section>

      {/* まとめ */}
      <section>
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📊 このワークフローで身につくスキル
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span>データクリーニングの自動化</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span>複数の可視化テクニック</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span>統計分析の実装方法</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span>Jupyter Notebook での探索的分析</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span>AI との効果的なコラボレーション方法</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span>本番環境対応のスクリプト実装</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span>Claude Code と Manus AI の使い分け</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>さあ、始めましょう！</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              このワークフローは非エンジニアでも、必要なデータがあればすぐ実装できます。
              Claude Code と Manus AI があれば、複雑な分析も効率的に行えます。
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/tools/claude-code/setup">
                <Button variant="primary">Claude Code をセットアップ</Button>
              </Link>
              <Link href="/tools/manus/setup">
                <Button variant="outline">Manus AI について詳しく</Button>
              </Link>
              <Link href="/getting-started">
                <Button variant="ghost">戻る</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
