import { useState } from "react"
import { MessageCircle, Share2, ThumbsUp } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { formatIsoDateTime, formatRelativeTime } from "@/lib/datetime"
import { cn } from "@/lib/utils"
import type {
  GroupComment,
  GroupPost,
  GroupPostImage,
  GroupUser,
} from "@/blocks/group/types"

import { GroupPostCommentsDrawer } from "./comments-drawer"

type GroupPostCardProps = {
  post: GroupPost
  timeVariant?: "absolute" | "relative"
  className?: string
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

function GroupCardAvatar({
  author,
  className,
}: {
  author: GroupUser
  className?: string
}) {
  return (
    <Avatar size="lg" className={cn("size-10 shrink-0", className)}>
      <AvatarImage src={author.img} alt={author.name} />
      <AvatarFallback className="bg-gradient-to-b from-zinc-100 to-zinc-300 font-semibold text-zinc-600">
        {getInitials(author.name)}
      </AvatarFallback>
    </Avatar>
  )
}

function GroupPostCardHeader({
  author,
  createdAt,
  timeVariant,
}: {
  author: GroupUser
  createdAt: string
  timeVariant: "absolute" | "relative"
}) {
  const formattedCreatedAt =
    timeVariant === "relative"
      ? formatRelativeTime(createdAt)
      : formatIsoDateTime(createdAt)

  return (
    <div className="flex items-start gap-2.5 py-4">
      <GroupCardAvatar author={author} />
      <div>
        <p className="text-[1.05rem] leading-5 font-semibold tracking-tight text-zinc-900">
          {author.name}
        </p>
        <p className="mt-0.5 text-[0.875rem] leading-5 font-medium text-zinc-500">
          {formattedCreatedAt}
        </p>
      </div>
    </div>
  )
}

function GroupPostCardGallery({
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

function getLatestTopLevelGroupComment(commentItems: GroupComment[] = []) {
  return commentItems
    .filter((comment) => comment.parent_id === null)
    .sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )[0] ?? null
}

function GroupLatestCommentPreview({
  comment,
}: {
  comment: GroupComment
}) {
  return (
    <div className="flex gap-2.5 rounded-2xl bg-zinc-50 px-3.5 py-3 my-2">
      <div className="pt-0.5">
        <Avatar size="default" className="size-9 shrink-0">
          <AvatarImage src={comment.author.img} alt={comment.author.name} />
          <AvatarFallback className="bg-gradient-to-b from-zinc-100 to-zinc-300 font-semibold text-zinc-600">
            {getInitials(comment.author.name)}
          </AvatarFallback>
        </Avatar>
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

function GroupPostCardStats({
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
    <div className="flex items-center gap-0.5 -ml-1.5 text-sm text-zinc-500 mb-0.5">
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

export function GroupPostCard({
  post,
  timeVariant = "absolute",
  className,
}: GroupPostCardProps) {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false)
  const commentItems = post.post_comments ?? []
  const latestComment = getLatestTopLevelGroupComment(commentItems)

  return (
    <>
      <article
        className={cn(
          "w-full border-b border-zinc-200 bg-white text-zinc-950",
          className
        )}
      >
        <div className="mx-auto flex w-full max-w-4xl flex-col px-4 sm:px-6">
          <GroupPostCardHeader
            author={post.author}
            createdAt={post.created_at}
            timeVariant={timeVariant}
          />

          <div className="flex flex-col gap-3">
            {post.title || post.content ? (
              <div>
                {post.title ? (
                  <h2 className="text-[1.5rem] leading-[1.08] font-bold tracking-[-0.03em] text-zinc-950">
                    {post.title}
                  </h2>
                ) : null}
                {post.content ? (
                  <p className="mt-2 break-keep text-zinc-600">{post.content}</p>
                ) : null}
              </div>
            ) : null}

            <GroupPostCardGallery
              images={post.post_images}
              altFallback={`${post.title ?? "Post"} attached image`}
            />
          </div>

          {latestComment ? (
            <button
              type="button"
              className="block w-full text-left"
              onClick={() => setIsCommentsOpen(true)}
              aria-label="Open latest comment"
            >
              <GroupLatestCommentPreview comment={latestComment} />
            </button>
          ) : null}

          <GroupPostCardStats
            post={post}
            onCommentClick={() => setIsCommentsOpen(true)}
          />
        </div>
      </article>

      <GroupPostCommentsDrawer
        open={isCommentsOpen}
        onOpenChange={setIsCommentsOpen}
        commentItems={commentItems}
        postAuthorId={post.author_id}
      />
    </>
  )
}
