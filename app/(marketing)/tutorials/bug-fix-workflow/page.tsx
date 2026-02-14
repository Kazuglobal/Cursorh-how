import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Callout } from "@/components/content/callout"
import { StepByStep } from "@/components/content/step-by-step"
import { Clock, Star, Rocket, Bug, Zap } from "lucide-react"
import type { SetupStep } from "@/types/tools"

export const metadata: Metadata = {
  title: "バグ修正ワークフローチュートリアル - Claude Codeで効率的にデバッグ",
  description: "Claude CodeとCursorを使った効率的なバグ修正フローを学ぶ。エラー分析、デバッグテクニック、テスト追加を実例で習得します。",
}

const steps: SetupStep[] = [
  {
    stepNumber: 1,
    title: "バグの特定とスクリーニング",
    description: "まずはバグの状況を整理し、AI に効果的に説明する準備をします。",
    code: `【バグ報告の前にやること】

1. エラーメッセージをコピー（全文）
   - 出力画面のテキストを全てコピー
   - 何をしたときに発生したか記録

2. 環境情報の確認
   - Node.js バージョン: node -v
   - npm バージョン: npm -v
   - ブラウザの開発者ツール（F12）でコンソール確認

3. 再現ステップの記録
   - バグが再現する「正確な手順」を書く
   - 毎回同じ手順で再現するか確認

4. 該当コードの特定
   - エラーメッセージから行番号を確認
   - コードエディタで当該行を見つける`,
    codeLanguage: "plaintext",
    callout: {
      type: "info",
      message: "この準備が完了してから AI に報告すると、修正までの時間が大幅に短縮されます。",
    },
  },
  {
    stepNumber: 2,
    title: "Claude Code でバグを報告する",
    description: "準備した情報を使って、AI にバグを正確に報告します。",
    code: `【具体的なバグ報告例】

以下の React コンポーネントでバグが発生しています。修正してください。

【症状】
ユーザーが /profile ページにアクセスすると、
"TypeError: Cannot read properties of undefined (reading 'email')"
が表示される

【エラーメッセージ】
TypeError: Cannot read properties of undefined (reading 'email')
  at ProfileCard (app/profile/page.tsx:34:15)
  at processQueue (scheduler.development.js:216:1)

【該当コード】
// app/profile/page.tsx, 34行目
const email = user.email  // <-- ここでエラー

【背景】
useEffect で API からユーザー情報を取得している。
セッションはある（useSession() は user オブジェクトを返す）

【再現手順】
1. ログイン
2. /profile にアクセス
3. ページロード時にエラー発生

【推測】
user オブジェクトが undefined になっている。
API の遅延ローディング中に undefined が返されている可能性？`,
    codeLanguage: "plaintext",
    callout: {
      type: "tip",
      message: "「再現手順」と「推測」を含めることで、AI がより的確に原因を特定できます。",
    },
  },
  {
    stepNumber: 3,
    title: "AI の提案を確認し、段階的に修正",
    description: "AI が提案した修正を確認し、理解してから実装します。",
    code: `【AI の提案例】

"user が undefined の場合、レンダリング前に
ローディング状態をチェックする必要があります。
以下のように修正してください：

const { data: session, status } = useSession()

if (status === 'loading') {
  return <div>Loading...</div>
}

if (!session?.user) {
  return <div>Not authenticated</div>
}

const email = session.user.email"

【修正の理解】
1. useSession() は status を返す
2. status === 'loading' の間は wait
3. session.user が確実に存在してからアクセス

【質問する場合】
"なぜ status を確認する必要があるのですか？
useEffect で useCallback を使っていないのに、
なぜ loading 状態が発生するのですか？"`,
    codeLanguage: "plaintext",
  },
  {
    stepNumber: 4,
    title: "ブラウザの開発者ツールでデバッグ",
    description: "console.log やブレークポイントを使ってさらに詳しく調査します。",
    code: `【console.log でバグを調査】

修正前に、まずは状態を確認する log を入れる：

export default function ProfilePage() {
  const { data: session, status } = useSession()

  console.log('Status:', status)
  console.log('Session:', session)
  console.log('User:', session?.user)

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  // ここまで来たら、session.user は確実に存在
  const email = session.user.email
  console.log('Email:', email)

  return (
    <div>
      <h1>{email}</h1>
    </div>
  )
}

【ブラウザで F12 → Console タブで確認】
出力順序：
1. Status: loading
2. Session: null
3. User: undefined
4. (ページが再レンダリング)
5. Status: authenticated
6. Session: { ... }
7. User: { ... }
8. Email: user@example.com

このログから、最初は loading で値が undefined だと確認できる。`,
    codeLanguage: "typescript",
    callout: {
      type: "warning",
      message: "本番環境では console.log を削除忘れずに。Cursor の「検索と置換」で一括削除できます。",
    },
  },
  {
    stepNumber: 5,
    title: "修正前後で動作を比較",
    description: "修正が正しく機能しているか、実際に動作確認します。",
    code: `【修正前】
const email = session.user.email
// → TypeError

【修正後】
const email = session?.user?.email
// または
if (session?.user?.email) {
  // 安全にアクセス
}

【動作確認の手順】
1. 修正後のコードを保存
2. ブラウザが自動リロード（HMR）
3. /profile にアクセス
4. エラーが出ないか確認
5. ユーザーメールが表示されているか確認

【成功の兆候】
✓ コンソールにエラーが出ない
✓ "Loading..." → ユーザー情報へ遷移
✓ メールアドレスが正しく表示される`,
    codeLanguage: "plaintext",
  },
  {
    stepNumber: 6,
    title: "バグの根本原因を AI に聞く",
    description: "なぜこのバグが発生したのか、根本的な理由を理解します。",
    code: `【根本原因の理解】

修正が完了したら、AI に聞く：

"このバグはなぜ発生したのですか？

修正内容：
- status === 'loading' の確認を追加
- session?.user?.email で optional chaining を使用

理由：
1. useSession() はデータ取得中に status='loading', session=null を返す
2. このタイミングでコンポーネントが初期レンダリングされた
3. session が null だと session.user にアクセスできない

【同じ問題が他の場所で発生する可能性】
"このパターンは他にありますか？
例えば、他の API 呼び出しでも同じ issue が
発生する可能性があります。
チェックすべき場所を教えてください。"`,
    codeLanguage: "plaintext",
  },
  {
    stepNumber: 7,
    title: "テストコードを追加",
    description: "同じバグが再発しないよう、テストコードを追加します。",
    code: `# Jest と React Testing Library でテスト作成

npm install -D @testing-library/react @testing-library/jest-dom

【テストコード例】

import { render, screen } from '@testing-library/react'
import { useSession } from 'next-auth/react'
import ProfilePage from '@/app/profile/page'

// useSession をモック
jest.mock('next-auth/react')

describe('ProfilePage', () => {
  it('should show loading state when session is loading', () => {
    ;(useSession as jest.Mock).mockReturnValue({
      data: null,
      status: 'loading'
    })

    render(<ProfilePage />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('should display user email when authenticated', () => {
    ;(useSession as jest.Mock).mockReturnValue({
      data: { user: { email: 'test@example.com' } },
      status: 'authenticated'
    })

    render(<ProfilePage />)
    expect(screen.getByText('test@example.com')).toBeInTheDocument()
  })

  it('should not crash when session is null', () => {
    ;(useSession as jest.Mock).mockReturnValue({
      data: null,
      status: 'authenticated'
    })

    render(<ProfilePage />)
    // クラッシュしなければ OK
    expect(screen.getByText('Not authenticated')).toBeInTheDocument()
  })
})

# テスト実行
npm test

【テスト実行結果】
PASS  app/profile/page.test.tsx
  ProfilePage
    ✓ should show loading state when session is loading
    ✓ should display user email when authenticated
    ✓ should not crash when session is null

Test Suites: 1 passed, 1 total
Tests: 3 passed, 3 total`,
    codeLanguage: "typescript",
    callout: {
      type: "info",
      message: "テストを先に書くと（TDD）、バグを事前に検出できます。",
    },
  },
  {
    stepNumber: 8,
    title: "バグ修正を Git コミット",
    description: "修正内容を Git に記録し、変更を保存します。",
    code: `# 修正ファイルを確認
git status

# 修正内容の詳細を確認
git diff app/profile/page.tsx

# ステージに追加
git add app/profile/page.tsx
git add app/profile/page.test.tsx

# 詳細なコミットメッセージで記録
git commit -m "fix: handle undefined session in ProfilePage

- Add loading state check before accessing session.user
- Use optional chaining (?.) for safe property access
- Add comprehensive test suite for ProfilePage
- Fixes #42: TypeError when loading profile page

Test cases:
- Loading state is shown during data fetch
- User email is displayed when authenticated
- No crash when session is null"

# リモートにプッシュ
git push origin fix/profile-page-error`,
    codeLanguage: "bash",
  },
  {
    stepNumber: 9,
    title: "似たようなバグを予防的に修正",
    description: "同じパターンのバグが他の場所にないか、AI に調査してもらいます。",
    code: `【予防的な修正】

修正を完了したら、AI に聞く：

"同じパターン（useSession() で undefined になる）が
他の部分にないか調査してください。

チェック対象：
1. 全ページで useSession() を使用している個所
2. useSession() の結果にすぐアクセスしている個所
3. optional chaining を使っていない個所

具体的なコマンド：
grep -r "useSession" app/

各ファイルで「loading」チェックがあるか確認してください。
もしなければ、同じバグが発生する可能性があります。"

【修正テンプレート】

"以下のファイルでも同じパターンが見つかりました：
1. app/dashboard/page.tsx: line 45
2. app/settings/page.tsx: line 32

これらも修正してください。
修正内容：
- if (status === 'loading') return <Loading />
- session?.user?.email で optional chaining を使用"`,
    codeLanguage: "plaintext",
  },
  {
    stepNumber: 10,
    title: "バグ修正ワークフローの記録",
    description: "今回のバグ修正プロセスを記録し、今後の参考にします。",
    code: `【バグ修正ワークフロー記録】

## バグ ID: #42
## タイトル: TypeError when loading profile page
## 優先度: High
## 解決時間: 30分

### 原因
useSession() が loading 中に null を返すが、
それをチェックせず session.user にアクセスしていた。

### 解決方法
1. status === 'loading' で待機
2. session?.user?.email で optional chaining
3. テスト追加で再発防止

### パターン認識
このバグは非同期データ取得全般に適用可能：
- API 呼び出し
- データベースクエリ
- サードパーティサービス連携

### 予防策
- コンポーネント作成時に必ず loading/error 状態を実装
- テストで null/undefined ケースをカバー
- Linter ルール設定（eslint-plugin-react-hooks）

【ドキュメント例】

// ✗ 悪い例（バグ的）
const email = session.user.email

// ✓ 良い例（推奨）
const { data: session, status } = useSession()

if (status === 'loading') {
  return <LoadingSpinner />
}

if (!session?.user?.email) {
  return <ErrorMessage />
}

const email = session.user.email`,
    codeLanguage: "plaintext",
    callout: {
      type: "tip",
      message: "バグ修正のパターンを記録すると、チーム全体で同じ間違いを防げます。",
    },
  },
]

export default function BugFixWorkflowTutorialPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-3">バグ修正ワークフローチュートリアル</h1>
        <p className="text-lg text-muted-foreground">
          Claude Code と Cursor を使った効率的なバグ修正フローを習得します。
          エラー分析、デバッグテクニック、テスト追加を実例で学び、
          本番環境でのバグ修正を自信を持ってこなせるようになります。
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
              <CardTitle>1〜2 時間</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              実例を交えながら、バグ修正の全フローを習得します。
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-muted-foreground">難易度</span>
              </div>
              <CardTitle>⭐⭐ 初中級</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              JavaScript/TypeScript と React の基礎知識があれば OK。
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Rocket className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-muted-foreground">学べること</span>
              </div>
              <CardTitle>実践的なデバッグ</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              エラー報告、デバッグ手法、テスト、予防策。
            </CardContent>
          </Card>
        </div>
      </section>

      <Callout type="info" title="前提条件">
        <ul className="list-disc list-inside space-y-1">
          <li>Node.js と npm がインストール済み</li>
          <li>JavaScript/TypeScript の基礎知識</li>
          <li>React の基本的な理解</li>
          <li>ブラウザの開発者ツールの操作方法</li>
          <li>Claude Code / Cursor がインストール済み</li>
        </ul>
      </Callout>

      {/* このチュートリアルで学べること */}
      <section>
        <h2 className="text-2xl font-bold mb-6">このチュートリアルで学べること</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Bug className="h-5 w-5" />
                エラーメッセージの読み方
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>TypeError、ReferenceError など、エラーメッセージから原因を特定するコツを学びます。</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Zap className="h-5 w-5" />
                効果的なバグ報告
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>AI に正確にバグを説明し、素早く修正を得るためのプロンプト技法。</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">デバッグテクニック</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>console.log、ブレークポイント、Chrome DevTools を使った効率的なデバッグ方法。</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">テストと予防</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>バグ修正後、同じバグが再発しないようなテストと予防策の実装。</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ステップバイステップ */}
      <section>
        <h2 className="text-2xl font-bold mb-6">ステップバイステップガイド</h2>
        <StepByStep steps={steps} />
      </section>

      {/* デバッグテクニック詳細 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">デバッグテクニック詳細</h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">1. console.log による調査</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              <p className="text-muted-foreground">変数の値を確認する基本的かつ最も効果的な方法。</p>
              <code className="block bg-muted p-3 rounded text-xs font-mono">
{`// 変数の内容を確認
console.log('user:', user)
console.log('typeof user:', typeof user)

// 条件分岐を確認
if (condition) {
  console.log('条件が true に入りました')
}

// リストの要素を確認
console.log('users array:', users)
console.table(users)  // テーブル形式で見やすく

// 実行順序を確認
console.log('ステップ 1')
doSomething()
console.log('ステップ 2')`}
              </code>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">2. ブレークポイントの設定</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              <p className="text-muted-foreground">ブラウザの開発者ツール（DevTools）を使って、コード実行を停止して調査。</p>
              <code className="block bg-muted p-3 rounded text-xs font-mono">
{`【ブレークポイント設定手順】
1. ブラウザで F12 キーを押す
2. Sources タブを開く
3. 調査したいファイルを開く
4. 行番号をクリックしてブレークポイントを設定
5. ページをリロード
6. コード実行が停止し、変数の値を確認可能

【ステップ実行】
- F10: 次の行に進む
- F11: 関数内に進む
- Shift+F11: 関数から抜ける`}
              </code>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">3. Chrome DevTools の活用</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              <p className="text-muted-foreground">検査、ネットワーク、パフォーマンスなど、多機能なデバッグツール。</p>
              <code className="block bg-muted p-3 rounded text-xs font-mono">
{`【Elements タブ】
- DOM 構造の確認
- CSS スタイルの確認・編集
- イベントリスナーの確認

【Console タブ】
- エラーメッセージの確認
- 変数の値を確認（コンソールに打ち込み）
- API レスポンスの確認

【Network タブ】
- API リクエスト/レスポンス確認
- ステータスコード確認（200, 404, 500 など）
- レスポンス時間の確認

【Performance タブ】
- 処理の遅い部分を特定
- 不要な再レンダリング検出`}
              </code>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">4. React DevTools</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              <p className="text-muted-foreground">React 専用の拡張機能で、コンポーネント状態を調査。</p>
              <code className="block bg-muted p-3 rounded text-xs font-mono">
{`【React DevTools のインストール】
Chrome: React Developer Tools 拡張をインストール

【使い方】
1. DevTools を開く
2. Components タブで、調査したいコンポーネントをクリック
3. 右側で props と state を確認
4. props/state を編集して、即座に UI 変化を確認

【Hooks の確認】
- useState の値
- useEffect の依存配列
- useContext の値
- カスタムフックの状態`}
              </code>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* よくあるバグパターン */}
      <section>
        <h2 className="text-2xl font-bold mb-6">よくあるバグパターンと修正方法</h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">1. null/undefined へのアクセス</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <code className="block bg-muted p-3 rounded text-xs font-mono mb-2">
{`// ✗ エラー
const email = user.email

// ✓ 修正 1: 条件チェック
if (user && user.email) {
  const email = user.email
}

// ✓ 修正 2: Optional chaining
const email = user?.email

// ✓ 修正 3: Nullish coalescing
const email = user?.email ?? 'no-email@example.com'`}
              </code>
              <p>原因: API 読み込み中、フェッチエラー、初期化漏れなど。</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">2. 非同期処理の順序エラー</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <code className="block bg-muted p-3 rounded text-xs font-mono mb-2">
{`// ✗ エラー: データ取得前にレンダリング
const [data, setData] = useState([])
return <div>{data[0].name}</div>  // undefined

// ✓ 修正: loading チェック
const [data, setData] = useState([])
const [loading, setLoading] = useState(true)

if (loading) return <div>Loading...</div>
return <div>{data[0].name}</div>`}
              </code>
              <p>原因: useEffect の完了待たずにレンダリング。</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">3. 配列・オブジェクトの操作エラー</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <code className="block bg-muted p-3 rounded text-xs font-mono mb-2">
{`// ✗ エラー: 直接操作（ミューテーション）
items.push(newItem)  // React では状態更新されない

// ✓ 修正: 新しい配列を作成
setItems([...items, newItem])
setItems(items.concat(newItem))
setItems(items => [...items, newItem])`}
              </code>
              <p>原因: React の不変性原則を破ってミューテーション。</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">4. イベントハンドラのバインディング</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <code className="block bg-muted p-3 rounded text-xs font-mono mb-2">
{`// ✗ エラー: this が undefined
class Component {
  handleClick() { console.log(this) }  // undefined
  render() {
    return <button onClick={this.handleClick}>Click</button>
  }
}

// ✓ 修正 1: アロー関数
<button onClick={() => this.handleClick()}>

// ✓ 修正 2: bind
<button onClick={this.handleClick.bind(this)}>

// ✓ 修正 3: クラスフィールド
handleClick = () => { ... }`}
              </code>
              <p>原因: this のコンテキスト喪失。</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* バグ修正のチェックリスト */}
      <section>
        <h2 className="text-2xl font-bold mb-6">バグ修正完了チェックリスト</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <input type="checkbox" id="check1" className="mt-1" />
                <label htmlFor="check1" className="text-sm cursor-pointer">
                  エラーメッセージを理解し、原因を特定した
                </label>
              </div>
              <div className="flex items-start gap-3">
                <input type="checkbox" id="check2" className="mt-1" />
                <label htmlFor="check2" className="text-sm cursor-pointer">
                  console.log または DevTools でデバッグし、状態を確認した
                </label>
              </div>
              <div className="flex items-start gap-3">
                <input type="checkbox" id="check3" className="mt-1" />
                <label htmlFor="check3" className="text-sm cursor-pointer">
                  AI に正確にバグを報告し、修正案を得た
                </label>
              </div>
              <div className="flex items-start gap-3">
                <input type="checkbox" id="check4" className="mt-1" />
                <label htmlFor="check4" className="text-sm cursor-pointer">
                  修正後、エラーが出なくなったことを確認した
                </label>
              </div>
              <div className="flex items-start gap-3">
                <input type="checkbox" id="check5" className="mt-1" />
                <label htmlFor="check5" className="text-sm cursor-pointer">
                  テストコードを追加し、同じバグ再発を防止した
                </label>
              </div>
              <div className="flex items-start gap-3">
                <input type="checkbox" id="check6" className="mt-1" />
                <label htmlFor="check6" className="text-sm cursor-pointer">
                  同じパターンのバグが他の場所にないか確認した
                </label>
              </div>
              <div className="flex items-start gap-3">
                <input type="checkbox" id="check7" className="mt-1" />
                <label htmlFor="check7" className="text-sm cursor-pointer">
                  修正内容を Git コミットした
                </label>
              </div>
              <div className="flex items-start gap-3">
                <input type="checkbox" id="check8" className="mt-1" />
                <label htmlFor="check8" className="text-sm cursor-pointer">
                  console.log や debug コードを削除した
                </label>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 実践例 */}
      <section>
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30 border-yellow-200 dark:border-yellow-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              実例：実際のバグ修正例
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm mb-2">バグ: 「ユーザーリスト表示時にクラッシュ」</h4>
              <code className="block bg-white dark:bg-black p-3 rounded text-xs font-mono mb-2 overflow-x-auto">
{`エラー: Cannot read properties of undefined (reading 'map')
  at UserList (app/users/page.tsx:28:5)`}
              </code>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">原因分析</h4>
              <code className="block bg-white dark:bg-black p-3 rounded text-xs font-mono mb-2 overflow-x-auto">
{`// 28 行目
{users.map(user => (  // users が undefined
  <div key={user.id}>{user.name}</div>
))}`}
              </code>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">修正</h4>
              <code className="block bg-white dark:bg-black p-3 rounded text-xs font-mono mb-2 overflow-x-auto">
{`const [users, setUsers] = useState([])
const [loading, setLoading] = useState(true)

useEffect(() => {
  fetchUsers().then(data => {
    setUsers(data)
    setLoading(false)
  })
}, [])

if (loading) return <div>Loading...</div>
if (!users?.length) return <div>No users found</div>

return (
  <div>
    {users.map(user => (
      <div key={user.id}>{user.name}</div>
    ))}
  </div>
)`}
              </code>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">テスト追加</h4>
              <code className="block bg-white dark:bg-black p-3 rounded text-xs font-mono text-xs overflow-x-auto">
{`it('should show loading then users list', async () => {
  render(<UserList />)

  // 最初は Loading
  expect(screen.getByText('Loading...')).toBeInTheDocument()

  // フェッチ完了後、ユーザーが表示される
  await waitFor(() => {
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })
})`}
              </code>
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
              <CardTitle className="text-lg">関連スキルを習得</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                バグ修正スキルをさらに向上させましょう：
              </p>
              <ul className="space-y-2 text-sm list-disc list-inside text-muted-foreground">
                <li>テスト駆動開発（TDD）</li>
                <li>ユニットテスト・統合テスト</li>
                <li>パフォーマンスデバッグ</li>
                <li>ネットワーク問題の調査</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">他のチュートリアル</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                関連するチュートリアルで実践的スキルを習得：
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/tutorials/nextjs-auth" className="text-primary hover:underline">
                    Next.js 認証実装チュートリアル
                  </Link>
                </li>
                <li>
                  <Link href="/tutorials/refactoring" className="text-primary hover:underline">
                    リファクタリング実践チュートリアル
                  </Link>
                </li>
                <li>
                  <Link href="/tutorials/first-30-minutes" className="text-primary hover:underline">
                    30分チュートリアル（基礎）
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
              バグ修正ワークフローについてのフィードバックをお待ちしています。
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
