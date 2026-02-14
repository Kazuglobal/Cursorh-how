# Claude Code CLI 包括的リファレンスガイド

> 最終更新: 2026年2月
> 対象バージョン: Claude Code 1.x 系（最新安定版）
> 対象読者: プログラミング初学者からエンジニアまで

---

## 目次

1. [Claude Code とは何か](#1-claude-code-とは何か)
2. [インストールとセットアップ](#2-インストールとセットアップ)
3. [主要機能の詳細](#3-主要機能の詳細)
4. [高度な機能](#4-高度な機能)
5. [設定とカスタマイズ](#5-設定とカスタマイズ)
6. [料金モデル](#6-料金モデル)
7. [初心者向けガイド](#7-初心者向けガイド)
8. [Claude エコシステム](#8-claude-エコシステムコード以外の連携機能)（Chrome / Excel / Cowork）
9. [他ツールとの比較](#9-他ツールとの比較)
10. [よくある質問（FAQ）](#10-よくある質問faq)
11. [参考リンク](#11-参考リンク)

---

## 1. Claude Code とは何か

### 1.1 概要

Claude Code は、Anthropic が開発したターミナルベースの AI コーディングアシスタントである。コマンドラインインターフェース（CLI）から直接 Claude の AI 能力を活用し、コードの読み書き、ファイル操作、コマンド実行、Git 操作などを自律的に行うことができる「エージェンティックコーディングツール」である。

従来の AI コーディングツールが「チャットで質問して回答を得る」受動的なモデルだったのに対し、Claude Code は **プロジェクト全体を理解し、必要な操作を自ら判断して実行する** 能動的なエージェント型のアプローチを採用している。

### 1.2 主な特徴

| 特徴 | 説明 |
|------|------|
| **ターミナルネイティブ** | GUI なし。ターミナルから直接操作する |
| **エージェンティック** | ファイルの読み書き、シェルコマンド実行、Git 操作を自律的に実行 |
| **プロジェクト全体の理解** | コードベース全体を検索・分析して文脈を把握 |
| **パーミッション制御** | ツール実行前にユーザーの許可を求める安全設計 |
| **拡張可能** | MCP、Hooks、カスタムエージェント、プラグインで機能拡張 |
| **マルチモデル対応** | Claude Opus 4.6、Sonnet 4.5、Haiku 4.5 など複数モデルに対応 |
| **IDE 連携** | VSCode、Cursor 等のターミナルから利用可能 |

### 1.3 Claude Code が使えるツール群

Claude Code は内部的に以下のツールを使い分けてタスクを遂行する:

| ツール | 用途 |
|--------|------|
| `Read` | ファイルの読み取り（画像、PDF、Jupyter Notebook 対応） |
| `Write` | ファイルの新規作成・上書き |
| `Edit` | 既存ファイル内の文字列置換による編集 |
| `Bash` | シェルコマンドの実行（git, npm, docker 等） |
| `Glob` | ファイル名パターンによるファイル検索 |
| `Grep` | ファイル内容の正規表現検索（ripgrep ベース） |
| `WebFetch` | URL からの Web コンテンツ取得 |
| `WebSearch` | Web 検索の実行 |
| `TodoWrite` | タスクリストの作成・管理 |
| `NotebookEdit` | Jupyter Notebook のセル編集 |
| `Task` | サブエージェントの起動（並列処理） |
| `Skill` | 登録済みスキルの実行 |

### 1.4 他の AI コーディングツールとの違い

| 比較項目 | Claude Code | Cursor | GitHub Copilot |
|----------|-------------|--------|----------------|
| 形式 | CLI（ターミナル） | IDE（GUI） | IDE 拡張機能 |
| 操作方式 | エージェント型（自律実行） | インタラクティブ型 | 補完・提案型 |
| ファイル操作 | 直接読み書き可能 | Composer で可能 | 限定的 |
| シェル実行 | 直接コマンド実行可能 | Agent モードで可能 | 不可 |
| カスタマイズ | CLAUDE.md, Hooks, MCP | .cursorrules | 限定的 |
| 拡張性 | Agent SDK, カスタムエージェント | 拡張機能 | 拡張機能 |
| Git 連携 | 完全な Git 操作 | 内蔵 Git UI | PR 提案 |

---

## 2. インストールとセットアップ

### 2.1 システム要件

- **OS**: macOS 12+、Ubuntu 20.04+/Debian 10+、Windows 10+（WSL 推奨、ネイティブも対応）
- **Node.js**: 18 以上
- **RAM**: 4GB 以上推奨
- **ネットワーク**: インターネット接続必須（API 通信のため）

### 2.2 インストール方法

#### npm（推奨）

```bash
npm install -g @anthropic-ai/claude-code
```

#### Homebrew（macOS）

```bash
brew install claude-code
```

#### 確認

```bash
claude --version
```

### 2.3 認証方法

Claude Code を使用するには、以下のいずれかの認証方法を設定する必要がある:

#### 方法 1: Anthropic API キー（従量課金）

```bash
# 環境変数で設定
export ANTHROPIC_API_KEY="sk-ant-api03-xxxxx"

# または初回起動時に対話的に設定
claude
```

#### 方法 2: Claude Pro/Max サブスクリプション

Claude Pro または Max プランに加入している場合、OAuth 認証でサブスクリプション経由で利用できる。初回起動時にブラウザが開き、Anthropic アカウントでログインする。

```bash
claude
# ブラウザが開くので Anthropic アカウントでログイン
```

#### 方法 3: Amazon Bedrock / Google Vertex AI

企業ユーザー向けに、クラウドプロバイダー経由のアクセスも可能:

```bash
# Amazon Bedrock
export CLAUDE_CODE_USE_BEDROCK=1
export AWS_REGION=us-east-1

# Google Vertex AI
export CLAUDE_CODE_USE_VERTEX=1
export CLOUD_ML_REGION=us-central1
export ANTHROPIC_VERTEX_PROJECT_ID=your-project-id
```

### 2.4 IDE 連携

Claude Code はターミナルベースのため、任意の IDE のターミナルパネルから利用できる。

#### VSCode での利用

1. VSCode のターミナル（`Ctrl+`` ）を開く
2. `claude` コマンドを実行
3. Claude Code が起動し、プロジェクトディレクトリを認識

#### VSCode 拡張機能

Claude Code 専用の VSCode 拡張機能も提供されている。インストールすると、サイドパネルから Claude Code セッションを管理できる。

#### Cursor での利用

Cursor の統合ターミナルからも同様に利用可能。Cursor 自体の AI 機能と併用することもできる。

### 2.5 初回起動

```bash
# プロジェクトディレクトリに移動
cd /path/to/your/project

# Claude Code を起動
claude

# プロンプトが表示される
# > Claude Code を利用する準備ができました。何をお手伝いしましょうか？
```

---

## 3. 主要機能の詳細

### 3.1 エージェンティックコーディング

Claude Code の最大の特徴は、単なるチャットボットではなく「エージェント」として動作することである。ユーザーの指示に基づき、以下の操作を自律的に行う:

#### ファイルの読み書き

```
ユーザー: src/utils.ts に formatDate 関数を追加して

Claude Code の動作:
1. src/utils.ts を Read ツールで読み取り
2. 既存のコードを分析
3. formatDate 関数を Edit ツールで追加
4. 結果を報告
```

#### コマンド実行

```
ユーザー: テストを実行して

Claude Code の動作:
1. package.json を確認してテストコマンドを特定
2. Bash ツールで npm test を実行
3. 結果を解析して報告
4. 失敗がある場合は原因を分析して修正を提案
```

#### コードベース検索

```
ユーザー: 認証に関するコードを探して

Claude Code の動作:
1. Grep ツールで "auth", "login", "session" などを検索
2. Glob ツールで auth 関連ファイルを探索
3. 関連ファイルを Read で読み取り
4. アーキテクチャを分析して報告
```

### 3.2 CLAUDE.md 設定ファイル

`CLAUDE.md` は Claude Code に対するプロジェクト固有の指示を記述するファイルである。プロジェクトのルートディレクトリに配置すると、Claude Code が自動的に読み込んで従う。

#### 配置場所と優先順位

| 配置場所 | 範囲 | 優先順位 |
|----------|------|----------|
| `~/.claude/CLAUDE.md` | グローバル（全プロジェクト共通） | 低 |
| `プロジェクトルート/CLAUDE.md` | プロジェクト固有 | 中 |
| `サブディレクトリ/CLAUDE.md` | ディレクトリ固有 | 高 |

#### 記述例

```markdown
# プロジェクト指示

## 技術スタック
- Next.js 15 + React 19
- TypeScript (strict mode)
- Prisma + PostgreSQL
- TailwindCSS

## コーディング規約
- 関数は50行以下に保つ
- イミュータブルパターンを使用（オブジェクトを直接変更しない）
- エラーハンドリングは try/catch で包括的に行う
- console.log は使用しない（logger を使用）

## テスト
- 新しい機能には必ずテストを書く
- テストカバレッジ 80% 以上を維持

## Git
- コミットメッセージは Conventional Commits 形式
  (feat:, fix:, refactor:, docs:, test:, chore:)
```

#### rules ディレクトリ（新機能）

`CLAUDE.md` の代わりに、もしくは併用して、`~/.claude/rules/` ディレクトリにルールファイルを分割配置できる:

```
~/.claude/rules/
  coding-style.md      # コーディングスタイルのルール
  security.md          # セキュリティガイドライン
  testing.md           # テスト要件
  git-workflow.md      # Git ワークフロー
  patterns.md          # 共通パターン
```

プロジェクトレベルでも `.claude/rules/` に配置可能。これにより関心の分離が実現できる。

### 3.3 パーミッションシステム

Claude Code はセキュリティのため、特定の操作（ファイル書き込み、コマンド実行等）を実行する前にユーザーの許可を求める。

#### パーミッションの種類

| レベル | 説明 | 例 |
|--------|------|-----|
| **自動許可** | 読み取り専用操作 | Read, Glob, Grep |
| **確認必要** | 書き込み・実行操作 | Write, Edit, Bash |
| **常にブロック** | 危険な操作 | 設定可能 |

#### 許可の管理方法

対話中に操作の許可を求められた場合:

- **y**: 今回のみ許可
- **Y（大文字）**: このセッション中は常に許可
- **n**: 拒否

#### settings.json での事前許可

`~/.claude/settings.json` で特定のツールを事前に許可できる:

```json
{
  "permissions": {
    "allow": [
      "Bash(git status:*)",
      "Bash(npm test:*)",
      "Read(**)"
    ],
    "deny": [
      "Bash(rm -rf:*)",
      "Bash(git push --force:*)"
    ]
  }
}
```

#### パーミッションのパターン記法

```
ツール名(パラメータパターン:値パターン)

例:
Bash(command:git *)        # git で始まるコマンドを許可
Read(file_path:/src/**)    # src 配下の読み取りを許可
WebFetch(domain:*.github.com)  # GitHub ドメインの取得を許可
```

### 3.4 MCP（Model Context Protocol）

MCP は Claude Code が外部ツールやサービスと連携するためのプロトコルである。MCP サーバーを設定することで、Claude Code の機能を大幅に拡張できる。

#### MCP の仕組み

```
Claude Code <--> MCP Client <--> MCP Server <--> 外部サービス
                                      |
                                      +-- Supabase
                                      +-- GitHub
                                      +-- Slack
                                      +-- Playwright
                                      +-- etc.
```

#### 主要な MCP プラグイン（プラグインシステム）

Claude Code は公式プラグインシステムを通じて MCP 連携を簡単に設定できる:

| プラグイン | 機能 |
|-----------|------|
| `supabase` | データベース操作、マイグレーション、Edge Functions |
| `vercel` | デプロイ、プロジェクト管理、ログ確認 |
| `playwright` | ブラウザ操作、E2Eテスト、スクリーンショット |
| `github` | PR管理、Issue操作、コードレビュー |
| `slack` | メッセージ送受信、チャンネル管理 |
| `figma` | デザインデータ取得、コード変換 |
| `linear` | プロジェクト管理、Issue トラッキング |
| `sentry` | エラー監視、デバッグ |
| `stripe` | 決済関連の操作 |
| `context7` | ライブラリドキュメント検索 |
| `notion` | ドキュメント管理 |

#### プラグインの有効化

`~/.claude/settings.json` で有効化:

```json
{
  "enabledPlugins": {
    "supabase@claude-plugins-official": true,
    "vercel@claude-plugins-official": true,
    "playwright@claude-plugins-official": true,
    "github@claude-plugins-official": true
  }
}
```

### 3.5 Hooks（フックシステム）

Hooks はツール実行の前後やセッション終了時にカスタムスクリプトを実行する仕組みである。CI/CD パイプラインの考え方に近い。

#### フックの種類

| フック | タイミング | 用途例 |
|--------|-----------|--------|
| `PreToolUse` | ツール実行前 | バリデーション、実行ブロック |
| `PostToolUse` | ツール実行後 | フォーマット、型チェック |
| `Stop` | セッション終了時 | 最終チェック、クリーンアップ |
| `PreCompact` | コンパクション前 | メモリ永続化 |
| `SessionStart` | セッション開始時 | 初期化処理 |

#### 設定例

`~/.claude/settings.json` の `hooks` セクションで設定:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "tool == \"Bash\" && tool_input.command matches \"npm run dev\"",
        "hooks": [
          {
            "type": "command",
            "command": "#!/bin/bash\necho '[Hook] BLOCKED: Dev server must run in tmux' >&2\nexit 1"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "tool == \"Edit\" && tool_input.file_path matches \"\\\\.(ts|tsx)$\"",
        "hooks": [
          {
            "type": "command",
            "command": "#!/bin/bash\n# Auto-format with Prettier after editing\ninput=$(cat)\nfile_path=$(echo \"$input\" | jq -r '.tool_input.file_path')\nprettier --write \"$file_path\" 2>&1\necho \"$input\""
          }
        ]
      }
    ],
    "Stop": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "#!/bin/bash\n# Check for console.log in modified files\ngit diff --name-only HEAD | xargs grep -l 'console.log' 2>/dev/null"
          }
        ]
      }
    ]
  }
}
```

#### matcher の構文

```
tool == "ToolName"                              # ツール名の一致
tool_input.command matches "pattern"            # コマンドパターン
tool_input.file_path matches "\\.ts$"           # ファイルパスパターン
"*"                                              # 全てにマッチ
tool == "Edit" && tool_input.file_path matches "pattern"  # AND 条件
```

#### 実用的なフック例

1. **dev サーバーの tmux 強制**: `npm run dev` を直接実行させず tmux 経由を強制
2. **Prettier 自動フォーマット**: TypeScript/JavaScript ファイル編集後に自動整形
3. **TypeScript 型チェック**: .ts/.tsx ファイル編集後に自動で tsc 実行
4. **console.log 警告**: 編集したファイルに console.log があれば警告
5. **git push 前レビュー**: push 前にエディタを開いて確認を促す
6. **不要ドキュメントブロック**: 不要な .md ファイルの作成を防止

### 3.6 セッション管理

#### セッションの継続

Claude Code はセッション中の会話履歴を保持する。同じターミナルセッション内であれば、前の指示の文脈を覚えている。

```bash
# セッションの再開（前回の続き）
claude --resume

# 特定のセッションを再開
claude --resume <session-id>
```

#### コンパクション（Context Compaction）

長いセッションではコンテキストウィンドウが一杯になる。Claude Code は自動的に会話をコンパクション（要約・圧縮）して、重要な情報を維持しながらコンテキストを管理する。

```
# コンテキスト使用量の目安
[セッション開始] 0% --------> 80% [自動コンパクション発動] -> 40% [圧縮後]
```

#### コンパクション前の Hook で情報を永続化

```json
{
  "PreCompact": [
    {
      "matcher": "*",
      "hooks": [
        {
          "type": "command",
          "command": "~/.claude/hooks/memory-persistence/pre-compact.sh"
        }
      ]
    }
  ]
}
```

### 3.7 スラッシュコマンド

Claude Code の対話中に使えるスラッシュコマンド:

| コマンド | 説明 |
|----------|------|
| `/help` | ヘルプを表示 |
| `/clear` | 会話履歴をクリア |
| `/compact` | 手動でコンテキストをコンパクション |
| `/status` | 現在のセッション状態を表示 |
| `/model` | 使用モデルの切り替え |
| `/permissions` | パーミッション設定を表示・変更 |
| `/cost` | 現在のセッションのコストを表示 |

#### カスタムスラッシュコマンド

`~/.claude/commands/` にMarkdownファイルを配置することで独自のスラッシュコマンドを作成できる:

```
~/.claude/commands/
  plan.md          # /plan で計画策定を実行
  tdd.md           # /tdd で TDD ワークフローを開始
  code-review.md   # /code-review でコードレビュー
  build-fix.md     # /build-fix でビルドエラー解消
  e2e.md           # /e2e で E2E テスト実行
```

カスタムコマンドの例（`~/.claude/commands/plan.md`）:

```markdown
---
description: 要件を確認し、リスクを評価し、段階的な実装計画を作成する
---

# Plan Command

planner エージェントを呼び出して包括的な実装計画を作成する。
コードを書く前に必ずユーザーの確認を待つ。
```

### 3.8 思考モード（Thinking）

Claude Code は `alwaysThinkingEnabled` 設定により、応答前に内部的に「思考」プロセスを実行できる。これにより:

- より深い推論が可能
- 複雑な問題への対処力が向上
- 計画性の高い回答を生成

```json
{
  "alwaysThinkingEnabled": true
}
```

---

## 4. 高度な機能

### 4.1 Agent SDK

Agent SDK を使用すると、Claude Code をプログラマティックに制御して独自のアプリケーションやワークフローを構築できる。

#### 基本的な使い方

```typescript
import { Claude } from '@anthropic-ai/claude-code'

const claude = new Claude({
  apiKey: process.env.ANTHROPIC_API_KEY
})

// メッセージを送信して応答を取得
const response = await claude.message({
  message: 'src/utils.ts のテストを書いて',
  workingDirectory: '/path/to/project'
})
```

#### SDK の主要機能

- プログラムからの Claude Code セッション制御
- カスタムツールの定義と登録
- ストリーミングレスポンスの処理
- セッションの永続化と再開
- マルチエージェントのオーケストレーション

### 4.2 カスタムエージェント

`~/.claude/agents/` ディレクトリにMarkdownファイルを配置することで、専門的な役割を持つカスタムエージェントを定義できる。

#### エージェント定義のフォーマット

```markdown
---
name: planner
description: 複雑な機能やリファクタリングの実装計画を策定する専門家
tools: ["Read", "Grep", "Glob"]
model: opus
---

あなたは実装計画の専門家です。

## あなたの役割
- 要件を分析し、詳細な実装計画を作成する
- 複雑な機能を管理可能なステップに分解する
- 依存関係とリスクを特定する
```

#### 主要なエージェント例

| エージェント | 役割 | 使用ツール | モデル |
|-------------|------|-----------|--------|
| `planner` | 実装計画の策定 | Read, Grep, Glob | opus |
| `code-reviewer` | コード品質レビュー | Read, Grep, Glob, Bash | opus |
| `tdd-guide` | テスト駆動開発ガイド | Read, Write, Edit, Bash, Grep | opus |
| `security-reviewer` | セキュリティ脆弱性検出 | Read, Write, Edit, Bash, Grep, Glob | opus |
| `build-error-resolver` | ビルドエラー解消 | Read, Write, Edit, Bash, Grep, Glob | opus |
| `architect` | システム設計 | Read, Grep, Glob | opus |
| `e2e-runner` | E2Eテスト実行 | Read, Write, Edit, Bash, Grep | opus |
| `refactor-cleaner` | デッドコード除去 | Read, Write, Edit, Bash, Grep, Glob | opus |
| `doc-updater` | ドキュメント更新 | Read, Write, Edit, Grep | opus |

#### エージェントの自動起動ルール

以下のケースでは、ユーザーの明示的な指示がなくてもエージェントが自動的に起動される:

1. **複雑な機能リクエスト** → `planner` エージェント
2. **コードを書いた/修正した直後** → `code-reviewer` エージェント
3. **バグ修正や新機能** → `tdd-guide` エージェント
4. **アーキテクチャの決定** → `architect` エージェント

### 4.3 チーム機能（Agent Teams）

Claude Code のチーム機能は、複数のエージェントセッションを組織して並列に協調作業させる**実験的機能**。2026年2月5日、Opus 4.6 と同時にリリースされた。

1つのセッションがチームリーダーとなり、タスクの分割・割り当て・結果の統合を担当する。チームメイトは独立したコンテキストウィンドウで作業し、互いに直接通信できる。

#### セットアップ

**Step 1: 機能を有効化**

settings.json に以下を追加:

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

**Step 2: チームを作成**

Claude Code で自然言語でチーム構成を指示する:

```
CLI ツールの設計について、3つの視点からエージェントチームで検討して:
- 1人目: UX デザイン担当
- 2人目: 技術アーキテクチャ担当
- 3人目: デビルズアドボケート（反論担当）
```

Claude がチームを作成 → 共有タスクリスト生成 → メンバーを起動 → 作業開始。

#### 表示モード

| モード | 操作方法 | 必要環境 |
|--------|---------|---------|
| **In-process**（デフォルト） | Shift+↑/↓ でメンバー切替、Enter で詳細表示 | 任意のターミナル |
| **Split panes** | 各メンバーが独立ペインで表示 | tmux または iTerm2 |

設定で切り替え:

```json
{ "teammateMode": "in-process" }
```

#### サンプル: 並列コードレビュー

```
PR #142 をエージェントチームでレビューして。3人のレビュワーを作成:
- セキュリティの観点からレビュー
- パフォーマンスへの影響をチェック
- テストカバレッジの検証
各自レビュー結果をまとめて。
```

→ 3つの観点から同時にレビューが進行し、リーダーが結果を統合する。

#### サンプル: 競合仮説でのデバッグ

```
アプリが1メッセージ後に切断される問題を調査して。
5人のエージェントでそれぞれ異なる仮説を検証。
互いの仮説を反証し合う科学的議論の形式で進めて。
結果をまとめて findings ドキュメントを更新して。
```

→ 各エージェントが独立して仮説を検証し、互いに反論して最も有力な原因に収束する。

#### サンプル: Plan Approval モード（品質ゲート）

```
認証モジュールのリファクタリングをアーキテクトチームメイトに任せて。
変更を加える前にプラン承認を必須にして。
テストカバレッジを含むプランのみ承認して。
```

→ チームメイトはまず計画を策定 → リーダーがレビュー → 承認後に実装開始。

#### チームメンバーへの直接操作

| 操作 | キー/コマンド |
|------|-------------|
| メンバー選択・メッセージ送信 | Shift+↑/↓ |
| 共有タスクリスト表示 | Ctrl+T |
| Delegate モード（リーダーを調整専任に） | Shift+Tab |
| メンバーのシャットダウン | 「researcher をシャットダウンして」 |
| チームのクリーンアップ | 「チームをクリーンアップして」 |

#### サブエージェント（Task）との使い分け

| | サブエージェント (Task) | Agent Teams |
|--|----------------------|-------------|
| **通信** | 呼び出し元に結果を返すのみ | メンバー同士が直接通信 |
| **コンテキスト** | 結果が親に要約されて返る | 各メンバーが完全に独立 |
| **コスト** | 低い | 高い（メンバー数に比例） |
| **最適な用途** | 結果だけ必要な調査・検証 | 議論・協調が必要な複雑タスク |

#### 推奨ユースケース

1. **リサーチ＆レビュー**: 複数の観点から同時に調査
2. **新モジュール開発**: 各メンバーが別ファイルを担当
3. **競合仮説デバッグ**: 異なる仮説を並列検証
4. **クロスレイヤー調整**: フロントエンド・バックエンド・テストを分担

#### 注意点

- 実験的機能（デフォルト無効、Claude Code 1.0.34 以降が必要）
- `/resume` でチームメイトは復元されない（新しいメンバーを再作成する）
- 同じファイルの同時編集は避ける（上書き防止）
- トークン消費がメンバー数に比例して増加する
- 1セッション1チームまで、ネスト不可

### 4.4 Plan モード

複雑な機能を実装する前に、Plan モードで計画を策定してからコードに取りかかるワークフロー:

```
/plan ユーザー認証機能を追加したい

Claude Code (planner):
1. 要件の確認
2. アーキテクチャ設計
3. 実装フェーズの分割
4. リスク評価
5. 確認待ち → ユーザーが "proceed" で承認 → 実装開始
```

### 4.5 Task ツール（サブエージェント）

`Task` ツールを使用すると、サブエージェントを起動して並列処理を行える:

```
例: セキュリティ分析とパフォーマンスレビューを同時実行

Task 1: auth.ts のセキュリティ分析
Task 2: キャッシュシステムのパフォーマンスレビュー
Task 3: utils.ts の型チェック

→ 3つのタスクが並列で実行される
```

### 4.6 スキルシステム

`~/.claude/skills/` にスキルディレクトリを配置して、再利用可能な専門知識を定義できる:

```
~/.claude/skills/
  tdd-workflow/          # TDD ワークフローのスキル
  security-review/       # セキュリティレビューのスキル
  frontend-patterns/     # フロントエンドパターン集
  backend-patterns/      # バックエンドパターン集
  continuous-learning/   # 継続的学習スキル
```

---

## 5. 設定とカスタマイズ

### 5.1 settings.json の構造

`~/.claude/settings.json` は Claude Code のグローバル設定ファイルである:

```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",

  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  },

  "permissions": {
    "allow": [
      "Bash(git *:*)",
      "Bash(npm test:*)",
      "Read(**)"
    ],
    "deny": [
      "Bash(rm -rf:*)"
    ]
  },

  "hooks": {
    "PreToolUse": [],
    "PostToolUse": [],
    "Stop": [],
    "PreCompact": [],
    "SessionStart": []
  },

  "enabledPlugins": {
    "supabase@claude-plugins-official": true,
    "vercel@claude-plugins-official": true,
    "playwright@claude-plugins-official": true
  },

  "alwaysThinkingEnabled": true
}
```

### 5.2 設定の階層構造

Claude Code の設定は複数の階層で管理される（上ほど優先度が高い）:

```
1. コマンドライン引数（最高優先度）
2. 環境変数
3. プロジェクト .claude/settings.json
4. プロジェクト CLAUDE.md
5. ユーザー ~/.claude/settings.json
6. ユーザー ~/.claude/CLAUDE.md
7. デフォルト設定（最低優先度）
```

### 5.3 環境変数

| 変数名 | 説明 |
|--------|------|
| `ANTHROPIC_API_KEY` | Anthropic API キー |
| `CLAUDE_CODE_USE_BEDROCK` | Amazon Bedrock 経由使用 |
| `CLAUDE_CODE_USE_VERTEX` | Google Vertex AI 経由使用 |
| `CLAUDE_MODEL` | 使用するモデルの指定 |
| `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` | チーム機能の有効化 |
| `CLAUDE_CODE_MAX_TOKENS` | 最大トークン数の設定 |
| `DISABLE_PROMPT_CACHING` | プロンプトキャッシュの無効化 |

### 5.4 ディレクトリ構造

Claude Code の設定・データディレクトリ:

```
~/.claude/
  settings.json          # グローバル設定
  CLAUDE.md              # グローバル指示ファイル
  agents/                # カスタムエージェント定義
    planner.md
    code-reviewer.md
    tdd-guide.md
    security-reviewer.md
    build-error-resolver.md
    architect.md
    ...
  commands/              # カスタムスラッシュコマンド
    plan.md
    tdd.md
    code-review.md
    ...
  hooks/                 # カスタムフックスクリプト
    memory-persistence/
    strategic-compact/
  rules/                 # ルールファイル（分割 CLAUDE.md）
    coding-style.md
    security.md
    testing.md
    ...
  skills/                # スキルディレクトリ
    tdd-workflow/
    security-review/
    ...
  teams/                 # チーム設定
    my-team/
      config.json
  plugins/               # プラグインデータ
  projects/              # プロジェクト固有データ
  history.jsonl          # セッション履歴
  todos/                 # タスクリスト
  tasks/                 # Task ツールのデータ
```

---

## 6. 料金モデル

### 6.1 Anthropic API 直接利用（従量課金）

API キーを使用する場合、トークン消費量に応じた従量課金:

| モデル | 入力 (100万トークン) | 出力 (100万トークン) |
|--------|---------------------|---------------------|
| Claude Opus 4.6 | $5 | $25 |
| Claude Sonnet 4.5 | $3 | $15 |
| Claude Haiku 4.5 | $0.80 | $4 |

**注意**: プロンプトキャッシュにより、繰り返し同じコンテキストを送信する場合はコストが削減される。

#### コスト見積もり例

| 作業内容 | 所要トークン（概算） | コスト目安（Sonnet） |
|----------|---------------------|---------------------|
| 小さなバグ修正 | 入力5万 + 出力2万 | ~$0.45 |
| 機能追加（中規模） | 入力20万 + 出力10万 | ~$2.10 |
| 大規模リファクタリング | 入力100万 + 出力50万 | ~$10.50 |
| 1日の開発作業 | 入力500万 + 出力200万 | ~$45 |

### 6.2 Claude Pro サブスクリプション

月額 $20 の Claude Pro プランで Claude Code を利用可能。ただし使用量に制限あり。

- 基本的な Claude Code 利用が含まれる
- ヘビーユーザーには制限がかかる場合がある
- API 直接利用より気軽に始められる

### 6.3 Claude Max サブスクリプション

月額 $100 / $200 の Claude Max プランで、より大量の Claude Code 利用が可能。

- **$100/月プラン**: Pro の 5 倍の使用量
- **$200/月プラン**: Pro の 20 倍の使用量
- プロフェッショナルな開発に最適
- API キー不要で OAuth 認証

### 6.4 クラウドプロバイダー経由

- **Amazon Bedrock**: AWS の料金体系に準拠
- **Google Vertex AI**: GCP の料金体系に準拠
- 企業の既存クラウド契約を活用可能

### 6.5 コスト最適化のヒント

1. **モデル選択**: 単純なタスクには Haiku 4.5、通常開発には Sonnet 4.5、複雑な推論には Opus 4.6
2. **CLAUDE.md の活用**: 適切な指示で不要なやり取りを削減
3. **コンパクションの管理**: 長いセッションを適切に区切る
4. **パーミッション事前設定**: 確認ダイアログのトークン消費を削減
5. **Task の活用**: サブエージェントに軽量モデルを指定

---

## 7. 初心者向けガイド

### 7.1 最初の一歩

#### 1. インストール

```bash
npm install -g @anthropic-ai/claude-code
```

#### 2. プロジェクトディレクトリで起動

```bash
cd ~/my-project
claude
```

#### 3. 最初の指示を出す

```
> このプロジェクトの構造を教えて

> package.json の依存関係を説明して

> src/App.tsx を読んで、改善点を教えて
```

### 7.2 効果的なプロンプトの書き方

#### 基本原則

| 原則 | 良い例 | 悪い例 |
|------|--------|--------|
| **具体的に** | 「src/utils.ts に formatDate 関数を追加して。引数は Date 型、戻り値は "YYYY-MM-DD" 形式の文字列」 | 「日付のフォーマット関数を作って」 |
| **ファイルを指定** | 「components/Header.tsx のナビゲーションを修正して」 | 「ヘッダーを直して」 |
| **期待する結果を明示** | 「テストが全て通るようにして。npm test で確認して」 | 「テストを修正して」 |
| **段階的に進める** | 「まず型定義を作って、次に実装して、最後にテストを書いて」 | 「全部一気にやって」 |

#### プロンプトテンプレート

**バグ修正**:
```
[ファイル名] で [症状] が発生している。
原因を調査して修正して。
修正後、関連するテストを実行して確認して。
```

**新機能追加**:
```
[機能の説明] を実装して。
要件:
- [要件1]
- [要件2]
技術制約:
- [制約1]
テストも書いて。
```

**リファクタリング**:
```
[ファイル名] をリファクタリングして。
目標:
- 関数を50行以下に分割
- 重複コードを抽出
- エラーハンドリングを追加
既存のテストが通ることを確認して。
```

### 7.3 よくある間違いとつまずきポイント

#### 間違い 1: CLAUDE.md を書かない

**問題**: Claude Code はプロジェクトの規約やフレームワークの使い方を推測に頼ることになる。

**解決**: プロジェクトルートに `CLAUDE.md` を作成し、技術スタック、コーディング規約、テスト方針を明記する。

#### 間違い 2: パーミッションを毎回確認する

**問題**: 安全な操作（git status, npm test 等）を毎回承認するのは手間。

**解決**: `settings.json` の `permissions.allow` に安全なコマンドパターンを追加する。

#### 間違い 3: 一度に大量の変更を依頼する

**問題**: 大量の変更を一度に依頼すると、品質が低下し、問題の切り分けが困難になる。

**解決**: 段階的に進める。1つの機能→テスト→確認→次の機能。

#### 間違い 4: コンテキストが大きくなりすぎる

**問題**: 長時間のセッションでコンテキストウィンドウが埋まり、古い指示を忘れる。

**解決**: `/compact` で手動コンパクション、または新しいセッションを開始する。

#### 間違い 5: 安全でないコマンドを許可する

**問題**: `rm -rf *` や `git push --force` を許可すると取り返しのつかないことになる。

**解決**: `permissions.deny` で危険なコマンドを明示的にブロックする。

### 7.4 ベストプラクティス

#### CLAUDE.md を充実させる

```markdown
# プロジェクトガイド

## 技術スタック
- Next.js 15, React 19, TypeScript
- Prisma + PostgreSQL
- TailwindCSS + Shadcn/ui

## 開発ルール
- テスト駆動開発を実践する
- コミットメッセージは feat:, fix:, refactor: 形式
- 関数は50行以下、ファイルは800行以下

## 禁止事項
- console.log をコミットしない
- any 型を使わない
- 直接的なオブジェクトの変更（ミューテーション）をしない
```

#### Hooks で品質ゲートを設置する

- TypeScript 編集後に自動型チェック
- JavaScript/TypeScript 編集後に自動フォーマット
- console.log の検出と警告
- コミット前のセキュリティチェック

#### カスタムコマンドを活用する

頻繁に使うワークフローをカスタムコマンドとして定義:

```
/plan    - 実装前の計画策定
/tdd     - テスト駆動開発の開始
/review  - コードレビューの実行
/e2e     - E2E テストの実行
```

#### コスト管理

- `/cost` で現在のセッションコストを確認
- 単純なタスクには軽量モデルを使用
- 不要なファイル読み取りを避ける明確な指示

---

## 8. Claude エコシステム（コード以外の連携機能）

Claude Code はターミナルベースのコーディングツールだが、Claude はより広いエコシステムを構成している。ここでは、コード開発と組み合わせて活用できる Claude の連携機能を紹介する。

### 8.1 Claude in Chrome（ブラウザ拡張）

Claude in Chrome は、Chrome ブラウザ内でサイドパネルとして動作する AI アシスタント。自然言語の指示で Web サイトの操作（ナビゲーション、フォーム入力、データ抽出）を自動化できる。

#### セットアップ

1. Chrome Web Store で「Claude」を検索してインストール
2. Claude の有料プラン（Pro / Max / Team / Enterprise）に加入
3. 拡張機能をクリックし、Claude アカウントでサインイン
4. 許可モードを選択:
   - **「操作前に確認」**: 各アクションの前に許可を求める（推奨）
   - **「自動実行」**: Claude が自律的に操作する

#### 基本的な使い方

サイドパネルを開き、やりたいことを自然言語で指示する:

| やりたいこと | 指示の例 |
|-------------|---------|
| Web検索・情報収集 | 「この商品の最安値を3サイトで比較して」 |
| フォーム入力 | 「このフォームに以下の情報を入力して: 名前は...」 |
| メール管理 | 「未読メールを要約して、重要なものをリストアップ」 |
| データ抽出 | 「このページの表データをコピーして」 |

#### サンプル: ワークフローの記録と再利用

1. サイドパネルの **録画アイコン** をクリック
2. 自分で操作を実行（例: 毎朝のニュースチェック手順）
3. 録画を停止し、ワークフローとして保存
4. 次回から「保存したワークフロー」を選ぶだけで自動実行

#### サンプル: マルチタブ管理

複数タブを Claude のタブグループにドラッグ＆ドロップすると、Claude が全タブを同時に監視・操作できる。

```
指示例: 「3つのECサイトのタブを開いて、各サイトの送料を比較して」
```

#### サンプル: Claude Code との連携

Claude Code（ターミナル）でビルド → Chrome 拡張でブラウザテスト、という開発フローが可能。

```
Claude Code で起動 → 「ビルドして Chrome で動作確認して」
→ ビルド実行後、Chrome 拡張と連携してページを開きテスト
```

#### 注意点

- 対応ブラウザ: Google Chrome、Microsoft Edge（Brave、Arc は未対応）
- WSL 環境では動作しない
- 無料プランでは利用不可
- スケジュールタスク機能で定期実行も可能（日次/週次/月次）

### 8.2 Claude in Excel（スプレッドシート連携）

Microsoft Excel のアドインとして動作し、スプレッドシート上で直接 Claude と対話できる。数式の説明、データ分析、エラー修正、モデル構築などを自然言語で指示可能。

#### セットアップ

1. Excel を開く → **挿入** タブ → **アドインを取得**
2. 「Claude by Anthropic」を検索してインストール
3. Claude アカウントでサインイン
4. ショートカットで起動:
   - **Windows**: `Ctrl + Alt + C`
   - **Mac**: `Ctrl + Option + C`

#### 基本的な使い方

| カテゴリ | サンプルプロンプト |
|---------|------------------|
| **数式作成** | 「A列の売上とB列のコストから利益率を計算する数式を作って」 |
| **数式の説明** | 「C3セルの数式を日本語で説明して」 |
| **エラー修正** | 「#VALUE! エラーが出ている原因を調べて修正して」 |
| **データ分析** | 「2024年と2025年のトレンドを比較して」 |
| **書式設定** | 「売上が目標未満のセルを赤色でハイライトして」 |
| **データ整理** | 「重複行を削除して、最新のレコードだけ残して」 |
| **ピボット** | 「地域別の売上サマリーをピボットテーブルで作って」 |

#### サンプル: 財務モデルの構築

```
プロンプト: 「SaaS企業の3ステートメント財務モデルを作って」
```

Claude が以下を自動生成:
- P/L（損益計算書）シート
- B/S（貸借対照表）シート
- C/F（キャッシュフロー計算書）シート
- 各シート間のリンク数式
- 前提条件シート（変更するとモデル全体に反映）

#### サンプル: データクリーニング

```
プロンプト: 「電話番号を +81-XXX-XXXX-XXXX 形式に統一して」
```

→ Claude が全行を走査し、バラバラな書式を統一フォーマットに変換

#### ネイティブ操作（Opus 4.6 で追加）

- ピボットテーブルの編集
- チャートの編集
- 条件付き書式
- ソート＆フィルタ
- データ入力規則（ドロップダウンリスト等）
- 複数ファイルのドラッグ＆ドロップ受け入れ

#### 注意点

- Pro / Max / Team / Enterprise プラン対応（無料プラン不可）
- 信頼できるファイルのみで使用する（悪意あるファイルのプロンプトインジェクション対策）
- Claude の変更は必ずレビューしてから確定する
- 外部データアクセスやコマンド実行には事前承認が必要

### 8.3 Claude Cowork（デスクトップエージェント）

Claude Desktop アプリに搭載されたエージェント機能。コーディング不要で、ローカルファイルの操作や複雑なタスクの自律実行が可能。「結果を指示して、離席して、完成品を受け取る」というワークフローを実現する。

#### セットアップ

1. https://claude.com/download から Claude Desktop 最新版をダウンロード
2. アプリを起動 → 上部のモードセレクタで **「Chat」→「Cowork」** に切り替え
3. タスクを記述 → Claude のアプローチを確認 → 承認して実行開始

**対応環境:**

| プラットフォーム | 対応日 |
|-----------------|--------|
| macOS（ユニバーサル） | 2026年1月12日〜 |
| Windows（x64） | 2026年2月10日〜 |

Pro / Max プラン対応。

#### 基本的な使い方

| カテゴリ | サンプル指示 |
|---------|-------------|
| **ファイル整理** | 「Downloads フォルダを種類別に整理して」 |
| **レポート作成** | 「この会議メモ3つから要点をまとめたレポートを作って」 |
| **経費処理** | 「レシート写真のフォルダから経費一覧Excelを作って」 |
| **プレゼン作成** | 「このメモからPowerPointスライドを作って」 |
| **データ分析** | 「このCSVの外れ値を検出して統計レポートを作って」 |
| **リサーチ** | 「Web検索してこのトピックの調査レポートをまとめて」 |

#### サンプル: 経費レポートの自動作成

```
指示: 「receipts フォルダのレシート写真から経費一覧を作成して」
```

Claude の動作:
1. フォルダ内の全画像を読み取り
2. 各レシートから日付・店名・金額を抽出
3. Excel ファイルを生成（VLOOKUP数式・合計行付き）
4. カテゴリ別の円グラフを追加

#### サンプル: スキルの保存と再利用

一度手動で実行したタスクを「スキル」として保存し、再利用できる:

1. Cowork でタスクを実行（例: 「週次レポートを作成」）
2. 完了後、「このプロセスをスキルとして保存して」と指示
3. 次回から保存したスキルを選ぶだけで同じ処理を再実行

#### プラグインシステム

11個のオープンソースプラグインで外部ツールと連携:

| カテゴリ | 機能例 |
|---------|-------|
| 営業 | CRM データの取得・更新 |
| 法務 | 法的文書のドラフト作成 |
| 金融 | スプレッドシート分析 |
| マーケティング | コンテンツ作成 |
| データ分析 | CSV/Excel の統計処理 |

#### カスタマイズ

- **グローバル設定**: 設定 > Cowork > Global Instructions でトーンや書式の指定
- **フォルダ別コンテキスト**: プロジェクトフォルダに固有の指示を紐付け

#### 注意点

- セッション間のメモリは保持されない（毎回新規）
- デスクトップアプリを閉じるとタスクが中断される
- 通常のチャットより大幅にトークンを消費する
- 簡単な質問は通常チャット、複雑なタスクに Cowork と使い分ける

---

## 9. 他ツールとの比較

### 9.1 Claude Code vs Cursor

| 観点 | Claude Code | Cursor |
|------|-------------|--------|
| **最適な用途** | 大規模リファクタリング、CI/CD連携、スクリプト作業 | 日常的なコーディング、UI開発、ペアプログラミング |
| **学習コスト** | 中〜高（CLI操作が必要） | 低（VSCodeと同じUI） |
| **カスタマイズ性** | 非常に高い（Hooks, Agents, MCP） | 中程度（.cursorrules, 拡張機能） |
| **チーム開発** | Agent Teams で並列処理 | 個人利用中心 |
| **非エンジニア** | 不向き | 適している |

### 9.2 Claude Code vs GitHub Copilot

| 観点 | Claude Code | GitHub Copilot |
|------|-------------|----------------|
| **操作方式** | エージェント型（自律実行） | 補完提案型 |
| **ファイル操作** | 複数ファイルの同時変更可能 | エディタ内の補完中心 |
| **テスト実行** | 直接実行して結果を分析 | テストコード生成のみ |
| **Git 操作** | コミット、PR作成まで一貫 | 限定的 |

### 9.3 使い分けの指針

```
日常のコーディング → Cursor（AI IDE）
  ↓
大規模な変更・自動化 → Claude Code（CLI エージェント）
  ↓
コード補完のみ必要 → GitHub Copilot
```

---

## 10. よくある質問（FAQ）

### Q1: Claude Code は無料で使えますか？

Claude Code 自体のインストールは無料だが、利用には認証が必要。API キー（従量課金）または Claude Pro/Max サブスクリプションのいずれかが必要。

### Q2: オフラインで使えますか？

使えない。Claude Code は Anthropic の API にリアルタイムで通信するため、インターネット接続が必須。

### Q3: どの言語に対応していますか？

特定の言語に限定されない。Claude はほぼ全てのプログラミング言語に対応しており、Python, JavaScript/TypeScript, Rust, Go, Java, C/C++, Ruby, PHP など主要言語をサポートしている。

### Q4: プライベートなコードは安全ですか？

Anthropic の API 利用規約に準拠する。API 経由で送信されたコードは Anthropic のモデルトレーニングには使用されないとされている。詳細は Anthropic のプライバシーポリシーを確認すること。

### Q5: Claude Code と claude.ai の違いは？

- **claude.ai**: ブラウザベースのチャットインターフェース
- **Claude Code**: ターミナルベースのエージェンティックコーディングツール

Claude Code はプロジェクトのファイルシステムに直接アクセスし、コマンドを実行できる点が大きな違い。

### Q6: Windows で使えますか？

はい。ネイティブ Windows 対応と WSL（Windows Subsystem for Linux）の両方で利用可能。

### Q7: コンテキストウィンドウはどれくらいですか？

Claude のモデルに依存する。Claude Sonnet 4.5 / Haiku 4.5 では 200K トークン、Opus 4.6 では 200K（1M トークンのベータ対応あり）のコンテキストウィンドウを持つ。ただし、大きなコンテキストではコストが増加するため、適切な管理が重要。

---

## 11. 参考リンク

| リソース | URL |
|----------|-----|
| Anthropic 公式ドキュメント | https://docs.anthropic.com/en/docs/claude-code/overview |
| Claude Code Getting Started | https://docs.anthropic.com/en/docs/claude-code/getting-started |
| Claude Code Settings | https://docs.anthropic.com/en/docs/claude-code/settings |
| Claude Code Hooks | https://docs.anthropic.com/en/docs/claude-code/hooks |
| Claude Code MCP | https://docs.anthropic.com/en/docs/claude-code/mcp |
| Claude Code Agent SDK | https://docs.anthropic.com/en/docs/claude-code/sdk |
| Model Context Protocol | https://modelcontextprotocol.io/ |
| Claude 料金ページ | https://www.anthropic.com/pricing |
| Anthropic API リファレンス | https://docs.anthropic.com/en/api |
| Claude Code GitHub | https://github.com/anthropics/claude-code |

---

> **注意**: この資料は 2026年2月時点の情報に基づいている。Claude Code は活発に開発が進んでいるため、最新情報は公式ドキュメントを確認すること。特に料金体系やモデルのバージョンは変更される可能性がある。
