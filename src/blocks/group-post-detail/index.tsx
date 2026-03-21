import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  GroupCommentThread,
  GroupPostGallery,
  GroupPostHeader,
  GroupPostStats,
} from "@/blocks/group-post-shared"
import { cn } from "@/lib/utils"
import type {
  GroupComment,
  GroupPost,
} from "@/blocks/group-post-types"

type GroupPostDetailProps = {
  post: GroupPost
  commentItems?: GroupComment[]
  className?: string
}

export function GroupPostDetail({
  post,
  commentItems = [],
  className,
}: GroupPostDetailProps) {
  const images = post.post_images ?? []

  return (
    <section className={cn("w-full bg-white", className)}>
      <div className="mx-auto w-full max-w-[560px]">
        <Card className="rounded-none border-0 bg-white py-0 shadow-none ring-0">
          <CardContent className="space-y-5 px-4 py-4 sm:px-6">
            <GroupPostHeader
              author={post.author}
              createdAt={post.created_at}
              timeVariant="absolute"
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

            <GroupPostGallery images={images} />

            <GroupPostStats post={post} />

            {commentItems.length > 0 ? (
              <div className="space-y-5">
                <Separator className="bg-zinc-200" />
                <GroupCommentThread commentItems={commentItems} />
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
