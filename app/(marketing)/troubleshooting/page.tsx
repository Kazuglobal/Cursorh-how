import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Callout } from "@/components/content/callout"
import { CodeBlock } from "@/components/content/code-block"
import { AlertTriangle, Terminal, Shield, Globe, Settings, HelpCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "トラブルシューティング - よくあるエラーと解決方法",
  description: "Cursor、Claude Code、Manus AIでよく遭遇するエラーとその解決方法を網羅的に解説します。",
}

interface TroubleshootItemProps {
  readonly title: string
  readonly error?: string
  readonly cause: string
  readonly solution: string
  readonly code?: { bash?: string; windows?: string; mac?: string }
  readonly tips?: string
}

function TroubleshootItem({ title, error, cause, solution, code, tips }: TroubleshootItemProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-1" />
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 p-3">
            <p className="text-xs font-semibold text-red-900 dark:text-red-200 mb-1">エラーメッセージ:</p>
            <code className="text-sm font-mono text-red-800 dark:text-red-300">{error}</code>
          </div>
        )}

        <div>
          <h5 className="text-sm font-semibold mb-2">🔍 原因</h5>
          <p className="text-sm text-muted-foreground">{cause}</p>
        </div>

        <div>
          <h5 className="text-sm font-semibold mb-2">✅ 解決方法</h5>
          <p className="text-sm leading-relaxed mb-3">{solution}</p>

          {code && (
            <div className="space-y-3">
              {code.windows && (
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2">Windows:</p>
                  <CodeBlock code={code.windows} language="bash" />
                </div>
              )}
              {code.mac && (
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2">Mac/Linux:</p>
                  <CodeBlock code={code.mac} language="bash" />
                </div>
              )}
              {code.bash && !code.windows && !code.mac && (
                <CodeBlock code={code.bash} language="bash" />
              )}
            </div>
          )}
        </div>

        {tips && (
          <Callout type="tip">
            {tips}
          </Callout>
        )}
      </CardContent>
    </Card>
  )
}

