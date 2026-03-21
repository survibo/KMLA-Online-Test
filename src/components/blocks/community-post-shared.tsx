import { EllipsisVertical, MessageCircle, ThumbsUp } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import type { CommunityPost, CommunityUser } from "./community-post-types"

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

export function CommunityAvatar({
  author,
  size = "md",
}: {
  author: CommunityUser
  size?: "sm" | "md"
}) {
  const avatarSize = size === "sm" ? "default" : "lg"
  const className = size === "sm" ? "size-9" : "size-10"

  return (
    <Avatar size={avatarSize} className={cn("shrink-0", className)}>
      <AvatarImage src={author.img} alt={author.name} />
      <AvatarFallback className="bg-gradient-to-b from-zinc-100 to-zinc-300 font-semibold text-zinc-600">
        {getInitials(author.name)}
      </AvatarFallback>
    </Avatar>
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
      <div className="flex items-center gap-2.5">
        <CommunityAvatar author={author} size="md" />
        <div className="space-y-0.5">
          <p className="text-[1.05rem] leading-5 font-semibold tracking-tight text-zinc-900">
            {author.name}
          </p>
          <p className="text-[0.875rem] leading-5 font-medium text-zinc-500">
            {createdAt}
          </p>
        </div>
      </div>

      {showMenu ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-full text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
              aria-label="More options"
            >
              <EllipsisVertical className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem>Share</DropdownMenuItem>
            <DropdownMenuItem>Save</DropdownMenuItem>
            <DropdownMenuItem variant="destructive">Report</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
  const likes = post.reaction_count ?? post.post_reactions?.length ?? 0
  const comments = post.comment_count ?? 0

  return (
    <div className={cn("flex items-center gap-1.5 text-zinc-500", className)}>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-8 rounded-full px-2.5 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
      >
        <ThumbsUp className="size-4.5" strokeWidth={2.2} />
        <span className="font-medium">{likes}</span>
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-8 rounded-full px-2.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
      >
        <MessageCircle className="size-4.5" strokeWidth={2.2} />
        <span className="font-medium">{comments}</span>
      </Button>
    </div>
  )
}
