'use client'

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Callout } from "@/components/content/callout"
import { CodeBlock } from "@/components/content/code-block"
import { CostCalculator } from "@/components/interactive/cost-calculator"
import { TrendingDown, DollarSign, Zap, BarChart3, Target, BookOpen } from "lucide-react"

interface ModelOption {
  readonly name: string
  readonly tier: string
  readonly inputPrice: number
  readonly outputPrice: number
  readonly use: string
  readonly savings: string
}

interface TechniqueProps {
  readonly title: string
  readonly description: string
  readonly reduction: number
  readonly difficulty: "easy" | "medium" | "hard"
  readonly example: string
}

interface ScenarioProps {
  readonly name: string
  readonly tasksPerDay: number
  readonly avgCostPerTask: number
  readonly workingDaysPerMonth: number
  readonly description: string
}

function ModelFlowchart() {
  const models: ModelOption[] = [
    {
      name: "Haiku 4.5",
      tier: "軽量級",
      inputPrice: 0.80,
      outputPrice: 4.0,
      use: "単純な補完、簡単な説明、テキスト処理",
      savings: "Opus比 95%削減"
    },
    {
      name: "Sonnet 4.5",
      tier: "バランス型",
      inputPrice: 3.0,
      outputPrice: 15.0,
      use: "通常の開発タスク、コード生成、バグ修正",
      savings: "最適なコスト・性能比"
    },
    {
      name: "Opus 4.6",
      tier: "ハイエンド",
      inputPrice: 5.0,
      outputPrice: 25.0,
      use: "複雑な推論、アーキテクチャ設計、複雑な問題解決",
      savings: "最高性能（必要な時のみ）"
    },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 rounded-lg border border-blue-200 dark:border-blue-800 p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Target className="h-5 w-5" />
          モデル選択フローチャート
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100 flex items-center justify-center font-bold">1</div>
            <span>タスクの複雑さを評価</span>
          </div>
          <div className="flex items-center gap-3 ml-8">
            <span className="text-amber-600 dark:text-amber-400">→</span>
            <span><strong>簡単</strong>（説明、リファクタリング提案）<strong className="text-green-600 dark:text-green-400">Haiku 4.5</strong></span>
          </div>
          <div className="flex items-center gap-3 ml-8">
            <span className="text-amber-600 dark:text-amber-400">→</span>
            <span><strong>中程度</strong>（通常のコード生成）<strong className="text-blue-600 dark:text-blue-400">Sonnet 4.5</strong></span>
          </div>
          <div className="flex items-center gap-3 ml-8">
            <span className="text-amber-600 dark:text-amber-400">→</span>
            <span><strong>複雑</strong>（アーキテクチャ、複雑な推論）<strong className="text-purple-600 dark:text-purple-400">Opus 4.6</strong></span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100 flex items-center justify-center font-bold">2</div>
            <span>予想トークン使用量を確認</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100 flex items-center justify-center font-bold">3</div>
            <span>月間予算をシミュレーション（下記参照）</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {models.map((model) => (
          <Card key={model.name}>
            <CardHeader>
              <CardTitle className="text-base">{model.name}</CardTitle>
              <p className="text-xs text-muted-foreground">{model.tier}</p>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="text-xs font-semibold text-muted-foreground">価格（100万トークンあたり）</p>
                <p className="text-lg font-bold text-green-600 dark:text-green-400">
                  入力: ${model.inputPrice.toFixed(2)} | 出力: ${model.outputPrice.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-1">用途</p>
                <p className="text-xs">{model.use}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-1">節約効果</p>
                <p className="text-xs bg-green-50 dark:bg-green-950/50 text-green-700 dark:text-green-300 px-2 py-1 rounded">
                  {model.savings}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function TokenReductionTechniques() {
  const techniques: TechniqueProps[] = [
    {
      title: "テクニック1: 必要なファイルのみを指定",
      description: "全コードベースではなく、作業対象のファイルだけをAIに提示します。",
      reduction: 85,
      difficulty: "easy",
      example: `❌ @codebase 全体のコードを見てこのバグを修正して

✅ @src/components/Button.tsx このコンポーネントのバグを修正してください`
    },
    {
      title: "テクニック2: /compact コマンドで履歴圧縮",
      description: "長時間のセッション後に履歴を要約してコンテキストウィンドウをリセット。",
      reduction: 60,
      difficulty: "easy",
      example: `/compact

↓ Claude Code が履歴を自動要約
- 実施済みのタスク
- 重要な決定事項
- 現在のプロジェクト状態`
    },
    {
      title: "テクニック3: 不要なファイルを .claudeignore で除外",
      description: ".claudeignore ファイルで大きなディレクトリをAIの対象外にします。",
      reduction: 90,
      difficulty: "easy",
      example: `# .claudeignore
node_modules/
dist/
build/
*.log
coverage/
.next/
__pycache__/`
    },
    {
      title: "テクニック4: プロンプトキャッシュ活用",
      description: "CLAUDE.md ファイルで繰り返し参照する情報をキャッシュ化。",
      reduction: 75,
      difficulty: "medium",
      example: `# CLAUDE.md に共通情報を記述
プロジェクト構成、技術スタック、開発ルール等を記述

↓ 毎回の読み込みで利用（初回以降は無料）`
    },
    {
      title: "テクニック5: タスクを分割・段階的に実行",
      description: "1つの大きなタスクを複数の小さなタスクに分割して実行。",
      reduction: 70,
      difficulty: "medium",
      example: `❌ 「Eコマースサイト全体を作ってください」（高コスト）

✅ 1. ホームページを作成
   2. 商品一覧ページを実装
   3. 決済機能を追加
   4. 管理画面を構築（各タスク独立）`
    },
    {
      title: "テクニック6: 結果の確認後、キャッシュを再利用",
      description: "複数回の改善で同じファイルを修正する際、キャッシュから再利用。",
      reduction: 50,
      difficulty: "hard",
      example: `第1回: テストを書く（キャッシュ作成）→ $1.20
第2回: バグ修正（キャッシュ再利用）→ $0.60
第3回: 最適化（キャッシュ再利用）→ $0.60`
    },
  ]

  const difficultyColors = {
    easy: "bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800",
    medium: "bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800",
    hard: "bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800",
  }

  const difficultyLabels = {
    easy: "簡単",
    medium: "中程度",
    hard: "高度",
  }

  return (
    <div className="space-y-6">
      {techniques.map((tech, idx) => (
        <Card key={idx} className={`${difficultyColors[tech.difficulty]} border-2`}>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <CardTitle className="text-lg">{tech.title}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{tech.description}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{tech.reduction}%</div>
                <p className="text-xs text-muted-foreground">削減率</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-xs font-semibold mb-2">難易度: <span className="font-bold">{difficultyLabels[tech.difficulty]}</span></p>
              <CodeBlock code={tech.example} language="bash" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function BudgetSimulator() {
  const scenarios: ScenarioProps[] = [
    {
      name: "個人開発者（軽度使用）",
      tasksPerDay: 5,
      avgCostPerTask: 0.50,
      workingDaysPerMonth: 20,
      description: "趣味プロジェクト、副業、学習目的"
    },
    {
      name: "フリーランス開発者（中度使用）",
      tasksPerDay: 10,
      avgCostPerTask: 1.20,
      workingDaysPerMonth: 22,
      description: "複数の案件を並行、定期メンテナンス"
    },
    {
      name: "フルタイム開発者（重度使用）",
      tasksPerDay: 20,
      avgCostPerTask: 1.50,
      workingDaysPerMonth: 20,
      description: "毎日AI支援、複雑なアーキテクチャ設計"
    },
    {
      name: "スタートアップチーム（超重度使用）",
      tasksPerDay: 100,
      avgCostPerTask: 1.80,
      workingDaysPerMonth: 20,
      description: "5人チーム、全員が毎日利用"
    },
  ]

  return (
    <div className="space-y-6">
      {scenarios.map((scenario) => {
        const dailyCost = scenario.tasksPerDay * scenario.avgCostPerTask
        const monthlyCost = dailyCost * scenario.workingDaysPerMonth
        const yearlyCost = monthlyCost * 12

        return (
          <Card key={scenario.name}>
            <CardHeader>
              <CardTitle className="text-lg">{scenario.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{scenario.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded">
                  <p className="text-xs font-semibold text-muted-foreground">1日あたり</p>
                  <p className="text-xl font-bold text-blue-600 dark:text-blue-400">${dailyCost.toFixed(2)}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded">
                  <p className="text-xs font-semibold text-muted-foreground">月間（{scenario.workingDaysPerMonth}日）</p>
                  <p className="text-xl font-bold text-green-600 dark:text-green-400">${monthlyCost.toFixed(2)}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded">
                  <p className="text-xs font-semibold text-muted-foreground">年間</p>
                  <p className="text-xl font-bold text-purple-600 dark:text-purple-400">${yearlyCost.toFixed(2)}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded">
                  <p className="text-xs font-semibold text-muted-foreground">推奨プラン</p>
                  <p className="text-sm font-bold">
                    {monthlyCost < 20 ? "API従量課金" : monthlyCost < 100 ? "Pro" : "Max"}
                  </p>
                </div>
              </div>

              <Callout type="info">
                <strong>内訳:</strong> {scenario.tasksPerDay}タスク/日 × ${scenario.avgCostPerTask.toFixed(2)}/タスク = ${dailyCost.toFixed(2)}/日
              </Callout>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

function SubscriptionComparison() {
  const [monthlyUsage, setMonthlyUsage] = useState(50)

  const apiCost = monthlyUsage
  const proCost = 20
  const maxCost = 100

  const savings = {
    proVsApi: Math.max(0, apiCost - proCost),
    maxVsApi: Math.max(0, apiCost - maxCost),
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="mb-4">
          <label className="text-sm font-semibold block mb-2">
            月間予想API使用料: <span className="text-xl font-bold text-blue-600 dark:text-blue-400">${monthlyUsage}</span>
          </label>
          <input
            type="range"
            min="0"
            max="500"
            value={monthlyUsage}
            onChange={(e) => setMonthlyUsage(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>$0</span>
            <span>$500</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* API従量課金 */}
        <Card className="border-gray-200 dark:border-gray-800">
          <CardHeader>
            <CardTitle className="text-base">API 従量課金</CardTitle>
            <p className="text-xs text-muted-foreground">使った分だけ支払い</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded">
              <p className="text-xs font-semibold text-muted-foreground">月間コスト</p>
              <p className="text-2xl font-bold">${apiCost}</p>
            </div>
            <div>
              <p className="text-xs font-semibold mb-2">対象者</p>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>• 月 $20 未満の使用</li>
                <li>• 不定期利用</li>
                <li>• 試験的な利用</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Pro */}
        <Card className={`${apiCost > proCost ? 'border-2 border-green-500 dark:border-green-400' : ''}`}>
          <CardHeader>
            <CardTitle className="text-base">Pro ($20/月)</CardTitle>
            <p className="text-xs text-muted-foreground">Claude.ai でPro アクセス</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 dark:bg-green-950/50 p-3 rounded">
              <p className="text-xs font-semibold text-muted-foreground">月間コスト</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">$20</p>
              {savings.proVsApi > 0 && (
                <p className="text-xs text-green-600 dark:text-green-400 font-semibold mt-1">
                  節約: ${savings.proVsApi}/月
                </p>
              )}
            </div>
            <div>
              <p className="text-xs font-semibold mb-2">メリット</p>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>• 月 $20 以上なら圧倒的にお得</li>
                <li>• 優先的なサーバアクセス</li>
                <li>• 新モデルへの早期アクセス</li>
                <li>• Artifacts 機能（コード生成）</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Max */}
        <Card className={`${apiCost > maxCost ? 'border-2 border-purple-500 dark:border-purple-400' : ''}`}>
          <CardHeader>
            <CardTitle className="text-base">Max ($100-200/月)</CardTitle>
            <p className="text-xs text-muted-foreground">Claude.ai Max サブスク</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-purple-50 dark:bg-purple-950/50 p-3 rounded">
              <p className="text-xs font-semibold text-muted-foreground">月間コスト</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">$200</p>
              {savings.maxVsApi > 0 && (
                <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold mt-1">
                  節約: ${savings.maxVsApi}/月
                </p>
              )}
            </div>
            <div>
              <p className="text-xs font-semibold mb-2">メリット</p>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>• 月 $100+ で検討価値</li>
                <li>• Opus 4.6へのアクセス</li>
                <li>• 無制限チャット履歴</li>
                <li>• ファイル分析（PDF, 画像等）</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <Callout type="tip">
        <strong>判断基準:</strong>
        <ul className="list-disc list-inside ml-2 mt-2">
          <li>月 $20 未満 → API 従量課金で十分</li>
          <li>月 $20-100 → Pro プランがお得</li>
          <li>月 $100 以上 → Max プランを検討</li>
        </ul>
      </Callout>
    </div>
  )
}

function PromptCachingExamples() {
  const examples = [
    {
      title: "CLAUDE.md でプロジェクト情報をキャッシュ",
      description: "プロジェクト構成、技術スタック、ルールをまとめて毎回利用",
      content: `# CLAUDE.md

## プロジェクト概要
Next.js + TypeScript + Prisma + PostgreSQL の Eコマースサイト

## ディレクトリ構成
- \`app/\`: Next.js App Router
- \`components/\`: React コンポーネント
- \`lib/\`: ユーティリティ関数
- \`prisma/\`: DB スキーマ

## 技術ルール
1. 必ず TypeScript を使用
2. コンポーネントは 200-400 行以内
3. 全機能にユニットテスト必須
4. エラーハンドリングは try-catch + ログ出力
5. 環境変数は .env.local に記述

## アーキテクチャ決定事項
- 認証: NextAuth.js
- DB ORM: Prisma
- スタイリング: Tailwind CSS
- キャッシング: Redis（予定）

使用方法:
セッション開始時に @CLAUDE.md を参照することで、
共通情報がキャッシュされ、以後のリクエストで再利用される`
    },
    {
      title: "API ドキュメントをキャッシュ",
      description: "API 仕様書、レスポンス形式、エラーコード",
      content: `# API 仕様書（キャッシュ対象）

## ベース URL
https://api.example.com/v1

## 認証
Authorization: Bearer {token}

## レスポンス形式
\`\`\`json
{
  "success": true,
  "data": { /* 実データ */ },
  "meta": { "total": 100 }
}
\`\`\`

## エラーコード
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 429: Rate Limited
- 500: Server Error

## エンドポイント一覧
[全エンドポイントの詳細...]

利点:
- 新しいタスク開始時に最初の1回だけキャッシュ作成
- 以後のトークン消費が削減される`
    },
    {
      title: "システムプロンプト + 開発ルール集をキャッシュ",
      description: "AIに与える共通指示とコーディング規約",
      content: `# システムプロンプト（キャッシュ対象）

## 基本指示
あなたは経験豊富なシニア開発者です。
以下のルールに従ってコードを生成してください。

## コーディング規約
1. **関数**: 50行以内、1つの責務
2. **ネーミング**: 完全な英単語、キャメルケース
3. **エラー処理**: 必ず try-catch、ユーザー向けメッセージ
4. **テスト**: 各関数に対応するテストコード

## パフォーマンス基準
- ページロード時間: 2秒以内
- API レスポンス: 500ms 以内
- バンドルサイズ: 500KB 以内

## セキュリティ要件
- 入力値検証（Zod）
- SQL インジェクション対策
- XSS 対策（sanitize）
- CSRF 対策

初回でキャッシュ作成 → 以後は無料利用`
    },
  ]

  return (
    <div className="space-y-6">
      {examples.map((ex, idx) => (
        <Card key={idx}>
          <CardHeader>
            <CardTitle className="text-lg">{ex.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{ex.description}</p>
          </CardHeader>
          <CardContent>
            <CodeBlock code={ex.content} language="markdown" />
            <div className="mt-4"><Callout type="tip">
              このファイルを @CLAUDE.md で参照すると、最初のリクエストで費用がかかりますが、その後は <strong>キャッシュ対象</strong> として扱われ、トークン消費が大幅に削減されます。
            </Callout></div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function CompactCommandGuide() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            /compact コマンドの活用方法
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-base mb-2">コマンド説明</h4>
            <p className="text-sm text-muted-foreground">
              長時間のセッションで蓄積したチャット履歴を圧縮し、
              コンテキストウィンドウをリセットしながら重要な情報を保持します。
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded">
            <h4 className="font-semibold mb-2">使用タイミング</h4>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• チャットが 100+ メッセージを超えた</li>
              <li>• 「Context window exceeded」エラーが出た</li>
              <li>• セッションが 2時間+ 継続している</li>
              <li>• 別の大きなファイルを追加したい</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">実行方法</h4>
            <CodeBlock code={`# Claude Code 内でコマンド入力
/compact

# または
/compress`} language="bash" />
          </div>

          <div className="bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800 p-4 rounded">
            <h4 className="font-semibold mb-2">実行後の流れ</h4>
            <ol className="text-sm space-y-2">
              <li><strong>1. 履歴の分析:</strong> AI が過去のやり取りを自動解析</li>
              <li><strong>2. 要約作成:</strong> 重要なポイント、決定事項、成果をまとめる</li>
              <li><strong>3. コンテキスト削減:</strong> 最大 50-70% のトークン削減</li>
              <li><strong>4. 新規コンテキストで開始:</strong> 要約をベースに続行</li>
            </ol>
          </div>

          <div>
            <h4 className="font-semibold mb-2">削減効果の例</h4>
            <CodeBlock code={`◇ 実際のセッション例 ◇

【compact 実行前】
- チャット履歴: 150 メッセージ
- コンテキスト使用量: 65,000 トークン
- 予想コスト: $2.00

【compact 実行後】
- 要約: 20 メッセージ相当
- コンテキスト使用量: 15,000 トークン
- 予想コスト: $0.50

✅ 削減率: 77%`} language="bash" />
          </div>

          <Callout type="warning">
            <strong>注意:</strong> /compact 実行後も、その後のやり取りで新しいトークンが消費されます。
            複数の大きなファイルを同時処理する場合は、別のセッションで開始することをお勧めします。
          </Callout>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Claude Code での具体的な使用例</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">シナリオ: 大型プロジェクトでの /compact 活用</h4>
            <CodeBlock code={`# セッション開始
$ claude

# タスク1: 認証機能の実装（30メッセージ、$1.50）
@lib/auth.ts を使って NextAuth の実装をしてください
... (完了)

# タスク2: データベース設定（20メッセージ、$0.80）
@prisma/schema.prisma を設定してください
... (完了)

# ここで /compact を実行
/compact

✅ 履歴圧縮完了
  要約: 認証機能を NextAuth で実装、Prisma スキーマを設定

# タスク3: 新しい大きなファイルを処理（コンテキスト余裕あり）
@components/Dashboard.tsx を実装してください
... (コンテキストに余裕あり、スムーズに処理）`} language="bash" />
          </div>

          <Callout type="info">
            <strong>ヒント:</strong> /compact は複数回実行可能です。
            超大型プロジェクトでは、主要フェーズごとに実行すると効果的です。
          </Callout>
        </CardContent>
      </Card>
    </div>
  )
}

function AdditionalTips() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Zap className="h-5 w-5" />
            実装のコツ
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <h5 className="font-semibold mb-1">1. バッチ処理で効率化</h5>
            <p className="text-muted-foreground">
              関連タスクを1つのセッションで処理すると、
              コンテキストの再構築費用が削減される。
            </p>
          </div>
          <div>
            <h5 className="font-semibold mb-1">2. 定期的な Haiku 活用</h5>
            <p className="text-muted-foreground">
              簡単な説明やコード補完は Haiku 4.5 で十分。
              複雑なタスクのみ Sonnet/Opus を使う。
            </p>
          </div>
          <div>
            <h5 className="font-semibold mb-1">3. 夜間の Bedrock 処理</h5>
            <p className="text-muted-foreground">
              Amazon Bedrock 経由なら、オンデマンド予約インスタンスで
              最大 35% の割引が可能。
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            月間予算管理
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <h5 className="font-semibold mb-1">API キーの利用上限設定</h5>
            <p className="text-muted-foreground">
              Anthropic Console から月間上限額を設定して、
              予算超過を防止できます。
            </p>
            <CodeBlock
              code={`Anthropic Console → Settings → Billing
→ Usage Limits で月間予算を設定`}
              language="bash"
            />
          </div>
          <div>
            <h5 className="font-semibold mb-1">複数チームでの管理</h5>
            <p className="text-muted-foreground">
              組織内でチームごとに API キーを分けて、
              部門別の利用状況を追跡できます。
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            学習効果とのバランス
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <h5 className="font-semibold mb-1">初期学習は高コスト</h5>
            <p className="text-muted-foreground">
              新しいフレームワークやライブラリを学ぶ初期段階では、
              より多くの質問が必要になります。これは投資と考えましょう。
            </p>
          </div>
          <div>
            <h5 className="font-semibold mb-1">習熟後は効率化</h5>
            <p className="text-muted-foreground">
              プロジェクトに慣れてくると、AI の支援も少なくなり、
              自動的にコストが削減されます。
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingDown className="h-5 w-5" />
            ROI の最大化
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <h5 className="font-semibold mb-1">時間 vs コストの分析</h5>
            <p className="text-muted-foreground">
              AI が 1時間の手作業を 5分で完成させたら、
              コスト $1.50 で 55分の時間節約
              （時給が $1.63 以上なら黒字）
            </p>
          </div>
          <div>
            <h5 className="font-semibold mb-1">品質向上による利益</h5>
            <p className="text-muted-foreground">
              テストやセキュリティチェックの強化で、
              バグの減少 → サポートコスト削減。
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function CostOptimizationPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-3 flex items-center gap-2">
          <DollarSign className="h-8 w-8 text-green-600 dark:text-green-400" />
          コスト最適化ガイド
        </h1>
        <p className="text-lg text-muted-foreground">
          Claude Code、Cursor、Manus AI のコストを最小化しながら生産性を最大化するための完全ガイド。
          モデル選択、トークン削減テクニック、月間予算管理まで、実践的な知識を提供します。
        </p>
      </div>

      <Callout type="success" title="このガイドで学べること">
        <ul className="list-disc list-inside space-y-1">
          <li>最適なモデル選択フローチャート</li>
          <li>5つ以上のトークン削減テクニック</li>
          <li>シナリオ別の月間予算シミュレーション</li>
          <li>Pro/Max vs API 従量課金の詳細比較</li>
          <li>プロンプトキャッシュの活用方法</li>
          <li>/compact コマンドの効果的な使い方</li>
        </ul>
      </Callout>

      {/* セクション1: モデル選択フローチャート */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Target className="h-6 w-6" />
          1. モデル選択フローチャート
        </h2>
        <ModelFlowchart />
      </section>

      {/* セクション1.5: コスト計算機 */}
      <section>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">使用パターンから月額コストを試算</h3>
          <p className="text-muted-foreground">
            あなたの利用パターンに合わせて、3つのツールの実際のコストを比較できます。
            スライダーを調整して、最適なモデルを見つけましょう。
          </p>
        </div>
        <CostCalculator />
      </section>

      {/* セクション2: トークン削減テクニック */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Zap className="h-6 w-6" />
          2. トークン削減テクニック（5つ以上）
        </h2>
        <Callout type="info">
          これらのテクニックを組み合わせると、月間コストを <strong>60-85%</strong> 削減できます。
        </Callout>
        <div className="mt-6">
          <TokenReductionTechniques />
        </div>
      </section>

      {/* セクション3: 月間予算シミュレーター */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <BarChart3 className="h-6 w-6" />
          3. 月間予算シミュレーター（シナリオ別）
        </h2>
        <Callout type="info">
          下記の 4つのシナリオから、自分の利用パターンに最も近いものを参考にしてください。
        </Callout>
        <div className="mt-6">
          <BudgetSimulator />
        </div>
      </section>

      {/* セクション4: Pro/Max vs API比較 */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <DollarSign className="h-6 w-6" />
          4. Pro/Max サブスクリプション vs API 従量課金
        </h2>
        <SubscriptionComparison />
      </section>

      {/* セクション5: プロンプトキャッシング */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Zap className="h-6 w-6" />
          5. プロンプトキャッシュ活用例
        </h2>
        <Callout type="success">
          プロンプトキャッシュを活用すると、<strong>同じファイル参照で 90% のトークン削減</strong> が可能です。
        </Callout>
        <div className="mt-6">
          <PromptCachingExamples />
        </div>
      </section>

      {/* セクション6: /compact コマンド */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Zap className="h-6 w-6" />
          6. /compact コマンドの使い方
        </h2>
        <CompactCommandGuide />
      </section>

      {/* セクション7: 追加ヒント */}
      <section>
        <h2 className="text-2xl font-bold mb-6">その他のコスト削減ヒント</h2>
        <AdditionalTips />
      </section>

      {/* セクション8: チェックリスト */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">コスト最適化チェックリスト</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <input type="checkbox" id="check1" className="mt-1" />
                <label htmlFor="check1" className="text-sm">
                  <strong>モデル選択:</strong> タスクの複雑度に合わせて Haiku/Sonnet/Opus を使い分けている
                </label>
              </div>
              <div className="flex items-start gap-3">
                <input type="checkbox" id="check2" className="mt-1" />
                <label htmlFor="check2" className="text-sm">
                  <strong>.claudeignore 設定:</strong> 不要なディレクトリ（node_modules等）を除外している
                </label>
              </div>
              <div className="flex items-start gap-3">
                <input type="checkbox" id="check3" className="mt-1" />
                <label htmlFor="check3" className="text-sm">
                  <strong>プロンプトキャッシュ:</strong> CLAUDE.md に共通情報をまとめて活用している
                </label>
              </div>
              <div className="flex items-start gap-3">
                <input type="checkbox" id="check4" className="mt-1" />
                <label htmlFor="check4" className="text-sm">
                  <strong>/compact コマンド:</strong> 長時間セッション後に履歴を圧縮している
                </label>
              </div>
              <div className="flex items-start gap-3">
                <input type="checkbox" id="check5" className="mt-1" />
                <label htmlFor="check5" className="text-sm">
                  <strong>予算上限設定:</strong> Anthropic Console で月間上限を設定している
                </label>
              </div>
              <div className="flex items-start gap-3">
                <input type="checkbox" id="check6" className="mt-1" />
                <label htmlFor="check6" className="text-sm">
                  <strong>サブスク検討:</strong> 月間 $20 以上の利用があれば Pro/Max を検討している
                </label>
              </div>
              <div className="flex items-start gap-3">
                <input type="checkbox" id="check7" className="mt-1" />
                <label htmlFor="check7" className="text-sm">
                  <strong>タスク分割:</strong> 大きなタスクを複数の小さなタスクに分割して実行している
                </label>
              </div>
              <div className="flex items-start gap-3">
                <input type="checkbox" id="check8" className="mt-1" />
                <label htmlFor="check8" className="text-sm">
                  <strong>月間追跡:</strong> API 使用量を毎月チェックして ROI を分析している
                </label>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 関連リンク */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>関連ガイド</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/troubleshooting">
                <Button variant="outline" className="w-full justify-start">
                  トラブルシューティング
                </Button>
              </Link>
              <Link href="/tools">
                <Button variant="outline" className="w-full justify-start">
                  ツール比較ガイド
                </Button>
              </Link>
              <Link href="/security">
                <Button variant="outline" className="w-full justify-start">
                  セキュリティガイド
                </Button>
              </Link>
              <Link href="/getting-started">
                <Button variant="outline" className="w-full justify-start">
                  はじめにガイド
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
