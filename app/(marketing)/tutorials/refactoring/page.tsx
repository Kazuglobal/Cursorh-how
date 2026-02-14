import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Callout } from "@/components/content/callout"
import { StepByStep } from "@/components/content/step-by-step"
import { Clock, Star, Rocket, RefreshCw, Zap } from "lucide-react"
import type { SetupStep } from "@/types/tools"

export const metadata: Metadata = {
  title: "リファクタリング実践チュートリアル - Claude Codeでコード品質を向上",
  description: "Claude CodeとCursorを使ってレガシーコードをモダンに改善。TypeScript化、関数分割、テスト追加を実例で学ぶ。",
}

const steps: SetupStep[] = [
  {
    stepNumber: 1,
    title: "リファクタリング対象コードの分析",
    description: "改善が必要なコードを特定し、AI に分析してもらいます。",
    code: `【リファクタリング対象の見極め】

以下のコードを確認して、
改善点を指摘してください：

// components/UserProfile.js（古いコード）
export function UserProfile({ userId }) {
  const [user, setUser] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    fetch('/api/users/' + userId)
      .then(res => res.json())
      .then(data => {
        setUser(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err)
        setLoading(false)
      })
  }, [userId])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!user) return <div>User not found</div>

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <p>{user.bio}</p>
      <button onClick={() => {
        fetch('/api/users/' + userId, {
          method: 'PUT',
          body: JSON.stringify({ name: user.name }),
          headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(() => alert('Updated!'))
      }}>Update</button>
    </div>
  )
}

【AI の分析例】

"改善点：

1. Type safety（型安全性）がない
   - TypeScript を使用すべき
   - props の型を定義する

2. コードが長すぎる（800 行超える目前）
   - ロジックとビューを分離
   - カスタムフック化

3. エラーハンドリングが不十分
   - ネットワークエラー詳細を記録していない
   - ユーザーへの明確なエラーメッセージなし

4. API 呼び出しが重複している
   - fetch 部分を共通ユーティリティに

5. テストが不可能な構造
   - ロジックがコンポーネントに密結合"`,
    codeLanguage: "plaintext",
    callout: {
      type: "info",
      message: "改善前にコードをコピーして Git コミットしておくと、差分がわかりやすくなります。",
    },
  },
  {
    stepNumber: 2,
    title: "リファクタリング計画の作成",
    description: "段階的なリファクタリング計画を AI に立てさせます。",
    code: `【リファクタリング計画のプロンプト】

上記のコードを改善するための、
段階的なリファクタリング計画を提案してください。

条件：
1. 各段階で機能は変わらない（回帰なし）
2. 段階ごとにテストが必要
3. TypeScript 化
4. 実装時間の見積もり
5. 各段階での優先順位

【AI の提案例】

"段階的リファクタリング計画：

【Phase 1: TypeScript 化】（30分）
- UserProfile.js → UserProfile.tsx
- Props, State の型定義
- React.FC を使用

実装内容：
interface UserProfileProps {
  userId: string
}

interface User {
  id: string
  name: string
  email: string
  bio: string
}

テスト：
- プロパティの型チェック
- 必須フィールド確認

【Phase 2: カスタムフック化】（45分）
- useUser フックを作成
- useUpdateUser フック作成
- コンポーネント側はビューのみに

実装内容：
hook/useUser.ts
hook/useUpdateUser.ts

メリット：
- ロジック再利用可能
- テストが簡単に

【Phase 3: API レイヤー分離】（30分）
- api/userService.ts 作成
- API 呼び出しを一元管理
- エラーハンドリング改善

実装内容：
services/userService.ts
- fetchUser(userId)
- updateUser(userId, data)
- proper error handling

【Phase 4: テスト追加】（60分）
- ユニットテスト（ロジック）
- コンポーネントテスト（UI）
- E2E テスト（統合）

テストカバレッジ：80% 以上を目指す

【全体所要時間】約 3 時間"`,
    codeLanguage: "plaintext",
    callout: {
      type: "tip",
      message: "大きなリファクタリングは「小分けにする」が成功のコツです。",
    },
  },
  {
    stepNumber: 3,
    title: "Phase 1: TypeScript 化",
    description: "JavaScript をTypeScript に変換し、型安全性を追加します。",
    code: `// TypeScript 化のプロンプト

"UserProfile.js を TypeScript に変換してください。

要件：
1. 型定義ファイル (.ts/.tsx) に変更
2. Props, State, API レスポンスの型を定義
3. strict mode で動作（tsconfig.json: strict: true）
4. ESLint で型チェック有効化

以下の型を定義：
- UserProfileProps
- User（型）
- ApiError
- FetchOptions

既存の機能は変わらないこと。"

【AI が生成するコード例】

// types/user.ts
export interface User {
  id: string
  name: string
  email: string
  bio: string
  createdAt: string
  updatedAt: string
}

export interface UserProfileProps {
  userId: string
}

export interface ApiError {
  message: string
  code: string
  status: number
}

// components/UserProfile.tsx
import React, { useState, useEffect } from 'react'
import type { User, UserProfileProps, ApiError } from '@/types/user'

export const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<ApiError | null>(null)

  // REST OF CODE...
}`,
    codeLanguage: "typescript",
    callout: {
      type: "info",
      message: "TypeScript 化により、IDE のオートコンプリートが効き、開発効率が大幅に向上します。",
    },
  },
  {
    stepNumber: 4,
    title: "Phase 2: カスタムフック化",
    description: "ロジックをカスタムフックに抽出し、コンポーネントを簡潔にします。",
    code: `[カスタムフック化のプロンプト]

UserProfileコンポーネントから以下を抽出してください：

1. useUserフック
   - ユーザーデータ取得ロジック
   - loading, error, user 状態管理
   - キャッシング機能

2. useUpdateUserフック
   - ユーザー更新ロジック
   - optimistic update
   - エラーロールバック

【AI が生成するコード例】

// hooks/useUser.ts
import { useState, useEffect } from 'react'
import type { User, ApiError } from '@/types/user'

export function useUser(userId: string) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<ApiError | null>(null)

  useEffect(() => {
    let mounted = true

    const fetchUser = async () => {
      try {
        const response = await fetch(\`/api/users/\${userId}\`)
        if (!response.ok) throw new Error('Failed to fetch')

        const data: User = await response.json()
        if (mounted) setUser(data)
      } catch (err) {
        if (mounted) setError(err as ApiError)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchUser()
    return () => { mounted = false }
  }, [userId])

  return { user, loading, error }
}

// hooks/useUpdateUser.ts
import { useState } from 'react'
import type { User, ApiError } from '@/types/user'

export function useUpdateUser(userId: string) {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)

  const updateUser = async (updates: Partial<User>) => {
    setUpdating(true)
    setError(null)

    try {
      const response = await fetch(\`/api/users/\${userId}\`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      })

      if (!response.ok) throw new Error('Failed to update')
      const updatedUser: User = await response.json()
      return updatedUser
    } catch (err) {
      setError(err as ApiError)
      throw err
    } finally {
      setUpdating(false)
    }
  }

  return { updateUser, updating, error }
}

// components/UserProfile.tsx（簡潔に）
import { useUser } from '@/hooks/useUser'
import { useUpdateUser } from '@/hooks/useUpdateUser'
import type { UserProfileProps } from '@/types/user'

export const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const { user, loading, error } = useUser(userId)
  const { updateUser, updating } = useUpdateUser(userId)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!user) return <div>User not found</div>

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <p>{user.bio}</p>
      <button
        onClick={() => updateUser({ name: user.name })}
        disabled={updating}
      >
        {updating ? 'Updating...' : 'Update'}
      </button>
    </div>
  )
}`,
    codeLanguage: "typescript",
    callout: {
      type: "tip",
      message: "フックの抽出により、ロジックが再利用可能になり、テストも書きやすくなります。",
    },
  },
  {
    stepNumber: 5,
    title: "Phase 3: API レイヤー分離",
    description: "API 呼び出しをサービスレイヤーに統一し、保守性を向上させます。",
    code: `【API レイヤー分離のプロンプト】

fetch 呼び出しをサービスレイヤーに集約してください。

要件：
1. src/services/userService.ts を作成
2. エラーハンドリング統一
3. API 基底 URL を設定ファイルから読み込み
4. リクエスト/レスポンスのログ出力
5. タイムアウト処理
6. リトライロジック（オプション）

【AI が生成するコード例】

// services/userService.ts
import type { User, ApiError } from '@/types/user'

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api'
const TIMEOUT = 5000

class ApiClient {
  private async request<T>(
    url: string,
    options?: RequestInit
  ): Promise<T> {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), TIMEOUT)

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      })

      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`)
      }

      return await response.json()
    } catch (error) {
      console.error('API request failed:', { url, error })
      throw this.handleError(error)
    } finally {
      clearTimeout(timeout)
    }
  }

  private handleError(error: unknown): ApiError {
    if (error instanceof TypeError) {
      return {
        message: 'Network error. Check your connection.',
        code: 'NETWORK_ERROR',
        status: 0
      }
    }

    return {
      message: error instanceof Error ? error.message : 'Unknown error',
      code: 'API_ERROR',
      status: 500
    }
  }

  async getUser(userId: string): Promise<User> {
    return this.request<User>(\`\${API_BASE_URL}/users/\${userId}\`)
  }

  async updateUser(userId: string, updates: Partial<User>): Promise<User> {
    return this.request<User>(\`\${API_BASE_URL}/users/\${userId}\`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    })
  }
}

export const userService = new ApiClient()`,
    codeLanguage: "typescript",
    callout: {
      type: "info",
      message: "API レイヤー分離により、複数のコンポーネントから同じサービスが使用でき、保守が容易になります。",
    },
  },
  {
    stepNumber: 6,
    title: "Phase 4: テスト追加",
    description: "ユニット、コンポーネント、E2E テストを追加し、品質を確保します。",
    code: `【テスト追加のプロンプト】

以下についてテストを作成してください：

1. useUser フックのテスト
2. useUpdateUser フックのテスト
3. UserProfile コンポーネントのテスト
4. userService のテスト

条件：
- Jest + React Testing Library を使用
- テストカバレッジ 80% 以上
- モック API の設定
- エッジケース（エラー、タイムアウト）をカバー

【AI が生成するテスト例】

// hooks/__tests__/useUser.test.ts
import { renderHook, waitFor } from '@testing-library/react'
import { useUser } from '../useUser'

describe('useUser', () => {
  it('should fetch user data', async () => {
    const { result } = renderHook(() => useUser('123'))

    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.user).toEqual(
      expect.objectContaining({ id: '123' })
    )
  })

  it('should handle fetch error', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Network error'))
    )

    const { result } = renderHook(() => useUser('123'))

    await waitFor(() => {
      expect(result.current.error).toBeDefined()
    })

    expect(result.current.error?.code).toBe('NETWORK_ERROR')
  })
})

// components/__tests__/UserProfile.test.tsx
import { render, screen } from '@testing-library/react'
import { UserProfile } from '../UserProfile'

jest.mock('@/hooks/useUser')
jest.mock('@/hooks/useUpdateUser')

describe('UserProfile', () => {
  it('should show loading state', () => {
    const mockUseUser = useUser as jest.Mock
    mockUseUser.mockReturnValue({
      user: null,
      loading: true,
      error: null
    })

    render(<UserProfile userId="123" />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('should display user info when loaded', () => {
    const mockUseUser = useUser as jest.Mock
    mockUseUser.mockReturnValue({
      user: {
        id: '123',
        name: 'John Doe',
        email: 'john@example.com',
        bio: 'Test bio'
      },
      loading: false,
      error: null
    })

    render(<UserProfile userId="123" />)
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })
})

# テスト実行
npm test -- --coverage

# 出力例
PASS  hooks/__tests__/useUser.test.ts
PASS  components/__tests__/UserProfile.test.tsx
PASS  services/__tests__/userService.test.ts

Test Suites: 3 passed, 3 total
Tests: 15 passed, 15 total
Coverage: 87%`,
    codeLanguage: "typescript",
    callout: {
      type: "info",
      message: "テスト駆動開発（TDD）なら、テストを先に書くと設計が改善されます。",
    },
  },
  {
    stepNumber: 7,
    title: "リファクタリング完了の検証",
    description: "すべての段階が完了し、品質が向上したことを確認します。",
    code: `【リファクタリング完了チェック】

$ npm run test
✓ All tests pass
✓ Coverage: 87%

$ npm run type-check
✓ No TypeScript errors

$ npm run lint
✓ No linting errors

$ npm run build
✓ Build successful

【Before vs After】

【変更前】
- ファイル: UserProfile.js (120 lines)
- テスト: なし
- 型安全性: なし
- API 呼び出し: 重複
- テスト困難

【変更後】
- UserProfile.tsx: 40 lines（ビューのみ）
- useUser.ts: 35 lines（ロジック）
- useUpdateUser.ts: 30 lines（ロジック）
- userService.ts: 50 lines（API）
- テスト: 15 tests（coverage 87%）
- 型安全性: ✓ 完全
- API 呼び出し: 一元管理
- テスト容易：✓ テスト可能

【パフォーマンス指標】
- バンドルサイズ: -2KB（ロジック分離による最適化）
- First Contentful Paint: -50ms（不要なレンダリング削減）
- Type Safety Score: 100%

【再利用性の向上】
useUser フックを別のコンポーネントでも利用可能
- userService を複数のフックで共有可能`,
    codeLanguage: "plaintext",
  },
  {
    stepNumber: 8,
    title: "Git コミットと PR 作成",
    description: "各段階をコミットし、変更を記録します。",
    code: `# Phase 1: TypeScript 化
git add .
git commit -m "refactor: migrate UserProfile to TypeScript

- Add type definitions for User, UserProfileProps, ApiError
- Update components and hooks with proper types
- Enable strict mode in tsconfig
- All tests pass"

# Phase 2: カスタムフック化
git commit -m "refactor: extract hooks from UserProfile

- Create useUser custom hook
- Create useUpdateUser custom hook
- Simplify UserProfile component to view-only
- Improve testability and reusability"

# Phase 3: API レイヤー分離
git commit -m "refactor: create userService API layer

- Extract API calls into userService
- Add error handling and logging
- Implement request timeout and retry logic
- Single source of truth for API calls"

# Phase 4: テスト追加
git commit -m "test: add comprehensive test suite

- Add useUser and useUpdateUser hook tests
- Add UserProfile component tests
- Add userService integration tests
- Achieve 87% code coverage

Closes #1 (リファクタリング完了)"

# PR 作成
git push origin refactor/user-profile

# GitHub で PR を作成
gh pr create --title "Refactor: Modernize UserProfile component" \\
  --body "
## Summary
Large-scale refactoring of UserProfile component to improve code quality.

## Changes
- TypeScript migration
- Custom hooks extraction
- API layer separation
- Comprehensive test suite (87% coverage)

## Benefits
- Improved type safety
- Better code reusability
- Improved testability
- 50ms faster initial render
- -2KB bundle size reduction

## Testing
All tests pass (15 tests)
Code coverage: 87%

## Checklist
- [x] Tests pass
- [x] Type checking passes
- [x] Linting passes
- [x] Build succeeds
- [x] No console errors
"`,
    codeLanguage: "bash",
  },
  {
    stepNumber: 9,
    title: "レビュー指摘への対応",
    description: "AI にコードレビュー指摘を受けて、さらに改善します。",
    code: `【コードレビュープロンプト】

以下のリファクタリング完了コードを
セキュリティ・パフォーマンス・保守性の観点から
レビューしてください。

レビュー対象：
- hooks/useUser.ts
- hooks/useUpdateUser.ts
- services/userService.ts
- components/UserProfile.tsx

改善提案があれば、コード例を含めて提案してください。

【AI のレビュー例】

"1. パフォーマンス: メモ化の追加
   → useCallback で updateUser 関数を メモ化すべき

2. セキュリティ: XSS 対策
   → ユーザー入力を sanitize すべき（DOMPurify など）

3. キャッシング: クエリキャッシュの導入
   → React Query や SWR で API キャッシュを統一すべき

4. エラーハンドリング: エラーバウンダリー
   → QueryError をキャッチして UI に表示すべき"

【指摘への対応例】

const useUpdateUser = (userId: string) => {
  // ...

  // ✓ useCallback でメモ化
  const updateUser = useCallback(async (updates: Partial<User>) => {
    // ...
  }, [userId])

  return { updateUser, updating, error }
}`,
    codeLanguage: "plaintext",
  },
  {
    stepNumber: 10,
    title: "リファクタリング後の保守",
    description: "改善したコードを継続的に保つためのベストプラクティスを学びます。",
    code: `【リファクタリング後の保守】

1. 定期的なコード品質チェック
   npm run type-check  # 毎回実行
   npm run lint --fix  # Linter 自動修正
   npm run test --coverage  # テストカバレッジ確認

2. 依存関係の更新
   npm outdated  # 更新可能なパッケージを確認
   npm update   # セキュリティパッチ適用

3. Husky + lint-staged で pre-commit チェック
   npm install husky lint-staged --save-dev
   npx husky install

   # .husky/pre-commit
   #!/bin/sh
   npm run lint --fix
   npm run type-check
   npm test

4. CI/CD パイプライン
   # .github/workflows/ci.yml
   name: CI
   on: [push, pull_request]
   jobs:
     test:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - run: npm ci
         - run: npm run lint
         - run: npm run type-check
         - run: npm test -- --coverage
         - run: npm run build

【改善の記録】

変更前：UserProfile.js (120 行)
  ├── ロジック + ビューが混在
  ├── テストなし
  └── API 呼び出し重複

変更後：
  ├── UserProfile.tsx (40 行) - ビューのみ
  ├── useUser.ts (35 行) - ロジック
  ├── useUpdateUser.ts (30 行) - ロジック
  ├── userService.ts (50 行) - API
  ├── __tests__/ (3 ファイル, 15 テスト)
  └── coverage: 87%

成果：
- 型安全性: 100%
- テスト容易性: ✓ 改善
- 再利用性: ✓ 向上
- 保守性: ✓ 大幅改善`,
    codeLanguage: "plaintext",
    callout: {
      type: "info",
      message: "リファクタリング後は、品質を維持するための仕組みづくりが重要です。",
    },
  },
]