export default function TroubleshootingPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-3">トラブルシューティング</h1>
        <p className="text-lg text-muted-foreground">
          AIコーディングツールでよく遭遇するエラーと、その解決方法を網羅的に解説します。
        </p>
      </div>

      <Callout type="info" title="解決しない場合">
        このページで解決しない場合は、各ツールの公式ドキュメントやコミュニティフォーラムを参照してください。
        詳細は <Link href="/getting-started" className="text-primary hover:underline">はじめに</Link> ページのリンクをご覧ください。
      </Callout>

      {/* インストール関連 */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Terminal className="h-6 w-6" />
          インストール関連のエラー
        </h2>
        <div className="space-y-6">
          <TroubleshootItem
            title="1. 「コマンドが見つかりません」（command not found）"
            error="claude: command not found"
            cause="npm グローバルインストールのパスが環境変数 PATH に含まれていない。または、インストールが正しく完了していない。"
            solution="npm のグローバルパスを確認し、PATH に追加します。"
            code={{
              windows: `# 1. npm グローバルパスを確認
npm config get prefix
# 例: C:\\Users\\YourName\\AppData\\Roaming\\npm

# 2. 環境変数 PATH に追加（システム環境変数の編集から）
# 「Path」変数に上記のパスを追加

# 3. コマンドプロンプトを再起動
claude --version`,
              mac: `# 1. npm グローバルパスを確認
npm config get prefix
# 例: /usr/local

# 2. PATH に追加（~/.bashrc または ~/.zshrc）
echo 'export PATH="$PATH:$(npm config get prefix)/bin"' >> ~/.zshrc
source ~/.zshrc

# 3. 確認
claude --version`,
            }}
            tips="Windows の場合、管理者権限でコマンドプロンプトを開くことで解決することもあります。"
          />

          <TroubleshootItem
            title="2. Node.js のバージョンエラー"
            error="Error: Claude Code requires Node.js 18 or higher"
            cause="インストールされている Node.js のバージョンが古い（18未満）。"
            solution="Node.js を最新版（LTS推奨）にアップグレードします。"
            code={{
              bash: `# 現在のバージョン確認
node --version

# Node.js をアップグレード
# Windows/Mac: https://nodejs.org/ から最新版をダウンロード

# Mac（Homebrew使用）:
brew upgrade node

# バージョン確認
node --version  # v18.x.x 以上であればOK`,
            }}
            tips="nvm (Node Version Manager) を使うと、複数のNode.jsバージョンを切り替えられて便利です。"
          />

          <TroubleshootItem
            title="3. プロキシ環境でのインストールエラー"
            error="npm ERR! network request to https://registry.npmjs.org/... failed, reason: connect ETIMEDOUT"
            cause="企業ネットワークなどのプロキシ環境で、npm が外部に接続できない。"
            solution="npm にプロキシ設定を追加します。"
            code={{
              bash: `# プロキシ設定（HTTPとHTTPS）
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080

# 認証が必要な場合
npm config set proxy http://username:password@proxy.company.com:8080

# 設定確認
npm config list

# インストール再試行
npm install -g @anthropics/claude-code`,
            }}
            tips="プロキシのアドレスとポートは、社内のIT部門に確認してください。"
          />
        </div>
      </section>

      {/* 認証関連 */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Shield className="h-6 w-6" />
          認証関連のエラー
        </h2>
        <div className="space-y-6">
          <TroubleshootItem
            title="4. API キー認証エラー"
            error="Error: Invalid API key provided"
            cause="APIキーが正しく設定されていない、または無効なキーを使用している。"
            solution="Anthropic Console から正しいAPIキーを取得し、環境変数に設定します。"
            code={{
              windows: `# 1. Anthropic Console で API キーを確認
# https://console.anthropic.com/settings/keys

# 2. 環境変数に設定
# スタートメニュー → 「環境変数」で検索 → システム環境変数の編集
# 変数名: ANTHROPIC_API_KEY
# 値: sk-ant-api03-...

# 3. コマンドプロンプトを再起動して確認
echo %ANTHROPIC_API_KEY%`,
              mac: `# 1. Anthropic Console で API キーを確認
# https://console.anthropic.com/settings/keys

# 2. ~/.zshrc または ~/.bashrc に追加
echo 'export ANTHROPIC_API_KEY="sk-ant-api03-..."' >> ~/.zshrc
source ~/.zshrc

# 3. 確認
echo $ANTHROPIC_API_KEY`,
            }}
            tips=".env ファイルに API キーを書く場合、必ず .gitignore に追加して、コミットしないようにしましょう。"
          />

          <TroubleshootItem
            title="5. Pro/Max アカウントでのログインエラー"
            error="Authentication failed. Please try logging in again."
            cause="ブラウザのクッキーが無効、または認証トークンの有効期限切れ。"
            solution="ブラウザでClaude.ai にログインし直してから、再度認証を試みます。"
            code={{
              bash: `# 1. ブラウザで Claude.ai にログイン
# https://claude.ai/

# 2. Claude Code で再認証
claude auth login

# 3. ブラウザが自動で開き、認証を求められる
# 「Allow」をクリック

# 4. ターミナルに戻って確認
claude --version`,
            }}
            tips="複数のClaudeアカウントを持っている場合、ブラウザのプロファイル機能を使って分けると管理しやすいです。"
          />
        </div>
      </section>

      {/* 実行時エラー */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Settings className="h-6 w-6" />
          実行時エラー
        </h2>
        <div className="space-y-6">
          <TroubleshootItem
            title="6. コンテキストウィンドウ超過エラー"
            error="Error: Maximum context length exceeded"
            cause="一度に大量のファイルやチャット履歴を読み込んで、AIの処理可能な上限を超えた。"
            solution="コンテキストを削減します。"
            code={{
              bash: `# 方法1: チャット履歴を圧縮
/compact

# 方法2: 必要なファイルのみを @file で指定
# 例: @src/App.tsx このファイルだけを改善して

# 方法3: .claudeignore で不要なファイルを除外
# .claudeignore に以下を追加:
node_modules/
dist/
build/
*.log`,
            }}
            tips="Claude Code の場合、/compact コマンドで履歴を要約できます。Cursor の場合、新しいチャットを開始しましょう。"
          />

          <TroubleshootItem
            title="7. パーミッションエラー（危険なコマンド実行）"
            error="Permission denied: This command requires explicit approval"
            cause="危険なコマンド（rm -rf, git push --force など）を実行しようとして、事前承認が必要。"
            solution="意図的な操作であれば、確認画面で「Allow」を選択します。自動承認したい場合は設定を変更します。"
            code={{
              bash: `# ~/.claude/settings.json で事前承認を設定
{
  "allowedCommands": {
    "git": ["add", "commit", "push"],
    "npm": ["install", "run"]
  }
}`,
            }}
            tips="git push --force や rm -rf など、破壊的なコマンドは絶対に自動承認しないでください。"
          />

          <TroubleshootItem
            title="8. VSCode 拡張が動作しない"
            error="（サイドバーに Claude アイコンが表示されない）"
            cause="拡張機能が正しくインストールされていない、または無効化されている。"
            solution="VSCode を完全に再起動し、拡張機能を再インストールします。"
            code={{
              bash: `# 1. VSCode を完全に終了（タスクマネージャーで確認）

# 2. VSCode を再起動

# 3. 拡張機能パネルで「Claude Code」を検索

# 4. 無効になっている場合は「有効化」をクリック

# 5. Output パネルで「Claude Code」を選択してログを確認`,
            }}
            tips="他のAI拡張（GitHub Copilot など）と競合している可能性があります。一時的に無効化して試してみましょう。"
          />
        </div>
      </section>

      {/* OS別の問題 */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Globe className="h-6 w-6" />
          OS別の問題
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Windows */}
          <Card>
            <CardHeader>
              <CardTitle>Windows 特有の問題</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <h5 className="font-semibold mb-1">パスの区切り文字エラー</h5>
                <p className="text-muted-foreground mb-2">
                  Windows は `\` ですが、一部のコマンドは `/` を要求します。
                </p>
                <CodeBlock code={`# ✅ 正しい（Windows）
cd C:\\Users\\Name\\project

# ⚠️ ツールによっては / も使える
cd C:/Users/Name/project`} language="bash" />
              </div>

              <div>
                <h5 className="font-semibold mb-1">管理者権限が必要</h5>
                <p className="text-muted-foreground">
                  npm install -g やシステム設定変更には管理者権限が必要です。
                  コマンドプロンプトを「管理者として実行」してください。
                </p>
              </div>

              <div>
                <h5 className="font-semibold mb-1">WSL との併用</h5>
                <p className="text-muted-foreground">
                  WSL (Ubuntu) と Windows 環境で Node.js を別々にインストールする必要があります。
                  混同しないように注意。
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Mac */}
          <Card>
            <CardHeader>
              <CardTitle>Mac 特有の問題</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <h5 className="font-semibold mb-1">「開発元が未確認」エラー</h5>
                <p className="text-muted-foreground mb-2">
                  Cursor や Claude Code の初回起動時に表示されることがあります。
                </p>
                <ol className="list-decimal list-inside text-muted-foreground space-y-1">
                  <li>システム環境設定 → セキュリティとプライバシー</li>
                  <li>「このまま開く」をクリック</li>
                </ol>
              </div>

              <div>
                <h5 className="font-semibold mb-1">Homebrew パスの問題</h5>
                <p className="text-muted-foreground mb-2">
                  M1/M2 Mac では Homebrew のパスが異なります。
                </p>
                <CodeBlock code={`# Intel Mac
/usr/local/bin

# Apple Silicon Mac
/opt/homebrew/bin`} language="bash" />
              </div>

              <div>
                <h5 className="font-semibold mb-1">Rosetta 2</h5>
                <p className="text-muted-foreground">
                  一部のツールは Rosetta 2 が必要です。
                  <code className="text-xs">softwareupdate --install-rosetta</code> でインストール。
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Linux */}
          <Card>
            <CardHeader>
              <CardTitle>Linux 特有の問題</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <h5 className="font-semibold mb-1">パーミッションエラー</h5>
                <p className="text-muted-foreground mb-2">
                  sudo なしでグローバルインストールするには、npm の prefix を変更します。
                </p>
                <CodeBlock code={`mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc`} language="bash" />
              </div>

              <div>
                <h5 className="font-semibold mb-1">ディストリビューション別</h5>
                <p className="text-muted-foreground">
                  Ubuntu: apt、Fedora: dnf、Arch: pacman など、
                  パッケージマネージャーが異なります。公式ドキュメントで確認してください。
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* その他のヒント */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <HelpCircle className="h-6 w-6" />
          その他のトラブルシューティングヒント
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">デバッグ方法</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><strong>1. バージョン確認</strong></p>
              <CodeBlock code="claude --version\nnode --version\nnpm --version" language="bash" />

              <p><strong>2. ログ確認</strong></p>
              <p className="text-muted-foreground">
                Claude Code: <code>~/.claude/logs/</code><br />
                VSCode: Output パネル → 「Claude Code」
              </p>

              <p><strong>3. キャッシュクリア</strong></p>
              <CodeBlock code="# npm キャッシュクリア\nnpm cache clean --force" language="bash" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">問い合わせ前のチェックリスト</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm list-disc list-inside text-muted-foreground">
                <li>最新バージョンにアップデートしたか</li>
                <li>公式ドキュメントを確認したか</li>
                <li>エラーメッセージを Google 検索したか</li>
                <li>既知の問題（GitHub Issues）を確認したか</li>
                <li>再現手順を明確にできるか</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* サポートリソース */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>さらにヘルプが必要な場合</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-semibold mb-2">Claude Code</h5>
                <ul className="space-y-1 text-muted-foreground">
                  <li>
                    <a href="https://docs.anthropic.com/claude/docs/claude-code" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                      公式ドキュメント
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/anthropics/claude-code/issues" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                      GitHub Issues
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold mb-2">Cursor</h5>
                <ul className="space-y-1 text-muted-foreground">
                  <li>
                    <a href="https://docs.cursor.com/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                      公式ドキュメント
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/getcursor/cursor/discussions" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                      GitHub Discussions
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <Link href="/getting-started">
                <Button variant="outline">はじめにガイドに戻る</Button>
              </Link>
              <Link href="/getting-started/glossary">
                <Button variant="outline">用語集を見る</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
