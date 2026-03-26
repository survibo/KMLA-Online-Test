import type { ReactNode } from "react"

import { MainFooter } from "@/blocks/main/footer"
import { cn } from "@/lib/utils"
import type { MainContentFooterData } from "./types"

type MainContentFooterProps = {
  data: MainContentFooterData
  children?: ReactNode
  className?: string
}

export function MainContentFooter({
  data,
  children,
  className,
}: MainContentFooterProps) {
  return (
    <section className={cn("flex min-h-screen flex-col bg-background", className)}>
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">{children}</div>
      <MainFooter embedded data={data.footer} />
    </section>
  )
}
