import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Callout } from "@/components/content/callout"
import { StepByStep } from "@/components/content/step-by-step"
import { Clock, CheckCircle2, Star, Rocket, Code2, Shield } from "lucide-react"
import type { SetupStep } from "@/types/tools"

export const metadata: Metadata = {
  title: "Next.js認証機能実装チュートリアル - Claude Codeで学ぶ実践開発",
  description: "Claude CodeとCursorを使ってNext.js + NextAuth.jsでログイン機能を実装するハンズオンチュートリアル。実際のプロンプト例とAIとの対話を通じて習得します。",
}

const steps: SetupStep[] = [
  {
    stepNumber: 1,
    title: "Next.js プロジェクトの作成",
    description: "Next.js 14 で新しいプロジェクトを作成します。",
    code: `# 新しい Next.js プロジェクトを作成
npx create-next-app@latest auth-tutorial --typescript --tailwind --app

# プロジェクトディレクトリに移動
cd auth-tutorial

# 依存関係をインストール
npm install next-auth prisma @prisma/client bcryptjs
npm install -D prisma`,
    codeLanguage: "bash",
    callout: {
      type: "info",
      message: "プロンプトで「App Router」を選択し、TypeScript と Tailwind CSS を有効にしてください。",
    },
  },
  {
    stepNumber: 2,
    title: "Claude Code を起動してコード分析",
    description: "プロジェクトのディレクトリ構造を確認してもらいます。",
    code: `claude

# Claude Code を起動したら、以下を入力：
"このプロジェクトの現在のファイル構造を分析して、
NextAuth.js 統合に必要な設定ファイルの一覧を教えてください。"`,
    codeLanguage: "bash",
    callout: {
      type: "tip",
      message: "AI に全体像を把握させることで、より正確な実装提案が得られます。",
    },
  },
  {
    stepNumber: 3,
    title: "プロンプト例：NextAuth.js の初期設定",
    description: "実際に使えるプロンプト例を参考に、認証機能を実装してもらいます。",
    code: `以下の要件で、Next.js 14 に NextAuth.js による
ログイン・ログアウト機能を実装してください。

【要件】
1. GitHub OAuth と Google OAuth でのログイン
2. メール/パスワードでのログイン（新規登録・既存ユーザーログイン）
3. Prisma を使った SQLite データベース
4. パスワードは bcryptjs でハッシュ化
5. セッション管理は JWT ベース
6. /api/auth/[...nextauth]/route.ts に NextAuth 設定
7. middleware.ts で認証チェック

【実装すること】
- app/api/auth/[...nextauth]/route.ts
  - CredentialsProvider（メール/パスワード）
  - GitHubProvider（OAuth）
  - GoogleProvider（OAuth）
  - Prisma アダプタ
- prisma/schema.prisma
  - User, Account, Session, VerificationToken テーブル
- middleware.ts
  - /dashboard, /profile へのアクセス制御
- app/(auth)/login/page.tsx
  - ログインフォーム（メール/パスワード）
  - OAuth ボタン
- app/(auth)/register/page.tsx
  - 新規登録フォーム
  - フォーム検証（Zod）

【技術制約】
- TypeScript で厳密な型定義
- エラーハンドリングを詳細に
- セキュリティを考慮した実装
- テストコード（Jest）も含める

まず Prisma スキーマから作成してください。`,
    codeLanguage: "plaintext",
    callout: {
      type: "info",
      message: "このプロンプトは「具体的」「段階的」「技術制約明確」の3要素を満たしています。",
    },
  },
  {
    stepNumber: 4,
    title: "生成されたコードの確認と質問",
    description: "AI が生成したコードを確認し、わからない部分を質問します。",
    code: `生成されたコードの確認例：

【良い質問例】
"PasswordCredential で bcryptjs.compare() を使用していますが、
なぜ await を付けるのですか？同期関数ではないのですか？"

"middleware.ts で auth() を呼び出していますが、
これはどうやって NextAuth と連携していますか？"

【悪い質問例】
"これは何ですか？" → 具体的でない
"動きません" → エラーメッセージを含めていない`,
    codeLanguage: "plaintext",
    callout: {
      type: "warning",
      message: "具体的な質問をすると、AI の回答の精度が大幅に上がります。",
    },
  },
  {
    stepNumber: 5,
    title: "環境変数の設定",
    description: ".env.local ファイルを作成して、OAuth クレデンシャルを設定します。",
    code: `# .env.local を作成
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret-key-here

# GitHub OAuth
GITHUB_ID=your-github-id
GITHUB_SECRET=your-github-secret

# Google OAuth
GOOGLE_ID=your-google-id
GOOGLE_SECRET=your-google-secret

# 開発環境用秘密鍵（本番ではランダム生成）
# openssl rand -base64 32 で生成`,
    codeLanguage: "bash",
    callout: {
      type: "warning",
      message: ".env.local は .gitignore に追加し、絶対に GitHub にコミットしないでください。",
    },
  },
  {
    stepNumber: 6,
    title: "Prisma マイグレーション実行",
    description: "データベーススキーマを初期化します。",
    code: `# Prisma の初期化
npx prisma init

# マイグレーションを作成・実行
npx prisma migrate dev --name init

# Prisma Studio で確認（ブラウザで GUI が開く）
npx prisma studio`,
    codeLanguage: "bash",
    callout: {
      type: "tip",
      message: "Prisma Studio で、スキーマと実際のテーブルが正しく作成されたか確認できます。",
    },
  },
  {
    stepNumber: 7,
    title: "プロンプト例：バグ修正時の対応",
    description: "実装中に遭遇したバグと、AI への効果的な報告方法を学びます。",
    code: `【エラーが出た場合のプロンプト】

"以下のエラーが出ています。修正してください。

エラーメッセージ：
TypeError: Cannot read properties of undefined (reading 'user')
  at /app/app/(auth)/login/page.tsx:45:12

該当コード（45行目）：
const userId = session.user.id

コンテキスト：
- useSession() フックでセッションを取得している
- ログインページで、既にログイン済みのユーザーをリダイレクトしたい
- セッションが null の場合の処理が足りないと思う"

【重要ポイント】
1. エラーメッセージの全文をコピー
2. 該当コードを明示
3. 背景・意図を説明
4. 自分の推測を含める（AI が正確に診断しやすい）`,
    codeLanguage: "plaintext",
  },
  {
    stepNumber: 8,
    title: "テストコードの作成と実行",
    description: "認証ロジックのテストを Claude に書いてもらい、動作確認します。",
    code: `# Jest と testing-library をインストール
npm install -D jest @testing-library/react @testing-library/jest-dom

# テスト実行
npm test

【テストコード例（Claude が生成）】
describe('Login Page', () => {
  it('should display login form', () => {
    render(<LoginPage />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })

  it('should submit form with credentials', async () => {
    render(<LoginPage />)

    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com')
    await userEvent.type(screen.getByLabelText(/password/i), 'password123')
    await userEvent.click(screen.getByRole('button', { name: /login/i }))

    // アサーション
  })
})`,
    codeLanguage: "typescript",
    callout: {
      type: "info",
      message: "テストを先に書くことで、要件の漏れを事前に検出できます（TDD）。",
    },
  },
  {
    stepNumber: 9,
    title: "セキュリティレビューのプロンプト",
    description: "実装したコードのセキュリティを AI に確認してもらいます。",
    code: `以下の認証実装をセキュリティの観点から
レビューしてください。

【チェック項目】
1. CSRF 対策は実装されている？
2. XSS 脆弱性はないか
3. パスワード保存は安全か
4. セッション管理は安全か
5. レート制限は実装されている？
6. エラーメッセージで情報漏洩していないか

ファイル：
- app/api/auth/[...nextauth]/route.ts
- app/(auth)/login/page.tsx
- lib/auth.ts

セキュリティ上の懸念点があれば、
具体的な修正方法を提案してください。`,
    codeLanguage: "plaintext",
  },
  {
    stepNumber: 10,
    title: "Git コミットと PR 作成",
    description: "実装を Git にコミットし、変更を保存します。",
    code: `# 変更をステージング
git add .

# 詳細なコミットメッセージで記録
git commit -m "feat: implement NextAuth.js authentication

- Add GitHub and Google OAuth providers
- Implement email/password authentication with bcryptjs
- Set up Prisma ORM with SQLite
- Create login and register pages
- Add JWT-based session management
- Implement middleware for protected routes
- Add comprehensive test suite

Closes #1"

# リモートにプッシュ
git push -u origin main`,
    codeLanguage: "bash",
    callout: {
      type: "info",
      message: "詳細なコミットメッセージは、後で変更内容を追跡する際に役立ちます。",
    },
  },
]

