import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Callout } from "@/components/content/callout"
import { StepByStep } from "@/components/content/step-by-step"
import { CodeBlock } from "@/components/content/code-block"
import { Code, Zap, CheckCircle2, AlertCircle, TrendingUp } from "lucide-react"
import type { SetupStep } from "@/types/tools"

export const metadata: Metadata = {
  title: "Web開発ユースケース - Next.js プロジェクト",
  description: "Claude Code を使って Next.js でコンポーネント、API Routes、スタイリングを実装する実践的なワークフロー。",
}

const workflowSteps: SetupStep[] = [
  {
    stepNumber: 1,
    title: "プロジェクト構成を確認",
    description: "既存の Next.js プロジェクトの構造を理解し、CLAUDE.md を準備します。",
    code: `# プロジェクトディレクトリの確認
ls -la

# CLAUDE.md を作成
cat > CLAUDE.md << 'EOF'
# プロジェクト情報

## プロジェクト名
E-commerce Platform

## 技術スタック
- フレームワーク: Next.js 14 (App Router)
- 言語: TypeScript
- スタイリング: Tailwind CSS
- UI ライブラリ: Shadcn/ui
- データベース: PostgreSQL (Prisma ORM)
- 認証: NextAuth.js v5
- API: REST

## ディレクトリ構造
\`\`\`
app/
├── (dashboard)/
│   ├── products/
│   ├── orders/
│   └── layout.tsx
├── api/
│   ├── products/
│   ├── orders/
│   └── auth/
└── page.tsx

components/
├── product/
├── order/
└── layout/

lib/
├── db.ts
├── auth.ts
└── api-client.ts
\`\`\`

## コーディング規則
- TypeScript の strict mode を使用
- コンポーネントは関数型を使用
- Props は interface で定義
- エラーハンドリングは try-catch で実装
- フォーム検証は zod を使用

## セキュリティ
- API キーは環境変数で管理
- CSRF トークンを実装
- レート制限を有効化
- SQL インジェクション対策（Prisma）
EOF`,
    codeLanguage: "bash",
    callout: {
      type: "info",
      message: "CLAUDE.md を作成することで、Claude Code が毎回プロジェクト構造を確認できます。このファイルは 200-500 行程度が目安です。",
    },
  },
  {
    stepNumber: 2,
    title: "Claude Code を起動",
    description: "プロジェクトディレクトリから Claude Code を起動します。",
    code: `# プロジェクトディレクトリで起動
claude`,
    codeLanguage: "bash",
    callout: {
      type: "tip",
      message: "初回起動時は認証が必要な場合があります。ブラウザが自動で開き、Anthropic コンソールで認証します。",
    },
  },
  {
    stepNumber: 3,
    title: "コンポーネントを作成してもらう",
    description: "商品カード用の React コンポーネントを実装してもらいます。",
    code: `Tailwind CSS で商品カード コンポーネントを作成してください。

パス: app/components/product/product-card.tsx

要件:
- 商品画像、タイトル、説明、価格を表示
- レスポンシブデザイン（モバイル・デスクトップ）
- ホバーエフェクト（影、スケール）
- 「カートに追加」ボタン
- React 18 Server Component 対応
- TypeScript で型安全
- 商品データは Props で受け取る

Props インターフェース:
\`\`\`typescript
interface Product {
  id: string
  title: string
  description: string
  price: number
  imageUrl: string
  onAddToCart?: (id: string) => void
}
\`\`\`

実装のポイント:
- next/image を使用（画像最適化）
- リンクは next/link を使用
- スタイルは Tailwind CSS のみ
- dark mode 対応

テストも書いてください（Vitest + React Testing Library）。`,
    codeLanguage: "plaintext",
  },
  {
    stepNumber: 4,
    title: "生成されたコードを確認",
    description: "Claude が生成したコンポーネントコードを確認し、変更が必要な場合は指示します。",
    callout: {
      type: "info",
      message: "Claude は通常以下を生成します：\n・ProductCard コンポーネント\n・型定義（Product インターフェース）\n・Vitest テストファイル",
    },
  },
  {
    stepNumber: 5,
    title: "API Route を実装",
    description: "商品一覧を取得するシンプルな API Route を実装してもらいます。",
    code: `パス: app/api/products/route.ts

以下の API Route を実装してください：

要件:
- GET /api/products で商品一覧を取得
- 応答形式: { success: boolean, data: Product[], error?: string }
- 50 件の mock データを返す
- エラーハンドリングを実装
- TypeScript で型安全
- CORS ヘッダーを設定
- ロギング機能を実装

実装のポイント:
- NextResponse を使用
- Error クラスでエラーハンドリング
- mock データは別ファイルで管理
- ドキュメンテーションコメントを追加

テストも作成してください（Jest/Vitest）。`,
    codeLanguage: "plaintext",
  },
  {
    stepNumber: 6,
    title: "フロントエンドと統合",
    description: "商品コンポーネントから API を呼び出すページを作成してもらいます。",
    code: `パス: app/(dashboard)/products/page.tsx

要件:
- API から商品データを取得（useEffect で取動的取得）
- ProductCard コンポーネントで一覧表示
- ローディング状態を表示
- エラー状態を処理
- ページネーション（オプション）
- フィルタリング（カテゴリ）

実装:
- useState で loading, error, products を管理
- useEffect で API 呼び出し
- try-catch でエラーハンドリング
- TypeScript で型安全

スタイリング:
- レスポンシブグリッド（1列 → 2列 → 3列）
- Tailwind CSS クラスで実装
- dark mode 対応`,
    codeLanguage: "plaintext",
  },
  {
    stepNumber: 7,
    title: "フォーム検証を追加",
    description: "商品フィルタリング用フォームに zod を使用した検証を追加します。",
    code: `既存のフィルタリングフォームに zod スキーマを追加してください。

要件:
- フィルタ条件: categoryId, priceRange (min, max), search
- zod スキーマで入力値を検証
- フロントエンドで無効な入力を防止
- エラーメッセージを表示

実装:
- zod で ValidationSchema を定義
- form ライブラリ（react-hook-form）で統合
- エラー表示を UI に反映`,
    codeLanguage: "plaintext",
  },
  {
    stepNumber: 8,
    title: "テストを実行",
    description: "コンポーネント、ページ、API Route のテストを実行して動作確認します。",
    code: `# すべてのテストを実行
npm test

# カバレッジを確認
npm test -- --coverage

# E2E テストを実行（Playwright）
npm run test:e2e`,
    codeLanguage: "bash",
    callout: {
      type: "tip",
      message: "テストが失敗した場合は、Claude Code に「テストが失敗しています。修正してください。エラー: [エラーメッセージ]」と伝えましょう。",
    },
  },
  {
    stepNumber: 9,
    title: "Git コミット",
    description: "変更をコミットして、ワークフローを完了させます。",
    code: `# 変更をステージング
git add .

# コミット（Conventional Commits）
git commit -m "feat: add product listing with components and API

- Create ProductCard component with Tailwind styling
- Implement GET /api/products route with mock data
- Add products listing page with filtering
- Add form validation using zod
- Add unit and integration tests"

# GitHub にプッシュ
git push origin main`,
    codeLanguage: "bash",
  },
]

