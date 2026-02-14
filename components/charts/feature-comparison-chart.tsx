'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ToolFeatures {
  [key: string]: number // 0-10のスコア
}

interface Tool {
  name: string
  color: string
  features: ToolFeatures
}

const AXES = [
  { label: 'コード補完', key: 'completion' },
  { label: 'Chat機能', key: 'chat' },
  { label: '自動化', key: 'automation' },
  { label: '価格', key: 'price' },
  { label: '学習容易性', key: 'ease' },
  { label: '機能豊富さ', key: 'features' },
]

const TOOLS: Tool[] = [
  {
    name: 'Cursor',
    color: 'cyan',
    features: {
      completion: 9,
      chat: 8,
      automation: 7,
      price: 8,
      ease: 10,
      features: 8,
    },
  },
  {
    name: 'Claude Code',
    color: 'amber',
    features: {
      completion: 8,
      chat: 9,
      automation: 10,
      price: 9,
      ease: 7,
      features: 10,
    },
  },
  {
    name: 'Manus AI',
    color: 'violet',
    features: {
      completion: 5,
      chat: 8,
      automation: 9,
      price: 6,
      ease: 9,
      features: 8,
    },
  },
]

const colorMap = {
  cyan: {
    bg: 'bg-cyan-500/10',
    bar: 'bg-cyan-500',
    border: 'border-cyan-500',
    text: 'text-cyan-700 dark:text-cyan-400',
  },
  amber: {
    bg: 'bg-amber-500/10',
    bar: 'bg-amber-500',
    border: 'border-amber-500',
    text: 'text-amber-700 dark:text-amber-400',
  },
  violet: {
    bg: 'bg-violet-500/10',
    bar: 'bg-violet-500',
    border: 'border-violet-500',
    text: 'text-violet-700 dark:text-violet-400',
  },
}

interface SVGRadarChartProps {
  tool: Tool
  size?: number
  opacity?: number
}

function SVGRadarChart({ tool, size = 200, opacity = 0.3 }: SVGRadarChartProps) {
  const center = size / 2
  const maxRadius = size / 2 - 20
  const angleSlice = (Math.PI * 2) / AXES.length

  // グリッドラインを計算
  const gridLines = []
  for (let i = 1; i <= 2; i++) {
    const radius = (maxRadius / 10) * (i * 5)
    const points = AXES.map((_, idx) => {
      const angle = angleSlice * idx - Math.PI / 2
      const x = center + radius * Math.cos(angle)
      const y = center + radius * Math.sin(angle)
      return `${x},${y}`
    }).join(' ')
    gridLines.push(points)
  }

  // データポイントを計算
  const dataPoints = AXES.map((axis, idx) => {
    const angle = angleSlice * idx - Math.PI / 2
    const value = tool.features[axis.key] / 10
    const radius = maxRadius * value
    const x = center + radius * Math.cos(angle)
    const y = center + radius * Math.sin(angle)
    return `${x},${y}`
  }).join(' ')

  const colors = colorMap[tool.color as keyof typeof colorMap]

  return (
    <svg width={size} height={size} className="mx-auto">
      {/* グリッド */}
      {gridLines.map((points, idx) => (
        <polygon
          key={idx}
          points={points}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-muted-foreground/30"
        />
      ))}

      {/* データポリゴン */}
      <polygon
        points={dataPoints}
        fill="currentColor"
        fillOpacity={opacity}
        stroke="currentColor"
        strokeWidth="2"
        className={colors.text}
      />

      {/* ドット */}
      {AXES.map((_, idx) => {
        const angle = angleSlice * idx - Math.PI / 2
        const value = 10
        const radius = (maxRadius / 10) * value
        const x = center + radius * Math.cos(angle)
        const y = center + radius * Math.sin(angle)
        return (
          <circle
            key={idx}
            cx={x}
            cy={y}
            r="3"
            className={colors.text}
          />
        )
      })}

      {/* ラベル */}
      {AXES.map((axis, idx) => {
        const angle = angleSlice * idx - Math.PI / 2
        const labelRadius = maxRadius + 25
        const x = center + labelRadius * Math.cos(angle)
        const y = center + labelRadius * Math.sin(angle)
        return (
          <text
            key={axis.key}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-xs font-medium fill-muted-foreground"
          >
            {axis.label}
          </text>
        )
      })}
    </svg>
  )
}

export function FeatureComparisonChart() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null)

  return (
    <Card>
      <CardHeader>
        <CardTitle>機能比較チャート</CardTitle>
        <p className="text-sm text-muted-foreground mt-2">
          6つの軸からツールの特性を可視化。ツールをクリックで詳細表示
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* ラダーチャートグリッド */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TOOLS.map((tool) => {
            const colors = colorMap[tool.color as keyof typeof colorMap]
            const isSelected = selectedTool === tool.name

            return (
              <div key={tool.name} className="text-center">
                <button
                  onClick={() =>
                    setSelectedTool(isSelected ? null : tool.name)
                  }
                  className={cn(
                    'w-full rounded-lg border-2 p-4 transition-all duration-300',
                    isSelected
                      ? `${colors.bg} ${colors.border} ring-2 ring-offset-2 ring-offset-background`
                      : 'border-border hover:border-primary/30'
                  )}
                >
                  <h3
                    className={cn(
                      'text-lg font-bold mb-4',
                      colors.text
                    )}
                  >
                    {tool.name}
                  </h3>

                  {/* SVG チャート */}
                  <SVGRadarChart
                    tool={tool}
                    size={220}
                    opacity={isSelected ? 0.4 : 0.2}
                  />
                </button>

                {/* 詳細スコア表示 */}
                {isSelected && (
                  <div className="mt-4 space-y-2 text-left">
                    {AXES.map((axis) => {
                      const score = tool.features[axis.key]
                      return (
                        <div key={axis.key} className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              {axis.label}
                            </span>
                            <span
                              className={cn(
                                'font-semibold tabular-nums',
                                colors.text
                              )}
                            >
                              {score}/10
                            </span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className={cn(
                                'h-full rounded-full transition-all duration-300',
                                colors.bar
                              )}
                              style={{ width: `${score * 10}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* 選択ボタン */}
        <div className="pt-4 border-t flex justify-center gap-3">
          {TOOLS.map((tool) => {
            const colors = colorMap[tool.color as keyof typeof colorMap]

            return (
              <Button
                key={tool.name}
                variant={selectedTool === tool.name ? 'primary' : 'outline'}
                size="sm"
                onClick={() =>
                  setSelectedTool(selectedTool === tool.name ? null : tool.name)
                }
                className={
                  selectedTool === tool.name
                    ? `${colors.bg} ${colors.text} border-${tool.color}-500`
                    : ''
                }
              >
                {tool.name}
              </Button>
            )
          })}
        </div>

        {/* 解説テキスト */}
        <div className="rounded-lg bg-muted p-4">
          <h4 className="font-semibold text-sm mb-2">見方:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>
              • <strong>コード補完:</strong> 自動補完・インライン提案の質
            </li>
            <li>
              • <strong>Chat機能:</strong> 質問・対話機能の充実度
            </li>
            <li>
              • <strong>自動化:</strong> 大規模コード変更・自動実行機能
            </li>
            <li>
              • <strong>価格:</strong> コストパフォーマンス（高いほど安い）
            </li>
            <li>
              • <strong>学習容易性:</strong> セットアップ・習得の難易度
            </li>
            <li>
              • <strong>機能豊富さ:</strong> 総合的な機能数の多さ
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
