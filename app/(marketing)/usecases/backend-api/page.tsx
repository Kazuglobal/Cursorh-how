import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Callout } from "@/components/content/callout"
import { CodeBlock } from "@/components/content/code-block"
import { StepByStep } from "@/components/content/step-by-step"
import { Database, Lock, Shield, TestTube, Zap, GitBranch } from "lucide-react"
import type { SetupStep } from "@/types/tools"

export const metadata: Metadata = {
  title: "バックエンド開発ユースケース - Express.js API を Claude Code で開発",
  description: "Express.js と Prisma を使った REST API 開発の完全ガイド。認証、データベース操作、エラーハンドリング、テストまで。",
}

const workflowSteps: SetupStep[] = [
  {
    stepNumber: 1,
    title: "プロジェクトをセットアップ",
    description: "Express.js プロジェクトを初期化し、必要な依存関係をインストールします。",
    code: `# 新しいディレクトリを作成
mkdir my-api-project
cd my-api-project

# Node.js プロジェクトを初期化
npm init -y

# 必要な依存関係をインストール
npm install express prisma @prisma/client cors dotenv

# 開発用依存関係
npm install -D typescript @types/express @types/node ts-node nodemon jest @types/jest`,
    codeLanguage: "bash",
    callout: {
      type: "info",
      message: "Prisma CLI をグローバルに使用する場合は `npm install -g prisma` を実行してください。",
    },
  },
  {
    stepNumber: 2,
    title: "Claude Code を起動",
    description: "プロジェクトディレクトリで Claude Code を起動します。",
    code: `# Claude Code を起動
claude`,
    codeLanguage: "bash",
  },
  {
    stepNumber: 3,
    title: "AI に API スキーマ要件を伝える",
    description: "具体的なデータモデルと API エンドポイント要件を明示します。",
    code: `Express.js + Prisma + SQLite で REST API を実装してください。

【データモデル】
Users テーブル:
- id: UUID (主キー)
- email: 文字列 (ユニーク)
- password_hash: 文字列 (bcrypt)
- name: 文字列
- created_at: タイムスタンプ
- updated_at: タイムスタンプ

Posts テーブル:
- id: UUID (主キー)
- user_id: UUID (外部キー)
- title: 文字列 (100文字以内)
- content: 文字列 (10000文字以内)
- published: ブール値 (デフォルト: false)
- created_at: タイムスタンプ
- updated_at: タイムスタンプ

【必要なエンドポイント】
認証:
- POST /auth/register - ユーザー登録
- POST /auth/login - ログイン (JWT トークン返却)

ユーザー:
- GET /users/{id} - ユーザー情報取得
- PUT /users/{id} - ユーザー情報更新 (認証必須)

Posts:
- GET /posts - 公開記事一覧 (ページネーション対応)
- POST /posts - 新規記事作成 (認証必須)
- GET /posts/{id} - 記事詳細取得
- PUT /posts/{id} - 記事更新 (本人のみ)
- DELETE /posts/{id} - 記事削除 (本人のみ)

【技術要件】
- TypeScript で実装
- JWT による認証 (jsonwebtoken)
- bcrypt によるパスワードハッシング
- リクエスト/レスポンスの検証 (Zod)
- エラーハンドリング (カスタム例外クラス)
- ログ出力 (winston or console)
- CORS 設定
- 環境変数での設定 (.env)

【テスト】
- Jest でユニットテスト
- エンドポイント毎にテストを書く
- カバレッジは 80% 以上

【セキュリティ】
- SQL インジェクション対策 (Prisma が対応)
- パスワードハッシング (bcrypt)
- JWT の署名検証
- CORS ホワイトリスト
- レート制限の設定例を含める

まず Prisma schema を作成し、その後 src/main.ts から始めてください。`,
    codeLanguage: "plaintext",
  },
  {
    stepNumber: 4,
    title: "生成コードを確認",
    description: "Claude が生成した Prisma schema とメインファイルを確認します。",
    callout: {
      type: "tip",
      message: "以下のファイルが生成されます: prisma/schema.prisma, src/main.ts, src/middleware/auth.ts, src/routes/, src/services/",
    },
  },
  {
    stepNumber: 5,
    title: "データベースをセットアップ",
    description: "Prisma マイグレーションを実行してデータベーススキーマを作成します。",
    code: `# Prisma マイグレーションを作成して実行
npx prisma migrate dev --name init

# Prisma Studio でデータベースを確認（オプション）
npx prisma studio`,
    codeLanguage: "bash",
  },
  {
    stepNumber: 6,
    title: "開発サーバーを起動",
    description: "開発サーバーを起動して API をテストします。",
    code: `# 開発サーバーを起動
npm run dev

# 別のターミナルで curl やポストマンでテスト
curl http://localhost:3000/health`,
    codeLanguage: "bash",
  },
  {
    stepNumber: 7,
    title: "API エンドポイントをテスト",
    description: "登録から記事作成まで、エンドポイント毎にテストします。",
    code: `# ユーザー登録
curl -X POST http://localhost:3000/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "user@example.com",
    "password": "SecurePassword123",
    "name": "John Doe"
  }'

# ログイン
curl -X POST http://localhost:3000/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "user@example.com",
    "password": "SecurePassword123"
  }'

# 記事作成 (トークンが必要)
curl -X POST http://localhost:3000/posts \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -d '{
    "title": "My First Post",
    "content": "This is my first post on the API"
  }'`,
    codeLanguage: "bash",
  },
  {
    stepNumber: 8,
    title: "ユニットテストを実行",
    description: "Jest でテストを実行します。",
    code: `# テストを実行
npm test

# カバレッジレポートを表示
npm test -- --coverage`,
    codeLanguage: "bash",
    callout: {
      type: "warning",
      message: "テストが失敗した場合、Claude に「テストエラーが発生しました。修正してください」と伝えましょう。",
    },
  },
  {
    stepNumber: 9,
    title: "エラーハンドリングを検証",
    description: "エラーハンドリングが正しく機能しているか確認します。",
    code: `# 無効なメールアドレスで登録
curl -X POST http://localhost:3000/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "invalid-email",
    "password": "pass"
  }'

# 存在しないユーザーを取得
curl http://localhost:3000/users/invalid-id

# 短すぎるパスワードで登録
curl -X POST http://localhost:3000/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "user@example.com",
    "password": "123"
  }'`,
    codeLanguage: "bash",
  },
  {
    stepNumber: 10,
    title: "Git コミット",
    description: "実装を Git にコミットします。",
    code: `# リポジトリを初期化
git init

# .env ファイルを .gitignore に追加
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
echo "node_modules/" >> .gitignore

# すべての変更をステージング
git add .

# コミット
git commit -m "feat: create REST API with Express.js, Prisma, and JWT auth"`,
    codeLanguage: "bash",
  },
]

