import { EllipsisVertical, MessageCircle, ThumbsUp } from "lucide-react"

import "./styles.css"

import { formatIsoDateTime, formatRelativeTime } from "@/lib/datetime"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import type {
  GroupPost,
  GroupComment,
  GroupPostImage,
  GroupUser,
} from "./types"

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

export function GroupAvatar({
  author,
  size = "md",
}: {
  author: GroupUser
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

export function GroupPostHeader({
  author,
  createdAt,
  timeVariant = "absolute",
  showMenu = false,
}: {
  author: GroupUser
  createdAt: string
  timeVariant?: "absolute" | "relative"
  showMenu?: boolean
}) {
  const formattedCreatedAt =
    timeVariant === "relative"
      ? formatRelativeTime(createdAt)
      : formatIsoDateTime(createdAt)

  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-center gap-2.5">
        <GroupAvatar author={author} size="md" />
        <div className="space-y-0.5">
          <p className="text-[1.05rem] leading-5 font-semibold tracking-tight text-zinc-900">
            {author.name}
          </p>
          <p className="text-[0.875rem] leading-5 font-medium text-zinc-500">
            {formattedCreatedAt}
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

export function GroupPostStats({
  post,
  className,
  onCommentClick,
}: {
  post: GroupPost
  className?: string
  onCommentClick?: () => void
}) {
  const likes = post.reaction_count ?? post.post_reactions?.length ?? 0
  const comments = post.comment_count ?? 0

  return (
    <div className={cn("flex items-center gap-1 text-zinc-500", className)}>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="group-post-action-like"
      >
        <ThumbsUp className="size-4.5" strokeWidth={2.2} />
        <span className="font-medium">{likes}</span>
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="group-post-action-comment"
        onClick={onCommentClick}
      >
        <MessageCircle className="size-4.5" strokeWidth={2.2} />
        <span className="font-medium">{comments}</span>
      </Button>
    </div>
  )
}

type GroupCommentMeta = {
  item: GroupComment
  depth: number
  replyCount: number
}

function countDirectReplies(commentItems: GroupComment[], parentId: string) {
  return commentItems.filter((item) => item.parent_id === parentId).length
}

export function flattenGroupComments(commentItems: GroupComment[]) {
  const sortedCommentItems = [...commentItems].sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  )
  const commentMap = new Map(sortedCommentItems.map((item) => [item.id, item]))
  const childMap = new Map<string | null, GroupComment[]>()

  function getTopLevelParentId(comment: GroupComment) {
    let currentParentId = comment.parent_id ?? null

    while (currentParentId) {
      const parentComment = commentMap.get(currentParentId)
      if (!parentComment?.parent_id) return parentComment?.id ?? currentParentId
      currentParentId = parentComment.parent_id
    }

    return null
  }

  for (const item of sortedCommentItems) {
    const parentKey = getTopLevelParentId(item)
    const siblings = childMap.get(parentKey) ?? []
    siblings.push(item)
    childMap.set(parentKey, siblings)
  }

  const flattenedComments: GroupCommentMeta[] = []

  function walkComments(parentId: string | null, actualDepth: number) {
    const children = childMap.get(parentId) ?? []

    for (const child of children) {
      const directReplies =
        child.reply_count ?? countDirectReplies(sortedCommentItems, child.id)

      flattenedComments.push({
        item: child,
        depth: Math.min(actualDepth, 1),
        replyCount: directReplies,
      })

      walkComments(child.id, actualDepth + 1)
    }
  }

  walkComments(null, 0)

  return flattenedComments
}

export function getLatestGroupComment(commentItems: GroupComment[] = []) {
  return [...commentItems].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )[0] ?? null
}

function GroupCommentRow({
  item,
  depth,
  replyCount,
}: GroupCommentMeta) {
  const likes = item.comment_reactions?.length ?? 0
  const showReplyCount = depth === 0

  return (
    <div className={cn("flex gap-2.5", depth > 0 && "ml-5")}>
      <div className="pt-1">
        <GroupAvatar author={item.author} size="sm" />
      </div>
      <div className="min-w-0 flex-1 space-y-1">
        <div className="group-post-comment-surface">
          <p className="font-semibold text-zinc-900">{item.author.name}</p>
          <p className="whitespace-pre-line text-zinc-700">{item.content}</p>
        </div>
        <div className="flex flex-wrap items-center gap-1 px-1 text-sm text-zinc-500">
          <span className="px-2 text-[0.8125rem]">
            {formatRelativeTime(item.created_at)}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="group-post-comment-action-like"
          >
            <ThumbsUp className="size-4" strokeWidth={2.2} />
            <span>{likes}</span>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="group-post-comment-action-comment"
          >
            <MessageCircle className="size-4" strokeWidth={2.2} />
            {showReplyCount ? <span>{replyCount}</span> : null}
          </Button>
        </div>
      </div>
    </div>
  )
}

export function GroupCommentThread({
  commentItems = [],
  className,
}: {
  commentItems?: GroupComment[]
  className?: string
}) {
  const flattenedComments = flattenGroupComments(commentItems)

  if (flattenedComments.length === 0) return null

  return (
    <div className={cn("space-y-5", className)}>
      {flattenedComments.map(({ item, ...meta }, index) => (
        <GroupCommentRow
          key={item.id ?? `${item.author.name}-${index}`}
          item={item}
          {...meta}
        />
      ))}
    </div>
  )
}

export function GroupLatestCommentPreview({
  comment,
  className,
}: {
  comment: GroupComment
  className?: string
}) {
  return (
    <div className={cn("group-post-preview-surface flex gap-2.5", className)}>
      <div className="pt-0.5">
        <GroupAvatar author={comment.author} size="sm" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 text-sm">
          <p className="truncate font-semibold text-zinc-900">
            {comment.author.name}
          </p>
          <span className="shrink-0 text-zinc-400">
            {formatRelativeTime(comment.created_at)}
          </span>
        </div>
        <p className="mt-1 line-clamp-2 whitespace-pre-line break-keep text-sm text-zinc-600">
          {comment.content}
        </p>
      </div>
    </div>
  )
}

export function GroupPostGallery({
  images = [],
  className,
  altFallback = "Post attachment preview",
}: {
  images?: GroupPostImage[]
  className?: string
  altFallback?: string
}) {
  const sortedImages = [...images].sort((a, b) => a.sort_order - b.sort_order)
  const totalImageCount = sortedImages.length

  if (totalImageCount === 0) return null

  if (totalImageCount <= 3) {
    const featuredImage = sortedImages[0]

    return (
      <div className={cn("relative overflow-hidden rounded-[1.5rem] bg-zinc-100", className)}>
        <img
          src={featuredImage.url}
          alt={featuredImage.alt ?? altFallback}
          className="aspect-square w-full object-cover"
        />
        {totalImageCount > 1 ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/28 text-6xl font-bold text-white">
            +{totalImageCount - 1}
          </div>
        ) : null}
      </div>
    )
  }

  const visibleImages = sortedImages.slice(0, 4)
  const hiddenCount = totalImageCount - 4

  return (
    <div className={cn("grid grid-cols-2 gap-2", className)}>
      {visibleImages.map((image, index) => {
        const showOverlay = index === 3 && hiddenCount > 0

        return (
          <div
            key={image.id ?? `${image.url}-${index}`}
            className="relative overflow-hidden rounded-[1.5rem] bg-zinc-100"
          >
            <img
              src={image.url}
              alt={image.alt ?? altFallback}
              className="aspect-square w-full object-cover"
            />
            {showOverlay ? (
              <div className="absolute inset-0 flex items-center justify-center bg-black/28 text-5xl font-bold text-white">
                +{hiddenCount}
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
