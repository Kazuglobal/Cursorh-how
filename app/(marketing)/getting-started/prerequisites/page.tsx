import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Callout } from "@/components/content/callout"
import { CheckCircle2, Terminal, Globe, FileCode, Settings } from "lucide-react"

export const metadata: Metadata = {
  title: "前提知識チェック - AIコーディングツールを始める前に",
  description: "Cursor、Claude Code、Manus AIを始める前に確認すべき前提知識をチェックしましょう。",
}

interface ChecklistItemProps {
  readonly title: string
  readonly description: string
  readonly icon: React.ReactNode
  readonly status: "required" | "recommended" | "optional"
}

function ChecklistItem({ title, description, icon, status }: ChecklistItemProps) {
  const statusConfig = {
    required: {
      label: "必須",
      className: "border-red-500 bg-red-50 dark:bg-red-950/30",
      iconColor: "text-red-600 dark:text-red-400",
    },
    recommended: {
      label: "推奨",
      className: "border-amber-500 bg-amber-50 dark:bg-amber-950/30",
      iconColor: "text-amber-600 dark:text-amber-400",
    },
    optional: {
      label: "任意",
      className: "border-green-500 bg-green-50 dark:bg-green-950/30",
      iconColor: "text-green-600 dark:text-green-400",
    },
  }

  const config = statusConfig[status]

  return (
    <div className={`rounded-lg border p-4 ${config.className}`}>
      <div className="flex items-start gap-3">
        <div className={`mt-1 ${config.iconColor}`}>
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-semibold">{title}</h4>
            <span className="text-xs px-2 py-0.5 rounded-full bg-background/50 font-medium">
              {config.label}
            </span>
          </div>
          <p className="text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default function PrerequisitesPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-3">前提知識チェック</h1>
        <p className="text-lg text-muted-foreground">
          AIコーディングツールを始める前に、必要な前提知識を確認しましょう。
          不足している項目があれば、先に学習することをおすすめします。
        </p>
      </div>

      <Callout type="info" title="チェックの見方">
        <strong>必須</strong>: 最低限必要な知識・スキル<br />
        <strong>推奨</strong>: あると学習がスムーズ<br />
        <strong>任意</strong>: なくても始められるが、あると便利
      </Callout>

      {/* 完全な初心者向け */}
      <section>
        <h2 className="text-2xl font-bold mb-6">完全な初心者（プログラミング未経験）</h2>
        <div className="space-y-4">
          <ChecklistItem
            status="required"
            title="ファイルとフォルダの概念を理解している"
            description="ファイル・フォルダ（ディレクトリ）の違い、ファイルパス（C:\Users\..., /home/...）の意味を理解している。"
            icon={<FileCode className="h-5 w-5" />}
          />

          <ChecklistItem
            status="required"
            title="テキストエディタでファイルを編集できる"
            description="メモ帳などのテキストエディタでファイルを開き、内容を編集して保存できる。"
            icon={<FileCode className="h-5 w-5" />}
          />

          <ChecklistItem
            status="recommended"
            title="インターネットで検索して情報を探せる"
            description="エラーメッセージをGoogle検索して、解決方法を見つけられる。公式ドキュメントを読める。"
            icon={<Globe className="h-5 w-5" />}
          />

          <ChecklistItem
            status="optional"
            title="英語の技術文書を読める"
            description="DeepL や Google 翻訳を使えば英語のドキュメントも読める。多くの情報は英語で書かれています。"
            icon={<Globe className="h-5 w-5" />}
          />
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">学習リソース</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <strong>ファイルとパス:</strong>{" "}
              <a href="https://developer.mozilla.org/ja/docs/Learn/Getting_started_with_the_web" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                MDN Web Docs - Web 入門
              </a>
            </p>
            <p>
              <strong>検索スキル:</strong>{" "}
              <a href="https://www.google.com/search/howsearchworks/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                Google 検索の仕組み
              </a>
            </p>
          </CardContent>
        </Card>
      </section>

      {/* プログラミング経験あり向け */}
      <section>
        <h2 className="text-2xl font-bold mb-6">プログラミング経験あり</h2>
        <div className="space-y-4">
          <ChecklistItem
            status="required"
            title="ターミナル / コマンドプロンプトを開ける"
            description="Windows: コマンドプロンプト or PowerShell、Mac/Linux: ターミナルを起動できる。"
            icon={<Terminal className="h-5 w-5" />}
          />

          <ChecklistItem
            status="required"
            title="基本的なコマンドを実行できる"
            description="cd（ディレクトリ移動）、ls/dir（ファイル一覧）、mkdir（フォルダ作成）などの基本コマンドを使える。"
            icon={<Terminal className="h-5 w-5" />}
          />

          <ChecklistItem
            status="recommended"
            title="Git の基本操作ができる"
            description="git clone, git add, git commit, git push などの基本操作を理解している。"
            icon={<FileCode className="h-5 w-5" />}
          />

          <ChecklistItem
            status="recommended"
            title="環境変数の概念を理解している"
            description="環境変数とは何か、どうやって設定するかを知っている。API キーなどの管理に使います。"
            icon={<Settings className="h-5 w-5" />}
          />

          <ChecklistItem
            status="optional"
            title="VSCode を使ったことがある"
            description="Cursor は VSCode ベースなので、VSCode に慣れていると学習が早いです。"
            icon={<FileCode className="h-5 w-5" />}
          />
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">学習リソース</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <strong>ターミナル入門:</strong>{" "}
              <a href="https://qiita.com/tags/terminal" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                Qiita - ターミナルの使い方
              </a>
            </p>
            <p>
              <strong>Git 入門:</strong>{" "}
              <a href="https://git-scm.com/book/ja/v2" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                Pro Git（日本語版）
              </a>
            </p>
            <p>
              <strong>環境変数:</strong>{" "}
              <a href="https://learn.microsoft.com/ja-jp/windows/win32/procthread/environment-variables" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                Windows 環境変数（Microsoft Learn）
              </a>
            </p>
          </CardContent>
        </Card>
      </section>

      {/* OS 別の前提条件 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">OS 別の前提条件</h2>

        <div className="space-y-6">
          {/* Windows */}
          <Card>
            <CardHeader>
              <CardTitle>Windows</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <ChecklistItem
                  status="required"
                  title="Windows 10 / 11（64bit）"
                  description="Claude Code、Cursor ともに Windows 10 以降が必要です。"
                  icon={<CheckCircle2 className="h-5 w-5" />}
                />

                <ChecklistItem
                  status="recommended"
                  title="Node.js インストール済み"
                  description="Claude Code は Node.js 18 以上が必要。https://nodejs.org/ からダウンロードしてインストール。"
                  icon={<Settings className="h-5 w-5" />}
                />

                <ChecklistItem
                  status="optional"
                  title="WSL（Windows Subsystem for Linux）"
                  description="Linux 環境が必要な場合は WSL をセットアップ。Claude Code は Windows ネイティブでも動作します。"
                  icon={<Terminal className="h-5 w-5" />}
                />
              </div>

              <Callout type="tip" title="Windows 特有の注意点">
                パスの区切り文字は `\`（バックスラッシュ）です。コマンドによっては `/`（スラッシュ）も使えます。
                管理者権限が必要な操作もあるので、コマンドプロンプトを「管理者として実行」する方法を覚えておきましょう。
              </Callout>
            </CardContent>
          </Card>

          {/* Mac */}
          <Card>
            <CardHeader>
              <CardTitle>Mac</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <ChecklistItem
                  status="required"
                  title="macOS 12 (Monterey) 以降"
                  description="Claude Code、Cursor ともに macOS 12 以降が必要です。"
                  icon={<CheckCircle2 className="h-5 w-5" />}
                />

                <ChecklistItem
                  status="recommended"
                  title="Homebrew インストール済み"
                  description="パッケージ管理ツール。Claude Code のインストールに使えます。https://brew.sh/ja/"
                  icon={<Settings className="h-5 w-5" />}
                />

                <ChecklistItem
                  status="optional"
                  title="Rosetta 2（M1/M2 Mac）"
                  description="Apple Silicon Mac の場合、一部のツールで Rosetta 2 が必要になることがあります。"
                  icon={<Settings className="h-5 w-5" />}
                />
              </div>

              <Callout type="tip" title="Mac 特有の注意点">
                初回起動時に「開発元が未確認のため開けません」と表示される場合があります。
                システム環境設定 → セキュリティとプライバシー で許可してください。
              </Callout>
            </CardContent>
          </Card>

          {/* Linux */}
          <Card>
            <CardHeader>
              <CardTitle>Linux</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <ChecklistItem
                  status="required"
                  title="Ubuntu 20.04 以降（または同等のディストリビューション）"
                  description="Claude Code は主に Ubuntu でテストされています。他のディストリでも動作する場合があります。"
                  icon={<CheckCircle2 className="h-5 w-5" />}
                />

                <ChecklistItem
                  status="recommended"
                  title="Node.js インストール済み"
                  description="Node.js 18 以上が必要。apt / dnf / pacman などでインストールできます。"
                  icon={<Settings className="h-5 w-5" />}
                />

                <ChecklistItem
                  status="recommended"
                  title="sudo 権限"
                  description="グローバルインストールには sudo が必要な場合があります。"
                  icon={<Terminal className="h-5 w-5" />}
                />
              </div>

              <Callout type="tip" title="Linux 特有の注意点">
                ディストリビューションによってパッケージ管理コマンドが異なります（apt、dnf、pacman など）。
                公式ドキュメントで自分のディストリに合った方法を確認してください。
              </Callout>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 次のステップ */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>前提知識を確認したら</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              不足している知識があれば、上記の学習リソースで補いましょう。
              準備ができたら、学習ロードマップを確認して、計画的に学習を進めましょう。
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/getting-started/roadmap">
                <Button variant="primary">学習ロードマップを見る</Button>
              </Link>
              <Link href="/getting-started/glossary">
                <Button variant="outline">用語集を見る</Button>
              </Link>
              <Link href="/getting-started">
                <Button variant="outline">ツール選択ガイドに戻る</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
