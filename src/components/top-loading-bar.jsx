import { useEffect, useState } from "react"
import { useNavigation } from "react-router-dom"

import { cn } from "@/lib/utils"

const INITIAL_PROGRESS = 12
const MAX_IN_FLIGHT_PROGRESS = 84

export function TopLoadingBar() {
  const navigation = useNavigation()
  const isLoading = navigation.state !== "idle"
  const [isVisible, setIsVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (isLoading) {
      setIsVisible(true)
      setProgress((currentProgress) =>
        currentProgress > 0 ? currentProgress : INITIAL_PROGRESS
      )

      const timer = window.setInterval(() => {
        setProgress((currentProgress) => {
          if (currentProgress >= MAX_IN_FLIGHT_PROGRESS) {
            return currentProgress
          }

          const remaining = MAX_IN_FLIGHT_PROGRESS - currentProgress
          const step = Math.max(remaining * 0.18, 1.6)

          return Math.min(currentProgress + step, MAX_IN_FLIGHT_PROGRESS)
        })
      }, 120)

      return () => {
        window.clearInterval(timer)
      }
    }

    if (!isVisible) {
      return
    }

    setProgress(100)

    const hideTimer = window.setTimeout(() => {
      setIsVisible(false)
      setProgress(0)
    }, 220)

    return () => {
      window.clearTimeout(hideTimer)
    }
  }, [isLoading, isVisible])

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-[100] h-[3px] bg-transparent transition-opacity duration-200",
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      <div
        className="h-full bg-linear-to-r from-emerald-300 via-emerald-400 to-emerald-500 shadow-[0_0_14px_rgba(52,211,153,0.45)] transition-[width] duration-200 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
