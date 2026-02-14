import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Callout } from "@/components/content/callout"
import { StepByStep } from "@/components/content/step-by-step"
import { CodeBlock } from "@/components/content/code-block"
import { BarChart3, TrendingUp, Brain, CheckCircle2, AlertCircle } from "lucide-react"
import type { SetupStep } from "@/types/tools"

export const metadata: Metadata = {
  title: "データサイエンスユースケース - Python 機械学習",
  description: "Claude Code を使った Python でのデータサイエンス。データ前処理、特徴エンジニアリング、機械学習モデル構築、予測まで。",
}

const workflowSteps: SetupStep[] = [
  {
    stepNumber: 1,
    title: "Python データサイエンス環境をセットアップ",
    description: "Python 環境と必要なライブラリをセットアップします。",
    code: `# 新しいプロジェクトディレクトリを作成
mkdir data-science-project
cd data-science-project

# Python 仮想環境を作成
python -m venv venv

# 仮想環境を有効化
# Windows:
venv\\Scripts\\activate
# Mac/Linux:
source venv/bin/activate

# pip を更新
pip install --upgrade pip

# 必要なライブラリをインストール
pip install pandas numpy scikit-learn matplotlib seaborn plotly
pip install jupyter notebook
pip install scipy statsmodels
pip install python-dotenv

# 環境を記録
pip freeze > requirements.txt

# ディレクトリ構造を作成
mkdir -p data/{raw,processed}
mkdir -p notebooks
mkdir -p scripts
mkdir -p models
mkdir -p results
mkdir -p figures`,
    codeLanguage: "bash",
    callout: {
      type: "info",
      message: "仮想環境を使うことで、異なるプロジェクト間の依存関係衝突を防げます。常に有効化した状態で作業してください。",
    },
  },
  {
    stepNumber: 2,
    title: "データセットを準備",
    description: "分析対象のデータセットを準備します。",
    code: `# データセットをダウンロード（例：Kaggle）
# または既存の CSV ファイルを data/raw/ に配置

# データセットの確認
python -c "import pandas as pd; df = pd.read_csv('data/raw/sales_data.csv'); print(df.info()); print(df.head())"

# README を作成してデータセット情報を記録
cat > data/README.md << 'EOF'
# データセット説明

## ファイル構成
- raw/: 元のデータ（編集しない）
- processed/: 処理済みデータ

## カラム説明
- date: 売上日付
- category: 商品カテゴリ
- sales: 売上金額
- quantity: 販売数量
- region: 地域

## データ期間
2022-01-01 ～ 2024-12-31（3年分）

## サンプル件数
約 50,000 件
EOF`,
    codeLanguage: "bash",
    callout: {
      type: "tip",
      message: "元のデータは data/raw/ に保存し、処理結果は data/processed/ に出力します。元データは絶対に編集しないでください。",
    },
  },
  {
    stepNumber: 3,
    title: "Claude Code でデータ探索スクリプトを生成",
    description: "Claude Code を使ってデータの初期探索を実装します。",
    code: `# Claude Code を起動
claude

# プロンプト例:
"""
Python で Pandas を使ってデータセットを探索するスクリプトを作成してください。

ファイル: scripts/01_explore_data.py

要件:
- data/raw/sales_data.csv を読み込み
- データセットの基本情報を表示（shape, info, describe）
- 欠損値の確認と可視化
- 外れ値の検出（IQR 方式）
- 数値カラムの分布を可視化
- カテゴリカルカラムの分布を表示
- 相関マトリックスを計算
- 時系列トレンドの確認

出力:
- コンソールに統計情報を表示
- figures/ に可視化グラフを保存（PNG）
- データ探索レポート（CSV）を data/processed/ に保存

エラーハンドリングと ログ出力も含める。
"""`,
    codeLanguage: "plaintext",
    callout: {
      type: "info",
      message: "Claude Code は複雑なデータ操作を効率的に実装できます。探索段階から AI を活用することで、見落としやすい問題を早期に発見できます。",
    },
  },
  {
    stepNumber: 4,
    title: "データクリーニングスクリプトを実装",
    description: "欠損値処理、外れ値除去、データ型変換を実装します。",
    code: `# Claude Code で実装:
"""
データクリーニングと前処理を実装してください。

ファイル: scripts/02_clean_data.py

要件:
1. 欠損値処理
   - 欠損率が 50% 以上のカラムは削除
   - 欠損率が低いカラムは補完（平均値または最新値）

2. 外れ値処理
   - IQR 方式で外れ値を検出
   - 外れ値をフラグ付けまたは削除

3. データ型変換
   - date カラムを datetime に変換
   - category を category 型に変換

4. スケーリング
   - 数値カラムを標準化（StandardScaler）

5. 特徴エンジニアリング
   - date から year, month, day を抽出
   - 時系列ラグ特徴を作成（前日、前週の値）
   - sales_per_quantity（平均販売単価）を計算

出力:
- data/processed/cleaned_data.csv （処理済みデータ）
- data/processed/feature_info.json （特徴情報）

ログ出力で各ステップの処理件数を表示。
"""`,
    codeLanguage: "plaintext",
  },
  {
    stepNumber: 5,
    title: "Jupyter Notebook で探索的分析",
    description: "Jupyter Notebook で対話的にデータを探索します。",
    code: `# Jupyter を起動
jupyter notebook

# ブラウザで新規ノートブック作成: analysis.ipynb

# セル1: ライブラリインポート
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# セル2: データ読み込み
df = pd.read_csv('data/processed/cleaned_data.csv')
print(df.shape)
print(df.head())

# セル3: カテゴリ別売上分析
df.groupby('category')['sales'].agg(['sum', 'mean', 'count', 'std'])

# セル4: 月別トレンド
df.set_index('date').resample('M')['sales'].sum().plot()

# セル5: 地域別分析
sns.boxplot(data=df, x='region', y='sales')

# セル6: 相関分析
correlation = df.corr()
sns.heatmap(correlation, annot=True, cmap='coolwarm')`,
    codeLanguage: "python",
    callout: {
      type: "tip",
      message: "Notebook は対話的な分析に最適。仮説を立てて検証でき、実験的なコードを試しやすいです。",
    },
  },
  {
    stepNumber: 6,
    title: "機械学習モデルを構築",
    description: "scikit-learn で予測モデルを実装します。",
    code: `# Claude Code で実装:
"""
機械学習モデルを構築してください。

ファイル: scripts/03_train_models.py

要件:
1. データ分割
   - 訓練データ：テストデータ = 80:20

2. モデルの実装と比較
   - 線形回帰（ベースライン）
   - ランダムフォレスト
   - グラデーションブースティング（XGBoost）
   - neural network（Keras または scikit-learn）

3. モデル評価
   - RMSE, MAE, R² スコア
   - 交差検証（5-fold）
   - 特徴量の重要度分析

4. ハイパーパラメータ最適化
   - GridSearchCV または RandomizedSearchCV
   - 最適なパラメータを記録

5. 最終モデル
   - 最高精度のモデルを選択
   - models/ に保存（pickle または joblib）

出力:
- models/best_model.pkl （学習済みモデル）
- results/model_performance.csv （評価メトリクス）
- results/feature_importance.csv （特徴量重要度）

ログ出力で各モデルの性能を表示。
"""`,
    codeLanguage: "plaintext",
    callout: {
      type: "warning",
      message: "機械学習は複数のモデルを試すことが重要。Claude Code で複数モデルの実装と比較コードを一度に生成できます。",
    },
  },
  {
    stepNumber: 7,
    title: "予測と結果可視化",
    description: "モデルで予測を実施し、結果を可視化します。",
    code: `# Claude Code で実装:
"""
予測結果を可視化してください。

ファイル: scripts/04_visualize_results.py

要件:
1. 予測 vs 実績の比較
   - テストデータで予測を実施
   - 予測値と実績値をプロット
   - 残差プロット

2. 複数の可視化
   - 実績 vs 予測（散布図）
   - 残差分布（ヒストグラム）
   - 特徴量重要度（棒グラフ）
   - 予測精度の分布（箱ひげ図）

3. インタラクティブなダッシュボード
   - Plotly で作成
   - カテゴリ別、地域別の予測精度を表示
   - HTML で保存

出力:
- figures/predictions_vs_actual.png
- figures/residuals.png
- figures/feature_importance.png
- results/interactive_dashboard.html

形式:
- matplotlib で静止画
- plotly でインタラクティブ
"""`,
    codeLanguage: "plaintext",
  },
  {
    stepNumber: 8,
    title: "レポートを生成",
    description: "分析結果をまとめたレポートを生成します。",
    code: `# Claude Code で実装:
"""
分析結果レポートを Markdown と Excel で生成してください。

ファイル: scripts/05_generate_report.py

内容:
1. Markdown レポート (reports/analysis_report.md)
   - 分析概要
   - データセット説明
   - 前処理内容
   - モデル性能比較表
   - 結論と推奨事項

2. Excel レポート (reports/analysis_report.xlsx)
   - Sheet1: 要約統計
   - Sheet2: モデル性能
   - Sheet3: 予測結果（サンプル）
   - Sheet4: 特徴量重要度
   - Sheet5: 推奨事項

3. PDF（オプション）
   - reportlab または FPDF で生成
   - グラフを埋め込み

要件:
- 日本語フォント対応
- グラフを埋め込み（Excel）
- テーブルのフォーマット（太字、色分け）
- 実行日時を自動挿入

実行ログ出力も含める。
"""`,
    codeLanguage: "plaintext",
  },
  {
    stepNumber: 9,
    title: "予測パイプラインを自動化",
    description: "新しいデータに対する予測を自動的に実行するパイプラインを作成します。",
    code: `# Claude Code で実装:
"""
新規データに対する予測パイプラインを実装してください。

ファイル: scripts/predict_pipeline.py

要件:
1. 学習済みモデルのロード
2. 前処理パイプラインの再利用
   - スケーラーをロード
   - 同じ特徴エンジニアリングを適用

3. 新規データの予測
   - CSV ファイルを入力
   - 同じデータ型チェック

4. 予測結果の出力
   - results/predictions.csv
   - 予測値、信頼度（確率）を含める

5. エラーハンドリング
   - 異常値検出（学習データの範囲外）
   - 欠損値対応
   - 型チェック

使用例:
python scripts/predict_pipeline.py --input data/new_data.csv --output results/predictions.csv
"""`,
    codeLanguage: "plaintext",
  },
  {
    stepNumber: 10,
    title: "Git で管理と最終コミット",
    description: "プロジェクト全体を Git で管理し、再現可能な環境を構築します。",
    code: `# .gitignore を作成
cat > .gitignore << 'EOF'
venv/
__pycache__/
.ipynb_checkpoints/
*.pyc
.env
.DS_Store
data/raw/
data/processed/
models/
results/
figures/
*.xlsx
*.csv
*.pkl
*.joblib
.jupyter_notebooks/
EOF

# Git リポジトリを初期化
git init

# コミット
git add .
git commit -m "feat: データサイエンスプロジェクト完成

- データ探索スクリプト実装
- データクリーニングと前処理
- 複数の機械学習モデル構築（線形回帰、ランダムフォレスト等）
- ハイパーパラメータ最適化
- 結果の可視化（matplotlib, Plotly）
- 分析レポート自動生成（Markdown, Excel）
- 予測パイプライン実装
- requirements.txt で依存関係管理
- Jupyter Notebook で探索的分析"

# リモートリポジトリに反映（オプション）
git remote add origin <repository_url>
git push -u origin main`,
    codeLanguage: "bash",
  },
]

