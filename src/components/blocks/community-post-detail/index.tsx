import { ThumbsUp } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
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

function CommentRow({ item }: { item: CommunityComment }) {
  const likes = item.comment_reactions?.length ?? 0

  return (
    <div className={cn("flex gap-3", item.parent_id && "ml-14")}>
      <CommunityAvatar author={item.author} size="sm" />
      <div className="min-w-0 flex-1 space-y-1.5">
        <div className="rounded-3xl bg-zinc-100 px-4 py-3">
          <p className="font-semibold text-zinc-900">{item.author.name}</p>
          <p className="whitespace-pre-line text-zinc-700">{item.content}</p>
        </div>
        <div className="flex items-center gap-3 px-2 text-sm text-zinc-500">
          <span>{item.created_at}</span>
          <span className="inline-flex items-center gap-1 text-emerald-600">
            <ThumbsUp className="size-4" strokeWidth={2.2} />
            {likes}
          </span>
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
  const visibleImages = images.slice(0, 3)

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
              <div className="space-y-5 border-t border-zinc-200 pt-5">
                {commentItems.map((item, index) => (
                  <CommentRow key={item.id ?? `${item.author.name}-${index}`} item={item} />
                ))}
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
