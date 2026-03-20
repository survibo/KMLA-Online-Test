import { EllipsisVertical, MessageCircle, ThumbsUp } from "lucide-react"

import { cn } from "@/lib/utils"

import type { CommunityPost, CommunityUser } from "./community-post-types"

export function CommunityAvatar({
  author,
  size = "md",
}: {
  author: CommunityUser
  size?: "sm" | "md"
}) {
  const containerClass = size === "sm" ? "size-10" : "size-11"
  const iconClass = size === "sm" ? "h-5.5 w-5.5" : "h-6.5 w-6.5"
  const headClass = size === "sm" ? "size-3" : "size-3.5"
  const bodyClass = size === "sm" ? "h-2.5 w-5.5" : "h-3 w-6.5"

  if (author.img) {
    return (
      <img
        src={author.img}
        alt={author.name}
        className={cn("shrink-0 rounded-full object-cover", containerClass)}
      />
    )
  }

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-zinc-100 to-zinc-300 text-zinc-500 shadow-sm",
        containerClass
      )}
    >
      <div className={cn("relative", iconClass)}>
        <div
          className={cn(
            "absolute left-1/2 top-0 -translate-x-1/2 rounded-full bg-current/80",
            headClass
          )}
        />
        <div
          className={cn(
            "absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-full bg-current/80",
            bodyClass
          )}
        />
      </div>
      <span className="sr-only">{author.name}</span>
    </div>
  )
}

export function CommunityPostHeader({
  author,
  createdAt,
  showMenu = false,
}: {
  author: CommunityUser
  createdAt: string
  showMenu?: boolean
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-center gap-3">
        <CommunityAvatar author={author} />
        <div className="space-y-0.5">
          <p className="text-[1.15rem] leading-5 font-semibold tracking-tight text-zinc-900">
            {author.name}
          </p>
          <p className="text-[0.95rem] leading-5 font-medium text-zinc-500">
            {createdAt}
          </p>
        </div>
      </div>

      {showMenu ? (
        <button
          type="button"
          className="rounded-full p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800"
          aria-label="More options"
        >
          <EllipsisVertical className="size-5" />
        </button>
      ) : null}
    </div>
  )
}

export function CommunityPostStats({
  post,
  className,
}: {
  post: CommunityPost
  className?: string
}) {
  const likes = post.post_reactions?.length ?? 0
  const comments = post.comment_count ?? 0

  return (
    <div className={cn("flex items-center gap-5 text-zinc-500", className)}>
      <span className="inline-flex items-center gap-2 text-emerald-600">
        <ThumbsUp className="size-5" strokeWidth={2.2} />
        <span className="font-medium">{likes}</span>
      </span>
      <span className="inline-flex items-center gap-2">
        <MessageCircle className="size-5" strokeWidth={2.2} />
        <span className="font-medium">{comments}</span>
      </span>
    </div>
  )
}