export default function BackendAPIUsecasePage() {
  return (
    <div className="space-y-12">
      {/* ページヘッダー */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-3">バックエンド開発ユースケース</h1>
        <p className="text-lg text-muted-foreground">
          Express.js、Prisma、JWT を使った REST API の開発を Claude Code で実装します。
          認証・認可、データベース操作、エラーハンドリング、テストまで、本格的なバックエンド開発の実践例です。
        </p>
      </div>

      {/* 概要カード */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-primary" />
                <span className="text-xs font-semibold text-muted-foreground">所要時間</span>
              </div>
              <CardTitle className="text-lg">90分</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              セットアップから本格テストまで
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-xs font-semibold text-muted-foreground">難易度</span>
              </div>
              <CardTitle className="text-lg">中級</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              TypeScript、データベース知識が必要
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Database className="h-5 w-5 text-primary" />
                <span className="text-xs font-semibold text-muted-foreground">技術スタック</span>
              </div>
              <CardTitle className="text-lg">Express + Prisma</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              TypeScript, JWT, Zod, Jest
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Lock className="h-5 w-5 text-primary" />
                <span className="text-xs font-semibold text-muted-foreground">重点</span>
              </div>
              <CardTitle className="text-lg">セキュリティ</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
                認証、パスワード、入力検証
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 前提条件 */}
      <Callout type="info" title="前提条件">
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Node.js 18 以上がインストール済み</li>
          <li>TypeScript の基本知識</li>
          <li>REST API の概念理解</li>
          <li>Claude Code がインストール済み（<Link href="/tools/claude-code/setup" className="text-primary hover:underline">セットアップガイド</Link>）</li>
          <li>ターミナル / コマンドプロンプトを開ける</li>
        </ul>
      </Callout>

      {/* 完成イメージ */}
      <section>
        <h2 className="text-2xl font-bold mb-6">完成イメージ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">実装される主要機能</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <Shield className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span><strong>JWT 認証:</strong> ユーザー登録・ログイン機能</span>
              </div>
              <div className="flex items-start gap-2">
                <Database className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span><strong>Prisma ORM:</strong> データベース操作の抽象化</span>
              </div>
              <div className="flex items-start gap-2">
                <Lock className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span><strong>セキュリティ:</strong> パスワード暗号化、入力検証</span>
              </div>
              <div className="flex items-start gap-2">
                <TestTube className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span><strong>テスト:</strong> Jest による包括的なユニットテスト</span>
              </div>
              <div className="flex items-start gap-2">
                <GitBranch className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span><strong>エラーハンドリング:</strong> 統一的なエラー応答</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">実装される API エンドポイント</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs font-mono">
              <p className="text-green-600 dark:text-green-400"><strong>POST /auth/register</strong> - ユーザー登録</p>
              <p className="text-green-600 dark:text-green-400"><strong>POST /auth/login</strong> - ログイン</p>
              <p className="text-blue-600 dark:text-blue-400"><strong>GET /users/{"{id}"}</strong> - ユーザー情報取得</p>
              <p className="text-yellow-600 dark:text-yellow-400"><strong>PUT /users/{"{id}"}</strong> - ユーザー更新</p>
              <p className="text-blue-600 dark:text-blue-400"><strong>GET /posts</strong> - 記事一覧</p>
              <p className="text-green-600 dark:text-green-400"><strong>POST /posts</strong> - 記事作成</p>
              <p className="text-yellow-600 dark:text-yellow-400"><strong>PUT /posts/{"{id}"}</strong> - 記事更新</p>
              <p className="text-red-600 dark:text-red-400"><strong>DELETE /posts/{"{id}"}</strong> - 記事削除</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ワークフロー */}
      <section>
        <h2 className="text-2xl font-bold mb-6">ステップバイステップガイド</h2>
        <StepByStep steps={workflowSteps} />
      </section>

      {/* プロンプト例 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">プロンプト例と AI の応答</h2>

        <div className="space-y-6">
          {/* プロンプト1: 認証機能 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">プロンプト例 1: 認証機能の実装</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm mb-2">ユーザープロンプト:</h4>
                <CodeBlock
                  code={`JWT ベースの認証機能を実装してください。

要件:
1. register エンドポイント:
   - メール、パスワード、名前を受け取る
   - メールが既存でないか確認
   - パスワードの強度を検証 (最小8文字、大文字・数字を含む)
   - bcrypt でハッシング
   - JWT トークンを返す

2. login エンドポイント:
   - メール、パスワードを受け取る
   - メールが存在するか確認
   - パスワードを検証 (bcrypt.compare)
   - JWT トークンを返す

3. 認証ミドルウェア:
   - Authorization ヘッダーから JWT を取得
   - JWT を検証
   - ユーザー情報を req.user に設定

実装ファイル:
- src/services/auth.service.ts - ビジネスロジック
- src/middleware/auth.middleware.ts - JWT 検証
- src/routes/auth.routes.ts - エンドポイント定義`}
                  language="plaintext"
                  title="ユーザーが Claude に指示"
                />
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">AI の応答例:</h4>
                <CodeBlock
                  code={`import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

// パスワード強度検証スキーマ
const passwordSchema = z.string()
  .min(8, 'パスワードは最小8文字である必要があります')
  .regex(/[A-Z]/, '大文字を含む必要があります')
  .regex(/[0-9]/, '数字を含む必要があります')

interface RegisterInput {
  email: string
  password: string
  name: string
}

interface AuthResponse {
  token: string
  user: {
    id: string
    email: string
    name: string
  }
}

export async function register(input: RegisterInput): Promise<AuthResponse> {
  try {
    // メール形式の検証
    const emailSchema = z.string().email()
    emailSchema.parse(input.email)

    // パスワード強度の検証
    passwordSchema.parse(input.password)

    // メールが既存しないか確認
    const existingUser = await prisma.user.findUnique({
      where: { email: input.email.toLowerCase() }
    })

    if (existingUser) {
      throw new Error('このメールアドレスは既に登録されています')
    }

    // パスワードをハッシング
    const hashedPassword = await bcrypt.hash(input.password, 12)

    // ユーザーを作成
    const user = await prisma.user.create({
      data: {
        email: input.email.toLowerCase(),
        password_hash: hashedPassword,
        name: input.name
      }
    })

    // JWT を生成
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    }
  } catch (error) {
    console.error('Register error:', error)
    throw error
  }
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  try {
    // メールからユーザーを取得
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    })

    if (!user) {
      throw new Error('メールアドレスまたはパスワードが無効です')
    }

    // パスワードを検証
    const isPasswordValid = await bcrypt.compare(password, user.password_hash)

    if (!isPasswordValid) {
      throw new Error('メールアドレスまたはパスワードが無効です')
    }

    // JWT を生成
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    }
  } catch (error) {
    console.error('Login error:', error)
    throw error
  }
}`}
                  language="typescript"
                  title="AI が実装した auth.service.ts の一部"
                />
              </div>

              <Callout type="tip">
                AI が生成したコードの特徴:
                <ul className="list-disc list-inside space-y-1 mt-2 text-sm">
                  <li>Zod スキーマでバリデーション</li>
                  <li>bcrypt でパスワードハッシング</li>
                  <li>エラーメッセージが詳細</li>
                  <li>パスワード長や複雑性の検証</li>
                  <li>JWT の有効期限設定</li>
                </ul>
              </Callout>
            </CardContent>
          </Card>

          {/* プロンプト2: エラーハンドリング */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">プロンプト例 2: エラーハンドリング強化</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm mb-2">ユーザープロンプト:</h4>
                <CodeBlock
                  code={`エラーハンドリングミドルウェアを実装してください。

要件:
1. カスタム AppError クラス:
   - statusCode (400-500)
   - message
   - code (VALIDATION_ERROR など)
   - details (オプション)

2. グローバルエラーハンドラー:
   - AppError をキャッチして JSON で返す
   - 予期しないエラーは 500 で返す
   - 機密情報をログに含めない
   - 本番環境でスタックトレース非表示

3. 一般的なエラー型:
   - ValidationError (400)
   - NotFoundError (404)
   - UnauthorizedError (401)
   - ForbiddenError (403)
   - ConflictError (409)

レスポンス形式:
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "ユーザー入力エラー",
    "details": { "field": "email", "reason": "形式が不正" }
  },
  "timestamp": "2024-01-15T10:30:00Z"
}`}
                  language="plaintext"
                  title="ユーザーが Claude に指示"
                />
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">AI の応答例:</h4>
                <CodeBlock
                  code={`// src/errors/AppError.ts
export enum ErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  CONFLICT = 'CONFLICT',
  INTERNAL_ERROR = 'INTERNAL_ERROR'
}

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: ErrorCode,
    message: string,
    public details?: Record<string, any>
  ) {
    super(message)
    Object.setPrototypeOf(this, AppError.prototype)
  }
}

// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express'
import { AppError, ErrorCode } from '../errors/AppError'

export function errorHandler(
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const timestamp = new Date().toISOString()

  // AppError インスタンスの場合
  if (err instanceof AppError) {
    console.warn(\`[ERROR] [\${timestamp}] \${err.code}: \${err.message}\`)

    return res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
        ...(err.details && { details: err.details })
      },
      timestamp
    })
  }

  // 予期しないエラーの場合
  console.error(\`[ERROR] [\${timestamp}] Unexpected error:\`, err)

  const isDevelopment = process.env.NODE_ENV === 'development'

  return res.status(500).json({
    success: false,
    error: {
      code: ErrorCode.INTERNAL_ERROR,
      message: isDevelopment
        ? err.message
        : 'サーバーエラーが発生しました。後でもう一度試してください。'
    },
    timestamp,
    ...(isDevelopment && { stack: err.stack })
  })
}

// 使用例
export class ValidationError extends AppError {
  constructor(message: string, details?: Record<string, any>) {
    super(400, ErrorCode.VALIDATION_ERROR, message, details)
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(404, ErrorCode.NOT_FOUND, \`\${resource} が見つかりません\`)
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = '認証が必要です') {
    super(401, ErrorCode.UNAUTHORIZED, message)
  }
}`}
                  language="typescript"
                  title="AI が実装したエラーハンドリング"
                />
              </div>

              <Callout type="warning">
                セキュリティ注意事項:
                <ul className="list-disc list-inside space-y-1 mt-2 text-sm">
                  <li>本番環境ではスタックトレースを返さない</li>
                  <li>ログに機密情報 (パスワード、トークン) を含めない</li>
                  <li>エラーメッセージは詳細すぎず、ユーザーフレンドリーに</li>
                  <li>予期しないエラーは詳細を隠して一般的なメッセージを返す</li>
                </ul>
              </Callout>
            </CardContent>
          </Card>

          {/* プロンプト3: テスト */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">プロンプト例 3: ユニットテスト実装</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm mb-2">ユーザープロンプト:</h4>
                <CodeBlock
                  code={`auth サービスの Jest テストを書いてください。

テストケース:
1. register 関数:
   - 有効な入力で新規ユーザーが作成される
   - メールが既存する場合はエラーが発生
   - パスワードが弱い場合はエラーが発生
   - 返された JWT トークンが有効
   - パスワードは bcrypt でハッシングされている

2. login 関数:
   - 正しい認証情報でトークンが返される
   - メールが存在しない場合はエラー
   - パスワードが間違っている場合はエラー

使用ツール:
- Jest
- @prisma/client をモック
- jwt.sign/verify をスパイ

カバレッジ目標: 90% 以上`}
                  language="plaintext"
                  title="ユーザーが Claude に指示"
                />
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">AI の応答例:</h4>
                <CodeBlock
                  code={`// src/services/auth.service.test.ts
import { register, login } from './auth.service'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { ValidationError } from '../errors/AppError'

jest.mock('@prisma/client')
jest.mock('jsonwebtoken')
jest.mock('bcrypt')

const mockPrisma = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn()
  }
}

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('register', () => {
    it('有効な入力で新規ユーザーが作成される', async () => {
      const input = {
        email: 'test@example.com',
        password: 'SecurePass123',
        name: 'Test User'
      }

      mockPrisma.user.findUnique.mockResolvedValue(null)
      mockPrisma.user.create.mockResolvedValue({
        id: 'user-123',
        email: input.email,
        name: input.name
      })

      ;(bcrypt.hash as jest.Mock).mockResolvedValue('hashed_password')
      ;(jwt.sign as jest.Mock).mockReturnValue('jwt_token_123')

      const result = await register(input)

      expect(result.token).toBe('jwt_token_123')
      expect(result.user.email).toBe(input.email)
      expect(bcrypt.hash).toHaveBeenCalledWith(input.password, 12)
      expect(jwt.sign).toHaveBeenCalled()
    })

    it('メールが既存する場合はエラーが発生', async () => {
      const input = {
        email: 'existing@example.com',
        password: 'SecurePass123',
        name: 'Test User'
      }

      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'existing-user',
        email: input.email
      })

      await expect(register(input)).rejects.toThrow(
        'このメールアドレスは既に登録されています'
      )
    })

    it('弱いパスワードの場合はエラーが発生', async () => {
      const input = {
        email: 'test@example.com',
        password: 'weak', // 8文字未満、大文字なし
        name: 'Test User'
      }

      await expect(register(input)).rejects.toThrow()
    })
  })

  describe('login', () => {
    it('正しい認証情報でトークンが返される', async () => {
      const email = 'test@example.com'
      const password = 'SecurePass123'

      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'user-123',
        email,
        name: 'Test User',
        password_hash: 'hashed_password'
      })

      ;(bcrypt.compare as jest.Mock).mockResolvedValue(true)
      ;(jwt.sign as jest.Mock).mockReturnValue('jwt_token_123')

      const result = await login(email, password)

      expect(result.token).toBe('jwt_token_123')
      expect(result.user.email).toBe(email)
    })

    it('メールが存在しない場合はエラー', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null)

      await expect(login('nonexistent@example.com', 'password')).rejects.toThrow(
        'メールアドレスまたはパスワードが無効です'
      )
    })
  })
})`}
                  language="typescript"
                  title="AI が実装した auth.service.test.ts"
                />
              </div>

              <Callout type="tip">
                テスト実装のベストプラクティス:
                <ul className="list-disc list-inside space-y-1 mt-2 text-sm">
                  <li>外部依存関係 (Prisma、bcrypt、jwt) はモック化</li>
                  <li>各テストケースで beforeEach で状態をリセット</li>
                  <li>正常系と異常系の両方をテスト</li>
                  <li>テストは独立していて、実行順序に依存しない</li>
                  <li>エラーメッセージは詳細に検証しない (変わる可能性)</li>
                </ul>
              </Callout>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* セキュリティチェックリスト */}
      <section>
        <h2 className="text-2xl font-bold mb-6">セキュリティチェックリスト</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">認証・認可</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>JWT は安全に署名・検証されている</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>パスワードは bcrypt でハッシング (salt rounds: 12)</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>JWT 有効期限が設定されている</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>ユーザーはそのユーザーのリソースのみ更新可能</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>API キーは環境変数で管理</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">入力検証</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>すべての入力が Zod または同等で検証される</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>メール形式が検証される</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>パスワード強度が検証される</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>文字列長が制限されている</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>予期しないフィールドは拒否される</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">データベース</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>Prisma 使用で SQL インジェクション対策済み</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>ユーザー検索は email (ユニークキー) を使用</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>外部キー制約が設定されている</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>タイムスタンプ (created_at, updated_at) がある</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>本番環境でバックアップが取られている</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">エラーハンドリング</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>エラーメッセージに機密情報が含まれない</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>本番環境でスタックトレース非表示</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>すべてのエラーが適切なログレベルで記録される</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>HTTP ステータスコードが正確に返される</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>エラーレスポンス形式が統一されている</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Cursor vs Claude Code */}
      <section>
        <h2 className="text-2xl font-bold mb-6">推奨ツール比較</h2>

        <Card>
          <CardHeader>
            <CardTitle>このユースケースに最適なツール</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Claude Code (推奨)</h3>
                <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                  <li>複雑な API 構造の設計・実装に最適</li>
                  <li>セキュリティレビューに標準対応</li>
                  <li>バックエンド開発の経験豊富</li>
                  <li>エラーハンドリング設計が厳密</li>
                  <li>このガイドは Claude Code でテスト済み</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Cursor との併用</h3>
                <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                  <li>コンポーネント化・リファクタリング: Cursor 向き</li>
                  <li>フロントエンド統合: Cursor の VSCode 統合が便利</li>
                  <li>テストファイル編集: 両方とも対応</li>
                  <li>複雑な設計: Claude Code 推奨</li>
                </ul>
              </div>

              <Callout type="tip">
                <strong>推奨ワークフロー:</strong>
                <ol className="list-decimal list-inside space-y-1 mt-2 text-sm">
                  <li>Claude Code で API 骨組み・認証・テストを実装</li>
                  <li>Cursor でコンポーネント抽出・リファクタリング</li>
                  <li>Claude Code で本格テスト・セキュリティレビュー</li>
                  <li>両ツールで段階的にフィーチャーを追加</li>
                </ol>
              </Callout>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* よくある質問 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">よくある質問 (FAQ)</h2>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Q: JWT の署名キーはどこに保管する？</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              A: 絶対に .env ファイルに保管し、コード内にハードコーディングしてはいけません。
              本番環境では AWS Secrets Manager や HashiCorp Vault などを使用してください。
              <CodeBlock code="# .env.example
JWT_SECRET=your-secret-key-should-be-strong-and-random" language="bash" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Q: パスワードが正しいかどうを確認するベストプラクティスは？</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              A: bcrypt.compare() を使用します。ハッシュ値を直接比較してはいけません。
              理由: ハッシング時のソルト値が毎回異なるため、直接比較では常に異なる値になります。
              <CodeBlock code="// ✅ 正しい方法
const isValid = await bcrypt.compare(inputPassword, storedHash)

// ❌ 間違った方法
const isValid = bcrypt.hashSync(inputPassword) === storedHash" language="typescript" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Q: すべてのエンドポイントに認証が必要？</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              A: いいえ。このガイドでは以下のエンドポイントは公開しています:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>POST /auth/register - ユーザー登録</li>
                <li>POST /auth/login - ログイン</li>
                <li>GET /posts - 公開記事一覧</li>
                <li>GET /posts/{"{id}"} - 記事詳細</li>
              </ul>
              その他のエンドポイント (作成、更新、削除) は認証が必須です。
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Q: CORS (Cross-Origin Resource Sharing) は必須？</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              A: フロントエンドが別のドメインで実行される場合は必須です。
              <CodeBlock code="import cors from 'cors'

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}))" language="typescript" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Q: レート制限は実装すべき？</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              A: はい、本番環境では必須です。ブルートフォース攻撃やサービス妨害から保護します。
              express-rate-limit パッケージを使用してください。
              <CodeBlock code="import rateLimit from 'express-rate-limit'

