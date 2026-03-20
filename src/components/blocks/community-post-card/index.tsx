import { cn } from "@/lib/utils"
import { CommunityPostHeader, CommunityPostStats } from "@/components/blocks/community-post-shared"
import type { CommunityPost } from "@/components/blocks/community-post-types"

type CommunityPostCardProps = {
  post: CommunityPost
  className?: string
}

export function CommunityPostCard({ post, className }: CommunityPostCardProps) {
  const primaryImage = post.post_images?.[0]

  return (
    <article
      className={cn(
        "w-full border-b border-zinc-200 bg-white text-zinc-950",
        className
      )}
    >
      <div className="mx-auto w-full max-w-4xl space-y-4 px-4 py-4 sm:px-6">
        <CommunityPostHeader author={post.author} createdAt={post.created_at} />

        <div className="space-y-3">
          {post.title || post.content ? (
            <div className="space-y-2">
              {post.title ? (
                <h2 className="text-[1.5rem] leading-[1.08] font-bold tracking-[-0.03em] text-zinc-950">
                  {post.title}
                </h2>
              ) : null}
              {post.content ? (
                <p className="break-keep text-zinc-600">{post.content}</p>
              ) : null}
            </div>
          ) : null}

          {primaryImage ? (
            <div className="overflow-hidden rounded-[1.5rem] bg-zinc-100">
              <img
                src={primaryImage.url}
                alt={primaryImage.alt ?? `${post.title ?? "Post"} attached image`}
                className="h-auto w-full object-cover"
              />
            </div>
          ) : null}
        </div>

        <CommunityPostStats post={post} />
      </div>
    </article>
  )
}
