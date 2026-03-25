import { useNavigation } from "react-router-dom"

import { cn } from "@/lib/utils"

export function TopLoadingBar() {
  const navigation = useNavigation()
  const isLoading = navigation.state !== "idle"

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-[100] h-0.5 overflow-hidden transition-opacity duration-150",
        isLoading ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="relative h-full w-full">
        <div
          className={cn(
            "absolute inset-y-0 left-0 w-[40%] bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.45)] transition-transform duration-200",
            isLoading ? "translate-x-[0%]" : "-translate-x-full"
          )}
        />
        <div
          className={cn(
            "absolute inset-y-0 left-0 w-[28%] bg-emerald-300/90 transition-transform duration-500",
            isLoading ? "translate-x-[180%]" : "-translate-x-full"
          )}
        />
      </div>
    </div>
  )
}
