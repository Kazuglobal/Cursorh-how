import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Callout } from "@/components/content/callout"
import { StepByStep } from "@/components/content/step-by-step"
import { CodeBlock } from "@/components/content/code-block"
import { Smartphone, Zap, CheckCircle2, AlertCircle, TrendingUp } from "lucide-react"
import type { SetupStep } from "@/types/tools"

export const metadata: Metadata = {
  title: "モバイル開発ユースケース - React Native / Expo",
  description: "Claude Code を使ってモバイルアプリ（React Native / Expo）を効率的に開発。コンポーネント作成、API統合、ネイティブ機能実装までの完全ワークフロー。",
}

const workflowSteps: SetupStep[] = [
  {
    stepNumber: 1,
    title: "Expo プロジェクトをセットアップ",
    description: "新しいモバイルアプリプロジェクトを初期化します。",
    code: `# Expo CLI をインストール（初回のみ）
npm install -g expo-cli

# 新しいプロジェクトを作成
expo init weather-app --template

# プロジェクトディレクトリに移動
cd weather-app

# プロジェクト構造を確認
ls -la

# CLAUDE.md を作成
cat > CLAUDE.md << 'EOF'
# モバイルアプリ: 天気予報アプリ

## 技術スタック
- フレームワーク: React Native (Expo)
- 言語: TypeScript
- 状態管理: React Context + Hooks
- API: OpenWeatherMap API
- ナビゲーション: React Navigation
- UI コンポーネント: React Native Paper

## ディレクトリ構造
\`\`\`
app/
├── screens/
│   ├── HomeScreen.tsx
│   ├── DetailsScreen.tsx
│   └── SettingsScreen.tsx
├── components/
│   ├── WeatherCard.tsx
│   ├── ForecastList.tsx
│   └── LoadingSpinner.tsx
├── hooks/
│   ├── useWeather.ts
│   └── useLocation.ts
├── services/
│   ├── weather-api.ts
│   ├── location-service.ts
│   └── storage.ts
├── types/
│   └── weather.ts
├── context/
│   └── WeatherContext.tsx
└── App.tsx

## コーディング規則
- TypeScript strict mode
- 関数型コンポーネント
- Props は interface で定義
- カスタムフック化でロジック分離
- エラーハンドリング必須
- ネイティブ機能は service にカプセル化

## 主要ライブラリ
- react-native-paper: UI コンポーネント
- react-navigation: タブナビゲーション
- @react-native-async-storage: ローカルストレージ
- expo-location: GPS 機能
- axios: API クライアント
EOF`,
    codeLanguage: "bash",
    callout: {
      type: "info",
      message: "Expo を使うことで、iOS/Android の両方の開発が Xcode/Android Studio 不要で可能になります。",
    },
  },
  {
    stepNumber: 2,
    title: "必要なライブラリをインストール",
    description: "プロジェクトに必要な依存関係をインストールします。",
    code: `# 基本的なナビゲーションと UI ライブラリ
npm install @react-navigation/native @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context
npm install react-native-paper

# API とデータ管理
npm install axios zustand

# ストレージ
npm install @react-native-async-storage/async-storage

# ロケーション機能
npm install expo-location

# TypeScript（既存）
npm install --save-dev typescript

# 開発依存関係
npm install --save-dev @types/react-native`,
    codeLanguage: "bash",
    callout: {
      type: "tip",
      message: "npm install 実行後に、app.json で permissions が自動更新されます。必要に応じて手動で permissions を確認してください。",
    },
  },
  {
    stepNumber: 3,
    title: "Claude Code でコンポーネントを生成",
    description: "メインのコンポーネントを Claude Code で実装してもらいます。",
    code: `Claude Code を起動:
claude

プロンプト例:
"""
React Native（TypeScript）で天気情報を表示するコンポーネントを作成してください。

ファイル: app/components/WeatherCard.tsx

要件:
- 都市名、気温、天気状態、風速を表示
- アイコンで天気状態を視覚的に表現
- React Native Paper で Material Design に準拠
- ダークモード対応
- Props で天気データを受け取る

Props インターフェース:
\`\`\`typescript
interface Weather {
  city: string
  temp: number
  condition: string
  windSpeed: number
  humidity: number
  icon: string
}

interface WeatherCardProps {
  weather: Weather
  onRefresh?: () => void
}
\`\`\`

実装のポイント:
- ScrollView でスクロール対応
- Dimensions で画面サイズ取得（レスポンシブ）
- React Native Paper の Card と Text を使用
- タッチ可能にする（Pressable）
- テストもお願いします（Jest + @testing-library/react-native）
"""`,
    codeLanguage: "plaintext",
  },
  {
    stepNumber: 4,
    title: "API サービスを実装",
    description: "OpenWeatherMap API との連携サービスを作成します。",
    code: `Claude Code で:
"""
OpenWeatherMap API と連携するサービスを実装してください。

ファイル: app/services/weather-api.ts

要件:
- 都市名で天気情報を取得（searchByCity）
- 座標で天気情報を取得（searchByCoordinates）
- 応答形式は統一（WeatherData インターフェース）
- エラーハンドリング実装
- リトライロジック（3回まで）
- タイムアウト設定（10秒）
- API キーは環境変数から取得

実装:
- axios をベースに実装
- request interceptor でヘッダー設定
- response interceptor でエラー処理
- TypeScript で型安全
- ドキュメンテーションコメント付き

テストも作成してください（モック API）。
"""`,
    codeLanguage: "plaintext",
    callout: {
      type: "warning",
      message: "API キーは絶対にソースコードに含めないでください。.env ファイルで管理し、.env.example で構造を記録します。",
    },
  },
  {
    stepNumber: 5,
    title: "カスタムフックで状態管理",
    description: "天気情報の状態管理をカスタムフックで実装します。",
    code: `Claude Code で:
"""
天気情報を管理するカスタムフックを作成してください。

ファイル: app/hooks/useWeather.ts

要件:
- useState で天気データ、ローディング、エラーを管理
- useEffect で API 呼び出し
- 都市検索機能（searchWeather）
- 更新機能（refreshWeather）
- キャッシング機能（5分以内は API 呼び出ししない）

戻り値:
\`\`\`typescript
{
  weather: Weather | null
  isLoading: boolean
  error: string | null
  searchWeather: (city: string) => Promise<void>
  refreshWeather: () => Promise<void>
  setWeather: (weather: Weather) => void
}
\`\`\`

実装:
- React Hook の依存関係を正しく設定
- クリーンアップで API リクエストをキャンセル
- 非同期処理のエラーハンドリング
- メモ化で不要な再レンダリング防止

テストも作成（useWeather.test.ts）。
"""`,
    codeLanguage: "plaintext",
  },
  {
    stepNumber: 6,
    title: "ロケーション機能を実装",
    description: "デバイスの位置情報を取得する機能を実装します。",
    code: `Claude Code で:
"""
expo-location を使ってロケーション機能を実装してください。

ファイル: app/services/location-service.ts

要件:
- デバイスのロケーションパーミッション確認
- 現在地の座標を取得（緯度・経度）
- 逆ジオコーディング（座標 → 住所）
- バックグラウンド位置更新（オプション）
- エラーハンドリング

実装:
- expo-location API を使用
- パーミッションなしの場合、フォールバック対応
- iOS/Android の両方対応
- キャッシング（再取得を5分以内は避ける）

戻り値:
\`\`\`typescript
{
  latitude: number
  longitude: number
  city?: string
  error?: string
}
\`\`\`

テストも作成（モック位置情報）。
"""`,
    codeLanguage: "plaintext",
    callout: {
      type: "info",
      message: "app.json の permissions セクションで、location パーミッションを設定してください。",
    },
  },
  {
    stepNumber: 7,
    title: "スクリーン（画面）をナビゲーション連携",
    description: "複数のスクリーンを作成し、React Navigation で連携させます。",
    code: `Claude Code で:
"""
React Navigation でタブベースのナビゲーションを実装してください。

ファイル: App.tsx

要件:
- ホーム画面：天気情報表示、検索機能
- 詳細画面：5日間の予報表示
- 設定画面：都市変更、単位変更（℃/℉）
- ボトムタブナビゲーション
- スタック ナビゲーション（詳細へ）
- React Native Paper の Theme 設定

ナビゲーション構造:
\`\`\`
BottomTab Navigator
├── Home Stack
│   ├── HomeScreen
│   └── WeatherDetailsScreen
├── Favorites Stack
│   └── FavoritesScreen
└── Settings Stack
    └── SettingsScreen
\`\`\`

実装:
- @react-navigation で設定
- ナビゲーション Props（navigation, route）を型安全に
- ダークモード対応
- スクリーン遷移アニメーション

テスト: React Navigation の画面遷移テスト。
"""`,
    codeLanguage: "plaintext",
  },
  {
    stepNumber: 8,
    title: "ローカルストレージに保存",
    description: "ユーザーの検索履歴や設定をローカルに保存します。",
    code: `Claude Code で:
"""
@react-native-async-storage を使ってデータを永続化してください。

ファイル: app/services/storage.ts

機能:
1. 検索履歴の保存・取得
2. お気に入り都市の保存・削除
3. ユーザー設定の保存（温度単位、言語）
4. 最後に見た天気情報のキャッシュ

実装:
\`\`\`typescript
// 検索履歴を保存
saveSearchHistory(city: string): Promise<void>

// 検索履歴を取得
getSearchHistory(): Promise<string[]>

// お気に入りを保存
saveFavorite(city: string): Promise<void>

// お気に入り一覧を取得
getFavorites(): Promise<string[]>

// 設定を保存
saveSettings(settings: UserSettings): Promise<void>

// 設定を取得
getSettings(): Promise<UserSettings>
\`\`\`

エラーハンドリングと JSON の serialize/deserialize も含める。
"""`,
    codeLanguage: "plaintext",
  },
  {
    stepNumber: 9,
    title: "テストを作成・実行",
    description: "ユニットテストと E2E テストを実行して品質を確保します。",
    code: `# テストを実行
npm test

# E2E テスト（Detox）の場合
npm run test:e2e

# カバレッジを確認
npm test -- --coverage

# 実機でテスト（Expo Go）
expo start

# プロンプト（Claude Code）:
"""
Detox を使った E2E テストを作成してください。

テストシナリオ:
1. ホーム画面でアプリが起動する
2. 都市名を入力して検索できる
3. 天気情報が表示される
4. 詳細画面に遷移できる
5. 設定画面で単位を変更できる
6. 変更が保存される

テストファイル: e2e/firstTest.e2e.js
"""`,
    codeLanguage: "bash",
    callout: {
      type: "tip",
      message: "expo start で QR コードが表示されます。Expo Go アプリでスキャンすると、実機でのテストが可能です。",
    },
  },
  {
    stepNumber: 10,
    title: "ビルドとデプロイ",
    description: "アプリをビルドして、App Store / Google Play にデプロイします。",
    code: `# Expo で EAS（Expo Application Services）を使ったビルド
npm install -g eas-cli

# ビルド設定を初期化
eas build:configure

# iOS ビルド
eas build --platform ios

# Android ビルド
eas build --platform android

# ローカルビルド（開発用 APK）
eas build --platform android --local

# プレビュービルド作成後のテスト
eas submit --platform ios  # App Store に提出
eas submit --platform android  # Google Play に提出

# Git コミット
git add .
git commit -m "feat: 天気予報アプリの完成

- React Native + Expo で開発
- OpenWeatherMap API 統合
- ロケーション機能実装
- ローカルストレージ対応
- React Navigation でマルチスクリーン化
- ユニット・E2E テスト実装
- iOS/Android ビルド対応"`,
    codeLanguage: "bash",
  },
]

