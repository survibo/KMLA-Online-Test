import { useState } from "react"

import { cn } from "@/lib/utils"
import type { GroupPost } from "@/blocks/group/types"
import {
  GroupPostContent,
  GroupPostHeader,
  GroupPostStats,
} from "@/blocks/group/shared"

import { GroupPostCommentsDrawer } from "./comments-drawer"

type GroupPostCardProps = {
  post: GroupPost
  timeVariant?: "absolute" | "relative"
  className?: string
}

export function GroupPostCard({
  post,
  timeVariant = "absolute",
  className,
}: GroupPostCardProps) {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false)
  const commentItems = post.post_comments ?? []

  return (
    <>
      <article
        className={cn(
          "w-full border-b-2 border-zinc-300 bg-white text-zinc-950",
          className
        )}
      >
        <div className="mx-auto flex w-full max-w-4xl flex-col px-4 sm:px-6">
          <GroupPostHeader
            author={post.author}
            createdAt={post.created_at}
            timeVariant={timeVariant}
          />

          <GroupPostContent post={post} />

          <GroupPostStats
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
