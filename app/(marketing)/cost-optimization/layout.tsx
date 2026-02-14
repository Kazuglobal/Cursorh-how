import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "コスト最適化ガイド - Cursor・Claude Code・Manus AI",
  description: "AIコーディングツールのコスト削減テクニック、モデル選択ガイド、月間予算シミュレーターを提供します。",
}

export default function CostOptimizationLayout({
  children,
}: {
  readonly children: React.ReactNode
}) {
  return <>{children}</>
}
