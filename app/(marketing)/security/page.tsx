import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Callout } from "@/components/content/callout"
import { CodeBlock } from "@/components/content/code-block"
import { Shield, Lock, AlertCircle, CheckCircle2, XCircle, Key, Eye, Zap, Database, GitBranch } from "lucide-react"

export const metadata: Metadata = {
  title: "セキュリティガイド - Claude Code と Cursor のセキュリティベストプラクティス",
  description: "APIキーの安全な管理、データプライバシー、機密情報の扱い方、セキュリティチェックリストを初心者向けに解説します。",
}

interface SecurityTipProps {
  readonly title: string
  readonly icon: React.ReactNode
  readonly content: string
  readonly importance: "必須" | "推奨" | "任意"
  readonly codeExample?: string
  readonly codeLanguage?: string
}

function SecurityTip({ title, icon, content, importance, codeExample, codeLanguage }: SecurityTipProps) {
  const importanceColor = {
    必須: "border-red-200 bg-red-50",
    推奨: "border-yellow-200 bg-yellow-50",
    任意: "border-blue-200 bg-blue-50",
  }

  const importanceBadgeColor = {
    必須: "bg-red-100 text-red-800",
    推奨: "bg-yellow-100 text-yellow-800",
    任意: "bg-blue-100 text-blue-800",
  }

  return (
    <Card className={`border-l-4 ${importanceColor[importance]}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <div className="inline-flex items-center justify-center rounded-lg p-2 bg-white border">
              {icon}
            </div>
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <p className={`text-xs font-semibold mt-2 px-2 py-1 rounded-md w-fit ${importanceBadgeColor[importance]}`}>
                {importance}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm leading-relaxed">{content}</p>
        {codeExample && (
          <div className="mt-4">
            <p className="text-xs font-semibold text-muted-foreground mb-2">コード例：</p>
            <CodeBlock code={codeExample} language={codeLanguage || "typescript"} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

interface AntiPatternProps {
  readonly title: string
  readonly wrongCode: string
  readonly correctCode: string
  readonly explanation: string
}

function AntiPattern({ title, wrongCode, correctCode, explanation }: AntiPatternProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <XCircle className="h-4 w-4 text-red-500" />
            <p className="text-sm font-semibold text-red-700">避けるべき（NG）パターン</p>
          </div>
          <CodeBlock code={wrongCode} language="typescript" />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <p className="text-sm font-semibold text-green-700">推奨パターン</p>
          </div>
          <CodeBlock code={correctCode} language="typescript" />
        </div>

        <div className="rounded-lg bg-muted p-3 border-l-2 border-blue-500">
          <p className="text-xs font-semibold text-muted-foreground mb-1">理由：</p>
          <p className="text-sm">{explanation}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default function SecurityPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-3">セキュリティガイド</h1>
        <p className="text-lg text-muted-foreground">
          APIキーの管理、データプライバシー、機密情報の扱い方など、セキュアに Claude Code と Cursor を使うための完全ガイドです。
        </p>
      </div>

      <Callout type="warning" title="セキュリティは最優先">
        セキュリティの甘さは、あなたのプロジェクトだけでなく、ユーザーのデータまで危険にさらします。以下のガイドは必ず守ってください。
      </Callout>

      {/* APIキーの安全な管理 */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Key className="h-6 w-6 text-primary" />
          APIキーの安全な管理
        </h2>
        <div className="space-y-6">
          <SecurityTip
            title="環境変数を使用してAPIキーを管理する"
            icon={<Lock className="h-5 w-5 text-primary" />}
            importance="必須"
            content="APIキーは決してコードに直接書いてはいけません。環境変数として .env ファイルに保存し、git でトラッキング対象から除外することで、誤ってリポジトリにアップロードされるのを防ぎます。"
            codeExample={`// .env ファイル（.gitignore に追加）
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

// コード内での使用
const apiKey = process.env.ANTHROPIC_API_KEY

if (!apiKey) {
  throw new Error('ANTHROPIC_API_KEY environment variable is not set')
}

const response = await fetch('https://api.anthropic.com/v1/messages', {
  headers: {
    'x-api-key': apiKey,
    'content-type': 'application/json',
  },
  body: JSON.stringify({ model: 'claude-opus-4-6' }),
})`}
          />

          <SecurityTip
            title=".gitignore で .env ファイルを除外する"
            icon={<GitBranch className="h-5 w-5 text-primary" />}
            importance="必須"
            content="プロジェクトのルートに .gitignore ファイルがあることを確認し、.env や .env.local などが含まれていることを確認してください。これにより、秘密情報が git で追跡されなくなります。"
            codeExample={`# .gitignore
.env
.env.local
.env.*.local
*.pem
*.key
.DS_Store
node_modules/
dist/
build/
.next/
.vercel/

# IDE
.vscode/
.idea/
*.swp
*.swo`}
          />

          <SecurityTip
            title="本番環境と開発環境を分離する"
            icon={<Database className="h-5 w-5 text-primary" />}
            importance="推奨"
            content="開発環境、ステージング環境、本番環境でそれぞれ異なるAPIキーを使用してください。これにより、開発中のミスが本番環境に影響を与えるのを防ぎます。"
            codeExample={`// config.ts
export const config = {
  apiKey: process.env.ANTHROPIC_API_KEY,
  environment: process.env.NODE_ENV || 'development',
  isDevelopment: process.env.NODE_ENV !== 'production',
  isProduction: process.env.NODE_ENV === 'production',
}

// 環境ごとに異なるエンドポイントを使用
export const getApiEndpoint = () => {
  if (config.isProduction) {
    return 'https://api.production.anthropic.com'
  }
  return 'https://api.sandbox.anthropic.com'
}`}
          />

          <SecurityTip
            title="APIキーの定期的なローテーション"
            icon={<Zap className="h-5 w-5 text-primary" />}
            importance="推奨"
            content="セキュリティのベストプラクティスとして、APIキーを定期的に（月1回程度）新しいものに置き換えてください。特に、キーが漏洩した可能性がある場合は即座にローテーションしてください。"
          />

          <Callout type="tip" title="ローカル開発でのキー管理">
            <ul className="space-y-2 ml-4 list-disc text-sm">
              <li>npm の <code className="bg-muted px-1">dotenv</code> パッケージで .env を自動読み込みすることをお勧めします</li>
              <li>チーム開発では、.env.example ファイルにテンプレート（実値なし）を保存してください</li>
              <li>CI/CD パイプライン（GitHub Actions など）では、シークレット機能を使用してキーを管理してください</li>
            </ul>
          </Callout>
        </div>
      </section>

      {/* データプライバシーの詳細 */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Eye className="h-6 w-6 text-primary" />
          データプライバシーの詳細
        </h2>
        <div className="space-y-6">
          <SecurityTip
            title="個人情報を AI に送らない"
            icon={<AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />}
            importance="必須"
            content="ユーザーの個人情報（メールアドレス、電話番号、住所、クレジットカード番号など）を Claude Code や他の AI に送信しないでください。AI は学習データに含める可能性があり、プライバシー侵害につながります。"
            codeExample={`// ❌ NG: 実ユーザーの情報を送信
const userData = {
  userId: '12345',
  email: 'user@example.com',
  name: '山田太郎',
  phone: '090-1234-5678',
  address: '東京都渋谷区',
}
// AI にこのデータを送らない！

// ✅ OK: 匿名化・マスキングして送信
const sanitizedData = {
  userIdHash: hashFunction(userData.userId),
  // 個人情報は含めない
  dataType: 'user_profile', // 型情報だけ
  fieldCount: 5,
}
// これなら安全に送信可能`}
          />

          <SecurityTip
            title="顧客データベースの内容を共有しない"
            icon={<Database className="h-5 w-5 text-primary" />}
            importance="必須"
            content="本番環境のデータベース内容を AI に共有しないでください。テスト用の匿名化されたサンプルデータのみを使用してください。"
            codeExample={`// ❌ NG: 本番データを直接送信
const users = await db.query('SELECT * FROM users')
// Claude Code に users を送信しない！

// ✅ OK: テスト用の匿名化データ
const testData = [
  { id: 'USER_001', status: 'active', role: 'admin' },
  { id: 'USER_002', status: 'inactive', role: 'user' },
  // 実ユーザー情報は含めない
]
// これなら安全に送信可能`}
          />

          <SecurityTip
            title="GDPR と個人情報保護法を理解する"
            icon={<Shield className="h-5 w-5 text-primary" />}
            importance="推奨"
            content="ヨーロッパで事業をしている場合は GDPR（欧州一般データ保護規則）に準拠する必要があります。日本では個人情報保護法があります。これらの法律では、ユーザーデータをどこに保存するか、いつ削除するかなどが定められています。"
          />

          <SecurityTip
            title="データ転送時の暗号化"
            icon={<Lock className="h-5 w-5 text-primary" />}
            importance="推奨"
            content="API 通信や外部サービスへのデータ送信は、必ず HTTPS（暗号化）を使用してください。HTTP（暗号化なし）でデータを送信してはいけません。"
            codeExample={`// ❌ NG: HTTP を使用
fetch('http://api.example.com/user', {
  method: 'POST',
  body: JSON.stringify(userData),
})

// ✅ OK: HTTPS を使用
fetch('https://api.example.com/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(userData),
})`}
          />
        </div>
      </section>

      {/* 機密情報の扱い方 */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Lock className="h-6 w-6 text-primary" />
          機密情報の扱い方
        </h2>
        <div className="space-y-6">
          <SecurityTip
            title="データベース接続情報の保護"
            icon={<Database className="h-5 w-5 text-primary" />}
            importance="必須"
            content="データベースのユーザー名、パスワード、ホスト情報は絶対に AI に送信しないでください。これらは環境変数に保存し、接続テスト後は消去してください。"
            codeExample={`// ❌ NG: DB接続情報を含める
const dbConfig = {
  host: 'prod-db.example.com',
  port: 5432,
  user: 'admin',
  password: 'MyPassword123!',
  database: 'customers',
}
// このコードを AI と共有しない！

// ✅ OK: 環境変数から読み込み
const dbConfig = {
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '5432'),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
}

if (!dbConfig.password) {
  throw new Error('DATABASE_PASSWORD not configured')
}`}
          />

          <SecurityTip
            title="JWT トークンとセッション ID の管理"
            icon={<Key className="h-5 w-5 text-primary" />}
            importance="必須"
            content="JWT（JSON Web Token）やセッション ID は、ブラウザのクッキーに安全に保存し、決してローカルストレージに保存しないでください。また、これらのトークンを AI に共有しないでください。"
            codeExample={`// ❌ NG: localStorage にトークンを保存
localStorage.setItem('token', jwtToken)

// ✅ OK: HttpOnly クッキーに保存
// サーバー側でこのように設定
response.cookie('token', jwtToken, {
  httpOnly: true,      // JavaScript からアクセス不可
  secure: true,        // HTTPS のみ
  sameSite: 'strict',  // CSRF 対策
  maxAge: 3600000,     // 1時間
})`}
          />

          <SecurityTip
            title="OAuth/OpenID Connect クライアント ID・シークレット"
            icon={<Zap className="h-5 w-5 text-primary" />}
            importance="必須"
            content="Google、GitHub などの OAuth 認証で使用するクライアント ID とシークレットも、環境変数に保存してください。特にシークレットが漏洩すると、攻撃者が詐欺ログインを作成できます。"
            codeExample={`// .env
GITHUB_CLIENT_ID=Ov23liXXXXXXXXX
GITHUB_CLIENT_SECRET=XXXXXXXXXXXX  # 絶対に git にコミットしない！
GOOGLE_CLIENT_ID=XXXXXXX.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=XXXXXXXXXXX

// API ハンドラ内での使用
export async function getGitHubToken(code: string) {
  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Accept': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  })
  // ...
}`}
          />
        </div>
      </section>

      {/* パーミッション設定のベストプラクティス */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          パーミッション設定のベストプラクティス
        </h2>
        <div className="space-y-6">
          <SecurityTip
            title="最小権限の原則（Principle of Least Privilege）"
            icon={<Lock className="h-5 w-5 text-primary" />}
            importance="必須"
            content="ユーザーや API キーには、タスクを完了するために必要な最小限の権限だけを付与してください。例えば、読み取り専用の操作しか必要ない場合は、読み取り専用キーを使用します。"
            codeExample={`// ❌ NG: 管理者権限で全ての操作を許可
const adminKey = process.env.ADMIN_API_KEY
// この1つのキーで全て操作

// ✅ OK: 操作ごとに異なるキーを使用
const readOnlyKey = process.env.API_KEY_READONLY
const writeKey = process.env.API_KEY_WRITE
const adminKey = process.env.API_KEY_ADMIN

// 必要に応じて使い分け
export async function getUser(id: string) {
  return await fetch(\`/api/users/\${id}\`, {
    headers: { 'Authorization': \`Bearer \${readOnlyKey}\` },
  })
}

export async function updateUser(id: string, data: any) {
  return await fetch(\`/api/users/\${id}\`, {
    method: 'PUT',
    headers: { 'Authorization': \`Bearer \${writeKey}\` },
    body: JSON.stringify(data),
  })
}`}
          />

          <SecurityTip
            title="ファイル権限の設定（Linux/Mac）"
            icon={<Shield className="h-5 w-5 text-primary" />}
            importance="推奨"
            content="Linux や Mac 環境で秘密ファイル（.env、秘密鍵など）のパーミッションを設定してください。Windows でも同様に、秘密ファイルへのアクセスを制限してください。"
            codeExample={`# Linux/Mac: .env ファイルを所有者のみ読み取り可能に
chmod 600 .env
chmod 600 ~/.ssh/id_rsa

# 確認
ls -la .env
# -rw------- (600) と表示されれば OK

# Windows PowerShell: .env をコンソールユーザーのみアクセス可能に
$acl = Get-Acl ".env"
$acl.SetAccessRuleProtection($true, $true)
$rule = New-Object System.Security.AccessControl.FileSystemAccessRule(
  $env:USERNAME,
  "FullControl",
  "Allow"
)
$acl.SetAccessRule($rule)
Set-Acl ".env" $acl`}
          />

          <SecurityTip
            title="データベースユーザーの権限設定"
            icon={<Database className="h-5 w-5 text-primary" />}
            importance="推奨"
            content="本番環境のデータベースでは、アプリケーション用に専用ユーザーを作成し、必要な権限だけを付与してください。すべてのテーブルにアクセス可能な root/admin ユーザーで接続しないでください。"
            codeExample={`-- PostgreSQL 例: 専用ユーザーを作成し、必要な権限だけ付与
-- ❌ NG: 全権限付与
CREATE USER app_user WITH PASSWORD 'password123';
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO app_user;

-- ✅ OK: 最小限の権限付与
CREATE USER app_user WITH PASSWORD 'password123';
GRANT CONNECT ON DATABASE mydb TO app_user;
GRANT USAGE ON SCHEMA public TO app_user;
GRANT SELECT, INSERT, UPDATE ON public.users TO app_user;
GRANT SELECT, INSERT, UPDATE ON public.products TO app_user;
-- DELETE や ALTER は不要なため、付与しない`}
          />
        </div>
      </section>

      {/* セキュリティアンチパターン */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
          セキュリティアンチパターン（避けるべき使い方）
        </h2>
        <div className="space-y-6">
          <AntiPattern
            title="APIキーをコードに直接書く"
            wrongCode={`// ❌ NG: API キーをコードに直接書く
const client = new Anthropic({
  apiKey: 'sk-ant-v0-xxxxxxxxxxxxx',
})

export async function askClaude(question: string) {
  const message = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 1024,
    messages: [{ role: 'user', content: question }],
  })
  return message
}`}
            correctCode={`// ✅ OK: 環境変数から読み込む
const apiKey = process.env.ANTHROPIC_API_KEY

if (!apiKey) {
  throw new Error('ANTHROPIC_API_KEY environment variable is required')
}

const client = new Anthropic({ apiKey })

export async function askClaude(question: string) {
  const message = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 1024,
    messages: [{ role: 'user', content: question }],
  })
  return message
}`}
            explanation="コードに API キーを直接書くと、git でコミットされて GitHub などにアップロードされた時点で、すべての人に見られてしまいます。環境変数から読み込むことで、この危険を避けられます。"
          />

          <AntiPattern
            title="ユーザーの入力値をそのまま使用"
            wrongCode={`// ❌ NG: ユーザー入力をそのまま使用
app.post('/search', (req, res) => {
  const query = req.body.q

  // SQL インジェクション可能！
  const result = db.query(\`SELECT * FROM users WHERE name = '\${query}'\`)

  // HTML インジェクション可能！
  res.send(\`<h1>検索結果: \${query}</h1>\`)
})`}
            correctCode={`// ✅ OK: 入力値を検証・エスケープ
import { z } from 'zod'
import escapeHtml from 'escape-html'

const querySchema = z.string().min(1).max(100)

app.post('/search', (req, res) => {
  const validatedQuery = querySchema.parse(req.body.q)

  // パラメータ化クエリで SQL インジェクション防止
  const result = db.query('SELECT * FROM users WHERE name = ?', [validatedQuery])

  // HTML エスケープで XSS 防止
  res.send(\`<h1>検索結果: \${escapeHtml(validatedQuery)}</h1>\`)
})`}
            explanation="ユーザーの入力値をそのまま使用すると、SQL インジェクション（データベース攻撃）や XSS（画面への悪意あるコード挿入）が可能になります。入力値の検証とエスケープは必須です。"
          />

          <AntiPattern
            title="エラーメッセージに内部情報を含める"
            wrongCode={`// ❌ NG: 内部情報をエラーメッセージに含める
app.get('/user/:id', async (req, res) => {
  try {
    const user = await db.query('SELECT * FROM users WHERE id = ?', [req.params.id])
    res.json(user)
  } catch (error) {
    // 攻撃者にサーバー情報が漏れる
    res.status(500).json({
      error: error.message,  // スタックトレース
      stack: error.stack,
      dbHost: process.env.DATABASE_HOST,
    })
  }
})`}
            correctCode={`// ✅ OK: ユーザーフレンドリーなエラーメッセージ
app.get('/user/:id', async (req, res) => {
  try {
    const user = await db.query('SELECT * FROM users WHERE id = ?', [req.params.id])
    res.json(user)
  } catch (error) {
    // 内部はログ記録、ユーザーには一般的なメッセージ
    console.error('Database error:', error)
    res.status(500).json({
      error: 'ユーザー情報の取得に失敗しました',
      requestId: req.id,  // サポート用識別子
    })
  }
})`}
            explanation="エラーメッセージにスタックトレースやホスト情報を含めると、攻撃者に攻撃のヒント（何のデータベースを使っているか、ディレクトリ構造など）が与えられます。"
          />

          <AntiPattern
            title="localStorage に機密情報を保存"
            wrongCode={`// ❌ NG: localStorage に JWT トークンを保存
function login(email: string, password: string) {
  const response = await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
  const { token } = await response.json()

  // localStorage は JavaScript から簡単にアクセス可能
  // XSS 攻撃で盗まれる危険性
  localStorage.setItem('authToken', token)
}

export function getAuthToken() {
  return localStorage.getItem('authToken')
}`}
            correctCode={`// ✅ OK: HttpOnly クッキーを使用
// サーバー側で自動的にクッキー設定
function setAuthCookie(response: any, token: string) {
  response.cookie('authToken', token, {
    httpOnly: true,      // JavaScript からアクセス不可
    secure: true,        // HTTPS のみ送信
    sameSite: 'strict',  // CSRF 対策
    maxAge: 3600000,     // 1時間
    path: '/',
  })
}

// クライアント側: 自動的にクッキーが送信される
// トークンを明示的に管理する必要なし`}
            explanation="localStorage は XSS 攻撃で JavaScript から簡単に盗まれます。HttpOnly クッキーなら JavaScript からアクセスできないため、XSS の影響を最小限に抑えられます。"
          />

          <AntiPattern
            title="SSL/TLS 検証を無効化"
            wrongCode={`// ❌ NG: SSL 証明書検証を無効化
const https = require('https')

const agent = new https.Agent({
  rejectUnauthorized: false,  // 危険！
})

fetch('https://api.example.com', {
  agent: agent,
})`}
            correctCode={`// ✅ OK: SSL 検証を有効（デフォルト動作）
// Node.js はデフォルトで SSL/TLS を検証
fetch('https://api.example.com')

// 自己署名証明書が必要な場合（開発環境のみ）
const fs = require('fs')
const https = require('https')

const agent = new https.Agent({
  ca: fs.readFileSync('./certs/ca.pem'),
  rejectUnauthorized: true,  // 検証を有効
})`}
            explanation="SSL/TLS 検証を無効化すると、中間者攻撃（MITM）の被害を受けやすくなります。通信が盗聴・改ざんされる危険があります。"
          />
        </div>
      </section>

      {/* コードレビューチェックリスト */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <CheckCircle2 className="h-6 w-6 text-primary" />
          セキュリティコードレビューチェックリスト
        </h2>

        <Callout type="tip" title="使い方">
          新しいコードを書いた後、またはコードレビュー前に、このチェックリストを使用して確認してください。すべてのチェック項目を満たすことが、安全なコードの必須条件です。
        </Callout>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-600 dark:text-red-400" />
                必須チェック項目（全て満たす必要あり）
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  "APIキー・パスワード・トークンがコードに直接書かれていない",
                  "秘密情報は環境変数で管理されている",
                  ".env ファイルが .gitignore に含まれている",
                  "ユーザー入力が検証されている",
                  "SQL クエリはパラメータ化されている（SQL インジェクション対策）",
                  "HTML は適切にエスケープされている（XSS 対策）",
                  "エラーメッセージに内部情報（スタックトレース）が含まれていない",
                  "本番データベースの接続情報が含まれていない",
                  "HTTPS（暗号化）を使用している",
                  "ファイルのパーミッションが適切に設定されている",
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-sm">
                    <input type="checkbox" className="mt-1" disabled />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                推奨チェック項目
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  "本番環境と開発環境で異なるキーを使用している",
                  "API キーの権限が最小限に設定されている",
                  "機密ファイルへのアクセス制限が設定されている",
                  "ユーザーの個人情報は AI に送信していない",
                  "JWT トークンは HttpOnly クッキーに保存されている",
                  "レート制限が実装されている",
                  "CORS 設定が適切に制限されている",
                  "機密操作（削除、権限変更など）にログ記録がある",
                  "CI/CD で自動セキュリティスキャンが実行されている",
                  "依存ライブラリの脆弱性がチェックされている",
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-sm">
                    <input type="checkbox" className="mt-1" disabled />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* プラットフォーム別ガイド */}
      <section>
        <h2 className="text-2xl font-bold mb-6">プラットフォーム別 - 環境変数の設定方法</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Windows</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-semibold mb-2">方法 1: コマンドプロンプト（一時的）</p>
                <CodeBlock
                  code={`set ANTHROPIC_API_KEY=sk-ant-xxxxx
npm run dev`}
                  language="bash"
                />
              </div>
              <div>
                <p className="text-sm font-semibold mb-2">方法 2: PowerShell（一時的）</p>
                <CodeBlock
                  code={`$env:ANTHROPIC_API_KEY="sk-ant-xxxxx"
npm run dev`}
                  language="bash"
                />
              </div>
              <div>
                <p className="text-sm font-semibold mb-2">方法 3: .env ファイル（推奨）</p>
                <CodeBlock
                  code={`# .env
ANTHROPIC_API_KEY=sk-ant-xxxxx
NODE_ENV=development`}
                  language="bash"
                />
              </div>
              <Callout type="tip" title="npm dotenv を使用">
                <code className="bg-muted px-1">npm install dotenv</code> をインストールしてから、コード内で <code className="bg-muted px-1">require(&apos;dotenv&apos;).config()</code> を実行してください。
              </Callout>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Mac / Linux</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-semibold mb-2">方法 1: 一時的に設定</p>
                <CodeBlock
                  code={`export ANTHROPIC_API_KEY="sk-ant-xxxxx"
npm run dev`}
                  language="bash"
                />
              </div>
              <div>
                <p className="text-sm font-semibold mb-2">方法 2: 永続的に設定（~/.zshrc）</p>
                <CodeBlock
                  code={`# ~/.zshrc または ~/.bash_profile
export ANTHROPIC_API_KEY="sk-ant-xxxxx"

# 設定を反映
source ~/.zshrc`}
                  language="bash"
                />
              </div>
              <div>
                <p className="text-sm font-semibold mb-2">方法 3: .env ファイル（推奨）</p>
                <CodeBlock
                  code={`# .env
ANTHROPIC_API_KEY=sk-ant-xxxxx
NODE_ENV=development

# 実行
npm run dev`}
                  language="bash"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">GitHub Actions（CI/CD）</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-semibold mb-2">Repository Secret を設定</p>
                <div className="text-sm text-muted-foreground mb-3">
                  GitHub リポジトリ → Settings → Secrets and variables → Actions → New repository secret
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold mb-2">ワークフローで使用</p>
                <CodeBlock
                  code={`name: Test
on: [push]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install dependencies
        run: npm install
      - name: Run tests
        env:
          ANTHROPIC_API_KEY: \${{ secrets.ANTHROPIC_API_KEY }}
        run: npm test`}
                  language="yaml"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* よくある質問 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">よくある質問（FAQ）</h2>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Q: うっかり API キーを git にコミットしてしまいました。どうしたら良いですか？</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>A: 以下の手順で対処してください。</p>
              <ol className="list-decimal ml-5 space-y-2">
                <li>すぐに API キーを無効化・削除してください。（例：Anthropic ダッシュボードで新しいキーを生成）</li>
                <li>GitHub から履歴を削除します：<code className="bg-muted px-1">git filter-branch</code> または <code className="bg-muted px-1">git rebase</code></li>
                <li>コミットを force push します：<code className="bg-muted px-1">git push --force</code></li>
                <li>チーム全体に通知してください</li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Q: ローカル開発と本番環境で異なる API キーを使うには？</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>A: .env ファイルを使い分けます。</p>
              <CodeBlock
                code={`# ローカル開発
.env.local

# 本番環境
.env.production

# コード内での読み込み
const apiKey = process.env.ANTHROPIC_API_KEY

// または環境ごとに分ける
const apiKey =
  process.env.NODE_ENV === 'production'
    ? process.env.PRODUCTION_API_KEY
    : process.env.DEVELOPMENT_API_KEY`}
                language="typescript"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Q: Claude Code に本番環境のコードを見せるのは安全ですか？</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>A: 以下の条件下なら安全です。</p>
              <ul className="list-disc ml-5 space-y-2">
                <li>APIキーなど秘密情報が含まれていないこと</li>
                <li>ユーザーの個人情報が含まれていないこと</li>
                <li>ビジネス上の極秘情報が含まれていないこと</li>
              </ul>
              <p className="mt-3">不安な場合は、テスト用のサンドボックス環境のコードを見せる方がより安全です。</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Q: .env.example ファイルには何を書きますか？</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>A: 実際の値ではなく、テンプレート（ダミー値）を書きます。</p>
              <CodeBlock
                code={`# .env.example（git にコミットする）
ANTHROPIC_API_KEY=sk-ant-your-api-key-here
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
NODE_ENV=development

# .env（.gitignore に追加、ローカルのみ）
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
DATABASE_URL=postgresql://admin:realpassword@localhost:5432/myapp
NODE_ENV=development`}
                language="bash"
              />
              <p className="mt-3">これにより、新しいチーム メンバーが .env.example を参考に .env を設定できます。</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 外部リソース */}
      <section>
        <h2 className="text-2xl font-bold mb-6">セキュリティ学習リソース</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">公式ドキュメント</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <ul className="space-y-2 list-disc ml-4">
                <li>
                  <a href="https://owasp.org/www-project-top-ten/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                    OWASP Top 10
                  </a>
                  - Web アプリケーションの最も一般的な脆弱性
                </li>
                <li>
                  <a href="https://cheatsheetseries.owasp.org/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                    OWASP Cheat Sheet Series
                  </a>
                  - セキュリティ対策の実装ガイド
                </li>
                <li>
                  <a href="https://nodejs.org/en/docs/guides/security/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                    Node.js Security Best Practices
                  </a>
                  - Node.js アプリケーションのセキュリティ
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">チェックツール</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <ul className="space-y-2 list-disc ml-4">
                <li>
                  <a href="https://docs.github.com/en/code-security/secret-scanning" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                    GitHub Secret Scanning
                  </a>
                  - git リポジトリから秘密情報を検出
                </li>
                <li>
                  <a href="https://docs.npmjs.com/cli/v9/commands/npm-audit" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                    npm audit
                  </a>
                  - 依存ライブラリの脆弱性をチェック
                </li>
                <li>
                  <a href="https://owasp.org/www-project-dependency-check/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                    OWASP Dependency-Check
                  </a>
                  - オープンソース脆弱性スキャナ
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 次のステップ */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>セキュリティガイドを読み終わったら</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              セキュリティの基本を理解したら、実際のプロジェクトで実践してみてください。定期的にコードレビューチェックリストを使用して、安全な状態を維持しましょう。
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/getting-started/glossary">
                <Button variant="outline">用語集に戻る</Button>
              </Link>
              <Link href="/getting-started">
                <Button variant="primary">入門ガイドに戻る</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
