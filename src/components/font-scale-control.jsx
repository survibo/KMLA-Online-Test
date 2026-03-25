import { Button } from "@/components/ui/button"
import { fontScaleOptions, useFontScaleControl } from "@/components/font-scale"

export function FontScaleControl() {
  const { fontScale, setFontScale } = useFontScaleControl()

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
            onClick={() => setFontScale(option.value)}
            aria-pressed={fontScale === option.value}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
