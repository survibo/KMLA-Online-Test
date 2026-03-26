import type { ReactNode } from "react"

import { MainFooter } from "@/blocks/main/footer"
import { MainHeader } from "@/blocks/main/header"
import { cn } from "@/lib/utils"
import type { MainHeaderContentFooterData } from "./types"

type MainHeaderContentFooterProps = {
  data: MainHeaderContentFooterData
  children?: ReactNode
  className?: string
}

export function MainHeaderContentFooter({
  data,
  children,
  className,
}: MainHeaderContentFooterProps) {
  return (
    <section className={cn("flex min-h-screen flex-col bg-background", className)}>
      <MainHeader data={data.header} />
      <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
      <MainFooter embedded data={data.footer} />
    </section>
  )
}

