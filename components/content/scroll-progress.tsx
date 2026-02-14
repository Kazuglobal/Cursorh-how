"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(scrollProgress)
    }

    // 初期値設定
    updateProgress()

    // スクロールイベントリスナー
    window.addEventListener("scroll", updateProgress, { passive: true })
    window.addEventListener("resize", updateProgress, { passive: true })

    return () => {
      window.removeEventListener("scroll", updateProgress)
      window.removeEventListener("resize", updateProgress)
    }
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-1 bg-muted"
      role="progressbar"
      aria-label="ページスクロール進捗"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn(
          "h-full transition-all duration-150 ease-out",
          "bg-gradient-to-r from-primary via-primary/80 to-primary"
        )}
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
