"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, ChevronLeft, Target, Trophy, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface Question {
  id: number
  question: string
  options: {
    text: string
    scores: { cursor: number; claudeCode: number; manus: number }
  }[]
}

const questions: Question[] = [
  {
    id: 1,
    question: "プログラミング経験は？",
    options: [
      { text: "完全初心者（0-6ヶ月）", scores: { cursor: 10, claudeCode: 3, manus: 8 } },
      { text: "初級者（6ヶ月-2年）", scores: { cursor: 9, claudeCode: 6, manus: 7 } },
      { text: "中級者（2-5年）", scores: { cursor: 8, claudeCode: 9, manus: 5 } },
      { text: "上級者（5年以上）", scores: { cursor: 7, claudeCode: 10, manus: 4 } },
    ],
  },
  {
    id: 2,
    question: "主な開発環境は？",
    options: [
      { text: "Web開発（React, Next.js等）", scores: { cursor: 10, claudeCode: 9, manus: 5 } },
      { text: "モバイル開発（React Native等）", scores: { cursor: 9, claudeCode: 8, manus: 4 } },
      { text: "データ分析・機械学習", scores: { cursor: 6, claudeCode: 8, manus: 10 } },
      { text: "その他・複数領域", scores: { cursor: 8, claudeCode: 10, manus: 7 } },
    ],
  },
  {
    id: 3,
    question: "1日の開発時間は？",
    options: [
      { text: "2時間未満", scores: { cursor: 6, claudeCode: 8, manus: 7 } },
      { text: "2-4時間", scores: { cursor: 8, claudeCode: 9, manus: 6 } },
      { text: "4-8時間", scores: { cursor: 10, claudeCode: 9, manus: 5 } },
      { text: "8時間以上", scores: { cursor: 10, claudeCode: 8, manus: 4 } },
    ],
  },
  {
    id: 4,
    question: "重視するポイントは？",
    options: [
      { text: "価格（コスパ重視）", scores: { cursor: 7, claudeCode: 10, manus: 6 } },
      { text: "機能の豊富さ", scores: { cursor: 8, claudeCode: 10, manus: 9 } },
      { text: "使いやすさ（GUI）", scores: { cursor: 10, claudeCode: 6, manus: 8 } },
    ],
  },
  {
    id: 5,
    question: "チーム開発ですか？",
    options: [
      { text: "個人開発のみ", scores: { cursor: 9, claudeCode: 8, manus: 10 } },
      { text: "小規模チーム（2-5人）", scores: { cursor: 10, claudeCode: 9, manus: 7 } },
      { text: "中規模以上のチーム", scores: { cursor: 9, claudeCode: 10, manus: 6 } },
    ],
  },
]

interface Result {
  tool: "cursor" | "claudeCode" | "manus"
  name: string
  score: number
  percentage: number
  color: string
  href: string
}

