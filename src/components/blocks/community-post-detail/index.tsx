import { MessageCircle, ThumbsUp } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  CommunityAvatar,
  CommunityPostHeader,
  CommunityPostStats,
} from "@/components/blocks/community-post-shared"
import { cn } from "@/lib/utils"
import type {
  CommunityComment,
  CommunityPost,
  CommunityPostImage,
} from "@/components/blocks/community-post-types"

type CommunityPostDetailProps = {
  post: CommunityPost
  commentItems?: CommunityComment[]
  className?: string
}

type CommentMeta = {
  item: CommunityComment
  depth: number
  replyCount: number
  replyToName?: string
}

function ImageMosaic({
  images = [],
  hiddenImageCount = 0,
}: {
  images?: CommunityPostImage[]
  hiddenImageCount?: number
}) {
  const totalImageCount = images.length + hiddenImageCount

  if (images.length === 0) return null

  const [featuredImage, secondImage, thirdImage] = images

  if (totalImageCount === 1) {
    return (
      <div className="overflow-hidden rounded-[1.5rem] bg-zinc-100">
        <img
          src={featuredImage.url}
          alt={featuredImage.alt ?? "Post attachment preview"}
          className="h-auto w-full object-cover"
        />
      </div>
    )
  }

  if (totalImageCount === 2) {
    return (
      <div className="relative overflow-hidden rounded-[1.5rem] bg-zinc-100">
        <img
          src={featuredImage.url}
          alt={featuredImage.alt ?? "Post attachment preview"}
          className="h-auto w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/28 text-6xl font-bold text-white">
          +1
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-[1.05fr_0.95fr] gap-2">
      <div className="overflow-hidden rounded-[1.5rem] bg-zinc-100">
        <img
          src={featuredImage.url}
          alt={featuredImage.alt ?? "Post attachment preview"}
          className="h-full min-h-[420px] w-full object-cover"
        />
      </div>

      <div className="grid gap-2">
        {[secondImage, thirdImage].filter(Boolean).map((image, index) => {
          const remainingCount = totalImageCount - 2
          const showOverlay = index === 1 && remainingCount > 1

          return (
            <div
              key={image.id ?? `${image.url}-${index}`}
              className="relative overflow-hidden rounded-[1.5rem] bg-zinc-100"
            >
              <img
                src={image.url}
                alt={image.alt ?? "Post attachment preview"}
                className="h-[206px] w-full object-cover"
              />
              {showOverlay ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black/25 text-6xl font-bold text-white">
                  +{remainingCount - 1}
                </div>
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function CommentRow({
  item,
  depth,
  replyCount,
  replyToName,
}: CommentMeta) {
  const likes = item.comment_reactions?.length ?? 0

  return (
    <div className={cn("flex gap-3", depth > 0 && "ml-14")}>
      <CommunityAvatar author={item.author} size="sm" />
      <div className="min-w-0 flex-1 space-y-1.5">
        <div className="rounded-3xl bg-zinc-100 px-4 py-3">
          <p className="font-semibold text-zinc-900">{item.author.name}</p>
          <p className="whitespace-pre-line text-zinc-700">
            {replyToName ? (
              <span className="mr-1 font-medium text-zinc-500">
                @{replyToName}
              </span>
            ) : null}
            {item.content}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-1 px-1 text-sm text-zinc-500">
          <span className="px-2 text-[0.8125rem]">{item.created_at}</span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 rounded-full px-2 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
          >
            <ThumbsUp className="size-4" strokeWidth={2.2} />
            <span>{likes}</span>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 rounded-full px-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
          >
            <MessageCircle className="size-4" strokeWidth={2.2} />
            <span>{replyCount}</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export function CommunityPostDetail({
  post,
  commentItems = [],
  className,
}: CommunityPostDetailProps) {
  const images = post.post_images ?? []
  const hiddenImageCount = Math.max(images.length - 3, 0)
  const visibleImages = [...images]
    .sort((a, b) => a.sort_order - b.sort_order)
    .slice(0, 3)
  const sortedCommentItems = [...commentItems].sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  )
  const commentMap = new Map(sortedCommentItems.map((item) => [item.id, item]))
  const childMap = new Map<string | null, CommunityComment[]>()

  for (const item of sortedCommentItems) {
    const parentKey = item.parent_id ?? null
    const siblings = childMap.get(parentKey) ?? []
    siblings.push(item)
    childMap.set(parentKey, siblings)
  }

  const flattenedComments: CommentMeta[] = []

  function walkComments(parentId: string | null, actualDepth: number) {
    const children = childMap.get(parentId) ?? []

    for (const child of children) {
      const directReplies = child.reply_count ?? childMap.get(child.id)?.length ?? 0
      const parentComment = child.parent_id ? commentMap.get(child.parent_id) : undefined
      const isNestedReply = actualDepth >= 2

      flattenedComments.push({
        item: child,
        depth: Math.min(actualDepth, 1),
        replyCount: directReplies,
        replyToName: isNestedReply ? parentComment?.author.name : undefined,
      })

      walkComments(child.id, actualDepth + 1)
    }
  }

  walkComments(null, 0)

  return (
    <section className={cn("w-full bg-white", className)}>
      <div className="mx-auto w-full max-w-[560px]">
        <Card className="rounded-none border-0 bg-white py-0 shadow-none ring-0">
          <CardContent className="space-y-5 px-4 py-4 sm:px-6">
            <CommunityPostHeader
              author={post.author}
              createdAt={post.created_at}
              showMenu
            />

            {post.title || post.content ? (
              <div className="space-y-2.5">
                {post.title ? (
                  <h2 className="text-[1.5rem] leading-[1.08] font-bold tracking-[-0.03em] text-zinc-950">
                    {post.title}
                  </h2>
                ) : null}
                {post.content ? (
                  <p className="whitespace-pre-line break-keep text-zinc-600">
                    {post.content}
                  </p>
                ) : null}
              </div>
            ) : null}

            <div className="space-y-4">
              <ImageMosaic
                images={visibleImages}
                hiddenImageCount={hiddenImageCount}
              />
            </div>

            <CommunityPostStats post={post} />

            {commentItems.length > 0 ? (
              <div className="space-y-5">
                <Separator className="bg-zinc-200" />
                {flattenedComments.map(({ item, ...meta }, index) => (
                  <CommentRow
                    key={item.id ?? `${item.author.name}-${index}`}
                    item={item}
                    {...meta}
                  />
                ))}
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