const promptExamples = [
  {
    title: "コンポーネント作成プロンプト",
    problem: "複雑な UI コンポーネントが必要だが、実装方法が不明",
    prompt: `Tailwind CSS で [コンポーネント名] を作成してください。

要件:
- [機能1]
- [機能2]
- [機能3]

Props インターフェース:
\`\`\`typescript
interface [Props] {
  // Props の定義
}
\`\`\`

実装のポイント:
- [ポイント1]
- [ポイント2]

テストも作成してください。`,
    tool: "Claude Code",
    benefit: "具体的な要件とインターフェースを指定することで、期待通りのコンポーネントが生成される",
  },
  {
    title: "API Route 実装プロンプト",
    problem: "複数の API Route を効率的に実装したい",
    prompt: `以下の API Route をすべて実装してください：

1. GET /api/products - 商品一覧取得
   - フィルタリング対応
   - ページネーション対応
   - 応答形式: { success, data: Product[], meta }

2. POST /api/products/:id/reviews - レビュー投稿
   - 入力値の検証（zod）
   - データベース保存
   - エラーハンドリング

3. DELETE /api/cart/:itemId - カート削除
   - 認証チェック
   - ロール検証

要件（すべてのエンドポイント）:
- TypeScript で型安全
- エラーハンドリングを実装
- ロギング機能を追加
- レート制限に対応（オプション）
- テストを作成

テンプレートをベースに実装してください。`,
    tool: "Claude Code",
    benefit: "複数のエンドポイントを一度に実装でき、一貫性が保たれる",
  },
  {
    title: "リファクタリングプロンプト",
    problem: "既存コードの保守性が低く、改善したい",
    prompt: `app/components/ProductList.tsx をリファクタリングしてください。

現在の問題:
- ロジックが複雑で読みにくい
- コンポーネントが大きすぎる（500+ 行）
- テストしにくい構造
- TypeScript の型が不完全

要件:
- 複数の小さなコンポーネントに分割
- ロジックを custom hooks に抽出
- 完全な TypeScript 型定義
- テストカバレッジを 80%+ に改善
- Tailwind CSS のみでスタイリング

分割後のファイル構成:
\`\`\`
components/product/
├── ProductList.tsx (メインコンポーネント)
├── ProductItem.tsx (各アイテム)
├── ProductFilters.tsx (フィルタリング UI)
├── useProductFilters.ts (カスタムフック)
└── __tests__/
    ├── ProductList.test.tsx
    └── useProductFilters.test.ts
\`\`\``,
    tool: "Claude Code",
    benefit: "保守性の高い構造に自動的にリファクタリングされる",
  },
]

