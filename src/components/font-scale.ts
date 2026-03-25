import { useEffect, useState } from "react"

const FONT_SCALE_STORAGE_KEY = "app-font-scale"
const DEFAULT_FONT_SCALE = 0.97
const FONT_SCALE_STEP = 0.03

export const fontScaleOptions = [
  { value: DEFAULT_FONT_SCALE - FONT_SCALE_STEP, label: "A-" },
  { value: DEFAULT_FONT_SCALE, label: "A" },
  { value: DEFAULT_FONT_SCALE + FONT_SCALE_STEP, label: "A+" },
]

export function applyFontScale(scale: number) {
  document.documentElement.style.setProperty("--app-font-scale", String(scale))
}

export function getStoredFontScale() {
  if (typeof window === "undefined") {
    return DEFAULT_FONT_SCALE
  }

  const storedScale = window.localStorage.getItem(FONT_SCALE_STORAGE_KEY)
  const parsedScale = storedScale ? Number(storedScale) : DEFAULT_FONT_SCALE

  return Number.isFinite(parsedScale) ? parsedScale : DEFAULT_FONT_SCALE
}

export function useFontScaleControl() {
  const [fontScale, setFontScale] = useState(getStoredFontScale)

  useEffect(() => {
    applyFontScale(fontScale)
  }, [fontScale])

  function handleChange(nextScale: number) {
    setFontScale(nextScale)
    applyFontScale(nextScale)
    window.localStorage.setItem(FONT_SCALE_STORAGE_KEY, String(nextScale))
  }

  return {
    fontScale,
    setFontScale: handleChange,
  }
}