// ログインエンドポイント: 15分で5回まで
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'ログイン試行回数が多すぎます。後でもう一度試してください。'
})

app.post('/auth/login', loginLimiter, authController.login)" language="typescript" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Q: 本番環境へのデプロイ時の注意点は？</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              A: 以下の確認リストを実行してください:
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>NODE_ENV=production を設定</li>
                <li>JWT_SECRET を強力なランダム文字列に設定</li>
                <li>データベースバックアップを取得</li>
                <li>HTTPS を有効化</li>
                <li>ロギングレベルを調整 (本番: warning, エラーのみ)</li>
                <li>ヘルスチェックエンドポイントを実装</li>
                <li>セキュリティヘッダーを設定 (helmet.js)</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 次のステップ */}
      <section>
        <h2 className="text-2xl font-bold mb-6">次のステップ</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">機能拡張アイデア</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                このプロジェクトに追加できる機能:
              </p>
              <ul className="space-y-2 text-sm list-disc list-inside text-muted-foreground">
                <li>メール確認機能</li>
                <li>パスワードリセット</li>
                <li>OAuth 2.0 (Google, GitHub)</li>
                <li>コメント・いいね機能</li>
                <li>フォロー機能</li>
                <li>全文検索 (Elasticsearch)</li>
                <li>キャッシング (Redis)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">関連する学習リソース</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/tools/claude-code/tips" className="text-primary hover:underline">
                    Claude Code のベストプラクティス
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="text-primary hover:underline">
                    セキュリティガイド (本ドキュメント内)
                  </Link>
                </li>
                <li>
                  <Link href="/troubleshooting" className="text-primary hover:underline">
                    トラブルシューティング
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 完了 */}
      <section>
        <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🚀 API 開発をマスターしました！
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              このユースケースで以下のスキルを習得しました:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                <span>JWT 認証システムの設計・実装</span>
              </li>
              <li className="flex items-start gap-2">
                <Database className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                <span>Prisma ORM によるデータベース操作</span>
              </li>
              <li className="flex items-start gap-2">
                <Lock className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                <span>パスワード暗号化とセキュアなバリデーション</span>
              </li>
              <li className="flex items-start gap-2">
                <TestTube className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                <span>Jest によるユニットテスト (80%+ カバレッジ)</span>
              </li>
              <li className="flex items-start gap-2">
                <GitBranch className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                <span>統一的なエラーハンドリングパターン</span>
              </li>
            </ul>

            <div className="pt-4">
              <p className="text-sm font-semibold mb-3">
                次は、フロントエンド (React/Next.js) と統合してみましょう！
              </p>
              <Link href="/usecases/web-development">
                <Button className="w-full">Web 開発ユースケースを見る</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* フィードバック */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>フィードバックをお待ちしています</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              このユースケースはお役に立ちましたか？改善点やご質問がありましたら、お聞かせください。
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/usecases">
                <Button variant="primary">ユースケース一覧に戻る</Button>
              </Link>
              <Link href="/tools/claude-code">
                <Button variant="outline">Claude Code について</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
