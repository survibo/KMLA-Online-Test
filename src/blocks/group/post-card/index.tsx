import { useState, type ReactNode } from "react"

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
  trailing?: ReactNode
  commentsOpen?: boolean
  onCommentClick?: () => void
  onCommentsOpenChange?: (open: boolean) => void
}

export function GroupPostCard({
  post,
  timeVariant = "absolute",
  className,
  trailing,
  commentsOpen,
  onCommentClick,
  onCommentsOpenChange,
}: GroupPostCardProps) {
  const [localCommentsOpen, setLocalCommentsOpen] = useState(false)
  const commentItems = post.post_comments ?? []
  const isCommentsOpen = commentsOpen ?? localCommentsOpen
  const isCommentsControlled =
    commentsOpen !== undefined || Boolean(onCommentClick || onCommentsOpenChange)

  function handleCommentsOpenChange(nextOpen: boolean) {
    if (onCommentsOpenChange) {
      onCommentsOpenChange(nextOpen)
      return
    }

    setLocalCommentsOpen(nextOpen)
  }

  function handleCommentClick() {
    if (onCommentClick) {
      onCommentClick()
      return
    }

    handleCommentsOpenChange(true)
  }

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
            trailing={trailing}
            onCommentClick={handleCommentClick}
          />
        </div>
      </article>

      {!isCommentsControlled ? (
        <GroupPostCommentsDrawer
          open={isCommentsOpen}
          onOpenChange={handleCommentsOpenChange}
          commentItems={commentItems}
          postAuthorId={post.author_id}
        />
      ) : null}
    </>
  )
}
