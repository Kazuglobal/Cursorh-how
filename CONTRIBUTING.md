# AI Coding Tools Guide へのコントリビューション

このプロジェクトへのコントリビューションに感謝します。以下のガイドラインに従ってください。

## コントリビューションの流れ

### 1. セットアップ

```bash
# リポジトリをフォーク
# ローカルにクローン
git clone https://github.com/your-username/ai-coding-tools-guide.git
cd ai-coding-tools-guide

# アップストリームを追加
git remote add upstream https://github.com/original-owner/ai-coding-tools-guide.git

# 依存関係をインストール
npm install
```

### 2. ブランチを作成

```bash
# メインブランチを更新
git checkout main
git pull upstream main

# 機能ブランチを作成
git checkout -b feature/your-feature-name
# または
git checkout -b fix/your-bug-fix
```

### 3. 変更を実装

- コーディング規約に従ってください
- テストを追加または更新してください
- ドキュメントを更新してください

### 4. 変更をテスト

```bash
# リントを実行
npm run lint

# 型チェック
npx tsc --noEmit

# 開発サーバーで確認
npm run dev
```

### 5. コミット

```bash
# 変更をステージング
git add .

# コミット（Conventional Commits形式）
git commit -m "type: description"

# フォークにプッシュ
git push origin feature/your-feature-name
```

### 6. プルリクエスト

- GitHubでプルリクエストを作成
- テンプレートに従って詳細を記入
- レビューを待つ

## コーディング規約

### ファイル構成

```
- ファイル名: kebab-case
- コンポーネント: PascalCase
- 関数・変数: camelCase
- 定数: UPPER_SNAKE_CASE
```

### TypeScript

```typescript
// ✅ GOOD: 型を明示的に指定
function fetchData(url: string): Promise<Data> {
  return fetch(url).then(res => res.json())
}

// ❌ BAD: any を使用
function fetchData(url: any): any {
  return fetch(url).then(res => res.json())
}
```

### React コンポーネント

```typescript
// ✅ GOOD: 関数型コンポーネント + 型定義
interface ButtonProps {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary'
}

export function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`btn btn-${variant}`}
    >
      {label}
    </button>
  )
}

// ❌ BAD: props の型がない
export function Button(props) {
  return <button onClick={props.onClick}>{props.label}</button>
}
```

### スタイリング

```typescript
// ✅ GOOD: Tailwind CSS クラス
<div className="flex items-center gap-2 p-4">

// ❌ BAD: インラインスタイル
<div style={{ display: 'flex', gap: '8px', padding: '16px' }}>
```

### エラーハンドリング

```typescript
// ✅ GOOD: try-catch でエラー処理
async function loadData() {
  try {
    const data = await fetch('/api/data')
    return data.json()
  } catch (error) {
    console.error('Failed to load data:', error)
    throw new Error('データの読み込みに失敗しました')
  }
}

// ❌ BAD: エラー処理なし
async function loadData() {
  const data = await fetch('/api/data')
  return data.json()
}
```

## コミットメッセージ形式

### Conventional Commits

```
<type>(<scope>): <description>

<body>

<footer>
```

### 例

```
feat(content): add Cursor advanced guide section

- Add section on keyboard shortcuts
- Add section on multi-file editing
- Include practical examples

Closes #123
```

### タイプ

- **feat**: 新機能
- **fix**: バグ修正
- **docs**: ドキュメント更新
- **style**: フォーマット・スタイル（機能変更なし）
- **refactor**: コード整理（機能変更なし）
- **perf**: パフォーマンス改善
- **test**: テスト追加・修正
- **chore**: ビルド・依存関係・その他

### スコープ（オプション）

- **content**: ページコンテンツ
- **components**: UIコンポーネント
- **layout**: レイアウト
- **styles**: スタイル
- **config**: 設定
- **docs**: ドキュメント

## PR テンプレート

```markdown
## 変更内容
<!-- 何を変更したか、なぜ変更したかを説明 -->

## 関連 Issue
<!-- Closes #123 -->

## チェックリスト
- [ ] 変更をテストした
- [ ] ドキュメントを更新した
- [ ] リントで問題がない
- [ ] 型チェックで問題がない

## スクリーンショット
<!-- UIの変更がある場合は追加 -->
```

## テスト

### テスト対象

- 新しいコンポーネント
- ユーティリティ関数
- 重要なビジネスロジック

### テスト実行

```bash
# すべてのテストを実行
npm run test

# ウォッチモード
npm run test:watch

# カバレッジを確認
npm run test:coverage
```

## ドキュメント

### 更新が必要な場合

1. **README.md** - プロジェクト概要
2. **docs/** - 詳細なドキュメント
3. **コード内コメント** - 複雑なロジック

### ドキュメントの書き方

```markdown
## セクション名

簡潔な説明文。

### サブセクション

詳細な説明。

コード例:
```typescript
const example = true
```

参考リンク: [リンク](https://example.com)
```

## レビュープロセス

### マージ前の確認

- [ ] コードレビューを受けた
- [ ] CIが成功した
- [ ] 少なくとも1人の承認を得た
- [ ] 競合を解決した

### レビューコメントへの対応

1. 指摘を理解する
2. 変更を実装する
3. 返信で対応を説明する
4. 再レビューをリクエスト

## パフォーマンス考慮事項

### 画像

```typescript
// ✅ GOOD: Next.js Image コンポーネント
import Image from 'next/image'

<Image
  src="/image.png"
  alt="Description"
  width={800}
  height={600}
  priority={isAboveFold}
/>

// ❌ BAD: html img タグ
<img src="/image.png" alt="Description" />
```

### バンドルサイズ

- 大きなライブラリは慎重に追加
- 依存関係を最小化
- Tree-shaking可能なパッケージを使用

### パフォーマンス測定

```bash
# Lighthouse スコア確認
npm run build
npm run start
# localhost:3000 でテスト
```

## セキュリティ

### パスワードやAPIキー

- 絶対にコードに含めない
- `.env.local` または環境変数を使用
- `.gitignore` で除外

### ユーザー入力の処理

- 入力値は常にサニタイズする
- HTML サニタイザーライブラリを使用（例：DOMPurify）
- ユーザー生成コンテンツは安全に処理

## よくある質問

### Q: PR はどのくらいで merge されますか？

A: 通常は1週間以内です。複雑な変更はより時間がかかる場合があります。

### Q: マイナーな修正の PR を作成してもいいですか？

A: はい、大歓迎です。タイプミスや小さなバグ修正でも構いません。

### Q: 大きな機能を追加したいのですが？

A: まず Issue を作成して、実装方針を相談してください。

### Q: どうやってローカルでテストするのですか？

A: `npm run dev` で開発サーバーを起動し、ブラウザで確認してください。

## 行動規範

- 他の人を尊重する
- 建設的なフィードバックを心がける
- 個人攻撃は避ける
- コードの問題について議論する

## ライセンス

このプロジェクトにコントリビュートする場合、あなたのコードは MIT ライセンスの下で公開されることに同意したものとします。

## 質問やサポート

- GitHub Issues で質問する
- Discussions で機能提案する
- メールで問い合わせる: contact@example.com

---

コントリビューションをありがとうございます！