export function ToolQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = optionIndex
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
    }
  }

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const reset = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResult(false)
  }

  const calculateResults = (): Result[] => {
    const scores = { cursor: 0, claudeCode: 0, manus: 0 }

    answers.forEach((answerIndex, questionIndex) => {
      const question = questions[questionIndex]
      const option = question.options[answerIndex]
      scores.cursor += option.scores.cursor
      scores.claudeCode += option.scores.claudeCode
      scores.manus += option.scores.manus
    })

    const total = scores.cursor + scores.claudeCode + scores.manus

    return [
      {
        tool: "cursor" as const,
        name: "Cursor",
        score: scores.cursor,
        percentage: Math.round((scores.cursor / total) * 100),
        color: "cyan",
        href: "/tools/cursor",
      },
      {
        tool: "claudeCode" as const,
        name: "Claude Code",
        score: scores.claudeCode,
        percentage: Math.round((scores.claudeCode / total) * 100),
        color: "amber",
        href: "/tools/claude-code",
      },
      {
        tool: "manus" as const,
        name: "Manus AI",
        score: scores.manus,
        percentage: Math.round((scores.manus / total) * 100),
        color: "violet",
        href: "/tools/manus",
      },
    ].sort((a, b) => b.score - a.score)
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  const colorMap = {
    cyan: {
      bg: "bg-cyan-500/10",
      bar: "bg-cyan-500",
      text: "text-cyan-700 dark:text-cyan-400",
      border: "border-cyan-500",
    },
    amber: {
      bg: "bg-amber-500/10",
      bar: "bg-amber-500",
      text: "text-amber-700 dark:text-amber-400",
      border: "border-amber-500",
    },
    violet: {
      bg: "bg-violet-500/10",
      bar: "bg-violet-500",
      text: "text-violet-700 dark:text-violet-400",
      border: "border-violet-500",
    },
  }

  if (showResult) {
    const results = calculateResults()
    const winner = results[0]
    const colors = colorMap[winner.color as keyof typeof colorMap]

    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <CardTitle>診断結果</CardTitle>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* 最適ツール */}
          <div
            className={cn(
              "rounded-lg border-2 p-6 text-center",
              colors.bg,
              colors.border
            )}
          >
            <p className="text-sm text-muted-foreground mb-2">あなたには</p>
            <h3 className={cn("text-3xl font-bold mb-2", colors.text)}>
              {winner.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">がおすすめです！</p>

            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-sm font-medium">マッチ度:</span>
              <span className={cn("text-2xl font-bold tabular-nums", colors.text)}>
                {winner.percentage}%
              </span>
            </div>

            <div className="w-full h-2 bg-background rounded-full overflow-hidden">
              <div
                className={cn("h-full transition-all duration-1000", colors.bar)}
                style={{ width: `${winner.percentage}%` }}
              />
            </div>
          </div>

          {/* おすすめ理由 */}
          <div className="space-y-3">
            <h4 className="font-semibold">おすすめ理由：</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {winner.tool === "cursor" && (
                <>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span>初心者にも使いやすいGUI</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span>VSCodeユーザーならすぐ慣れる</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span>固定料金で使い放題</span>
                  </li>
                </>
              )}
              {winner.tool === "claudeCode" && (
                <>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span>高度な自動化機能（Agent Teams、Hooks）</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span>従量課金で無駄がない</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span>最新の Claude モデルを使用</span>
                  </li>
                </>
              )}
              {winner.tool === "manus" && (
                <>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-violet-500 mt-0.5 flex-shrink-0" />
                    <span>Web検索・データ分析が強力</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-violet-500 mt-0.5 flex-shrink-0" />
                    <span>ノンコーダーでも使える</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-violet-500 mt-0.5 flex-shrink-0" />
                    <span>自律型AIエージェント</span>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* 他の候補 */}
          <div className="space-y-2 pt-4 border-t">
            <h4 className="font-semibold text-sm">他の候補:</h4>
            {results.slice(1).map((result, index) => {
              const colors = colorMap[result.color as keyof typeof colorMap]
              return (
                <div key={result.tool} className="flex items-center justify-between">
                  <span className="text-sm">
                    {index + 2}位: {result.name}
                  </span>
                  <span className={cn("text-sm font-semibold tabular-nums", colors.text)}>
                    {result.percentage}%
                  </span>
                </div>
              )
            })}
          </div>

          {/* アクション */}
          <div className="flex flex-wrap gap-3 pt-4">
            <Link href={winner.href}>
              <Button className="gap-2">
                {winner.name}を始める
                <ExternalLink className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/compare">
              <Button variant="outline">詳しく比較</Button>
            </Link>
            <Button variant="ghost" onClick={reset}>
              もう一度診断
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const question = questions[currentQuestion]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 mb-4">
          <Target className="h-5 w-5 text-primary" />
          <CardTitle>あなたに最適なツールは？</CardTitle>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              質問 {currentQuestion + 1}/{questions.length}
            </span>
            <span className="font-semibold">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">{question.question}</h3>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-lg border-2 transition-all",
                  "hover:border-primary hover:bg-primary/5",
                  "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                  answers[currentQuestion] === index && "border-primary bg-primary/5"
                )}
              >
                <span className="text-sm font-medium">{option.text}</span>
              </button>
            ))}
          </div>
        </div>

        {currentQuestion > 0 && (
          <Button
            variant="ghost"
            onClick={goBack}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            前の質問に戻る
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