export default function RefactoringTutorialPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-3">リファクタリング実践チュートリアル</h1>
        <p className="text-lg text-muted-foreground">
          Claude Code と Cursor を使ってレガシーコードをモダンに改善します。
          JavaScript → TypeScript 化、機能分割、テスト追加を実例で学び、
          コード品質を飛躍的に向上させるテクニックを習得します。
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
              <CardTitle>3〜4 時間</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              複数のフェーズに分けて、段階的に実施します。
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-muted-foreground">難易度</span>
              </div>
              <CardTitle>⭐⭐⭐ 中上級</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              TypeScript と React の実務経験が必要。
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Rocket className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-muted-foreground">学べること</span>
              </div>
              <CardTitle>コード品質改善</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              設計改善、テスト戦略、保守性向上。
            </CardContent>
          </Card>
        </div>
      </section>

      <Callout type="info" title="前提条件">
        <ul className="list-disc list-inside space-y-1">
          <li>React と JavaScript/TypeScript の実務経験</li>
          <li>Git と GitHub の基本操作</li>
          <li>Jest と React Testing Library の基本知識</li>
          <li>既存プロジェクト（またはサンプルコード）</li>
          <li>Claude Code / Cursor がインストール済み</li>
        </ul>
      </Callout>

      {/* 学べること */}
      <section>
        <h2 className="text-2xl font-bold mb-6">このチュートリアルで学べること</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <RefreshCw className="h-5 w-5" />
                段階的リファクタリング
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>大規模な改造を小分けにして、段階的に実施する方法。各段階でテストを行い、回帰を防ぎます。</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Zap className="h-5 w-5" />
                TypeScript 化
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>JavaScript プロジェクトを TypeScript に移行し、型安全性と開発体験を向上させます。</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">関心の分離</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>ロジック、ビュー、API 呼び出しを分離し、保守性と再利用性を大幅に向上させます。</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">テスト戦略</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>ユニット、コンポーネント、統合テストを効率的に作成し、品質を確保します。</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ステップバイステップ */}
      <section>
        <h2 className="text-2xl font-bold mb-6">ステップバイステップガイド</h2>
        <StepByStep steps={steps} />
      </section>

      {/* リファクタリング後の成果 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">リファクタリングの成果</h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Before: 改善前のコード</CardTitle>
            </CardHeader>
            <CardContent>
              <code className="block bg-muted p-4 rounded text-xs overflow-x-auto font-mono">
{`// UserProfile.js（120 行）
- ロジックとビューが混在
- TypeScript なし
- テストなし
- API 呼び出しが複数個所に散らばっている
- コンポーネント内に 複雑な状態管理
- 再利用不可能
- テスト困難`}
              </code>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">After: 改善後のコード</CardTitle>
            </CardHeader>
            <CardContent>
              <code className="block bg-muted p-4 rounded text-xs overflow-x-auto font-mono">
{`// 改善後
UserProfile.tsx（40 行）
├── ビュー処理のみ
├── 完全な型安全性
└── シンプル、保守しやすい

useUser.ts（35 行）
├── ユーザー取得ロジック
└── 他のコンポーネントから再利用可能

useUpdateUser.ts（30 行）
├── ユーザー更新ロジック
└── 他のコンポーネントから再利用可能

userService.ts（50 行）
├── API 呼び出し一元管理
├── エラーハンドリング統一
└── ロギング、タイムアウト設定

__tests__/（15 テスト）
├── ユニットテスト
├── コンポーネントテスト
└── 統合テスト
├── カバレッジ 87%
└── 回帰防止`}
              </code>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* パフォーマンスと品質指標 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">改善による数値指標</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">パフォーマンス</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>バンドルサイズ削減</span>
                <span className="font-semibold text-green-600">-2 KB</span>
              </div>
              <div className="flex justify-between">
                <span>First Contentful Paint</span>
                <span className="font-semibold text-green-600">-50 ms</span>
              </div>
              <div className="flex justify-between">
                <span>不要な再レンダリング削減</span>
                <span className="font-semibold text-green-600">-30%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">コード品質</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>型安全性</span>
                <span className="font-semibold text-green-600">100%</span>
              </div>
              <div className="flex justify-between">
                <span>テストカバレッジ</span>
                <span className="font-semibold text-green-600">87%</span>
              </div>
              <div className="flex justify-between">
                <span>可読性スコア</span>
                <span className="font-semibold text-green-600">+45%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">保守性と開発効率</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>コンポーネント行数</span>
                <span className="font-semibold text-green-600">120 → 40 行</span>
              </div>
              <div className="flex justify-between">
                <span>関数の平均行数</span>
                <span className="font-semibold text-green-600">50 → 20 行</span>
              </div>
              <div className="flex justify-between">
                <span>IDE オートコンプリート</span>
                <span className="font-semibold text-green-600">有効</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">再利用性</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>カスタムフック数</span>
                <span className="font-semibold text-green-600">+2</span>
              </div>
              <div className="flex justify-between">
                <span>API サービス統一</span>
                <span className="font-semibold text-green-600">✓ 完全</span>
              </div>
              <div className="flex justify-between">
                <span>他コンポーネント再利用可</span>
                <span className="font-semibold text-green-600">✓ 可能</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* リファクタリングのコツ */}
      <section>
        <h2 className="text-2xl font-bold mb-6">リファクタリング成功のコツ</h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">1. 「小分けにする」が重要</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              大きな改造を一度にしないことが、成功の最大のコツ。各フェーズで テストして、回帰がないことを確認してから次に進みましょう。
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">2. 既存機能を変えない</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              リファクタリングは「内部改善」。ユーザーから見た動作は変わらないはずです。修正前後で同じテストが通ることを確認しましょう。
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">3. テストを先に書く（TDD）</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              リファクタリング後にテストを書くのではなく、フェーズごとにテストを先に書くと、設計がより良くなります。
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">4. Git で段階を記録</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              各フェーズでコミットすることで、「どのフェーズで何が変わったか」がわかりやすくなり、問題発生時のデバッグが容易です。
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">5. チームレビューを活用</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              大きなリファクタリングは GitHub PR でレビューしてもらい、改善点や見落としを指摘してもらうと、品質がさらに向上します。
            </CardContent>
          </Card>
        </div>
      </section>

      {/* よくある失敗と対策 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">よくある失敗と対策</h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">失敗: 一度にすべてをリファクタリング</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              対策: 必ず「小分け」にして、段階的に実施。各段階でテストを実行し、動作確認してから次に進む。
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">失敗: テストなしでリファクタリング</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              対策: テストがない場合は、まずテストを書いてから（あるいはと同時に）リファクタリングする。テストが「品質保証」の役割。
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">失敗: 計画なしで始める</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              対策: AI に計画を立ててもらい、段階的な改善内容を確認してからコードに取り掛かる。
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">失敗: 機能追加と混同</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              対策: リファクタリングは「内部改善のみ」。新機能追加は別の PR で実施する。
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
              <CardTitle className="text-lg">さらに学ぶ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                リファクタリングをマスターしたら、以下を学びましょう：
              </p>
              <ul className="space-y-2 text-sm list-disc list-inside text-muted-foreground">
                <li>デザインパターン（Factory、Observer など）</li>
                <li>SOLID 原則の実践</li>
                <li>クリーンアーキテクチャ</li>
                <li>パフォーマンス最適化</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">実践してみる</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                他のチュートリアルで実務スキルを習得：
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/tutorials/bug-fix-workflow" className="text-primary hover:underline">
                    バグ修正ワークフローチュートリアル
                  </Link>
                </li>
                <li>
                  <Link href="/tutorials/nextjs-auth" className="text-primary hover:underline">
                    Next.js 認証実装チュートリアル
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
              リファクタリングについてのフィードバックをお待ちしています。実際のコード改善事例なども聞かせていただけると嬉しいです。
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