const promptExamples = [
  {
    title: "UI コンポーネント作成プロンプト",
    problem: "複雑なモバイル UI が必要だが、レイアウトが難しい",
    prompt: `React Native Paper で、5日間の天気予報を表示する ForecastList コンポーネントを作成。

要件:
- 複数の日付カード（横スクロール）
- 各カードに日付、天気アイコン、気温を表示
- タップで詳細画面に遷移
- ダークモード対応
- アニメーション（Reanimated）

Props: \`forecasts: Forecast[], onSelectDay: (date: string) => void\`

テストも。`,
    tool: "Claude Code",
    benefit: "複雑なレイアウトが自動生成され、アニメーションも対応",
  },
  {
    title: "API 統合プロンプト",
    problem: "複数の天気 API を効率的に統合したい",
    prompt: `複数のオンライン天気 API（OpenWeatherMap、WeatherAPI、Weather.com）
を統合するアダプターパターンを実装してください。

要件:
- 各 API の異なるレスポンス形式を統一
- フォールバック機能（第1の API が失敗したら第2の API）
- キャッシング（複数 API の結果を比較）
- 型安全な実装

テストも作成（各 API のモック）。`,
    tool: "Claude Code",
    benefit: "アダプターパターンの実装が効率化される",
  },
  {
    title: "バックグラウンドタスクプロンプト",
    problem: "バックグラウンドで位置情報を更新したい",
    prompt: `expo-task-manager を使ったバックグラウンドロケーション更新を実装。

要件:
- アプリ起動時にバックグラウンドタスク登録
- 10分ごとに位置情報を取得・更新
- バッテリー消費を最小化
- iOS/Android の両方対応
- エラーハンドリング

テストも（シミュレーション）。`,
    tool: "Claude Code",
    benefit: "ネイティブの複雑なバックグラウンド処理が実装される",
  },
]

