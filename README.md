# AI Coding Tools ガイド

最新のAIコーディングツール（Cursor、Claude、Manus など）の使い方とベストプラクティスをまとめた包括的なガイドサイトです。

## プロジェクト概要

このプロジェクトは、開発者向けに AIコーディングツールの機能や活用方法について、実践的な情報を提供するウェブサイトです。

### 主な特徴

- 📚 **包括的なガイド** - 複数のAIツールについての詳細な解説
- 🎨 **最新UI/UXデザイン** - ダークモード対応のモダンなインターフェース
- ⚡ **高速パフォーマンス** - Next.js 15による最適化
- 📱 **レスポンシブ設計** - デスクトップ・タブレット・モバイル対応
- ♿ **アクセシビリティ対応** - WCAG 2.1準拠
- 🔍 **SEO最適化** - 検索エンジンに対応

## 機能一覧

### 1. ツールガイド
- **Cursor** - AIアシスタント搭載のコードエディタ
- **Claude** - Anthropicの高性能AI言語モデル
- **Manus** - AIコーディングアシスタント

### 2. コンテンツカテゴリー
- はじめに・セットアップガイド
- 基本的な使い方
- 実践的なテクニック
- ベストプラクティス
- FAQ・トラブルシューティング

### 3. インタラクティブ機能
- テーマ切り替え（ライト/ダーク）
- 検索機能（将来実装予定）
- コード例とコピー機能
- 関連記事の推奨

## 技術スタック

### フロントエンド
- **フレームワーク**: Next.js 15.1.0
- **言語**: TypeScript 5.x
- **UI フレームワーク**: Tailwind CSS 4
- **テーマ管理**: next-themes
- **アイコン**: lucide-react
- **ユーティリティ**: clsx, tailwind-merge

### 開発ツール
- **リンター**: ESLint 9
- **CSSプリプロセッサ**: PostCSS + Tailwind CSS
- **パッケージマネージャー**: npm

### デプロイ
- **ホスティング**: Vercel
- **CDN**: Vercel Edge Network
- **ドメイン**: ai-coding-tools-guide.vercel.app

## セットアップ手順

### 前提条件

- Node.js 18.17以上
- npm 9以上（または yarn, pnpm）

### インストール

```bash
# リポジトリのクローン
git clone https://github.com/yourusername/ai-coding-tools-guide.git
cd ai-coding-tools-guide

# 依存関係のインストール
npm install

# 環境変数の設定（オプション）
cp .env.example .env.local
# .env.local を編集して必要な値を設定
```

### 開発サーバーの起動

```bash
# ホットリロード付きで開発サーバーを起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## 開発コマンド

### ビルド

```bash
# 本番用にプロジェクトをビルド
npm run build

# ビルド結果をローカルで確認
npm run start
```

### リンティングとコード品質

```bash
# ESLintを実行してコード品質をチェック
npm run lint

# TypeScriptの型チェック
npx tsc --noEmit
```

### パフォーマンス測定

```bash
# 本番ビルド
npm run build

# ビルドサイズの確認
npm run analyze  # 設定されている場合

# Lighthouse スコアの確認
npx lighthouse http://localhost:3000
```

## ファイル構造

```
ai-coding-tools-guide/
├── app/                          # Next.js App Router
│   ├── (marketing)/              # マーケティング関連ページ
│   │   ├── layout.tsx           # レイアウトコンポーネント
│   │   ├── page.tsx             # ホームページ
│   │   ├── cursor/              # Cursorガイド
│   │   ├── claude/              # Claudeガイド
│   │   └── manus/               # Manusガイド
│   ├── layout.tsx               # ルートレイアウト
│   └── globals.css              # グローバルスタイル
├── components/                   # Reactコンポーネント
│   ├── ui/                      # 再利用可能なUIコンポーネント
│   ├── sections/                # ページセクション
│   └── providers/               # Context/Provider
├── config/                       # 設定ファイル
│   ├── site.ts                  # サイト設定
│   └── navigation.ts            # ナビゲーション設定
├── lib/                          # ユーティリティ関数
│   ├── utils.ts                 # 汎用ユーティリティ
│   └── constants.ts             # 定数
├── public/                       # 静的ファイル
│   ├── manifest.json            # PWAマニフェスト
│   ├── robots.txt               # SEO設定
│   └── fonts/                   # フォントファイル
├── types/                        # TypeScript型定義
├── next.config.ts               # Next.js設定
├── tailwind.config.ts           # Tailwind CSS設定
├── tsconfig.json                # TypeScript設定
├── package.json                 # プロジェクト依存関係
└── README.md                    # このファイル
```

## デプロイ方法

### Vercelへのデプロイ

このプロジェクトはVercelで簡単にデプロイできます。

1. **GitHubへプッシュ**

```bash
git add .
git commit -m "feat: update project"
git push origin main
```

2. **Vercelダッシュボードで接続**

- [Vercel](https://vercel.com) にアクセス
- 「New Project」をクリック
- GitHubリポジトリを選択
- 自動的にビルド・デプロイが開始

3. **環境変数の設定**

- Vercelダッシュボードで「Settings」→「Environment Variables」
- 必要な環境変数を入力

### 環境変数の設定例

```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## パフォーマンス最適化

### 実装済みの最適化

- ✅ 画像最適化（AVIF/WebP）
- ✅ フォント最適化（font-display: swap）
- ✅ コード分割（自動）
- ✅ キャッシング戦略
- ✅ CSS最適化
- ✅ JavaScriptバンドルサイズ削減

### Core Web Vitals の目標

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

## ブラウザサポート

- Chrome（最新2バージョン）
- Firefox（最新2バージョン）
- Safari（最新2バージョン）
- Edge（最新2バージョン）

## セキュリティ

### 実装済みのセキュリティ対策

- ✅ CSP（Content Security Policy）
- ✅ HTTPS必須
- ✅ XSS防対策
- ✅ CSRF保護
- ✅ セキュアヘッダー設定

## アクセシビリティ

- WCAG 2.1 AA準拠を目指す
- スクリーンリーダー対応
- キーボード操作全対応
- コントラスト比の確保
- 減速アニメーション対応

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 貢献

プロジェクトへの貢献を歓迎します。詳細は [CONTRIBUTING.md](./CONTRIBUTING.md) を参照してください。

### コントリビューションの方法

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'feat: add amazing feature'`)
4. ブランチをプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 問い合わせ・フィードバック

### 報告・提案

- 🐛 バグ報告: [Issues](https://github.com/yourusername/ai-coding-tools-guide/issues)
- 💡 機能提案: [Discussions](https://github.com/yourusername/ai-coding-tools-guide/discussions)
- 📧 その他の問い合わせ: contact@example.com

## 更新履歴

### v0.1.0 (2024-02-13)

- 初回リリース
- 基本的なページ構成の実装
- テーマ機能の実装
- 3つのメインガイド（Cursor、Claude、Manus）の追加

詳細は [CHANGELOG.md](./CHANGELOG.md) を参照してください。

## 参考リンク

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Vercel Documentation](https://vercel.com/docs)

## 謝辞

- [Next.js](https://nextjs.org) - React フレームワーク
- [Tailwind CSS](https://tailwindcss.com) - CSSフレームワーク
- [Vercel](https://vercel.com) - ホスティングプラットフォーム
- [lucide-react](https://lucide.dev) - アイコンライブラリ