export default function NextAuthTutorialPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-3">Next.js 認証機能実装チュートリアル</h1>
        <p className="text-lg text-muted-foreground">
          Claude Code と Cursor を使ってNext.js + NextAuth.js でログイン・登録機能を実装します。
          実際のプロンプト例と AI との対話を通じて、実践的な開発スキルを習得します。
        </p>
      </div>

      {/* チュートリアル概要 */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-muted-foreground">所要時間</span>
              </div>
              <CardTitle>2〜3 時間</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              セットアップから完成までの標準的な時間。経験があれば短縮可能。
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-muted-foreground">難易度</span>
              </div>
              <CardTitle>⭐⭐⭐ 中級</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              React と Next.js の基礎知識が必要です。
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Rocket className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-muted-foreground">学べること</span>
              </div>
              <CardTitle>実践的な認証実装</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              OAuth、セッション管理、セキュリティを含む実装パターン。
            </CardContent>
          </Card>
        </div>
      </section>

      <Callout type="info" title="前提条件">
        <ul className="list-disc list-inside space-y-1">
          <li>Node.js 18 以上と npm/yarn/pnpm がインストール済み</li>
          <li>React と Next.js の基礎知識</li>
          <li>GitHub と Google のアカウント（OAuth 設定用）</li>
          <li>Claude Code / Cursor がインストール済み</li>
          <li>Git がインストール済み</li>
        </ul>
      </Callout>

      {/* 何を学ぶか */}
      <section>
        <h2 className="text-2xl font-bold mb-6">このチュートリアルで学べること</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="h-5 w-5" />
                セキュアな実装方法
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>パスワードハッシング、CSRF 対策、XSS 防止など、認証機能に必要なセキュリティ対策を学びます。</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Code2 className="h-5 w-5" />
                AI との効果的なコミュニケーション
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>プロンプトの書き方、バグ報告、質問のコツを習得します。</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">OAuth 統合</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>GitHub と Google OAuth の設定と実装、トークン管理を学びます。</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">データベース設計</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>Prisma ORM を使ったスキーマ設計、マイグレーション管理を習得します。</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ステップバイステップ */}
      <section>
        <h2 className="text-2xl font-bold mb-6">ステップバイステップガイド</h2>
        <StepByStep steps={steps} />
      </section>

      {/* 実装のポイント */}
      <section>
        <h2 className="text-2xl font-bold mb-6">実装時の重要ポイント</h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">1. プロンプトは「段階的」に書く</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>全てを一度に実装させるのではなく、「まず Prisma スキーマから」と段階的に指示することで、より正確な実装が得られます。</p>
              <code className="block bg-muted p-2 rounded mt-2 text-xs">
                良い例: &quot;まず Prisma スキーマを作成してください。...&quot;
              </code>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">2. エラーは「詳細に」報告する</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>エラーメッセージ、該当行番号、コンテキストを含めると、AI が正確に原因を特定できます。</p>
              <code className="block bg-muted p-2 rounded mt-2 text-xs">
                良い例: &quot;45行目で TypeError が発生。該当コード: const userId = session.user.id&quot;
              </code>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">3. セキュリティレビューを必ず実施</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>認証は特にセキュリティが重要なため、実装後に必ず「セキュリティレビュー」プロンプトで確認しましょう。</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">4. テストを先に書く（TDD）</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>「テストコードも書いてください」と要件に含めることで、テストのない実装を防げます。</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* よくある問題と解決方法 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">よくある問題と解決方法</h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Q: OAuth トークンの有効期限切れエラー</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              A: NextAuth.js が自動的にリフレッシュします。ただし、Google OAuth の場合は refresh_token が必要な場合があります。Prisma の Account モデルに access_token と refresh_token が保存されているか確認してください。
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Q: ログイン後、session が undefined になる</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              A: middleware.ts でセッションが正しく検証されているか確認してください。また、NEXTAUTH_SECRET が .env.local に設定されているか確認しましょう。
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Q: Prisma マイグレーションが失敗する</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              A: `npx prisma migrate reset` で一度リセットしてから、再度マイグレーションしてください。開発環境でのみ使用可能です。
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Q: CSRF トークンが無効というエラー</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              A: NextAuth.js が自動的に CSRF 対策を実装しています。ただし、カスタム API を作る場合は、signIn() の正しい形式を使用してください。
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 完成コード例 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">完成コード例（重要部分）</h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">app/api/auth/[...nextauth]/route.ts</CardTitle>
            </CardHeader>
            <CardContent>
              <code className="block bg-muted p-4 rounded text-xs overflow-x-auto font-mono">
{`import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/lib/prisma"
import { compare } from "bcryptjs"

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials")
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user || !user.password) {
          throw new Error("Invalid credentials")
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          throw new Error("Invalid credentials")
        }

        return { id: user.id, email: user.email, name: user.name }
      }
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || ""
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || ""
    })
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET
}

export const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }`}
              </code>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">prisma/schema.prisma</CardTitle>
            </CardHeader>
            <CardContent>
              <code className="block bg-muted p-4 rounded text-xs overflow-x-auto font-mono">
{`datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  password      String?
  image         String?
  accounts      Account[]
  sessions      Session[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Account {
  id                 String  @id @default(cuid())
  userId             String
  type               String
  provider           String
  providerAccountId  String
  refresh_token      String?
  access_token       String?
  expires_at         Int?
  token_type         String?
  scope              String?
  id_token           String?
  session_state      String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}`}
              </code>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 成功事例 */}
      <section>
        <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              実装完了したら...
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span>GitHub および Google OAuth でログイン可能</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span>メール/パスワードでのログインと新規登録が動作</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span>セキュリティレビューをパス</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span>テストカバレッジが 80% 以上</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span>本番環境へのデプロイ準備完了</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* 次のステップ */}
      <section>
        <h2 className="text-2xl font-bold mb-6">次のステップ</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">さらに進んだ機能</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                認証機能をマスターしたら、以下を実装してみましょう：
              </p>
              <ul className="space-y-2 text-sm list-disc list-inside text-muted-foreground">
                <li>メール確認（Email Verification）</li>
                <li>2 要素認証（2FA）</li>
                <li>ソーシャルログインの複数プロバイダ</li>
                <li>パスワードリセット機能</li>
                <li>ロールベースアクセス制御（RBAC）</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">実践的な学習</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                他のチュートリアルで関連スキルを習得：
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/tutorials/bug-fix-workflow" className="text-primary hover:underline">
                    バグ修正ワークフローチュートリアル
                  </Link>
                </li>
                <li>
                  <Link href="/tutorials/refactoring" className="text-primary hover:underline">
                    リファクタリング実践チュートリアル
                  </Link>
                </li>
                <li>
                  <Link href="/tools/claude-code/tips" className="text-primary hover:underline">
                    Claude Code のベストプラクティス
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* フィードバック */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>チュートリアルを完了しましたか？</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              このチュートリアルについてのフィードバックをお待ちしています。改善点や質問があればお知らせください。
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/tutorials">
                <Button variant="primary">チュートリアル一覧に戻る</Button>
              </Link>
              <Link href="/tools/claude-code">
                <Button variant="outline">Claude Code の全機能を見る</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