const commonPatterns = [
  {
    pattern: "スクリーンコンポーネント作成",
    steps: [
      "React Native Paper の基本コンポーネント選定",
      "SafeAreaView でセーフエリア対応",
      "ScrollView または FlatList でスクロール",
      "ローディング・エラー状態UI",
      "リフレッシュ機能（pull-to-refresh）",
    ],
  },
  {
    pattern: "カスタムフック実装",
    steps: [
      "useState で状態定義",
      "useEffect で副作用処理",
      "useCallback で関数メモ化",
      "useMemo でパフォーマンス最適化",
      "Jest でテスト作成",
    ],
  },
  {
    pattern: "ナビゲーション統合",
    steps: [
      "Bottom Tab Navigator 設定",
      "Stack Navigator で画面遷移",
      "Deep Link 対応（外部からのディープリンク）",
      "ナビゲーション Props の型定義",
      "スクリーン遷移アニメーション",
    ],
  },
  {
    pattern: "ネイティブ機能統合",
    steps: [
      "expo-permissions でパーミッション要求",
      "expo-location または expo-camera でアクセス",
      "エラー時のフォールバック",
      "ユーザーへの説明画面",
      "e2e テストでデバイステスト",
    ],
  },
]

const toolComparison = [
  {
    feature: "リアルタイムプレビュー",
    cursor: "VSCode 内でホットリロード",
    claudeCode: "Expo Go で物理デバイステスト",
    recommended: "同等（用途による）",
  },
  {
    feature: "コード補完",
    cursor: "TypeScript サーバー統合",
    claudeCode: "テキスト補完（精度は劣る）",
    recommended: "Cursor",
  },
  {
    feature: "デバッグ",
    cursor: "VSCode デバッガ",
    claudeCode: "ログ・エラーメッセージ",
    recommended: "Cursor",
  },
  {
    feature: "コンポーネント生成",
    cursor: "AI アシスト（限定的）",
    claudeCode: "完全な実装生成",
    recommended: "Claude Code",
  },
  {
    feature: "複雑な API 実装",
    cursor: "インクリメンタル生成",
    claudeCode: "一括実装",
    recommended: "Claude Code",
  },
  {
    feature: "パッケージ管理",
    cursor: "npm/yarn サポート",
    claudeCode: "npm/yarn サポート",
    recommended: "同等",
  },
]