const promptExamples = [
  {
    title: "例1: 欠損値処理と外れ値検出",
    tool: "Claude Code",
    prompt: `データセットの欠損値処理と外れ値検出を実装:

要件:
1. 欠損率確認と可視化（ヒートマップ）
2. 欠損値補完（平均値、中央値、forward fill）
3. IQR 方式で外れ値検出
4. 外れ値の可視化（箱ひげ図）
5. 処理済みデータ保存

ログで処理前後の件数比較を出力。`,
    response: `✅ 完成: 02_clean_data.py
- pd.isna() で欠損値確認
- fillna() で補完
- describe() から Q1, Q3, IQR 計算
- 外れ値フラグ付け
- 処理サマリーをログ出力`,
  },
  {
    title: "例2: 複数モデルの比較",
    tool: "Claude Code",
    prompt: `線形回帰、ランダムフォレスト、XGBoost を実装・比較:

要件:
- 訓練・テストデータ分割
- 各モデルのハイパーパラメータ設定
- 交差検証で精度評価（RMSE, MAE, R²）
- モデル比較表をコンソール出力
- 最高精度モデルを保存

テストデータでも検証。`,
    response: `✅ 完成: 03_train_models.py
- sklearn, xgboost インポート
- train_test_split で分割
- GridSearchCV で最適化
- cross_val_score で評価
- 結果を DataFrame で比較表示`,
  },
  {
    title: "例3: インタラクティブなダッシュボード",
    tool: "Claude Code",
    prompt: `Plotly でインタラクティブなダッシュボード作成:

要件:
- 実績 vs 予測プロット
- 残差分布
- 特徴量重要度（上位 10）
- カテゴリ別・地域別の精度
- ドロップダウンでフィルタリング
- HTML で保存してブラウザ表示

レスポンシブデザイン対応。`,
    response: `✅ 完成: interactive_dashboard.html
- plotly.graph_objects で作成
- subplot で複数グラフ配置
- dropdown で動的フィルタリング
- .show() でブラウザ表示
- export ボタン付き`,
  },
]

