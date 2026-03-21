import type { ReactNode } from "react"
import { MessageCircle, Share2, ThumbsUp } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { formatIsoDateTime, formatRelativeTime } from "@/lib/datetime"
import { cn } from "@/lib/utils"
import type {
  GroupPost,
  GroupPostImage,
  GroupUser,
} from "@/blocks/group/types"

export function getGroupInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

export function GroupPostAvatar({
  author,
  size = "lg",
  className,
}: {
  author: GroupUser
  size?: "xs" | "sm" | "lg"
  className?: string
}) {
  const avatarClassName =
    size === "xs" ? "size-7" : size === "sm" ? "size-9" : "size-10"
  const avatarSize = size === "lg" ? "lg" : "default"

  return (
    <Avatar size={avatarSize} className={cn(avatarClassName, "shrink-0", className)}>
      <AvatarImage src={author.img} alt={author.name} />
      <AvatarFallback className="bg-gradient-to-b from-zinc-100 to-zinc-300 font-semibold text-zinc-600">
        {getGroupInitials(author.name)}
      </AvatarFallback>
    </Avatar>
  )
}

export function GroupPostHeader({
  author,
  createdAt,
  timeVariant = "absolute",
  trailing,
}: {
  author: GroupUser
  createdAt: string
  timeVariant?: "absolute" | "relative"
  trailing?: ReactNode
}) {
  const formattedCreatedAt =
    timeVariant === "relative"
      ? formatRelativeTime(createdAt)
      : formatIsoDateTime(createdAt)

  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex min-w-0 items-start gap-2.5">
        <GroupPostAvatar author={author} />
        <div className="min-w-0">
          <p className="text-[1.05rem] leading-5 font-semibold tracking-tight text-zinc-900">
            {author.name}
          </p>
          <p className="mt-0.5 text-[0.875rem] leading-5 font-medium text-zinc-500">
            {formattedCreatedAt}
          </p>
        </div>
      </div>

      {trailing ? <div className="shrink-0">{trailing}</div> : null}
    </div>
  )
}

export function GroupPostContent({
  post,
  className,
}: {
  post: GroupPost
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {post.title || post.content ? (
        <div>
          {post.title ? (
            <h2 className="text-[1.35rem] leading-[1.12] font-bold tracking-[-0.03em] text-zinc-950">
              {post.title}
            </h2>
          ) : null}
          {post.content ? (
            <p className="mt-2 whitespace-pre-line break-keep text-zinc-600">
              {post.content}
            </p>
          ) : null}
        </div>
      ) : null}

      <GroupPostGallery
        images={post.post_images}
        altFallback={`${post.title ?? "Post"} attached image`}
      />
    </div>
  )
}

export function GroupPostGallery({
  images = [],
  altFallback = "Post attachment preview",
}: {
  images?: GroupPostImage[]
  altFallback?: string
}) {
  const sortedImages = [...images].sort((a, b) => a.sort_order - b.sort_order)
  const featuredImage = sortedImages[0]

  if (!featuredImage) return null

  return (
    <div className="relative overflow-hidden rounded-[1.5rem] bg-zinc-100">
      <img
        src={featuredImage.url}
        alt={featuredImage.alt ?? altFallback}
        className="aspect-square w-full object-cover"
      />
      {sortedImages.length > 1 ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/28 text-6xl font-bold text-white">
          +{sortedImages.length - 1}
        </div>
      ) : null}
    </div>
  )
}

export function GroupPostStats({
  post,
  onCommentClick,
}: {
  post: GroupPost
  onCommentClick?: () => void
}) {
  const likes = post.reaction_count ?? post.post_reactions?.length ?? 0
  const comments =
    post.comment_count ??
    post.post_comments?.filter((comment) => comment.parent_id === null).length ??
    0

  return (
    <div className="-ml-1.5 flex items-center gap-0.5 text-sm text-zinc-500">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-10 justify-start gap-1 px-2 py-0 text-[0.95rem] text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600 [&_svg]:size-5.5"
      >
        <ThumbsUp className="size-5" strokeWidth={2.2} />
        <span className="font-medium">{likes}</span>
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-10 justify-start gap-1 px-2 py-0 text-[0.95rem] text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 [&_svg]:size-5.5"
        onClick={onCommentClick}
      >
        <MessageCircle className="size-5" strokeWidth={2.2} />
        <span className="font-medium">{comments}</span>
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-10 justify-start gap-1 px-2 py-0 text-[0.95rem] text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 [&_svg]:size-5.5"
        aria-label="Share post"
      >
        <Share2 className="size-5" strokeWidth={2.2} />
      </Button>
    </div>
  )
}

export function GroupPostSummary({
  post,
  timeVariant = "absolute",
  trailing,
  onCommentClick,
  className,
}: {
  post: GroupPost
  timeVariant?: "absolute" | "relative"
  trailing?: ReactNode
  onCommentClick?: () => void
  className?: string
}) {
  return (
    <div className={cn("space-y-3", className)}>
      <GroupPostHeader
        author={post.author}
        createdAt={post.created_at}
        timeVariant={timeVariant}
        trailing={trailing}
      />
      <div className="space-y-0.5">
        <GroupPostContent post={post} />
        <GroupPostStats post={post} onCommentClick={onCommentClick} />
      </div>
    </div>
  )
}
