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
  GroupPostAvatar,
  GroupPostSummary,
} from "@/blocks/group/shared"

type GroupPostDetailProps = {
  post: GroupPost
  commentItems?: GroupComment[]
  className?: string
}

type GroupCommentMeta = {
  item: GroupComment
  depth: number
  replyCount: number
  parentAuthorName: string | null
}

type GroupCommentRowProps = GroupCommentMeta & {
  postAuthorId?: string
}

function getParentAuthorName(
  comment: GroupComment,
  commentMap: Map<string, GroupComment>
) {
  if (!comment.parent_id || comment.parent_id === comment.id) {
    return null
  }

  const parentComment = commentMap.get(comment.parent_id)

  if (!parentComment || parentComment.id === comment.id) {
    return null
  }

  if (parentComment.author.id === comment.author.id) {
    return null
  }

  return parentComment.author.name
}

function countDirectReplies(commentItems: GroupComment[], parentId: string) {
  return commentItems.filter((item) => item.parent_id === parentId).length
}

function flattenGroupComments(commentItems: GroupComment[]) {
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
      flattenedComments.push({
        item: child,
        depth: Math.min(actualDepth, 1),
        replyCount:
          child.reply_count ?? countDirectReplies(sortedCommentItems, child.id),
        parentAuthorName: getParentAuthorName(child, commentMap),
      })

      walkComments(child.id, actualDepth + 1)
    }
  }

  walkComments(null, 0)

  return flattenedComments
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
            <p className="font-semibold text-zinc-900">{item.author.name}</p>
            {isPostAuthor ? (
              <span className="text-[0.8125rem] font-medium text-zinc-400">
                작성자
              </span>
            ) : null}
            <span className="text-[0.8125rem] text-zinc-400">
              {formatRelativeTime(item.created_at)}
            </span>
          </div>
          <p className="mt-0.5 whitespace-pre-line text-zinc-700">
            {parentAuthorName ? (
              <span className="mr-1.5 font-medium text-sky-700">
                @{parentAuthorName}
              </span>
            ) : null}
            {item.content}
          </p>
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-0.5 -ml-1.5 text-sm text-zinc-500">
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
            className="h-8 justify-start gap-1 px-1.5 py-0 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700"
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
  const flattenedComments = flattenGroupComments(commentItems)

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
    <section className={cn("w-full bg-white", className)}>
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
            }
          />

          {commentItems.length > 0 ? (
            <div className="space-y-5">
              <Separator className="bg-zinc-200" />
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
