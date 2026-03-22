import { EllipsisVertical, MessageCircle, ThumbsUp } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { formatRelativeTime } from "@/lib/datetime"
import { cn } from "@/lib/utils"
import type { GroupComment, GroupPost } from "@/blocks/group/types"
import {
  createGroupDetailCommentThread,
  type GroupCommentMeta,
} from "@/blocks/group/comment-thread"
import {
  GroupPostAvatar,
  GroupPostSummary,
} from "@/blocks/group/shared"

type GroupPostDetailProps = {
  post: GroupPost
  commentItems?: GroupComment[]
  className?: string
}

type GroupCommentRowProps = GroupCommentMeta & {
  postAuthorId?: string
}

function GroupCommentRow({
  item,
  depth,
  replyCount,
  parentAuthorName,
  postAuthorId,
}: GroupCommentRowProps) {
  const isPostAuthor = item.author_id === postAuthorId

  return (
    <div className={cn("flex gap-2.5", depth > 0 && "ml-7")}>
      <div className="pt-1">
        <GroupPostAvatar author={item.author} size={depth > 0 ? "xs" : "sm"} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="py-0.5">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <p className="font-semibold text-text-strong">{item.author.name}</p>
            {isPostAuthor ? (
              <span className="text-[0.8125rem] font-medium text-text-faint">
                작성자
              </span>
            ) : null}
            <span className="text-[0.8125rem] text-text-faint">
              {formatRelativeTime(item.created_at)}
            </span>
          </div>
          <p className="mt-0.5 whitespace-pre-line text-text-strong">
            {parentAuthorName ? (
              <span className="mr-1.5 font-medium text-sky-600 dark:text-sky-400">
                @{parentAuthorName}
              </span>
            ) : null}
            {item.content}
          </p>
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-0.5 -ml-1.5 text-sm text-text-faint">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 justify-start gap-1 px-1.5 py-0 text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600"
          >
            <ThumbsUp className="size-4" strokeWidth={2.2} />
            <span>{item.comment_reactions?.length ?? 0}</span>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 justify-start gap-1 px-1.5 py-0 text-text-faint hover:bg-muted hover:text-text-strong"
          >
            <MessageCircle className="size-4" strokeWidth={2.2} />
            {depth === 0 ? <span>{replyCount}</span> : null}
          </Button>
        </div>
      </div>
    </div>
  )
}

function GroupCommentThread({
  commentItems = [],
  postAuthorId,
}: {
  commentItems?: GroupComment[]
  postAuthorId?: string
}) {
  const flattenedComments = createGroupDetailCommentThread(commentItems)

  if (flattenedComments.length === 0) return null

  return (
    <div className="flex flex-col gap-2">
      {flattenedComments.map(({ item, ...meta }, index) => (
        <GroupCommentRow
          key={item.id ?? `${item.author.name}-${index}`}
          item={item}
          postAuthorId={postAuthorId}
          {...meta}
        />
      ))}
    </div>
  )
}

export function GroupPostDetail({
  post,
  commentItems = [],
  className,
}: GroupPostDetailProps) {
  return (
    <section className={cn("w-full bg-background", className)}>
      <div className="mx-auto w-full max-w-4xl px-4 py-4 sm:px-6">
          <GroupPostSummary
            post={post}
            trailing={
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="rounded-full text-text-faint hover:bg-muted hover:text-text-strong"
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
            }
          />

          {commentItems.length > 0 ? (
            <div className="space-y-5">
              <Separator className="bg-border" />
              <GroupCommentThread
                commentItems={commentItems}
                postAuthorId={post.author_id}
              />
            </div>
          ) : null}
        </div>
    </section>
  )
}