const commonPatterns = [
  {
    pattern: "コンポーネント作成",
    steps: [
      "Props インターフェースを定義",
      "Tailwind CSS でスタイリング",
      "ホバー・アクティブ状態を実装",
      "dark mode 対応",
      "Vitest でテスト作成",
    ],
  },
  {
    pattern: "API Route 実装",
    steps: [
      "リクエスト型を定義（zod）",
      "ビジネスロジックを実装",
      "エラーハンドリング",
      "応答型を定義",
      "Jest でテスト作成",
    ],
  },
  {
    pattern: "ページコンポーネント",
    steps: [
      "useEffect で API 呼び出し",
      "ローディング・エラー状態管理",
      "UI コンポーネントを組み合わせ",
      "フォーム検証を追加",
      "E2E テスト（Playwright）",
    ],
  },
]

export default function WebDevelopmentPage() {
  return (
    <div className="space-y-12">
      {/* ページタイトル */}
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">
          Web開発ユースケース
        </h1>
        <p className="text-lg text-muted-foreground">
          Next.js を使ったリアルな E-commerce プロジェクトで、
          Claude Code を活用した実践的なワークフローを学びます。
          コンポーネント作成、API 実装、スタイリングまでの完全なフローを体験できます。
        </p>
      </div>

      {/* 概要カード */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Code className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-muted-foreground">所要時間</span>
              </div>
              <CardTitle>2-3時間</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              完全なワークフローの実施に必要な時間。
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-muted-foreground">難易度</span>
              </div>
              <CardTitle>⭐⭐ 中級者向け</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              React と Next.js の基本知識が必要。
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-muted-foreground">学べること</span>
              </div>
              <CardTitle>実践的なフロー</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              コンポーネント・API・統合テストまで。
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
              そのまま本番環境に使えるコード。
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 前提条件 */}
      <Callout type="info" title="前提条件">
        <ul className="list-disc list-inside space-y-2">
          <li>Next.js 14+ プロジェクトが既にセットアップ済み</li>
          <li>TypeScript、Tailwind CSS、Prisma を使用</li>
          <li>Git リポジトリが初期化済み</li>
          <li>Node.js 18 以上</li>
          <li>Claude Code または Cursor がインストール済み</li>
        </ul>
      </Callout>

      {/* ワークフロー */}
      <section>
        <h2 className="text-2xl font-bold mb-6">完全なワークフロー</h2>
        <StepByStep steps={workflowSteps} />
      </section>

      {/* プロンプト例 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">効果的なプロンプト例</h2>
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
                  <h4 className="font-semibold text-sm mb-1">問題</h4>
                  <p className="text-sm text-muted-foreground">{example.problem}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">プロンプト例</h4>
                  <CodeBlock code={example.prompt} language="plaintext" />
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-1">メリット</h4>
                  <p className="text-sm text-muted-foreground flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                    {example.benefit}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 実装パターン */}
      <section>
        <h2 className="text-2xl font-bold mb-6">よくある実装パターン</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {commonPatterns.map((item, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle className="text-lg">{item.pattern}</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2">
                  {item.steps.map((step, stepIdx) => (
                    <li key={stepIdx} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center">
                        {stepIdx + 1}
                      </span>
                      <span className="text-sm text-muted-foreground">{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ツール比較 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Cursor vs Claude Code（Web開発向け）</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold">機能</th>
                <th className="text-left py-3 px-4 font-semibold">Cursor</th>
                <th className="text-left py-3 px-4 font-semibold">Claude Code</th>
                <th className="text-left py-3 px-4 font-semibold">推奨</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4">統合開発環境</td>
                <td className="py-3 px-4">VSCode ベース（IDE 内で完結）</td>
                <td className="py-3 px-4">CLI ベース（ターミナル中心）</td>
                <td className="py-3 px-4">Cursor（UI が見やすい）</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">ファイル編集</td>
                <td className="py-3 px-4">IDE で直接編集＆確認</td>
                <td className="py-3 px-4">エディタ連携で外部編集</td>
                <td className="py-3 px-4">Cursor</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">ターミナル操作</td>
                <td className="py-3 px-4">IDE ターミナルで実行</td>
                <td className="py-3 px-4">ターミナル内で実行</td>
                <td className="py-3 px-4">同等</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">デバッグ</td>
                <td className="py-3 px-4">VSCode デバッガ連携</td>
                <td className="py-3 px-4">ログ・エラーメッセージで確認</td>
                <td className="py-3 px-4">Cursor</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">API テスト</td>
                <td className="py-3 px-4">REST Client 拡張で対応</td>
                <td className="py-3 px-4">curl コマンドで実行</td>
                <td className="py-3 px-4">Cursor</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">チーム開発</td>
                <td className="py-3 px-4">Live Share で共同編集</td>
                <td className="py-3 px-4">CLI でセッション記録</td>
                <td className="py-3 px-4">Cursor</td>
              </tr>
              <tr>
                <td className="py-3 px-4">コスト</td>
                <td className="py-3 px-4">月額 $20（Pro）</td>
                <td className="py-3 px-4">従量課金（$20-100/月）</td>
                <td className="py-3 px-4">Claude Code（柔軟）</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6"><Callout type="tip" title="推奨使い分け">
          <ul className="space-y-2">
            <li>
              <strong>Cursor がおすすめ：</strong> Web UI の複雑な開発、デバッグが必要、チーム開発
            </li>
            <li>
              <strong>Claude Code がおすすめ：</strong> 軽量タスク、複数プロジェクト並行、低コスト重視
            </li>
          </ul>
        </Callout></div>
      </section>

      {/* トラブルシューティング */}
      <section>
        <h2 className="text-2xl font-bold mb-6">よくある問題と解決方法</h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 shrink-0" />
                Q: API Route のテストで import エラーが出る
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                <strong>原因：</strong> Jest が Next.js の拡張構文（@/ paths など）をサポートしていない。
              </p>
              <p>
                <strong>解決方法：</strong> jest.config.js で moduleNameMapper を設定：
              </p>
              <CodeBlock
                code={`module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
}`}
                language="javascript"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 shrink-0" />
                Q: Tailwind CSS のクラスが反映されない
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                <strong>原因：</strong> tailwind.config.ts の content に新しいコンポーネントパスを追加していない。
              </p>
              <p>
                <strong>解決方法：</strong> tailwind.config.ts を確認：
              </p>
              <CodeBlock
                code={`export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
}`}
                language="typescript"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 shrink-0" />
                Q: AI 生成コードがプロジェクト構造と合わない
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                <strong>原因：</strong> CLAUDE.md が最新でない、または指示が曖昧。
              </p>
              <p>
                <strong>解決方法：</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>CLAUDE.md を最新に更新</li>
                <li>フルパス指定で場所を明確に：「app/api/products/route.ts に実装してください」</li>
                <li>プロジェクト全体を参照：「@codebase 既存パターンを確認して...」</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ベストプラクティス */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Web開発でのベストプラクティス</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>プロンプトの工夫</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-semibold text-sm mb-1">1. ファイルパスを明示</h4>
                <p className="text-sm text-muted-foreground">
                  「app/components/Button.tsx に」など、生成場所を正確に指定。
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">2. Props インターフェースを提供</h4>
                <p className="text-sm text-muted-foreground">
                  期待する Props 型を TypeScript で定義して渡す。
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">3. 制約を明確に</h4>
                <p className="text-sm text-muted-foreground">
                  「Tailwind CSS のみで、外部 UI ライブラリは不可」など。
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">4. テストを要求</h4>
                <p className="text-sm text-muted-foreground">
                  「Vitest でテストも作成してください」と明記。
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>コードレビュー</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-semibold text-sm mb-1">チェックリスト</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>TypeScript の型が完全</li>
                  <li>エラーハンドリング実装済み</li>
                  <li>テストカバレッジ 80%+</li>
                  <li>Tailwind CSS のみ（余分な import なし）</li>
                  <li>コンポーネント分割が適切</li>
                  <li>ドキュメンテーションコメントあり</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 次のステップ */}
      <section>
        <h2 className="text-2xl font-bold mb-6">次のステップ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">段階 2: データベース連携</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Mock データから Prisma での実装に移行。
              </p>
              <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                <li>Prisma スキーマ定義</li>
                <li>マイグレーション</li>
                <li>API Route の DB 操作</li>
              </ul>
              <Link href="/usecases/backend-api">
                <Button variant="outline" size="sm" className="w-full mt-3">
                  バックエンド開発を学ぶ
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">段階 3: 認証実装</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                NextAuth.js で安全な認証機能を追加。
              </p>
              <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                <li>ユーザー登録・ログイン</li>
                <li>セッション管理</li>
                <li>API ルート保護</li>
              </ul>
              <Link href="/tools/claude-code">
                <Button variant="outline" size="sm" className="w-full mt-3">
                  他のチュートリアルを見る
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">段階 4: デプロイ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Vercel へのデプロイと本番環境設定。
              </p>
              <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                <li>環境変数設定</li>
                <li>パフォーマンス最適化</li>
                <li>CI/CD パイプライン</li>
              </ul>
              <Link href="/getting-started">
                <Button variant="outline" size="sm" className="w-full mt-3">
                  はじめにに戻る
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 完了カード */}
      <section>
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🚀 実装チェックリスト
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">ProductCard コンポーネント作成</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">GET /api/products API Route 実装</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">商品一覧ページの実装</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">フォーム検証（zod）実装</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">テスト実行（80%+ カバレッジ）</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">Git コミット</span>
              </label>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              すべてのチェックが完了したら、段階 2 に進みましょう！
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
              このガイドはいかがでしたか？実装過程での問題や改善提案があればお聞かせください。
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/tutorials/first-30-minutes">
                <Button variant="primary">30分チュートリアルに戻る</Button>
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