export default function MobileDevelopmentPage() {
  return (
    <div className="space-y-12">
      {/* ページタイトル */}
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">
          モバイル開発ユースケース
        </h1>
        <p className="text-lg text-muted-foreground">
          React Native と Expo を使ったモバイルアプリ開発で、
          Claude Code を活用した実践的なワークフローを学びます。
          コンポーネント作成、API統合、ロケーション機能、ナビゲーション設定まで
          完全なモバイルアプリ開発フローを体験できます。
        </p>
      </div>

      {/* 概要カード */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Smartphone className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-muted-foreground">所要時間</span>
              </div>
              <CardTitle>3-4時間</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              セットアップから本番対応まで。
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
              React と非同期処理の知識が必須。
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-muted-foreground">学べること</span>
              </div>
              <CardTitle>モバイル実装</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              iOS/Android 両対応の本格開発。
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-muted-foreground">成果物</span>
              </div>
              <CardTitle>配布可能</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              App Store/Google Play デプロイ対応。
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 前提条件 */}
      <Callout type="info" title="前提条件">
        <ul className="list-disc list-inside space-y-2">
          <li>Node.js 16 以上がインストール済み</li>
          <li>React と JavaScript / TypeScript の基礎知識</li>
          <li>npm または yarn パッケージマネージャー</li>
          <li>Expo CLI がインストール可能（または使用可能）</li>
          <li>Expo Go アプリをテスト用デバイスにインストール（推奨）</li>
          <li>Claude Code またはCursor がインストール済み</li>
          <li>OpenWeatherMap API キー（無料版で OK）</li>
        </ul>
      </Callout>

      {/* 完成イメージ */}
      <section>
        <h2 className="text-2xl font-bold mb-6">完成イメージ：天気予報アプリ</h2>
        <Card>
          <CardHeader>
            <CardTitle>このワークフローで完成するアプリ</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span>
                  <strong>メイン画面：</strong> 現在地の天気リアルタイム表示
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span>
                  <strong>都市検索：</strong> 複数都市検索、お気に入り登録機能
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span>
                  <strong>5日間予報：</strong> 詳細な天気予報表示
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span>
                  <strong>ロケーション機能：</strong> GPS で自動都市特定
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span>
                  <strong>設定画面：</strong> 温度単位（℃/℉）、言語変更
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span>
                  <strong>ダークモード：</strong> ライト/ダーク両対応
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span>
                  <strong>iOS/Android：</strong> App Store / Google Play デプロイ対応
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        <h2 className="text-2xl font-bold mb-6">Cursor vs Claude Code（モバイル開発向け）</h2>
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
              {toolComparison.map((item, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-3 px-4 font-medium">{item.feature}</td>
                  <td className="py-3 px-4">{item.cursor}</td>
                  <td className="py-3 px-4">{item.claudeCode}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 text-xs font-semibold bg-primary/10 text-primary rounded">
                      {item.recommended}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6"><Callout type="tip" title="推奨使い分け">
          <ul className="space-y-2">
            <li>
              <strong>Cursor がおすすめ：</strong> IDE でのホットリロード確認、デバッグが必要、詳細なコード補完
            </li>
            <li>
              <strong>Claude Code がおすすめ：</strong> コンポーネント一括生成、複雑なロジック実装、API 統合
            </li>
            <li>
              <strong>併用最強：</strong> 大枠は Claude Code で実装、細部調整は Cursor でエディタ確認
            </li>
          </ul>
        </Callout></div>
      </section>

      {/* よくある問題 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">よくある問題と解決方法</h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 shrink-0" />
                Q: Expo Go でホットリロードが動作しない
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                <strong>原因：</strong> Expo サーバーとデバイスが同じネットワークに接続していない。
              </p>
              <p>
                <strong>解決方法：</strong> Expo CLI の出力を確認し、同じ Wi-Fi に接続。必要に応じて
                `expo start --tunnel` でトンネルモードを使用。
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 shrink-0" />
                Q: パーミッションエラーが出る（ロケーション、カメラ等）
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                <strong>原因：</strong> app.json で permissions を設定していない。
              </p>
              <p>
                <strong>解決方法：</strong> app.json で permissions セクションを追加：
              </p>
              <CodeBlock
                code={`{
  "expo": {
    "plugins": [
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Allow Claude to access your location."
        }
      ]
    ]
  }
}`}
                language="json"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 shrink-0" />
                Q: API キーが Expo Go で認識されない
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                <strong>原因：</strong> .env ファイルが Expo Go に認識されていない。
              </p>
              <p>
                <strong>解決方法：</strong> app.json の extra セクションで環境変数を設定：
              </p>
              <CodeBlock
                code={`{
  "expo": {
    "extra": {
      "WEATHER_API_KEY": "your_api_key_here"
    }
  }
}`}
                language="json"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 shrink-0" />
                Q: iOS でアプリがビルドできない
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                <strong>原因：</strong> ネイティブコードの依存関係不足。
              </p>
              <p>
                <strong>解決方法：</strong> EAS Build を使用（推奨）。ローカルビルドの場合は Xcode を最新にして `pod install` を実行。
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ベストプラクティス */}
      <section>
        <h2 className="text-2xl font-bold mb-6">モバイル開発でのベストプラクティス</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>パフォーマンス最適化</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-semibold text-sm mb-1">1. リスト最適化</h4>
                <p className="text-sm text-muted-foreground">
                  FlatList を使用し、renderItem を useCallback でメモ化。
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">2. イメージ最適化</h4>
                <p className="text-sm text-muted-foreground">
                  Image コンポーネントで size 明示。WebP フォーマット利用。
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">3. API レスポンス</h4>
                <p className="text-sm text-muted-foreground">
                  キャッシング機能で不要な API 呼び出し削減。
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">4. バッテリー消費</h4>
                <p className="text-sm text-muted-foreground">
                  ロケーション更新頻度を制限。バックグラウンドタスクは必要最小限。
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>UI/UX ベストプラクティス</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-semibold text-sm mb-1">1. SafeArea 対応</h4>
                <p className="text-sm text-muted-foreground">
                  ノッチやホームボタンエリアを避ける。
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">2. ローディング状態</h4>
                <p className="text-sm text-muted-foreground">
                  ActivityIndicator でユーザーをフィードバック。
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">3. エラー表示</h4>
                <p className="text-sm text-muted-foreground">
                  Snackbar または Alert で問題を明確に。
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">4. タッチフィードバック</h4>
                <p className="text-sm text-muted-foreground">
                  Pressable で視覚的フィードバック提供。
                </p>
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
              <CardTitle className="text-lg">段階 2: 高度なナビゲーション</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                ディープリンク、認証フロー、モーダルナビゲーション。
              </p>
              <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                <li>Deep Link 実装</li>
                <li>Auth Stack の条件分岐</li>
                <li>モーダル画面の重ねあわせ</li>
              </ul>
              <Link href="/usecases/backend-api">
                <Button variant="outline" size="sm" className="w-full mt-3">
                  他のユースケースを見る
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">段階 3: ネイティブモジュール</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Expo Modules API で JavaScript 未対応機能を実装。
              </p>
              <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                <li>カスタムネイティブコード</li>
                <li>デバイス固有機能</li>
                <li>パフォーマンス最適化</li>
              </ul>
              <Link href="/tools/claude-code">
                <Button variant="outline" size="sm" className="w-full mt-3">
                  ツール詳細を見る
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">段階 4: 本番環境デプロイ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                App Store / Google Play へのリリース。
              </p>
              <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                <li>App Store Connect 申請</li>
                <li>Google Play Console 設定</li>
                <li>OTA アップデート（EAS Updates）</li>
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
                <span className="text-sm">Expo プロジェクト初期化</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">必要なライブラリインストール</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">WeatherCard コンポーネント作成</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">Weather API サービス実装</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">useWeather カスタムフック実装</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">ロケーション機能実装</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">React Navigation 統合</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">ローカルストレージ対応</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">テスト実行（80%+ カバレッジ）</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">Expo Go でビルド・テスト</span>
              </label>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              すべてのチェックが完了したら、App Store / Google Play へのデプロイに進みましょう！
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
              このガイドはいかがでしたか？モバイル開発での課題や改善提案があればお聞かせください。
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
