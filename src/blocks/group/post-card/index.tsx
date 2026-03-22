import { useState } from "react"

import { cn } from "@/lib/utils"
import type { GroupPost } from "@/blocks/group/types"
import {
  GroupPostSummary,
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
          "w-full border-b-2 border-border bg-background text-foreground",
          className
        )}
      >
        <div className="mx-auto w-full max-w-4xl px-4 pt-3 sm:px-6">
          <GroupPostSummary
            post={post}
            timeVariant={timeVariant}
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
