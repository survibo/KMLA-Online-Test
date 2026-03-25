import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"

const FONT_SCALE_STORAGE_KEY = "app-font-scale"
const DEFAULT_FONT_SCALE = 0.97
const FONT_SCALE_STEP = 0.03

const fontScaleOptions = [
  { value: DEFAULT_FONT_SCALE - FONT_SCALE_STEP, label: "A-" },
  { value: DEFAULT_FONT_SCALE, label: "A" },
  { value: DEFAULT_FONT_SCALE + FONT_SCALE_STEP, label: "A+" },
]

function applyFontScale(scale) {
  document.documentElement.style.setProperty("--app-font-scale", String(scale))
}

function getStoredFontScale() {
  if (typeof window === "undefined") {
    return DEFAULT_FONT_SCALE
  }

  const storedScale = window.localStorage.getItem(FONT_SCALE_STORAGE_KEY)
  const parsedScale = storedScale ? Number(storedScale) : DEFAULT_FONT_SCALE

  return Number.isFinite(parsedScale) ? parsedScale : DEFAULT_FONT_SCALE
}

export function FontScaleControl() {
  const [fontScale, setFontScale] = useState(getStoredFontScale)

  useEffect(() => {
    applyFontScale(fontScale)
  }, [fontScale])

  function handleChange(nextScale) {
    setFontScale(nextScale)
    applyFontScale(nextScale)
    window.localStorage.setItem(FONT_SCALE_STORAGE_KEY, String(nextScale))
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      <div className="flex items-center gap-1 rounded-full border border-zinc-200 bg-white/95 p-1.5 shadow-lg backdrop-blur">
        {fontScaleOptions.map((option) => (
          <Button
            key={option.label}
            type="button"
            variant={fontScale === option.value ? "default" : "ghost"}
            size="sm"
            className="rounded-full px-3"
            onClick={() => handleChange(option.value)}
            aria-pressed={fontScale === option.value}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
