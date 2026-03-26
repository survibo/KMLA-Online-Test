import { SquarePen } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

import { ProfileContent } from "./content"
import type { ProfileData } from "./types"
import "./styles.css"

type ProfileProps = {
  data: ProfileData
  className?: string
}

const profileActions = [
  { id: "info", label: "정보" },
  { id: "conversation", label: "대화하기" },
  { id: "posts", label: "글 목록" },
] as const

export function Profile({ data, className }: ProfileProps) {
  const initials = data.rawUser.name.slice(0, 2)

  return (
    <section className={cn("relative flex min-h-screen flex-col overflow-hidden bg-background", className)}>
      <div className="profile-hero h-[15rem] shrink-0 bg-background" aria-hidden="true" />

      <div className="-mt-[4.25rem] flex flex-1 flex-col rounded-t-[2rem] bg-card px-6 pb-10 shadow-[0_-1px_0_color-mix(in_oklch,var(--border)_75%,transparent),0_-18px_48px_color-mix(in_oklch,var(--foreground)_5%,transparent)] sm:px-8">
        <div className="relative flex justify-center">
          <Avatar className="-mt-[5.5rem] h-[10.75rem] w-[10.75rem] border-[5px] border-background shadow-[0_12px_30px_color-mix(in_oklch,var(--foreground)_10%,transparent)] sm:h-[12.5rem] sm:w-[12.5rem]">
            <AvatarImage src={data.avatarUrl} alt={data.displayName} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </div>

        <div className="mt-[1.5rem]">
          <div className="relative flex items-center justify-center">
            <h1 className="text-center text-[2rem] leading-none font-semibold tracking-tight text-text-strong">
              {data.displayName}
            </h1>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 size-10 rounded-full text-text-soft hover:bg-secondary hover:text-text-strong"
              aria-label="Edit profile"
            >
              <SquarePen className="size-5" strokeWidth={2.1} />
            </Button>
          </div>
          {data.subtitle ? (
            <p className="text-center text-sm text-text-soft">{data.subtitle}</p>
          ) : null}
        </div>

        <Tabs value={data.activeAction} className="mt-6 flex flex-1 flex-col">
          <TabsList
            variant="line"
            className="flex w-full flex-wrap justify-center gap-3 bg-transparent p-0"
          >
            {profileActions.map((action) => (
              <TabsTrigger
                key={action.id}
                value={action.id}
                className="min-w-[6.75rem] rounded-full border border-border bg-background px-5 py-2 font-semibold text-text-strong after:hidden hover:bg-secondary data-active:border-brand-green! data-active:bg-brand-green! data-active:text-brand-green-foreground! data-active:hover:bg-brand-green!"
              >
                {action.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <ProfileContent data={data} />
        </Tabs>
      </div>
    </section>
  )
}