const bestPractices = [
  {
    practice: "データ管理",
    tips: [
      "raw/ に元データを保存（編集禁止）",
      "processed/ に処理済みデータを保存",
      "各ステップで中間ファイルを保存（再利用可能）",
      "README.md でデータセット情報を記録",
    ],
  },
  {
    practice: "コード管理",
    tips: [
      "scripts/ に各ステップのスクリプトを分割",
      "関数型プログラミングで再利用性向上",
      "エラーハンドリングとログを必須",
      "requirements.txt で依存関係を管理",
    ],
  },
  {
    practice: "モデル管理",
    tips: [
      "学習済みモデルは models/ に保存",
      "モデルバージョンを記録（日時など）",
      "スケーラーやエンコーダーも保存",
      "予測時に同じ前処理パイプラインを適用",
    ],
  },
  {
    practice: "結果の再現性",
    tips: [
      "乱数シードを固定（np.random.seed()）",
      "同じ環境で同じ結果が得られることを確認",
      "パイプラインをスクリプト化（手動操作なし）",
      "Git で全コードを管理",
    ],
  },
]

export default function DataSciencePage() {
  return (
    <div className="space-y-12">
      {/* ページタイトル */}
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">
          データサイエンスユースケース
        </h1>
        <p className="text-lg text-muted-foreground">
          Python + Pandas + scikit-learn を使ったデータサイエンスプロジェクト全体を、
          Claude Code で効率化します。データ前処理、探索的分析、機械学習モデル構築、
          結果可視化まで、実務で使える完全なワークフローを学びます。
        </p>
      </div>

      {/* 概要カード */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-muted-foreground">所要時間</span>
              </div>
              <CardTitle>4-5時間</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              セットアップから本番モデル完成まで。
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-muted-foreground">難易度</span>
              </div>
              <CardTitle>⭐⭐⭐ 上級者向け</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              統計とアルゴリズム知識が必須。
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-muted-foreground">スキル</span>
              </div>
              <CardTitle>複合領域</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              統計、ML、データ可視化。
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-muted-foreground">成果物</span>
              </div>
              <CardTitle>本番対応</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              予測パイプライン＋レポート。
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 前提条件 */}
      <Callout type="info" title="前提条件">
        <ul className="list-disc list-inside space-y-2">
          <li>Python 3.8 以上がインストール済み</li>
          <li>分析対象のデータセット（CSV または Excel）</li>
          <li>統計学と機械学習の基本知識</li>
          <li>Pandas, NumPy, scikit-learn の基本的な使い方</li>
          <li>Claude Code がインストール済み</li>
          <li>Git がインストール済み（プロジェクト管理用）</li>
          <li>Jupyter Notebook の操作経験（推奨）</li>
        </ul>
      </Callout>

      {/* 完成イメージ */}
      <section>
        <h2 className="text-2xl font-bold mb-6">完成イメージ：売上予測プロジェクト</h2>
        <Card>
          <CardHeader>
            <CardTitle>構築するデータサイエンスパイプライン</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span>
                  <strong>データ探索：</strong> 統計情報、分布、相関分析
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span>
                  <strong>前処理パイプライン：</strong> 欠損値、外れ値、スケーリング
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span>
                  <strong>特徴エンジニアリング：</strong> 時系列特徴、相互作用項
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span>
                  <strong>複数モデル比較：</strong> 線形回帰、RF、XGBoost、ニューラルネット
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span>
                  <strong>ハイパーパラメータ最適化：</strong> GridSearch で最高性能モデル
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span>
                  <strong>可視化・ダッシュボード：</strong> 予測 vs 実績、インタラクティブチャート
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span>
                  <strong>レポート生成：</strong> Markdown, Excel, PDF で自動レポート
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span>
                  <strong>予測パイプライン：</strong> 新規データで自動予測
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* ワークフロー */}
      <section>
        <h2 className="text-2xl font-bold mb-6">完全なワークフロー</h2>
        <StepByStep steps={workflowSteps} />
      </section>

      {/* プロンプト例 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">効果的なプロンプト例と応答</h2>
        <div className="space-y-6">
          {promptExamples.map((example, idx) => (
            <Card key={idx}>
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-lg">{example.title}</CardTitle>
                  <span className="px-2 py-1 text-xs font-semibold bg-primary/10 text-primary rounded">
                    {example.tool}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">プロンプト</h4>
                  <CodeBlock code={example.prompt} language="plaintext" />
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">応答の概要</h4>
                  <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded text-sm border border-green-200 dark:border-green-800">
                    <p className="text-muted-foreground">{example.response}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ベストプラクティス */}
      <section>
        <h2 className="text-2xl font-bold mb-6">データサイエンスプロジェクトのベストプラクティス</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bestPractices.map((item, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle className="text-lg">{item.practice}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {item.tips.map((tip, tipIdx) => (
                    <li key={tipIdx} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center mt-0.5">
                        ✓
                      </span>
                      <span className="text-sm text-muted-foreground">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ツール比較 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Claude Code vs 他のツール</h2>
        <Card>
          <CardHeader>
            <CardTitle>データサイエンスタスク別のおすすめツール</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">タスク</th>
                    <th className="text-left py-3 px-4 font-semibold">Claude Code</th>
                    <th className="text-left py-3 px-4 font-semibold">Jupyter</th>
                    <th className="text-left py-3 px-4 font-semibold">推奨</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4">データ探索</td>
                    <td className="py-3 px-4">スクリプト化（自動化）</td>
                    <td className="py-3 px-4">対話的実験</td>
                    <td className="py-3 px-4">Jupyter</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">前処理パイプライン</td>
                    <td className="py-3 px-4">✅ 完全実装</td>
                    <td className="py-3 px-4">⭕ 実験向け</td>
                    <td className="py-3 px-4">Claude Code</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">モデル構築・比較</td>
                    <td className="py-3 px-4">✅ 複数モデル一括</td>
                    <td className="py-3 px-4">⭕ 個別実験</td>
                    <td className="py-3 px-4">Claude Code</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">可視化</td>
                    <td className="py-3 px-4">✅ matplotlib, Plotly</td>
                    <td className="py-3 px-4">✅ インライン表示</td>
                    <td className="py-3 px-4">同等</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">レポート生成</td>
                    <td className="py-3 px-4">✅ 自動化</td>
                    <td className="py-3 px-4">⭕ 手動</td>
                    <td className="py-3 px-4">Claude Code</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">本番パイプライン</td>
                    <td className="py-3 px-4">✅ 再現可能</td>
                    <td className="py-3 px-4">❌ 不向き</td>
                    <td className="py-3 px-4">Claude Code</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6"><Callout type="tip" title="推奨使い分け">
              <ul className="space-y-2">
                <li>
                  <strong>Claude Code：</strong> 本番パイプライン、複雑な前処理、複数モデル比較
                </li>
                <li>
                  <strong>Jupyter Notebook：</strong> 初期探索、仮説検証、ビジュアル確認
                </li>
                <li>
                  <strong>併用ベストプラクティス：</strong> Notebook で仮説検証 → Claude Code でスクリプト化 → 本番運用
                </li>
              </ul>
            </Callout></div>
          </CardContent>
        </Card>
      </section>

      {/* よくある問題 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">よくある問題と解決方法</h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 shrink-0" />
                Q: データリークが発生している可能性（前処理がテストデータに影響）
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                <strong>原因：</strong> 全データに対してスケーリングをして、その後に訓練・テスト分割している。
              </p>
              <p>
                <strong>解決方法：</strong> 必ず訓練・テスト分割してから、訓練データの統計量でスケーリング：
              </p>
              <CodeBlock
                code={`# 正しい順序
from sklearn.preprocessing import StandardScaler

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# 訓練データで fit
scaler = StandardScaler().fit(X_train)

# 訓練・テスト共に transform
X_train_scaled = scaler.transform(X_train)
X_test_scaled = scaler.transform(X_test)`}
                language="python"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 shrink-0" />
                Q: モデルの予測精度が訓練時と大きく異なる（過学習）
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                <strong>原因：</strong> モデルが訓練データに過適応している。ハイパーパラメータ調整が不十分。
              </p>
              <p>
                <strong>解決方法：</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>交差検証（cross_val_score）で評価</li>
                <li>正則化パラメータを調整（alpha for Ridge/Lasso）</li>
                <li>GridSearchCV でハイパーパラメータを最適化</li>
                <li>訓練データサイズを増やす</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 shrink-0" />
                Q: Jupyter Notebook のコードが本番スクリプトで動作しない
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                <strong>原因：</strong> Notebook はセル間に依存性があり、セルの実行順序が重要。本スクリプトに変換する際に順序を誤った。
              </p>
              <p>
                <strong>解決方法：</strong> Claude Code に「Notebook のロジックを .py ファイルにリファクタリング」と依頼。セル実行順序を Python 上で再現します。
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 shrink-0" />
                Q: requirements.txt が古く、新規環境でパッケージのバージョン競合
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                <strong>原因：</strong> 依存関係の記録が古い、または間接依存関係の考慮不足。
              </p>
              <p>
                <strong>解決方法：</strong> 定期的に更新。必要に応じてバージョンピンニング：
              </p>
              <CodeBlock
                code={`# 最新バージョン記録
pip freeze > requirements_latest.txt

# または明示的にバージョン指定
pandas==2.0.3
scikit-learn==1.2.2
numpy==1.24.3`}
                language="bash"
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 応用例 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">実務応用例</h2>
        <Card>
          <CardHeader>
            <CardTitle>このワークフローを応用できるプロジェクト</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-sm mb-1">1. 売上予測・需要予測</h4>
                <p className="text-sm text-muted-foreground">
                  時系列データの分析、季節性・トレンド考慮、複数モデルの比較
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">2. 顧客分析・セグメンテーション</h4>
                <p className="text-sm text-muted-foreground">
                  クラスタリング（K-means, DBSCAN）、顧客ライフタイムバリュー分析
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">3. チャーン予測</h4>
                <p className="text-sm text-muted-foreground">
                  離脱顧客の予測、特徴量重要度で離脱要因を特定
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">4. 異常検知</h4>
                <p className="text-sm text-muted-foreground">
                  Isolation Forest, Local Outlier Factor で異常検知
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">5. 推薦システム</h4>
                <p className="text-sm text-muted-foreground">
                  協調フィルタリング、コンテンツベースフィルタリング
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">6. テキスト分析（NLP）</h4>
                <p className="text-sm text-muted-foreground">
                  感情分析、トピック抽出、テキスト分類
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
                データサイエンスをマスターしたら、次へ：
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-primary hover:underline">
                    時系列分析（ARIMA, Prophet, LSTM）
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-primary hover:underline">
                    ディープラーニング（TensorFlow, PyTorch）
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-primary hover:underline">
                    自然言語処理（NLP, Transformers）
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-primary hover:underline">
                    因果推論（CausalML）
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
                <li>Kaggle データセットで練習</li>
                <li>会社の既存データで分析</li>
                <li>API からデータ取得して分析</li>
                <li>予測パイプラインを定期実行</li>
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

      {/* チェックリスト */}
      <section>
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              ✅ 実装チェックリスト
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">Python 環境セットアップ + requirements.txt</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">データセット準備と初期確認</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">探索的分析スクリプト実装</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">データクリーニング・前処理パイプライン</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">Jupyter Notebook で仮説検証</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">複数モデルの構築・比較</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">ハイパーパラメータ最適化</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">結果可視化・ダッシュボード作成</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">自動レポート生成（Markdown, Excel）</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">予測パイプライン実装</span>
              </label>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              すべてのチェックが完了したら、本番運用に移行できます！
            </p>
          </CardContent>
        </Card>
      </section>

      {/* フィードバック */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>フィードバック</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              このガイドはいかがでしたか？データサイエンスプロジェクトでの課題や改善提案があればお聞かせください。
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/tutorials/first-30-minutes">
                <Button variant="primary">チュートリアルに戻る</Button>
              </Link>
              <Link href="/getting-started">
                <Button variant="outline">はじめにページに戻る</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
